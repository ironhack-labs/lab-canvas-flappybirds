function Player(game) {
    this.game = game;

    this.x = this.game.canvas.width * 0.08;
    this.y0 = this.game.canvas.height * 0.5;
    this.y = this.y0;

    this.img = new Image();
    this.img.src = 'images/flappy.png';

    this.w = 50;
    this.h = 50;

    this.vy = 1;

    this.setListeners();
}

Player.prototype.draw = function () {
    this.game.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
    );
};

Player.prototype.setListeners = function () {
    document.onkeydown = function (event) {
        event.preventDefault();
        if (event.keyCode === SPACE) {
            this.y -= 100;
        }
    }.bind(this);
};

Player.prototype.move = function () {
    var gravity = 0.4;
    this.y += gravity;
    this.y += this.vy;
};

var SPACE = 32;