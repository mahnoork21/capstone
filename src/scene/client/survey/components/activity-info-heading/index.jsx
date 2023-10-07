import { isNullOrUndefined } from "@/utils/utils";
import { youngChildActivity } from "../../helper/youngChildActivity";
import "./styled";
import {
  ActivityHeading,
  ActivityImage,
  BorderLinearProgress,
  ImageContainer,
  ProgressLabel,
} from "./styled";

const ActivityInfoHeading = ({ currentActivityIndex, activityLabel }) => {
  if (isNullOrUndefined(currentActivityIndex) || currentActivityIndex == -1)
    return;

  const activityPosition = currentActivityIndex + 1;
  const progress = (activityPosition / youngChildActivity.length) * 100;

  const activity = youngChildActivity[currentActivityIndex];

  const heading = `Activity ${activityPosition}. ${activityLabel}`;

  return (
    <>
      <BorderLinearProgress
        variant="determinate"
        value={progress}
      ></BorderLinearProgress>
      <ProgressLabel>
        {activityPosition} of {youngChildActivity.length}
      </ProgressLabel>
      <ActivityHeading>{heading}</ActivityHeading>
      {/* TODO use better method of detecting multiple lines */}
      <ImageContainer isOneLiner={heading.length < 50}>
        <ActivityImage
          src={`/survey_activity/${activity.id}.png`}
          fill={true}
          quality={100}
        ></ActivityImage>
      </ImageContainer>
    </>
  );
};

export default ActivityInfoHeading;
