
window.onload = function() {
  var canvas=document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  document.getElementById("start-button").onclick = function(e) {
    startGame();
    
  };

  function startGame() {
      var pajaro= new Bird(50,100);
      var tub=new Pipe(ctx);
      var pipes=[];
      var contador=0;
      pipes.push(tub);
      var pist=new Background(ctx);
     var clear=setInterval(function(){
       document.onkeydown = function (e) {
         e.preventDefault();
         if (e.keyCode == 32) {
           pajaro.sY = -7;
         }
    }
       contador++;
       if(contador>110){
         var p=new Pipe(ctx);
         pipes.push(p);
         contador=0;
       }
  
       pist.update();
       pajaro.update(ctx);
       for (i=0;i<pipes.length;i++){
         pipes[i].draw();
         pipes[i].move()
         if(pipes[i].x< -100){
           pipes.splice(i,1);
         }
     }
     if(pajaro.x>=pipes[0].x ){
       if( pipes[0].randYT>pajaro.y ){
        clearInterval(clear)
       }
       else if(800-pipes[0].randYB<pajaro.y+50){
        console.log(pipes[0].randYB)
        clearInterval(clear)
    }
  }
      },10) 

  } }

