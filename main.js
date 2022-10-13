const boardKnobs = document.querySelector(".knobs").childNodes;
const grids = document.querySelectorAll(".grid");
const blackBtn = document.querySelector(".tools-black");
const eraserBtn = document.querySelector(".tools-erase");

// Initialize
drawGrids();

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
    drawGrids();
  } else if (erasingMode) {
    eraseGrids();
  }
}

// Grid creation
function drawGrids() {
  grids.forEach((grid) => {
    grid.addEventListener("mouseover", () => {
      grid.classList.add("black");
    });
  });
}

function eraseGrids() {
  grids.forEach((grid) => {
    grid.addEventListener("mouseover", () => {
      grid.classList.remove("black");
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
