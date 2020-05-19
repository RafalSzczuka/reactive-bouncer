import wallhit from "../sounds/wallhit.mp3";
import bouncer from "../sounds/bouncer.mp3";
import { board } from "./config";

// *** hit sounds
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
// ***

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

    if (board[y][xV] === "X") {
      this.vector.x = -this.vector.x;
      this.hitCounter++;
      wallHitSound();
    }
    if (board[yV][x] === "X") {
      this.vector.y = -this.vector.y;
      this.hitCounter++;
      wallHitSound();
    }
    if (board[y][xV] === "0" && board[yV][x] === "0" && board[yV][xV] === "X") {
      this.vector.x = -this.vector.x;
      this.vector.y = -this.vector.y;
      this.hitCounter++;
      wallHitSound();
    }
  }

  bouncerCheck() {
    const randomVector = Math.random() > 0.5 ? 1 : -1;

    let x = this.position.x,
      y = this.position.y;

    if (board[y][x] === "Y") {
      board[y][x] = "0";
      this.hitCounter++;
      bouncerHitSound();

      // this.vector.x = randomVector;
      this.vector.y = randomVector;
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
