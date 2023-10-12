import { GreyHeader, HowQuestion } from "../activity-guide/styled";
import DifficultyInfo from "./components/difficulty-info";
import { DifficultyInfoContainer } from "./styled";
import { data } from "./data";

const DifficultyScale = () => {
  return (
    <>
      <GreyHeader>
        <h1>Difficulty Scale</h1>
        <p>
          This information will help you understand the questions in the survey.
          This information will also be available within the survey.
        </p>
      </GreyHeader>
      <HowQuestion>
        <h2>How well is the activity performed with/without the prosthesis?</h2>
      </HowQuestion>
      <DifficultyInfoContainer>
        {data.map((data, index) => (
          <DifficultyInfo
            key={index}
            scaleSrc={data.scale}
            lineIndicatorSrcDesktop={data.lineIndicatorDesktop}
            lineIndicatorSrcMobile={data.lineIndicatorMobile}
            title={data.title}
            description={data.description}
            color={data.color}
          />
        ))}
      </DifficultyInfoContainer>
    </>
  );
};

export default DifficultyScale;
