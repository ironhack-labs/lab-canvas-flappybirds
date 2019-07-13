class Obstacles {
    constructor(ctx, h, w, gameHeight) {
        this.ctx = ctx
        this.width = 130
        this.height = 250

        this.gameHeight = gameHeight
        this.velX = 10
        this.posX = window.innerWidth * .98

        this.posYBot = (gameHeight * .98 - (this.height - 10)) + 60
        this.posYTop = -60

        this.imageBot = new Image()
        this.imageBot.src = "images/obstacle_bottom.png"

        this.imageTop = new Image()
        this.imageTop.src = "images/obstacle_top.png"
    }

    draw() {
        this.ctx.drawImage(this.imageBot, this.posX, this.posYBot, this.width, this.height)
        this.ctx.drawImage(this.imageTop, this.posX, this.posYTop, this.width, this.height)
    }

    move() {
        this.posX -= this.velX
    }

}