import { Link, useParams } from "react-router-dom";
import Container from "../../components/styles/Container.styled";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrderDetailsQuery } from "../../slices/ordersApiSlice";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";

const OrderDetails = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <section>
          <Container>
            <h1>Order {order._id}</h1>
            <div>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              {order.isdelivered ? (
                <Message>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message>Not Delivered</Message>
              )}

              <div>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message>Paid on {order.paidAt}</Message>
                ) : (
                  <Message>Not Paid</Message>
                )}
              </div>

              <div>
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      <img src={`/${item.image}`} alt={item.name} />
                      <p>
                        {item.qty} x{" "}
                        {item.discount
                          ? `${calcDiscountedPrice(
                              item.price,
                              item.discount
                            )} = `
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
              </div>
            </div>

            <div>
              <h2>Order Summary</h2>
              <div>
                <h3>Items</h3>
                <p>${order.itemsPrice}</p>
              </div>
              <div>
                <h3>Shipping</h3>
                <p>${order.shippingPrice}</p>
              </div>
              <div>
                <h3>Tax</h3>
                <p>${order.taxPrice}</p>
              </div>
              <div>
                <h3>Total</h3>
                <p>${order.totalPrice}</p>
              </div>
              {/* PAY ORDER */}
              {/* MARK AS DELIVERED */}
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default OrderDetails;