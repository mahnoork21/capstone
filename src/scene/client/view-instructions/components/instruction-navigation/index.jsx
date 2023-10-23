import { Button } from "@mui/material";
import PositionIndicator from "./components/position-indicator";
import { InstructionNavigationContainer } from "./styled";
import { StyledButton } from "@/scene/client/home/components/button";
import Link from "next/link";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";

const InstructionNavigation = ({
  activePositionId,
  onBackClick,
  onNextClick,
  nextButtonDisabled,
}) => {
  const { currentSurveyId } = useContext(ClientContext);

  return (
    <InstructionNavigationContainer>
      <Button
        className="nav-button"
        variant="outlined"
        startIcon={
          <img src="/instructions/navigation/back-arrow.svg" alt="Back" />
        }
        onClick={onBackClick}
      >
        Back
      </Button>
      <PositionIndicator activePositionId={activePositionId} />
      {nextButtonDisabled ? (
        <Link
          href={{
            pathname: "/client/survey",
            query: { surveyId: currentSurveyId },
          }}
        >
          <StyledButton primary variant="contained">
            START SURVEY
          </StyledButton>
        </Link>
      ) : (
        <Button
          className="nav-button"
          variant="outlined"
          endIcon={
            <img
              src={`/instructions/navigation/next-arrow-${
                nextButtonDisabled ? "disabled" : "enabled"
              }.svg`}
              alt="Next"
            />
          }
          onClick={onNextClick}
          disabled={nextButtonDisabled}
        >
          Next
        </Button>
      )}
    </InstructionNavigationContainer>
  );
};

export default InstructionNavigation;
