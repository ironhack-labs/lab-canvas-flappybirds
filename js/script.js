window.onload = function () {
  //siempre declarar las constantes o lets que utilizamos en este archiva.
  //llamar a una clase

  const bg = new background(canvas.width, canvas.height);
  const flappy = new Flappy(50, 40, 35, 35);
 // const pipe = new Pipe("top", 100, 100, 100); // esto es para ver si funciona. pero vamos a armar todo con generate pipes

  document.getElementById("start-button").onclick = function () {
    if (!requestId) {
      startGame();
    }
  };

  function startGame() {
    //console.log("si funciono");
    //updateGame() // v1.0 este paso para hacer arrancar el juego. Recuerda que el requestAnimationFrame tiene un callback al update que crea un loop
    
    audio.play()
    requestId = requestAnimationFrame(updateGame); // v1.2
  }
  function gameOver() {
    //console.log("te moriste, we");
    ctx.drawImage(dead,400,400,400,400)
    audio.pause()
requestId = undefined;
  }



  function resetGame() {
    flappy.y = dylanDefault.y;
    flappy.x = dylanDefault.x;
    flappy.vy = dylanDefault.vy;
    if (!requestId) {
      startGame();
    }
  }

  function winGame() {}

  //funcion impotante. Este es el corazon del juego
  function updateGame() {
    frames++;
    //primero limpiamos el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw();
    flappy.draw(); //nota que flappy debe estar debajo de bg.
    //pipe.draw() // para dibujar el pipe de ejemplo

//generar y luego dibujar
generatePipes()
drawPipes()

ctx.font = "40px Arial"
ctx.fillText (`Points: ${points}`,canvas.width -200 ,100)




    if (flappy.y + flappy.height > canvas.height) {
      gameOver();
    }

    if (requestId) {
      requestAnimationFrame(updateGame); //v1.2
    }
    //requestAnimationFrame(updateGame) //esto para que inicie el juego.
  }

  //generar y dibujar pipes
  function generatePipes() {
    //console.log("franes", frames);
    //limitando qe mi arreglo de pipes
    if (!(frames % 160 === 0)) {
      return true;
    }
    //ahora un height random
    //Math.floor(Math.random()* (max*0.6)) +35

    const height = Math.floor(Math.random() * (canvas.height * 0.6)) + 35;
    const pipe1 = new Pipe("top", canvas.width, 0, height);
    const pipe2 = new Pipe(
      "EldeAbajo",
      canvas.width,
      height + 120,
      canvas.height - 120 - height
    );

    pipes.push(pipe1, pipe2);
  }

  function drawPipes() {
    //forEach --> no retorna nada
    //for of --> este no retorna nada
    // for -> no retorna nada
    //map --> retorna un nuevo arrelgo (hace una copia del original)
    //reduce --> regresa un arrelgo, un objeto, un numero, un string
    //filter --> nos regresa un arreglo nuevo totalmente filtrado.

pipes.forEach((item,index_pipe) => {


  //splice vamos a sacar los pipesque se salgan de mi canvas
if(item.x +item.width <=0){
  points ++
  pipes.splice(index_pipe,1)
}
//voy a dibujar los pipes
  item.draw()

  if(flappy.collision(item)){
    gameOver()
  }

})


  }

  addEventListener("keydown", (event) => {
    event.preventDefault(); //esto evita que haga las acciones por defecto
    //letra space
    if (event.keyCode === 32) {
      //flappy.y -=10; ya no quiero modificar la altura. ahora entraré con un user pull
      flappy.userPull = 0.3;
    }
    if (event.keyCode === 82) {
      if (!requestId) {
        resetGame();
      }
    }
  });

  addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 32) {
      flappy.userPull = 0;
    }
  });
};

//presentacion dentro de 15 días.
