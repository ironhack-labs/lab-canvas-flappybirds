const ScoreBoard = {
  ctx: undefined,

  init: function (ctx) {
    this.ctx = ctx
    this.ctx.font = "50px sans-serif"
  },

  update: function (score) {
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Your score is: "+Math.floor(score), 50, 50);
  }
};