window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  var backgroundImg = new Image();
  backgroundImg.src = "images/bg.png";

  var ctx = canvas.getContext("2d");
  var playerImg = new Image();
  playerImg.src = "images/flappy.png";

  function startGame() {
    var canvas = document.getElementById("canvas");

    var CanvasXSize = 1100;
    var CanvasYSize = 600;
    var speed = 30;
    var scale = 1.05;
    var y = 0;

    var dx = 0.75;
    var imgW;
    var imgH;
    var x = 300;
    var clearX;
    var clearY;
    var ctx;

    imgW = backgroundImg.width * scale;
    imgH = backgroundImg.height * scale;
    if (imgW < CanvasXSize) {
      x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
      clearX = imgW;
    } else {
      clearX = CanvasXSize;
    }
    if (imgH < CanvasYSize) {
      clearY = imgH;
    } else {
      clearY = CanvasYSize;
    }
    ctx = document.getElementById("canvas").getContext("2d");
    return setInterval(draw, startGame);

    function draw() {
      ctx.clearRect(0, 0, clearX, clearY);
      if (imgW <= CanvasXSize) {
        if (x > CanvasXSize) {
          x = -imgW + x;
        }
        if (x > 0) {
          ctx.drawImage(backgroundImg, -imgW + x, y, imgW, imgH);
        }
        if (x - imgW > 0) {
          ctx.drawImage(backgroundImg, -imgW * 2 + x, y, imgW, imgH);
        }
      } else {
        if (x > CanvasXSize) {
          x = CanvasXSize - imgW;
        }
        if (x > CanvasXSize - imgW) {
          ctx.drawImage(backgroundImg, x - imgW + 1, y, imgW, imgH);
        }
      }
      ctx.drawImage(backgroundImg, x, y, imgW, imgH);
      x += dx;
      player.draw();
    }
  }

  var player = {
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
    gravity: 0.6,
    //gravitySpeed: 0.6,

    draw: function() {
      var playerImgW;
      var playerImgH;
      var scale = 0.1;
      playerImgW = playerImg.width * scale;
      playerImgH = playerImg.height * scale;
      ctx.drawImage(playerImg, 200, 250, playerImgW, playerImgH);
    },

    move: function() {
      if (document.onkeyup() === true) {
        y = player.speedY -= gravity;
        player.newPos();
      }
    },

    newPos: function() {
      x = 0;
      y = -speedY;
    }
  };
};

var keysPressed = {
  space: false
};
var SPACE_KEY = 32;

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case SPACE_KEY:
      keysPressed.space = true;
      break;
  }
};
document.onkeyup = function(event) {
  switch (event.keyCode) {
    case SPACE_KEY:
      keysPressed.space = false;
      break;
  }
};
