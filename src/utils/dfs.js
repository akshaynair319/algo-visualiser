export const dfs = (startNode, vertices, adjList) => {
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

  return newVertices;
};
