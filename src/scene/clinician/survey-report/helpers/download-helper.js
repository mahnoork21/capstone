export const parseDataToCsvFormatYoungChild = (surveyData) => {
  const csvData = Object.entries(surveyData["activity_response"])
    .flatMap(([key, val]) =>
      Object.entries(val).map(([questionId, v]) => ({
        [key + "_" + questionId]: v.value,
      }))
    )
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});

  const sortedCsvData = {};
  Object.keys(csvData)
    .sort()
    .forEach((key) => {
      sortedCsvData[key] = csvData[key];
    });

  const csvHeader = Object.keys(sortedCsvData);

  console.log("csvHeader ->", csvHeader);

  return [csvHeader, sortedCsvData];
};
