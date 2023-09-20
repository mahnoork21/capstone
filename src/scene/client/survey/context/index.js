const { useContext, useState, createContext, useEffect } = require("react");
import { answerFormat } from "../helper/surveyHelper";
import {
  getAnswerForIndex,
  getLastAnsweredIndex,
} from "@/utils/localStorageUtils";
import { ClientContext } from "@/context/ClientContext";

export const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState();

  const { currentUserId, currentSurveyId } = useContext(ClientContext);

  useEffect(() => {
    const lastAnswerIndex = getLastAnsweredIndex(
      currentUserId,
      currentSurveyId
    );
    setCurrentQuestionIndex(lastAnswerIndex + 1);

    const currentAnswer = getAnswerForIndex(
      currentUserId,
      currentSurveyId,
      lastAnswerIndex + 1
    );
    console.log("Current Answer =", currentAnswer);
    setCurrentAnswer(currentAnswer);
  }, []);

  const updateAnswer = (questionId, value) => {
    console.log("Updating ==", questionId, value, currentAnswer);
    const response = currentAnswer.responses.find(
      (response) => response.questionId === questionId
    );
    console.log("response", response);
    response.value = value;
    setCurrentAnswer(currentAnswer);
  };

  console.log("Current answer", currentAnswer);

  return (
    <SurveyContext.Provider
      value={{ currentQuestionIndex, currentAnswer, updateAnswer }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyProvider;
