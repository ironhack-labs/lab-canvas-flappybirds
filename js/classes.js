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
        this.img.src =  ("images/bg.png")
    }
    //methods
    render(){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.heigth)
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
       this.img.src =  ("images/flappy.png")
       //gravity
       this.vy=2
       //power to raise
       this.userPull=0;
    }
    //methods
    render(){
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

class Pipe extends Flappy {
    //pos "position" (top); top, x,y,h
    contructor(pos,x,y,h){
        super(x,y,50,h)
        this.img.src=
            pos ==="top"//condition
            ?"images/obstacle_top.png":"images/obstacle_bottom.png"
    }
}