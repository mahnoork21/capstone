const { useContext, useState, createContext, useEffect } = require("react");
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

  //In localStorage, lastAnsweredIndex is stored that is initially -1
  //It's used to track last answered activity. Different from currentQuestionIndex
  //If user goes back currentQuestionIndex will change.
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
      setCurrentAnswer(currentAnswer);
    }
  }, [currentQuestionIndex]);

  //Called when user selects an option
  const updateAnswer = (questionId, value) => {
    const response = currentAnswer.responses.find(
      (response) => response.questionId === questionId
    );
    response.response.value = value;
    setCurrentAnswer({
      ...currentAnswer,
    });
  };

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
