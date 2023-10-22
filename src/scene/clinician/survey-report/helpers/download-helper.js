export const parseDataToCsvFormatYoungChild = (surveyData) => {
  const csvData = Object.entries(surveyData["activity_response"])
    .flatMap(([key, val]) =>
      Object.entries(val).map(([questionId, v]) => ({
        [key + "_" + questionId]: v.value,
      }))
    )
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

  const csvHeader = Object.keys(csvData);

  console.log("csvHeader ->", csvHeader);

  return [csvHeader, csvData];
};
