import Image from "next/image";
import { Container, DifficultyDescription } from "./styled";
import Scale from "../scale";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";

const DifficultyInfo = ({
  scaleSrc,
  lineIndicatorSrcDesktop,
  lineIndicatorSrcMobile,
  title,
  description,
  color,
  isInSurvey,
}) => {
  const { breakpoint } = useContext(ClientContext);
  return (
    <Container isInSurvey={isInSurvey}>
      <Scale
        scaleSrc={scaleSrc}
        title={title}
        height={breakpoint === "desktop" ? 89 : isInSurvey ? 60 : 71}
        width={breakpoint === "desktop" ? 100 : isInSurvey ? 70 : 80}
      />
      <Image
        src={
          breakpoint === "desktop"
            ? lineIndicatorSrcDesktop
            : lineIndicatorSrcMobile
        }
        height={breakpoint === "desktop" ? 192 : 190}
        width={breakpoint === "desktop" ? 32 : 24}
        layout="responsive"
        className="line-indicator-image"
      />

      <DifficultyDescription color={color} isInSurvey={isInSurvey}>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </DifficultyDescription>
    </Container>
  );
};
export default DifficultyInfo;
