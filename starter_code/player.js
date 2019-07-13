class Faby {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "images/flappy.png"

        this.width = 70
        this.height = 55

        this.posX = 20
        this.posY = 270
        this.posY0 = this.gameHeight * 0.98 - this.height - 8
        this.posY1 = 10

        this.speedX = 0
        this.speedY = 3

        this.setListeners()

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    move() {
        let gravity = 0.4


        if (this.posY < this.posY0) {
            this.speedY += gravity
            this.posY += this.speedY
        }





    }

    setListeners() {
        document.onkeyup = e => {
            if (e.keyCode == 16) {
                this.posY -= 22
                this.speedY = -10
            }
        }
    }

}