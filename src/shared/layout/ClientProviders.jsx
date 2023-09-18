import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3A9034",
    },
    secondary: {
      main: "#1979BE",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    button: {
      lineHeight: 1.5,
    },
  },
});

const ClientProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ClientProviders;
