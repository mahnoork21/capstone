import Layout from "@/shared/layout/layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isClinician = router.pathname.startsWith("/clinician");

  if (isClinician) {
    import("@/styles/globals-clinician.css");
  } else {
    import("@/styles/globals-client.css");
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
