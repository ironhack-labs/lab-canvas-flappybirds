const scoreBoard = {
  ctx: undefined,

  init: function (ctx) {
      this.ctx = ctx
      this.ctx.font = "30px helvetica"
  },

  update: function (score) {
      this.ctx.fillStyle = "green";
      this.ctx.fillText(Math.floor(score), 50, 50);
  }
};