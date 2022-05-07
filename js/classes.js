//clase para el BACKGROUND
class Background{
    constructor(w,h){
        this.x=0;
        this.y=0;
        this.width=w;
        this.height=h;
        this.img= new Image();
        this.img.src="images/bg.png"
    }
    draw(){

        //loop infinito para mover el fondo
        if(this.x < -canvas.width){
            this.x =0;
        }
        //mueve el canvas
        this.x --;


        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
      //agregams otra imagen
      ctx.drawImage(
      this.img,
      this.x+this.width,
      this.y,
      this.width,
      this.height  
      )
    }

}


//flappy

class Flappy {
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.width=w;
        this.height=h;
        this.img= new Image();
        this.img.src="images/flappy.png"
        //van mis cosas extra!!
        this.vy =2 //gravity
        this.userPull=0; //cuanto quiero que el flapy se mantenga flotando 

    }
    draw(){
        //validar gravedad
                                    //la fuerza que se le aplica con el espacio
        this.vy=this.vy +(gravity - this.userPull)

        //validar que el flappy no se salga del canvas y=0
        if (this.y <= 0){
            this.userPull =0;
            this.y=2;
            this.vy =2;
        }

        //modificar su gravidad "Y"
        if(this.y + this.height < canvas.height){
            this.y += this.vy;
        }


        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)

    }
    //collision!!
    //solo retorna un true  || flase
    collision(item){
        return(
            this.x < item.x + item.width && //validamos si mi imagen entra en el obstaculo
            this.x + this.width > item.x &&// si el obstaculo entra en mi imagen 
            this.y < item.y + item.height &&
            this.y + this.height > item.y

        )
    }

}

class Pipe extends Flappy{
            //(top,x,y,h)
    constructor(pos,x,y,h){
    super(x,y,50,h)
    this.img.src=
    pos === "top"// condition
    ? "images/obstacle_top.png"
    :"images/obstacle_bottom.png"
    }

    draw(){
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