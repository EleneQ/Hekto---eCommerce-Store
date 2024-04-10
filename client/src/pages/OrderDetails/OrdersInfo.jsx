import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
  styled,
} from "@mui/material";
import Loader from "../../components/Loader";
import { calcItemPrice, calcPriceQty } from "../../utils/calcItemPrice";

const StyledOrderItemCard = styled(Card)(({ theme }) => ({
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
    paddingInline: "3rem",
  },
  [theme.breakpoints.up("md")]: {
    gap: "2rem",
  },
}));

const OrderDetails = ({ isLoading, error, order }) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error" />
      ) : (
        <div>
          <Typography
            variant="h1"
            fontWeight={700}
            fontSize={"1.3rem"}
            mb={"2rem"}
            color={"secondary.main"}
          >
            Order {order._id}
          </Typography>

          <Typography
            variant="body1"
            fontSize={"1rem"}
            gutterBottom
            color={"secondary.main"}
          >
            Name: {order.user.name}
          </Typography>

          <Typography
            variant="body1"
            fontSize={"1rem"}
            gutterBottom
            color={"secondary.main"}
          >
            Email: {order.user.email}
          </Typography>

          <Typography
            variant="body1"
            fontSize={"1rem"}
            gutterBottom
            color={"secondary.main"}
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
              color={"secondary.main"}
            >
              Status
            </Typography>

            <Typography
              variant="body1"
              fontSize={"1rem"}
              gutterBottom
              color={"secondary.main"}
            >
              {order.isDelivered
                ? `Delivered on ${order.deliveredAt.substring(0, 10)}`
                : "Not Delivered"}
            </Typography>

            <Typography
              variant="body1"
              fontSize={"1rem"}
              gutterBottom
              color={"secondary.main"}
            >
              Paid on {order.paidAt.substring(0, 10)}
            </Typography>
          </div>

          <div>
            <Typography
              variant="h3"
              fontWeight={700}
              fontSize={"1.1rem"}
              mt={"2rem"}
              mb={"0.5rem"}
              color={"secondary.main"}
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
                        alt={item.name}
                        image={
                          item.image.startsWith("productImages")
                            ? `/${item.image}`
                            : item.image
                        }
                        sx={{
                          width: { xs: 180, sm: 200 },
                          height: { xs: 180, sm: 200 },
                          maxWidth: "100%",
                          objectFit: "contain",
                          mx: "auto",
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{ flex: "1", p: 0, "&:last-child": { pb: 0 } }}
                    >
                      <Typography
                        component={Link}
                        to={`/product/${item.product}`}
                        variant="h4"
                        fontWeight={700}
                        color={"secondary.main"}
                        sx={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color={"secondary.main"}
                        mt="0.5rem"
                      >
                        {item.qty} x ${calcItemPrice(item)} = $
                        {calcPriceQty(item.qty, item)}
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
