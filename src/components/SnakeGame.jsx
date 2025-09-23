import { useCallback, useEffect, useState } from "react";
import Snake from "./Snake";
import Food from "./Food";

function getRandomFood() {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2; // random within mac
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}
const initialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  route: "",
  snakeDots: [
    [0, 0],
    [0, 2],
  ],
};

function SnakeGame() {
  const [food, setFood] = useState(initialState.food);
  const [direction, setDirection] = useState(initialState.direction);
  const [speed, setSpeed] = useState(initialState.speed);
  const [route, setRoute] = useState("game");
  const [snakeDots, setSnakeDots] = useState(initialState.snakeDots);

  const onKeyDown = useCallback((e) => {
    //memoizes function reference between renders
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        setDirection("LEFT");
        break;
      case 38:
        setDirection("UP");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      case 40:
        setDirection("DOWN");
        break;
      default:
        break;
    }
  }, []);
  const moveSnake = useCallback(() => {
    if (route !== "game") return;

    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      default:
        break;
    }
  });
  function onSnakeOutOfBounds() {}
  function onSnakeCollapsed() {}
  function onSnakeEats() {}
  function increaseSnake() {}
  function increaseSpeed() {}
  function onRouteChange() {}
  function gameOver() {}
  function onUp() {}
  function onDown() {}
  function onRight() {}
  function onLeft() {}

  useEffect(() => {
    const interval = setInterval(moveSnake, speed); //Starts a repeating timer that calls moveSnake every speed milliseconds.
    document.onkeydown = onKeyDown;
    return () => clearInterval(interval);
  });

  useEffect(() => {
    onSnakeOutOfBounds();
    onSnakeCollapsed();
    onSnakeEats();
  });

  return (
    <>
      <div>
        <div>
          <Snake snakeDots={0} />
          <Food dot={0} />
        </div>
      </div>
    </>
  );
}

export default SnakeGame;
