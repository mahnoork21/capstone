import Layout from "@/shared/layout/layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isClient = router.pathname.startsWith("/client");

  if (isClient) {
    import("@/styles/globals-client.css");
  } else {
    import("@/styles/globals-clinician.css");
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
