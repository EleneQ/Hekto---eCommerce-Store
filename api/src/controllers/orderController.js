import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//create order with stripe
const createOrder = async (orderItems, userId, orderDetails) => {
  const { shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    orderDetails;

  try {
    if (!orderItems || orderItems.length === 0) {
      throw new Error("No order items provided");
    }

    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: userId,
      paidAt: Date.now(),
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    return createdOrder;
  } catch (err) {
    throw new Error(`Error creating order: ${err.message}`);
  }
};

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrders,
};
