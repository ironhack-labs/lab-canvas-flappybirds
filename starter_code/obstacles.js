class Obstacles {
  constructor(game) {
    this.game = game;
    this.obstacleArray = [];
    this.frames = 0;
    this.x = this.game.ctx.canvas.width;
    this.minHeight = 20;
    this.maxHeight = 200;
    this.minGap = 50;
    this.maxGap = 200;
  }
  updateObstacles() {
    this.frames += 1;
    if (this.frames % 120 === 0) {
      var height = Math.floor(
        Math.random() * (this.maxHeight - this.minHeight + 1) + this.minHeight
      );
      var gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1) + this.minGap);
      this.obstacleArray.push({ wid: 10, hei: height, image: obstacle_top, x: this.x, y: 0 });
      this.obstacleArray.push({
        wid: 10,
        hei: this.x - height - gap,
        image: bottom,
        x: this.x,
        y: height + gap
      });
    }
  }

  paint() {
    const ctx = this.game.ctx;
    console.log(this.obstacleArray);
    for (let i = 0; i < this.obstacleArray.length; i++) {
      this.obstacleArray[i].x += -1;
    }

    for (let element in this.obstacleArray) {
      console.log(element);
      // ctx.drawImage(element.image, element.x, element.y, element.wid, element.hei);
    }
  }
}
