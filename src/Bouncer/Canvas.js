import React, { useRef, useEffect, useState } from "react";
import { width, height } from "./config";
import Ball from "./Ball";
import board from "./Board";
import { ballInitialVector, boardTemplate, size, fps } from "./config";

const ballInitialPosition = Object.assign({}, board.getBallPosition());
let ball = new Ball(ballInitialPosition, ballInitialVector);
const ballEndPosition = Object.assign({}, ballInitialPosition);

const Canvas = () => {
  let ref = useRef();
  let [hits, addHits] = useState(0);
  let [steps, addSteps] = useState(0);
  const [animation, setAnimation] = useState(false);
  let [id, setId] = useState(null);

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

            ctx.beginPath();
            ctx.fillStyle = "lightblue";
            ctx.arc(x * size, y * size, size / 2.5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.arc(x * size, y * size, size / 5, 0, 2 * Math.PI);
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

    drawBoard();
    drawBall();

    const drawFrame = () => {
      drawBoard();
      ball.move();
      drawBall();

      addHits(ball.hitCounter);
      addSteps(ball.stepCounter);
      if (
        ball.position.x === ballEndPosition.x &&
        ball.position.y === ballEndPosition.y
      ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.hitCounter = -2;
        ball.stepCounter = 0;
        setAnimation(false);
        drawBoard();
        drawBall();
        return;
      }
    };

    if (animation) {
      setId(setInterval(drawFrame, 1000 / fps));
    } else {
      clearInterval(id);
    }
  }, [animation]);

  return (
    <>
      <canvas ref={ref} width={width} height={height}></canvas>
      <div className="buttons">
        <button className="btn_start" onClick={() => setAnimation(!animation)}>
          {animation ? "Pause" : "Start"}
        </button>
        <button className="btn_reset">Reset</button>
      </div>

      <div className="counter">
        <p className="hits">
          Steps counter: <span>{steps}</span>
        </p>
        <p className="hits">
          Hits counter: <span>{hits}</span>
        </p>
      </div>
    </>
  );
};

export default Canvas;
