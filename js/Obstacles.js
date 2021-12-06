class Obstacles {
    constructor(ctx){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 150;
        this.vx = -3;

        this.img = new Image();
        this.img.src= '../images/obstacle_bottom.png';
        this.img.isReady = false;       
        this.img.onload = () => {
            this.img.isReady = true;
        }

    }

    draw
}