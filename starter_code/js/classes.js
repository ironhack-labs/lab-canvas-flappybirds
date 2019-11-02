class Board {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.img = new Image();
        this.img.src = images.bg;
        this.img.onload = () => {
            this.draw();
        }
    }
    draw() {
        this.x--;
        if(this.x < -canvas.width) {
            this.x = 0;
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.img, this.x + canvas.width, this.y,  this.width, this.height);
        }
        
    }
}


class Player {
    constructor() {
        this.x =  50;
        this.y = 150;
        this.width = 50;
        this.height = 35;
        this.img = new Image();
        this.img.src = images.flappy;
        this.img.onload = () => {
            this.draw();
        };
    }
    draw() {
        this.y += 0.5;
        if(this.y < 0){
            this.y =  this.y + this.height;
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    fly() {
        this.y -= 40;
    }
    isTouching(obstacle) {
        return (
          this.x < obstacle.x + obstacle.width &&
          this.x + this.width > obstacle.x &&
          this.y < obstacle.y + obstacle.height &&
          this.y + this.height > obstacle.y
        );
    }
}

class Obstacle {
    constructor (y, height, type) {
        this.x  = canvas.width + 50;
        this.y = y;
        this.height = height;
        this.width = 50;
        this.imgTop = new Image();
        this.imgTop.src = images.topPipe;
        this.imgBot = new Image();
        this.imgBot.src = images.bottomPipe;
        this.type = type;
    }
    draw() {
        this.x--;
        if (this.type) {
            ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height);
        }
    }
}