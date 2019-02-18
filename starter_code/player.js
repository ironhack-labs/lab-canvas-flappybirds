function Player(game) {
    this.game = game

    this.x = this.game.canvas.width * 0.08
    this.y0 = this.game.canvas.heigth * 0.08
    this.y = this.y0

    this.img = new Image
    this.img.src = "images/flappy.png"

    this.w = 100
    this.h = 80
    this.speedX = 1
    this.speedY = 0.5
    this.position = 400



    this.gravity = 0.2
    this.setListeners()

}
Player.prototype.paint = function() {
    this.game.ctx.drawImage(this.img, 600, 400, this.w, this.h)
}
Player.prototype.move = function() {
    this.speedY += this.gravity
    this.y += this.speedY
}
Player.prototype.setListeners = function() {
    document.onmousedown = function() {

        this.y -= 40;
        this.speedY -= 0.5;
        /* if (e.keyCode === this.plyer.keys.SPACE)
             this.y -= 50
         this.speedY = 0.7*/
        console.log("estoy en setListener")
    }.bind(this)
}