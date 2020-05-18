import { boardTemplate } from "./config";

class Board {
  constructor(board) {
    this.board = board;
  }
  getBallPosition() {
    let position;

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === "1") {
          position = { x: j, y: i };
          break;
        }
      }
    }
    return position;
  }
}

export default new Board(boardTemplate);
