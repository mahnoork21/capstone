import Image from "next/image";
import { CenterColumn, Row, LeftRightColumn, GreyContainer } from "./styled";
import { useContext } from "react";
import { ClientContext } from "@/context/ClientContext";

//TODO: finish BeforeStartSurvey
const BeforeStartSurvey = () => {
  const { breakpoint } = useContext(ClientContext);

  return (
    <>
      {/* header */}
      {breakpoint === "desktop" ? (
        <Row>
          <LeftRightColumn />
          <CenterColumn>
            <h1>Parent of Young Child</h1>
            <p>
              Before you begin the PUFI-2, please review the following
              information to understand the questions
            </p>
          </CenterColumn>
          <LeftRightColumn />
        </Row>
      ) : (
        <CenterColumn>
          <h1 className="mobile-header">Parent of Young Child</h1>
          <p>
            Before you begin the PUFI-2, please review the following information
            to understand the questions
          </p>
        </CenterColumn>
      )}

      {breakpoint === "desktop" ? (
        <>
          {/* first row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-1.svg"}
                height={100}
                width={100}
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  Think about how you have used your prosthesis at home and in
                  the community within the past few weeks.
                </p>
              </GreyContainer>
            </CenterColumn>
            <LeftRightColumn />
          </Row>
          {/* second row */}
          <Row>
            <LeftRightColumn />
            <CenterColumn>
              <GreyContainer>
                <p>
                  If you have not worn your prosthesis for a little while
                  because of issues with socket fit (or other reasons), you can
                  reflect back on your abilities to use the prosthesis when you
                  were able to wear it.
                </p>
              </GreyContainer>
            </CenterColumn>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-2.svg"}
                height={100}
                width={100}
              />
            </LeftRightColumn>
          </Row>
          {/* third row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-3.svg"}
                height={100}
                width={100}
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  Each skill or activity is illustrated by one or more photos of
                  children performing the activity in different ways. The way
                  your child performs the skill or activity may be the same or
                  different than what is shown – that is OK!
                </p>
              </GreyContainer>
            </CenterColumn>
            <LeftRightColumn />
          </Row>
          {/* fourth row */}
          <Row>
            <LeftRightColumn />
            <CenterColumn>
              <GreyContainer>
                <p>
                  Your child might also be using one or more prostheses (or no
                  prosthesis) depending on the task – that is OK!
                </p>
              </GreyContainer>
            </CenterColumn>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-4.svg"}
                height={100}
                width={100}
              />
            </LeftRightColumn>
          </Row>
          {/* fifth row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-5.svg"}
                height={100}
                width={100}
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  Please be sure to always mark the way that your child performs
                  the skill most often whether they use their prosthesis or not,
                  or if they are using a different type of prosthesis.
                </p>
              </GreyContainer>
            </CenterColumn>
            <LeftRightColumn />
          </Row>
          {/* sixth row */}
          <Row>
            <LeftRightColumn />
            <CenterColumn>
              <GreyContainer>
                <p>
                  If you are unsure, or have not seen your child perform the
                  activity, try to imagine how they would do it, their ease of
                  performance, and how useful you think the prosthesis would be
                  for that activity.
                </p>
                <p>
                  We realize it may be difficult to answer some questions, but
                  just pick the option that seems right.
                </p>
              </GreyContainer>
            </CenterColumn>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-6.svg"}
                height={100}
                width={100}
              />
            </LeftRightColumn>
          </Row>
        </>
      ) : (
        <>
          {/* first Row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-1.svg"}
                height={72}
                width={72}
                className="mobile-image"
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  Think about how you have used your prosthesis at home and in
                  the community within the past few weeks.
                </p>
              </GreyContainer>
            </CenterColumn>
          </Row>

          {/* second Row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-2.svg"}
                height={72}
                width={72}
                className="mobile-image"
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  If you have not worn your prosthesis for a little while
                  because of issues with socket fit (or other reasons), you can
                  reflect back on your abilities to use the prosthesis when you
                  were able to wear it.
                </p>
              </GreyContainer>
            </CenterColumn>
          </Row>

          {/* third Row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-3.svg"}
                height={72}
                width={72}
                className="mobile-image"
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  Each skill or activity is illustrated by one or more photos of
                  children performing the activity in different ways. The way
                  your child performs the skill or activity may be the same or
                  different than what is shown – that is OK!
                </p>
              </GreyContainer>
            </CenterColumn>
          </Row>

          {/* fourth Row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-4.svg"}
                height={72}
                width={72}
                className="mobile-image"
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  Your child might also be using one or more prostheses (or no
                  prosthesis) depending on the task – that is OK!
                </p>
              </GreyContainer>
            </CenterColumn>
          </Row>

          {/* fifth Row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-5.svg"}
                height={72}
                width={72}
                className="mobile-image"
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  Please be sure to always mark the way that your child performs
                  the skill most often whether they use their prosthesis or not,
                  or if they are using a different type of prosthesis.
                </p>
              </GreyContainer>
            </CenterColumn>
          </Row>

          {/* sixth Row */}
          <Row>
            <LeftRightColumn>
              <Image
                src={"/instructions/before-start-survey/row-6.svg"}
                height={72}
                width={72}
                className="mobile-image"
              />
            </LeftRightColumn>
            <CenterColumn>
              <GreyContainer>
                <p>
                  If you are unsure, or have not seen your child perform the
                  activity, try to imagine how they would do it, their ease of
                  performance, and how useful you think the prosthesis would be
                  for that activity.
                </p>
                <p>
                  We realize it may be difficult to answer some questions, but
                  just pick the option that seems right.
                </p>
              </GreyContainer>
            </CenterColumn>
          </Row>
        </>
      )}
    </>
  );
};

export default BeforeStartSurvey;
