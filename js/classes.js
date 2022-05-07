//CLASSES
//BACKGROUND
class Background {
    constructor(w,h){
         //from the origin we start drawin
         this.x = 0;
        this.y = 0;
        //its size
        this.width = w;
        this.height = h;
        this.img = new Image() //this gives imgBg lots of methods, like src, onload, etc.
        this.img.src =  "images/bg.png"
    }
    //methods
    render(){
        //infinite loop
        if(this.x < -canvas.width){
            this.x=0
        }
        //move canvas
        this.x--; // x axis

        //drawImage(img,x,y,w,h)
        ctx.drawImage(this.img,this.x,this.y,this.width,this.heigth);
        //repeat bg
        ctx.drawImage(this.img,
        this.x + this.width,
        this.y,
        this.height);
    }
    
}

//CHARACTER
class Flappy{
    //constructor
    constructor(x,y,w,h){ //from the origin we start drawin
        this.x = x;
       this.y = y;
       //its size
       this.width = w;
       this.height = h;
       this.img = new Image() //this gives imgBg lots of methods, like src, onload, etc.
       this.img.src =  "images/flappy.png"
       //gravity
       this.vy=2
       //power to raise
       this.userPull=0;
    }
    //methods
    render(){
        //validate gravity
        this.vy = this.vy + (gravity - this.userPull)

        //validate that gflappy doesnt leave y = 0
        if (this.y <=0){
            this.userPull = 0;
            this.y = 2;
            this.vy=2;
        }

        //modify gravity by Y
        if (this.y+this.height < canvas.height){
            this.y += this.vy;
        }

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    //collision. returns true || false. item being object or enemy
    collision(item){
        return (
            this.x < item.x + item.width &&
            this.x + this.width > item.x && //full area is inside item
            this.y < item.y + item.height &&
            this.y + this.height > item.y
        )
    }
    //validate gravity
    //contain flappy in Y axis
}

//ENEMY

class Pipe extends Flappy{
    //(top,x,y,h)
constructor(pos,x,y,h){
super(x,y,50,h)
this.img.src=
pos === "top"// condition
? "images/obstacle_top.png"
:"images/obstacle_bottom.png"
}
render(){
this.x -= 2;
ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.width,
    this.height
)
}
}