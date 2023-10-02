const { useContext, useState, createContext, useEffect } = require("react");
import { ClientContext } from "@/context/ClientContext";
import axios from "axios";
import {
  checkIfResponseIsValid,
  firestore_answerformat,
  generateEmptyAnswer,
} from "../helper/surveyHelper";
import { youngChildActivity } from "../helper/youngChildActivity";
import { getSurveyById } from "@/firebase/surveyRepo";
import { questionIds } from "../helper/youngChildSurvey";
import { isNullOrUndefined } from "@/utils/utils";

export const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [surveyResponse, setSurveyResponse] = useState();

  const { currentSurveyId, user } = useContext(ClientContext);

  const moveToLastAnsweredIndex = () => {
    for (const [index, activity] of youngChildActivity.entries()) {
      const currentActivityResponse = surveyResponse[activity.id];
      if (currentActivityResponse) {
        //check if it is valid
        const isAllResponseValid = questionIds
          .map((questionId) => {
            const { isAnswered } = checkIfResponseIsValid(
              questionId,
              currentActivityResponse[questionId]
            );
            return isAnswered;
          })
          .reduce((acc, currentValue) => {
            //checks if array has false value
            return acc && currentValue;
          }, true);
        if (!isAllResponseValid) {
          // setCurrentAnswer(currentActivityResponse);
          setCurrentActivityIndex(index);
          break;
        }
      } else {
        //generate empty response
        // const emptyResponse = generateEmptyAnswer();
        // setCurrentAnswer(emptyResponse);
        setCurrentActivityIndex(index);
        break;
      }
    }
  };

  useEffect(() => {
    console.log("$$$ In effect ", currentActivityIndex);
    if (!isNullOrUndefined(currentActivityIndex)) {
      console.log("$$$ In effect ", currentActivityIndex);
      if (currentActivityIndex == -1) {
        moveToLastAnsweredIndex();
      } else {
        const currentActivityResponse =
          surveyResponse[youngChildActivity[currentActivityIndex].id];
        console.log("$$$ In effect ", currentActivityResponse);
        if (currentActivityResponse) {
          setCurrentAnswer(currentActivityResponse);
        } else {
          setCurrentAnswer(generateEmptyAnswer());
        }
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [currentActivityIndex]);

  const getCurrentSurvey = async () => {
    const survey = await getSurveyById(currentSurveyId);
    console.log("##Survey = ", survey);

    setSurveyResponse(survey.activity_response);
    setCurrentActivityIndex(-1);
  };

  useEffect(() => {
    if (user) {
      getCurrentSurvey();
    }
  }, [user]);

  //Called when user selects an option
  const updateAnswer = (questionId, answer, type) => {
    switch (type) {
      case "value":
        currentAnswer[questionId].value = answer;
        break;
      case "body-part":
        currentAnswer[questionId]["bodypart"] = answer;
        break;
      case "comment":
        currentAnswer[questionId]["comment"] = answer;
    }

    setCurrentAnswer({
      ...currentAnswer,
    });
  };

  console.log("Current response == ", surveyResponse);
  console.log("Current activity index == ", currentActivityIndex);

  return (
    <SurveyContext.Provider
      value={{
        currentActivityIndex: currentActivityIndex,
        currentAnswer,
        updateAnswer,
        setCurrentActivityIndex: setCurrentActivityIndex,
        currentSurveyId,
        setSurveyResponse: setSurveyResponse,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyProvider;
