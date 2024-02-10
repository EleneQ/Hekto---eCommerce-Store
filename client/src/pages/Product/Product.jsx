import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Loader from "../../components/Loader";
import { calcItemPrice } from "../../utils/calcItemPrice";
import { addToCart } from "../../slices/cartSlice";

const StyledAddToCartButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.pink.main,
  "&:hover": {
    backgroundColor: theme.palette.pink.mainHover,
  },
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
  textTransform: "capitalize",
}));

const Product = ({ product, loadingProduct, errorProduct }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty }));
    }
    navigate("/cart");
  };

  return (
    <section>
      {loadingProduct ? (
        <Loader />
      ) : errorProduct ? (
        <Alert severity="error">
          {errorProduct?.data?.message || errorProduct.error}
        </Alert>
      ) : (
        <Container maxWidth={false} sx={{ mt: "4rem" }}>
          <Grid
            container
            component={Paper}
            direction={"row"}
            elevation={4}
            justifyContent={{ xs: "center", md: "space-between" }}
            alignItems={"center"}
            rowSpacing={{ xs: 3, md: 0 }}
            p={{ xs: "0 1.5rem 2rem", md: "1.5rem 2.5rem 2.5rem" }}
          >
            <Grid item xs={9} md={6}>
              <Box
                display={"flex"}
                justifyContent="center"
                height={{ md: 400 }}
                maxHeight={500}
              >
                <Box
                  component="img"
                  sx={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  src={`${product.image}`}
                  alt={product.name}
                />
              </Box>
            </Grid>

            <Grid item xs={9} md={6}>
              <Typography
                variant="h2"
                color={theme.palette.secondary.main}
                fontWeight={700}
                fontSize={"1.2rem"}
                gutterBottom
              >
                {product.name}
              </Typography>

              <Typography
                variant="body1"
                display={"flex"}
                alignItems={"center"}
                gap={"0.3rem"}
                color={theme.palette.secondary.main}
                gutterBottom
              >
                <Rating name="rating" value={product.rating} readOnly />{" "}
                {`(${product.numReviews} reviews)`}
              </Typography>

              <Stack direction={"row"} spacing={2}>
                {product.discount && product.discount !== 0 && (
                  <Typography variant="body1" gutterBottom>
                    ${calcItemPrice(product)}
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  color={theme.palette.pink.main}
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
              </Stack>

              <Typography
                gutterBottom
                variant="body1"
                textTransform={"capitalize"}
                color={theme.palette.secondary.main}
              >
                Categories: {product.categories.join(", ")}
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                color={theme.palette.secondary.main}
              >
                Status: {product.countInStock > 0 ? "In Stock" : "Out Of Stick"}
              </Typography>

              {product.countInStock > 0 && (
                <TextField
                  name="password"
                  id="password"
                  color="info"
                  type={"number"}
                  value={qty}
                  sx={{ display: "block", mb: "1rem" }}
                  onChange={(e) => setQty(Number(e.target.value))}
                  inputProps={{
                    min: 1,
                    max: product.countInStock,
                    style: { paddingBlock: "0.3rem" },
                  }}
                  onBlur={(e) => {
                    const enteredQty = Number(e.target.value);
                    if (enteredQty > (product.countInStock || 0)) {
                      addToCartHandler(product, product.countInStock || 1);
                    }
                  }}
                />
              )}

              <StyledAddToCartButton
                variant="contained"
                disabled={product.countInStock <= 0}
                onClick={addToCartHandler}
              >
                Add To Cart
              </StyledAddToCartButton>
            </Grid>
          </Grid>
        </Container>
      )}
    </section>
  );
};
export default Product;
