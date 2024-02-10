import { useState } from "react";
import { useGetFeaturedProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import Paginate from "../../components/Paginate";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { calcItemPrice } from "../../utils/calcItemPrice";
import { AddShoppingCartRounded } from "@mui/icons-material";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

const StyledViewButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "10px",
  right: "50%",
  transform: "translateX(50%)",
  backgroundColor: theme.palette.green.main,
  color: "white",
  fontSize: "0.75rem",
  padding: "0.6rem 0.5rem",

  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
}));

const FeaturedProducts = () => {
  const theme = useTheme();
  const [pageNum, setPageNum] = useState(1);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetFeaturedProductsQuery({
    page: pageNum,
    limit: 4,
  });

  return (
    <section>
      <Container maxWidth={false} sx={{ textAlign: "center" }}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert severity="error">{error?.data?.message || error.error}</Alert>
        ) : (
          <>
            <Typography
              variant="h2"
              color={theme.palette.secondary.main}
              fontWeight={700}
              mt="5rem"
              mb="2rem"
            >
              Featured Products
            </Typography>

            <Grid
              container
              spacing={{ xs: 3, sm: 5, md: 3 }}
              justifyContent={{ xs: "center", md: "space-between" }}
            >
              {data.products.map((product, index) => (
                <Grid item key={index} xs={10} sm={6} md={3}>
                  <Card
                    sx={{
                      height: "100%",
                      "&:hover": {
                        bgcolor: theme.palette.secondary.dark3,
                      },
                      "&:hover .cardHoverVisible": {
                        display: hoveredCardIndex === index ? "block" : "none",
                      },
                    }}
                    onMouseEnter={() => setHoveredCardIndex(index)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                  >
                    <CardActionArea>
                      <Box
                        position={"relative"}
                        bgcolor={theme.palette.primary.main}
                        p={"0.5rem 2rem"}
                      >
                        <IconButton
                          className="cardHoverVisible"
                          sx={{
                            position: "absolute",
                            top: "1rem",
                            left: "1rem",
                            fontSize: "1.3rem",
                            color: theme.palette.secondary.dark4,
                            zIndex: "5",
                            display: "none",
                          }}
                          onClick={() => {
                            dispatch(addToCart({ ...product, qty: 1 }));
                          }}
                        >
                          <AddShoppingCartRounded />
                        </IconButton>

                        <Box height={200}>
                          <CardMedia
                            component="img"
                            height="100%"
                            sx={{ objectFit: "contain" }}
                            image={`${product.image}`}
                            alt={product.name}
                          />
                        </Box>

                        <StyledViewButton
                          component={Link}
                          to={`/product/${product._id}`}
                          className="cardHoverVisible"
                          variant="contained"
                          sx={{ display: "none" }}
                        >
                          View Details
                        </StyledViewButton>
                      </Box>

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h4"
                          fontWeight={700}
                          color={
                            hoveredCardIndex === index
                              ? "white"
                              : theme.palette.pink.main
                          }
                          sx={{ fontSize: "0.85rem" }}
                        >
                          {product.name}
                        </Typography>

                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={1}
                          mb={"0.5rem"}
                        >
                          {product.colors.map((color) => (
                            <Paper
                              sx={{
                                bgcolor: `${color.value}`,
                                height: "5px",
                                width: "25px",
                              }}
                            />
                          ))}
                        </Stack>

                        <Typography
                          gutterBottom
                          variant="body1"
                          fontWeight={500}
                          color={
                            hoveredCardIndex === index
                              ? "white"
                              : theme.palette.secondary.dark4
                          }
                        >
                          Code - {product.code}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body1"
                          fontWeight={500}
                          color={
                            hoveredCardIndex === index
                              ? "white"
                              : theme.palette.secondary.dark4
                          }
                        >
                          ${calcItemPrice(product)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paginate
              pages={data.pages}
              currentPageNum={pageNum}
              setPageNum={setPageNum}
              listItemStyles={{
                borderRadius: "10px",
                width: "25px",
                height: "5px",
                indicatorColor: theme.palette.pink.main,
                bgColor: theme.palette.pink.medium,
              }}
            />
          </>
        )}
      </Container>
    </section>
  );
};
export default FeaturedProducts;
