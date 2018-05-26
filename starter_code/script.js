window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

    var canvas = document.getElementById("flappy");
    var ctx = canvas.getContext("2d");

    function Board(){
      this.x = 0;
      this.y = 0;
      this.width = canvas.width;
      this.height = canvas.height;
      this.score = 0;
      this.img = new Image();
      this.img.src = "images/bg.png";
      this.sound = new Audio();
      this.sound.src = "http://66.90.93.122/ost/dark-souls-prepare-to-die-edition/bkkpkxkl/15_Ornstein%20%26%20Smough.mp3";
      this.soundGrameOver = new Audio();
        this.soundGrameOver.src = "http://66.90.93.122/ost/dark-souls-prepare-to-die-edition-2012-gamerip/roxwxwtu/110%20-%20Thru%20Death.mp3";

      this.img.onload = function() {
        this.draw();
      }.bind(this);

      this.move = function(){
        this.x--;
        if(this.x < -canvas.width){
          this.x = 0;
        }
      }

      this.draw = function(){
        this.move();
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.img,this.x + this.width,this.y,this.width,this.height);
      }
      this.drawScore = function() {
        this.score = Math.floor(frames/60);
        ctx.font = "50px courier";
        ctx.fillStyle = "violet";
        ctx.fillText(this.score,this.width/2,this.y+50);
      }
    }

      //declaraciones
      var inter;
      var frames = 0;
      var board = new Board();
      var flappy = new Flappy();
      var pipes = [];

      //main

      function update(){
        generatePipes();
        frames++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        board.draw();
        flappy.draw();
        drawPipes();
        board.drawScore();
        checkColition();
      }

      function Flappy(){
        this.x = 150;
        this.y = 150;
        this.width = 50;
        this.height = 50;
        this.img = new Image();
        this.img.src= "http://allaboutwindowsphone.com/images/appicons/284761.png";
        this.sound = new Audio();
        this.sound.src = "images/mario-jump.wav";
        
        this.img.onload = function(){
          this.draw();
       }.bind(this);

       this.draw = function() {
         this.y += 1;
         ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
         if(this.y < 0 || this.y > canvas.height - this.height){
          gameOver();
         }
       }

       this.move = function(){
         this.y -= 50;
       }
       this.isTouching = function(pipe) {
        return (this.x < pipe.x + pipe.width) && (this.x + this.width > pipe.x) && (this.y < pipe.y + pipe.height) && (this.y + this.height > pipe.y);
       }
      }

      //aux
      function gameOver(){
        stop();
        ctx.font = "80px courier";
        ctx.strokeStyle = "red";
        ctx.lineWidth = 8;
        ctx.strokeText("You are dead", 50, 200);

      }
      function stop(){
        clearInterval(inter);
        inter = 0;
        board.sound.pause();
        board.soundGrameOver.play();
      }

      function generatePipes(){
        if(!(frames% 300 === 0)){
          return
        }
        var ventana = 150;
        var randomHeight = Math.floor(Math.random() * 200) + 50;
        var pipe = new Pipe(0, randomHeight, true);
        var pipe2 = new Pipe(randomHeight + ventana, canvas.height - (randomHeight + ventana), false);
        pipes.push(pipe);
        pipes.push(pipe2);
      }
      function drawPipes(){
        pipes.forEach(function(pipe){
          pipe.draw();
        });
      }

      function checkColition(){
        pipes.forEach(function(pipe){
          if(flappy.isTouching(pipe)){
            gameOver();
          }
        })
      }

      //Pipes
      function Pipe(y, height,type){
        this.x = canvas.width;
        this.y = y;
        this.width = 50;
        this.height = height;
        this.img = new Image();
        this.img.src = "images/obstacle_top.png";
        this.img2 = new Image();
        this.img2.src = "images/obstacle_bottom.png";
        this.draw = function(){
          this.x--;
          if(type){
            ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
          }else {
            ctx.drawImage(this.img2,this.x,this.y,this.width,this.height);
          }
        }
      }

      //listeners
     addEventListener("keydown", function(e){
      
      if(e.keyCode === 32){
          
          flappy.move();
          flappy.sound.currentTime = 100;
          flappy.sound.play();
        }
      });

  function startGame() {
    if(inter > 0){
      return;
    }
    inter = setInterval(function(){
     update(); 
    },1000/60);
    
    board.sound.play();
  }
  
};
