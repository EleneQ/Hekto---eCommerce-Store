import { toast } from "react-toastify";
import {
  // Alert,
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { clearCartItems } from "../../slices/cartSlice";
import {
  // useCreateOrderMutation,
  usePayOrderMutation,
} from "../../slices/ordersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { loadStripe } from "@stripe/stripe-js";

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

const Details = ({ cart }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // const [createOrder, { isLoading: loadingOrder, error: errorOrder }] =
  //   useCreateOrderMutation();

  const [payOrder, { isLoading: loadingPayment }] = usePayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const stripePromise = loadStripe(
    "pk_test_51Oa0ZoI5jjrwS49dYoFr8OOK4UByL5JzOrSYMGoLa19Ogwa4bQxlFoPYvYbNnIYS2h35nOtfgMqAJlGS53VqqMrd008abDr08A"
  );

  const placeOrderHandler = async () => {
    try {
      //create order
      // const orderRes = await createOrder({
      //   cartItems: cart.cartItems,
      //   shippingAddress: cart.shippingAddress,
      //   itemsPrice: cart.itemsPrice,
      //   shippingPrice: cart.shippingPrice,
      //   taxPrice: cart.taxPrice,
      //   totalPrice: cart.totalPrice,
      // }).unwrap();

      //stripe payment
      const stripe = await stripePromise;

      const stripeRes = await payOrder({
        userEmail: userInfo.email,
        orderDetails: {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
      }).unwrap();

      //clear cart
      dispatch(clearCartItems());

      //redirect
      await stripe.redirectToCheckout({
        sessionId: stripeRes.stripeSession.id,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Paper
      component={"section"}
      elevation={4}
      sx={{ bgcolor: theme.palette.primary.main }}
    >
      <Box p={"2rem"}>
        <Typography
          variant="h4"
          mb={"1.5rem"}
          color={theme.palette.secondary.dark3}
          fontWeight={700}
          fontSize={"1.1rem"}
        >
          Order Summary:
        </Typography>

        <Typography
          variant="body2"
          display={"flex"}
          gutterBottom
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.dark3}
        >
          Items: ${cart.itemsPrice}
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        <Typography
          variant="body2"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.dark3}
        >
          Shipping: ${cart.shippingPrice}
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        <Typography
          variant="body2"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.dark3}
        >
          Tax: ${cart.taxPrice}
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        <Typography
          variant="body2"
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.dark3}
        >
          Total: ${cart.totalPrice}
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        {/**  {errorOrder && (
          <Alert severity="error">
            {errorOrder?.data?.message || errorOrder.error}
          </Alert>
        )} */}

        <StyledLoginButton
          disabled={cart.cartItems.length === 0}
          onClick={placeOrderHandler}
          fullWidth
        >
          Place Order
        </StyledLoginButton>

        {/** {loadingOrder && <Loader />} */}

        {loadingPayment && <Loader />}
      </Box>
    </Paper>
  );
};
export default Details;
