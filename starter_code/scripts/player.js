class Player {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.x = 150;
        this.y = 200;
        this.width = 30;
        this.height = 40;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.img = new Image();
    }

    update() {
        this.img.src = "./images/flappy.png";
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }

    move() {
        document.onkeydown = event => {
            const key = event.keyCode;
            if(key === 32) {
                event.preventDefault();
                this.gravity = -0.2;
            }
        }
        document.onkeyup = event => {
            const key = event.keyCode;
            if(key === 32) {
                event.preventDefault();
                this.gravity = 0.1;
            }
        }
    }

    hitBottom() {
        let rockbottom = this.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
}