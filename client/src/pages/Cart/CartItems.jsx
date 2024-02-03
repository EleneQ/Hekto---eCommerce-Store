import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import { Container } from "@mui/material";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";
import { useMemo } from "react";
import { addToCart, removeFromCart } from "../../slices/cartSlice";

const CartItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get cart items from state
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const calcPrice = useMemo(() => {
    return cartItems
      .reduce(
        (acc, item) =>
          acc +
          (item.discount && item.discount > 0
            ? item.qty * calcDiscountedPrice(item.price, item.discount)
            : item.qty * item.price),
        0
      )
      .toFixed(2);
  }, [cartItems]);

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <section>
      <Container>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart Is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={`${item.image}`} alt={item.name} />
                  </div>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                  <p>{item.price}</p>
                  {item?.countInStock && item?.countInStock > 0 && (
                    <input
                      type="number"
                      value={item.qty}
                      min={1}
                      max={item?.countInStock}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      onBlur={(e) => {
                        const enteredQty = Number(e.target.value);
                        if (enteredQty > (item?.countInStock || 0)) {
                          addToCartHandler(item, item?.countInStock || 1);
                        }
                      }}
                    />
                  )}
                  <button onClick={() => removeFromCartHandler(item._id)}>
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <p>
                {cartItems.some((item) => item.discount && item.discount > 0)
                  ? "Discounted Price: "
                  : "Price: "}
                ${calcPrice}
              </p>
              <button onClick={checkoutHandler}>Checkout</button>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
export default CartItems;
