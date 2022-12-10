export const calculateScore = (mainStat, attRatio, statRatio, stats) => {
  let score = 0;
  score += stats[mainStat];
  score += stats["All Stats"] * statRatio;
  if (mainStat === "INT") score += stats["Magic Attack"] * attRatio;
  else score += stats["Attack"] * attRatio;

  return score;
};
