class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.fps = 60;
    this.framesCounter = 0;
    this.player;
    this.obstacles = [];
  }

  init() {
    this.reset();
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.player = new Faby(this.ctx, this.width, this.height);
    this.start();
  }

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.obstacles = [];
  }

  start() {
    this.clearObstacles();

    this.interval = setInterval(() => {
      this.framesCounter++;

      this.clear();
      this.drawAll();
      this.moveAll();
      if (this.isCollision()) this.gameOver();

      if (this.framesCounter % 100 === 0) {
        this.generateObstacles();
      }

      if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawAll() {
    this.background.draw();
    this.player.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());
  }

  moveAll() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(obstacle => obstacle.move());
  }

  generateObstacles() {
    this.obstacles.push(new Obstacle(this.ctx, this.width, this.height));
  }

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.posX >= 0);
  }

  gameOver() {
    clearInterval(this.interval);
    console.log("GAME OVER");
  }

  isCollision() {
    return this.obstacles.some(
      obs =>
        (this.player.posY < -obs.posY + obs.height ||
          this.player.posY > -obs.posY + obs.height + obs.space) &&
        this.player.posX < obs.posX + obs.width &&
        this.player.posX > obs.posX
    );
  }
}
