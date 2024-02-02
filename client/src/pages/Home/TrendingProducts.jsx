import {
  useGetTrendingProductsQuery,
  useGetDiscountedProductsQuery,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import calcDiscountedPrice from "../../utils/calcdiscountedPrice";

const StyledTypographyEllipsis = styled(Typography)({
  fontSize: "0.8rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100%",
  textDecoration: "none",
});

const StyledTrendingCard = styled(Card)({
  height: "100%",
  maxWidth: 350,
  mx: "auto",
  textDecoration: "none",
  display: "block",
});

const TrendingProducts = () => {
  const theme = useTheme();

  const {
    data: trendingProducts,
    isLoading: loadingTrending,
    error: errorTranding,
  } = useGetTrendingProductsQuery({ limit: 4 });

  const {
    data: discountedProducts,
    isLoading: loadingDiscounted,
    error: errorDiscounted,
  } = useGetDiscountedProductsQuery({ discount: 5, limit: 5, sort: true });

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <section style={{ margin: "5rem" }}>
      <Container maxWidth={false}>
        <Typography
          textAlign="center"
          variant="h2"
          color={theme.palette.secondary.main}
          fontWeight={700}
          mt="5rem"
          mb="2rem"
        >
          Trending Products
        </Typography>

        {loadingTrending ? (
          <Loader />
        ) : errorTranding ? (
          <Message>
            {errorTranding?.data?.message || errorTranding.error}
          </Message>
        ) : (
          <>
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent={"center"}
              textAlign="center"
            >
              {trendingProducts.map((product) => (
                <Grid key={product._id} item xs={9} sm={5} lg={3}>
                  <StyledTrendingCard
                    component={Link}
                    to={`/product/${product._id}`}
                  >
                    <CardActionArea sx={{ height: "100%" }}>
                      <Box
                        height={200}
                        p={"2rem"}
                        m="0.7rem"
                        borderRadius="5px"
                        bgcolor={theme.palette.primary.main}
                      >
                        <CardMedia
                          component="img"
                          height="100%"
                          sx={{ objectFit: "contain" }}
                          image={`${product.image}`}
                          alt={product.name}
                        />
                      </Box>

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h4"
                          fontWeight={600}
                          color={theme.palette.secondary.dark4}
                          sx={{ fontSize: "0.9rem" }}
                        >
                          {product.name}
                        </Typography>

                        <Stack
                          direction={"row"}
                          justifyContent={"center"}
                          spacing={2}
                        >
                          {product.discount && (
                            <Typography
                              variant="body2"
                              color={theme.palette.secondary.dark4}
                            >
                              $
                              {calcDiscountedPrice(
                                product.price,
                                product.discount
                              )}
                            </Typography>
                          )}
                          <Typography
                            variant="body2"
                            color={theme.palette.primary.dark}
                            sx={{
                              textDecoration: product.discount
                                ? "line-through"
                                : "",
                            }}
                          >
                            ${product.price}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </StyledTrendingCard>
                </Grid>
              ))}
            </Grid>

            {loadingDiscounted ? (
              <Loader />
            ) : errorDiscounted ? (
              <Message>
                {errorTranding?.data?.message || errorTranding.error}
              </Message>
            ) : (
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent={"center"}
                mt={"0.3rem"}
              >
                {discountedProducts.slice(0, 2).map((product, index) => (
                  <Grid key={product._id} item xs={9} sm={5} lg={4.5}>
                    <Card
                      sx={{
                        height: "100%",
                        maxWidth: 400,
                        bgcolor:
                          index === 1
                            ? theme.palette.primary.main
                            : theme.palette.pink.light,
                      }}
                    >
                      <CardActionArea sx={{ p: "0.7rem", height: "100%" }}>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h4"
                            fontWeight={600}
                            color={theme.palette.secondary.dark4}
                            sx={{ fontSize: "1.1rem" }}
                          >
                            {product.discount}% off on this product
                          </Typography>
                          <Typography
                            component={Link}
                            to={`/product/${product._id}`}
                            gutterBottom
                            variant="h4"
                            fontWeight={600}
                            color={theme.palette.pink.main}
                            sx={{ fontSize: "1rem" }}
                          >
                            Shop Now
                          </Typography>
                        </CardContent>
                        <CardMedia
                          component="img"
                          height={100}
                          sx={{
                            objectFit: "contain",
                            maxWidth: "70%",
                            marginLeft: "auto",
                          }}
                          image={`${product.image}`}
                          alt={product.name}
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}

                <Grid item xs={9} sm={10} lg={3}>
                  <Stack
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={1}
                  >
                    {discountedProducts.slice(2, 5).map((product) => (
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems={"center"}
                        width={"100%"}
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
                            alt={product.name}
                            src={`${product.image}`}
                          />
                        </Box>

                        <div>
                          <StyledTypographyEllipsis
                            component={Link}
                            to={`/product/${product._id}`}
                            variant="body2"
                            color="secondary"
                          >
                            {truncateText(product.name, 20)}
                          </StyledTypographyEllipsis>
                          <Typography
                            fontWeight={600}
                            variant="body2"
                            color="secondary"
                            sx={{
                              fontSize: "0.8rem",
                              textDecoration: "line-through",
                            }}
                          >
                            ${product.price}
                          </Typography>
                        </div>
                      </Stack>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default TrendingProducts;
