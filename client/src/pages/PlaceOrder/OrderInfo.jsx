import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  styled,
} from "@mui/material";
import Message from "../../components/Message";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";

const StyledCartItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBlock: "1rem",
  paddingInline: "1rem",
  gap: "1rem",
  backgroundColor: theme.palette.primary.main,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    paddingInline: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    gap: "2rem",
  },
}));

const OrderInfo = ({ cart }) => {
  const theme = useTheme();

  return (
    <div>
      <div>
        <Box color={theme.palette.secondary.main} mb="2rem">
          <Typography
            variant="h2"
            fontWeight={700}
            fontSize={"1.3rem"}
            mb={"1rem"}
          >
            Shipping
          </Typography>

          <Typography variant="body1">
            Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}
            , {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </Typography>
        </Box>
      </div>

      <div>
        <Typography
          variant="h2"
          fontWeight={700}
          fontSize={"1.3rem"}
          mb={"1rem"}
        >
          Order Items
        </Typography>

        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <List>
            {cart.cartItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ mb: "2rem" }}>
                <StyledCartItemCard>
                  <Box flex={1}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: 180, sm: 200 },
                        height: { xs: 180, sm: 200 },
                        maxWidth: "100%",
                        objectFit: "contain",
                        mx: "auto",
                      }}
                      image={item.image}
                      alt={item.name}
                    />
                  </Box>

                  <CardContent
                    sx={{ flex: "1", p: 0, "&:last-child": { pb: 0 } }}
                  >
                    <Typography
                      component={Link}
                      to={`/product/${item._id}`}
                      variant="h4"
                      fontWeight={700}
                      color={theme.palette.secondary.main}
                      sx={{ textDecoration: "none" }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color={theme.palette.secondary.main}
                      mt="0.5rem"
                    >
                      {item.qty} x{" "}
                      {item.discount
                        ? `${calcDiscountedPrice(item.price, item.discount)} = `
                        : `${item.price} = `}
                      $
                      {item.qty *
                        (item.discount
                          ? calcDiscountedPrice(item.price, item.discount)
                          : item.price)}
                    </Typography>
                  </CardContent>
                </StyledCartItemCard>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};
export default OrderInfo;
