class Obstacles {
    constructor(ctx) {
        this.ctx = ctx
        this.x = this.ctx.canvas.width
        this.y = Math.floor(Math.random() * (-300 - -500) + -450)
        this.vx = -3
        this.gap = 150

        this.imgTop = new Image()
        this.imgTop.src = './images/obstacle_top.png'
        this.imgTop.isReady = false
        this.imgTop.onload = () => {
            this.imgTop.isReady = true
        }  

        this.imgBottom = new Image()
        this.imgBottom.src='./images/obstacle_bottom.png'
        this.imgBottom.isReady = false
        this.imgBottom.onload = () => {
            this.imgBottom.isReady = true
        }

        this.imgTop.width = 90
        this.imgTop.height = 500
        this.imgTop.limit = this.y + this.imgTop.height

        this.imgBottom.width = 90
        this.imgBottom.height = 500
        

    }

    draw() {
        this.ctx.drawImage(
            this.imgTop,
            this.x,
            this.y,
            this.imgTop.width,
            this.imgTop.height
        )

        this.ctx.drawImage(
            this.imgBottom,
            this.x,
            this.imgTop.limit + this.gap,
            this.imgBottom.width,
            this.imgBottom.height   
        )
    }

    move() {
        this.x += this.vx
    }
}