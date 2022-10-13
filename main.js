const knobs = document.querySelector(".knobs").childNodes;

knobs.forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    e.target.classList.add("scale");
  });
  item.addEventListener("mouseup", (e) => {
    e.target.classList.remove("scale");
  });
});
