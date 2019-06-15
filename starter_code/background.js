//creando el background
class Background {
  constructor (ctx, canvasW, canvasH){
    this.ctx = ctx; 
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.img = new Image();
    this.img.src = 'images/bg.png';

    this.x = 0
    this.y = 0

    // crear un parámetro para asignarlo al movimiento
    this.dx = 10    //hay que calcular el movimiento, prueba 5,10,15,20
  }

  //dibujando el background
  draw (){   // sino ponerlo con una arrow function de esas " draw =()=>{} "
    this.ctx.drawImage( 
      this.img,
      this.x, this.y, this.canvasW, this.canvasH
    )
  
  //dibujando el segundo background para efecto movimiento
    this.ctx.drawImage(
      this.img,
      this.x + this.canvasW, this.y, this.canvasW, this.canvasH
    )
  }

  //moviendo el background
  move (){
    this.x -= this.dx;
    if(this.x < -this.w){
      this.x = 0;
    }
  }
}