import React, { useState, useEffect } from "react";
import "../Styles/navbar.css";
import DropdownTools from "./DropdownTools";
import GetNavbarTools from "./NavbarTools/GetNavbarTools";
import SelectAlgo from "./SelectAlgo";
import { useGlobalContext } from "./Context";

function Navbar() {
  // handling light and dark themes through navbar
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light-theme"
  );

  const { windowSize } = useGlobalContext();

  //checking for window size
  const [size, setSize] = useState(windowSize);
  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

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

      {/* tools for graph */}
      <ul className="navbar-items">
        <SelectAlgo />
        {size >= 950 && <GetNavbarTools />}
      </ul>
      {/* component for drop-down for small window */}
      <DropdownTools />
    </div>
  );
}

export default Navbar;
