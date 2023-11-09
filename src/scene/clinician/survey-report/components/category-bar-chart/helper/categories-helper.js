const categoryMappings = {
  socks: "Selfcare",
  velcro: "Selfcare",
  pants: "Selfcare",
  "t-shirt": "Selfcare",
  zipper: "Selfcare",
  cheese: "Home",
  blocks: "Leisure",
  book: "Leisure",
  bowl: "Leisure",
  lid: "Leisure",
  box: "Leisure",
  marker: "Leisure",
  glue: "Leisure",
  beads: "Leisure",
  cut: "Leisure",
  stickers: "Leisure",
  music: "Leisure",
  clean: "Leisure",
  tablet: "Leisure",
  ball: "Community",
  swing: "Community",
  slide: "Community",
  bike: "Community",
};

export const groupByCategory = (surveyData) => {
  return Object.entries(surveyData["activity_response"]).reduce(
    (output, [activity, details]) => {
      const category = categoryMappings[activity];
      const value = details.do.value;

      if (output[category]) {
        output[category][value] = (output[category][value] || 0) + 1;
      }

      return output;
    },
    {
      Selfcare: { 0: 0, 1: 0, 2: 0 },
      Home: { 0: 0, 1: 0, 2: 0 },
      Leisure: { 0: 0, 1: 0, 2: 0 },
      Community: { 0: 0, 1: 0, 2: 0 },
    }
  );
};
