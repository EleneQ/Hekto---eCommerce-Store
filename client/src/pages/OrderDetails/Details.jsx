import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDeliverOrderMutation } from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const StyledDeliverButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const Details = ({ order, refetch, isLoading, error }) => {
  const theme = useTheme();
  const { id: orderId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error" />
  ) : (
    <Paper
      component={"section"}
      elevation={4}
      sx={{ bgcolor: theme.palette.primary.main }}
    >
      <Box p={"2rem"}>
        <Typography
          variant="h2"
          mb={"1.5rem"}
          color={theme.palette.secondary.dark3}
          fontWeight={700}
          fontSize={"1.1rem"}
        >
          Order Summary
        </Typography>

        <Typography
          variant="body2"
          display={"flex"}
          gutterBottom
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.main}
        >
          Items:
          <span>${order.itemsPrice}</span>
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        <Typography
          variant="body2"
          display={"flex"}
          gutterBottom
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.main}
        >
          Shipping:
          <span>${order.shippingPrice}</span>
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        <Typography
          variant="body2"
          display={"flex"}
          gutterBottom
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.main}
        >
          Tax:
          <span>${order.taxPrice}</span>
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        <Typography
          variant="body2"
          display={"flex"}
          gutterBottom
          justifyContent={"space-between"}
          alignItems={"center"}
          color={theme.palette.secondary.main}
        >
          Total:
          <span>${order.totalPrice}</span>
        </Typography>
        <Divider sx={{ mb: "1rem" }} />

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && !order.isDelivered && (
          <StyledDeliverButton
            disabled={loadingDeliver}
            onClick={deliverOrderHandler}
          >
            Mark As Delivered
          </StyledDeliverButton>
        )}
      </Box>
    </Paper>
  );
};
export default Details;
