import { useId } from "react";
import { youngChildActivity } from "../scene/client/survey/helper/youngChildActivity";

/**
 * Flow of userId and survey.
 * In localstorage user information is stored in pufi_{userId} key.
 * This will store an object which will have a key for each surveyId.
 * Each surveyId will will store lastAnsweredIndex and allResponses.
 * allResponses is a list that will store reponse for all activity.
 * Each response will have activityId and responses list for each question.
 * Sample: Run the application and see localstorage.
 */

export const isUserIdInLocalStorage = (userId) => {
  const currentUser = localStorage.getItem(`pufi_${userId}`);
  return currentUser !== null;
};

export const addUserToLocalStorage = (userId) => {
  localStorage.setItem(`pufi_${userId}`, JSON.stringify({}));
};

export const checkAndAddSurveyToUserIdInLocalStorage = (userId, surveyId) => {
  const currentUser = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  if (!currentUser.hasOwnProperty(surveyId)) {
    //TODO change based on type of survey
    currentUser[surveyId] = {
      lastAnsweredIndex: -1,
      allResponses: [generateEmptyAnswer(youngChildActivity[0].id)],
    };
    localStorage.setItem(`pufi_${userId}`, JSON.stringify(currentUser));
  }
};

export const getLastAnsweredIndex = (userId, surveyId) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  return user ? user[surveyId].lastAnsweredIndex : -1;
};

export const setLastAnsweredIndex = (userId, surveyId, newAnsweredIndex) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  user[surveyId].lastAnsweredIndex = newAnsweredIndex;
  localStorage.setItem(`pufi_${userId}`, JSON.stringify(user));
};

export const incrementLastAnsweredIndex = (userId, surveyId) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  user[surveyId].lastAnsweredIndex++;

  const nextActivityIndex = user[surveyId].lastAnsweredIndex + 1;

  // checking if there is empty response for this index
  if (!user[surveyId].allResponses[nextActivityIndex]) {
    user[surveyId].allResponses[nextActivityIndex] = generateEmptyAnswer(
      youngChildActivity[nextActivityIndex].id
    );
  }

  localStorage.setItem(`pufi_${userId}`, JSON.stringify(user));
};

export const getAnswerForIndex = (userId, surveyId, index) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  return user ? user[surveyId]["allResponses"][index] : null;
};

export const updateAnswerForIndex = (userId, surveyId, index, responses) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  user[surveyId]["allResponses"][index] = responses;
  localStorage.setItem(`pufi_${userId}`, JSON.stringify(user));
};

const questionIds = ["do", "how", "well", "useful", "without"];

export const generateEmptyAnswer = (activityId) => {
  return {
    activityId: activityId,
    responses: questionIds.map((questionId) =>
      generateEmptyResponse(questionId)
    ),
  };
};

export const generateEmptyResponse = (questionId) => {
  return {
    questionId: questionId,
    response: {},
  };
};
