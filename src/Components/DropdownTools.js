import React, { useState, useRef } from "react";

import "./../Styles/Customize.css";

function DropdownTools() {
  const [click, setClick] = useState(false);

  const dropDownRef = useRef(null);

  return (
    <div className="optionDropDown" ref={dropDownRef}>
      <i
        className="fas fa-chevron-circle-down fa-2x "
        onClick={() => setClick(!click)}
      ></i>
    </div>
  );
}

export default DropdownTools;
