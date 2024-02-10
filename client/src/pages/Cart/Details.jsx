import { useDispatch, useSelector } from "react-redux";
import { usePayOrderMutation } from "../../slices/ordersApiSlice";
import calcItemPrice from "../../utils/calcItemPrice";
import { Box, Button, Divider, Paper, Typography, styled } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { clearCartItems } from "../../slices/cartSlice";
import { toast } from "react-toastify";

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

  const stripePromise = loadStripe(
    "pk_test_51Oa0ZoI5jjrwS49dYoFr8OOK4UByL5JzOrSYMGoLa19Ogwa4bQxlFoPYvYbNnIYS2h35nOtfgMqAJlGS53VqqMrd008abDr08A"
  );

  const checkoutHandler = async () => {
    if (!cart.shippingAddress) {
      toast.error("No Shipping Address");
      return;
    }

    try {
      const stripe = await stripePromise;

      const stripeRes = await payOrder({
        userEmail: userInfo.email,
        orderDetails: {
          orderItems: cart.cartItems.map((item) => ({
            ...item,
            price: calcItemPrice(item),
          })),
          shippingAddress: cart.shippingAddress,
        },
      }).unwrap();

      if (!stripeRes.stripeSession.id) {
        console.error("Invalid response from Stripe server");
        return;
      }

      dispatch(clearCartItems());

      await stripe.redirectToCheckout({
        sessionId: stripeRes.stripeSession.id,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error || "An error occurred");
      window.scrollTo(0, 700); //x, y
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
            disabled={loadingPayment}
          >
            Proceed To Checkout
          </StyledLoginButton>
        </Box>
      </Paper>
    )
  );
};
export default Details;
