import { Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import CartItemsTable from "./CartItemsTable";
import Details from "./Details";
import ShippingForm from "./ShippingForm";

const CartPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth={false} sx={{ mt: "4rem" }}>
      <Grid
        container
        justifyContent={{ xs: "center", sm: "space-between" }}
        alignItems={{ xs: "center", md: "start" }}
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
          <CartItemsTable />
        </Grid>

        <Grid item xs={9} sm={6} md={3.5} lg={4}>
          <Stack direction={"column"} justifyContent={"center"} spacing={4}>
            <Details />
            <ShippingForm />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CartPage;
