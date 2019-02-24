window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    canvas.start();
  }

};


let canvas = {  
  image : new Image(),  
  canvas : document.createElement('canvas'), 
  speed: -1,
  x : 0,
  frames: 220,
  start : function () {
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 880;
    this.canvas.height = 470;
    this.image.src = './images/bg.png';   
    this.image.onload = updateGame();  
    document.getElementById('game-board').appendChild(this.canvas);
  },  
  bkgMove : function () {
    this.x += this.speed;
    this.x %= this.canvas.width;
  },
  bkgDraw :  function (){
    this.context.drawImage(this.image, this.x, 0);
    if (this.speed < 0){
      this.context.drawImage(this.image, this.x + this.canvas.width, 0);
    } else {
      this.context.drawImage(this.image, this.x - this.image.width, 0);      
    }
  },
  updateCanvas : function (){
    this.bkgMove() 
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bkgDraw();
  }
}
let myObstacles = [];

function updateGame (){
    canvas.updateCanvas()
    canvas.frames +=1;
    if (canvas.frames % 240 === 0) {
      x = canvas.canvas.width;
      minHeight = 20;
      maxHeight = 200;
      height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
      minGap = 50;
      maxGap = 200;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      myObstacles.push(new Component(10, height, "green", x, 0));
      myObstacles.push(new Component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].x += -1;
      myObstacles[i].update();
    }
    requestAnimationFrame(updateGame);
}

//Component 
function Component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
      ctx = canvas.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}