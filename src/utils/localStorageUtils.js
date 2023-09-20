import { youngChildActivity } from "./youngChildActivity";

export const isUserIdInLocalStorage = (userId) => {
  const currentUser = localStorage.getItem(`pufi_${userId}`);
  return currentUser !== null;
};

export const addUserToLocalStorage = (userId) => {
  localStorage.setItem(`pufi_${userId}`, JSON.stringify({}));
};

export const checkAddSurveyToUserIdInLocalStorage = (userId, surveyId) => {
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
  return user[surveyId].lastAnsweredIndex;
};

export const setLastAnsweredIndex = (userId, surveyId, newAnsweredIndex) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  user[surveyId].lastAnsweredIndex = newAnsweredIndex;
  localStorage.setItem(`pufi_${userId}`, user);
};

export const getAnswerForIndex = (userId, surveyId, index) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  return user[surveyId]["allResponses"][index];
};

export const updateAnswerForIndex = (userId, surveyId, index, responses) => {
  const user = JSON.parse(localStorage.getItem(`pufi_${userId}`));
  user[surveyId]["allResponses"][index] = responses;
  localStorage.setItem(`pufi_${userId}`, user);
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
