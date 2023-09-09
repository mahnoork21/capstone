import { useRouter } from "next/router";
import ClientLayout from "./ClientLayout";

// import clinicianStyles from "./clinician.module.css;";

const Layout = ({ children }) => {
  const router = useRouter();

  const isClient = router.pathname.startsWith("/client");
  console.log(isClient, router.pathname);

  return isClient ? (
    <ClientLayout>{children}</ClientLayout>
  ) : (
    <div>{children}</div>
  );
};

export default Layout;
