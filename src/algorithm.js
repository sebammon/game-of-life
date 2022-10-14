export const countNeighbours = (grid, row, col) => {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      if (grid[row + i] && grid[row + i][col + j]) {
        count++;
      }
    }
  }

  return count;
};

export const determineNewState = (neighbourCount, currentState) => {
  if (currentState) {
    if (neighbourCount === 2 || neighbourCount === 3) {
      return 1;
    }
  }

  if (!currentState) {
    if (neighbourCount === 3) {
      return 1;
    }
  }

  return 0;
};

export const nextGeneration = (grid) => {
  const operations = [];

  grid.forEach((rows, i) => {
    rows.forEach((currentState, j) => {
      const neighbours = countNeighbours(grid, i, j);
      const newState = determineNewState(neighbours, currentState);

      if (newState !== currentState) {
        operations.push({ row: i, col: j, state: newState });
      }
    });
  });

  operations.forEach((op) => {
    grid[op.row][op.col] = op.state;
  });

  return grid;
};
