window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  function startGame() {
    var img = new Image();
    img.src = 'images/bg.png';
    var CanvasXSize = 750;
    var CanvasYSize = 500;
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
        x = CanvasXSize - imgW;
      }
      if (imgW > CanvasXSize) {
        clearX = imgW;
      } else {
        clearX = CanvasXSize;
      }
      if (imgH > CanvasYSize) {
        clearY = imgH;
      } else {
        clearY = CanvasYSize;
      }
      ctx = document.getElementById("canvas").getContext("2d");
      return setInterval(draw, speed);
    };

    function draw() {
      ctx.clearRect(0, 0, clearX, clearY);
      if (imgW <= CanvasXSize) {
        if (x > CanvasXSize) {
          x = -imgW + x;
        }
        if (x > 0) {
          ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        if (x - imgW > 0) {
          ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
      } else {
        if (x > CanvasXSize) {
          x = CanvasXSize - imgW;
        }
        if (x > CanvasXSize - imgW) {
          ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
      }
      ctx.drawImage(img, x, y, imgW, imgH);
      x += dx;
    }
  }
};
