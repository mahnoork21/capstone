import "./styled";
import { GuideButton, QuestionWrapper } from "./styled";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import FilterBAndWOutlinedIcon from "@mui/icons-material/FilterBAndWOutlined";

const ActivityQuestion = ({
  label,
  questionId,
  isActive,
  handleOnResponseGuideClick,
}) => {
  return (
    <QuestionWrapper>
      <span>{label}</span>
      {questionId === "how" && isActive && (
        <GuideButton
          variant="outlined"
          startIcon={<InventoryOutlinedIcon />}
          onClick={(event) => {
            handleOnResponseGuideClick(event, true);
          }}
        >
          Activity Guide
        </GuideButton>
      )}
      {["well", "without"].includes(questionId) && isActive && (
        <GuideButton
          variant="outlined"
          startIcon={<FilterBAndWOutlinedIcon />}
          onClick={(event) => {
            handleOnResponseGuideClick(event, false);
          }}
        >
          Difficulty Scale
        </GuideButton>
      )}
    </QuestionWrapper>
  );
};

export default ActivityQuestion;
