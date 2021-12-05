// distance between  obstacles
const OBSTACLE_FRAMES = 120;

class Obstacle {
    constructor(ctx, y, position) {

        this.ctx = ctx;
        this.img = new Image()
        
        if(position === "top") {
            this.img.src = 'asset/images/obstacle_top.png'
            this.img.isReady = false
        } else {
            this.img.src = 'asset/images/obstacle_bottom.png'
            this.img.isReady = false
        }
       
        this.img.onload = () => {
            this.img.isReady = true
        }

        // size of the obstacle
        this.width = 100;
        this.height = 500;
        const tubeGap = 125

        // coordinates of the obstacle
        this.x = this.ctx.canvas.width;
        if(position === "top") {
            this.y = y - tubeGap - this.height;
        } else {
            this.y = y ;
        }
        // speed of the obstacles : positive "Y" => go down
        this.vx = -3;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    move() {
        this.x += this.vx;
    }
}