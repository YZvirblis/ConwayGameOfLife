let gridSize = 15; // Ensure the grid is large enough for patterns
let grid = [];
let interval;
const gridElement = document.getElementById("grid");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const stepButton = document.getElementById("step");
const gridSizeInput = document.getElementById("grid-size");
const patternSelect = document.getElementById("pattern-select");
const randomPatternButton = document.getElementById("random-pattern");

// Predefined patterns
const patterns = {
  glider: [
    [1, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  blinker: [[1, 1, 1]],
  toad: [
    [0, 1, 1, 1],
    [1, 1, 1, 0],
  ],
  beacon: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
  ],
  pulsar: [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
  ],
  pentadecathlon: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
};

function createGrid(size) {
  gridElement.innerHTML = "";
  gridElement.style.gridTemplateColumns = `repeat(${size}, 20px)`;
  gridElement.style.gridTemplateRows = `repeat(${size}, 20px)`;
  grid = [];
  for (let row = 0; row < size; row++) {
    const rowArr = [];
    for (let col = 0; col < size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => toggleCellState(row, col));
      gridElement.appendChild(cell);
      rowArr.push(false);
    }
    grid.push(rowArr);
  }
}

function toggleCellState(row, col) {
  grid[row][col] = !grid[row][col];
  updateGrid();
}

function updateGrid() {
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = gridElement.children[rowIndex * gridSize + colIndex];
      if (cell) {
        cellElement.classList.add("alive");
      } else {
        cellElement.classList.remove("alive");
      }
    });
  });
}

function nextGeneration() {
  const newGrid = grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const aliveNeighbors = countAliveNeighbors(rowIndex, colIndex);
      if (cell && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
        return true;
      } else if (!cell && aliveNeighbors === 3) {
        return true;
      } else {
        return false;
      }
    })
  );
  grid = newGrid;
  updateGrid();
}

function countAliveNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (
        newRow >= 0 &&
        newRow < gridSize &&
        newCol >= 0 &&
        newCol < gridSize &&
        grid[newRow][newCol]
      ) {
        count++;
      }
    }
  }
  return count;
}

function applyPattern(pattern) {
  createGrid(gridSize);
  const offsetRow = Math.floor(gridSize / 2 - pattern.length / 2);
  const offsetCol = Math.floor(gridSize / 2 - pattern[0].length / 2);
  pattern.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        grid[offsetRow + rowIndex][offsetCol + colIndex] = true;
      }
    });
  });
  updateGrid();
}

function applyRandomPattern() {
  createGrid(gridSize);
  grid.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      grid[rowIndex][colIndex] = Math.random() > 0.7; // Adjust probability as needed
    });
  });
  updateGrid();
}

startButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(nextGeneration, 100);
});

stopButton.addEventListener("click", () => {
  clearInterval(interval);
});

resetButton.addEventListener("click", () => {
  createGrid(gridSize);
});

stepButton.addEventListener("click", () => {
  nextGeneration();
});

gridSizeInput.addEventListener("change", (event) => {
  gridSize = parseInt(event.target.value);
  createGrid(gridSize);
});

patternSelect.addEventListener("change", (event) => {
  const selectedPattern = event.target.value;
  if (selectedPattern && patterns[selectedPattern]) {
    applyPattern(patterns[selectedPattern]);
  }
});

randomPatternButton.addEventListener("click", applyRandomPattern);

createGrid(gridSize);
