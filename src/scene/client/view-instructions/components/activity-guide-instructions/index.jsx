import Image from "next/image";
import {
  ActivityGuideCard,
  Container,
  FrequencyQuestion,
  GreyHeader,
  Row,
} from "./styled";

const ActivityGuideInstructions = () => {
  return (
    <Container>
      <GreyHeader>
        <h1>Activity Guide</h1>
        <p>
          This information will help you understand the questions in the survey.
          This information will also be available within the survey.
        </p>
      </GreyHeader>

      <FrequencyQuestion>
        <h2>How is the activity usually performed?</h2>
        <p>
          Choose the way this activity is performed <span>most often</span> if
          done in more than one way
        </p>
      </FrequencyQuestion>

      <Row>
        <ActivityGuideCard>
          <Image
            height={140}
            width={140}
            src={"/instructions/activity-guide/activity-1.png"}
          />
          <p>
            Both arms together with the prosthesis <span>actively</span> to
            grasp
          </p>
        </ActivityGuideCard>
        <ActivityGuideCard>
          <Image
            height={140}
            width={140}
            src={"/instructions/activity-guide/activity-2.png"}
          />
          <p>With the non-prosthetic hand alone</p>
        </ActivityGuideCard>
      </Row>
      <Row>
        <ActivityGuideCard>
          <Image
            height={140}
            width={140}
            src={"/instructions/activity-guide/activity-3.png"}
          />
          <p>
            Both arms together with the prosthesis <span>passively</span> to
            grasp
          </p>
        </ActivityGuideCard>
        <ActivityGuideCard>
          <Image
            height={140}
            width={140}
            src={"/instructions/activity-guide/activity-4.png"}
          />
          <p>With the assistance of the residual limb</p>
        </ActivityGuideCard>
      </Row>
      <Row>
        <ActivityGuideCard>
          <Image
            height={140}
            width={140}
            src={"/instructions/activity-guide/activity-5.png"}
          />
          <p>With some help from another person</p>
        </ActivityGuideCard>
        <ActivityGuideCard>
          <Image
            height={140}
            width={140}
            src={"/instructions/activity-guide/activity-6.png"}
          />
          <p>
            Don't know/ not sure Use this choice if none of the ways shown above
            seems quite right
          </p>
        </ActivityGuideCard>
      </Row>
    </Container>
  );
};

export default ActivityGuideInstructions;
