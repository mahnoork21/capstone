import { ClientContext, ClientProvider } from "@/context/ClientContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useContext } from "react";
import { IntlProvider } from "react-intl";

import messages_fr from "../../translations/fr.json";

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

const messages = {
  fr: messages_fr,
};

const InternalizationWrapper = ({ children }) => {
  const { locale } = useContext(ClientContext);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

const ClientProviders = ({ children }) => {
  return (
    <ClientProvider>
      <ThemeProvider theme={theme}>
        <InternalizationWrapper>{children}</InternalizationWrapper>
      </ThemeProvider>
    </ClientProvider>
  );
};

export default ClientProviders;
