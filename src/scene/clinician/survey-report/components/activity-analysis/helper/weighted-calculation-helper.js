export const getTotalWeightedScoreAbilityWithProsthesis = (answers) => {
  const totalPossibleScore = 23 * (Object.keys(answers).length - 1);

  var totalScore = 0;
  for (var key in answers) {
    if (answers.hasOwnProperty(key)) {
      switch (key)
      {
        case "No difficulty":
          totalScore += answers[key] * 4;
          break;
        case "Some difficulty":
          totalScore += answers[key] * 3;
          break;
        case "Great difficulty":
          totalScore += answers[key] * 2;
          break;
        case "With help":
          totalScore += answers[key] * 1;
          break;
        case "Cannot do":
          totalScore += answers[key] * 0;
          break;
      }
    }
  }

  totalScore = (totalScore / totalPossibleScore) * 100;

  return totalScore.toFixed(2) + "%";
};

export const getTotalWeightedScoreProsthesisUsefulness = (answers) => {
  const totalPossibleScore = 23 * (Object.keys(answers).length - 1);

  var totalScore = 0;
  for (var key in answers) {
    if (answers.hasOwnProperty(key)) {
      switch (key)
      {
        case "Very useful":
          totalScore += answers[key] * 2;
          break;
        case "Somewhat useful":
          totalScore += answers[key] * 1;
          break;
        case "Not useful":
          totalScore += answers[key] * 0;
          break;
      }
    }
  }

  totalScore = (totalScore / totalPossibleScore) * 100;

  return totalScore.toFixed(2) + "%";
};

export const getTotalWeightedScoreAbilityWithoutProsthesis = (answers) => {
  const totalPossibleScore = 23 * (Object.keys(answers).length - 1);

  var totalScore = 0;
  for (var key in answers) {
    if (answers.hasOwnProperty(key)) {
      switch (key)
      {
        case "No difficulty":
          totalScore += answers[key] * 4;
          break;
        case "Some difficulty":
          totalScore += answers[key] * 3;
          break;
        case "Great difficulty":
          totalScore += answers[key] * 2;
          break;
        case "With help":
          totalScore += answers[key] * 1;
          break;
        case "Cannot do":
          totalScore += answers[key] * 0;
          break;
      }
    }
  }

  totalScore = (totalScore / totalPossibleScore) * 100;

  return totalScore.toFixed(2) + "%";
};
