import { useState, useEffect } from "react";
import { Link as LinkRouter, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  styled,
  useTheme,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledLoginButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.pink.main,
  "&:hover": {
    backgroundColor: theme.palette.pink.mainHover,
  },
  marginTop: "1.5rem",
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const RegisterPage = () => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      toast.error("Passwords don't match");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));

        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <Container component={"section"} maxWidth={false}>
      <Paper
        component="form"
        onSubmit={submitHandler}
        elevation={4}
        sx={{ maxWidth: "540px", p: "2.5rem", mx: "auto", mt: "5rem" }}
      >
        <Typography
          variant="h2"
          color={theme.palette.secondary.main}
          fontWeight={700}
          textAlign={"center"}
        >
          Login
        </Typography>

        <TextField
          name="name"
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          autoFocus
          color="info"
          sx={{ mt: "1rem" }}
        />

        <TextField
          name="email"
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          color="info"
          sx={{ mt: "1rem" }}
        />

        <TextField
          name="password"
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          color="info"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  sx={{ fontSize: "1.2rem" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mt: "1rem" }}
        />

        <TextField
          name="confirmPassword"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={conformPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          color="info"
          sx={{ mt: "1rem" }}
        />

        <StyledLoginButton disabled={isLoading} type="submit" fullWidth>
          Register
        </StyledLoginButton>

        {isLoading && <Loader />}

        <Typography
          variant="body1"
          color={theme.palette.primary.dark1}
          sx={{ mt: "1rem" }}
        >
          Already registered?{" "}
          <Link
            variant="body1"
            underline="always"
            component={LinkRouter}
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            sx={{
              color: theme.palette.secondary.main,
              textDecorationColor: theme.palette.secondary.main,
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};
export default RegisterPage;
