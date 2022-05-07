
window.onload = function () {
  //llamar una clase
  const bg = new Background(canvas.width, canvas.height);
  const flappy = new Flappy(50, 40, 30, 30);

  //esto es solo un ejemplo se va a borrar
  // const pipeExmp = new Pipe("adsdas", canvas.width, 0, 100);

  document.getElementById("start-button").onclick = function () {
    if(!requestId){
      startGame();
    }
  };

  function startGame() {
    //test1
    // updateGame();
    //final1 
    audio.play()
    requestId =  requestAnimationFrame(updateGame)
  }

  function gameOver() {
    console.log("Te moriste")
    audio.pause()
    bg.gameOver()
    requestId= undefined
  }

  //motor del juego (updateGame)
  function updateGame() {
    frames ++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generatePipes()
    
    bg.draw(); // con esto le decimos que nos muestre la imagen en nuestro background
    // el ctx.drawImage solo funcionara dentro de una funcion que se este ejecutando
    // con requestAnimation frames o un setInterval
    flappy.draw();
    drawPipes()

    if(flappy.y + flappy.height > canvas.height){
      gameOver()
    }

    //-1, 1, true, [],{}, "Perro",
    //0, null, undefined, false,
    if(requestId){
      requestAnimationFrame(updateGame);
    }
    
  }

  //genear y pintar pipes
  function generatePipes() {
    //limitar subir pipes a mi arreglo para no llenarlo de golpe
    // modulo  = 1 0  
    if( !(frames % 160 === 0 ) ){
      return true
    }

    //height random
    // Math.floor( Math.random() * (max - min ) ) + min
    const height = Math.floor( Math.random() * (canvas.height * 0.6 ) ) + 30;
    const pipe1 = new Pipe("top",canvas.width, 0, height );
    const pipe2 = new Pipe("elDeAbajo",canvas.width, height + 120, canvas.height - 120 - height )

    pipes.push(pipe1, pipe2)
  }
  function drawPipes() {
    //forEach //  no retorna nada 
    //filter //  te regresa un nuevo arreglo filtrado
    //map  // te regresa un arrelo nuevo apartir del original
    //reduce // arreglos sumar, divirvidr, crear, apartir de un arreglo 
    //plural.forEach((pipe))

    //    0       1           2
    //["David","Esteban","Alfonso"]
    pipes.forEach((pipe,index_pipe)=>{//star forEach

      //scar los pipes si se salen del canvas
      if(pipe.x < -30 ){
        pipes.splice(index_pipe, 1)
      }
      pipe.draw()
      if( flappy.collision(pipe) ){
        gameOver()
      }

      bullets.forEach((bullet,index_bullet)=>{
        bullet.draw()
        if(bullet.collision(pipe)){
          pipes.splice(index_pipe,1)
          //   bullets.splice(index_bullet,1)
          bullets.pop()
        }
      })

    })//end forEach

  }
  //generateBullet
  function generateBullet(){
    const bullet = new Bullet(flappy.x + flappy.width, flappy.y)
      // 0
    if(!bullets.length){
      bullets.push(bullet)
    }else{
      console.log("aun tienes una bala")
    }
  }
  //reset
  function resetGame() {}

  //event para manejar al flappy
  addEventListener("keydown", (event) => {
    if (event.keyCode === 32) {
      flappy.userPull = 0.3;
    }
    if(event.keyCode === 88){
      generateBullet()
    }
    if(event.key === "a" || event.key === "A" ){
      
    }
  });

  addEventListener("keyup", (event) => {
    if (event.keyCode === 32) {
      flappy.userPull = 0;
    }
  });
};