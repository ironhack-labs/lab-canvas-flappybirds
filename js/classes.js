class Board {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.heigth = canvas.height
        this.background = new Image()
        this.background.src = "./images/bg.png"
        this.draw()
    }

    draw(){
        this.x--
        if (this.x < -canvas.width){
            this.x =0
        }
        ctx.drawImage(this.background, this.x, this.y, this.width, this.heigth)
        ctx.drawImage(this.background, this.x + this.width, this.y, this.width, this.heigth)
    }
}

class Flaby {
    constructor(){
    this.x = 200
    this.y = 350
    this.width = 68
    this.height = 47
    this.speedY = 0
    this.flabyImg = new Image()
    this.flabyImg.src = "./images/flappy.png"
    this.draw()
    }

    draw(){
        ctx.drawImage(this.flabyImg, this.x, this.y, this.width, this.height)
    }

    jump(){
        this.speedY = -8
    }

    flabyPos(){
    this.y += flaby.speedY
    this.speedY += gravity
    }

    isTouching(obstacle) {
        return (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
        )
    }
}

class Obstacles{
    constructor(y){
        this.x = canvas.width
        this.y = y
        this.width = 101
        this.height = 580
        this.obstacleBottom = new Image()
        this.obstacleBottom.src = "./images/obstacle_bottom.png"
        this.obstacleTop = new Image()
        this.obstacleTop.src = "./images/obstacle_top.png"
    }

    draw(){
        this.x--
        if (this.y < 0){
            ctx.drawImage(this.obstacleTop, this.x, this.y, this.width, this.height)
        }
        else{
            ctx.drawImage(this.obstacleBottom, this.x, this.y, this.width, this.height)
        }
    }
} 