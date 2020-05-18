import { boardTemplate } from "./config";

class Board {
  constructor(board) {
    this.board = board;
  }
  getBallPosition() {
    let position;

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[j][i] === "1") {
          position = { x: i, y: j };
          break;
        }
      }
    }
    return position;
  }
}

export default new Board(boardTemplate);
