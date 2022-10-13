const grid = document.querySelector(".grid");
const boardKnobs = document.querySelector(".knobs").childNodes;
const blackBtn = document.querySelector(".tools-black");
const eraserBtn = document.querySelector(".tools-erase");

// Initialize
createGrid(5);

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

// Grid creation
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

// Knobs' animation
boardKnobs.forEach((knob) => {
  knob.addEventListener("mousedown", (e) => {
    e.target.classList.add("scale-11");
  });
  knob.addEventListener("mouseup", (e) => {
    e.target.classList.remove("scale-11");
  });
});
