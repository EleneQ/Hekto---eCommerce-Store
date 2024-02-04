import { useSelector } from "react-redux";
import { Container, Grid, Typography, useTheme } from "@mui/material";

import CartItemsTable from "./CartItemsTable";
import Details from "./Details";

const CartPage = () => {
  const theme = useTheme();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Container maxWidth={false} sx={{ mt: "4rem" }}>
      <Grid
        container
        justifyContent={{ xs: "center", sm: "space-between" }}
        alignItems={"center"}
        spacing={{ md: 2, lg: 10 }}
        rowGap={{ xs: 4, lg: 0 }}
      >
        <Grid item xs={12} md={8}>
          <Typography
            variant="h1"
            color={theme.palette.secondary.main}
            fontWeight={700}
            mb={"2rem"}
            sx={{ fontSize: "1.5rem" }}
          >
            Shopping Cart
          </Typography>
          <CartItemsTable cartItems={cartItems} />
        </Grid>

        <Grid item xs={10} sm={6} md={3.5} lg={4}>
          <Details cartItems={cartItems} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default CartPage;
