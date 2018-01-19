var ctx;
var gravity = 0.1;



window.onload = function() {
  var canvas = document.createElement('canvas');
  canvas.id = "myCanvas";
  canvas.width = 900  ;
  canvas.height = 504;
  canvas.style.border = "1px solid";
  var gameBoard = document.getElementById("game-board");
  gameBoard.appendChild(canvas);

  var img = new Image();
  img.src = 'images/bg.png';
  var CanvasXSize = 900;
  var CanvasYSize = 504;
  var speed = 1000/60;
  var scale = 1;
  var x = 0;
  var y = 0;
  var dx = 0.75;
  var imgW;
  var imgH;
  var clearX;
  var clearY;
 
  ctx = document.getElementById('myCanvas').getContext('2d');
  var flappy = new createFlappy(ctx,CanvasXSize,CanvasYSize);
  var obsTop = new CreateObstacle(ctx);
  
  img.onload = function() {
     imgW = img.width * scale;
     imgH = img.height * scale;
     setInterval(render, speed);
  }



  function render() {
     ctx.clearRect(0, 0, clearX, clearY);
     if (imgW <= CanvasXSize) {
         if (x > CanvasXSize) { x = -imgW + x; }
         if (x > 0) { ctx.drawImage(img, -imgW + x, y, imgW, imgH); }
         if (x - imgW > 0) { ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH); }
     }
     else {
         if (x > (CanvasXSize)) { x = CanvasXSize - imgW; }
         if (x > (CanvasXSize-imgW)) { ctx.drawImage(img, x - imgW + 1, y, imgW, imgH); }
     }
     ctx.drawImage(img, x, y,imgW, imgH);
     obsTop.render();
     flappy.update();
     flappy.render();
     
     x += dx;
  }

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    render();
  };

  document.onkeydown = function(e) {
    if(e.keyCode == 32){
      flappy.userPull = 0.35;
    }
  }
  
document.onkeyup = function(e) {
    if (e.keyCode == 32) {
        flappy.userPull = 0;
    }
}
}

  