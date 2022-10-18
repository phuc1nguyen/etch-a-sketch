const DEFAULT_SIZE = 5,
  MIN_SIZE = 2,
  MAX_SIZE = 100;
const COLORS = {
  black: {
    id: 1,
    button: document.querySelector(".tools-black"),
    value: "#000",
  },
  rainbow: {
    id: 2,
    name: "rainbow",
    button: document.querySelector(".tools-rainbow"),
    value: "",
  },
  white: {
    id: 3,
    button: document.querySelector(".tools-erase"),
    value: "#ededed",
  },
  red: {
    id: 4,
    button: document.querySelector(".tools-red"),
    value: "rgb(255, 0, 0)",
  },
  green: {
    id: 5,
    button: document.querySelector(".tools-green"),
    value: "rgb(0, 255, 0)",
  },
  blue: {
    id: 6,
    button: document.querySelector(".tools-blue"),
    value: "rgb(0, 0, 255)",
  },
};
const clearBtn = document.querySelector(".tools-clear");
const thisYear = new Date().getFullYear();
const grid = document.querySelector(".grid");
const boardKnobs = document.querySelector(".knobs").childNodes;
const sizeSlider = document.querySelector("#size-slider");
const displaySizeSpans = document.querySelectorAll(".grid-size");
let isMouseDown = false;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".footer-year").textContent = thisYear;
  sizeSlider.setAttribute("min", MIN_SIZE);
  sizeSlider.setAttribute("max", MAX_SIZE);
  displaySizeSpans.forEach((item) => (item.textContent = DEFAULT_SIZE));
  createGrid(DEFAULT_SIZE);
});

// Modes
for (const color in COLORS) {
  COLORS[color].button.addEventListener("click", switchMode);
}
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
  return COLORS.white.button.classList.contains("active");
}

function getDrawingColor() {
  for (const color in COLORS) {
    if (COLORS[color].button.classList.contains("active")) {
      return COLORS[color].value;
    }
    if (COLORS["rainbow"].button.classList.contains("active")) {
      return randomRgb();
    }
  }
  return null;
}

function randomRgb() {
  //https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
  const o = Math.round,
    r = Math.random,
    s = 255;

  return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
}

// Grid
function createGrid(gridSize) {
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < gridSize ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mousedown", (e) => {
      if (isErasingMode()) {
        e.target.style.backgroundColor = "";
      } else {
        e.target.style.backgroundColor = getDrawingColor();
      }
      isMouseDown = true;
    });
    cell.addEventListener("mouseup", () => (isMouseDown = false));
    cell.addEventListener("touchend", () => (isMouseDown = false));
    cell.addEventListener("mouseover", (e) => {
      if (isMouseDown && !isErasingMode()) {
        e.target.style.backgroundColor = getDrawingColor();
      }
      if (isMouseDown && isErasingMode()) {
        e.target.style.backgroundColor = "";
      }
    });
    grid.appendChild(cell);
  }
}

function clearGrid() {
  document.querySelectorAll(".cell").forEach((cell) => {
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

  if (isScrollinDown && e.target.value > MIN_SIZE) {
    e.target.value--;
    displayGridSize();
    changeGridSize();
  }

  if (isScrollingUp && e.target.value < MAX_SIZE) {
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
      COLORS.black.button.click();
      break;
    case "KeyW":
      COLORS.white.button.click();
      break;
    case "KeyR":
      COLORS.red.button.click();
      break;
    case "KeyG":
      COLORS.green.button.click();
      break;
    case "KeyB":
      COLORS.blue.button.click();
      break;
    case "KeyT":
      COLORS.rainbow.button.click();
      break;
    default:
      break;
  }
});
