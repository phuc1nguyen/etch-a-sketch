const DEFAULT_SIZE = 5;
const year = new Date().getFullYear();
const grid = document.querySelector(".grid");
const boardKnobs = document.querySelector(".knobs").childNodes;
const blackBtn = document.querySelector(".tools-black");
const eraserBtn = document.querySelector(".tools-erase");
const clearBtn = document.querySelector(".tools-clear");
const sizeSlider = document.querySelector("#size-slider");

// Initialize
document.querySelector(".footer-year").textContent = year;
createGrid(DEFAULT_SIZE);

// Modes
blackBtn.addEventListener("click", switchMode);
eraserBtn.addEventListener("click", switchMode);
clearBtn.addEventListener("click", clearGrid);

function switchMode(e) {
  const thisBtn = e.target;
  const activeBtn = thisBtn.closest(".sketch-tools").querySelector(".active");

  if (!thisBtn.classList.contains("active")) {
    activeBtn.classList.remove("active");
    thisBtn.classList.add("active");
  }

  if (checkDrawingMode()) {
    drawCells();
  } else {
    eraseCells();
  }
}

function checkDrawingMode() {
  const drawingMode =
    blackBtn.classList.contains("active") &&
    !eraserBtn.classList.contains("active");
  // const erasingMode =
  //   !blackBtn.classList.contains("active") &&
  //   eraserBtn.classList.contains("active");

  return drawingMode;
}

// Grid
function createGrid(gridSize) {
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (checkDrawingMode()) {
      cell.addEventListener("mouseover", (e) => {
        e.target.classList.add("black");
      });
    }
    grid.appendChild(cell);
  }
}

function clearGrid() {
  const activeCells = document.querySelectorAll(".black");
  activeCells.forEach((item) => {
    item.classList.remove("black");
  });
}

function destroyGrid() {
  grid.innerHTML = "";
}

function changeGridSize(e) {
  const gridSize = +e.target.value;
  console.log(typeof gridSize);
  destroyGrid();
  createGrid(gridSize);
}

function drawCells() {
  document.querySelectorAll(".cell").forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.classList.add("black");
    });
  });
}

function eraseCells() {
  document.querySelectorAll(".cell").forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.classList.remove("black");
    });
  });
}

// Size slider
function displayGridSize(e) {
  document.querySelectorAll(".grid-size").forEach((item) => {
    item.textContent = e.target.value;
  });
}

// https://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging
sizeSlider.addEventListener("input", displayGridSize);
sizeSlider.addEventListener("change", changeGridSize);

// Knobs' animation
boardKnobs.forEach((knob) => {
  knob.addEventListener("mousedown", (e) => {
    e.target.classList.add("scale-11");
  });
  knob.addEventListener("mouseup", (e) => {
    e.target.classList.remove("scale-11");
  });
});
