//background
class Background{
    //constructor
    constructor(w,h,life,points){
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.height= h;
        this.image = new Image();
        //image={src:"",onload:()=>{}}
        this.image.src = "images/bg.png" // "./" => en este mismo nivel; "../" => un nivel antes
        this.gamerOverPic = new Image();
        this.gamerOverPic.src = "https://w7.pngwing.com/pngs/359/749/png-transparent-death-certificate-sword-art-online-gamebanana-died-text-rectangle-logo.png"
    }
    //metodos
    draw(){
        //hacer que el background se mueva
        //loop infinito 
        if(this.x < -canvas.width){
            this.x = 0
        }
        this.x --;

        //dibujar imagen en canvas!!!
        //drawImage(Imagen,x,y,w,h)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        )
    }

    gameOver(){
        //colocar letras
        //ctx.font = "80px Arial"
        //ctx.fillText="Te moriste!!"
        ctx.drawImage(
            this.gamerOverPic,
            300,
            140,
            400,
            400
        )
    }
}
//flappy
class Flappy{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height= h;
        this.image = new Image();
        this.image.src = "images/flappy.png" // "./" => en este mismo nivel; "../" => un nivel antes

        this.vy = 2 //gravity
        this.userPull= 0; //
    }

    draw(){
        //validar gravedad
        this.vy = this.vy + (gravity - this.userPull)
        //validar que el flppy no salga del canvas
        if(this.y <= 0){
            this.userPull = 0;
            this.y=2;
            this.vy=2;
        }
        //modificamos su "Y" con la gravedad
        if(this.y + this.height < canvas.height){
            this.y +=  this.vy;
        }

        //dibujamos al flappy!
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    collision(item){

        return (
            this.x < item.x + item.width &&
            this.x+ this.width > item.x &&
            this.y < item.y + item.height &&
            this.y + this.height > item.y
        )
    }
}

//pipes

class Pipe extends Flappy{
    constructor(pos,x,y,h){
        super(x,y,50,h)
        this.image.src =
        pos === "top" //condicion
        ? "images/obstacle_top.png"
        : "images/obstacle_bottom.png"
        //(condicion) "?" true  ":" false 
    }

    draw(){
        //movemos el pipe
        this.x -= 2;
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

class Bullet extends Flappy{
    constructor(x,y){
        super(x,y,50,50)
        this.image.src="images/haduken.jpg";
    }

    draw(){
        this.x+= 2;
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}