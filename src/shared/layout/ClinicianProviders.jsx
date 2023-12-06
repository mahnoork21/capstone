import { ClinicianProvider } from "@/context/ClinicianContext";
import SnackbarContextProvider from "@/context/snackbarContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1979BE",
    },
    secondary: {
      main: "#3A9034",
    },
  },
  typography: {
    fontFamily: "Open Sans",
    button: {
      lineHeight: 1.5,
    },
  },
});

const ClinicianProviders = ({ children }) => {
  return (
    <ClinicianProvider>
      <SnackbarContextProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SnackbarContextProvider>
    </ClinicianProvider>
  );
};

export default ClinicianProviders;
