import board from "./Board";

export default class Ball {
  constructor(position, vector) {
    this.position = position;
    this.vector = vector;
  }

  collisionCheck() {
    let x = this.position.x,
      y = this.position.y,
      xV = this.position.x + this.vector.x,
      yV = this.position.y + this.vector.y;

    if (board.board[y][xV] === "X") {
      this.vector.x = -this.vector.x;
    }
    if (board.board[yV][x] === "X") {
      this.vector.y = -this.vector.y;
    }
    if (
      board.board[y][xV] === "0" &&
      board.board[yV][x] === "0" &&
      board.board[yV][xV] === "X"
    ) {
      this.vector.x = -this.vector.x;
      this.vector.y = -this.vector.y;
    }
  }

  bouncerCheck() {
    let randomVector = Math.random() < 0.5 ? -1 : 1;

    let x = this.position.x,
      y = this.position.y;

    if (board.board[y][x] === "Y") {
      board.board[y][x] = "0";
      this.vector.x = randomVector;
      this.vector.y = randomVector;
    }
  }

  move() {
    this.collisionCheck();
    this.position.x += this.vector.x;
    this.position.y += this.vector.y;
    this.bouncerCheck();
  }
}
