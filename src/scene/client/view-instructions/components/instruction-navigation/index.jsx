import PositionIndicator from "./components/position-indicator";
import { InstructionNavigationContainer } from "./styled";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";
import SurveyNavButton from "@/shared/client/buttons/survey-nav-buttons";
import PrimaryClientButton from "@/shared/client/buttons/primary";
import { useRouter } from "next/router";

const InstructionNavigation = ({
  activePositionId,
  onBackClick,
  onNextClick,
  nextButtonDisabled,
}) => {
  const { currentSurveyId } = useContext(ClientContext);
  const router = useRouter();

  return (
    <InstructionNavigationContainer>
      <SurveyNavButton isBack className="nav-button" onClick={onBackClick}>
        Back
      </SurveyNavButton>
      <PositionIndicator activePositionId={activePositionId} />
      {nextButtonDisabled ? (
        <PrimaryClientButton
          onClick={() => {
            router.push({
              pathname: "/client/survey",
              query: { surveyId: currentSurveyId },
            });
          }}
        >
          Start Survey
        </PrimaryClientButton>
      ) : (
        <SurveyNavButton onClick={onNextClick}>Next</SurveyNavButton>
      )}
    </InstructionNavigationContainer>
  );
};

export default InstructionNavigation;
