export const getInitialState = () => {
  const size = 32;
  const windowSize = window.innerWidth;
  const cols = Math.floor(window.screen.width / size) - 1;
  const rows = Math.floor(window.screen.height / size) - 4;
  const number_of_nodes = rows * cols;
  let nodes = new Array(number_of_nodes + 1)
    .join("0")
    .split("")
    .map(parseFloat);

  return {
    size: size,
    windowSize: windowSize,
    cols: cols,
    rows: rows,
    vertices: nodes,
    currentVertex: null,
    lock: false,
    edge: {
      //properties of the latest edge: from{x1,y1, node1} to{x2,y2,node2}
      node1: -1,
      node2: -1,
      weight: -1,
    },
    adjList: [],
    last_actions: [],
    currentAlgo: "",
    startNode: -1,
    nodesDist: nodes.map((nodes) => 10000),
  };
};
