import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../slices/ordersApiSlice";
import OrderDetails from "./OrdersInfo";
import Details from "./Details";
import { Container, Grid } from "@mui/material";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  return (
    <Container component={"section"} maxWidth={false} sx={{ mt: "4rem" }}>
      <Grid
        container
        justifyContent={{ xs: "center", md: "space-between" }}
        spacing={{ xs: 0, md: 5, lg: 10 }}
      >
        <Grid
          item
          xs={11}
          md={8}
          lg={7}
          sx={{ mt: { xs: "4rem", md: "0" } }}
          order={{ xs: 2, md: 1 }}
        >
          <OrderDetails isLoading={isLoading} error={error} order={order} />
        </Grid>
        <Grid
          item
          xs={11}
          sm={8}
          md={4}
          lg={5}
          sx={{ mt: { md: "9rem" } }}
          order={{ xs: 1, md: 2 }}
        >
          <Details
            isLoading={isLoading}
            error={error}
            order={order}
            refetch={refetch}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default OrderDetailsPage;
