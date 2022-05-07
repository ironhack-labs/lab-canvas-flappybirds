window.onload = function () {
  //siempre declarar las const o lets que usamos en este archivo
  //new NOmbreClasee(...)
  const bg = new Background(canvas.width, canvas.height);
  const flappy = new Flappy(50, 40, 35, 35);
  //const pipe new Pipe ('top',100,100,100) s//solo era para ver si funciona y cae
  document.getElementById("start-button").onclick = function () {
    if (!requestId) {
      startGame();
    }
  };

  function startGame() {
    //iniciar juego v0.0.01
    //updateGame();
    //iniciar juego v.0.0.2
    //cuando inicie mi juego vamos a darle play al audio
    audio.play();
    requestId = requestAnimationFrame(updateGame);
  }

  function gameOver() {
    console.log("te moriste bro");
    ctx.drawImage(dead, 400, 100, 400, 400);
    //y cuando se muera, paudamos el audio
    audio.pause();
    requestId = undefined;
  }

  function resetGame() {
    flappy.y = mapyDefault.y;
    flappy.x = mapyDefault.vy;
    if (!requestId) {
      startGame();
    }
  }

  function winGame() {
    console.log('ganaste')
  }

  //funcion importante el corazon/motor/alma
  function updateGame() {
    frames++; //aumentamos los frames
    //limpiamos el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //1.-
    bg.draw();
    //2.-
    flappy.draw();
    //pipes.draw(); solo era para ver si funcionaba y caen libremente
    //generar y dibujar
    generatePipes();
    drawPipes();
    ctx.font = "40px Arial";
    ctx.fillText(`Points: ${points}`, canvas.width - 200, 100);

    //vamos a terminar el juego si el flappy toca el fondo
    if (flappy.y + flappy.height > canvas.height) {
      gameOver();
    }
    if(points >= 2){
      winGame();
    }

    if (requestId) {
      requestAnimationFrame(updateGame);
    }
  }

  function generatePipes() {
    //limitar los pipes
    if (!(frames % 160 === 0)) {
      return true;
    }
    console.log("si funciono");
    //height random
    //Math.floor(Math.random() * (max * 0.6) ) + 35;
    const height = Math.floor(Math.random() * (canvas.height * 0.6)) + 35;
    const pipe1 = new Pipe("top", canvas.width, 0, height);
    const pipe2 = new Pipe(
      "El de abajo", //pos
      canvas.width, //x
      height + 120, //y
      canvas.height - 120 - height //dinamico height
    );

    pipes.push(pipe1, pipe2);
  }

  function drawPipes() {
    //for Each -> no retorna nada
    //for or -> tampo retorna nada
    //for -> solo inspecciona
    //map -> hace una copia del original, se peude alterar y retorna arreglo
    //reduce -> regresa un arreglo, objeto, un numero, un string
    //filter -> regresa un arreglo nuevo filtrado
    pipes.forEach((pipe, index_pipe) => {
      //vamos a sacar los pipes que se salgan de mi canvas
      if (pipe.x + pipe.width <= 0) {
        //splice solo se puede utilizar en arreglos
        points++;
        pipes.splice(index_pipe, 1);
      }

      // voy a dibujar los pipes
      pipe.draw();
      //para validar que está chocando
      if (flappy.collision(pipe)) {
        gameOver();
      }
    });
  }

  addEventListener("keydown", (event) => {
    event.preventDefault(); //evitamos haga sus acciones por defecto (el teclado)
    if (event.keyCode === 32) {
      // flappy.y -= 10; // v1 se va a borrar
      flappy.userPull = 0.3;
    }
    if (event.keyCode === 82) {
      // flappy.y -= 10; // v1 se va a borrar
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
