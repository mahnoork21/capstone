import { labels } from "./survey-labels";

export const getScores = (survey, questionId) => {
  const scores = labels[questionId].answers.reduce((result, answer, index) => {
    result[answer] = Object.values(survey["activity_response"])
      .map((activity) => activity[questionId].value)
      .filter((val) => val === index).length;
    return result;
  }, {});

  return scores;
};
