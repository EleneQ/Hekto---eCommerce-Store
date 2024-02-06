import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import {
  Alert,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Loader from "./Loader";
import { informationList, companyInfoList } from "../constants/footerData";
import { useSelector } from "react-redux";

const StyledFooter = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark2,
  padding: "3rem",
  marginTop: "6rem",
}));

const StyledSubscriptionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.pink.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.pink.mainHover,
  },
  marginTop: "1.5rem",
  fontSize: "0.9rem",
  p: "0.5rem 1rem",
}));

const Footer = () => {
  const theme = useTheme();
  const { data, isLoading, error } = useGetCategoriesQuery();

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <StyledFooter>
      <Container>
        <Grid
          container
          justifyContent={{ md: "space-between" }}
          spacing={{ xs: 5, sm: 7 }}
          color={theme.palette.primary.darkest}
        >
          <Grid item xs={{ xs: 6, md: 5 }}>
            <Typography
              variant="h2"
              noWrap
              fontWeight={700}
              fontSize={"1.8rem"}
              sx={{
                color: theme.palette.secondary.main,
              }}
            >
              Hekto
            </Typography>

            <StyledSubscriptionButton
              variant="contained"
              component={Link}
              to="/register"
              disabled={userInfo}
            >
              Register Now
            </StyledSubscriptionButton>

            <Typography variant="body2" mt="2rem">
              Contact Info:
              <div>17 Princess Road, London, Greater London NW1 8JR, UK</div>
            </Typography>
          </Grid>

          <Grid item xs={{ xs: 6, md: 3 }}>
            <Typography
              variant="h3"
              fontWeight={700}
              mt="2rem"
              color={theme.palette.secondary.main}
            >
              Categories
            </Typography>

            <List>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Alert severity="error">
                  {error?.data?.message || error.error}
                </Alert>
              ) : (
                data.categories.map((category, index) => (
                  <ListItem
                    key={index}
                    component={Link}
                    to={`/products?categories=${encodeURIComponent(
                      category.name
                    )}`}
                    sx={{
                      cursor: "pointer",
                      p: "0.2rem 0",
                      textTransform: "capitalize",
                      color: theme.palette.primary.darkest,
                    }}
                  >
                    {category.name}
                  </ListItem>
                ))
              )}
            </List>
          </Grid>

          <Grid item xs={{ xs: 6, md: 2 }}>
            <Typography
              variant="h3"
              fontWeight={700}
              mt="2rem"
              color={theme.palette.secondary.main}
            >
              Information
            </Typography>

            <List>
              {informationList.map((info) => (
                <ListItem sx={{ cursor: "pointer", p: "0.2rem 0" }}>
                  {info.name}
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={{ xs: 6, md: 2 }}>
            <Typography
              variant="h3"
              fontWeight={700}
              mt="2rem"
              color={theme.palette.secondary.main}
            >
              Company
            </Typography>

            <List>
              {companyInfoList.map((info) => (
                <ListItem sx={{ cursor: "pointer", p: "0.2rem 0" }}>
                  {info.name}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};
export default Footer;
