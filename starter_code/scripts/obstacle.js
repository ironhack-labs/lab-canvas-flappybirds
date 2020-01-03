class Obstacle {
    constructor() {
        this.ctx = canvas.getContext('2d');
        this.width = 50;
        this.height = Math.floor(Math.random() * 100 + 180);
        this.x = 800;
        this.yTop = 0;
        this.yBottom = canvas.height - this.height;
        this.topPipe = new Image();
        this.bottomPipe = new Image();
        this.obstacles = [];
    }

    createTopObstacle() {
        this.topPipe.src = './images/obstacle_top.png';
        this.ctx.drawImage(this.topPipe, this.x, this.yTop, this.width, this.height);
    }

    createBottomObstacle() {
        this.bottomPipe.src = './images/obstacle_bottom.png';
        this.ctx.drawImage(this.bottomPipe, this.x, this.yBottom, this.width, this.height);
    }

    move() {
        if (Math.floor(Math.random() * 20) % 3 === 0) {
            this.x -= 5;
        }
    }
}