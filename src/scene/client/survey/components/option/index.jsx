import { Radio } from "@mui/material";
import { OptionContentWrapper, PufiFormControlLabel } from "./styled";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Option = ({
  checked,
  value,
  questionId,
  label,
  updateAnswer,
  handleOnMiniGuideClick,
}) => {
  return (
    <OptionContentWrapper>
      <PufiFormControlLabel
        checked={checked}
        key={`${questionId}${label}`}
        value={value}
        control={<Radio />}
        label={label}
        onClick={() => {
          updateAnswer(questionId, value, "value");
        }}
      />
      {["how", "well", "without"].includes(questionId) && (
        <HelpOutlineIcon
          onClick={(event) => {
            handleOnMiniGuideClick(event, {
              questionId: questionId,
              label: label,
            });
          }}
        />
      )}
    </OptionContentWrapper>
  );
};

export default Option;
