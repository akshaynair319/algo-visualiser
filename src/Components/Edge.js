import React from "react";
import { useGlobalContext } from "./Context";
import "../Styles/edge.css";

function Edge({ edge }) {
  const { x1, x2, y1, y2, weight } = edge;
  const { size, currentAlgo } = useGlobalContext();
  if (x1 === -1) {
    return <></>;
  }
  const angle = (Math.atan((y2 - y1) / (x2 - x1)) * 180) / Math.PI;
  const dist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const style = {
    width: `${dist}px`,
    top: `${midY + size / 2}px`,
    left: `${midX - dist / 2 + size / 2}px`,
    transform: `rotate(${angle}deg)`,
  };

  return (
    <div className="edge" style={style}>
      {currentAlgo === "dijktras" && weight}
    </div>
  );
}

export default Edge;
