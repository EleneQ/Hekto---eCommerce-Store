import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
}));

const ShippingForm = () => {
  const theme = useTheme();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <Container maxWidth={false} component={"section"}>
      <Paper
        component="form"
        onSubmit={submitHandler}
        elevation={4}
        sx={{ maxWidth: "540px", p: "2.5rem", mx: "auto", mt: "4rem" }}
      >
        <Typography
          gutterBottom
          variant="h2"
          color={theme.palette.secondary.main}
          fontWeight={700}
          textAlign={"center"}
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
          autoFocus
          color="info"
          sx={{ mt: "1rem" }}
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
          sx={{ mt: "1rem" }}
        />

        <TextField
          name="postalCode"
          id="postalCode"
          label="Postal Code"
          type={"text"}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          fullWidth
          color="info"
          sx={{ mt: "1rem" }}
        />

        <TextField
          name="country"
          id="country"
          label="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          color="info"
          sx={{ mt: "1rem" }}
        />

        <StyledContinueButton type="submit" fullWidth>
          Continue
        </StyledContinueButton>
      </Paper>
    </Container>
  );
};
export default ShippingForm;
