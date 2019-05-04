class scoreBoard {
  constructor(ctx) {
    this.ctx = ctx
    ctx.font = "80px sans-serif";
  }
  update(score) {
    this.ctx.fillStyle = "white";
    this.ctx.fillText(Math.floor(score), 50, 100);
  }
}