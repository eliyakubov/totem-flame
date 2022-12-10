import { createUseStyles } from "react-jss";
import UI from "../assets/ui.png";

const useStyles = createUseStyles({
  UIWindow: {
    position: "relative",
  },
  stats: {
    position: "absolute",
    top: 160,
    left: 12,
    color: "white",
    fontSize: 12,
    lineHeight: 1.3,
    textAlign: "left",
  },
});

function UIWindow({ stats }) {
  const classes = useStyles();
  return (
    <div className={classes.UIWindow}>
      <img src={UI} />
      <div className={classes.stats}>
        <div>
          {stats &&
            Object.keys(stats).map((item) => {
              if (stats[item] !== 0) {
                return (
                  <div>
                    {item} {item !== "Required Level" && "+"}
                    {stats[item]}
                    {item === "All Stats" && "%"}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default UIWindow;
