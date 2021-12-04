// distance between  obstacles
const OBSTACLE_FRAMES =  120;

class Obstacle{
    constructor(ctx, y){
        this.ctx = ctx;


    //   this.x = 100
    //   this.y = this.maxY
    //   this.vx = 0
    //   this.vy = 0
    //   this.ay = 0.2
  
    //   this.speedX = 3
  
    //   this.width = 46
    //   this.height = 32
  
        this.img = new Image()
        this.img.src = 'asset/images/obstacle_top.png'
        this.img.isReady = false
        
        this.img2 = new Image()
        this.img2.src = 'asset/images/obstacle_bottom.png'
        this.img2.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }

        // size of the obstacle
        this.width = 100;
        this.height = 500;

        // coordinates of the obstacle
        this.x = this.ctx.canvas.width;
        this.y = y ;

        
        
        // speed of the obstacles : positive "Y" => go down
        this.vx = -3;
    }

    draw(){
        console.log("ciao",this.x, this.y)

        this.ctx.drawImage(
            this.img,
            this.x,
            this.y - 65 - this.height ,
            this.width,
            this.height
            
          )
          this.ctx.drawImage(
            this.img2,
            this.x,
            this.y +65,
            this.width,
            this.height
            
          )
        // this.ctx.save();
        // this.ctx.fillStyle = "red";
        // this.ctx.fillRect(this.x, this.y, this.width, this.patata);
        // this.ctx.restore();
    }

    move() {
        this.x += this.vx;
    }
}