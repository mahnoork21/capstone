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
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { useRouter } from "next/router";

export const SurveyContext = createContext();

const SurveyProvider = ({ children }) => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(-1);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  // const [surveyResponse, setSurveyResponse] = useState();
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const { setHeaderButtonType, activityResponses, setSurveyResponse } =
    useContext(ClientContext);

  const moveToLastAnsweredIndex = () => {
    for (const [index, activity] of youngChildActivity.entries()) {
      const currentActivityResponse = activityResponses[activity.id];
      if (currentActivityResponse) {
        //check if it is valid

        let isAllResponseValid = true;
        for (const questionId of questionIds) {
          const response = currentActivityResponse[questionId];
          const result = checkIfResponseIsValid(questionId, response);
          if (!result.isAnswered) {
            isAllResponseValid = false;
            return;
          } else {
            if (
              (questionId === "do" && currentActivityResponse.do.value === 0) ||
              (questionId === "how" && currentActivityResponse.how.value === 0)
            ) {
              isAllResponseValid = true;
              break;
            }
          }
        }

        if (!isAllResponseValid) {
          setCurrentActivityIndex(index);
          break;
        }

        //the last activity is valid
        if (index + 1 === youngChildActivity.length) {
          router.push("/client/summary");
          return;
        }
      } else {
        //generate empty response
        setCurrentActivityIndex(index);
        break;
      }
    }
  };

  useEffect(() => {
    if (activityResponses) {
      if (currentActivityIndex == -1) {
        moveToLastAnsweredIndex();
      } else {
        const currentActivityResponse =
          activityResponses[youngChildActivity[currentActivityIndex].id];
        setErrors({});
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
  }, [currentActivityIndex, activityResponses]);

  useEffect(() => {
    setHeaderButtonType(HeaderButtonType.SAVE_AND_EXIT);
  }, []);

  //Called when user selects an option
  const updateAnswer = (questionId, answer, type) => {
    switch (type) {
      case "value":
        currentAnswer[questionId].value = answer;
        break;
      case "body-part":
        currentAnswer[questionId]["bodypart"] = answer;
        break;
      case "commentForNotSure":
        currentAnswer[questionId]["commentForNotSure"] = answer;
    }

    const questionIndex = questionIds.indexOf(questionId);
    questionIds.forEach((questionId, index) => {
      if (index > questionIndex) {
        currentAnswer[questionId] = {};
      }
    });

    setErrors({});
    setCurrentAnswer({
      ...currentAnswer,
    });
  };

  console.log("[Debug] Activity Response == ", activityResponses);
  console.log("[Debug] Activity index == ", currentActivityIndex);

  return (
    <SurveyContext.Provider
      value={{
        currentActivityIndex: currentActivityIndex,
        currentAnswer,
        updateAnswer,
        setCurrentActivityIndex: setCurrentActivityIndex,
        setSurveyResponse: setSurveyResponse,
        errors,
        setErrors,
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyProvider;
