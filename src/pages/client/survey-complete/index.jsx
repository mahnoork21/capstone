import SurveyComplete from "@/scene/client/survey-complete";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";

const SurveyCompletePage = () => {
  useSurveyIdCheck();

  return <SurveyComplete />;
};

export default SurveyCompletePage;
