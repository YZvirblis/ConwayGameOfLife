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
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gridElement.appendChild(cell);
    }
  }
}

gridSizeInput.addEventListener("change", (event) => {
  gridSize = parseInt(event.target.value);
  createGrid(gridSize);
});

createGrid(gridSize);
