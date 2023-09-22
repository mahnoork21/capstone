import { useId } from "react";
import { youngChildActivity } from "./youngChildActivity";

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
  console.log(user, " for ", `pufi_${userId}`);
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
  console.log("In get last answe", userId, surveyId);
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  return user ? user[surveyId]["allResponses"][index] : null;
};

export const updateAnswerForIndex = (userId, surveyId, index, responses) => {
  console.log("userId = ", userId);
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  console.log("user = ", user);
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
