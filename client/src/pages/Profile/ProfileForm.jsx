import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const StyledUpdateButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.green.main,
  "&:hover": {
    backgroundColor: theme.palette.green.mainHover,
  },
  marginTop: "1.5rem",
  fontSize: "0.9rem",
  padding: "0.5rem 1rem",
}));

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo?.name, userInfo?.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== conformPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id, //can only get here if logged in
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={submitHandler}
      elevation={4}
      sx={{ maxWidth: "540px", p: "2.5rem", mx: "auto", mt: "4rem" }}
    >
      <Typography
        gutterBottom
        variant="h2"
        color={theme.palette.secondary.main}
        fontWeight={700}
        textAlign={"center"}
      >
        Update Your Profile
      </Typography>
      
      <TextField
        name="name"
        id="name"
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        fullWidth
        color="info"
        sx={{ mt: "1rem" }}
      />

      <StyledUpdateButton disabled={isLoading} type="submit" fullWidth>
        Update
      </StyledUpdateButton>

      {isLoading && <Loader />}
    </Paper>
  );
};
export default ProfileForm;
