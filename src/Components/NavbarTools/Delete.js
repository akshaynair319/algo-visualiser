import React from "react";
import { useGlobalContext } from "./../Context";

function Delete() {
  const { clearAll } = useGlobalContext();
  return (
    <div className="tooltip-container delete" data-tooltip="delete">
      <i className="options fas fa-trash fa-2x" onClick={clearAll}></i>
    </div>
  );
}

export default Delete;
