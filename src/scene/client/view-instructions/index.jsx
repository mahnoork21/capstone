import MainContainer from "@/shared/components/main-container";
import HomeContainer from "../components/home-container";
import TypesOfQuestions from "./components/types-of-questions";
import { useContext, useEffect, useState } from "react";
import InstructionNavigation from "./components/instruction-navigation";
import BeforeStartSurvey from "../../../shared/client/components/before-start-survey";
import { useRouter } from "next/router";
import { ClientContext } from "@/context/ClientContext";
import ActivityGuide from "./components/activity-guide";
import DifficultyScale from "./components/difficulty-scale";

const ViewInstructions = () => {
  const [instructionId, setInstructionId] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const router = useRouter();
  const { currentSurveyId, setDidViewResponseGuide } =
    useContext(ClientContext);

  const handleBackClick = () => {
    if (instructionId >= 0) {
      setInstructionId((prevInstructionId) => prevInstructionId - 1);
    }
  };

  const handleNextClick = () => {
    if (instructionId < 3) {
      setInstructionId((prevInstructionId) => prevInstructionId + 1);
    }
  };

  if (instructionId === 1) {
    setDidViewResponseGuide(true);
  }

  useEffect(() => {
    if (instructionId < 0) {
      router.push({
        pathname: "/client",
        query: {
          surveyId: currentSurveyId,
        },
      });
    } else if (instructionId >= 3) {
      setNextButtonDisabled(true);
    } else {
      setNextButtonDisabled(false);
    }
  }, [instructionId]);

  //TODO: create other instructions pages
  return (
    <MainContainer>
      <HomeContainer>
        {instructionId === 0 ? (
          <TypesOfQuestions />
        ) : instructionId === 1 ? (
          <BeforeStartSurvey />
        ) : instructionId === 2 ? (
          <ActivityGuide />
        ) : instructionId === 3 ? (
          <DifficultyScale />
        ) : (
          <></>
        )}
        <div className="buttons">
          <InstructionNavigation
            activePositionId={instructionId}
            onBackClick={handleBackClick}
            onNextClick={handleNextClick}
            nextButtonDisabled={nextButtonDisabled}
          />
        </div>
      </HomeContainer>
    </MainContainer>
  );
};

export default ViewInstructions;
