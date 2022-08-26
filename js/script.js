const canvas = document.querySelector("#game-board canvas");
const ctx = canvas.getContext("2d");

//load in the images
let backgroundImg = new Image();
backgroundImg.src = "/images/bg.png";
let flappy = new Image();
flappy.src = "/images/flappy.png";
let obstacleTop = new Image();
obstacleTop.src = "/images/obstacle_top.png";
let obstacleBottom = new Image();
obstacleBottom.src = "/images/obstacle_bottom.png";

//------------------
const obstacleArray = [];
let frames = 0;
//OBJECTS
const background = {
  img: backgroundImg,
  x: 0,
  speed: -3,
  move: function () {
    this.x += this.speed;
    this.x %= canvas.width;
  },
  draw: function () {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

const player = {
  img: flappy,
  playerX: 100,
  playerY: 200,
  width: 50,
  height: 50,
  speedX: 0,
  speedY: 0,
  gravity: 1,
  gravitySpeed: 3,
  draw: function () {
    ctx.drawImage(
      this.img,
      this.playerX,
      this.playerY,
      this.width,
      this.height
    );
  },
  newPos: function () {
    this.playerX += this.speedX;
    this.playerY += this.speedY;
  },
  update: function () {
    // (this.y += this.gravity) * this.gravitySpeed;
    this.playerY += this.gravity * this.gravitySpeed;
    ctx.drawImage(
      this.img,
      this.playerX,
      this.playerY,
      this.width,
      this.height
    );
  },
  left: function () {
    return this.playerX;
  },
  right: function () {
    return this.playerX + this.width;
  },
  top: function () {
    return this.playerY;
  },
  bottom: function () {
    return this.playerY + this.height;
  },
  crashWith: function (obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  },
};

class Obstacle {
  constructor(width, height, img, x, y) {
    this.img = img;
    this.width = 100;
    this.height = height;
    this.x = x;
    this.y = y;
    // this.top = y;
    // this.bottom = y + height;
    // this.left = x;
    // this.right = x + width;
  }

  update() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
}

// backgroundImg.onload = function () {
//   ctx.drawImage(backgroundImg, 0, 0);
// };

window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    backgroundImg.onload = gameRun = setInterval(updateGameArea, 20);
  }
};

function updateGameArea() {
  console.log("updating");
  background.move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  // player.draw();
  player.update();
  updateObstacles();
  checkGameOver();
  score();
}

//update canvas and run background animation
// function updateCanvas() {
//   background.move();

//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   background.draw();

//   requestAnimationFrame(updateCanvas);
// }

// start calling updateCanvas once the image is loaded
// backgroundImg.onload = updateCanvas;

document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowUp") {
    player.gravity = -1;
  }
});
document.addEventListener("keyup", (e) => {
  player.gravity = 1;
});

function updateObstacles() {
  for (i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].x += -3;
    obstacleArray[i].update();
  }
  frames += 1;
  if (frames % 120 === 0) {
    let x = canvas.width;
    let minHeight = 70;
    let maxHeight = 300;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    let minGap = 100;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    obstacleArray.push(new Obstacle(10, height, obstacleTop, x, 0));
    obstacleArray.push(
      new Obstacle(10, x - height - gap, obstacleBottom, x, height + gap)
    );
  }
}

function checkGameOver() {
  const crashed = obstacleArray.some(function (obstacle) {
    return player.crashWith(obstacle);
  });

  if (crashed) {
    console.log("Crash!!!!");
    clearInterval(gameRun);
  }
}
function score() {
  const points = Math.floor(frames / 5);
  ctx.font = "18px serif";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${points}`, 350, 50);
}
