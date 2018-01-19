window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").setAttribute("class", "disabled");
    startGame();
  };

  function startGame() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var canvasSize = { w: canvas.width, h: canvas.height };
    window.gravity = 0.1;

    var img = new Image();
    img.src = "./images/bg.png";
  //  var CanvasXSize = 900;
  //  var CanvasYSize = 500;
    var speed = 30;
    //var scale = 1.05;
    var y = 0;

    var dx = -0.75;
    var imgW = 900;
    var imgH = 505;
    var x = 0;
    var clearX;
    var clearY;
    //var ctx;

    img.onload = function() {
      //imgW = img.width * scale;
      //imgH = img.height * scale;
      if (imgW > canvasSize.w) {
        x = CanvasXSize + imgW;
      }
      if (imgW >  canvasSize.w) {
        clearX = imgW;
      } else {
        clearX = canvasSize.w;
      }
      if (imgH > canvasSize.y) {
        clearY = imgH;
      } else {
        clearY = canvasSize.y;
      }
      //ctx = document.getElementById('canvas').getContext('2d');
      return setInterval(draw, speed);
    };

    function draw() {
      console.log(x);
      ctx.clearRect(0, 0, clearX, clearY);
      if (imgW <= canvasSize.w) {
        if (x > canvasSize.w) {
          x = -imgW + x;
        }
        if (x > 0) {
          ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        if (x - imgW > 0) {
          ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
      } else {
        if (x > canvasSize.w) {
          x = canvasSize.w - imgW;
        }
        if (x > canvasSize.w - imgW) {
          ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
      }
      x -= dx;
      ctx.drawImage(img, x, y, imgW, imgH);
          bird.update();
           bird.render();
    }

    var bird = createBird(ctx, canvasSize);

    function update() {
      ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);
    }
    setInterval(draw, 20);

    document.onkeydown = function(e) {
      if (e.keyCode == 32) {
        bird.userPull = 0.3;
      }
    };

    document.onkeyup = function(e) {
      if (e.keyCode == 32) {
        bird.userPull = 0;
      }
    };
  }
};
