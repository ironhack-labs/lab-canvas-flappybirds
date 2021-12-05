// distance between  obstacles
const OBSTACLE_FRAMES = 120;

class Obstacle {
    constructor(ctx, y, position) {

        this.ctx = ctx;
        this.img = new Image();
        
        if(position === "top") {
            this.img.src = 'asset/images/obstacle_top.png';
            this.img.isReady = false;
        } else {
            this.img.src = 'asset/images/obstacle_bottom.png';
            this.img.isReady = false;
        }
       
        this.img.onload = () => {
            this.img.isReady = true;
        };

        // size of the obstacle
        this.width = 80;
        this.height = 400;
        const tubeGap = 180;

        // coordinates of the obstacle
        // the  2 obstacles starting point on the X axis,  is the end of the image
        this.x = this.ctx.canvas.width;
        // the top obstacle starting point on the Y axis:
        if(position === "top") {
            this.y = y - tubeGap - this.height;
        } 
        // the bottom obstacle starting point on the Y axis:
        else {
            this.y = y ;
        }
        this.vx = -3;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    move() {
        this.x += this.vx;
    }
}