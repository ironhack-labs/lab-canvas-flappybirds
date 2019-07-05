// window.onload = function() {
//   document.getElementById("start-button").onclick = function() {
//     startGame();
//   };

//   function startGame() {

//   }

// };

      // 1. Hacer las configuraciones iniciales.
      // 2. Crear la función constructora Board y dentro crear las propiedades y el método draw() donde se pondrá la imagen.
      // 3. Crear la instancia de Board().
      // 4. Crear la function update() y dentro hacer un clearRect() para borrar la pantalla cada vez que actualiza, sumarle 1 a frames y llamar el método draw() de la instancia board.
      // 5. Animar el fondo para que vaya para atrás.
      // 6. Crear la función constructora Player y dentro poner las propiedades y el método draw() donde se pondrá la imagen recortada del sprite y la gravedad.
      // 7. Crear la instancia player y llamar el método draw() de la instancia player dentro de update().
      // 8. Animar el sprite.
      // 9. Crear el listener para mover al player.
      // 10. Crear la función constructora de Pipes().
      // 11. Crear la función de updateObstacles().

      // 12. Checar colisión creando el método crashWith() dentro de Player y crear la función.

      // 13. Crear la función gameOver() con el texto de volver a empezar.
      // 14. Llamar la función start() para comenzar el juego.


      // VARIABLES


      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');

      canvas.width = 900;
      canvas.height = 500; 

      var interval;
      var frames = 0;
      var currentFrame = 0;
      var gravity = 2;
      var obstacles = [];
      var gameOver = false;


      





      // CLASES

      class Board {
        constructor() {
          this.x = 0;
          this.y = 0;
          this.w = canvas.width;
          this.h = canvas.height;
          this.img = new Image();
          this.img.src = './images/bg.png';
          this.img.onload = this.draw()
        }

        draw() {
          if(this.x < -canvas.width) {
            this.x = 0;
          }
          this.x--;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
          ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
        }

      }


      class Charizard {
        constructor(x, y, w, h, srcx, srcy, srcw, srch) {

          this.srcx = srcx;
          this.srcy = srcy;
          this.srcw = srcw;
          this.srch = srch;

          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;

          this.img = new Image();
          this.img.src = './images/flappy.png';
          this.img.onload = this.draw();
        }

        draw() {
          if (this.y < canvas.height - this.h) {
            this.y += gravity;
          }
          ctx.drawImage(this.img, currentFrame * (530/4), this.srcy, this.srcw, this.srch, this.x, this.y, this.w, this.h);
        }

        crashWith(obstacle) {

          console.log(this.x < obstacle.x + obstacle.w &&
            this.x + this.w/4 > obstacle.x + 10 &&
            this.y < obstacle.y + obstacle.h - 25 &&
            this.y + (this.h - 25) > obstacle.y);

          return (
            this.x < obstacle.x + obstacle.w &&
            this.x + this.w/4 > obstacle.x + 10 &&
            this.y < obstacle.y + obstacle.h - 25 &&
            this.y + (this.h - 25) > obstacle.y
          );
        }

      }


      class Pipes {
        constructor(x, y, w, h, isTop) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          this.img = new Image();
          this.img.src = isTop ? './images/obstacle_top.png' : './images/obstacle_bottom.png';
          this.img.onload = this.draw();
        }
        draw() {
          ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
      }



      // INSTANCIAS

      var board = new Board();
      var charizard = new Charizard(50, 50, 530/4, 94, 0, 0, 530/4, 94);



      // FUNCIONES PRINCIPALES


      function start() {
        interval = setInterval(update, 1000/60)
      }

      function update() {
        if(frames % 7 === 0) {
          currentFrame = ++currentFrame % 4;
        }
        frames++;
        board.draw();
        charizard.draw();
        updateObstacles();
        checkCollition();
        score();
      }

      function gameover() {
        clearInterval(interval);
        ctx.font = "60px Avenir";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", 270, 220);
        ctx.font = "40px Avenir";
        ctx.fillText("presiona 'espacio' para reinicar", 200, 260);
        gameOver = true;
      }


      // FUNCIONES AUXILIARES


      function updateObstacles() {
        for (var i = 0; i < obstacles.length; i++) {
          obstacles[i].x += -1;
          obstacles[i].draw();
        }

        if (frames % 350 === 0) {
          var x = canvas.width;

          var minHeight = 100;
          var maxHeight = 180;
          var height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

          obstacles.push(new Pipes(x, 0, 50, height, true));
          obstacles.push(new Pipes(x, canvas.height - height, 50, height, false));
        }
      }


      function checkCollition() {
        obstacles.forEach(e => {
          if(charizard.crashWith(e)) {
            gameover();
          }
        })
      }

      function score() {
        var points = Math.floor(frames / 100);
        ctx.font = "30px serif";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + points, 730, 45);
      }




      // LISTENERS

      window.addEventListener('keydown', e => {
        if(e.keyCode === 38 && charizard.y > 15) {
            charizard.y -= 50;
        }
        if(gameOver && e.keyCode === 32) {
          location.reload();
        }
      });
      
      start();