const LINES = [
  { name: "STR", type: "stat" },
  { name: "DEX", type: "stat" },
  { name: "INT", type: "stat" },
  { name: "LUK", type: "stat" },
  { name: "STRDEX", type: "splitstat" },
  { name: "STRINT", type: "splitstat" },
  { name: "STRLUK", type: "splitstat" },
  { name: "DEXINT", type: "splitstat" },
  { name: "DEXLUK", type: "splitstat" },
  { name: "INTLUK", type: "splitstat" },
  { name: "Attack", type: "normal" },
  { name: "Magic Attack", type: "normal" },
  { name: "Speed", type: "normal" },
  { name: "Jump", type: "normal" },
  { name: "All Stats", type: "normal" },
  { name: "Required Level", type: "reduction" },
  { name: "Defense", type: "defense" },
  { name: "MaxHP", type: "hpmp" },
  { name: "MaxMP", type: "hpmp" },
];

const STAT = [33, 44, 55, 66, 77];
const SPLIT = [18, 24, 30, 36, 42];
const NORMAL = [3, 4, 5, 6, 7];
const REDUCTION = [-15, -20, -25, -30, -35];
const HPMP = [1800, 2400, 3000, 3600, 4200];
const DEFENSE = [33, 44, 55, 66, 77];

export const generateFlame = () => {
  const stats = {
    STR: 0,
    DEX: 0,
    INT: 0,
    LUK: 0,
    "All Stats": 0,
    Defense: 0,
    Attack: 0,
    "Magic Attack": 0,
    Speed: 0,
    Jump: 0,
    "Required Level": 0,
    MaxHP: 0,
    MaxMP: 0,
  };
  const linesSet = new Set();
  while (linesSet.size != 4) {
    const rand = Math.floor(Math.random() * LINES.length);
    linesSet.add(rand);
  }
  linesSet.forEach((item) => {
    const tier = calculateTier();
    switch (LINES[item].type) {
      case "stat":
        stats[LINES[item].name] += STAT[tier];
        break;
      case "splitstat":
        stats[LINES[item].name.substring(0, 3)] += SPLIT[tier];
        stats[LINES[item].name.substring(3)] += SPLIT[tier];
        break;
      case "normal":
        stats[LINES[item].name] += NORMAL[tier];
        break;
      case "reduction":
        stats[LINES[item].name] += REDUCTION[tier];
        break;
      case "hpmp":
        stats[LINES[item].name] += HPMP[tier];
        break;
      case "defense":
        stats[LINES[item].name] += DEFENSE[tier];
        break;
    }
  });

  return stats;
};

const calculateTier = () => {
  const rand = Math.random();
  if (rand < 0.5729) return 0;
  else if (rand < 0.8723) return 1;
  else if (rand < 0.9375) return 2;
  else if (rand < 9740) return 3;
  else return 4;
};
