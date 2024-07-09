let gridSize = 20;
let grid = [];
let interval;
const gridElement = document.getElementById("grid");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const stepButton = document.getElementById("step");
const gridSizeInput = document.getElementById("grid-size");

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

gridSizeInput.addEventListener("change", (event) => {
  gridSize = parseInt(event.target.value);
  createGrid(gridSize);
});

createGrid(gridSize);
