const { useContext, useState, createContext, useEffect } = require("react");
import { activity } from "@/utils/youngChildActivity";
import { answerFormat } from "../helper/surveyHelper";

export const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //TODO: move to local storage
  const [currentAnswer, setCurrentAnswer] = useState();

  const currentActivity = activity[currentQuestionIndex];
  // const questionsForActivity = youngChildSurvey[]
  const userId = "123555";
  //get current answer from localstorage

  useEffect(() => {
    setCurrentAnswer(answerFormat[currentQuestionIndex]);
  }, []);

  const updateAnswer = (questionId, value) => {
    const response = currentAnswer.responses.find(
      (response) => response.id === questionId
    );
    response.value = value;
  };

  return (
    <SurveyContext.Provider
      value={{ currentActivity, currentAnswer, updateAnswer }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyProvider;
