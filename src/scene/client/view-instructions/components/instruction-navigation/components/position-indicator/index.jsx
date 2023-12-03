import Position from "../position";
import { StyledPositionIndicator } from "./styled";

const PositionIndicator = ({ activePositionId }) => {
  return (
    <StyledPositionIndicator>
      <Position
        key={`pos0-${activePositionId}`}
        active={activePositionId === 0}
      />
      <Position
        key={`pos1-${activePositionId}`}
        active={activePositionId === 1}
      />
      <Position
        key={`pos2-${activePositionId}`}
        active={activePositionId === 2}
      />
      <Position
        key={`pos3-${activePositionId}`}
        active={activePositionId === 3}
      />
    </StyledPositionIndicator>
  );
};

export default PositionIndicator;
