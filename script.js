class Board {
  constructor(n_square) {
    this.n_square = n_square;
    this.fields = [];
  }

  initFields() {
    // Creating fields
    let emptySquareNumber = getRandomInt(1, this.n_square);
    for (let i = 0; i < this.n_square; i++) {
      for (let k = 1; k < this.n_square + 1; k++) {
        const number = i * this.n_square + k;
        const type = number == emptySquareNumber ? "empty" : "regular";
        const field = new Field(number, type, i, k - 1);

        // Last field
        if (number == this.n_square * this.n_square) {
          break;
        }

        this.fields.push(field);

        // Empty field
        if (type == "empty") {
          k--;
          emptySquareNumber = -1;
        }
      }
    }

    // Randomize fields
    this.fields = this.fields.sort(() => Math.random() - 0.5);
    this.fields.forEach((field, index) => {
      const x = Math.floor(index % this.n_square);
      const y = Math.floor(index / this.n_square);
      field.x = x;
      field.y = y;
    });
  }

  showFields() {
    const gameBoard = document.getElementById("game-board");
    while (gameBoard.lastChild) {
      gameBoard.removeChild(gameBoard.lastChild);
    }

    this.fields = this.fields.sort((a, b) => {
      return a.x - b.x || a.y - b.y;
    });
    console.log(this.fields);
    this.fields.forEach((field) => {
      const fieldNode = document.createElement("div");

      // Style
      fieldNode.innerHTML = field.type == "empty" ? "" : field.number;
      fieldNode.classList.add(`${field.type}-field`);
      fieldNode.style.width = `${100 / this.n_square - 2}%`;
      fieldNode.style.height = `${100 / this.n_square - 2}%`;

      // Events
      if (field.type == "regular") {
        fieldNode.addEventListener("click", field.chooseField);
      } else {
        fieldNode.addEventListener("click", field.replace);
      }

      htmlBoard.appendChild(fieldNode);
    });
  }
}

class Field {
  constructor(number, type, x, y) {
    this.number = number;
    this.type = type;
    this.x = x;
    this.y = y;
  }

  chooseField() {
    const fields = document.querySelectorAll(".regular-field, .chosen-field");
    fields.forEach((field) => {
      field.classList.replace("chosen-field", "regular-field");
    });

    if (this.classList.contains("empty-field")) {
      return;
    }

    this.classList.replace("regular-field", "chosen-field");

    // const id = this.innerHTML;
    // let chosenField;

    // board.fields.forEach((field, index) => {
    //   if (field.number == id) {
    //     chosenField = board.fields[index];
    //   }
    // });

    // const chosenX = chosenField.x;
    // const chosenY = chosenField.y;

    // board.fields.forEach((field) => {
    //   if (
    //     checkDistanse(chosenField.x, chosenField.y, field.x, field.y) &
    //     (field.type == "empty")
    //   ) {
    //     chosenField.x = field.x;
    //     chosenField.y = field.y;
    //     field.x = chosenField.x;
    //     field.y = chosenField.y;
    //   }
    // });
  }

  replace() {
    const emptyIndex = board.fields.findIndex((field) => field.type == "empty");
    const chosenNumber = document.querySelector(".chosen-field").innerHTML;
    const chosenIndex = board.fields.findIndex(
      (field) => (field.number == chosenNumber) & (field.type == "regular")
    );

    const emptyField = board.fields[emptyIndex];
    const chosenField = board.fields[chosenIndex];
    const emptyX = emptyField.x;
    const emptyY = emptyField.y;

    if (!checkDistanse(chosenField.x, chosenField.y, emptyX, emptyY)) {
      console.log("too far");
      return;
    }

    const gameBoard = document.querySelector("#game-board");
    const chosenNode =
      gameBoard.childNodes[board.n_square * chosenField.y + chosenField.x];
    const emptyNode = document.querySelector(".empty-field");

    let chosenCoords = chosenNode.getBoundingClientRect();
    let emptyCoords = emptyNode.getBoundingClientRect();

    emptyField.x = chosenField.x;
    emptyField.y = chosenField.y;
    chosenField.x = emptyX;
    chosenField.y = emptyY;

    board.showFields();
  }

  // moveField(fields, x, y) {
  //   if (checkDistanse(this.x, this.y, x, y)) {
  //     console.log("too far");
  //     return;
  //   }

  //   fields.forEach((field) => {
  //     if ((field.x == x) & (field.y == y)) {
  //       field.x = this.x;
  //       field.y = this.y;
  //     }
  //   });

  //   this.x = x;
  //   this.y = y;
  // }
}

function checkDistanse(x1, y1, x2, y2) {
  const xDifference = Math.abs(x2 - x1);
  const yDifference = Math.abs(y2 - y1);
  if (
    (xDifference > 1) |
    (yDifference > 1) |
    ((xDifference == 1) & (yDifference == 1))
  ) {
    return false;
  }

  return true;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Init game
const htmlBoard = document.getElementById("game-board");
const board = new Board(3);
board.initFields();
board.showFields();
