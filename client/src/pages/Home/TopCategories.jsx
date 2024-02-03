import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import { Link } from "react-router-dom";

const StyledViewButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "35px",
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

const StyledCategoryBox = styled(Box)(
  ({ theme, hoveredCategoryIndex, index }) => ({
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 27px 0px",
    padding: "2.5rem",
    position: "relative",
    borderRadius: "999px",
    backgroundColor: theme.palette.primary.main,
    width: { xs: "150px", md: "200px" },
    aspectRatio: "1",

    "&:hover .categoryHoverVisible": {
      display: "block",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "inherit",
      borderLeft: `4px solid ${
        hoveredCategoryIndex === index
          ? theme.palette.purple.dark1
          : "transparent"
      }`,
      borderBottom: `7px solid ${
        hoveredCategoryIndex === index
          ? theme.palette.purple.dark1
          : "transparent"
      }`,
      transition: "width 0.3s ease",
    },
  })
);

const TopCategories = () => {
  const theme = useTheme();
  const [pageNum, setPageNum] = useState(1);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState(null);

  const { data, isLoading, error } = useGetCategoriesQuery({
    limit: 4,
    page: pageNum,
  });

  return (
    <section>
      <Container maxWidth={false} sx={{ textAlign: "center" }}>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
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
              spacing={{ xs: 5, md: 6 }}
              justifyContent={{ xs: "center", md: "space-between" }}
              alignItems={"center"}
            >
              {data.categories.map((category, index) => (
                <Grid item xs={5} sm={4} md={3}>
                  <StyledCategoryBox
                    boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 27px 0px"}
                    p={{ xs: "1.5rem", sm: "2.5rem" }}
                    position={"relative"}
                    borderRadius={"999px"}
                    bgcolor={theme.palette.primary.main}
                    onMouseEnter={() => setHoveredCategoryIndex(index)}
                    onMouseLeave={() => setHoveredCategoryIndex(null)}
                    hoveredCategoryIndex={hoveredCategoryIndex}
                    index={index}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      src={category.image}
                      alt={category.name}
                    />

                    <StyledViewButton
                      component={Link}
                      to={`/products?categories=${encodeURIComponent(
                        category.name
                      )}`}
                      className="categoryHoverVisible"
                      variant="contained"
                      sx={{ display: "none" }}
                    >
                      View Details
                    </StyledViewButton>
                  </StyledCategoryBox>
                  <Typography
                    variant="h4"
                    textTransform={"capitalize"}
                    mt={"0.5rem"}
                    color={theme.palette.secondary.main}
                  >
                    {category.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Paginate
              pages={data.pages}
              currentPageNum={pageNum}
              setPageNum={setPageNum}
              listItemStyles={{
                borderRadius: "50%",
                border: `1px solid ${theme.palette.pink.main}`,
                width: "10px",
                height: "10px",
                indicatorColor: theme.palette.pink.main,
                bgColor: "transparent",
              }}
            />
          </>
        )}
      </Container>
    </section>
  );
};
export default TopCategories;
