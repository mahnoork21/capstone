import Footer from "../client/footer";
import NormalHeader from "@/shared/clinician/header/NormalHeader";
import { CurvedBackground, PageWrapper } from "./client-shared";
import ClientProviders from "./ClientProviders";

const ClientLayout = ({ children }) => {
  return (
    <ClientProviders>
      <PageWrapper>
        <lHeader />
        <CurvedBackground />
        {children}
        <Footer />
      </PageWrapper>
    </ClientProviders>
  );
};

export default ClientLayout;
