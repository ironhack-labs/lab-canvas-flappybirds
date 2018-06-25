function Game(canvadId) {
  this.canvas = document.getElementById(canvadId);
  this.ctx = this.canvas.getContext("2d");


  this.reset();
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//px-msec
var gravity = 0.2; 
    

var flappy = {
  x: 100,
  y: 100,
  vx: 0,
  vy: 0,
  userPull:0,
  radius: 25,
  color: '#2e7d32',
  
  
  update: function(delta){
    
    
    var g = gravity / delta;
    var pull = this.userPull;
    flappy.vy += g - pull;
    flappy.x += flappy.vx * delta;
    flappy.y += flappy.vy * delta;
     console.log(flappy);
    // Limits in X axis for canvas
    if((flappy.x+flappy.vx) >= canvas.width || (flappy.x+flappy.vx) <= 0){
      flappy.vx *= -0.8;
    }
    
    
    // Limits in Y axis for canvas
    if((flappy.y+flappy.vy) >= canvas.height || (flappy.y+flappy.vy) <= 0){
      flappy.vy *= -0.8;
    }
    
    if(flappy.y >= canvas.height){
      flappy.y = canvas.height;
    }

  }
};



document.onkeydown = function(e) {
  if(e.keyCode == 32){
    flappy.userPull = 0.05;
  }
}

document.onkeyup = function(e) {
  if (e.keyCode == 32) {
    flappy.userPull = 0;
  }
};

var prevTime = 0;
function update(time) {
  var delta = time - prevTime;
  prevTime = time;
  ctx.clearRect(0,0, canvas.width, canvas.height);

  flappy.update(delta);
  flappy.draw();

  window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)


Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);
}