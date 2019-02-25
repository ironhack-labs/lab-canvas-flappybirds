window.onload = function() {
  document.getElementById('start-button').onclick = function() {
    startGame();
  };

  // area / lienzo / canvas
  function myGameArea() {
    canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    canvas.id = 'canvas';
    context = this.canvas.getContext("2d");
    document.getElementById('game-board').appendChild(this.canvas);
    var img = new Image();
    img.onload = function() {
      context.drawImage(img,0,0);
    }
    img.src = 'images/bg.png';
    
  }  
myGameArea();

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
