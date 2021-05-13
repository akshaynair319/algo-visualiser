import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import Customize from "./Customize";
import { useGlobalContext } from "./Context";
import "../Styles/navbar.css";

function Navbar() {
  const {
    clearAll,
    refresh,
    startVisualisation,
    currentAlgo,
    lock,
    toggleLock,
    undo,
  } = useGlobalContext();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light-theme"
  );
  const [dropdown, setDropdown] = useState(false);

  const selectAlgoRef = useRef(null);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    setDropdown(false);
  }, [currentAlgo]);

  const toggleTheme = () => {
    let newTheme = "light-theme";
    if (theme === newTheme) {
      newTheme = "dark-theme";
    }
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="navbar">
      {/* to switch between light and dark themes */}
      <div className="themeToggle">
        <i className="fas fa-adjust fa-2x" onClick={toggleTheme}></i>
      </div>
      {/* title */}
      <div className="title">algo-visualiser </div>
      {/* dropdown menu for selecting algorithm */}
      {dropdown && (
        <Dropdown
          rect={selectAlgoRef.current.getBoundingClientRect()}
          show={dropdown}
        />
      )}
      {/* tools for graph */}
      <ul className="navbar-items">
        {/* button for selecting algorithms */}
        <li
          onClick={() => setDropdown(!dropdown)}
          ref={selectAlgoRef}
          className={`selectAlgo ${currentAlgo !== "" ? "active-algo" : ""}`}
        >
          {currentAlgo || "Select ALgo"}
          <i className="fas fa-caret-down fa-2x"></i>
        </li>
        {/* start algorithms */}
        <div className="tooltip-container start" data-tooltip="start">
          <i
            className="options fas fa-play fa-2x"
            onClick={startVisualisation}
          ></i>
        </div>
        {/* undo previous activity */}
        <div className="tooltip-container undo" data-tooltip="undo">
          <i className="options fas fa-redo fa-2x" onClick={undo}></i>
        </div>
        {/* refresh the graph off all styles applied */}
        <div className="tooltip-container refresh" data-tooltip="refresh">
          <i className="options fas fa-sync fa-2x" onClick={refresh}></i>
        </div>
        {/* delete graph */}
        <div className="tooltip-container delete" data-tooltip="delete">
          <i className="options fas fa-trash fa-2x" onClick={clearAll}></i>
        </div>
        {/* lock graph */}
        <div
          className="tooltip-container lock-unlock"
          data-tooltip={`${lock ? "lock" : "unlock"}`}
        >
          <i
            className={`options-lock fas fa-lock${lock ? "" : "-open"} fa-2x`}
            onClick={toggleLock}
          ></i>
        </div>
      </ul>
      <Customize />
    </div>
  );
}

export default Navbar;
