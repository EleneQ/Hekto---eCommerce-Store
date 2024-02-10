import { useState } from "react";
import { useGetLatestProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import calcItemPrice from "../../utils/calcItemPrice";
import { Link } from "react-router-dom";

const StyledTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    color: theme.palette.pink.main,
  },
}));

const LatestProducts = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("new");

  const params = { selectedTab, limit: 6 };
  const {
    data: products,
    isLoading,
    error,
  } = useGetLatestProductsQuery(params);

  const handleCategoryChange = (e, newValue) => {
    setSelectedTab(newValue);
  };

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
              Latest Products
            </Typography>

            <Tabs
              value={selectedTab}
              onChange={handleCategoryChange}
              textColor="secondary"
              aria-label="secondary tabs example"
              centered
              TabIndicatorProps={{
                style: { background: theme.palette.pink.main },
              }}
              sx={{ mb: "3rem" }}
            >
              <StyledTab value="new" label="New Arrival" />
              <StyledTab value="most-reviewed" label="Most Reviewed" />
              <StyledTab value="special-offer" label="Special Offer" />
            </Tabs>

            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent={"center"}
            >
              {products.map((product) => (
                <Grid key={product._id} item xs={9} sm={5} md={4}>
                  <Card
                    sx={{
                      maxWidth: 250,
                      boxShadow: "none",
                      textDecoration: "none",
                    }}
                    component={Link}
                    to={`/product/${product._id}`}
                  >
                    <CardActionArea>
                      <Box
                        height={200}
                        p={"2rem"}
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
                          sx={{
                            fontSize: "0.9rem",
                            display: "inline-block",
                            borderBottom: `solid ${theme.palette.primary.light} 2.5px`,
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Stack
                          direction={"row"}
                          justifyContent={"center"}
                          spacing={2}
                        >
                          <Typography
                            variant="body2"
                            color={theme.palette.pink.main}
                            sx={{
                              textDecoration: product.discount
                                ? "line-through"
                                : "",
                            }}
                          >
                            ${product.price}
                          </Typography>
                          {product.discount && (
                            <Typography
                              variant="body2"
                              color={theme.palette.secondary.dark4}
                            >
                              ${calcItemPrice(product)}
                            </Typography>
                          )}
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </section>
  );
};
export default LatestProducts;
