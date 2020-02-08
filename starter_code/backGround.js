class BackGround {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
  }
  backGroundPaint() {
    const ctx = this.game.ctx;
    ctx.drawImage(background, this.x, this.y, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(
      background1,
      this.x + ctx.canvas.width,
      this.y,
      ctx.canvas.width,
      ctx.canvas.height
    );
    if (Math.abs(this.x) === ctx.canvas.width) {
      this.x = 0;
    } else this.x--;
  }
}
