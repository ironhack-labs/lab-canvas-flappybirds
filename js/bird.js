class Bird {
    constructor(ctx) {
        this.ctx = ctx

        this.width = 50
        this.height = 40

        this.x = this.ctx.canvas.width / 3
        this.y = this.ctx.canvas.height / 2
        this.maxY = 394

        this.img = new Image()
        this.img.src = './images/bird.png'
        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

        this.horizontalFrames = 3
        this.verticalFrames = 1

        this.xFrame = 0
        this.yFrame = 0

        this.tick = 0

        this.vx = 0
        this.vy = 0
        this.ay = 0.2

        this.fly = false
    }

    draw() {
        if(this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width * this.xFrame) / this.horizontalFrames,
                (this.img.height * this.yFrame) / this.verticalFrames,
                this.img.width / this.horizontalFrames,
                this.img.height / this.verticalFrames,
                this.x,
                this.y,
                this.width,
                this.height
            )
            this.tick++
        }
    }

    move() {
        this.vy += this.ay
        this.y += this.vy

        if (this.y >= this.maxY)  {
            this.y = this.maxY
        }        
    }

    onKeyDown(keyCode) {
        if (keyCode === SPACE_KEY) {
            this.vy = -5
        }
    }

    collidesWith(obstacle) {
        if (
            this.x < obstacle.x + obstacle.imgTop.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.imgTop.height &&
            this.y + this.height > obstacle.y
        ) {
            return true
        }

        if (
            this.x < obstacle.x + obstacle.imgBottom.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.imgTop.limit + obstacle.gap + obstacle.imgBottom.height &&
            this.y + this.height > obstacle.imgTop.limit + obstacle.gap
        ){
            return true
        } 
        
        else {
            return false
        }
    }

    

}

