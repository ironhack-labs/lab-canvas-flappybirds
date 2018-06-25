function Obstacles(game) {
    this.game = game;
    this.topTube = new Image();
    this.topImg.src = "images/obstacle_top.png";
    this.bottomTube = new Image();
    this.bottomImg.src = "images/obstacle_bottom.png";
    this.vx = 6;
}

Obstacles.prototype.draw = function () {
    this.topPosition = 0;
    this.bottomPosition = this.game.canvas.height - this.bottomHeight;
    this.game.ctx.drawImage(this.topImg, this.x, this.topPosition, this.w, this.topHeight);
    this.game.ctx.drawImage(this.bottomImg, this.x, this.bottomPosition, this.w, this.bottomHeight);
};

Obstacles.prototype.move = function () {
    this.x -= this.vx;
};
