import SummaryContent from "@/scene/client/summary";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";

const SummaryPage = () => {
  useSurveyIdCheck();

  return <SummaryContent />;
};

export default SummaryPage;
