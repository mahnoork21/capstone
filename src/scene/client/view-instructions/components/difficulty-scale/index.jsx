import { GreyHeader } from "../activity-guide/styled";
import DifficultyScaleInstructionArea from "@/shared/client/section/difficulty-scale-instruction-area";
import { DifficultyScaleWrapper } from "./styled";

const DifficultyScale = () => {
  return (
    <DifficultyScaleWrapper>
      <GreyHeader>
        <h1>Difficulty Scale</h1>
        <p>
          This information will help you understand the questions in the survey.
          This information will also be available within the survey.
        </p>
      </GreyHeader>
      <DifficultyScaleInstructionArea />
    </DifficultyScaleWrapper>
  );
};

export default DifficultyScale;
