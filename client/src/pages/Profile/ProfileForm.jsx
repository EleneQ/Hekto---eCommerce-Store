import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Container } from "@mui/material";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo?.name, userInfo?.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== conformPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id, //can only get here if logged in
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <section>
      <Container>
        <h2>User Profile</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">
            Name
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email Address
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={conformPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="on"
            />
          </label>

          <button>Update</button>
          {loadingUpdateProfile && <Loader />}
        </form>

        <div>
          <h2>My Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>{error?.data?.message || error.error}</Message>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }}></FaTimes>
                      )}
                    </td>
                    <td>
                      {order.isdelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }}></FaTimes>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button>Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Container>
    </section>
  );
};
export default ProfileForm;
