const { useContext, useState, createContext, useEffect } = require("react");
import { answerFormat } from "../helper/surveyHelper";
import {
  getAnswerForIndex,
  getLastAnsweredIndex,
} from "@/utils/localStorageUtils";
import { ClientContext } from "@/context/ClientContext";

export const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const { currentUserId, currentSurveyId } = useContext(ClientContext);

  useEffect(() => {
    const lastAnswerIndex = getLastAnsweredIndex(
      currentUserId,
      currentSurveyId
    );
    setCurrentQuestionIndex(lastAnswerIndex + 1);
  }, []);

  useEffect(() => {
    if (currentQuestionIndex !== -1) {
      const currentAnswer = getAnswerForIndex(
        currentUserId,
        currentSurveyId,
        currentQuestionIndex
      );
      console.log("Current Answer =", currentAnswer);
      setCurrentAnswer(currentAnswer);
    }
  }, [currentQuestionIndex]);

  const updateAnswer = (questionId, value) => {
    console.log("Updating ==", questionId, value, currentAnswer);
    const response = currentAnswer.responses.find(
      (response) => response.questionId === questionId
    );
    console.log("response", response);
    response.response.value = value;
    setCurrentAnswer({
      ...currentAnswer,
    });
  };

  console.log("Current answer", currentAnswer);

  return (
    <SurveyContext.Provider
      value={{
        currentQuestionIndex,
        currentAnswer,
        updateAnswer,
        setCurrentQuestionIndex,
        currentUserId,
        currentSurveyId,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyProvider;
