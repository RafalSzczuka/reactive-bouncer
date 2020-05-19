import { board, size } from "./config";

// draw board in canvas
export const drawBoard = (canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let x = j;
      let y = i;
      if (board[i][j] === "X") {
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.fillRect(x * size, y * size, size, size);
      }
      if (board[i][j] === "Y") {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(
          x * size + size / 2,
          y * size + size / 2,
          size / 2,
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "lightblue";
        ctx.arc(
          x * size + size / 2,
          y * size + size / 2,
          size / 2.5,
          0,
          2 * Math.PI
        );
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(
          x * size + size / 2,
          y * size + size / 2,
          size / 5,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
};

// draw ball in canvas
export const drawBall = (ctx, ball) => {
  ctx.beginPath();
  ctx.arc(
    ball.position.x * size + size / 2,
    ball.position.y * size + size / 2,
    size / 2,
    0,
    2 * Math.PI
  );
  ctx.closePath();
  ctx.fillStyle = "red";

  ctx.fill();
};
