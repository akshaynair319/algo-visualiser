import React from "react";
import { useGlobalContext } from "./../Context";

function Undo() {
  const { undo } = useGlobalContext();
  return (
    <div className="tooltip-container undo" data-tooltip="undo">
      <i className="options fas fa-redo fa-2x" onClick={undo}></i>
    </div>
  );
}

export default Undo;
