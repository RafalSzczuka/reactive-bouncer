import Ball from "./Ball";
import { ballInitialVector } from "./config";
import board from "./Board";

const ballInitialPosition = board.getBallPosition();
const startPosition = Object.assign({}, ballInitialPosition);

class Game {
  constructor(ball, stepsLimit = 50) {
    this.stepsLimit = stepsLimit;
    this.counter = 0;
    this.ball = ball;
  }

  start() {
    while (true) {
      this.ball.move();
      console.log(this.ball.position);
      this.counter++;

      if (
        (this.ball.position.x === startPosition.x &&
          this.ball.position.y === startPosition.y) ||
        this.counter === this.stepsLimit
      ) {
        break;
      }
    }
  }
}

export default new Game(new Ball(ballInitialPosition, ballInitialVector), 100);
