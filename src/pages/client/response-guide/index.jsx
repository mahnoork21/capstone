import ResponseGuide from "@/scene/client/response-guide";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";

const ResponseGuidePage = () => {
  useSurveyIdCheck();

  return <ResponseGuide />;
};

export default ResponseGuidePage;
