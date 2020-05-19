import React, { useRef, useEffect, useState } from "react";
import { width, height } from "./config";
import Ball from "./Ball";
import { ballInitialVector, fps, getBallPosition } from "./config";
import { drawBoard, drawBall } from "./drawElements";

const ballInitialPosition = getBallPosition();
let ball = new Ball(ballInitialPosition, ballInitialVector);

const ballEndPosition = Object.assign({}, ballInitialPosition);

const Canvas = () => {
  let ref = useRef();
  let [hits, addHits] = useState(0);
  let [steps, addSteps] = useState(0);
  let [animation, setAnimation] = useState(false);
  let [id, setId] = useState(null);

  useEffect(() => {
    let canvas = ref.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBoard(canvas, ctx);
    drawBall(ctx, ball);

    const drawFrame = () => {
      drawBoard(canvas, ctx);
      ball.move();
      drawBall(ctx, ball);

      addHits(ball.hitCounter);
      addSteps(ball.stepCounter);
      if (
        ball.position.x === ballEndPosition.x &&
        ball.position.y === ballEndPosition.y
      ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.vector.x = 1;
        ball.vector.y = 1;
        ball.hitCounter = 0;
        ball.stepCounter = 0;
        setAnimation(false);
        drawBoard(canvas, ctx);
        drawBall(ctx, ball);
        return;
      }
    };

    if (animation) {
      setId(setInterval(drawFrame, 1000 / fps));
    } else {
      clearInterval(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation]);

  let style = { background: "rgb(235, 197, 60)" };

  return (
    <>
      <canvas ref={ref} width={width} height={height}></canvas>
      <div className="buttons">
        <button
          className="btn_start"
          onClick={() => setAnimation(!animation)}
          style={animation ? style : null}
        >
          {animation ? "Pause" : "Start"}
        </button>
        <button className="btn_reset" onClick={() => window.location.reload()}>
          Reset
        </button>
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
