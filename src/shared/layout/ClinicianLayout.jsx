import Footer from "../clinician/footer";
import AuthHeader from "../clinician/header/AuthHeader";
import { CurvedBackground, PageWrapper } from "./clinician-shared";
import ClinicianProviders from "./ClinicianProviders";

const ClinicianLayout = ({ children }) => {
  return (
    <ClinicianProviders>
      <PageWrapper>
        <AuthHeader />
        <CurvedBackground />
        {children}
        <Footer />
      </PageWrapper>
    </ClinicianProviders>
  );
};

export default ClinicianLayout;
