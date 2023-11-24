export const getTotalWeightedScore = (answers) => {
  const totalPossibleScore = 23 * (Object.keys(answers).length - 1);

  const totalScore =
    (Object.values(answers)
      .map((value, index) => value * index)
      .reduce((acc, val) => acc + val, 0) /
      totalPossibleScore) *
    100;

  return totalScore.toFixed(2) + "%";
};
