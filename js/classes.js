//Background

class Background {
  //constructor
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = w;
    this.height = h;
    this.img = new Image();
    //img = {src: "", onload: ()=> {},...}
    this.img.src = "images/bg.png";
  }
  //methods
  draw() {
    //animarlo
    //loop infinito
    if (this.x < -canvas.width) {
      this.x = 0;
    }
    //mueve el canvas
    this.x--;

    //(imagen, x,y,w,h)
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    //agregamos otra imagen
    ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

//Flapy
class Flappy {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.img = new Image();
    //img = {src: "", onload: ()=> {},...}
    this.img.src = "images/flappy.png";
    //van mis cosas extra!!
    this.vy = 2; // gravity (velocidad con la que va a caer)
    this.userPull = 0; //cuanto quiero que avance
  }
  //methods
  draw() {
    //validar gravedad
    this.vy = this.vy + (gravity - this.userPull);

    // validar que el flappy no se salga del canvas y= 0
    if (this.y <= 0) {
      this.userPull = 0;
      this.y = 2;
      this.vy = 2;
    }

    // modificar su gravedad "y"
    if (this.y + this.height < canvas.height) {
      this.y += this.vy;
    }

    //(imagen, x,y,w,h)
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  //collision!!
  //esta funcion solo retorna un true || false
  // nos sirve para sumar puntos
  collision(item) {
    //&& si uno es falso, el resultado es falso
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
}

class Pipe extends Flappy {
  //top,x,y,h
  constructor(pos, x, y, h) {
    super(x, y, 50, h);
    this.img.src =
      pos === "top" ? "images/obstacle_top.png" : "images/obstacle_bottom.png";
  }
  draw() {
    this.x -= 2;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
