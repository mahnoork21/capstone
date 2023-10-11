"use client";

import { useRouter } from "next/router";
import ClientLayout from "./ClientLayout";
import ClinicianLayout from "./ClinicianLayout";

const Layout = ({ children }) => {
  const router = useRouter();

  const isClient = router.pathname.startsWith("/client");

  return isClient ? (
    <ClientLayout>{children}</ClientLayout>
  ) : (
    <ClinicianLayout>{children}</ClinicianLayout>
  );
};

export default Layout;
