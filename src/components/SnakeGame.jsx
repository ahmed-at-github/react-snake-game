import { useCallback, useEffect, useState } from "react";
import Snake from "./Snake";
import Food from "./Food";
import Menu from "./Menu";
import Button from "./Button";

function getRandomFood() {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2; // random number within max
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}
const initialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  route: "menu",
  snakeDots: [
    [0, 0], //x, y
    [0, 2],
  ],
};

function SnakeGame() {
  const [food, setFood] = useState(initialState.food);
  const [direction, setDirection] = useState(initialState.direction);
  const [speed, setSpeed] = useState(initialState.speed);
  const [route, setRoute] = useState(initialState.route);
  const [snakeDots, setSnakeDots] = useState(initialState.snakeDots);

  const onKeyDown = useCallback((e) => {
    //memoizes function reference between renders
    e.preventDefault();
    console.log(e);

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
        head = [head[0] + 2, head[1]]; //towards pos x-axis
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]]; //towards neg x-axis
        break;
      case "DOWN":
        head = [head[0], head[1] + 2]; //towards neg y-axis
        break;
      case "UP":
        head = [head[0], head[1] - 2]; //towards pos y-axis
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }, [direction, snakeDots, route]);

  function gameOver() {
    // alert(`GAME OVER, your score is ${snakeDots.length - 2}`);
    setFood(getRandomFood());
    setSnakeDots(initialState.snakeDots);
    setDirection("RIGHT");
    setSpeed(100);
    setRoute("game");
  }

  const onSnakeOutOfBounds = useCallback(() => {
    let head = snakeDots[snakeDots.length - 1];
    if (route == "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        gameOver();
        console.log("form bound");
        return;
      }
    }
  }, [snakeDots]);

  const onSnakeCollapsed = useCallback(() => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        gameOver();
        console.log("from collap");
      }
    });
  }, [snakeDots]);

  const onSnakeEats = useCallback(() => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomFood());
      increaseSpeed();
      increaseSnake();
    }
  }, [snakeDots, food]);

  function increaseSnake() {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  }

  function increaseSpeed() {
    if (speed > 10) {
      setSpeed(speed - 20);
    }
  }

  function onRouteChange() {
    setRoute("game");
  }

  //mobile controls
  // function onUp() {}
  // function onDown() {}
  // function onRight() {}
  // function onLeft() {}
  // function moveWithDirection() {}

  useEffect(() => {
    const interval = setInterval(moveSnake, speed); //Starts a repeating timer that calls moveSnake every speed milliseconds.
    document.onkeydown = onKeyDown;
    return () => clearInterval(interval);
  }, [moveSnake, speed, onKeyDown]);

  useEffect(() => {
    onSnakeOutOfBounds();
    onSnakeCollapsed();
    onSnakeEats();
  }, [snakeDots, onSnakeOutOfBounds, onSnakeCollapsed, onSnakeEats]);

  return (
    <>
      <div>
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={onRouteChange} />
          </div>
        ) : (
          <div>
            <div className="game-area">
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
            </div>
            {/* <Button/> */}
          </div>
        )}
      </div>
    </>
  );
}

export default SnakeGame;
