import Image from "next/image";
import {
  CenterColumn,
  GreyContainer,
  LeftRightColumn,
  Row,
} from "../before-start-survey-row/styled";

const DesktopRow = ({ imageSrc, text, imagePosition }) => {
  return (
    <Row>
      {imagePosition === 0 ? (
        <LeftRightColumn>
          <Image src={imageSrc} height={100} width={100} />
        </LeftRightColumn>
      ) : (
        <LeftRightColumn />
      )}

      <CenterColumn>
        <GreyContainer>
          <p>{text}</p>
        </GreyContainer>
      </CenterColumn>

      {imagePosition === 0 ? (
        <LeftRightColumn />
      ) : (
        <LeftRightColumn>
          <Image src={imageSrc} height={100} width={100} />
        </LeftRightColumn>
      )}
    </Row>
  );
};

export default DesktopRow;
