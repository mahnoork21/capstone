const { useContext, useState, createContext, useEffect } = require("react");
import { generateEmptyAnswer } from "@/utils/localStorageUtils";
import { ClientContext } from "@/context/ClientContext";
import axios from "axios";
import { checkIfResponseIsValid } from "../helper/surveyHelper";
import { youngChildActivity } from "../helper/youngChildActivity";

export const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(-1);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const { currentUserId, currentSurveyId } = useContext(ClientContext);

  const getLastSavedAnswer = async () => {
    console.log(
      "NEXT_PUBLIC_SURVEY_LAST_ANSWERED_INFO=",
      process.env.NEXT_PUBLIC_SURVEY_LAST_ANSWERED_INFO
    );
    try {
      const {
        data: { lastResponse },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_SURVEY_LAST_ANSWERED_INFO}?survey_id=650f21d9b62380b34bd10981`
      );
      // const lastResponse = data.lastResponse;

      console.log("Last response", lastResponse);

      if (lastResponse) {
        //check if all questions are answered
        let isAllQuestionsAnswered = true;
        for (const response of lastResponse.responses) {
          const result = checkIfResponseIsValid(response);
          if (!result?.isAnswered) {
            //Display error message and scroll to the error question
            isAllQuestionsAnswered = false;
          }
        }

        if (isAllQuestionsAnswered) {
          const lastActivityResponseIndex = youngChildActivity.findIndex(
            (activity) => {
              return activity.id === lastResponse.activityId;
            }
          );
          //set question index
          //generate new response
          if (lastActivityResponseIndex !== -1) {
            setCurrentActivityIndex(lastActivityResponseIndex + 1);
            setCurrentAnswer(generateEmptyAnswer());
          } else {
            //TODO message
          }
        } else {
          setCurrentAnswer(lastResponse);
        }
      } else {
        setCurrentActivityIndex(0);
        setCurrentAnswer(generateEmptyAnswer());
      }
    } catch (error) {
      console.log(
        `Error fetching ${process.env.NEXT_PUBLIC_SURVEY_LAST_ANSWERED_INFO} :`,
        error
      );
      return null;
    }
  };

  const getSavedAnswerForCurrentIndex = async (currentActivityIndex) => {
    const activityId = youngChildActivity[currentActivityIndex].id;

    try {
      const {
        data: { success, responses },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_SURVEY}/${currentSurveyId}/activity/${activityId}`
      );
      success
        ? setCurrentAnswer({ responses: responses })
        : setCurrentAnswer(generateEmptyAnswer());
    } catch (error) {
      console.log(`Error fetching ${process.env.NEXT_PUBLIC_SURVEY}`, error);
    }
  };

  useEffect(() => {
    if (currentActivityIndex !== -1) {
      getSavedAnswerForCurrentIndex(currentActivityIndex);
    } else {
      getLastSavedAnswer();
    }
  }, [currentActivityIndex]);

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
        currentActivityIndex: currentActivityIndex,
        currentAnswer,
        updateAnswer,
        setCurrentActivityIndex: setCurrentActivityIndex,
        currentUserId,
        currentSurveyId,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyProvider;
