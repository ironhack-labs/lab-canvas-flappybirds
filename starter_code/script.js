window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    //*Classes
    function Board(){
      this.x =0;
      this.y = 0;
      this.width = canvas.width;
      this.height = canvas.height;
      this.score = 0;
      this.img = new Image ();
      this.img.src = "images/bg.png"
      this.sound = new Audio();
      this.sound.src = "http://66.90.93.122/ost/super-mario-bros.-1-3-anthology/gczrgwrx/1%2001%20Main%20Theme%20Overworld.mp3"

      //necesitamos que se pinta y recorra, ek mapa se mueve
     //cuando se carge es metodo y necesita funcion
     this.img.onload = function(){
       this.draw();
     }.bind(this);//haz alusion al Board

     this.move = function(){
       (this.x < -canvas.width) ? this.x = 0 : this.x--;
      }
       //se mueve en x negativo
      
       //dibujar la imagen
       this.draw = function (){
         this.move();
         ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height);
         ctx.drawImage(this.img, this.x+this.width, this.y, canvas.width, canvas.height);
       }
         this.drawScore = function () {
           this.score = Math.floor(frames /60);
           ctx.font = "50px Avenir";
           ctx.fillStyle = "orange";
           ctx.fillText(this.score, this.width/2, this.y+50)
         }
     }



     //Flappy
    function   Flappy(){
      this.x = 150;
      this.y = 150;
      this.width = 50;
      this.height = 50;
      this.img = new Image ();
      this.img.src = "images/flappy.png"
      this.img.onload = function () {
        this.draw(); //se genera como nuevo, cuando le dices new se le pasan a la variable y se convierte en una instancia
      }.bind(this);


      this.draw = function (){
        this.y += 1; 
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        //si el flappy llega arriba o abajo perdemos, podemos hacer la siguiente validación
      if(this.y < 0 || this.y > canvas.height - this.height) 
        gameOver();//pendiente
      }
      //necesitamos que decirle que va a pasar cuando de click, haremos un metodo que le diga a y q debe pasar
      this.move = function() {
        this.y -=50;
      }

    }

    this.isTouching = function (pipe) {
      return (this.x < pipe.x + pipe.width) &&
      (this.x +this.width > pipe.x) &&
      (this.y < pipe.y + pipe.height) &&
      (this.y + this.height >pipe.y);
    };

//pipe
     function Pipe (y, height){ 
       this.x = canvas.width;
       this.y = y;
       this.width = 50;
       this.height = height;

       this.draw =function(){
         this.x --;
         ctx.fillStyle = "green";
         ctx.fillRect(this.x, this.y, this.width, this.height)
       }

     }

     addEventListener("keydown", function (e) {
       if(e.keyCode === 32){
         flappy.move();
         flappy.sound.play()


       }
     });

     //main
     function update(){
       generatePipes();
       frames++;
       ctx.clearRect(0,0,canvas.width, canvas.height);
       board.draw(); //dile que se dibuje
       flappy.draw();
       drawPipes();
       board.drawScore();

       

     }

     function stop(){
      clearInterval(interval);
      interval = 0;
      board.sound.pause();
    }

     //Declaraciones
     var interval;
     var frames = 0;
     var board = new Board();
     var flappy = new Flappy();
     var pipes = []; //aqui se guardan las dos variables, es un arreglo

     //funciones auxiliares ayudan de repente, se revisan constantemente
     function gameOver(){
       stop();
       ctx.font = "120px courier";
       ctx.strokeStyle = "red";
       ctx.lineWidth = 8;
       ctx.strokeText("Game Over", 50, 200);
     }

     function generatePipes(){
       if(!(frames % 300 === 0)) return;
       var ventanita = 150;
       var randomHeight = Math.floor(Math.random() * 200) + 50;
       var pipe= new Pipe(0, randomHeight);
       var pipe2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight + ventanita));
       //ahora guardalo y pintalo
       pipes.push(pipe);
       pipes.push(pipe2);

       
        }

        function drawPipes(){ //comenzara a revisar cuando sean muktiplos de 300 va a generar y lo va a empujar al arreglo, lo dibuja, lo recorre, los dibuja uno por uno
          pipes.forEach(function(pipe) {
         pipe.draw();
          });
          }

     function startGame(){ //rewvisa que el intervalo sea mayor que cero
      if(interval > 0) return;

      interval = setInterval(()=>{
        update();
      },1000/60);
      board.sound.play();
     }
    

    };

