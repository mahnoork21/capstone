const { useRouter } = require("next/router");
const { useEffect } = require("react");

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/client");
  });
  return <div></div>;
};

export default IndexPage;
