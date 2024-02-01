import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#f2f0ff",
      main: "#f6f7fb",
      medium: "#b7bacb",
      dark: "#b2b2b2",
      darkest: "#8a8fb9",
      contrastText: "#000",
    },
    secondary: {
      lightest: "#00c1fe",
      light: "#26cbff",
      medium: "#1389ff",
      dark1: "#3f509e",
      dark2: "#5e37ff",
      dark3: "#2f1ac4",
      dark4: "#151875",
      mainHover: "rgba(13, 14, 67, 0.6)",
      main: "#0d0e43",
      contrastText: "#fff",
    },
    purple: {
      lightest: "#e5e0fc",
      light: "rgba(236, 210, 250, 0.35)",
      medium: "#e248ff",
      main: "#7E33E0",
      dark: "#603eff",
      contrastText: "#f1f1f1",
    },
    pink: {
      light: "#ffdbf1",
      mainHover: "rgba(251, 46, 134, 0.8)",
      main: "#fb2e86",
      contrastText: "#fff",
    },
    yellow: {
      main: "#ffcc2e",
    },
    brown: {
      main: "#ffbf95",
    },
    orange: {
      main: "#ff9437",
    },
    green: {
      main: "#08d15f",
      medium: "#33d221",
    },
  },
  typography: {
    fontFamily: "'Josefin Sans', sans-serif",

    fontSize: "1rem",

    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1100px",
        },
      },
    },
  },
});

// const themes = {
//   colors: {
//     black: "#000",
//     white: "#fff",

//     gray3: "#f6f7fb",
//     gray4: "#f2f0ff",
//     gray7: "#b7bacb",
//     gray8: "#b2b2b2",
//     gray10: "#8a8fb9",

//     pink3: "#ffdbf1",
//     pink8: "#fb2e86",

//     purple2: "#e5e0fc",
//     purple5: "rgba(236, 210, 250, 0.35)",
//     purple8: "#e248ff",
//     purple10: "#603eff",
//     purple12: "#7E33E0",

//     yellow7: "#ffcc2e",

//     brown3: "#ffbf95",

//     orange7: "#ff9437",

//     green7: "#08d15f",
//     green9: "#33d221",

//     blue7: "#00c1fe",
//     blue9: "#26cbff",
//     blue11: "#1389ff",
//     blue13: "#3f509e",
//     blue14: "#5e37ff",
//     blue17: "#2f1ac4",
//     blue19: "#151875",
//     blue22: "#0d0e43",
//   },
//   typography: {
//     // Font families
//     ffPrimary: "Josefin Sans, sans-serif",

//     // Font sizes
//     fs2: "0.75rem", // 12px
//     fs3: "0.875rem", // 14px
//     fs4: "0.9375rem", // 15px
//     fs5: "1rem", // 16px
//     fs6: "1.0625rem", // 17px
//     fs7: "1.125rem", // 18px
//     fs9: "1.375rem", // 22px
//     fs11: "1.5rem", // 24px
//     fs16: "2rem", // 32px
//     fs18: "2.25rem", // 36px
//     fs19: "2.375rem", // 38px
//     fs22: "2.625rem", // 42px
//     fs31: "3.3125rem", // 53px

//     // Font weights
//     fwLight: 300,
//     fwBase: 400,
//     fwMedium: 500,
//     fwSemibold: 600,
//     fwBold: 700,
//   },
//   screens: {
//     sm: "640px",
//     md: "768px",
//     lg: "1024px",
//     xl: "1280px",
//     xl2: "1536px",
//   },
// };

export default theme;
