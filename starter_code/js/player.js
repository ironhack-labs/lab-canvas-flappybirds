class Player {
    constructor(ctx, width, height, gameHeight, keys) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src =  "./images/flappy.png"

        this.gameHeight = gameHeight;

        this.posX = 20
        this.posY = gameHeight / 2
        this.posY0 = gameHeight * 0.98 - this.height
        console.log

        this.gravity = 0.1
        this.vY = 8
        this.keys = keys

        this.setListeners()

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

    move() {
       if(this.posY<=this.posY0){
       this.posY += this.vY;
        this.vY += this.gravity;
    } else{
        this.vY = 1
        this.posY = this.posY0
    }
    }

    setListeners() {
        document.onkeydown = evt => {
            switch (evt.keyCode) {
                case this.keys.SPACE:
                    this.posY -= this.vY
                    this.vY -= 7
                    break;
            }
        }
    }
}