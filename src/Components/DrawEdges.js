import React, { useState, useEffect } from "react";
import Edge from "./Edge";
import { useGlobalContext } from "./Context";

function DrawEdges() {
  const { adjList } = useGlobalContext();
  const [size, setSize] = useState(window.innerWidth);

  const changeSize = () => {
    setSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", changeSize);
    return () => {
      window.removeEventListener("resize", changeSize);
    };
  });
  return (
    <div>
      {adjList.map((edge, index) => {
        return <Edge key={index} edge={edge} />;
      })}
    </div>
  );
}

export default DrawEdges;
