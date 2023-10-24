import { data } from "./data";
import BeforeStartSurveyRow from "./components/before-start-survey-row";
import HeaderRow from "./components/header-row";

const BeforeStartSurvey = () => {
  return (
    <div>
      <HeaderRow />

      {data.map(({ src, text }, index) => (
        <BeforeStartSurveyRow
          key={index}
          imageSrc={src}
          text={text}
          imagePosition={index % 2 === 0 ? 0 : 1}
        />
      ))}
    </div>
  );
};

export default BeforeStartSurvey;
