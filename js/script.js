window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  // primeiro carregaemtno da tela
  function startGame() {
    myGameArea.start();
    background.draw();
    player.update();
  }

  // controle da área de jogo
  const myGameArea = {
    canvas: document.querySelector("#my-canvas"),
    myObstacles: [],
    frames: 0,

    //função que inicia o jogo e começa a rodar o "tempo"
    start: function () {
      this.context = this.canvas.getContext("2d");
      this.canvas.width = 900;
      this.canvas.height = 500;
      this.interval = setInterval(updateGameArea, 20);
    },

    // função que limpa a tela
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    // função que para o contador de "tempo"
    stop: function () {
      clearInterval(this.interval);
      setTimeout(this.gameOver, 1000); // espera 1s antes de iniciar a tela de Game Over
    },

    // função que conta e imprime a pontuação na tela;
    score: function () {
      this.points = Math.floor(this.frames / 50);
      this.context.fillStyle = "#FFFFFF";
      this.context.font = "18px serif";
      this.context.fillText(`SCORE: ${this.points}`, 20, 50);
    },

    // função que deixa a tela preta e escreve "Game Over" e a pontuação final
    gameOver: function () {
      myGameArea.clear();
      myGameArea.context.textAlign = "center";
      myGameArea.context.fillStyle = "black";
      myGameArea.context.fillRect(
        0,
        0,
        myGameArea.canvas.width,
        myGameArea.canvas.height
      );
      myGameArea.context.fillStyle = "red";
      myGameArea.context.font = "38px serif";
      myGameArea.context.fillText(
        "GAME OVER",
        myGameArea.canvas.width / 2,
        myGameArea.canvas.height / 2
      );
      myGameArea.context.fillText(
        `FINAL SCORE: ${myGameArea.points}`,
        myGameArea.canvas.width / 2,
        (myGameArea.canvas.height * 2) / 3
      );
    },
  };

  // função que é executada a cada intervalo de tempo do setInterval iniciado no myGameArea.start()
  function updateGameArea() {
    myGameArea.clear(); // limpa a tela
    background.move(); // atualiza a posição do background
    background.draw(); // desenha o background
    player.newPos(); // atualiza a posição do jogador
    player.update(); // desenha o jogador
    updateObstacles(); // atualiza obstaculos
    myGameArea.frames += 1; // soma quantidade de quadros
    myGameArea.score(); // imprime os pontos na tela
    checkGameOver(); // checa se houve condição de fim de jogo
  }

  // função atualiza os obstaculos
  function updateObstacles() {
    // para os obstaculos já criados
    for (let i = 0; i < myGameArea.myObstacles.length; i += 1) {
      myGameArea.myObstacles[i].newPos(); // atualiza a posição
      myGameArea.myObstacles[i].update(); // desenha o obstáculo
    }
    // a cada 160 quadros, é criado um novo obstáculo
    if (myGameArea.frames % 160 === 0) {
      const minGap = 70;
      const maxGap = 140;
      const gap = Math.floor(Math.random() * (maxGap - minGap) + minGap);
      const minHeight = 100;
      const maxHeight = 300;
      const height = Math.floor(
        Math.random() * (maxHeight - minHeight) + minHeight
      );
      const canvasW = myGameArea.canvas.width;
      const canvasH = myGameArea.canvas.height;
      // obstáculo encostado na borda superior
      myGameArea.myObstacles.push(new Obstacle(canvasW, 0, 80, height, "top"));
      // obstáculo a partir da altura do primeiro obstáculo + vão (gap) até o fim da tela
      myGameArea.myObstacles.push(
        new Obstacle(
          canvasW,
          height + gap,
          80,
          canvasH - height - gap,
          "bottom"
        )
      );
    }
  }

  // checa condiçoes de fim de jogo
  function checkGameOver() {
    for (let i = 0; i < myGameArea.myObstacles.length; i += 1) {
      // se o jogador bateu num obstáculo OU saiu dos limites de borda
      if (player.crashWith(myGameArea.myObstacles[i]) || player.outOfBonds()) {
        myGameArea.stop();
      }
    }
  }

  // classe para criar background estático
  class Background {
    constructor(source) {
      this.img = new Image();
      this.img.src = source;
      this.x = 0;
      this.y = 0;
    }
    draw() {
      myGameArea.context.drawImage(this.img, this.x, this.y);
    }
  }

  // classe para criar background em loop
  class ScrollingBackground {
    constructor(source) {
      this.img = new Image();
      this.img.src = source;
      this.x = 0;
      this.y = 0;
      this.speed = -1;
    }
    // atualiza posição
    move() {
      this.x += this.speed;
      this.x %= myGameArea.canvas.width;
    }
    // desenha imagem
    draw() {
      myGameArea.context.drawImage(this.img, this.x, this.y);
      if (this.speed < 0) {
        myGameArea.context.drawImage(this.img, this.x + this.img.width, 0);
      } else {
        myGameArea.context.drawImage(this.img, this.x - this.img.width, 0);
      }
    }
  }
  const background = new ScrollingBackground("../images/bg.png"); // instância da imagem de fundo

  // classe para criar jogador
  class Faby {
    constructor(source, x, y, width, height) {
      this.img = new Image();
      this.img.src = source;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speedY = 0;
      this.gravity = 0.1; // puxa o jogador para baixo
      this.pull = 0; // puxa o jogador para cima
    }
    // desenha o jogador
    update() {
      this.ctx = myGameArea.context;
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    // atualiza a posição do jogador
    newPos() {
      this.speedY += this.gravity - this.pull;
      this.y += this.speedY;
    }
    // limites para colisão
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
    // checa colisão com objetos passado
    crashWith(obst) {
      return !(
        this.top() > obst.bottom() ||
        this.bottom() < obst.top() ||
        this.left() > obst.right() ||
        this.right() < obst.left()
      );
    }
    // checa colisão com laterais superior e inferior
    outOfBonds() {
      return this.top() < 0 || this.bottom() > myGameArea.canvas.height;
    }
  }
  const player = new Faby("../images/flappy.png", 50, 200, 50, 35); // instância do jogador

  // classe para criar obstáculos
  class Obstacle {
    constructor(x, y, width, height, side) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.side = side;
    }
    // desenha o obstáculo
    update() {
      this.img = new Image();
      if (this.side === "top") {
        this.img.src = "../images/obstacle_top.png";
      } else {
        this.img.src = "../images/obstacle_bottom.png";
      }
      this.ctx = myGameArea.context;
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    // atualiza a posição do obstáculo
    newPos() {
      this.x -= 2;
    }
    // limites para colisão
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
    left() {
      return this.x;
    }
    right() {
      return this.x + this.width;
    }
  }

  // event listeners da barra de espaço e da seta para cima.
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 || e.keyCode === 38) {
      player.pull = 0.3;
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.keyCode === 32 || e.keyCode === 38) {
      player.pull = 0;
    }
  });
};
