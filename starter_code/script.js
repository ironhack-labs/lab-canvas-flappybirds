window.onload = function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d"); 
    var background= new Background;
    var flappy = new ComponentFlappy;
    var obst=new Obstacles;
    
    background.draw();
    flappy.draw();

    document.getElementById("start-button").onclick = function() {
        startGame();
    };

    
  function updateGameArea() {
        //background
        background.move();    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw();
        
        // flappy
        flappy.move();
        flappy.draw();

        //obstaculos
        obst.move();
        obst.drawTop();
        obst.move();
        obst.drawBtm();

        
        //limite del suelo y del techo 
        if(flappy.y + flappy.speedY > canvas.height-flappy.height || flappy.y < 0){
            cancelAnimationFrame(updateGameArea);
            console.log("game over");
        } else {
            requestAnimationFrame(updateGameArea);
        }
        // detectar colinsiones
        if (obst.x < flappy.x + flappy.width &&
            obst.x > flappy.x &&
            obst.y < flappy.y + flappy.height &&
            obst.y > flappy.y ) {
                cancelAnimationFrame(updateGameArea);
                console.log("game over");
                    
            }
        }


  function startGame() {
    document.getElementById("start-button").disabled=true;
    updateGameArea();
}



  }
