import ActivityGuideItem from "@/shared/client/components/activity-guide-instruction-area/components/activity-guide-item";
import { data_activity_guide } from "@/shared/client/components/activity-guide-instruction-area/data";
import { data_difficulty_scale } from "@/shared/client/components/difficulty-scale-instruction-area/data";
import { MiniGuideDifficultyScaleWrapper } from "./styled";

const MiniGuide = ({ questionId, optionIndex }) => {
  return questionId === "how" ? (
    <ActivityGuideItem
      src={data_activity_guide[optionIndex].src}
      text={data_activity_guide[optionIndex].text}
      imageSize={120}
    />
  ) : (
    <MiniGuideDifficultyScaleWrapper>
      <p
        dangerouslySetInnerHTML={{
          __html: data_difficulty_scale[optionIndex].description,
        }}
      />
    </MiniGuideDifficultyScaleWrapper>
  );
};

export default MiniGuide;
