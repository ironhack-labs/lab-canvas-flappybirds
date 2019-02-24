window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
  };

  // area / lienzo / canvas
  function MyGameArea() {
    this.canvas = document.createElement('canvas');
    
  }
  
  MyGameArea.prototype.background = function () {
    this.canvas.width = 900;
    this.canvas.height = 400;
    this.canvas.id = 'canvas';
    this.context = this.canvas.getContext("2d");
    document.getElementById('game-board').appendChild(this.canvas);
    this.img = new Image(600,800);
    this.img.src = 'images/bg.png';
    console.log(this.img)
  }  
  
  var myGameArea = new MyGameArea();
  myGameArea.background();
  
  
  
  
  


};


//var myGameArea = {
//  canvas : document.createElement('canvas'),
//  start : function() {
//    this.canvas.width = 900;
//    this.canvas.height = 400;
//    this.canvas.id = 'canvas';
//    this.context = this.canvas.getContext("2d");
//    document.getElementById('game-board').appendChild(this.canvas);
//  }
//}
//myGameArea.start();
