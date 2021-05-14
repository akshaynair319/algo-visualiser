export const getNeighboringVertices = (index, rows, cols) => {
  const myRow = Math.floor(index / cols);
  const myCol = Math.floor(index % cols);
  const dir = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  let notAllowed = [];
  for (let i = 0; i < dir.length; i++) {
    const newRow = myRow + dir[i][0];
    const newCol = myCol + dir[i][1];
    if (newRow >= 0 && newCol >= 0 && newRow < rows && newCol < cols) {
      notAllowed.push(newRow * cols + newCol);
    }
  }
  return notAllowed;
};
