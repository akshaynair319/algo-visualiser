import React, { useRef, useEffect } from "react";
import "../Styles/index.css";
import DrawEdges from "./DrawEdges";
import { useGlobalContext } from "./Context";

function Grid() {
  const {
    vertices,
    makeNode,
    currentVertex,
    updatePoints,
    nodesDist,
    currentAlgo,
  } = useGlobalContext();

  const activeNode = useRef(null);

  useEffect(() => {
    if (activeNode.current !== null && currentVertex !== null) {
      const myNode = activeNode.current.getBoundingClientRect();
      updatePoints(myNode.x, myNode.y);
    }
  }, [currentVertex]);

  return (
    <div className="grid-container">
      {vertices.map((node, index) => {
        const className = `${
          node >= 1
            ? node > 1 || nodesDist[index] !== 10000
              ? "visited"
              : "vertex"
            : "node"
        } ${currentVertex === index && "active"}`;
        const style = {
          // transitionDelay: `${node > 1 ? `${node - 1}s` : "0s"}`,
        };
        return (
          <div
            className={className}
            style={style}
            key={index}
            onClick={() => makeNode(index)}
            ref={currentVertex === index ? activeNode : null}
          >
            {currentAlgo === "dijktras" && nodesDist[index] !== 10000
              ? nodesDist[index]
              : ""}{" "}
            {node > 1 ? node - 1 : ""}
          </div>
        );
      })}
      <DrawEdges />
    </div>
  );
}

export default Grid;
