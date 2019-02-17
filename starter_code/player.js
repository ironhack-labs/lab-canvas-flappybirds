function Player(game) {
    this.game = game

    this.x = this.game.canvas.width * 0.08
    this.y0 = this.game.canvas.heigth * 0.08
    this.y = this.y0

    this.img = new Image
    this.img.src = "images/flappy.png"

    this.w = 100
    this.h = 80

    this.vy = 1;


}
Player.prototype.paint = function() {
    this.game.ctx.drawImage(this.img, 600, 300, this.w, this.h)
}