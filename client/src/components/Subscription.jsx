import { useState } from "react";
import {
  Typography,
  useTheme,
  styled,
  Container,
  Paper,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import background from "../images/shared/subscription/background.png";

const StyledSection = styled("section")({
  marginBlock: "5rem",
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
});

const Subscription = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setEmail("");
  };

  return (
    <StyledSection>
      <Container maxWidth={false} sx={{ textAlign: "center", py: "3rem" }}>
        <Typography
          variant="h2"
          color={theme.palette.secondary.main}
          fontWeight={700}
          mt="5rem"
          mb="2rem"
          maxWidth={"450px"}
          mx={"auto"}
        >
          Get Latest Updates By Subscribing To Our Newsletter
        </Typography>

        <Paper
          component="form"
          onSubmit={submitHandler}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            mx: "auto",
            mt: "3rem",
          }}
        >
          <TextField
            variant="standard"
            color={theme.palette.secondary.main}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            autoFocus
            sx={{ ml: 1, flex: 1, border: "none" }}
            placeholder="Enter your email"
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Divider sx={{ height: 30, my: 0.5, mx: 1 }} orientation="vertical" />
          <Button
            type="submit"
            sx={{
              textTransform: "capitalize",
              fontSize: "0.85rem",
              bgcolor: theme.palette.pink.main,
              color: "white",
              "&:hover": {
                bgcolor: theme.palette.pink.mainHover,
              },
            }}
            aria-label="search"
          >
            Subscribe
          </Button>
        </Paper>
      </Container>
    </StyledSection>
  );
};
export default Subscription;
