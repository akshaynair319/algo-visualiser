import React, { useState, useEffect, useRef } from "react";
import DropdownAlgo from "./DropdownAlgo";
import { useGlobalContext } from "./Context";
import "./../Styles/selectAlgo.css";
function SelectAlgo() {
  const { currentAlgo } = useGlobalContext();
  const [dropdown, setDropdown] = useState(false);
  const [x, setX] = useState(-1);
  const [y, setY] = useState(-1);
  const [height, setHeight] = useState(-1);
  const [width, setWidth] = useState(-1);

  const selectAlgoRef = useRef(null);
  const { windowSize } = useGlobalContext();
  const [size, setSize] = useState(windowSize);
  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  useEffect(() => {
    setDropdown(false);
  }, [currentAlgo]);

  const getCoordinates = () => {
    const temp = selectAlgoRef.current;
    if (temp) {
      setX(temp.getBoundingClientRect().x);
      setY(temp.getBoundingClientRect().y);
      setHeight(temp.getBoundingClientRect().height);
      setWidth(temp.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    setTimeout(getCoordinates, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", getCoordinates);
    return () => {
      window.removeEventListener("resize", getCoordinates);
    };
  });

  return (
    <div
      className="selectAlgo"
      ref={selectAlgoRef}
      onClick={() => setDropdown(!dropdown)}
    >
      {/* dropdown menu for selecting algorithm */}
      {dropdown && (
        <DropdownAlgo
          x={x}
          y={y}
          height={height}
          width={width}
          show={dropdown}
        />
      )}
      {/* button for selecting algorithms */}
      <li className="algo-btn">
        {currentAlgo || "Select ALgo"}
        <i className="fas fa-caret-down fa-2x"></i>
      </li>
    </div>
  );
}

export default SelectAlgo;
