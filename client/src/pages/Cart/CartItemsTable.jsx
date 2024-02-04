import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import truncateText from "../../utils/truncateText";
import { Clear } from "@mui/icons-material";

const StyledTableCellNames = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.dark3,
  fontWeight: "700",
  paddingLeft: "0",
}));

const StyledTypographyEllipsis = styled(Typography)({
  fontSize: "0.8rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100%",
});

const StyledShopNowButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const CartItems = ({ cartItems }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <section>
      {cartItems.length === 0 ? (
        <Typography mb={"5rem"}>
          Your Cart Is Empty -{" "}
          <StyledShopNowButton
            variant="contained"
            component={Link}
            to="/products"
          >
            Go Back
          </StyledShopNowButton>
        </Typography>
      ) : (
        <TableContainer>
          <Table aria-label="cart items">
            <TableHead>
              <TableRow>
                <StyledTableCellNames>Products</StyledTableCellNames>
                <StyledTableCellNames align="right">Price</StyledTableCellNames>
                <StyledTableCellNames align="right">
                  Quantity
                </StyledTableCellNames>
                <StyledTableCellNames align="right">Total</StyledTableCellNames>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ pl: "0" }}>
                    <Stack
                      minWidth={280}
                      direction="row"
                      spacing={1}
                      alignItems={"center"}
                      width={"100%"}
                      position={"relative"}
                    >
                      <Box
                        bgcolor={theme.palette.primary.main}
                        height={60}
                        width={100}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          component="img"
                          maxHeight={"90%"}
                          maxWidth={"100%"}
                          alt={item.name}
                          src={`${item.image}`}
                        />
                      </Box>

                      <div>
                        <StyledTypographyEllipsis
                          component={Link}
                          to={`/product/${item._id}`}
                          variant="body2"
                          color="secondary"
                        >
                          {truncateText(item.name, 20)}
                        </StyledTypographyEllipsis>
                        <Typography
                          fontWeight={600}
                          variant="body2"
                          color="secondary"
                          textTransform={"capitalize"}
                          sx={{
                            fontSize: "0.8rem",
                          }}
                        >
                          {item.categories.map((category, index) => (
                            <span key={index}>
                              {index > 0 && ", "} {truncateText(category, 20)}
                            </span>
                          ))}
                        </Typography>

                        <IconButton
                          onClick={() => removeFromCartHandler(item._id)}
                          sx={{ position: "absolute", top: "0", right: "0" }}
                        >
                          <Clear />
                        </IconButton>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    $
                    {item.discount
                      ? calcDiscountedPrice(item.price, item.discount)
                      : item.price}
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      name="orderAmount"
                      id="orderAmount"
                      color="info"
                      type={"number"}
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      inputProps={{
                        min: 1,
                        max: item.countInStock,
                      }}
                      onBlur={(e) => {
                        const enteredQty = Number(e.target.value);
                        if (enteredQty > (item.countInStock || 0)) {
                          addToCartHandler(item, item.countInStock || 1);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    $
                    {(
                      item.qty *
                      (item.discount > 0
                        ? calcDiscountedPrice(item.price, item.discount)
                        : item.price)
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
};
export default CartItems;
