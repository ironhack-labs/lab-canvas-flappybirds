

function Canvas(id) {

  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext("2d");

  this.fps = 60;
  this.spaceBarKeyCode = 32;

  this.bgX = 0;
  this.bgY = 0;
  this.bgW = 900;
  this.bgH = 500;

  this.bX = 150;
  this.bY = 225;

  this.bWidth = 50;
  this.bHeight = 40;
  this.bSpeedX = 1; // b --> bird
  this.bSpeedY = 1;
  this.bGravity = 0.005;
  this.bGravitySpeed

}

Canvas.prototype.draw = function () {
  this.ctx.beginPath();


  // var img = new Image()
  // img.src = './images/bg.png';
  // this.ctx.drawImage(img, 0, 0, 800, 450);
  this.bgImg();
  this.birdImg();


  this.ctx.closePath();
}

Canvas.prototype.bgImg = function () {
  var img = new Image()
  img.src = './images/bg.png';
  this.ctx.drawImage(img, this.bgX, this.bgY, this.bgW, this.bgH);
  this.ctx.drawImage(img, this.bgX + this.bgW, this.bgY, this.bgW, this.bgH);

}

Canvas.prototype.bgMove = function () {
  this.bgX -= 1;
  if (this.bgX < -900) {
    this.bgX = 0;
  }
}

Canvas.prototype.birdImg = function () {
  var img = new Image()
  img.src = './images/flappy.png';
  this.ctx.drawImage(img, this.bX, this.bY, this.bWidth, this.bHeight);
}

Canvas.prototype.birdListener = function () {
  
  document.onkeydown = function (e) {
    e.preventDefault();
    console.log(this.spaceBarKeyCode)
    if (e.keyCode === this.spaceBarKeyCode) {
      this.bY -= 40; 
      this.bSpeedY -= 10
      if(this.bY <=this.bgH){
        this.by = 1
        this.bSpeedY = 0 
      }
      

    } 
  }.bind(this)
}

Canvas.prototype.birdMove = function (){

  this.bSpeedY += this.bGravity
  this.bY += this.bSpeedY;

}


Canvas.prototype.tubeBottomDraw = function(){

  var img = new Image()
  img.src = './images/obstacle_bottom.png';
  this.ctx.drawImage(img, this.tbBX, this.tbBY, this.tbBW, this.tbBH);

}


window.onload = function () {

  var canvas = new Canvas("canvas");
  canvas.draw();


  document.getElementById("start-button").onclick = function () {
    startGame();

  };

  function startGame() {

    var id = setInterval(function () {

      canvas.draw();
     
      canvas.bgMove();
      canvas.birdMove();
      canvas.birdListener();

    }, 1000 / this.fps);


  }
};


