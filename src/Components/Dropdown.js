import React from "react";
import { algorithms } from "../Data/Algorithms";
import { useGlobalContext } from "./Context";

function Dropdown({ rect }) {
  const { currentAlgo, changeAlgo } = useGlobalContext();
  console.log(rect);
  const style = {
    top: `${rect.y + rect.height}px`,
    left: `${rect.x}px`,
    width: `${rect.width}px`,
  };
  return (
    <div className="dropdown" style={style}>
      {algorithms.map((algo, index) => {
        return (
          <li
            className={`${
              currentAlgo !== ""
                ? algo === currentAlgo
                  ? "active"
                  : "inactive"
                : ""
            }`}
            key={index}
            onClick={() => changeAlgo(algo)}
          >
            {algo}
          </li>
        );
      })}
    </div>
  );
}

export default Dropdown;
