import React from "react";
import Start from "./Start";
import Undo from "./Undo";
import Clear from "./Clear";
import Delete from "./Delete";
import Lock from "./Lock";
import "./../../Styles/getNavbarTools.css";

function GetNavbarTools() {
  return (
    <div className="tools">
      {/* start algorithms */}
      <Start />
      {/* undo previous activity */}
      <Undo />
      {/* refresh the graph off all styles applied */}
      <Clear />
      {/* delete graph */}
      <Delete />
      {/* lock graph */}
      <Lock />
    </div>
  );
}

export default GetNavbarTools;
