class Obstacles {
  constructor(game) {
    this.game = game;
    this.obstacleArray = [];
    this.frames = 0;
    this.minHeight = 20;
    this.maxHeight = 200;
    this.minGap = 50;
    this.maxGap = 200;
  }
  updateObstacles() {
    this.frames += 1;
    if (this.frames % 120 === 0) {
      var x = this.game.ctx.canvas.width;
      var height = Math.floor(
        Math.random() * (this.maxHeight - this.minHeight + 1) + this.minHeight
      );
      var gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1) + this.minGap);
      this.obstacleArray.push({ wid: 10, hei: height, image: obstacle_top, xX: x, yY: 0 });
      this.obstacleArray.push({
        wid: 10,
        hei: x - height - gap,
        image: bottom,
        xX: x,
        yY: height + gap
      });
      for (let i = 0; i < this.obstacleArray.length; i++) {
        this.obstacleArray[i].xX += -1;
      }
    }
  }

  paint() {
    const ctx = this.game.ctx;
    if (this.obstacleArray.length !== 0) {
      for (let i = 0; i < this.obstacleArray.length; i++) {
        this.obstacleArray[i].xX += -1;
        ctx.drawImage(
          this.obstacleArray[i].image,
          this.obstacleArray[i].xX,
          this.obstacleArray[i].yY,
          this.obstacleArray[i].wid,
          this.obstacleArray[i].hei
        );
      }
    }
  }
  crashCheck() {
    let birdX = this.game.bird.x;
    let birdY = this.game.bird.y;
    let birdWidth = this.game.bird.width;
    let birdHeight = this.game.bird.height;
    for (let i = 0; i < this.obstacleArray.length; i++) {
      if (
        birdX > this.obstacleArray[i].xX &&
        birdX < this.obstacleArray[i].xX + this.obstacleArray[i].wid &&
        birdY > this.obstacleArray[i].yY &&
        birdY < this.obstacleArray[i].yY + this.obstacleArray[i].hei
      ) {
        this.game.gameRun = false;
      }
    }
  }
}
