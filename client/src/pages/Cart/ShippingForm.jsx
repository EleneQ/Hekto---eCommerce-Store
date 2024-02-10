import { useState } from "react";
import { Button, Paper, TextField, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../slices/cartSlice";

const StyledContinueButton = styled(Button)(({ theme }) => ({
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

const ShippingForm = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
  };

  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      elevation={4}
      sx={{
        p: "2.5rem",
        mx: "auto",
        mt: "4rem",
        bgcolor: "primary.main",
        flex: "1",
      }}
    >
      <Typography
        gutterBottom
        variant="h3"
        color={"secondary.dark3"}
        fontWeight={700}
      >
        Shipping
      </Typography>

      <TextField
        name="address"
        id="address"
        type="text"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        required
        color="info"
        sx={{ mt: "1rem" }}
        inputProps={{
          style: {
            padding: 10,
          },
        }}
      />

      <TextField
        name="city"
        id="city"
        label="City"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        color="info"
        required
        sx={{ mt: "1rem" }}
        inputProps={{
          style: {
            padding: 10,
          },
        }}
      />

      <TextField
        name="postalCode"
        id="postalCode"
        label="Postal Code"
        type={"text"}
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        fullWidth
        required
        color="info"
        sx={{ mt: "1rem" }}
        inputProps={{
          style: {
            padding: 10,
          },
        }}
      />

      <TextField
        name="country"
        id="country"
        label="Country"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
        required
        color="info"
        sx={{ mt: "1rem" }}
        inputProps={{
          style: {
            padding: 10,
          },
        }}
      />

      <StyledContinueButton type="submit" fullWidth>
        Submit Shipping Address
      </StyledContinueButton>
    </Paper>
  );
};
export default ShippingForm;
