class Bird {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 100;
        this.grav = -1.5;
        this.width = 138 / 3;
        this.height = 32;
        this.image = new Image();
        this.image.src = "./images/bird.png";
        this.image.onload = () => {
            this.isLoaded = true;
        };
    }

    draw() {
        this.isLoaded &&
            this.ctx.drawImage(
                this.image,
                46,
                0,
                this.width,
                32,
                30,
                this.y,
                this.width,
                32
            );
    }

    fall() {
        this.y -= this.grav;
        if (this.y + this.height >= this.ctx.canvas.height - 79) {
            this.y = this.ctx.canvas.height - 79 - this.height;
        }
    }

    move(direction) {
        console.log(direction);
        switch (direction) {
            case "up":
                this.y -= 50;
                break;
            case "fall":
                break;
        }
    }
}