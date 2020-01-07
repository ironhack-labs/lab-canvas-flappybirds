class Player {
    constructor(game) {
        this.game = game;
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.x = 200;
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

    // gets the left position
    getLeft() {
        return this.x;
    }

    // gets the top right position
    getRight() {
        return this.x + this.width;
    }

    // // gets the top position
    getTop() {
        return this.y;
    }

    // gets the bottom position
    getBottom() {
        return this.y + this.height;
    }

    // detects the collision of the car and obstacles
    detectCollision(otherComp) {
        const crossLeft = otherComp.x <= this.getRight() && otherComp.x >= this.getLeft();

        const crossRight = otherComp.x + otherComp.width >= this.getLeft() && otherComp.x + otherComp.width <= this.getRight();

        const crossTop = otherComp.y <= this.getBottom() && otherComp.y >= this.getTop();

        const crossBottom = otherComp.y + otherComp.height >= this.getTop() && otherComp.y + otherComp.height <= this.getBottom();

        if((crossLeft || crossRight) && (crossTop || crossBottom)) {
            return true;
        } else {
            return false;
        }
    }
}