class Obstacle {
    constructor(ctx, width, height, gameWidth, gameHeight, image) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.gameHeight = gameHeight
        this.posX = gameWidth
        this.image = new Image ()
        this.image.src = image
    }
    draw() {
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height,

        )
    }
    
}