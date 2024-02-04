import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";
import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

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

const Details = ({ cartItems }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const calcPrice = useMemo(() => {
    return cartItems
      .reduce(
        (acc, item) =>
          acc +
          (item.discount && item.discount > 0
            ? item.qty * calcDiscountedPrice(item.price, item.discount)
            : item.qty * item.price),
        0
      )
      .toFixed(2);
  }, [cartItems]);

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    cartItems.length > 0 && (
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
            Details
          </Typography>

          <Typography
            variant="body2"
            display={"flex"}
            gutterBottom
            justifyContent={"space-between"}
            alignItems={"center"}
            color={theme.palette.secondary.dark3}
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
            color={theme.palette.secondary.dark3}
          >
            {cartItems.some((item) => item.discount && item.discount > 0)
              ? "Discounted Price: "
              : "Price: "}
            <span>${calcPrice}</span>
          </Typography>

          <Divider sx={{ mb: "1rem" }} />

          <StyledLoginButton onClick={checkoutHandler} fullWidth>
            Proceed To Checkout
          </StyledLoginButton>
        </Box>
      </Paper>
    )
  );
};
export default Details;
