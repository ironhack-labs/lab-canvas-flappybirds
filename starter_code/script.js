

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function Canvas(id){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
}

  function Background(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.vx = 0;
    this.x = 0;
    this.y = 0;
    this.dx = 3;

    this.img = new Image();
    this.img.src = "../starter_code/images/bg.png"
  }

  Background.prototype.draw = function() {
   
      this.ctx.drawImage(this.img, this.x, this.y, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.img, this.x + this.canvas.width, this.y, this.canvas.width, this.canvas.height);

    }

Background.prototype.move = function(){
  this.x -= this.dx;

  if (this.x < -this.canvas.width) this.x = 0; 

}

function Player(canvas){
  
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.x = 30;
  this.y = 300;
  this.width; 
  this.height;

  this.vx = 3;
  this.vy = 3;

  this.img = new Image();
  this.img.src="../starter_code/images/flappy.png";

}
  
Player.prototype.draw = function(){

  this.ctx.drawImage(this.img, this.x, this.y, 60, 80)

}

  var canvas = document.getElementById("game");
  var ctx = canvas.getContext("2d");
  var background = new Background(canvas);
  var player = new Player(canvas);





  function startGame() {
    console.log(player.draw);
     
    setInterval(function(){

      background.draw();
      player.draw();
      background.move();


    } , 1000/60)
    
    
  }

  
};
