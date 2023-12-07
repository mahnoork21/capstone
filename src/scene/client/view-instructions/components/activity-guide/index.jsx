import { Container, GreyHeader } from "./styled";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";
import ActivityGuideInstructionArea from "@/shared/client/section/activity-guide-instruction-area";

const ActivityGuide = () => {
  const { breakpoint } = useContext(ClientContext);
  return (
    <Container>
      <GreyHeader>
        <h1>Activity Guide</h1>
        <p>
          This information will help you understand the questions in the PUFI-2.
        </p>
      </GreyHeader>

      <ActivityGuideInstructionArea
        imageSize={breakpoint === "desktop" ? 140 : 100}
      />
    </Container>
  );
};

export default ActivityGuide;
