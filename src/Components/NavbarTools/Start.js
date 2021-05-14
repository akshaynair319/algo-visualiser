import React from "react";
import { useGlobalContext } from "./../Context";

function Start() {
  const { startVisualisation } = useGlobalContext();
  return (
    <div className="tooltip-container start" data-tooltip="start">
      <i className="options fas fa-play fa-2x" onClick={startVisualisation}></i>
    </div>
  );
}

export default Start;
