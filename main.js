const generateInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min) + min);
};

const generateGrid = (rows, cols) => {
  const grid = [];

  while (grid.length < rows) {
    grid.push(new Array(cols).fill(0));
  }

  return grid;
};

const placeMines = (noOfMines, grid) => {
  while (true) {
    const xCoord = generateInteger(0, grid.length - 1);
    const yCoord = generateInteger(0, grid[0].length - 1);

    if (grid[xCoord][yCoord] === "X") continue;

    grid[xCoord][yCoord] = "X";
    noOfMines--;
    if (noOfMines <= 0) break;
  }

  return grid;
};

const checkSurroundingCells = (grid, xCoord, yCoord) => {
  for (let xChange = -1; xChange <= 1; xChange++) {
    for (let yChange = -1; yChange <= 1; yChange++) {
      if (grid[xCoord + xChange] !== undefined && typeof grid[xCoord + xChange][yCoord + yChange] === "number") {
        grid[xCoord + xChange][yCoord + yChange]++;
      }
    }
  }
};

const placeClues = (grid) => {
  grid.forEach((row, xCoord) => {
    row.forEach((cell, yCoord) => {
      if (cell === "X") {
        checkSurroundingCells(grid, xCoord, yCoord);
      }
    });
  });

  return grid;
};

const renderMineField = (grid) => {
  const field = document.querySelector("#field");
  grid.forEach((row, xCoord) => {
    field.innerHTML += `<div id="row-${xCoord}" ></div>`;
    row.forEach((cell, yCoord) => {
      const row = document.querySelector(`#row-${xCoord}`);
      row.innerHTML += `<span id="row-${xCoord}-column-${yCoord}">${cell ? cell : ""}</span>`;
    });
  });
};

const colourClues = (rows, cols) => {
  for (let xCoord = 0; xCoord < rows; xCoord++) {
    for (let yCoord = 0; yCoord < cols; yCoord++) {
      const clue = document.querySelector(`#row-${xCoord}-column-${yCoord}`);
      switch (clue.innerHTML) {
        case "1":
          clue.style.color = "blue";
          break;
        case "2":
          clue.style.color = "green";
          break;
        case "3":
          clue.style.color = "red";
          break;
        case "4":
          clue.style.color = "purple";
          break;
        case "5":
          clue.style.color = "darkGoldenRod";
          break;
        case "6":
          clue.style.color = "pink";
          break;
        case "7":
          clue.style.color = "brown";
          break;
        case "8":
          clue.style.color = "orange";
          break;
        // case "X":
        //   // clue.style.color = "lightGrey";
        //   // clue.style.color = "white";
        //   break;
        case "":
          clue.style.backgroundColor = "lightGrey";
          break;
      }
    }
  }
};

const init = (noOfMines, rows, cols) => {
  console.time("init");
  const emptyGrid = generateGrid(rows, cols);
  const gridWithMines = placeMines(noOfMines, emptyGrid);
  const gridWithClues = placeClues(gridWithMines);
  renderMineField(gridWithClues);
  colourClues(rows, cols);
  console.timeEnd("init");
};

init(30, 15, 15);

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const rows = parseInt(document.querySelector("#rows").value);
  const columns = parseInt(document.querySelector("#columns").value);
  const mines = parseInt(document.querySelector("#mines").value);

  if (mines > rows * columns) {
    alert(`Maximum number of mines is rows x colums: ${rows * columns}`);
    return;
  }

  document.querySelector("#field").innerHTML = "";
  init(mines, rows, columns);
});
