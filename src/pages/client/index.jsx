import ClientHome from "../../scene/client/home";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";

const ClientHomePage = () => {
  useSurveyIdCheck();

  return <ClientHome />;
};

export default ClientHomePage;
