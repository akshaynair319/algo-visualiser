export const dijktras = (startNode, nodesDist, adjList) => {
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
  return newNodesDist;
};
