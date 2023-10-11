import { Button } from "@mui/material";
import PositionIndicator from "./components/position-indicator";
import { InstructionNavigationContainer } from "./styled";
import { StyledButton } from "@/scene/client/components/button";
import Link from "next/link";

const InstructionNavigation = ({
  activePositionId,
  onBackClick,
  onNextClick,
  nextButtonDisabled,
}) => {
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
        <Link href="/client/survey">
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
