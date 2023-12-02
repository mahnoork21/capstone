import React from "react";
import { getSurveyById } from "@/firebase/surveyRepo";
import {
  checkIfALLResponsesAreValid,
  generateEmptyAnswer,
} from "@/scene/client/survey/helper/surveyHelper";
import { youngChildActivity } from "@/scene/client/survey/helper/youngChildActivity";
import { questionIds } from "@/scene/client/survey/helper/youngChildSurvey";
import { HeaderButtonType } from "@/utils/enums/headingButtonType";
import { useRouter } from "next/router";

import { createContext, useEffect, useState, useCallback } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [surveyId, setSurveyId] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [clinicianId, setClinicianId] = useState(null);
  const [survey, setSurvey] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const [breakpoint, setBreakpoint] = useState(`desktop`);

  const [headerButtonType, setHeaderButtonType] = useState(
    HeaderButtonType.START_SURVEY
  );

  const [currentActivityIndex, setCurrentActivityIndex] = useState(-1);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [errors, setErrors] = useState({});

  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  const [didViewResponseGuide, setDidViewResponseGuide] = useState(false);

  const router = useRouter();

  const activityResponses = survey?.activity_response;

  useEffect(() => {
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
        mediaQuery.removeEventListener("change", changeListener);
      };
    } else {
      //for backward compatibility with older safari broswers
      mediaQuery.addListener(changeListener);
      return () => {
        mediaQuery.removeListener(changeListener);
      };
    }
  }, []);

  useEffect(() => {
    if (surveyId && organizationId && clinicianId) {
      getCurrentSurvey();
    }
  }, [organizationId, clinicianId, surveyId]);

  const getCurrentSurvey = async () => {
    const survey = await getSurveyById(organizationId, clinicianId, surveyId);
    if (survey) {
      setSurvey(survey);

      if (survey.is_submitted) {
        router.push({
          pathname: "/client/survey-complete",
          query: {
            orgId: organizationId,
            clinicianId: clinicianId,
            surveyId: surveyId,
          },
        });
      }
    } else {
      router.push({
        pathname: "/client",
        query: {
          ["error-status"]: "invalid-survey-id",
        },
      });
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
        router.push({
          pathname: "/client/summary",
          query: {
            orgId: organizationId,
            clinicianId: clinicianId,
            surveyId: surveyId,
          },
        });
      } else {
        if (didViewResponseGuide) {
          router.push({
            pathname: "/client/survey",
            query: {
              orgId: organizationId,
              clinicianId: clinicianId,
              surveyId: surveyId,
            },
          });
        } else {
          router.push({
            pathname: "/client/response-guide",
            query: {
              orgId: organizationId,
              clinicianId: clinicianId,
              surveyId: surveyId,
            },
          });
        }
      }
    } else {
      return "Survey Link is invalid. Please contact your clinician for a link to the survey.";
    }
  }, [
    organizationId,
    clinicianId,
    surveyId,
    survey,
    currentActivityIndex,
    didViewResponseGuide,
  ]);

  //Called when user selects an option
  const updateAnswer = (questionId, answer, type) => {
    switch (type) {
      case "value":
        currentAnswer[questionId].value = answer;
        const questionIndex = questionIds.indexOf(questionId);
        questionIds.forEach((questionId, index) => {
          if (index > questionIndex) {
            currentAnswer[questionId] = {};
          }
        });
        break;
      case "body-part":
        currentAnswer[questionId]["bodypart"] = answer;
        break;
      case "commentForNotSure":
        currentAnswer[questionId]["commentForNotSure"] = answer;
        break;
      case "comment":
        currentAnswer[questionId]["comment"] = answer;
    }

    setErrors({});
    setCurrentAnswer({
      ...currentAnswer,
    });
  };

  console.log("[Debug] SurveyId == ", surveyId, didViewResponseGuide);
  console.log("[Debug] Survey == ", survey);
  console.log("[Debug] Activity Response == ", survey?.activity_response);
  console.log("[Debug] Activity index == ", currentActivityIndex);

  return (
    <ClientContext.Provider
      value={{
        surveyId,
        setSurveyId: setSurveyId,
        organizationId,
        setOrganizationId,
        clinicianId,
        setClinicianId,
        survey,
        setSurvey,
        isEditMode,
        setIsEditMode: setIsEditMode,
        activityResponses,
        breakpoint,
        headerButtonType,
        setHeaderButtonType: setHeaderButtonType,
        handleStartSurveyClick: handleStartSurveyClick,
        currentActivityIndex,
        currentAnswer,
        setCurrentAnswer,
        updateAnswer,
        setCurrentActivityIndex: setCurrentActivityIndex,
        errors,
        setErrors,
        isNavBarVisible,
        setIsNavBarVisible: setIsNavBarVisible,
        setDidViewResponseGuide: setDidViewResponseGuide,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
