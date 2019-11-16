let mineField = [];

// creates minefield and returns a global object
const generateMineField = (amountRows, amountColumns) => {
  let mineField = [];
  while (amountRows > 0) {
    mineField.push([]);
    amountRows--;
  }

  mineField.forEach(row => {
    while (amountColumns > row.length) {
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
    let randomY = generateRandomNumber(15);
    let randomX = generateRandomNumber(15);
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
  let newCoord =
    coord + (generateRandomNumber(2) + generateRandomNegativeNumber(-2));
  if (newCoord === 15) {
    newCoord = 14;
    return newCoord;
  } else if (newCoord === -1) {
    newCoord = 0;
    return newCoord;
  } else {
    return newCoord;
  }
};

// adds clues to the game field
const addClues = numOfClues => {
  while (numOfClues > 0) {
    mineField.forEach((row, yCoord) => {
      row.forEach((square, xCoord) => {
        if (square === "X") {
          let randomY = generateRandomCoord(yCoord);
          randomY ? null : (randomY = 0);
          let randomX = generateRandomCoord(xCoord);
          randomX ? null : (randomX = 0);
          if (!mineField[randomY][randomX]) {
            mineField[randomY].splice(randomX, 1, 1);
            numOfClues--;
          }
        }
      });
    });
  }
};

const getNeighbour = (array, currentY, yOffset, currentX, xOffset) => {
  return array[currentY + yOffset][currentX + xOffset] ? array[currentY + yOffset][currentX + xOffset] : 0
}

// Loops through array, checks all neighbouring cells of clues and changed 1 to the appropriate number
// This can definitely be written more concisely
const incrementClues = () => {
mineField.forEach((row, yCoord) => {
  row.forEach((square, xCoord) => {
    if(square === 1) {
      let counter = 0;
      let topLeft = (mineField[yCoord - 1]) ? getNeighbour(mineField, yCoord, -1, xCoord, -1) : 0;
      let top = (mineField[yCoord - 1]) ? (mineField[yCoord - 1][xCoord]) ? mineField[yCoord - 1][xCoord] : 0 : 0;
      let topRight = (mineField[yCoord - 1]) ? (mineField[yCoord - 1][xCoord + 1]) ? mineField[yCoord - 1][xCoord + 1] : 0 : 0;
      let right = (mineField[yCoord]) ? (mineField[yCoord][xCoord + 1]) ? mineField[yCoord][xCoord + 1] : 0 : 0;
      let bottomRight = (mineField[yCoord + 1]) ? (mineField[yCoord + 1][xCoord + 1]) ? mineField[yCoord + 1][xCoord + 1] : 0 : 0;
      let bottom = (mineField[yCoord + 1]) ? (mineField[yCoord + 1][xCoord]) ? mineField[yCoord + 1][xCoord] : 0 : 0;
      let bottomLeft = (mineField[yCoord + 1]) ? (mineField[yCoord + 1][xCoord - 1]) ? mineField[yCoord + 1][xCoord - 1] : 0 : 0;
      let left = (mineField[yCoord]) ? (mineField[yCoord][xCoord - 1]) ? mineField[yCoord][xCoord - 1] : 0 : 0;

      topLeft === "X" ? counter++ : null;
      top === "X" ? counter++ : null;
      topRight === "X" ? counter++ : null;
      right === "X" ? counter++ : null;
      bottomRight === "X" ? counter++ : null;
      bottom === "X" ? counter++ : null;
      bottomLeft === "X" ? counter++ : null;
      left === "X" ? counter++ : null;

      mineField[yCoord].splice(xCoord, 1, counter)
    }
  })
})
};



mineField = generateMineField(15, 15);
generateMines(30);
addClues(50);
incrementClues();
insertField(mineField);
