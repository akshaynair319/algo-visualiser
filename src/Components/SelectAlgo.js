import React, { useEffect } from "react";
import { algorithms } from "../Data/Algorithms";
import { useGlobalContext } from "./Context";
function SelectAlgo() {
  const { currentAlgo, changeAlgo, startVisualisation } = useGlobalContext();

  return (
    <div className="selectAlgo">
      <ul>
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
        <li onClick={startVisualisation}>start</li>
      </ul>
    </div>
  );
}

export default SelectAlgo;
