import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeadingBar from "./components/HeadingBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <HeadingBar />
      <Navbar />
      <Outlet />
      <Footer />

      <ToastContainer />
    </ThemeProvider>
  );
};
export default App;
