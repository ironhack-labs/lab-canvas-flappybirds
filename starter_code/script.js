var canvas,
  canvasW,
  canvasH,
  ctx,
  playerInitialPos,
  bg,
  bgImage,
  player,
  playerImage,
  obsTopImage,
  obsBottomImage,
  obstacles = [],
  frames = 0,
  fps = 60;

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    init();
  }

  function init() {
    var logo = document.querySelector("img");
    logo.style.display = "none";

    var button = document.querySelector("button");
    button.style.display = "none";

    var gameBoard = document.querySelector("#game-board");
    canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 550;
    canvasW = canvas.width;
    canvasH = canvas.height;

    playerInitialPos = { x: 200, y: canvasH / 2 };

    gameBoard.appendChild(canvas);
    ctx = canvas.getContext("2d");

    reset();
  }

  function reset() {
    obstacles = [];
    var toLoad = 4,
      loaded = 0;

    obsTopImage = new Image();
    obsTopImage.src = "./images/obstacle_top.png";
    obsTopImage.onload = function() {
      loaded++;
      if (toLoad === loaded) {
        loop();
      }
    };

    obsBottomImage = new Image();
    obsBottomImage.src = "./images/obstacle_bottom.png";
    obsBottomImage.onload = function() {
      loaded++;
      if (toLoad === loaded) {
        loop();
      }
    };

    bgImage = new Image();
    bgImage.src = "./images/bg.png";
    bgImage.onload = () => {
      loaded++;
      bg = new Background(bgImage, 0, canvasW, canvasH, ctx);
      if (toLoad === loaded) {
        loop();
      }
    };

    playerImage = new Image();
    playerImage.src = "./images/flappy.png";
    playerImage.onload = () => {
      loaded++;
      player = new Player(
        playerImage,
        playerInitialPos.x,
        playerInitialPos.y,
        ctx,
        canvasH
      );
      if (toLoad === loaded) {
        loop();
      }
    };

    window.onkeydown = function(e) {
      if (e.keyCode === 32) {
        e.preventDefault();
        player.jump();
      }
    };
  }

  function loop() {
    generateObstacles();
    var intervalId = setInterval(function() {
      frames++;
      clear();
      if (!player.isDead()) {
        moveAll();
        if (frames % 300 === 0) {
          generateObstacles();
        }
      } else {
        clearInterval(intervalId);
        reset();
      }
      drawAll();
    }, 1000 / fps);
  }

  function drawAll() {
    bg.draw();
    player.updatePos();
    player.draw();
    obstacles.forEach(obstacle => obstacle.draw());
  }

  function moveAll() {
    bg.move();
    obstacles.forEach(obstacle => obstacle.updatePos());
  }

  function generateObstacles() {
    var topHeight = randomIntegerFromRange(canvasH/4, canvasH/2) - 200;
    var bottomHeight = randomIntegerFromRange(canvasH/4, canvasH - topHeight - 200);
    obstacles.push(new Obstacle(obsTopImage, canvasW, 0, topHeight, ctx));
    obstacles.push(
      new Obstacle(
        obsBottomImage,
        canvasW,
        canvasH - bottomHeight, 
        bottomHeight,
        canvasH,
        ctx
      )
    );
  }

  function clear() {
    ctx.clearRect(0, 0, canvasW, canvasH);
  }
};
