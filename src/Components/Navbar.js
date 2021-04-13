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
  } = useGlobalContext();

  const [theme, setTheme] = useState("light-theme");
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
    setTheme(newTheme);
  };

  return (
    <div className="navbar">
      <div className="themeToggle">
        <i className="fas fa-adjust fa-2x" onClick={toggleTheme}></i>
      </div>
      <div className="title">algo-visualiser </div>
      {dropdown && (
        <Dropdown
          rect={selectAlgoRef.current.getBoundingClientRect()}
          show={dropdown}
        />
      )}
      <ul>
        <li
          onClick={() => setDropdown(!dropdown)}
          ref={selectAlgoRef}
          className={`${currentAlgo !== "" ? "active-algo" : ""}`}
        >
          {currentAlgo || "Select ALgo"}
          <i class="fas fa-caret-down fa-2x"></i>
        </li>
        <li onClick={startVisualisation}>begin</li>
        <li onClick={refresh}>refresh</li>
        <li onClick={clearAll}>delete</li>
      </ul>
      <Customize />
    </div>
  );
}

export default Navbar;
