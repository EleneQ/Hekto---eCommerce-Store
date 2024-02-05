import { toast } from "react-toastify";
import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { clearCartItems } from "../../slices/cartSlice";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        cartItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      console.log("order", res);
      navigate(`/order/${res._id}`); //order id
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

        {error && <Message>{error?.data?.message || error.error}</Message>}

        <StyledLoginButton
          disabled={isLoading}
          onClick={() => cart.cartItems.length !== 0 && placeOrderHandler()}
          fullWidth
        >
          Place Order
        </StyledLoginButton>

        {isLoading && <Loader />}
      </Box>
    </Paper>
  );
};
export default Details;
