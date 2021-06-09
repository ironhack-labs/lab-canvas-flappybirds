class PipeTop {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;

        this.img = new Image();
        this.img.src = "./images/obstacle_top.png";
        this.img.isReady = false;
        this.img.onload = () => {
        this.img.isReady = true;
        this.width = this.img.width;
        this.height = this.img.height;
    };
        this.width = this.img.width;
        this.height = this.img.height;
    }

    isReady() {
        return this.img.isReady;
    }

    draw() {
        if (this.isReady()) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    move() {
        this.x -= PIPES_SPEED;
    }
}
  