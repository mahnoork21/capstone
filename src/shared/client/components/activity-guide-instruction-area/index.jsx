import ActivityGuideItem from "@/shared/client/components/activity-guide-instruction-area/components/activity-guide-item";
import {
  HowQuestion,
  InstructionAreaWrapper,
  InstructionsWrapper,
} from "./styled";
import { data_activity_guide } from "@/shared/client/components/activity-guide-instruction-area/data";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

const ActivityGuideInstructionArea = ({
  isInSurvey = false,
  handleOnActivityClose,
}) => {
  const { breakpoint } = useContext(ClientContext);

  return (
    <InstructionAreaWrapper isInSurvey={isInSurvey}>
      <HowQuestion>
        <h2>How is the activity usually performed?</h2>
        <p>
          Choose the way this activity is performed <span>most often</span> if
          done in more than one way
        </p>
      </HowQuestion>

      <InstructionsWrapper isInSurvey={isInSurvey}>
        {data_activity_guide.map(({ src, text }) => (
          <ActivityGuideItem
            src={src}
            text={text}
            imageSize={breakpoint === "desktop" ? 120 : 100}
          />
        ))}
      </InstructionsWrapper>
      {isInSurvey && breakpoint === "desktop" && (
        <Button startIcon={<CloseIcon />} onClick={handleOnActivityClose}>
          Close
        </Button>
      )}
    </InstructionAreaWrapper>
  );
};

export default ActivityGuideInstructionArea;
