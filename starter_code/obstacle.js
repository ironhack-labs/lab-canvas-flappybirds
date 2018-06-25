function Obstacle(game) {
    this.game = game;

    this.imgTop = new Image();
    this.imgTop.src = 'images/obstacle_top.png';

    this.imgBottom = new Image();
    this.imgBottom.src = 'images/obstacle_bottom.png';


    minHeight=-723;
    maxHeight==-553;
    this.height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);

    minGap = 150;
    maxGap= 200;
    this.gap=Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

    this.dx = 10;

    this.x = this.game.canvas.width;
}

Obstacle.prototype.draw = function () {
    this.game.ctx.fillStyle = "black";
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
    this.game.ctx.drawImage(
        this.imgTop,
        this.x,
        this.height,
    )
    this.game.ctx.drawImage(
        this.imgBottom,
        this.x,
        this.gap+this.height+793*2,
    )
};

Obstacle.prototype.move = function () {
    this.x -= this.dx;
};