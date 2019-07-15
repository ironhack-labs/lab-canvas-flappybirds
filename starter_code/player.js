class Player {
    
    constructor(ctx, w, h, keys) {
        this.ctx= ctx
        this.gameWidth = w
        this.gameHeigth = h

        this.image = new Image()
        this.image.src = "images/flappy.png"

        this.width = 80
        this.height = 60

        this.posX = 10
        this.posY = this.gameHeigth/2-50

        this.velY = 1

        this.keys = keys

        this.setListeners()
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }

    setListeners() {
        document.onkeydown = (e) => {
            if (this.keys.SPACE) {
                this.posY -= 30
                this.velY -= 10
            }
        }
    }

    move() {
        let gravity = .4

        //if (this.posY <= 0){
        this.posY += this.velY
        this.velY += gravity
        //}
    }
}