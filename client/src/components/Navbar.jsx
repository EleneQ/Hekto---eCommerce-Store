import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { BsCart } from "react-icons/bs";
import Container from "./styles/Container.styled";
import {
  NavbarStyled,
  Nav,
  NavLinks,
  Logo,
  LoginButton,
} from "./styles/Navbar.styled";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import NavDropdown from "./NavDropdown";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavbarStyled>
      <Container className="container">
        <Link to="/">
          <Logo>Hekto</Logo>
        </Link>
        <Nav>
          <NavLinks>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/products"
            >
              Products
            </NavLink>
          </NavLinks>
        </Nav>

        <SearchBox />

        <div>
          {userInfo ? (
            <NavDropdown title={userInfo.name}>
              <Link to="/profile">Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </NavDropdown>
          ) : (
            <Link to="/login">
              <LoginButton>
                Login <GoPerson size={"1.25rem"} />
              </LoginButton>
            </Link>
          )}

          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin">
              <Link to="/admin/productlist">Products</Link>
              <Link to="/admin/userlist">Users</Link>
              <Link to="/admin/orderlist">Orders</Link>
            </NavDropdown>
          )}

          <Link
            to="/cart"
            style={{
              backgroundColor: "transparent",
              marginLeft: "2rem",
              color: "black",
            }}
          >
            <BsCart size={"1.25rem"} /> Cart
            {cartItems.length > 0 && (
              <p>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
            )}
          </Link>
        </div>
      </Container>
    </NavbarStyled>
  );
};
export default Navbar;
