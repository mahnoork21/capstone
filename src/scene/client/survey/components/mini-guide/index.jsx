import ActivityGuideItem from "@/shared/client/section/activity-guide-instruction-area/components/activity-guide-item";
import { data_activity_guide } from "@/shared/client/section/activity-guide-instruction-area/data";
import { data_difficulty_scale } from "@/shared/client/section/difficulty-scale-instruction-area/data";
import { MiniGuideDifficultyScaleWrapper } from "./styled";

const MiniGuide = ({ questionId, miniGuideType }) => {
  if (questionId === "how") {
    const activity = data_activity_guide.find(
      (activity) => activity.miniGuideType === miniGuideType
    );

    return (
      <ActivityGuideItem
        src={activity.src}
        text={activity.text}
        imageSize={120}
      />
    );
  } else {
    const difficulty = data_difficulty_scale.find(
      (difficulty) => difficulty.miniGuideType === miniGuideType
    );

    return (
      <MiniGuideDifficultyScaleWrapper>
        <p
          dangerouslySetInnerHTML={{
            __html: difficulty.description,
          }}
        />
      </MiniGuideDifficultyScaleWrapper>
    );
  }
};

export default MiniGuide;
