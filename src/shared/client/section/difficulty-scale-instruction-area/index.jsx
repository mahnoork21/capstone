import { useContext } from "react";
import { HowQuestion } from "../activity-guide-instruction-area/styled";
import DifficultyInfo from "./components/difficulty-info";
import { data_difficulty_scale } from "./data";
import {
  DifficultyInfoContainer,
  DifficultyScaleInstructionWrapper,
} from "./styled";
import { ClientContext } from "@/context/ClientContext";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GuideButton } from "@/scene/client/survey/components/activity-question/styled";
import FilterBAndWOutlinedIcon from "@mui/icons-material/FilterBAndWOutlined";

const DifficultyScaleInstructionArea = ({
  isInSurvey = false,
  handleOnActivityClose,
}) => {
  const { breakpoint } = useContext(ClientContext);

  return (
    <DifficultyScaleInstructionWrapper isInSurvey={isInSurvey}>
      <HowQuestion>
        <h2>How well is the activity performed with/without the prosthesis?</h2>
        {!isInSurvey && (
          <p>
            This information is also available within the PUFI-2 questionnaire
            by clicking the icon{"  "}
            <GuideButton
              variant="outlined"
              startIcon={<FilterBAndWOutlinedIcon />}
            >
              Difficulty Scale
            </GuideButton>
            {"  "}
            beside response options
          </p>
        )}
      </HowQuestion>
      <DifficultyInfoContainer isInSurvey={isInSurvey}>
        {data_difficulty_scale.map((data, index) => (
          <DifficultyInfo
            key={index}
            scaleSrc={data.scale}
            lineIndicatorSrcDesktop={data.lineIndicatorDesktop}
            lineIndicatorSrcMobile={data.lineIndicatorMobile}
            title={data.title}
            description={data.description}
            color={data.color}
            isInSurvey={isInSurvey}
          />
        ))}
      </DifficultyInfoContainer>
      {isInSurvey && breakpoint === "desktop" && (
        <Button startIcon={<CloseIcon />} onClick={handleOnActivityClose}>
          Close
        </Button>
      )}
    </DifficultyScaleInstructionWrapper>
  );
};

export default DifficultyScaleInstructionArea;
