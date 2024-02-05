import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderInfo from "./OrderInfo";
import Details from "./Details";
import { Container, Grid } from "@mui/material";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

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
          <OrderInfo cart={cart} />
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
          <Details cart={cart} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default PlaceOrderPage;
