import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

const taxRate = await stripe.taxRates.create({
  display_name: "Tax",
  inclusive: false,
  percentage: 10,
  description: "Global Tax",
});

const createLineItems = async (orderItems) => {
  try {
    const lineItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item._id);

        if (!product) {
          throw new Error(`Product with id ${item._id} not found`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
            },
            unit_amount: Math.round(
              (product.discount
                ? product.price - (product.price * product.discount) / 100
                : product.price) * 100
            ),
          },
          quantity: item.qty,
          tax_rates: [taxRate.id],
        };
      })
    );
    return lineItems;
  } catch (err) {
    throw new Error(`Error creating line items: ${err.message}`);
  }
};

router.post(
  "/pay",
  protect,
  asyncHandler(async (req, res) => {
    const { userEmail, orderItems } = req.body;

    //create line_items
    const lineItems = await createLineItems(orderItems);

    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.CLIENT_URL,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      payment_method_types: ["card"],
      // shipping_address_collection: {
      //   allowed_countries: ["US", "CA", "GE", "FR", "JP"],
      // },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 10 * 100,
              currency: "usd",
            },
            display_name: "Shipping Rate",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
    });

    //order details
    const orderDetails = {
      taxPrice: session.total_details.amount_tax / 100,
      shippingPrice: session.total_details.amount_shipping / 100,
      itemsPrice: session.amount_subtotal / 100,
      totalPrice: session.amount_total / 100,
    };

    //send res
    res.status(200).json({ stripeSession: session, orderDetails });
  })
);

export default router;
