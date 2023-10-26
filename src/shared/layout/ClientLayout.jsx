import Footer from "../client/footer";
import Header from "../client/header/Header";
import { CurvedBackground, PageWrapper } from "./client-shared";
import ClientProviders from "./ClientProviders";

const ClientLayout = ({ children }) => {
  return (
    <ClientProviders>
      <PageWrapper>
        <Header />
        <CurvedBackground />
        {children}
        <Footer />
      </PageWrapper>
    </ClientProviders>
  );
};

export default ClientLayout;
