import React from "react";
import { useGlobalContext } from "./../Context";

function Clear() {
  const { refresh } = useGlobalContext();
  return (
    <div className="tooltip-container refresh" data-tooltip="refresh">
      <i className="options fas fa-sync fa-2x" onClick={refresh}></i>
    </div>
  );
}

export default Clear;
