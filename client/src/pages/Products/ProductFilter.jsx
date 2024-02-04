import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  brandList,
  ratingOptions,
  discountOffers,
  colorList,
} from "../../constants/productFilterOptions";
import { useLocation } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CircleIcon from "@mui/icons-material/Circle";

const ProductFilters = ({ searchParams, setSearchParams }) => {
  const theme = useTheme();
  const location = useLocation();
  const { data, isLoading, error } = useGetCategoriesQuery();

  const handleCheckboxFilter = (e, filterType, filterTitle) => {
    const filter = filterTitle.toLowerCase();

    setSearchParams((prev) => {
      const prevFilters = prev.get(`${filterType}`)
        ? searchParams.get(`${filterType}`).split(",")
        : [];

      const updatedFilters = e.target.checked
        ? [...prevFilters, filter]
        : prevFilters.filter((f) => f !== filter);

      prev.set(filterType, updatedFilters.join(","));
      return prev;
    });
  };

  const isParamChecked = (filterType, filterTitle) => {
    const urlSearchParams = new URLSearchParams(location.search);

    const param = urlSearchParams.get(`${filterType}`) || "";
    return param.split(",").includes(filterTitle.toLowerCase());
  };

  return (
    <div>
      {/* Brands */}
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          color={theme.palette.secondary.main}
          sx={{
            display: "inline-block",
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          Product Brands
        </Typography>

        <List>
          {brandList.map((brand) => (
            <ListItem key={brand.value} sx={{ p: "0" }}>
              <FormControlLabel
                id={brand.value}
                name={brand.value}
                label={brand.title}
                checked={isParamChecked("brands", brand.title)}
                value={brand.value}
                onChange={(e) => handleCheckboxFilter(e, "brands", brand.title)}
                control={
                  <Checkbox
                    style={{
                      color: "#603EFF",
                    }}
                  />
                }
                sx={{ color: "#7E81A2" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Discount Offers */}
      <Box mt={"1.5rem"}>
        <Typography
          id="discounts"
          variant="h4"
          fontWeight={700}
          color={theme.palette.secondary.main}
          sx={{
            display: "inline-block",
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          Discount Offers
        </Typography>

        <RadioGroup aria-labelledby="discounts" name="discounts">
          {discountOffers.map((discount) => (
            <FormControlLabel
              key={discount.value}
              name="discount"
              value={discount.value}
              id={discount.value}
              label={discount.title}
              checked={discount.value === searchParams.get("discount")}
              onChange={() => {
                setSearchParams(
                  (prev) => {
                    prev.set("discount", discount.value);
                    return prev;
                  },
                  { replace: true }
                );
              }}
              control={
                <Radio
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  style={{ color: "#FF3EB2" }}
                />
              }
              sx={{ color: "#7E81A2" }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Ratings */}
      <Box mt={"1.5rem"}>
        <Typography
          id="discounts"
          variant="h4"
          fontWeight={700}
          color={theme.palette.secondary.main}
          sx={{
            display: "inline-block",
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          Product Ratings
        </Typography>

        <RadioGroup aria-labelledby="discounts" name="discounts">
          {ratingOptions.map((rating) => (
            <FormControlLabel
              key={rating.value}
              name="rating"
              value={rating.value}
              id={rating.value}
              label={<Rating value={rating.value} readOnly />}
              checked={rating.value === searchParams.get("rating")}
              onChange={() => {
                setSearchParams(
                  (prev) => {
                    prev.set("rating", rating.value);
                    return prev;
                  },
                  { replace: true }
                );
              }}
              control={
                <Radio
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  style={{ color: "#FFCC2E" }}
                />
              }
              sx={{ color: "#7E81A2" }}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Categories */}
      <Box mt={"1.5rem"}>
        <Typography
          variant="h4"
          fontWeight={700}
          color={theme.palette.secondary.main}
          sx={{
            display: "inline-block",
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          Product Categories
        </Typography>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <List>
            {data.categories.map((category) => (
              <ListItem
                key={category.name}
                sx={{ p: "0", textTransform: "capitalize" }}
              >
                <FormControlLabel
                  label={category.name}
                  id={category.name}
                  name={category.name}
                  value={category.name}
                  checked={isParamChecked("categories", category.name)}
                  onChange={(e) =>
                    handleCheckboxFilter(e, "categories", category.name)
                  }
                  control={
                    <Checkbox
                      style={{
                        color: "#FF3EB2",
                      }}
                    />
                  }
                  sx={{ color: "#7E81A2" }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Colors */}
      <Box mt={"1.5rem"} maxWidth={"250px"}>
        <Typography
          variant="h4"
          fontWeight={700}
          color={theme.palette.secondary.main}
          sx={{
            display: "inline-block",
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
          }}
        >
          Product Colors
        </Typography>

        <Grid component={List} container>
          {colorList.map((color) => (
            <Grid
              component={ListItem}
              item
              xs={4}
              key={color.value}
              sx={{ p: "0", textTransform: "capitalize" }}
            >
              <FormControlLabel
                label={color.title}
                id={color.value}
                name={color.value}
                value={color.value}
                checked={isParamChecked("colors", color.title)}
                onChange={(e) => handleCheckboxFilter(e, "colors", color.title)}
                control={
                  <Checkbox
                    icon={<CircleIcon />}
                    checkedIcon={<CircleIcon />}
                    style={{
                      color: color.value,
                      border: `2px solid ${
                        isParamChecked("colors", color.title)
                          ? color.value
                          : "transparent"
                      }`,
                    }}
                  />
                }
                sx={{ color: "#7E81A2" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ProductFilters;
