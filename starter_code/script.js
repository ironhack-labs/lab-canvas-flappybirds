

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

  this.tbBX = 600;
  this.tbBY = 400;
  this.tbBW = 100;
  this.tbBH = 350;

  this.tbTX = 600;
  this.tbTY = -100;
  this.tbTW = 100;
  this.tbTH = 350;

  this.bWidth = 50;
  this.bHeight = 40;
  this.bSpeedX = 1; // b --> bird
  this.bSpeedY = 1;
  this.bGravity = 0.005;
  this.bGravitySpeed

}

Canvas.prototype.draw = function () {
  this.ctx.beginPath();
  this.bgImg();
  this.birdImg();
  this.tubeDraw();
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
      if (this.bY <= this.bgH) {
        this.by = 1
        this.bSpeedY = 0
      }


    }
  }.bind(this)
}

Canvas.prototype.birdMove = function () {

  this.bSpeedY += this.bGravity
  this.bY += this.bSpeedY;

}


Canvas.prototype.tubeBottomDraw = function () {

  var img = new Image()
  img.src = './images/obstacle_bottom.png';
  this.ctx.drawImage(img, this.tbBX, this.tbBY, this.tbBW, this.tbBH);

}
Canvas.prototype.tubeTopDraw = function () {

  var img = new Image()
  img.src = './images/obstacle_top.png';
  this.ctx.drawImage(img, this.tbTX, this.tbTY, this.tbTW, this.tbTH);

}

Canvas.prototype.tubeDraw = function () {

  this.tubeBottomDraw();
  this.tubeTopDraw();
}

Canvas.prototype.tubeMove = function () {

  var ran =0;
  var negative=0;
  this.tbBX -= 1.25;
  this.tbTX -= 1.25;

  if (this.tbBX < -85 && this.tbTX < -25) {

    this.tbBX = 925;
    this.tbTX = 925;

    if(Math.random()>= 0.5){
      negative = 1;
    }else{
      negative = -1;
    }
    
    // ran = (Math.random()*100)*negative;    
    // console.log(negative)
    // console.log(ran)
    // this.tbBY += this.tbBY+ran;
    // this.tbTY += this.tbTY+ran;

  }

}



// asdsaddsasdasdasdasdasdasdasdsadasdasdasdasdasdasdadadadasd

window.onload = function () {

  var canvas = new Canvas("canvas");
  canvas.draw();


  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {

    var id = setInterval(function () {

      canvas.draw();
      canvas.tubeMove();
      canvas.bgMove();
      canvas.birdMove();
      canvas.birdListener();
      canvas.tubeMove

    }, 1000 / this.fps);


  }
};


