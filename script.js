// Scrabble tile distribution and values
const tileBag = [
  { letter: "E", value: 1, count: 12 },
  { letter: "A", value: 1, count: 9 },
  { letter: "I", value: 1, count: 9 },
  { letter: "O", value: 1, count: 8 },
  { letter: "N", value: 1, count: 6 },
  { letter: "R", value: 1, count: 6 },
  { letter: "T", value: 1, count: 6 },
  { letter: "L", value: 1, count: 4 },
  { letter: "S", value: 1, count: 4 },
  { letter: "U", value: 1, count: 4 },
  { letter: "D", value: 2, count: 4 },
  { letter: "G", value: 2, count: 3 },
  { letter: "B", value: 3, count: 2 },
  { letter: "C", value: 3, count: 2 },
  { letter: "M", value: 3, count: 2 },
  { letter: "P", value: 3, count: 2 },
  { letter: "F", value: 4, count: 2 },
  { letter: "H", value: 4, count: 2 },
  { letter: "V", value: 4, count: 2 },
  { letter: "W", value: 4, count: 2 },
  { letter: "Y", value: 4, count: 2 },
  { letter: "K", value: 5, count: 1 },
  { letter: "J", value: 8, count: 1 },
  { letter: "X", value: 8, count: 1 },
  { letter: "Q", value: 10, count: 1 },
  { letter: "Z", value: 10, count: 1 },
  { letter: " ", value: 0, count: 2 },
];

let fullTileBag = [];
tileBag.forEach((tile) => {
  for (let i = 0; i < tile.count; i++) {
    fullTileBag.push({ letter: tile.letter, value: tile.value });
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateTileRack() {
  shuffle(fullTileBag);
  return fullTileBag.slice(0, 7);
}

function displayTileRack() {
  const tileRackDiv = document.getElementById("tile-rack");
  tileRackDiv.innerHTML = "";

  const tileRack = generateTileRack();

  tileRack.forEach((tile) => {
    const tileDiv = document.createElement("div");
    tileDiv.classList.add("tile");
    tileDiv.textContent = tile.letter;

    const tileValueDiv = document.createElement("div");
    tileValueDiv.classList.add("tile-value");
    tileValueDiv.textContent = tile.value;

    tileDiv.setAttribute("draggable", true);
    tileDiv.addEventListener("dragstart", dragStart);
    tileDiv.addEventListener("dragend", dragEnd);

    tileDiv.appendChild(tileValueDiv);
    tileRackDiv.appendChild(tileDiv);
  });
}

let draggingTile = null;

function dragStart(e) {
  draggingTile = this;
  this.classList.add("dragging");
}

function dragEnd() {
  this.classList.remove("dragging");
}

const tileRackDiv = document.getElementById("tile-rack");
tileRackDiv.addEventListener("dragover", (e) => {
  e.preventDefault();
});

tileRackDiv.addEventListener("drop", (e) => {
  e.preventDefault();
  if (draggingTile) {
    const tiles = Array.from(tileRackDiv.children);
    const draggingIndex = tiles.indexOf(draggingTile);
    const dropIndex = tiles.length;

    tileRackDiv.insertBefore(draggingTile, tiles[dropIndex]);

    const targetTile = e.target.closest(".tile");
    if (targetTile && targetTile !== draggingTile) {
      tileRackDiv.insertBefore(draggingTile, targetTile);
    }

    draggingTile = null;
  }
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const darkModeBtn = document.getElementById("dark-mode-btn");

  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "Light Mode";
  } else {
    darkModeBtn.textContent = "Dark Mode";
  }
}

function toggleTileLazy() {
  document.body.classList.toggle("tile-lazy");
  const tileModeBtn = document.getElementById("th-btn");

  if (document.body.classList.contains("tile-lazy")) {
    tileModeBtn.textContent = "Default";
  } else {
    tileModeBtn.textContent = "Lazy";
  }
}

document
  .getElementById("dark-mode-btn")
  .addEventListener("click", toggleDarkMode);
document.getElementById("th-btn").addEventListener("click", toggleTileLazy);
document
  .getElementById("generate-btn")
  .addEventListener("click", displayTileRack);

displayTileRack();
