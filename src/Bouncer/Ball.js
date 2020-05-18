import board from "./Board";

export default class Ball {
  constructor(position, vector) {
    this.position = position;
    this.vector = vector;
    this.hitCounter = 0;
    this.stepCounter = 0;
  }

  collisionCheck() {
    let x = this.position.x,
      y = this.position.y,
      xV = this.position.x + this.vector.x,
      yV = this.position.y + this.vector.y;

    if (board.board[y][xV] === "X") {
      this.vector.x = -this.vector.x;
      this.hitCounter++;
    }
    if (board.board[yV][x] === "X") {
      this.vector.y = -this.vector.y;
      this.hitCounter++;
    }
    if (
      board.board[y][xV] === "0" &&
      board.board[yV][x] === "0" &&
      board.board[yV][xV] === "X"
    ) {
      this.vector.x = -this.vector.x;
      this.vector.y = -this.vector.y;
      this.hitCounter++;
    }
  }

  bouncerCheck() {
    let possibleVectors = [];
    const randomVector = (vectors) => {
      return vectors[Math.floor(Math.random() * vectors.length)];
    };

    const vectors = {
      topRight: {
        x: 1,
        y: -1,
      },
      topLeft: {
        x: -1,
        y: -1,
      },
      bottomRight: {
        x: 1,
        y: 1,
      },
      bottomLeft: {
        x: -1,
        y: 1,
      },
    };

    let x = this.position.x,
      y = this.position.y;

    if (board.board[y][x] === "Y") {
      board.board[y][x] = "0";
      this.hitCounter++;

      if (this.vector.x === 1 && this.vector.y === 1) {
        possibleVectors = [
          vectors.bottomLeft,
          vectors.topRight,
          vectors.topLeft,
        ];
        this.vector = randomVector(possibleVectors);
      }
      if (this.vector.x === -1 && this.vector.y === -1) {
        possibleVectors = [
          vectors.bottomLeft,
          vectors.topRight,
          vectors.bottomRight,
        ];
        this.vector = randomVector(possibleVectors);
      }
      if (this.vector.x === 1 && this.vector.y === -1) {
        possibleVectors = [
          vectors.bottomLeft,
          vectors.bottomRight,
          vectors.topLeft,
        ];
        this.vector = randomVector(possibleVectors);
      }
      if (this.vector.x === -1 && this.vector.y === 1) {
        possibleVectors = [
          vectors.bottomRight,
          vectors.topLeft,
          vectors.topRight,
        ];
        this.vector = randomVector(possibleVectors);
      }
    }
  }

  move() {
    this.bouncerCheck();
    this.collisionCheck();
    this.position.x += this.vector.x;
    this.position.y += this.vector.y;
    this.stepCounter++;
  }
}
