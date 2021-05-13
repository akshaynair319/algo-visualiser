import React from "react";
import { algorithms } from "../Data/Algorithms";
import { useGlobalContext } from "./Context";
import "../Styles/dropdownalgo.css";
function DropdownAlgo({ x, y, height, width, show }) {
  const { changeAlgo } = useGlobalContext();
  // console.log(rect);
  const style = {
    top: `${y + height}px`,
    left: `${x}px`,
    width: `${width}px`,
  };
  return (
    <div className={`dropdown ${show ? "dropdown-show" : ""}`} style={style}>
      {algorithms.map((algo, index) => {
        return (
          <li key={index} onClick={() => changeAlgo(algo)}>
            {algo}
          </li>
        );
      })}
    </div>
  );
}

export default DropdownAlgo;
