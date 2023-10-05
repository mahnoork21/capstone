import Image from "next/image";
import { CenterColumn, Row, LeftRightColumn, GreyContainer } from "./styled";

//TODO: finish BeforeStartSurvey
const BeforeStartSurvey = () => {
  return (
    <>
      <Row>
        <LeftRightColumn>
          <Image
            src={"/instructions/before-start-survey/think.svg"}
            height={100}
            width={100}
          />
        </LeftRightColumn>
        <CenterColumn>
          <GreyContainer>
            Think about how you have used your prosthesis at home and in the
            community within the past few weeks.
          </GreyContainer>
        </CenterColumn>
        <LeftRightColumn>Content</LeftRightColumn>
      </Row>
    </>
  );
};

export default BeforeStartSurvey;
