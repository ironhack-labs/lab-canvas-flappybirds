class Background {
    constructor(ctx, w, h, imgSource) {

        this._ctx = ctx;
        this._width = w;
        this._height = h;

        this.image = new Image();
        this.image.src = imgSource;

        this.posX = 0;
        this.posY = 0;

        this.speedX = 2;
    }

    draw() {
        this._ctx.drawImage(this.image, this.posX, this.posY, this._width, this._height);
        this._ctx.drawImage(this.image, this.posX + this._width, this.posY, this._width, this._height);
    }

    move() {
        if (this.posX <= -this._width) {
            this.posX = 0;
        }
        this.posX -= this.speedX
    }

}