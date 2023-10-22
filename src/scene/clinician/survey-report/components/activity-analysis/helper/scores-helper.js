import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";

export const getScores = (survey, questionId) => {
  const scores = youngChildSurvey
    .find((question) => question.questionId === questionId)
    .options.reduce((result, answer) => {
      result[answer.labelShort] = Object.values(survey["activity_response"])
        .map((activity) => activity[questionId].value)
        .filter((val) => val === answer.value).length;
      return result;
    }, {});

  return scores;
};
