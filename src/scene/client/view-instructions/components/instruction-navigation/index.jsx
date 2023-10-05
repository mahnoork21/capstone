import { Button } from "@mui/material";
import PositionIndicator from "./components/position-indicator";
import { InstructionNavigationContainer } from "./styled";

const InstructionNavigation = ({
  activePositionId,
  onBackClick,
  onNextClick,
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
          <img src="/instructions/navigation/next-arrow.svg" alt="Next" />
        }
        onClick={onNextClick}
      >
        Next
      </Button>
    </InstructionNavigationContainer>
  );
};

export default InstructionNavigation;
