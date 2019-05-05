class ScoreBoard {
  constructor(ctx, canvasW) {
    this.ctx = ctx
    this.canvasW = canvasW

    this.ctx.font = "50px sans-serif"
    this.score = undefined
  }

  draw(score) {
    this.score = score
    this.ctx.fillStyle = "white"
    if (this.score === undefined) this.ctx.fillText(0, this.canvasW / 2, 100)
    else this.ctx.fillText(this.score, this.canvasW / 2, 100)
  }

}