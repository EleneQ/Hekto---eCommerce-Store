import express from "express";
const router = express.Router();
import stripe from "stripe";
const stripeInstance = stripe(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripeInstance.charges.create();
});

export default router;
