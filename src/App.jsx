import { useState } from "react";
import { generateFlame } from "./utils/generate-flames";
import UIWindow from "./components/UIWindow";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";
import { calculateScore } from "./utils/flame-score";

const useStyles = createUseStyles({
  container: {
    backgroundColor: "#1E313B",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    gap: 50,
    alignItems: "center",
    color: "white",
  },
  statsSide: {
    width: "400px",
    maxWidth: "400px",
  },
  button: {
    backgroundColor: "rgb(34 197 94)",
    padding: 4,
    width: "100%",
  },
  settleButton: {
    marginBlock: 20,
    backgroundColor: "rgb(253 186 116)",
    paddingBlock: 4,
    paddingInline: 10,
    display: "block",
  },
  resetButton: {
    marginBlock: 20,
    backgroundColor: "rgb(248 113 113)",
    paddingBlock: 4,
    paddingInline: 10,
    display: "block",
  },
});

function App() {
  const classes = useStyles();
  const [flame, setFlame] = useState(null);
  const [flameScore, setFlameScore] = useState(0);
  const [mainStat, setMainStat] = useState("STR");
  const [flamesRemaining, setFlamesRemaining] = useState(101);
  const [attRatio, setAttRatio] = useState(3);
  const [statRatio, setStatRatio] = useState(9);
  const [highestFlameScore, setHighestFlameScore] = useState(0);
  const [settleResult, setSettleResult] = useState(null);

  const handleClick = () => {
    if (flamesRemaining > 0) {
      setFlamesRemaining((prev) => prev - 1);
      setFlame(generateFlame());
    }
  };

  const reset = () => {
    setFlame(null);
    setFlameScore(0);
    setFlamesRemaining(101);
    setSettleResult(null);
  };

  const settle = () => {
    let highestFlame = 0;
    if (flamesRemaining === 0 || flamesRemaining > 100) return;
    for (let i = 0; i < flamesRemaining; i++) {
      const score = calculateScore(
        mainStat,
        attRatio,
        statRatio,
        generateFlame()
      );
      if (score > highestFlame) highestFlame = score;
    }
    const result = {
      attempts: flamesRemaining,
      highest: highestFlame,
      higher: highestFlame > flameScore,
    };
    setFlamesRemaining(0);
    setSettleResult({ ...result });
  };

  useEffect(() => {
    if (flame) {
      setFlameScore(calculateScore(mainStat, attRatio, statRatio, flame));
      if (flameScore > highestFlameScore) setHighestFlameScore(flameScore);
    }
  }, [flame, flameScore]);

  return (
    <div className={classes.container}>
      <div>
        Flames Remaining: {flamesRemaining}
        <UIWindow stats={flame} />
        <button className={classes.button} onClick={() => handleClick()}>
          One More Try
        </button>
      </div>
      <div className={classes.statsSide}>
        <div>
          <strong>Main Stat</strong>
          <input
            type="radio"
            checked={mainStat === "STR"}
            onChange={() => setMainStat("STR")}
          />{" "}
          STR
          <input
            type="radio"
            checked={mainStat === "DEX"}
            onChange={() => setMainStat("DEX")}
          />{" "}
          DEX
          <input
            type="radio"
            checked={mainStat === "INT"}
            onChange={() => setMainStat("INT")}
          />{" "}
          INT
          <input
            type="radio"
            checked={mainStat === "LUK"}
            onChange={() => setMainStat("LUK")}
          />{" "}
          LUK
        </div>
        <div>Current Flame Score: {flameScore}</div>
        <div>Highest Flame Score Seen: {highestFlameScore}</div>
        <button className={classes.settleButton} onClick={() => settle()}>
          Settle
        </button>
        {settleResult &&
          `You settled on a ${flameScore} flame score. \n
        The simulation ran an additional ${settleResult.attempts} attempts and the highest flame score seen was ${settleResult.highest}`}
        {flamesRemaining === 0 && (
          <button className={classes.resetButton} onClick={() => reset()}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
