import { Radio } from "@mui/material";
import { OptionContentWrapper, PufiFormControlLabel } from "./styled";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PufiToolTip from "@/shared/components/pufi-tooltip";

const Option = ({
  checked,
  value,
  questionId,
  label,
  updateAnswer,
  handleOnMiniGuideClick,
  miniGuideType,
}) => {
  return (
    <OptionContentWrapper>
      <PufiFormControlLabel
        checked={checked}
        key={`${questionId}${label}`}
        value={value}
        control={<Radio />}
        label={<PufiToolTip>{label}</PufiToolTip>}
        onClick={() => {
          updateAnswer(questionId, value, "value");
        }}
      />
      {["how", "well", "without"].includes(questionId) && (
        <HelpOutlineIcon
          onClick={(event) => {
            handleOnMiniGuideClick(event, {
              questionId: questionId,
              miniGuideType: miniGuideType,
            });
          }}
        />
      )}
    </OptionContentWrapper>
  );
};

export default Option;
