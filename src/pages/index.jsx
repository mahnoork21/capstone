import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/client");
  });
  return <div></div>;
};

export default IndexPage;
