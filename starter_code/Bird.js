
var SPACE = 32;
function Bird(game) {
    this.game = game;
    this.img = new Image();
    this.img.src = "images/flappy.png";
    this.height = 50;
    this.width = 50;
    this.vy = 0;
    this.gravity = 10;
}

Bird.prototype.draw = function () {
    this.game.ctx.drawImage(this.img, this.weight, this.height);
};

Bird.prototype.move = function () {

    if (this.y > 700) {

        this.game.gameOver();
    }
};






















