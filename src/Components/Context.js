import React, { useState, useContext } from "react";
const AppContext = React.createContext();

// making initial nodes array: all entries are 0
const size = 32;
const cols = 40;
const rows = 17;
const number_of_nodes = rows * cols;
let nodes = new Array(number_of_nodes + 1).join("0").split("").map(parseFloat);

export const AppProvider = ({ children }) => {
  const [vertices, setVertices] = useState(nodes); //keeps track of which nodes are vertices and which are not
  const [currentVertex, setCurrentVertex] = useState(null); //current vertex clicked on board
  const [verticesAdded, setVerticesAdded] = useState(0); //number of nodes added
  const [edgesAdded, setEdgesAdded] = useState(0); //number of edges added
  const [edge, setEdge] = useState({
    //properties of the latest edge: from{x1,y1, node1} to{x2,y2,node2}
    x1: -1,
    x2: -1,
    y1: -1,
    y2: -1,
    node1: -1,
    node2: -1,
  });
  const [edges, setEdges] = useState([]); //properties of all edges, array of edge(as defined above)
  const [adjList, setAjdList] = useState([]); //adjacency list of edges, multi-dimensional array of size: number of edges x 2
  const [currentAlgo, setCurrentAlgo] = useState(""); //current selected algo to run
  const [startNode, setStartNode] = useState(-1); //node at which the algorithm starts
  const [nodesDist, setNodesDist] = useState(nodes.map((nodes) => 10000));
  //function for clearing the board
  const clearAll = () => {
    setVertices(nodes);
    setEdges([]);
    setEdge({
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1,
      node1: -1,
      node2: -1,
      weight: -1,
    });
    setCurrentVertex(null);
    setEdgesAdded(0);
    setVerticesAdded(0);
    setStartNode(-1);
    setCurrentAlgo("");
    setAjdList([]);
    setNodesDist(nodes.map((nodes) => 10000));
  };

  //function for clearing the progress of the algorithm
  const refresh = () => {
    setEdge({
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1,
      node1: -1,
      node2: -1,
      weight: -1,
    });
    setCurrentVertex(null);
    setCurrentAlgo("");
    setVertices(
      vertices.map((item) => {
        if (item >= 1) return 1;
        return 0;
      })
    );
    setNodesDist(nodes.map((nodes) => 10000));
  };

  const updatePoints = (width, height) => {
    //ignore if currently doing graph traversal
    if (currentAlgo !== "") return;

    console.log(width, height);

    //maybe this vertex is part of an edge
    if (edge.x1 !== -1) {
      //found an edge
      const edgeWeight = Math.floor(Math.random() * 10 + 1);
      setAjdList([...adjList, [edge.node1, currentVertex, edgeWeight]]);
      setEdges([
        ...edges,
        {
          ...edge,
          x2: width,
          y2: height,
          node2: currentVertex,
          weight: edgeWeight,
        },
      ]);
      setEdge({
        x1: -1,
        x2: -1,
        y1: -1,
        y2: -1,
        node1: -1,
        node2: -1,
        weight: -1,
      });
      setEdgesAdded(edgesAdded + 1);
      setCurrentVertex(null);
    } else {
      //maybe this is the first node of an edge
      setEdge({ ...edge, x1: width, y1: height, node1: currentVertex });
    }
  };

  //handles the event when we click on a cell
  const makeNode = (index) => {
    //if an algorithm is running ignore clicks
    if (currentAlgo !== "") {
      return;
    }
    //check if user clicked on a vertex twice
    if (index === edge.node1) {
      //deactivate edge making process
      setCurrentVertex(null);
      setEdge({ x1: -1, x2: -1, y1: -1, y2: -1, node1: -1, node2: -1 });
      return;
    }
    //set this node as the current node

    //if this node was already an vertex
    if (vertices[index] === 1) {
      setCurrentVertex(index);
      return;
    }

    //this node is a new vertex
    setCurrentVertex(null);
    setVerticesAdded(verticesAdded + 1);
    setStartNode(index); //this makes us start the algo from the latest added vertex
    setEdge({
      x1: -1,
      x2: -1,
      y1: -1,
      y2: -1,
      node1: -1,
      node2: -1,
      weight: -1,
    });
    setVertices(
      vertices.map((vertex, idx) => {
        if (index === idx) {
          return 1;
        }
        return vertex;
      })
    );
  };

  //changes algorithm
  const changeAlgo = (algo) => {
    refresh();
    if (algo === currentAlgo) setCurrentAlgo("");
    else setCurrentAlgo(algo);
  };

  const doBFS = () => {
    let queue = [startNode];
    let newVertices = JSON.parse(JSON.stringify(vertices));

    let iteration = 2;
    while (queue.length !== 0) {
      const len = queue.length;
      let j = 0;
      while (j < len) {
        const index = queue[0];
        queue.shift();
        if (newVertices[index] > 1) {
          j++;
          continue;
        }
        newVertices[index] = iteration;

        for (let i = 0; i < adjList.length; i++) {
          if (adjList[i][0] === index && newVertices[adjList[i][1]] === 1) {
            queue.push(adjList[i][1]);
          }
          if (adjList[i][1] === index && newVertices[adjList[i][0]] === 1) {
            queue.push(adjList[i][0]);
          }
        }
        j++;
      }
      iteration++;
    }

    setVertices(newVertices);
  };

  const doDFS = () => {
    let stack = [startNode];
    let newVertices = JSON.parse(JSON.stringify(vertices));

    let iteration = 2;
    while (stack.length !== 0) {
      const index = stack[stack.length - 1];
      stack.pop();
      if (newVertices[index] > 1) {
        continue;
      }
      newVertices[index] = iteration;

      for (let i = 0; i < adjList.length; i++) {
        if (adjList[i][0] === index && newVertices[adjList[i][1]] === 1) {
          stack.push(adjList[i][1]);
        }
        if (adjList[i][1] === index && newVertices[adjList[i][0]] === 1) {
          stack.push(adjList[i][0]);
        }
      }
      iteration++;
    }

    setVertices(newVertices);
  };

  const doDIJKTRAS = () => {
    let pq = [[startNode, 0]];
    let newNodesDist = JSON.parse(JSON.stringify(nodesDist));
    newNodesDist[startNode] = 0;

    while (pq.length !== 0) {
      //go through the queue and find the element with the lowest dist from startNode
      let dist = pq[0][1];
      let index = 0;
      for (let i = 1; i < pq.length; i++) {
        if (pq[i][1] < dist) {
          dist = pq[i][1];
          index = i;
        }
      }
      const vertex = pq[index][0];
      pq = pq.filter((node) => node[0] !== vertex);

      if (newNodesDist[vertex] < dist) continue; //check if there is already a better version of the element in queue
      for (let i = 0; i < adjList.length; i++) {
        if (
          adjList[i][0] === vertex &&
          newNodesDist[vertex] + adjList[i][2] < newNodesDist[adjList[i][1]]
        ) {
          newNodesDist[adjList[i][1]] = newNodesDist[vertex] + adjList[i][2];
          pq.push([adjList[i][1], newNodesDist[vertex] + adjList[i][2]]);
        }
        if (
          adjList[i][1] === vertex &&
          newNodesDist[vertex] + adjList[i][2] < newNodesDist[adjList[i][0]]
        ) {
          newNodesDist[adjList[i][0]] = newNodesDist[vertex] + adjList[i][2];
          pq.push([adjList[i][0], newNodesDist[vertex] + adjList[i][2]]);
        }
      }
    }
    setNodesDist(newNodesDist);
    console.log("dijktras ended");
  };
  const startVisualisation = () => {
    if (currentAlgo === "") return;
    if (currentAlgo === "bfs") doBFS();
    if (currentAlgo === "dfs") doDFS();
    if (currentAlgo === "dijktras") doDIJKTRAS();
  };
  return (
    <AppContext.Provider
      value={{
        vertices,
        currentVertex,
        size,
        verticesAdded,
        edgesAdded,
        edges,
        currentAlgo,
        startNode,
        nodesDist,
        clearAll,
        makeNode,
        updatePoints,
        changeAlgo,
        refresh,
        startVisualisation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
