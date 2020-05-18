import React, { useRef, useEffect, useState } from "react";
import { width, height } from "./config";
import Ball from "./Ball";
import board from "./Board";
import { ballInitialVector, boardTemplate, size, fps } from "./config";

const ballInitialPosition = board.getBallPosition();

let ball = new Ball(ballInitialPosition, ballInitialVector);

const Canvas = () => {
  let ref = useRef();
  const [animation, setAnimation] = useState(false);
  const [position, setPosition] = useState(ball.position);

  useEffect(() => {
    let canvas = ref.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function drawBoard() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < boardTemplate.length; i++) {
        for (let j = 0; j < boardTemplate[i].length; j++) {
          let x = j;
          let y = i;
          if (boardTemplate[i][j] === "X") {
            ctx.fillStyle = "rgb(150,150,150)";
            ctx.fillRect(x * size, y * size, size, size);
          }
          if (boardTemplate[i][j] === "Y") {
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.arc(x * size, y * size, size / 2, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(
        ball.position.x * size + size / 2,
        ball.position.y * size + size / 2,
        size / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    const delta = 1000 / fps;
    let oldTime = 0;

    drawBoard();

    function renderFrame(currentTime) {
      if (oldTime === 0) {
        oldTime = currentTime;
      }
      if (currentTime - oldTime >= delta) {
        drawBoard();
        drawBall();
        ball.move();

        oldTime = currentTime;
      }
      requestAnimationFrame(renderFrame);
    }

    requestAnimationFrame(renderFrame);
  });

  return (
    <>
      <canvas ref={ref} width={width} height={height}></canvas>
      <button className="btn_start" onClick={() => setAnimation(!animation)}>
        Start
      </button>
    </>
  );
};

export default Canvas;
