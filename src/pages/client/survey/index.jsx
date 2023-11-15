import Survey from "@/scene/client/survey";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";

const SurveyPage = () => {
  useSurveyIdCheck();

  return <Survey />;
};

export default SurveyPage;
