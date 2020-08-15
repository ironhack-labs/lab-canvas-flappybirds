class Board {
    constructor() {
        this.x = 0
        this.y = 0
        this.width = $canvas.width
        this.height = $canvas.height
        this.img = new Image()
        this.img.src = '../images/bg.png'
    }
    draw() {
        this.x--;
        if (this.x < -$canvas.width) this.x = 0
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x + $canvas.width, this.y, this.width, this.height)
    }
}

class Flappy {
    constructor() {
        this.x = 300
        this.y = 100
        this.height = 40
        this.width = 40
        this.velY = 0
        this.flyStrength = 9
        this.img = new Image()
        this.img.src = '../images/flappy.png'
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    move() {
        this.y += this.velY
        this.velY += gravity
    }
    fly() {
        this.velY = -this.flyStrength
    }
    flyOut() {
        return this.y < -5 || this.y + this.height - 10 > 600
    }
    isTouching(obstacle) {
        return this.x < obstacle.x + obstacle.width - 5 &&
            this.x + this.width > obstacle.x + 5 &&
            this.y < obstacle.y + obstacle.height - 5 &&
            this.y + this.height > obstacle.y + 5
    }
}

class Obstacle {
    constructor(y) {
        this.x = $canvas.width
        this.y = y
        this.height = 476
        this.width = 83
        this.imgTop = new Image()
        this.imgTop.src = '../images/obstacle_top.png'
        this.imgBottom = new Image()
        this.imgBottom.src = '../images/obstacle_bottom.png'
    }
    draw() {
        this.x--;
        if (this.y <= 0) ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
        else ctx.drawImage(this.imgBottom, this.x, this.y, this.width, this.height)
    }
}