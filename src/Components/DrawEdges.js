import React from "react";
import Edge from "./Edge";
import { useGlobalContext } from "./Context";

function DrawEdges() {
  const { edges } = useGlobalContext();
  return (
    <div>
      {edges.map((edge, index) => {
        return <Edge key={index} edge={edge} />;
      })}
    </div>
  );
}

export default DrawEdges;
