class Player{
  constructor(ctx, canvasW, canvasH, keys){
    this.ctx = ctx
    this.canvasW = canvasW
    this.canvasH = canvasH
    this.keys = keys

    //tamaño del pez
    this.w = 70
    this.h = 50

    //posición del pez

    this.x = this.canvasW / 4
    //guardar posicion original del pez
    this.y0 = this.canvasH / 2;
    this.y = this.y0;

    //ponerle velocidad al pez
    this.vel0 = 0;
    this.velJump = 10;
    this.velY = this.vel0;

    //dibujando al pez
    this.img = new Image();
    this.img.src = 'images/flappy.png';

    this.setListeners();
  }

  draw = () =>{
    this.ctx.drawImage(
      this.img, this.x, this.y, this.w, this.h
    )
  }
  setListeners() {   //sino probar así setListener = ()=>{}
    document.onkeydown = (e) =>{     // o con windows.onkeydown
      if (e.keyCode === this.key) {
        this.y--;
        this.velY = -this.velJump
        this.gravity = 0.4
    }
   }
  }
  move = () =>{
      this.velY += this.gravity;
      this.y += this.velY;
      
  }
  
        
}