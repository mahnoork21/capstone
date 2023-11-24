import { youngChildSurvey } from "@/scene/client/survey/helper/youngChildSurvey";

export const parseDataToCsvFormatYoungChild = (surveyData) => {
  const csvData = Object.entries(surveyData["activity_response"])
    .flatMap(([key, val]) =>
      Object.entries(val).map(([questionId, v]) => {
        const question = youngChildSurvey.find(
          (q) => q.questionId === questionId
        );
        const labelShort =
          question?.options.find((opt) => opt.value === v.value)?.labelShort ||
          "";
        return {
          [key + "_" + questionId]: labelShort,
        };
      })
    )
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

  const sortedCsvData = {};
  Object.keys(csvData)
    .sort()
    .forEach((key) => {
      sortedCsvData[key] = csvData[key];
    });

  const csvHeader = Object.keys(sortedCsvData);

  console.log("sortedCsvData ->", sortedCsvData);

  return [csvHeader, sortedCsvData];
};
