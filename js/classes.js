//primero una clase para el background

class background {
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = w;
    this.height = h;
    this.img = new Image(); //esta es nativa de JS.
    //ahora img vale = {src:"",onload:()=>{},}
    this.img.src = "images/bg.png";
  }
  //metodos:
  draw() {
if(this.x<-canvas.width){
    this.x = 0
}
// mueve el canvas:
this.x --
//dibujo el primer canvas
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //agregamos otra imagen:
    ctx.drawImage(this.img, this.x+this.width, this.y, this.width, this.height);
  }
}

//Flappy

class Flappy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.img = new Image();
    this.img.src = "images/flappy.png";
    this.vy = 2; //gravity
    this.userPull = 0;
  }
  draw() {
//validar gravedad
this.vy = this.vy + (gravity - this.userPull)

if(this.y <= 0)
{
    this.userPull = 0;
    this.y = 2;
    this.vy = 2

}

//modificar su gravedad (y de mi flappy)
if(this.y+this.height < canvas.height){
    this.y += this.vy
}



    //vamos a pintar al flappy
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  //collision!!
  //esta funcion solo retorna un true

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    ); //pongo parentesis porque es un return multilinea
  }
}

//extends

class Pipe extends Flappy{
//top,x,y,h
    constructor(pos,x,y,h){
        super(x,y,50,h)
        this.img.src = 
        pos === "top"
        ? "images/obstacle_top.png"
        : "images/obstacle_bottom.png" //if ternario, esto es una condicion
    }

draw(){
    this.x -= 2;
    ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
}

}
