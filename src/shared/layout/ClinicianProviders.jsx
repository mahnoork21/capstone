import { ClinicianProvider } from "@/context/ClinicianContext";
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

const ClientProviders = ({ children }) => {
  return (
    <ClinicianProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ClinicianProvider>
  );
};

export default ClientProviders;
