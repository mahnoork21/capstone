import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";
import { categoryMappings } from "../components/category-bar-chart/helper/categories-helper";
import { getTotalWeightedScoreAbilityWithProsthesis, getTotalWeightedScoreAbilityWithoutProsthesis, getTotalWeightedScoreProsthesisUsefulness } from "../components/activity-analysis/helper/weighted-calculation-helper";
import { getScores } from "../components/activity-analysis/helper/scores-helper";

export const parseDataToCsvFormatYoungChild = (surveyData) => {
  const customSortOrder = Object.keys(categoryMappings);

  const orderWithinCategory = [
    "do",
    "how",
    "well",
    "useful",
    "without",
    "category",
  ];

  const totalScores = {
    ability_with_prosthesis_total_score: getTotalWeightedScoreAbilityWithProsthesis(
      getScores(surveyData, "well")
    ),
    prosthesis_usefulness_total_score: getTotalWeightedScoreProsthesisUsefulness(
      getScores(surveyData, "useful")
    ),
    ability_without_prosthesis_total_score: getTotalWeightedScoreAbilityWithoutProsthesis(
      getScores(surveyData, "without")
    ),
  };

  let csvData = Object.entries(surveyData["activity_response"])
    .flatMap(([key, val]) => {
      const category = categoryMappings[key.split("_")[0]] || ""; // Extracting the activity name

      return orderWithinCategory.map((orderKey) => {
        const v = val[orderKey];
        const question = youngChildSurvey.find(
          (q) => q.questionId === orderKey
        );

        const labelShort =
          question?.options.find((opt) => opt.value === v.value)?.labelShort ||
          "";

        // Define column names
        const columnKey = `${key}_${orderKey}`;

        // Create an object with the columns and values
        const result = {
          [columnKey]: orderKey === "category" ? category : labelShort,
        };

        return { result, order: customSortOrder.indexOf(key.split("_")[0]) };
      });
    })
    .sort((a, b) => a.order - b.order)
    .map((entry) => entry.result)
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

  const csvHeader = Object.keys(csvData).concat(Object.keys(totalScores));

  // Merge csvData and totalScores
  const finalCsvData = { ...csvData, ...totalScores };

  return [csvHeader, finalCsvData];
};
