import { Container, GreyHeader } from "./styled";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";
import ActivityGuideInstructionArea from "@/shared/client/components/activity-guide-instruction-area";

const ActivityGuide = () => {
  const { breakpoint } = useContext(ClientContext);
  return (
    <Container>
      <GreyHeader>
        <h1>Activity Guide</h1>
        <p>
          This information will help you understand the questions in the survey.
          This information will also be available within the survey.
        </p>
      </GreyHeader>

      <ActivityGuideInstructionArea
        imageSize={breakpoint === "desktop" ? 140 : 100}
      />
    </Container>
  );
};

export default ActivityGuide;
