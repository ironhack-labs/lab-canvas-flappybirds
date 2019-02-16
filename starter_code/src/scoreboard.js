var ScoreBoard = {
    update: function (game) {
        game.ctx.font = "30px sans-serif";
        game.ctx.fillStyle = "white";
        game.ctx.fillText(Math.floor(game.score), game.w / 2 - 10, 100);
    }
}