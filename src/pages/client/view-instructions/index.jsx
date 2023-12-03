import ViewInstructions from "@/scene/client/view-instructions";
import useSurveyIdCheck from "@/utils/custom-hooks/useSurveyIdCheck";

const ViewInstructionsPage = () => {
  useSurveyIdCheck();

  return <ViewInstructions />;
};

export default ViewInstructionsPage;
