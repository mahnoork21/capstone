import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/clinician/login");
  });
  return <div></div>;
};

export default IndexPage;
