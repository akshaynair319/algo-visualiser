import React, { useState, useEffect } from "react";
import Edge from "./Edge";
import { useGlobalContext } from "./Context";

function DrawEdges() {
  const { adjList, windowSize } = useGlobalContext();
  const [size, setSize] = useState(windowSize);
  useEffect(() => {
    setSize(windowSize);
  }, [windowSize]);

  return (
    <div>
      {adjList.map((edge, index) => {
        return <Edge key={index} edge={edge} />;
      })}
    </div>
  );
}

export default DrawEdges;
