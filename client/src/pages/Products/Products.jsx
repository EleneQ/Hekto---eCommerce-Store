import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useGetFilteredProductsQuery } from "../../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  List,
  ListItem,
  Pagination,
  Paper,
  Rating,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { calcItemPrice } from "../../utils/calcItemPrice";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const StyledCartButton = styled(IconButton)(({ theme }) => ({
  fontSize: "1.1rem",
  marginTop: "0.2rem",
  boxShadow: "rgba(72, 72, 72, 0.2) 0px 5px 10px",
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
}));

const StyledProductCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  paddingBlock: "1rem",
  paddingInline: "1rem",
  width: "100%",
  maxWidth: "450px",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    paddingInline: "2rem",
    maxWidth: "none",
  },
}));

const Products = ({ params, setSearchParams }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetFilteredProductsQuery(params);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error">{error?.data?.message || error.error}</Alert>
  ) : !data ? (
    <Alert security="info">No products found</Alert>
  ) : (
    <div>
      <List>
        {data.products &&
          data.products.map((product) => (
            <ListItem key={product._id} disablePadding sx={{ mb: "2rem" }}>
              <StyledProductCard>
                <Box flex={0.4} height={220} width={220}>
                  <CardMedia
                    component="img"
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                    image={product.image}
                    alt={product.name}
                  />
                </Box>

                <CardContent
                  sx={{ flex: "1", p: 0, "&:last-child": { pb: 0 } }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={4}
                    mb={"0.5rem"}
                  >
                    <Typography
                      component={Link}
                      to={`/product/${product._id}`}
                      variant="h4"
                      fontWeight={700}
                      color={theme.palette.secondary.main}
                      sx={{ textDecoration: "none" }}
                    >
                      {product.name}
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                    >
                      {product.colors.map((color) => (
                        <Paper
                          elevation={3}
                          sx={{
                            bgcolor: `${color.value}`,
                            height: "20px",
                            width: "20px",
                            borderRadius: "999px",
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    {product.discount && product.discount !== 0 && (
                      <Typography
                        variant="body1"
                        gutterBottom
                        color={theme.palette.secondary.main}
                      >
                        ${calcItemPrice(product)}
                      </Typography>
                    )}

                    <Typography
                      variant="body1"
                      color={
                        product.discount && product.discount !== 0
                          ? theme.palette.pink.main
                          : theme.palette.secondary.main
                      }
                      gutterBottom
                      sx={{
                        textDecoration:
                          product.discount && product.discount !== 0
                            ? "line-through"
                            : "none",
                      }}
                    >
                      ${product.price}
                    </Typography>

                    <Rating name="rating" value={product.rating} readOnly />
                  </Stack>

                  <Typography
                    variant="body2"
                    color="#7E81A2"
                    my="0.5rem"
                    fontSize="0.9rem"
                  >
                    {product.desc.charAt(0).toUpperCase() +
                      product.desc.slice(1)}
                  </Typography>

                  <StyledCartButton
                    aria-label="add to cart"
                    onClick={() => {
                      dispatch(addToCart({ ...product, qty: 1 }));
                    }}
                  >
                    <ShoppingCartRoundedIcon />
                  </StyledCartButton>
                </CardContent>
              </StyledProductCard>
            </ListItem>
          ))}
      </List>

      <Box
        display={data.products.length <= 0 ? "none" : "flex"}
        justifyContent="center"
        mt="auto"
      >
        <Pagination
          count={data.pages}
          onChange={(e, page) => {
            setSearchParams((prev) => {
              prev.set("p", page);
              return prev;
            });
            window.scrollTo({ top: 50, behavior: "smooth" });
          }}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </div>
  );
};

export default Products;
