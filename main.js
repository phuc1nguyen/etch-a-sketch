const DEFAULT_SIZE = 5;
const MIN_SIZE = 2;
const MAX_SIZE = 100;
const thisYear = new Date().getFullYear();
const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cells");
const boardKnobs = document.querySelector(".knobs").childNodes;
const blackBtn = document.querySelector(".tools-black");
const eraserBtn = document.querySelector(".tools-erase");
const clearBtn = document.querySelector(".tools-clear");
const sizeSlider = document.querySelector("#size-slider");
const displaySizeSpans = document.querySelectorAll(".grid-size");
let isMouseDown = false;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".footer-year").textContent = thisYear;
  sizeSlider.setAttribute("min", MIN_SIZE);
  sizeSlider.setAttribute("max", MAX_SIZE);
  displaySizeSpans.forEach((item) => {
    item.textContent = DEFAULT_SIZE;
  });
  createGrid(DEFAULT_SIZE);
});

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
}

function isDrawingMode() {
  const drawingMode =
    blackBtn.classList.contains("active") &&
    !eraserBtn.classList.contains("active");

  return drawingMode;
}

// Grid
function createGrid(gridSize) {
  const size = parseInt(gridSize);

  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < size ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mousedown", (e) => {
      if (isDrawingMode()) {
        e.target.classList.add("black");
      } else {
        e.target.classList.remove("black");
      }
      isMouseDown = true;
    });
    cell.addEventListener("mouseup", () => (isMouseDown = false));
    cell.addEventListener("touchend", () => (isMouseDown = false));
    cell.addEventListener("mouseover", (e) => {
      if (isMouseDown && isDrawingMode()) e.target.classList.add("black");
      if (isMouseDown && !isDrawingMode()) e.target.classList.remove("black");
    });
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

function changeGridSize() {
  const gridSize = sizeSlider.value;
  destroyGrid();
  createGrid(gridSize);
}

function drawCells() {
  cells.forEach((cell) => {
    cell.addEventListener("mousedown", (e) => {
      if (isDrawingMode()) {
        e.target.classList.add("black");
      } else {
        e.target.classList.remove("black");
      }
      isMouseDown = true;
    });
    cell.addEventListener("mouseup", () => (isMouseDown = false));
    cell.addEventListener("mouseover", (e) => {
      if (isMouseDown && isDrawingMode()) e.target.classList.add("black");
      if (isMouseDown && !isDrawingMode()) e.target.classList.remove("black");
    });
  });
}

// Size slider
sizeSlider.addEventListener("wheel", (e) => {
  //https://stackoverflow.com/questions/67651894/how-do-i-change-the-value-of-a-range-input-by-user-scroll
  const isScrollinDown = e.deltaY > 0;
  const isScrollingUp = e.deltaY < 0;

  if (isScrollinDown && +e.target.value > MIN_SIZE) {
    e.target.value--;
    displayGridSize();
    changeGridSize();
  }

  if (isScrollingUp && +e.target.value < MAX_SIZE) {
    e.target.value++;
    displayGridSize();
    changeGridSize();
  }
});

function displayGridSize() {
  document.querySelectorAll(".grid-size").forEach((item) => {
    item.textContent = sizeSlider.value;
  });
}

//https://stackoverflow.com/questions/18544890/onchange-event-on-input-type-range-is-not-triggering-in-firefox-while-dragging
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

// Keyboard support
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      clearBtn.click();
      break;
    case "KeyB":
      blackBtn.click();
      break;
    case "KeyW":
      eraserBtn.click();
      break;
    default:
      break;
  }
});
