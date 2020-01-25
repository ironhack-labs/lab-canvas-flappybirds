class Bird {
    constructor(ctx, gameW, gameH) {
        this._ctx = ctx;
        this._gameW = gameW;
        this._gameH = gameH;

        this.posX = gameW / 2;
        this.posY = gameH / 2;
        this.posY0 = this._gameH - 50;

        this.birdWidth = 50;
        this.birdHeight = 50;

        this.image = new Image();
        this.image.src = "./images/flappy.png";

        this.speedY = 2;
        this.gravity = 0.3;

        this.setEventKeyboard();
    }
    draw() {
        this._ctx.drawImage(this.image, this.posX, this.posY, this.birdWidth, this.birdHeight)

    }

    move() {
        this.posY -= this.velY;
        this.velY -= this.gravity;

        // if (this.posY < this.posY0) {
        //     this.posY += this.speedY;
        //     this.speedY += this.gravity
        // } else {
        //     this.posY = this.posY0;
        //     this.speedY = 1;
        // }

    }

    setEventKeyboard() {
        document.addEventListener("keydown", e => {
            if (e.keyCode === 87) {
                this.speedY = 5
                // this.posY -= 40;
                // this.speedY -= 10
            }
        })



    }
}