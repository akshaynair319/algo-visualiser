export const getInitialState = () => {
  const cols = 40;
  const rows = 17;
  const number_of_nodes = rows * cols;
  let nodes = new Array(number_of_nodes + 1)
    .join("0")
    .split("")
    .map(parseFloat);

  return {
    vertices: nodes,
    currentVertex: null,
    lock: false,
    edge: {
      //properties of the latest edge: from{x1,y1, node1} to{x2,y2,node2}
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1,
      node1: -1,
      node2: -1,
    },
    edges: [],
    adjList: [],
    last_actions: [],
    currentAlgo: "",
    startNode: -1,
    nodesDist: nodes.map((nodes) => 10000),
    size: 32,
  };
};
