class Obstacle {
    constructor() {
        this.ctx = canvas.getContext('2d');
        this.width = 50;
        this.height = Math.floor(Math.random() * 10 + 240);;
        this.gap = Math.floor(Math.random() * 30 + 30);
        this.x = canvas.width;
        this.yTop = 0;
        this.yBottom = canvas.height - (this.height - this.gap);
        this.topPipe = new Image();
        this.bottomPipe = new Image();
        this.obstacles = []; 
    }

    // Create Top Obstacle
    createTopObstacle() {
        this.topPipe.src = './images/obstacle_top.png';
        this.ctx.drawImage(this.topPipe, this.x, this.yTop, this.width, this.height - this.gap);
    }

    // Create Bottom Obstacle
    createBottomObstacle() {
        this.bottomPipe.src = './images/obstacle_bottom.png';
        this.ctx.drawImage(this.bottomPipe, this.x, this.yBottom, this.width, this.height - this.gap);
    }

    // Move obstacles to the left on the x axis 
    move() {
        this.x -= 3;
    }
}