import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress sx={{ color: "pink.main" }} />
    </div>
  );
};

export default Loader;
