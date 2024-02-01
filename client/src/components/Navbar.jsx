import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useState } from "react";
import {
  Button,
  Container,
  Toolbar,
  IconButton,
  Box,
  AppBar,
  Badge,
  MenuItem,
  Menu,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  styled,
  Divider,
} from "@mui/material";
import {
  ShoppingCart,
  Person2,
  AccountCircle,
  AdminPanelSettings,
  MenuOpen,
} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import theme from "./styles/theme";
import { navLinks } from "../constants/navLinks";

const StyledNavLink = styled(ListItemButton)(({ theme }) => ({
  textAlign: "center",
  py: "0.2rem",
  borderRadius: "10px",
  ml: "0.3rem",
  color: theme.palette.secondary.main,

  "&.active": {
    color: theme.palette.pink.main,
  },
}));

const Navbar = () => {
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const adminMenuOpen = Boolean(adminMenuAnchor);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <MenuItem sx={{ py: "0" }}>
        <List>
          {navLinks.map((item) => (
            <ListItem sx={{ m: "0" }} key={item.name} disablePadding>
              <StyledNavLink
                component={NavLink}
                to={item.link}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <ListItemText primary={item.name} />
              </StyledNavLink>
            </ListItem>
          ))}
        </List>
      </MenuItem>

      <Divider />

      {!userInfo && (
        <MenuItem>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            endIcon={<Person2 />}
            sx={{
              fontSize: "0.7rem",
              backgroundColor: theme.palette.pink.main,
              color: theme.palette.pink.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.pink.mainHover,
              },
            }}
          >
            Login
          </Button>
        </MenuItem>
      )}

      {userInfo && (
        <MenuItem onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
          <IconButton
            sx={{ fontSize: "1.1rem" }}
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
      )}
      {userInfo && userInfo.isAdmin && (
        <MenuItem onClick={(e) => setAdminMenuAnchor(e.currentTarget)}>
          <IconButton
            sx={{ fontSize: "1.1rem" }}
            aria-label="account of current user"
            aria-controls="primary-search-admin-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AdminPanelSettings />
          </IconButton>
          <Typography variant="body2">Admin</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Container maxWidth={false}>
          <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              fontWeight={700}
              fontSize={"1.5rem"}
              href="/"
              sx={{
                color: theme.palette.secondary.main,
                textDecoration: "none",
              }}
            >
              Hekto
            </Typography>

            <List sx={{ ml: "8rem" }}>
              <Stack
                direction={"row"}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {navLinks.map((item) => (
                  <ListItem key={item.name} disablePadding>
                    <StyledNavLink
                      component={NavLink}
                      to={item.link}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <ListItemText primary={item.name} />
                    </StyledNavLink>
                  </ListItem>
                ))}
              </Stack>
            </List>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {userInfo && userInfo.isAdmin && (
                <>
                  <Button
                    id="fade-button"
                    aria-controls={adminMenuOpen ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={adminMenuOpen ? "true" : undefined}
                    onClick={(e) => setAdminMenuAnchor(e.currentTarget)}
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      textTransform: "capitalize",
                      fontSize: "1rem",
                      p: "0rem 0.8rem",
                      mx: "1rem",
                      "&:hover": {
                        backgroundColor: theme.palette.secondary.mainHover,
                      },
                    }}
                  >
                    Admin
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={adminMenuAnchor}
                    open={adminMenuOpen}
                    onClose={() => setAdminMenuAnchor(null)}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      component={Link}
                      to="/admin/productlist"
                      onClick={() => setAdminMenuAnchor(null)}
                    >
                      Products
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/admin/userlist"
                      onClick={() => setAdminMenuAnchor(null)}
                    >
                      Users
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/admin/orderlist"
                      onClick={() => setAdminMenuAnchor(null)}
                    >
                      Orders
                    </MenuItem>
                  </Menu>
                </>
              )}

              {userInfo ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                    color="inherit"
                  >
                    <AccountCircle sx={{ fontSize: "1.5rem" }} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={userMenuAnchor}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(userMenuAnchor)}
                    onClose={() => setUserMenuAnchor(null)}
                    sx={{ zIndex: "2000" }}
                  >
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={() => setUserMenuAnchor(null)}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setUserMenuAnchor(null);
                        logoutHandler();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  endIcon={<Person2 />}
                  sx={{
                    p: "0 1.3rem",
                    fontSize: "0.9rem",
                    mr: "1rem",
                    backgroundColor: theme.palette.pink.main,
                    color: theme.palette.pink.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.pink.mainHover,
                    },
                  }}
                >
                  Login
                </Button>
              )}

              <IconButton
                component={Link}
                to="/cart"
                size="large"
                color="inherit"
              >
                <Badge
                  badgeContent={cartItems.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )}
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "white",
                      backgroundColor: theme.palette.pink.main,
                    },
                  }}
                >
                  <ShoppingCart sx={{ fontSize: "1.5rem" }} />
                </Badge>
              </IconButton>
            </Box>

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <Box>
                <IconButton
                  sx={{ fontSize: "1.5rem" }}
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
                  color="inherit"
                >
                  <MenuOpen />
                </IconButton>
              </Box>

              <IconButton
                component={Link}
                to="/cart"
                size="large"
                color="inherit"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <Badge
                  badgeContent={cartItems.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )}
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "white",
                      backgroundColor: theme.palette.pink.main,
                    },
                  }}
                >
                  <ShoppingCart sx={{ fontSize: "1.5rem" }} />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};
export default Navbar;
