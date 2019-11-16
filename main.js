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
    mineField.forEach((row, xCoord) => {
      row.forEach((square, yCoord) => {
        if (square === "X") {
          let randomX = generateRandomCoord(xCoord);
          randomX ? null : (randomX = 0);
          let randomY = generateRandomCoord(yCoord);
          randomY ? null : (randomY = 0);
          if (!mineField[randomX][randomY]) {
            mineField[randomX].splice(randomY, 1, 1);
            numOfClues--;
          }
        }
      });
    });
  }
};




mineField = generateMineField(15, 15);
// console.log(mineField);
const test = () => {
  mineField.forEach((row, xCoord) => {
    // let x = xCoord
    row.forEach((square, yCoord) => {
      // let randomX = generateRandomCoord(x)
      console.log(xCoord)
      console.log(yCoord)
      // return randomX
    })
  });
}
generateMines(30);
addClues(70);
insertField(mineField);
// console.log(generateRandomNumber(2) + generateRandomNegativeNumber(-2));
