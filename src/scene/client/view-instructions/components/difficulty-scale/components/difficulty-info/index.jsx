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
}) => {
  const { breakpoint } = useContext(ClientContext);
  return (
    <Container>
      <Scale
        scaleSrc={scaleSrc}
        title={title}
        height={breakpoint === "desktop" ? 100 : 80}
        width={breakpoint === "desktop" ? 89 : 71}
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

      <DifficultyDescription color={color}>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </DifficultyDescription>
    </Container>
  );
};
export default DifficultyInfo;
