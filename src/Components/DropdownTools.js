import React, { useState } from "react";

import "./../Styles/dropdownTools.css";
import GetNavbarTools from "./NavbarTools/GetNavbarTools";

function DropdownTools() {
  const [show, setShow] = useState(false);

  return (
    <div className="optionDropDown">
      <i
        className="fas fa-chevron-circle-down fa-2x "
        onClick={() => setShow(!show)}
      ></i>
      {show && <GetNavbarTools />}
    </div>
  );
}

export default DropdownTools;
