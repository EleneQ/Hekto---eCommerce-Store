import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./components/styles/theme";
import GlobalStyles from "./components/styles/Globals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeadingBar from "./components/HeadingBar";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <HeadingBar />
      <Navbar />

      <Outlet />

      <ToastContainer />
    </ThemeProvider>
  );
};
export default App;
