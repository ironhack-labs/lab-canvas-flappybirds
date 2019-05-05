//este literal mantiene el marcador del juego con su puntuación
const ScoreBoard = {
  ctx: undefined,
  score: 0,
  init: function(ctx) {
    ctx.font = "30px sans-serif";
    this.ctx = ctx;
    this.score = 0
  },
  draw: function() {
    this.ctx.fillStyle = "green";
    this.ctx.fillText(Math.floor(this.score), 50, 50);
  }
};
