// import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#098CDC",
      light: "#313439",
      contrastText: "red",
    },
    secondary: {
      main: "#06044a",
      light: "#4c02f1",
      contrastText: "#098CDC",
    },
    text: {
      primary: "#151515",
      secondary: "#35343f",
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      ".img-fluid": {
        maxWidth: "100%",
        height: "auto",
      },
    },
  },
};

theme = responsiveFontSizes(theme);

export default theme;
