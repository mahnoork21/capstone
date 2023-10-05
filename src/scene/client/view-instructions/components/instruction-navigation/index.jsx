import { Button } from "@mui/material";
import PositionIndicator from "./components/position-indicator";
import { InstructionNavigationContainer } from "./styled";

const InstructionNavigation = ({
  activePositionId,
  onBackClick,
  onNextClick,
  nextButtonDisabled,
}) => {
  return (
    <InstructionNavigationContainer>
      <Button
        variant="outlined"
        startIcon={
          <img src="/instructions/navigation/back-arrow.svg" alt="Back" />
        }
        onClick={onBackClick}
      >
        Back
      </Button>
      <PositionIndicator activePositionId={activePositionId} />
      <Button
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
    </InstructionNavigationContainer>
  );
};

export default InstructionNavigation;
