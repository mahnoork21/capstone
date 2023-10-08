import { isNullOrUndefined } from "@/utils/utils";
import { questionIds } from "./youngChildSurvey";

export const saveAnswer = () => {};

export const checkIfResponseIsValid = (questionId, response) => {
  switch (questionId) {
    case "do":
      //do is valid if there is an answer
      if (!isNullOrUndefined(response.value)) {
        return {
          isAnswered: true,
          response,
        };
      } else {
        return {
          isAnswered: false,
          error: "no-response",
        };
      }
      break;
    case "how":
      //how is valid if it has value, if value is 3 bodypart input is given
      //if value is 0, required comment is given
      if (!isNullOrUndefined(response.value)) {
        if (response.value === 3) {
          if (response.bodypart?.trim()) {
            return {
              isAnswered: true,
              response,
            };
          } else {
            return {
              isAnswered: false,
              error: "no-bodypart",
            };
          }
        }
        if (response.value === 0) {
          if (response.commentForNotSure) {
            return {
              isAnswered: true,
              response,
            };
          } else {
            return {
              isAnswered: false,
              error: "no-commentForNotSure",
            };
          }
        }
        return {
          isAnswered: true,
          response,
        };
      } else {
        return {
          isAnswered: false,
          error: "no-response",
        };
      }
      break;
    case "well":
      if (!isNullOrUndefined(response.value)) {
        return {
          isAnswered: true,
          response,
        };
      } else {
        return {
          isAnswered: false,
          error: "no-response",
        };
      }
      break;
    case "useful":
      if (!isNullOrUndefined(response.value)) {
        return {
          isAnswered: true,
          response,
        };
      } else {
        return {
          isAnswered: false,
          error: "no-response",
        };
      }
      break;
    case "without":
      if (!isNullOrUndefined(response.value)) {
        return {
          isAnswered: true,
          response,
        };
      } else {
        return {
          isAnswered: false,
          error: "no-response",
        };
      }
      break;
  }
};

export const generateEmptyAnswer = (activityId) => {
  const emptyAnswer = {};
  questionIds.forEach((questionId) => {
    emptyAnswer[questionId] = {};
  });
  return emptyAnswer;
};

export const firestore_answerformat = {
  sock: {
    do: {
      value: 0,
    },
    how: {
      value: 3,
      bodypart: "legs",
    },
    well: {
      value: 3,
      comment: "Comment on well",
    },
    useful: {
      value: 1,
      comment: "Comment on useful",
    },
    without: {
      value: 3,
      comment: "Comment on without",
    },
  },
  velcro: {
    do: {
      value: 1,
    },
    how: {
      value: 0,
      commentForNotSure: "Comment when user selects Not sure",
    },
    well: {
      value: 4,
      comment: "Comment on well",
    },
    useful: {
      value: 1,
    },
    without: {
      value: 3,
      comment: "Comment on without",
    },
  },
};
