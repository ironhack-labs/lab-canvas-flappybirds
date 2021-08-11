const startButton = document.getElementById("start-button");

class Field {
  constructor(
    context,
    image,
    width,
    height,
    obstaclesTopImage,
    obstaclesBottomImage
  ) {
    this.context = context;
    this.image = image;
    this.width = width;
    this.height = height;
    this.posXMBG = 0;
    this.animationFrame = undefined;
    this.speed = 5;
    this.frames = 0;
    this.obstaclesTopImage = obstaclesTopImage;
    this.obstaclesBottomImage = obstaclesBottomImage;
    this.obstacles = [];
    this.score = 0;
  }
  runGame() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawMovingBG();
    player.rotationDraw();
    player.fall();
    this.insertObstacle();
    this.renderObstacles();
    this.moveObstacles();
    this.scores();
    this.frames++;
    this.animationFrame = requestAnimationFrame(() => this.runGame());
    this.checkIfGameEnds();
  }
  draw() {
    this.context.drawImage(this.image, 0, 0);
  }
  drawCanvasBG() {
    this.context.fillStyle = "#ffcc66";
    this.context.fillRect(0, this.height - 46, this.width - 4, 46);
    this.context.fillStyle = "#00ff00";
    this.context.fillRect(0, this.height - 46, this.width - 4, 10);
  }
  drawMovingBG() {
    this.draw();
    this.drawCanvasBG();
    this.posXMBG -= this.speed;
    for (
      let i = this.posXMBG;
      i <= (19 * this.width) / 20;
      i += this.width / 10
    ) {
      this.context.fillStyle = "#00b300";
      this.context.fillRect(i, this.height - 46, this.width / 20, 10);
    }
    if (this.posXMBG <= -90) {
      this.posXMBG = 0;
    }
  }
  checkIfFalled() {
    return player.bottom() > 503;
  }
  checkIfGameEnds() {
    if (this.checkIfFalled() || this.checkIfColision()) {
      cancelAnimationFrame(this.animationFrame);
      startButton.disabled = false;
    }
  }
  insertObstacle() {
    if (this.frames % 120 === 0) {
      this.score++;
      let height = this.obstaclesTopImage.height / 2;
      let width = this.obstaclesTopImage.width / 2;
      let topY = Math.floor(Math.random() * (height - 100)) - height;
      let bottomY = topY + height + 100 + Math.floor(Math.random() * 100);
      this.obstacles.push(
        // creates top obstacle
        new Obstacles(
          this.context,
          this.obstaclesTopImage,
          900,
          topY,
          height,
          width
        )
      );
      this.obstacles.push(
        //creates bottom obstacle
        new Obstacles(
          this.context,
          this.obstaclesBottomImage,
          900,
          bottomY,
          height,
          width
        )
      );
    }
  }
  renderObstacles() {
    this.obstacles.forEach((obstacle, index) => {
      obstacle.draw();
      if (obstacle.right() < 0) {
        this.obstacles.splice(index, 1); //removes obstacles from list after pass trough screen
      }
    });
  }
  moveObstacles() {
    this.obstacles.forEach((obstacle) => (obstacle.posX -= this.speed));
  }
  checkIfColision() {
    return this.obstacles.some((obstacle) => {
      return (
        (player.right() > obstacle.left() &&
          player.left() < obstacle.right() &&
          player.top() < obstacle.bottom() &&
          player.bottom() > obstacle.top()) ||
        player.bottom() < 0
      );
    });
  }
  scores() {
    this.context.fillStyle = "white";
    this.context.font = "bold 28px serif";
    this.context.fillText(`Score: ${this.score}`, 420, 50);
  }
}

window.onload = function () {
  startButton.onclick = function () {
    startGame();
  };

  function startGame() {
    startButton.disabled = true;
    document.activeElement.blur();
    canvas = document.querySelector("#my-canvas");
    context = canvas.getContext("2d");
    canvas.width = 904;
    canvas.height = 504 + 46;
    fieldImage = new Image();
    playerImage = new Image();
    obstaclesTopImage = new Image();
    obstaclesBottomImage = new Image();
    fieldImage.src = "./images/bg.png";
    playerImage.src = "./images/flappy.png";
    obstaclesTopImage.src = "./images/obstacleT.png";
    obstaclesBottomImage.src = "./images/obstacleB.png";
    fieldImage.onload = () => {
      playerImage.onload = () => {
        obstaclesTopImage.onload = () => {
          obstaclesBottomImage.onload = () => {
            field = new Field(
              context,
              fieldImage,
              canvas.width,
              canvas.height,
              obstaclesTopImage,
              obstaclesBottomImage
            );
            player = new Player(
              context,
              playerImage,
              canvas.width / 5,
              canvas.height / 3,
              canvas.height / 10,
              canvas.width / 15
            );
            field.runGame();
            document.addEventListener("keypress", (event) => {
              if (event.key === " ") {
                player.fly();
              }
            });
          };
        };
      };
    };
  }
};
