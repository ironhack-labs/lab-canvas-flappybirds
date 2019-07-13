const ScoreBoard = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "30px sans-serif"
    },

    update: function (score) {
        this.ctx.fillStyle = "white";
        this.ctx.fillText(Math.floor(score), 50, 50);
    }
};