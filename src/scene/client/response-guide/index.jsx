import MainContainer from "@/shared/components/main-container";
import { ResponseGuideWrapper } from "./styled";
import BeforeStartSurvey from "@/shared/client/section/before-start-survey";
import SurveyNavButton from "@/shared/client/buttons/survey-nav-buttons";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { ClientContext } from "@/context/ClientContext";

const ResponseGuide = () => {
  const { setDidViewResponseGuide, currentSurveyId } =
    useContext(ClientContext);

  useEffect(() => {
    setDidViewResponseGuide(true);
  }, []);

  return (
    <MainContainer>
      <ResponseGuideWrapper>
        <BeforeStartSurvey />
        <Link
          href={{
            pathname: "/client/survey",
            query: { surveyId: currentSurveyId },
          }}
        >
          <SurveyNavButton>Survey Questions</SurveyNavButton>
        </Link>
      </ResponseGuideWrapper>
    </MainContainer>
  );
};

export default ResponseGuide;
