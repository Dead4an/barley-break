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
    this.fields.forEach((field) => {
      const fieldNode = document.createElement("div");
      fieldNode.innerHTML = field.number;
      fieldNode.classList.add(`${field.type}-field`);
      fieldNode.style.width = `${100 / this.n_square - 2}%`;
      fieldNode.style.height = `${100 / this.n_square - 2}%`;
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
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Init game
const htmlBoard = document.getElementById("game-board");
const board = new Board(4);
board.initFields();
board.showFields();
