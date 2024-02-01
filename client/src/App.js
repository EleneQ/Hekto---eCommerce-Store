import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./components/styles/theme";
// import GlobalStyles from "./components/styles/Globals";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeadingBar from "./components/HeadingBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <GlobalStyles /> */}
      <CssBaseline />

      <HeadingBar />
      <Navbar />
      <Hero />

      <Outlet />

      <ToastContainer />
    </ThemeProvider>
  );
};
export default App;
