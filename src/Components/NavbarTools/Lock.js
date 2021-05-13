import React from "react";
import { useGlobalContext } from "./../Context";

function Lock() {
  const { lock, toggleLock } = useGlobalContext();
  return (
    <div
      className="tooltip-container lock-unlock"
      data-tooltip={`${lock ? "lock" : "unlock"}`}
    >
      <i
        className={`options-lock fas fa-lock${lock ? "" : "-open"} fa-2x`}
        onClick={toggleLock}
      ></i>
    </div>
  );
}

export default Lock;
