const DEFAULT_SIZE = 5;
const grid = document.querySelector(".grid");
const boardKnobs = document.querySelector(".knobs").childNodes;
const blackBtn = document.querySelector(".tools-black");
const eraserBtn = document.querySelector(".tools-erase");
const sizeSlider = document.querySelector("#size-slider");

// Initialize
createGrid(DEFAULT_SIZE);

// Modes
blackBtn.addEventListener("click", switchMode);
eraserBtn.addEventListener("click", switchMode);

function switchMode(e) {
  const thisBtn = e.target;
  const activeBtn = thisBtn.closest(".sketch-tools").querySelector(".active");

  if (!thisBtn.classList.contains("active")) {
    activeBtn.classList.remove("active");
    thisBtn.classList.add("active");
  }

  const drawingMode =
    blackBtn.classList.contains("active") &&
    !eraserBtn.classList.contains("active");
  const erasingMode =
    !blackBtn.classList.contains("active") &&
    eraserBtn.classList.contains("active");

  if (drawingMode) {
    drawCells();
  } else if (erasingMode) {
    eraseCells();
  }
}

// Grid
function createGrid(gridSize) {
  grid.style.gridTemplateColumns = `repeat(${gridSize}, minmax(10px, 1fr))`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, minmax(10px, 1fr))`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseover", (e) => {
      e.target.classList.add("black");
    });
    grid.appendChild(cell);
  }
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

// Knobs' animation
boardKnobs.forEach((knob) => {
  knob.addEventListener("mousedown", (e) => {
    e.target.classList.add("scale-11");
  });
  knob.addEventListener("mouseup", (e) => {
    e.target.classList.remove("scale-11");
  });
});
