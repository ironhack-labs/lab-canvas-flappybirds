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
  start : function () {
    this.context = this.canvas.getContext('2d')
    this.canvas.width = 880;
    this.canvas.height = 470;
    this.image.src = './images/bg.png';   
    this.image.onload = updateCanvas();  
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
  }
}

function updateCanvas (){
    canvas.bkgMove() 
    canvas.context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.bkgDraw();
    requestAnimationFrame(updateCanvas);
}