import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { nextGeneration } from './algorithm';
import './index.css';

const gridSize = 60;
const squareSize = 10;
const pixelOffset = 0.5;

const random = () => Math.round(Math.random());

let grid = Array(gridSize)
  .fill(0)
  .map(() =>
    Array(gridSize)
      .fill(0)
      .map(() => random())
  );

function App() {
  const [fps, setFps] = useState(5);
  const [play, setPlay] = useState(true);
  const [mouseDown, setIsMouseDown] = useState(false);

  const canvas = useRef();

  const handleMouseMove = (e) => {
    if (mouseDown) {
      const rect = canvas.current.getBoundingClientRect();
      const ctx = canvas.current.getContext('2d');

      const x = Math.floor((e.clientX - rect.left) / squareSize);
      const y = Math.floor((e.clientY - rect.top) / squareSize);

      ctx.fillStyle = 'orange';
      ctx.fillRect(
        x * squareSize + pixelOffset,
        y * squareSize + pixelOffset,
        squareSize,
        squareSize
      );

      const row = x;
      const col = y;

      grid[row][col] = 1;
    }
  };

  useEffect(() => {
    let animationFrame;
    let timeout;

    if (canvas.current && play) {
      const ctx = canvas.current.getContext('2d');

      const draw = () => {
        timeout = setTimeout(() => {
          ctx.clearRect(
            pixelOffset,
            pixelOffset,
            gridSize * squareSize + pixelOffset,
            gridSize * squareSize
          );

          grid.forEach((rows, i) => {
            rows.forEach((cell, j) => {
              if (cell) {
                ctx.fillStyle = 'orange';
                ctx.fillRect(
                  i * squareSize + pixelOffset,
                  j * squareSize + pixelOffset,
                  squareSize,
                  squareSize
                );
              }
            });
          });

          ctx.strokeRect(
            pixelOffset,
            pixelOffset,
            gridSize * squareSize,
            gridSize * squareSize
          );

          for (let i = 0; i < gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(pixelOffset, i * squareSize + pixelOffset);
            ctx.lineTo(
              gridSize * squareSize + pixelOffset,
              i * squareSize + pixelOffset
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i * squareSize + pixelOffset, pixelOffset);
            ctx.lineTo(
              i * squareSize + pixelOffset,
              gridSize * squareSize + pixelOffset
            );
            ctx.stroke();
          }

          grid = nextGeneration(grid);

          animationFrame = window.requestAnimationFrame(draw);
        }, 1000 / fps);
      };

      animationFrame = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timeout);
    };
  }, [fps, play]);

  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <p>Refresh to spawn a new game. Click to add new cells</p>
      <div className={'control-group'}>
        <span>Frame rate (fps): {fps}</span>
        <button onClick={() => setFps((prev) => prev + 1)}>+</button>
        <button onClick={() => setFps((prev) => prev - 1)}>-</button>
        <button onClick={() => setPlay((prev) => !prev)}>
          {play ? 'Stop' : 'Start'}
        </button>
      </div>
      <canvas
        ref={canvas}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        width={gridSize * squareSize + 2 * pixelOffset}
        height={gridSize * squareSize + 2 * pixelOffset}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
