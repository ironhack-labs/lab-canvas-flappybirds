window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  var canvas = document.getElementById("flappy-canvas");
  var ctx = canvas.getContext("2d");

  var img = new Image();
  img.src = "images/bg.png";
  var CanvasXSize = 900;
  var CanvasYSize = 650;
  var speed = 30;
  var scale = 1.05;
  var y = 0;

  var dx = 0.75;
  var imgW;
  var imgH;
  var x = 0;
  var clearX;
  var clearY;
  var ctx;

  img.onload = function() {
    imgW = img.width * scale;
    imgH = img.height * scale;
    if (imgW > CanvasXSize) { 
      x = CanvasXSize - imgW; }
    if (imgW > CanvasXSize) { clearX = imgW; }
    else { clearX = CanvasXSize; }
    if (imgH > CanvasYSize) { clearY = imgH; }
    else { clearY = CanvasYSize; }
    ctx = document.getElementById('flappy-canvas').getContext('2d');
    return setInterval(draw, speed);
}

  function startGame() {
    
  }
};


