window.onload = function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  document.getElementById("start-button").onclick = function() {
    startGame(ctx);
    
  };
  function startGame(ctx) {
    var background = new Background(1000,600);
    var bird= new Bird(100,100);
    var ctx = ctx 
      background.draw(ctx);
      bird.draw(ctx);
    }
  } 

function Bird(x,y){
  this.x=x;
  this.y=y;
  this.width;
  this.height;
  this.speedX;
  this.speedY;
  this.gravity;
  this.gravitySpeed;
  this.img = new Image();
  this.img.src = "images/flappy.png";
}

function Background(ctx) {
  ctx = ctx;

  this.img = new Image();
  this.img.src = 'images/bg.png';

  this.x = 0;
  this.y = 0;

  this.dx = 5;
}

var background = new Background();

setInterval (function() {
  background.draw();
  background.move();
},1);

Background.prototype.draw = function(ctx) {
  ctx.drawImage(this.img, this.x, this.y, 1000, 600);
  ctx.drawImage(this.img, this.x + 1000, this.y, 1000, 600);
};

Background.prototype.move = function() {
  this.x -= this.dx;

  if (this.x < -1000) this.x = 0;
};

Bird.prototype.draw= function(ctx){
    ctx.drawImage(this.img, this.x, this.y, 50, 50);
}












