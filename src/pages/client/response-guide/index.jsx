import { ClientContext } from "@/context/ClientContext";
import ResponseGuide from "@/scene/client/response-guide";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";
import { useRouter } from "next/router";
import { useContext } from "react";

const ResponseGuidePage = () => {
  useSurveyIdCheck();

  return <ResponseGuide />;
};

export default ResponseGuidePage;
