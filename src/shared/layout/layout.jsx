"use client";

import { useRouter } from "next/router";
import ClientLayout from "./ClientLayout";
import ClinicianLayout from "./ClinicianLayout";

const Layout = ({ children }) => {
  const router = useRouter();

  const isClinician = router.pathname.startsWith("/clinician");

  return isClinician ? (
    <ClinicianLayout>{children}</ClinicianLayout>
  ) : (
    <ClientLayout>{children}</ClientLayout>
  );
};

export default Layout;
