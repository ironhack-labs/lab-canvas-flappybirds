window.onload = function() {
  console.log("hello");
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
      myGameAre.draw();
    }, 1000/100)
  }

  var myGameAre = {
    canvas: document.createElement("canvas"),
    x: 0,
    y: 0,
    
    start: function() {
      this.canvas.width = 800;
      this.canvas.height = 600;
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").appendChild(this.canvas); 
    },

    draw: function(){
        this.context.drawImage(img, this.x, this.y);
        this.x--;
        this.x %= this.canvas.width;
      }  
    }
  


  






};
