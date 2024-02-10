import { useDispatch, useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  usePayOrderMutation,
} from "../../slices/ordersApiSlice";
import { calcItemPrice } from "../../utils/calcItemPrice";
import { Box, Button, Divider, Paper, Typography, styled } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { clearCartItems } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import objIsEmpty from "../../utils/objectIsEmpty";

const StyledLoginButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  marginTop: "1.5rem",
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
  textTransform: "capitalize",
}));

const Details = () => {
  const dispatch = useDispatch();

  const [payOrder, { isLoading: loadingPayment }] = usePayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [createOrder, { isLoading: loadingOrder }] = useCreateOrderMutation();

  const stripePromise = loadStripe(
    "pk_test_51Oa0ZoI5jjrwS49dYoFr8OOK4UByL5JzOrSYMGoLa19Ogwa4bQxlFoPYvYbNnIYS2h35nOtfgMqAJlGS53VqqMrd008abDr08A"
  );

  const createOrderHandler = async (stripeRes) => {
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      stripeRes.orderDetails;

    try {
      await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const checkoutHandler = async () => {
    if (!cart.shippingAddress || objIsEmpty(cart.shippingAddress)) {
      toast.error("No Shipping Address Submitted");
      return;
    }

    try {
      //stripe session
      const stripe = await stripePromise;

      const stripeRes = await payOrder({
        userEmail: userInfo.email,
        orderItems: cart.cartItems,
      }).unwrap();

      //create order
      await createOrderHandler(stripeRes);

      //clear cart
      dispatch(clearCartItems());

      //redirect
      await stripe.redirectToCheckout({
        sessionId: stripeRes.stripeSession.id,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      window.scrollTo(0, 700);
    }
  };

  return (
    cartItems.length > 0 && (
      <Paper
        component={"section"}
        elevation={4}
        sx={{ bgcolor: "primary.main", flex: "1" }}
      >
        <Box p={"2rem"}>
          <Typography
            variant="h2"
            mb={"1.5rem"}
            color={"secondary.dark3"}
            fontWeight={700}
            fontSize={"1.1rem"}
          >
            Details
          </Typography>

          <Typography
            variant="body2"
            display={"flex"}
            gutterBottom
            justifyContent={"space-between"}
            alignItems={"center"}
            color={"secondary.dark3"}
          >
            Subtotal:
            <span>
              ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </span>
          </Typography>
          <Divider sx={{ mb: "1rem" }} />

          <Typography
            variant="body2"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            color={"secondary.dark3"}
          >
            {cartItems.some((item) => item.discount && item.discount > 0)
              ? "Discounted Price: "
              : "Price: "}
            <span>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * calcItemPrice(item), 0)
                .toFixed(2)}
            </span>
          </Typography>
          <Divider sx={{ mb: "1rem" }} />

          <StyledLoginButton
            onClick={checkoutHandler}
            fullWidth
            disabled={loadingPayment || loadingOrder}
          >
            Proceed To Checkout
          </StyledLoginButton>
        </Box>
      </Paper>
    )
  );
};
export default Details;
