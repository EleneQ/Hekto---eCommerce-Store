import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../slices/cartSlice";
import Container from "../../components/styles/Container.styled";

const ShippingForm = () => {
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
    <section>
      <Container>
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="address">
            Address
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter Your Name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label htmlFor="address">
            City
            <input
              id="city"
              type="text"
              name="city"
              value={city}
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label htmlFor="address">
            Postal Code
            <input
              id="postalCode"
              type="text"
              name="postalCode"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </label>
          <label htmlFor="address">
            Country
            <input
              id="country"
              type="text"
              name="country"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>

          <button>Continue</button>
        </form>
      </Container>
    </section>
  );
};
export default ShippingForm;
