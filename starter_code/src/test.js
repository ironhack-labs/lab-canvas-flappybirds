window.onload = function() {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var img = new Image();
  img.src = "images/bg.png";

  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame(){
    myGameAre.start();
    setInterval(function() {
      updateCanvas();
    }, 1000)
  }

  var myGameAre = {
    canvas: document.createElement("canvas"),
  
    start: function() {
      this.canvas.width = 800;
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").appendChild(this.canvas); 
    },
  }

  var backgroundImage = {
    img: img,
    x: 0,
    speed: -1,

    move: function(){
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function(){
      context.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        context.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        context.drawImage(this.img, this.x - this.img.width, 0);
      }
    }
  }

    function updateCanvas(){
      backgroundImage.move();
    
      context.clearRect(0, 0, canvas.width, canvas.height);
      backgroundImage.draw();
    
      requestAnimationFrame(updateCanvas);
    }
  



};
