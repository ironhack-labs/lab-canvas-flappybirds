window.onload = function() {
  document.getElementById("start-button").onclick = function() {
   startGame();
    }
      }
  

  function startGame() {
   
    var canvasDom = document.querySelector("#canvas")
     var canvas = canvasDom.getContext("2d")
   
   var startGame = setInterval(function(){


      if(obstaclesMov.left <= 110 && obstaclesMov >= 140 && flappyMov.top <=300){
alert("Colision arriba")
clearInterval(startGame)
      }
   
      if(obstaclesMov.left <= 110 && obstaclesMov.left <= 130 &&  flappyMov.top >= 500){
        alert("Colision")
        clearInterval(startGame)
      } 
      background()
      flappy()
      var obstaculo2 = new Obstaculo();
      obstaculo2.crear();
      var obstaculo2 = new Obstaculo();
      obstaculo2.crear();
      //obstacleTop()
      obstacleBottom()

      var obstacleTop = new Image()
  obstacleTop.src = "images/obstacle_top.png"    
  obstacleTop.onload = function () {
  canvas.drawImage(obstacleTop, obstaclesMov.left + 500,0,100,300 + 230)
  }
    },200)

    


    function Obstaculo(numero){

      this.numero = numero;
      this.crear = function(){
    
        var obstacleTop = new Image()
        obstacleTop.src = "images/obstacle_top.png"    
        obstacleTop.onload = function () {
        canvas.drawImage(obstacleTop,obstaclesMov.left,0,100,300)
      }

    }

  }

    
   
   
    setInterval(function(){
      obstaclesMov.left -= 10
    },100)
    
  
  setInterval(function(){
    flappyMov.top += 15

  },100)

  

  document.addEventListener("keydown",function(e){

   
    //38 Abajo, 40 Arriba

    switch(e.keyCode){
      case 38:
      console.log("Arriba");
      flappyMov.top -= 10;
      break
      case 40:
      flappyMov.top += 10
      console.log("Abajo");
      break
      case 32:
      flappyMov.top -= 50;
      break;
    }
  

  })


  function background(){
 
  
    var background = new Image()
    background.src = "images/bg.png"
    background.onload = function () {
      canvas.drawImage(background,0,0,1000,800)
   }
  }
  
  
  var flappyMov = {

    top: 200,
    left: 50

  }

  var obstaclesMov = {

    left: 600

  }
  
 
      function flappy(){

   
    var fabby = new Image()
    fabby.src = "images/flappy.png"
    fabby.onload = function () {
    canvas.drawImage(fabby,flappyMov.left,flappyMov.top,60,60)
   
  }  
        }

      

      
   



      function obstacleBottom(){

   
        var obstacleBottom = new Image()
        obstacleBottom.src = "images/obstacle_bottom.png"
        obstacleBottom.onload = function () {
          canvas.drawImage(obstacleBottom,obstaclesMov.left,500,100,300)
        }
    }
       

      function obstacleTop(){

        var obstacleTop = new Image()
        obstacleTop.src = "images/obstacle_top.png"
        obstacleTop.onload = function () {
        canvas.drawImage(obstacleTop,obstaclesMov.left,0,100,300)
       
        }

     
    






}




  }
