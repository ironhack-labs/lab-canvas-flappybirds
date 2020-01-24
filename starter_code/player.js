class Player {
    constructor(ctx, posX, posY, posY0) {
        this.ctx = ctx;
        this.width = 30;
        this.height = 25;
        this.image = new Image();
        this.image.src = "./images/flappy.png";
        this.posX = posX
        this.posY = posY
        this.posY0 = posY0
        this.velY = 0;
        this.gravity = 0.3
        this.setListeners();
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
    move() {

        if (this.posY < this.posY0) {
            this.posY += this.velY;
            this.velY += this.gravity;
        } else {
            this.posY = this.posY0;
            this.velY = 1;
        }
    }
    setListeners() {
        document.addEventListener("keydown", e => {
            if (e.keyCode === 38) {
                this.posY -= 16;
                this.velY -= 8;
            }
        });

    }
}