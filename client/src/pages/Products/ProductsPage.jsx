import { useSearchParams } from "react-router-dom";
import {
  Box,
  IconButton,
  Container,
  Drawer,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchBox from "../../components/SearchBox";
import ProductFilters from "./ProductFilter";
import Products from "./Products";
import Sort from "./Sort";
import { useState } from "react";
import ListRoundedIcon from "@mui/icons-material/ListRounded";

const ProductsPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [searchParams, setSearchParams] = useSearchParams({ p: 1 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const params = {
    page: searchParams.get("p") || 1,
    limit: 8,
    keyword: searchParams.get("q") || "",
    sort: searchParams.get("sort") || "",
    rating: searchParams.get("rating") || 0,
    brands: searchParams.get("brands") || [],
    discount: searchParams.get("discount") || 0,
    colors: searchParams.get("colors") || [],
    categories: searchParams.get("categories") || [],
  };

  const toggleDrawer = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <Box component={"section"} mt={{ xs: "4rem", md: "5rem" }}>
      <Container maxWidth={false}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"space-between"}
          aligItems={"center"}
          sx={{ mb: "2.5rem" }}
        >
          <Typography
            variant="h1"
            fontWeight={700}
            fontSize={{ xs: "1.3rem", md: "1.2rem" }}
            mb={{ xs: "1rem", md: "0" }}
          >
            Accessories & Fashion items
          </Typography>

          <Stack
            direction={"row"}
            justifyContent={{ xs: "space-between", md: "center" }}
            aligItems={"center"}
            spacing={3}
          >
            {/* SMALL SCREEN SIDEBAR */}
            {isSmallScreen && (
              <Box>
                <IconButton
                  onClick={() => setSidebarOpen(true)}
                  sx={{
                    fontSize: "2.5rem",
                    color: theme.palette.secondary.main,
                  }}
                >
                  <ListRoundedIcon />
                </IconButton>
                <Drawer anchor="left" open={sidebarOpen} onClose={toggleDrawer}>
                  <Box sx={{ width: 250, p: "2rem" }} role="presentation">
                    <ProductFilters
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                    />
                  </Box>
                </Drawer>
              </Box>
            )}

            <SearchBox setSearchParams={setSearchParams} />

            <Sort
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={{ xs: "center", md: "space-between" }}
          aligItems={"center"}
          spacing={{ md: 5 }}
        >
          {/* BIG SCREEN SIDEBAR */}
          {!isSmallScreen && (
            <Box display={{ xs: "none", md: "block" }}>
              <ProductFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </Box>
          )}

          {/* PRODUCT LIST */}
          <Products params={params} setSearchParams={setSearchParams} />
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductsPage;
