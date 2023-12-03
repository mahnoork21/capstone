import Image from "next/image";
import {
  CenterColumn,
  GreyContainer,
  LeftRightColumn,
  Row,
} from "../before-start-survey-row/styled";

const MobileRow = ({ imageSrc, text }) => {
  return (
    <Row>
      <LeftRightColumn>
        <Image src={imageSrc} height={72} width={72} className="mobile-image" />
      </LeftRightColumn>
      <CenterColumn>
        <GreyContainer>
          <p>{text}</p>
        </GreyContainer>
      </CenterColumn>
    </Row>
  );
};

export default MobileRow;
