import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

const HeadingBar = () => {
  const theme = useTheme();

  return (
    <Box
      p={"0.3rem"}
      textAlign={"center"}
      sx={{ backgroundColor: theme.palette.purple.main }}
    >
      <Typography variant="body2" color={theme.palette.purple.contrastText}>
        Hurry up - we're offering discounts!
      </Typography>
    </Box>
  );
};

export default HeadingBar;
