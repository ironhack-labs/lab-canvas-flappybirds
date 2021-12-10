class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.intervalId = undefined;
    this.gameOver = false;
    this.background = new Background(ctx);
    this.floor = new Floor(ctx);
    this.bird = new Bird(ctx);
    this.obstacle1 = new ObstacleBottom(ctx);
    this.obstacle2 = new ObstacleTop(ctx);
    this.obstacles = [this.obstacle1, this.obstacle2];
    this.random;
  }

  startGameLoop() {
    const loop = () => {
      if (this.gameOver) return;
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.background.move();
      this.background.draw();

      this.bird.draw();
      this.bird.fall();

      Object.values(this.obstacles).forEach((obstacle) => {
        obstacle.move();
        obstacle.draw();
        console.log(this.checkCollisions(this.bird, obstacle));
      });

      this.floor.move();
      this.floor.draw();

      requestAnimationFrame(() => {
        loop(); // call loop
      });
    };

    loop();
  }

  onKeyUp(e) {
    if (e.code === "ArrowUp") {
      this.bird.move("fall");
    }
  }

  onKeyDown(e) {
    if (e.code === "ArrowUp") {
      this.bird.move("up");
    }
  }

  checkCollisions(player, obstacle) {
    if (
      this.rectIntersect(
        player.x,
        player.y,
        player.width,
        player.height,
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height
      )
    ) {
      // STOOOOP
      this.gameOver = true;
    }
  }

  // Calculation for Collision Detection....

  rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
      return false;
    }
    return true;
  }
}
