class Player {
    constructor(ctx, width, height, image, gameHeight, keys) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = image;
        this.posX = 50;
        this.posY = gameHeight / 2;
        this.speedX = 1;
        this.speedY = 1;
        this.gravity = 0.5;
        this.gravitySpeed = 0.8;
        this.keys = keys;
        this.setListener();

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
    move() {
        this.posY += this.gravity * this.gravitySpeed;
    }

    setListener() {
        document.addEventListener('keypress', (e) => {
            console.log('hi');
            if (e.keyCode === this.keys.ArrowUp) {
                this.posY -= this.gravity * this.gravitySpeed;
            }
        }
        )
    }
} 