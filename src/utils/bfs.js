export const bfs = (startNode, vertices, adjList) => {
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

  return newVertices;
};
