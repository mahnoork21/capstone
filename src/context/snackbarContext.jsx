import { useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { createContext } from "react";

const SnackbarContext = createContext(null);

export default function SnackbarContextProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarShowToggle = () =>
    setSnackbar((snack) => ({ ...snack, open: !snack.open }));
  const changeSnackbarMessage = (message) =>
    setSnackbar((snack) => ({ ...snack, message: message }));
  const changeSnackbarSeverity = (severity) =>
    setSnackbar((snack) => ({ ...snack, severity: severity }));

  const showSnackbar = (severity, message) => {
    setSnackbar({
      open: true,
      message: message,
      severity: severity,
    });
  };

  return (
    <SnackbarContext.Provider
      value={{
        handleSnackbarShowToggle,
        changeSnackbarMessage,
        changeSnackbarSeverity,
        showSnackbar,
      }}
    >
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarShowToggle}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarShowToggle}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarContextProvider"
    );
  }
  return context;
};
