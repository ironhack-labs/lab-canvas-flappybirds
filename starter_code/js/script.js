window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var myObstacles = [];

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //px-msec
    var gravity = 0.2;

    var backgroundImage = {
      x: 0,
      speed: -1,
      move: function() {
        this.x += this.speed;
        this.x %= canvas.width;
      },

      draw: function() {
        var img = new Image();

        img.src =
          "https://photos-6.dropbox.com/t/2/AAD1W_t1sasmlD2B5s2vnkw3jdYBTfPPzt-m_K4zEel0FQ/12/713689773/png/32x32/1/_/1/2/bg.png/EN6Uj_EFGIevBCAHKAc/HKPvHAQzGDRFlzqofXEFyKL_JmCZSQJ2WS2IFd58lNk?preserve_transparency=1&size=800x600&size_mode=3";
        ctx.drawImage(img, this.x, 0, canvas.width, canvas.height);
        if (this.speed < 0) {
          ctx.drawImage(
            img,
            this.x + canvas.width,
            0,
            canvas.width,
            canvas.height
          );
        } else {
          ctx.drawImage(
            img,
            this.x - img.width,
            0,
            canvas.width,
            canvas.height
          );
        }
      }
    };

    var ball = {
      x: 100,
      y: 100,
      vx: 0,
      vy: 0,
      userPull: 0,
      radius: 25,
      color: "#2e7d32",
      draw: function() {
        var img2 = new Image();
        img2.src =
          "https://photos-2.dropbox.com/t/2/AADyVAz9vU-Xd5fQ8ME4AA0HRqQ-BWY9oUEH75irv13teg/12/713689773/png/32x32/1/_/1/2/flappy.png/EN6Uj_EFGIevBCAHKAc/MAGlCSKQlx4HmIRvgGC00V3dBHpxVct3MfbtxC_QyH4?preserve_transparency=1&size=2048x1536&size_mode=3";

        ctx.drawImage(img2, ball.x, ball.y, 50, 50);
      },

      update: function(delta) {
        var g = gravity / delta;
        var pull = this.userPull;
        ball.vy += g - pull;
        ball.x += ball.vx * delta;
        ball.y += ball.vy * delta;
        console.log(ball);
        // Limits in X axis for canvas
        if (ball.x + ball.vx >= canvas.width || ball.x + ball.vx <= 0) {
          ball.vx *= -0.8;
        }

        // Limits in Y axis for canvas
        if (ball.y + ball.vy >= canvas.height || ball.y + ball.vy <= 0) {
          ball.vy *= -0.8;
        }

        if (ball.y >= canvas.height) {
          ball.y = canvas.height;
        }
      }
    };

    var pipes = {
      x: 0,
      speed: -1,
      move: function() {
        this.x += this.speed;
        this.x %= canvas.width;
      },

      draw: function() {
        var imgA = new Image();

        var imgB = new Image();

        imgA.src =
          "https://photos-1.dropbox.com/t/2/AAB2CU_HGgiZ3bKjbe2Jm64RQSX7maNFHHiCoTbAj89lwA/12/713689773/png/32x32/1/_/1/2/obstacle_top.png/EN6Uj_EFGIevBCAHKAc/IEoUlHr4iM3iX-pGuFpL1VrHa9UbMnc0MI88w9-don0?preserve_transparency=1&size=2048x1536&size_mode=3";

        imgB.src =
          "https://photos-1.dropbox.com/t/2/AACvHFVtkbQICkrQTVOYG2LDA1kxWjSpY600rXpp2M1vWg/12/713689773/png/32x32/1/_/1/2/obstacle_bottom.png/EN6Uj_EFGIevBCAHKAc/coQYYrWCghx5IrT0wLLqu1UQcFG1rA5TnfuEsw2d_cQ?preserve_transparency=1&size=2048x1536&size_mode=3";

        ctx.drawImage(imgA, this.x, -500);
        ctx.drawImage(imgB, this.x, 400);
        if (this.speed < 0) {
          ctx.drawImage(imgA, this.x + canvas.width, -500);
          ctx.drawImage(imgB, this.x + canvas.width, 400);
        } else {
          ctx.drawImage(imgA, this.x - img.width, -500);
          ctx.drawImage(imgB, this.x - img.width, 450);
        }
      }
    };

    document.onkeydown = function(e) {
      if (e.keyCode == 38) {
        ball.userPull = 0.05;
      }
    };

    document.onkeyup = function(e) {
      if (e.keyCode == 38) {
        ball.userPull = 0;
      }
    };

    var prevTime = 0;
    function update(time) {
      var delta = time - prevTime;
      prevTime = time;
      backgroundImage.move();
      pipes.move();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backgroundImage.draw();

      ball.update(delta);
      ball.draw();
      pipes.draw();

      window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);
  }
};
