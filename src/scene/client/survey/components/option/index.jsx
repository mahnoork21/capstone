import { Radio } from "@mui/material";
import { PufiOptionResponse } from "./styled";

const Option = ({ checked, value, questionId, label, updateAnswer }) => {
  return (
    <PufiFormControlLabel
      checked={getSavedAnswer(step.questionId) == value}
      key={`${step.questionId}${optionIndex}`}
      value={value}
      control={<Radio />}
      name={`radio-buttons-${questionId}`}
      label={label}
      onClick={() => {
        updateAnswer(step.questionId, value, "value");
      }}
    />
  );
};

export default Option;
