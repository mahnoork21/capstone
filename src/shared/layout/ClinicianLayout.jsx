import { useRouter } from "next/router";

import Footer from "../clinician/footer";
import AuthHeader from "../clinician/header/AuthHeader";
import NormalHeader from "../clinician/header/NormalHeader";
import {
  CurvedBackground,
  NormalBackground,
  PageWrapper,
} from "./clinician-shared";
import ClinicianProviders from "./ClinicianProviders";
import { Sidebar } from "../clinician/sidebar/Sidebar";

const ClinicianLayout = ({ children }) => {
  const router = useRouter();
  const isAuth = router.pathname === "/clinician/auth";

  return (
    <ClinicianProviders>
      <PageWrapper>
        {isAuth ? <AuthHeader /> : <NormalHeader />}
        {isAuth ? <CurvedBackground /> : <NormalBackground />}
        {/* {isAuth ? <></> : <Sidebar />} */}
        {children}
        {isAuth && <Footer />}
      </PageWrapper>
    </ClinicianProviders>
  );
};

export default ClinicianLayout;
