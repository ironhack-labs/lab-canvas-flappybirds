class Board {

    constructor() {

        this.x = 0
        this.y = 0
        this.width = $canvas.width
        this.height = $canvas.height
        this.speedX = 0
        this.img = new Image()
        this.img.src =
            "images/bg.jpg"
        this.img.onload = () => {
            this.draw()

        }


    }

    draw() {
        this.x--

            if (this.x < -$canvas.width) this.x = 0
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)

        ctx.drawImage(
            this.img,
            this.x + $canvas.width,
            this.y,
            this.width,
            this.height
        )




    }



}

class Flappy {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 100
        this.height = 75
        this.speedY = 0
        this.img = new Image()
        this.img.src =
            "images/flappypig.png"
        this.img.onload = () => {
            this.draw()

        }
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    jump() {
        this.speedY = -10
    }
    isTouching(obstacle) {
        return (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
        )

        /*  gameOver() {
             if (this.y >= $canvas.height + this.height || this.y <= 0) {
                 clearInterval(intervalId)
                 ctx.font = `80px 'Comic Neue'`
                 ctx.fillStyle = "crimson"
                 ctx.fillText("Game Over", 120, 300)
             } */

    }

    /*  jumpDown() {
         this.y = (this.y + 55) * gravity
     } */
}


class Obstacles {
    constructor(y) {
        this.x = $canvas.width
        this.y = y
        this.width = 131
        this.height = 694
        this.speedX = 0
        this.topImg = new Image()
        this.topImg.src =
            "images/coins_top.png"

        this.bottomImg = new Image()
        this.bottomImg.src =
            "images/coins_down.png"

    }

    draw() {
        this.x--
            if (this.y < 0) {
                ctx.drawImage(this.topImg, this.x, this.y, this.width, this.height)
            } else {
                ctx.drawImage(this.bottomImg, this.x, this.y, this.width, this.height)
            }
    }



}