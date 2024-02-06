import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useGetTopRatedProductsQuery } from "../slices/productsApiSlice";
import { useState } from "react";
import Loader from "./Loader";
import {
  Container,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
  Typography,
  Button,
  Box,
  MobileStepper,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import pinkBackground1 from "../images/shared/hero/pinkBackground1.svg";
import pinkBackground2 from "../images/shared/hero/pinkBackground2.svg";
import blueBlob from "../images/shared/hero/blueBlob.svg";
import chandelier from "../images/shared/hero/chandelier.png";

const StyledImageContainer = styled("div")({
  position: "relative",

  "&::after": {
    content: '""',
    position: "absolute",
    top: "-40px",
    left: "-10px",
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundImage: `url(${pinkBackground1}), url(${pinkBackground2})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left, bottom 5px left 55px",
    backgroundSize: "84%, 87%",
  },
});

const StyledDiv = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundImage: `url(${chandelier})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left",
    backgroundSize: "300px",
  },

  [theme.breakpoints.down("xl")]: {
    "&::before": {
      display: "none",
    },
  },
}));

const StyledShopNowButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.pink.main,
  "&:hover": {
    backgroundColor: theme.palette.pink.mainHover,
  },
  marginTop: "1.5rem",
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const Hero = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const {
    data: products,
    isLoading,
    error,
  } = useGetTopRatedProductsQuery({ discount: 20, limit: 3 });
  const maxSteps = products?.length || 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Alert severity="error">{error?.data?.message || error.error}</Alert>
  ) : (
    <Box sx={{ bgcolor: theme.palette.primary.main }}>
      <StyledDiv>
        <Container
          maxWidth={false}
          sx={{ py: "2rem", pt: { sm: "3rem", lg: "2rem" } }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent={isMobile ? "center" : "space-between"}
            spacing={isMobile ? 0 : 6}
          >
            <Grid item xs={11} sm={8} md={6}>
              <Typography
                variant="body2"
                color={theme.palette.pink.main}
                sx={{ mb: "1rem" }}
              >
                Best Furniture For Your Castle....
              </Typography>
              <Typography
                variant="h2"
                fontWeight={700}
                sx={{
                  bgcolor: "inherit",
                  fontSize: { xs: "1.5rem", sm: "2rem", xl: "2.5rem" },
                }}
              >
                New Furniture Collection Trends in 2024
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.primary.darkest}
                sx={{ mt: "1rem", fontSize: { xs: "15px", md: "1rem" } }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </Typography>

              <StyledShopNowButton
                variant="contained"
                component={Link}
                to="/products"
              >
                Shop Now
              </StyledShopNowButton>
            </Grid>

            <Grid
              item
              xs={10}
              sm={8}
              md={6}
              sx={{
                display: { xs: "none", sm: "block" },
                mt: { sm: "1.5rem", md: "0" },
              }}
            >
              <StyledImageContainer>
                <Box
                  component="img"
                  sx={{
                    width: 450,
                    aspectRatio: 1,
                    position: "relative",
                    zIndex: 5,
                  }}
                  alt={products[activeStep]?.name}
                  src={products[activeStep]?.image}
                />

                <Box position="absolute" top={"10%"} right={30} zIndex={6}>
                  <Box
                    component="img"
                    sx={{
                      width: 80,
                      aspectRatio: 1,
                    }}
                    alt=""
                    src={blueBlob}
                  />
                  <Typography
                    variant="body1"
                    color="white"
                    fontWeight={700}
                    position="absolute"
                    top="50%"
                    left="50%"
                    sx={{
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    20%+ off
                  </Typography>
                </Box>
              </StyledImageContainer>
            </Grid>
          </Grid>

          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              bgcolor: "inherit",
              display: { xs: "none", sm: "flex" },
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                sx={{
                  color: theme.palette.pink.main,
                }}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ color: theme.palette.pink.main }}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Container>
      </StyledDiv>
    </Box>
  );
};

export default Hero;
