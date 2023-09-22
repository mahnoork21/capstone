import { isNullOrUndefined } from "@/utils/utils";

export const saveAnswer = () => {};

export const checkIfResponseIsValid = ({ questionId, response }) => {
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
        };
      }
      break;
    case "how":
      //how is valid if it has value, if value is 3 bodypart input is given
      //if value is 0, required comment is given
      if (!isNullOrUndefined(response.value)) {
        if (response.value === 3) {
          //TODO check for empty
          if (response.bodypart) {
            return {
              isAnswered: true,
              response,
            };
          } else {
            return {
              isAnswered: false,
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
        };
      }
      break;
  }
};

export const answerFormat = [
  {
    activityId: "sock",
    responses: [
      {
        questionId: "do",
        response: {
          value: 0,
        },
      },
      {
        questionId: "how",
        response: {
          value: 3,
          bodypart: "legs",
        },
      },
      {
        questionId: "well",
        response: {
          value: 3,
          comment: "Comment on well",
        },
      },
      {
        questionId: "useful",
        response: {
          value: 1,
          comment: "Comment on useful",
        },
      },
      {
        questionId: "without",
        response: {
          value: 3,
          comment: "Comment on without",
        },
      },
    ],
  },
  {
    activityId: "velcro",
    response: [
      {
        questionId: "do",
        value: 1,
      },
      {
        questionId: "how",
        value: 0,
        commentForNotSure: "Comment when user selects Not sure",
      },
      {
        questionId: "well",
        value: 4,
        comment: "Comment on well",
      },
      {
        questionId: "useful",
        value: 1,
      },
      {
        questionId: "without",
        value: 3,
        comment: "Comment on without",
      },
    ],
  },
];
