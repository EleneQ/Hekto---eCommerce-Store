import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "../../components/styles/Container.styled";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { clearCartItems } from "../../slices/cartSlice";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";

const OrderInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        cartItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      console.log("order", res);
      navigate(`/order/${res._id}`); //order id
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <section>
        <ul>
          <li>
            <h2>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </li>
          <li>
            <h2>Payment Method</h2>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </li>
          <li>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul>
                {cart.cartItems.map((item, index) => (
                  <li>
                    <img src={item.image} alt={item.name} />
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                    <p>
                      {item.qty} x{" "}
                      {item.discount
                        ? `${calcDiscountedPrice(item.price, item.discount)} = `
                        : `${item.price} = `}
                      $
                      {item.qty *
                        (item.discount
                          ? calcDiscountedPrice(item.price, item.discount)
                          : item.price)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </section>
      <section>
        <h2>Order Summary: </h2>
        <ul>
          <li>Items: ${cart.itemsPrice}</li>
          <li>Shipping: ${cart.shippingPrice}</li>
          <li>Tax: ${cart.taxPrice}</li>
          <li>Total: ${cart.totalPrice}</li>
        </ul>

        {error && <Message>{error?.data?.message || error.error}</Message>}

        <button
          onClick={() => cart.cartItems.length !== 0 && placeOrderHandler()}
        >
          Place Order
        </button>

        {isLoading && <Loader />}
      </section>
    </Container>
  );
};
export default OrderInfo;
