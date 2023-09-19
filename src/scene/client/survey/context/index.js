const { useContext, useState, createContext } = require("react");
import { activity } from "@/utils/youngChildActivity";

export const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentActivity = activity[currentQuestionIndex];
  // const questionsForActivity = youngChildSurvey[]
  const userId = "123555";
  //get current answer from localstorage

  return <SurveyContext.Provider value={{}}>{children}</SurveyContext.Provider>;
};

export default SurveyProvider;
