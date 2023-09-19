export const saveAnswer = () => {};

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
