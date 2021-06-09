class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 768;
    this.canvas.height = 1024;
    this.ctx = this.canvas.getContext("2d");

    this.fps = 1000 / 60;
    this.drawInterval = undefined;

    this.background = new Background(this.ctx);

    this.faby = new Faby(this.ctx, 85, 500);

    this.pipes = [];

    this.points = 0;

    this.pipesSpeed = -1;

    this.framesCount = 0;

    this.scoreCount = 0;

    const theme = new Audio("./js/models/sound/theme.mp3");
    theme.volume = 0.2;

    this.sounds = {
      theme,
      gameOver: new Audio("./js/models/sound/gameOver.mp3"),
    };
  }

  start() {
    if (!this.drawInterval) {
      this.drawInterval = setInterval(() => {
        if (!this.sounds.theme.play()) {
          this.sounds.theme.play();
        }
        this.clear();
        this.move();
        this.draw();
        this.checkCollisions();

        this.score();

        this.framesCount++;

        if (this.framesCount % PIPES_FRAMES === 0) {
          this.addPairOfPipes();
        }
      }, this.fps);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pipes = this.pipes.filter((pipe) => pipe.x + pipe.width >= 0);
  }

  draw() {
    this.background.draw();
    this.faby.draw();
    this.pipes.forEach((pipe) => pipe.draw());

    this.ctx.save();
    this.ctx.font = "100px 'Press Start 2P', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`${this.scoreCount}`, this.ctx.canvas.width / 2, 150);
    this.ctx.restore();
  }

  move() {
    this.background.move();
    this.faby.move();
    this.pipes.forEach((pipe) => pipe.move());
  }

  onKeyEvent(event) {
    this.faby.onKeyEvent(event);
  }

  addPairOfPipes() {
    const minSpace = this.canvas.height - this.faby.height * 3;
    const posYTop = Math.floor(Math.random() * 793) - 793;

    const posYBot = posYTop + 1000;

    this.pipes.push(
      new PipeTop(this.ctx, this.canvas.width, posYTop),
      new PipeBot(this.ctx, this.canvas.width, posYBot)
    );
  }

  gameOver() {
    clearInterval(this.drawInterval);
    this.sounds.theme.pause();
    this.sounds.gameOver.play();

    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.font = "100px 'Press Start 2P', cursive";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 -50
    );
    this.ctx.fillText(
      `${this.scoreCount}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 + 100
    );
    this.ctx.restore();
  }

  score() {
    if (this.pipes.length > 0) {      
      if (this.faby.x <= this.pipes[0].x+1 && this.faby.x >= this.pipes[0].x-1) {
        return this.scoreCount += 1;
      }
    }
  }

  checkCollisions() {
    if (this.pipes.some((pipe) => this.faby.collidesWith(pipe))) {
      this.gameOver();
    }
  }
}
