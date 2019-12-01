let mineField = [];

// creates minefield and returns a global object
const generateMineField = amountRowsAndColumns => {
  let mineField = [];
  while (amountRowsAndColumns > mineField.length) {
    mineField.push([]);
  }

  mineField.forEach(row => {
    while (amountRowsAndColumns > row.length) {
      row.push("");
    }
  });

  return mineField;
};

// returns number between 0 and maxNum to be used as an array reference
const generateRandomNumber = maxNum => {
  return Math.floor(Math.random() * maxNum);
};

// returns number between 0 and maxNum. Input is negative numbers
const generateRandomNegativeNumber = maxNum => {
  return Math.ceil(Math.random() * maxNum);
};

// insert mines into field based on whether or not a mine already exists in that location
const generateMines = numOfMines => {
  while (numOfMines > 0) {
    let randomY = generateRandomNumber(mineField.length);
    let randomX = generateRandomNumber(mineField.length);
    if (!mineField[randomY][randomX]) {
      mineField[randomY].splice(randomX, 1, "X");
      numOfMines--;
    } else {
      null;
    }
  }
};

// inserts the rows of the field into the DOM
const insertRows = array => {
  let rows = "";
  array.forEach((row, index) => {
    rows += `<p id=row${index}></p>`;
  });
  document.getElementById("field").innerHTML = rows;
};

// insert each square into the field
const insertField = array => {
  insertRows(array);
  array.forEach((row, index) => {
    let line = "";
    row.forEach(square => {
      line += `<span>${square}</span>`;
    });
    document.getElementById(`row${index}`).innerHTML = line;
  });
};

// generates a random coordinate on the game field
const generateRandomCoord = coord => {
  let newCoord = coord + (generateRandomNumber(2) + generateRandomNegativeNumber(-2));
  if (newCoord === mineField.length) {
    newCoord = mineField.length - 1;
    return newCoord;
  } else if (newCoord === -1) {
    newCoord = 0;
    return newCoord;
  } else {
    return newCoord;
  }
};

// adds clues to the game field
const addClues = () => {
  mineField.forEach((row, yCoord) => {
    row.forEach((square, xCoord) => {
      if (square === "X") {
        for (y = Math.max(0, yCoord - 1); y <= Math.min(yCoord + 1, mineField.length - 1); y++) {
          for (x = Math.max(0, xCoord - 1); x <= Math.min(xCoord + 1, mineField[yCoord].length - 1); x++) {
            if (!mineField[y][x]) {
              mineField[y].splice(x, 1, 1);
            }
          }
        }
      }
    });
  });
};

// Loops through array, checks all neighbouring cells of clues and changed 1 to the appropriate number
const incrementClues = () => {
  mineField.forEach((row, yCoord) => {
    row.forEach((square, xCoord) => {
      if (square === 1) {
        let counter = 0;

        for (y = Math.max(0, yCoord - 1); y <= Math.min(yCoord + 1, mineField.length - 1); y++) {
          for (x = Math.max(0, xCoord - 1); x <= Math.min(xCoord + 1, mineField[yCoord].length - 1); x++) {
            if (mineField[y][x] === "X") {
              counter++;
            }
          }
        }

        mineField[yCoord].splice(xCoord, 1, counter);
      }
    });
  });
};

mineField = generateMineField(15);
generateMines(30);
addClues();
incrementClues();
insertField(mineField);
