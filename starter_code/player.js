//caracter principal del juego
function Player(game) {
    this.game = game;
   
    this.x = this.game.canvas.width * 0.08;
  
    // guardar posición original (mitad pantalla)
    this.y0 = this.game.canvas.height * 0.5;
    this.y = this.y0;

    this.img = new Image();
    this.img.src = 'images/flappy.png';
    
  
    // medidas de la imagen a representar en el canvas
    this.w = 50;
    this.h = 35;
  
    this.vy = 1;
  
    //this.bullets = [];
  
    this.setListeners();
  }
  
  Player.prototype.draw = function() {
    this.game.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
    );
  /*
    this.animateImg();
  
    this.bullets = this.bullets.filter(function(bullet) {
      return bullet.x < this.game.canvas.width;
    }.bind(this));
  
    this.bullets.forEach(function(bullet) {
      bullet.draw();
      bullet.move();
    });*/
  };
  
  Player.prototype.setListeners = function() {
    window.onkeydown = function(e) {
      if (e.keyCode === 37) {
        this.y -= 5;
        //this.vy -= 10;
      } 
    }.bind(this);
  };
    /*
  Player.prototype.shoot = function() {
    var bullet = new Bullet(this.game, this.x + this.w, this.y + this.h / 2);
  
    this.bullets.push(bullet);
  };

  Player.prototype.animateImg = function() {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (this.game.framesCounter % 6 === 0) {
      this.img.frameIndex += 1;
  
      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 2) this.img.frameIndex = 0;
    }
  };
  */
  Player.prototype.move = function() {
    // Aumenta la velocidad en el eje y.
    var gravity = 0.4;
    this.vy += gravity;
    this.y += this.vy;
    
  };