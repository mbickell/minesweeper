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
      row.push(0);
    }
  });

  return mineField;
};

// returns number between 0 and maxNum - 1 to be used as an array reference
const generateRandomNumber = maxNum => {
  return Math.floor(Math.random() * maxNum);
};

const generateRandomNegativeNumber = maxNum => {
  return Math.ceil(Math.random() * maxNum);
};

// insert mines into field based on whether or not a mine already exists in that location
const generateMines = numOfMines => {
  while (numOfMines > 0) {
    let randomX = generateRandomNumber(15);
    let randomY = generateRandomNumber(15);
    if (!mineField[randomX][randomY]) {
      mineField[randomX].splice(randomY, 1, "X");
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

const generateRandomCoord = coord => {
  let oldCoord = coord === undefined ? 0 : coord;
  let newCoord =
    coord + (generateRandomNumber(2) + generateRandomNegativeNumber(-2));
  if (newCoord === 15) {
    generateRandomCoord(oldCoord);
  } else if (newCoord === -1) {
    generateRandomCoord(oldCoord);
  } else {
    return newCoord;
  }
};
const addClues = numOfClues => {
  while (numOfClues > 0) {
    mineField.forEach((row, xCoord) => {
      row.forEach((square, yCoord) => {
        if (square === "X") {
          let randomX = generateRandomCoord(xCoord);
          randomX ? null : (randomX = 0);
          let randomY = generateRandomCoord(yCoord);
          randomY ? null : (randomY = 0);
          if (mineField[randomX][randomY] !== "X") {
            mineField[randomX].splice(randomY, 1, 1);
            numOfClues--;
          }
        }
      });
    });
  }
};

const incrementClues = () => {
  mineField.forEach((row, xCoord) => {
    row.forEach((square, yCoord) => {
      if (square === 1) {
        let counter = 0;

        let top;
        let topRight;
        let right;
        let bottomRight;
        let bottom;
        let bottomLeft;
        let left;
        let topLeft;

        !top ? (top = "b") : null;
        !topRight ? (topRight = "b") : null;
        !right ? (right = "b") : null;
        !bottomRight ? (bottomRight = "b") : null;
        !bottom ? (bottom = "b") : null;
        !bottomLeft ? (bottomLeft = "b") : null;
        !left ? (left = "b") : null;
        !topLeft ? (topLeft = "b") : null;

        top = mineField[xCoord][yCoord + 1];
        topRight = mineField[xCoord + 1][yCoord + 1];
        right = mineField[xCoord + 1][yCoord];
        bottomRight = mineField[xCoord + 1][yCoord - 1];
        bottom = mineField[xCoord][yCoord - 1];
        bottomLeft = mineField[xCoord - 1][yCoord - 1];
        left = mineField[xCoord - 1][yCoord];
        topLeft = mineField[xCoord - 1][yCoord + 1];

        top === "X" ? counter++ : null;
        topRight === "X" ? counter++ : null;
        right === "X" ? counter++ : null;
        bottomRight === "X" ? counter++ : null;
        bottom === "X" ? counter++ : null;
        bottomLeft === "X" ? counter++ : null;
        left === "X" ? counter++ : null;
        toLeft === "X" ? counter++ : null;
        mineField[xCoord].splice(yCoord, 1, counter);
      }
    });
  });
};

removeZeroes = () => {
  mineField.forEach((row, xCoord) => {
    row.forEach((square, yCoord) => {
      if (square === 0) {
        mineField[xCoord].splice([yCoord], 1, "-");
      }
    });
  });
};

mineField = generateMineField(15, 15);
// console.log(mineField);
generateMines(30);
addClues(70);
// incrementClues();
removeZeroes();
insertField(mineField);
// console.log(generateRandomNumber(2) + generateRandomNegativeNumber(-2));
