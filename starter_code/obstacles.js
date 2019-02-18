function Obstacles(game) {
    this.game = game
    this.w = 200
    this.h = this.w * 3
    this.dx = 10
    this.img = new Image
    this.img.src = "images/obstacle_bottom.png"

    this.x = this.game.canvas.width;
    this.y = this.game.player.y0 + this.game.player.h - this.h - 5
}
Obstacles.prototype.paint = function() {
    this.game.ctx.drawImage(this.img, 800, 100, this.w, this.h)
    this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
}