const DEFAULT_SIZE = 5;
const MIN_SIZE = 2;
const MAX_SIZE = 100;
const thisYear = new Date().getFullYear();
const grid = document.querySelector(".grid");
const boardKnobs = document.querySelector(".knobs").childNodes;
const blackBtn = document.querySelector(".tools-black");
const rainbowBtn = document.querySelector(".tools-rainbow");
const eraserBtn = document.querySelector(".tools-erase");
const redBtn = document.querySelector(".tools-red");
const greenBtn = document.querySelector(".tools-green");
const blueBtn = document.querySelector(".tools-blue");
const clearBtn = document.querySelector(".tools-clear");
const colorBtns = document.querySelectorAll(".btn");
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
colorBtns.forEach((btn, index, btnArr) => {
  if (index !== btnArr.length - 1) {
    btn.addEventListener("click", switchMode);
  }
});
clearBtn.addEventListener("click", clearGrid);

function switchMode(e) {
  const thisBtn = e.target;
  const activeBtn = thisBtn.closest(".sketch-tools").querySelector(".active");

  if (!thisBtn.classList.contains("active")) {
    activeBtn.classList.remove("active");
    thisBtn.classList.add("active");
  }
}

function isErasingMode() {
  return eraserBtn.classList.contains("active");
}

function randomRgb() {
  //https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
  const o = Math.round,
    r = Math.random,
    s = 255;

  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
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
      if (isErasingMode()) {
        e.target.style.backgroundColor = "";
      } else {
        e.target.style.backgroundColor =
          document.querySelector(".active").dataset.color;
      }
      isMouseDown = true;
    });
    cell.addEventListener("mouseup", () => (isMouseDown = false));
    cell.addEventListener("touchend", () => (isMouseDown = false));
    cell.addEventListener("mouseover", (e) => {
      if (isMouseDown && !isErasingMode())
        e.target.style.backgroundColor =
          document.querySelector(".active").dataset.color;
      if (isMouseDown && isErasingMode()) e.target.style.backgroundColor = "";
    });
    grid.appendChild(cell);
  }
}

function clearGrid() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    if (cell.style.backgroundColor) cell.style.backgroundColor = "";
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
    case "Escape":
      clearBtn.click();
      break;
    case "KeyD":
      blackBtn.click();
      break;
    case "KeyR":
      redBtn.click();
      break;
    case "KeyG":
      greenBtn.click();
      break;
    case "KeyB":
      blueBtn.click();
      break;
    case "KeyE":
      eraserBtn.click();
      break;
    case "KeyT":
      rainbowBtn.click();
      break;
    default:
      break;
  }
});
