import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_KEY);

const taxRate = await stripe.taxRates
  .create({
    display_name: "Tax",
    inclusive: false,
    percentage: 10,
    description: "Global Tax",
  })
  .catch((error) => {
    console.error("Error creating tax rate:", error);
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

let pendingOrderItems = [];
let pendingShippingAddress = {};
let pendingUserId = "";

router.post(
  "/pay",
  protect,
  asyncHandler(async (req, res) => {
    const { userEmail, orderItems, shippingAddress } = req.body;

    pendingOrderItems = orderItems;
    pendingShippingAddress = shippingAddress;
    pendingUserId = req.user._id;

    //create line_items
    const lineItems = await createLineItems(orderItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.CLIENT_URL,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      payment_method_types: ["card"],
      customer_email: userEmail,
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

    //send session
    res.status(200).json({ stripeSession: session });
  })
);

let endpointSecret;
// endpointSecret = process.env.WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(async (req, res) => {
    //verify that the event calling this webhook comes from stripe
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret
      );

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      const orderDetails = {
        shippingAddress: pendingShippingAddress,
        itemsPrice: data.amount_subtotal / 100,
        taxPrice: data.total_details.amount_tax / 100,
        shippingPrice: data.total_details.amount_shipping / 100,
        totalPrice: data.amount_total / 100,
      };

      await createOrder(pendingOrderItems, pendingUserId, orderDetails);
    }

    res.send().end();
  })
);

export default router;
