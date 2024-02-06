import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} mt={"2rem"}>
      <CircularProgress sx={{ color: "pink.main" }} />
    </Box>
  );
};

export default Loader;
