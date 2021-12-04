class Obstacles {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x
        this.y = y

        this.vx = -3

        this.img = new Image()
        this.img.src = './images/obstacle_bottom.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }

    }

    draw() {
        this.ctx.drawImage(
            this.img,
                this.x,
                this.y,
                this.width,
                this.height
        )
    }

    move() {
        this.x += this.vx
    }

}