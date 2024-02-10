import { Link } from "react-router-dom";
import { Container, Alert, styled, Button } from "@mui/material";

const StyledShopNowButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  marginTop: "1.5rem",
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const CancelPage = () => {
  return (
    <Container maxWidth={false} sx={{ mt: "7rem" }}>
      <Alert severity="warning" sx={{ maxWidth: "500px" }}>
        Your Order Was Cancalled
      </Alert>
      <StyledShopNowButton component={Link} to="/">
        Go Back
      </StyledShopNowButton>
    </Container>
  );
};
export default CancelPage;
