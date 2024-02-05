import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";

const StyledOrderItemCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between",
  alignItems: "center",
  paddingBlock: "1rem",
  paddingInline: { xs: "1rem", sm: "3rem" },
  gap: { xs: "1rem", md: "2rem" },
  backgroundColor: theme.palette.primary.main,
  width: "100%",
}));

const OrderDetails = ({ isLoading, error, order }) => {
  const theme = useTheme();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <div>
          <Typography
            variant="h1"
            fontWeight={700}
            fontSize={"1.3rem"}
            mb={"2rem"}
            color={theme.palette.secondary.main}
          >
            Order {order._id}
          </Typography>

          <Typography
            variant="body1"
            fontSize={"1rem"}
            gutterBottom
            color={theme.palette.secondary.main}
          >
            Name: {order.user.name}
          </Typography>

          <Typography
            variant="body1"
            fontSize={"1rem"}
            gutterBottom
            color={theme.palette.secondary.main}
          >
            Email: {order.user.email}
          </Typography>

          <Typography
            variant="body1"
            fontSize={"1rem"}
            gutterBottom
            color={theme.palette.secondary.main}
          >
            Address: {order.shippingAddress.address},{" "}
            {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
            {order.shippingAddress.country}
          </Typography>

          <div>
            <Typography
              variant="h3"
              fontWeight={700}
              fontSize={"1.1rem"}
              mt={"2rem"}
              mb={"0.5rem"}
              color={theme.palette.secondary.main}
            >
              Status
            </Typography>

            <Typography
              variant="body1"
              fontSize={"1rem"}
              gutterBottom
              color={theme.palette.secondary.main}
            >
              {order.isdelivered
                ? `Delivered on ${order.deliveredAt}`
                : "Not Delivered"}
            </Typography>

            <Typography
              variant="body1"
              fontSize={"1rem"}
              gutterBottom
              color={theme.palette.secondary.main}
            >
              {order.isPaid ? `Paid on ${order.paidAt}` : "Not Paid"}
            </Typography>
          </div>

          <div>
            <Typography
              variant="h3"
              fontWeight={700}
              fontSize={"1.1rem"}
              mt={"2rem"}
              mb={"0.5rem"}
              color={theme.palette.secondary.main}
            >
              Order Items
            </Typography>

            <List>
              {order.orderItems.map((item) => (
                <ListItem key={item._id} disablePadding sx={{ mb: "2rem" }}>
                  <StyledOrderItemCard>
                    <Box sx={{ flex: "1" }}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: 180, sm: 220 },
                          height: { xs: 180, sm: 220 },
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
                          ? `${calcDiscountedPrice(
                              item.price,
                              item.discount
                            )} = `
                          : `${item.price} = `}
                        $
                        {item.qty *
                          (item.discount
                            ? calcDiscountedPrice(item.price, item.discount)
                            : item.price)}
                      </Typography>
                    </CardContent>
                  </StyledOrderItemCard>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
