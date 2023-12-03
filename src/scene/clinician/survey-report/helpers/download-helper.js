import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";
import { categoryMappings } from "../components/category-bar-chart/helper/categories-helper";
import { getTotalWeightedScore } from "../components/activity-analysis/helper/weighted-calculation-helper";
import { getScores } from "../components/activity-analysis/helper/scores-helper";

export const parseDataToCsvFormatYoungChild = (surveyData) => {
  const totalScores = {
    ability_with_prosthesis_weighted_total_score: getTotalWeightedScore(
      getScores(surveyData, "well")
    ),
    prosthesis_usefulness_weighted_total_score: getTotalWeightedScore(
      getScores(surveyData, "useful")
    ),
    ability_without_prosthesis_weighted_total_score: getTotalWeightedScore(
      getScores(surveyData, "without")
    ),
  };

  let csvData = Object.entries(surveyData["activity_response"])
    .flatMap(([key, val]) => {
      const category = categoryMappings[key.split("_")[0]]; // Extracting the activity name

      return Object.entries(val).flatMap(([questionId, v]) => {
        const question = youngChildSurvey.find(
          (q) => q.questionId === questionId
        );
        const labelShort =
          question?.options.find((opt) => opt.value === v.value)?.labelShort ||
          "";

        // Define column names
        const columns = [
          `${key}_${questionId}_text`,
          `${key}_${questionId}_value`,
        ];

        // Define values for each column
        const values = [
          labelShort, // For _text column
          v.value, // For _value column
        ];

        // Create an object with the columns and values
        const result = {};
        columns.forEach((col, index) => {
          result[col] = values[index];
        });

        // Add the category to the result
        result[`${key}_category`] = category;

        return result;
      });
    })
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

  const sortedCsvData = {};
  Object.keys(csvData)
    .sort()
    .forEach((key) => {
      sortedCsvData[key] = csvData[key];
    });

  const csvHeader = Object.keys(sortedCsvData).concat(Object.keys(totalScores));

  // Merge sortedCsvData and totalScores
  const finalCsvData = Object.assign({}, sortedCsvData, totalScores);

  return [csvHeader, finalCsvData];
};
