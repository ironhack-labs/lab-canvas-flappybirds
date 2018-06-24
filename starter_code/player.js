function Player(game) {
  this.game = game;
  this.x = 150;
  this.y = 150;
  this.img = new Image();
  this.img.src = 'images/flappy.png';
  this.width = 30;
  this.height = 30;
  this.userPull= 0;
  this.speedX = 0;
  this.speedY = 0;
  this.gravitySpeed;
}

Player.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
};

//Player.prototype.update = function() {
//  var gravity = 0.2;
//
//  var g = gravity / delta;
//  var pull = this.userPull;
//  this.speedX += g - pull;
//  this.x += this.speedX * delta;
//  this.y += this.speedY * delta;
//   console.log(Player);
//  if((this.x+this.speedX) >= canvas.width || (this.x+this.speedX) <= 0){
//    this.speedX *= -0.8;
//  }
//  
//  if((this.y+this.speedY) >= canvas.height || (this.y+this.speedY) <= 0){
//    ball.vy *= -0.8;
//  }
//  
//  if(this.y >= this.height){
//    this.y = canvas.height;
//  }
//}
//
//Player.prototype.newPos = function() {
//}
//
//document.onkeydown = function(e) {
//  if(e.keyCode == 32){
//    Player.userPull = 0.05;
//  }
//}
//document.onkeyup = function(e) {
//  if (e.keyCode == 32) {
//    Player.userPull = 0;
//  }
//};