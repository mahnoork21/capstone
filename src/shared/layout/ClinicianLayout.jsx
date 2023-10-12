import ClinicianProvider from "@/context/ClinicianContext";
import { PageWrapper } from "./clinician-shared";
import Header from "../clinician/header/Header";
import { CurvedBackground } from "./clinician-shared";
import { Footer } from "../clinician/footer/Footer";

const ClinicianLayout = ({ children }) => {
  return (
    <>
    <PageWrapper>
      <Header/>
      <CurvedBackground />
      {children}
      {/* <Footer/> */}
    </PageWrapper>
    </>
  );
};

export default ClinicianLayout;
