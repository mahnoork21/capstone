import MainContainer from "@/shared/components/main-container";
import HomeContainer from "../components/home-container";
import TypesOfQuestions from "./components/types-of-questions";
import { useState } from "react";
import InstructionNavigation from "./components/instruction-navigation";
import BeforeStartSurvey from "./components/before-start-survey";

const ViewInstructions = () => {
  const [instructionId, setInstructionId] = useState(0);

  //TODO: disable Back button if instructionId < 0
  const handleBackClick = () => {
    setInstructionId((prevInstructionId) => prevInstructionId - 1);
  };
  //TODO: disable Next button if instructionId > 3
  const handleNextClick = () => {
    setInstructionId((prevInstructionId) => prevInstructionId + 1);
  };
  //TODO: create other instructions pages
  return (
    <MainContainer>
      <HomeContainer>
        {instructionId === 0 ? (
          <TypesOfQuestions />
        ) : instructionId === 1 ? (
          <BeforeStartSurvey />
        ) : (
          <></>
        )}
        <div className="buttons">
          <InstructionNavigation
            activePositionId={instructionId}
            onBackClick={handleBackClick}
            onNextClick={handleNextClick}
          />
        </div>
      </HomeContainer>
    </MainContainer>
  );
};

export default ViewInstructions;
