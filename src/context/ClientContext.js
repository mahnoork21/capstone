import { auth } from "@/firebase/firebase";
import { getSurveyById } from "@/firebase/surveyRepo";
import {
  checkIfALLResponsesAreValid,
  generateEmptyAnswer,
} from "@/scene/client/survey/helper/surveyHelper";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import { questionIds } from "@/scene/client/survey/helper/youngChildSurvey";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/router";

const { createContext, useEffect, useState, useCallback } = require("react");

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [currentSurveyId, setCurrentSurveyId] = useState(null);
  const [user, setUser] = useState(null);
  const [breakpoint, setBreakpoint] = useState(`desktop`);
  const [survey, setSurvey] = useState();
  const [headerButtonType, setHeaderButtonType] = useState(
    HeaderButtonType.START_SURVEY
  );

  const [currentActivityIndex, setCurrentActivityIndex] = useState(-1);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [errors, setErrors] = useState({});

  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  const router = useRouter();

  const activityResponses = survey?.activity_response;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    signInAnonymously(auth).then(() => {
      console.log("Signed In anonymously");
    });

    const mediaQuery = window.matchMedia("screen and (min-width: 1024px)");
    const changeListener = (e) => {
      if (e.matches) {
        setBreakpoint(`desktop`);
      } else {
        setBreakpoint(`mobile`);
      }
    };
    changeListener(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", changeListener);
      return () => {
        unsubscribe();
        mediaQuery.removeEventListener("change", changeListener);
      };
    } else {
      //for backward compatibility with older safari broswers
      mediaQuery.addListener(changeListener);
      return () => {
        unsubscribe();
        mediaQuery.removeListener(changeListener);
      };
    }
  }, []);

  useEffect(() => {
    if (user && currentSurveyId) {
      getCurrentSurvey();
    }
  }, [currentSurveyId, user]);

  const getCurrentSurvey = async () => {
    const survey = await getSurveyById(currentSurveyId);
    if (survey) {
      setSurvey(survey);

      if (survey.is_submitted) {
        router.push("/client/survey-complete");
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

  const moveToLastAnsweredIndex = () => {
    for (const [index, activity] of youngChildActivity.entries()) {
      const currentActivityResponse = activityResponses[activity.id];
      if (currentActivityResponse) {
        const error = checkIfALLResponsesAreValid(currentActivityResponse);

        if (error) {
          setCurrentActivityIndex(index);
          break;
        }

        //the last activity is valid
        if (index + 1 === youngChildActivity.length) {
          setCurrentActivityIndex(index);
          return;
        }
      } else {
        //generate empty response
        setCurrentActivityIndex(index);
        break;
      }
    }
  };

  const handleStartSurveyClick = useCallback(() => {
    if (survey) {
      if (currentActivityIndex + 1 === youngChildActivity.length) {
        router.push("/client/summary");
      } else {
        router.push("/client/survey");
      }
    } else {
      //TODO show error message that error not found in homepage
      if (!currentSurveyId) {
        return "Survey Id is not provided. Please contact your clinician for a link to the survey.";
      } else {
        return "Survey Id is not valid. Please contact your clinician.";
      }
    }
  }, [currentSurveyId, survey, currentActivityIndex]);

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

  console.log("[Debug] SurveyId == ", currentSurveyId);
  console.log("[Debug] Survey == ", survey);
  console.log("[Debug] Activity Response == ", survey?.activity_response);
  console.log("[Debug] Activity index == ", currentActivityIndex);

  return (
    <ClientContext.Provider
      value={{
        currentSurveyId,
        setSurvey,
        activityResponses,
        breakpoint,
        headerButtonType,
        setHeaderButtonType: setHeaderButtonType,
        setCurrentSurveyId: setCurrentSurveyId,
        handleStartSurveyClick: handleStartSurveyClick,
        currentActivityIndex,
        currentAnswer,
        updateAnswer,
        setCurrentActivityIndex: setCurrentActivityIndex,
        errors,
        setErrors,
        isNavBarVisible,
        setIsNavBarVisible: setIsNavBarVisible,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
