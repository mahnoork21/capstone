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
  const { surveyId, clinicianId, organizationId } = useContext(ClientContext);
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
              query: {
                orgId: organizationId,
                clinicianId: clinicianId,
                surveyId: surveyId,
              },
            });
          }}
        >
          Start PUFI-2
        </PrimaryClientButton>
      ) : (
        <SurveyNavButton onClick={onNextClick}>Next</SurveyNavButton>
      )}
    </InstructionNavigationContainer>
  );
};

export default InstructionNavigation;
