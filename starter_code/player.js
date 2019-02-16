//caracter principal del juego
function Player(game) {
  this.game = game;
 
  this.x = this.game.canvas.width * 0.08;

  // guardar posición original (suelo)
  this.y0 = this.game.canvas.height * 0.8;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'images/flappy.png';
  // console.log(this.img)

 

  // medidas de la imagen a representar en el canvas
  this.w = 70;
  this.h = 75;
  this.x = 400;
  this.y = 250;
  //console.log(this.img)
  // this.vy = 1;

  // this.bullets = [];

  // this.setListeners();
}

Player.prototype.draw = function() {
  
  this.game.ctx.drawImage(
  this.img,
  this.x,
  this.y,
  this.w,
  this.h)
  console.log(this.img)
}