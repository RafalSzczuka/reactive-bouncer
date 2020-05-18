import board from "./Board";
import wallhit from "../sounds/wallhit.mp3";
import bouncer from "../sounds/bouncer.mp3";

const wallHit = new Audio(wallhit);
const bouncerHit = new Audio(bouncer);

const wallHitSound = () => {
  wallHit.currentTime = 0;
  wallHit.play();
};

const bouncerHitSound = () => {
  bouncerHit.currentTime = 0;
  bouncerHit.play();
};

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
      wallHitSound();
    }
    if (board.board[yV][x] === "X") {
      this.vector.y = -this.vector.y;
      this.hitCounter++;
      wallHitSound();
    }
    if (
      board.board[y][xV] === "0" &&
      board.board[yV][x] === "0" &&
      board.board[yV][xV] === "X"
    ) {
      this.vector.x = -this.vector.x;
      this.vector.y = -this.vector.y;
      this.hitCounter++;
      wallHitSound();
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
      bouncerHitSound();

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
