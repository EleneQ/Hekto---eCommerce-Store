import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { BsCart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Container from "./styles/Container.styled";
import {
  NavbarStyled,
  Nav,
  NavLinks,
  Logo,
  SearchForm,
  SearchInput,
  SearchButton,
  LoginButton,
} from "./styles/Navbar.styled";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Blog", link: "/blog" },
];

const Navbar = () => {
  return (
    <NavbarStyled>
      <Container className="container">
        <Link to="/">
          <Logo>Hekto</Logo>
        </Link>
        <Nav>
          <NavLinks>
            {navLinks.map((navLink) => (
              <NavLink
                key={navLink.name}
                className={({ isActive }) => (isActive ? "active" : "")}
                to={navLink.link}
              >
                {navLink.name}
              </NavLink>
            ))}
          </NavLinks>
        </Nav>
        <SearchForm>
          <SearchInput type="text" name="searchTerm" />
          <SearchButton>
            <CiSearch />
          </SearchButton>
        </SearchForm>
        <div>
          <Link to="/login">
            <LoginButton>
              Login <GoPerson size={"1.25rem"} />
            </LoginButton>
          </Link>

          <Link
            to="/cart"
            style={{
              backgroundColor: "transparent",
              marginLeft: "2rem",
              color: "black",
            }}
          >
            <BsCart size={"1.25rem"} /> Cart
          </Link>
        </div>
      </Container>
    </NavbarStyled>
  );
};

export default Navbar;
