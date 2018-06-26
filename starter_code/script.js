// CANVAS
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// CONSTANTS
var interval; //Siempre la vamos a necesitar
var cuadros = 0; // frames <--
var obstaculos = []; // Aquí se guardan las imagenes en forma de arreglo por la generación aleatorea.
var ost = { musicaFlappy: ('./sounds/MarioMainTheme.mp3')};
var imagenes = {
  flappy: ('./images/flappy.png'),
  obstaculoTop: ('./images/obstacle_top.png'),
  obstaculoBottom: ('./images/obstacle_bottom.png'),
  fondo: ('./images/bg.png')
};

var sonido = new Audio(); // Ruta, Sonido loopeable =D
sonido.src= ost.musicaFlappy;
sonido.loop=true;


// CLASSES
class Tablero { 
  constructor() { // <-- Siempre va, por sintaxis.
    this.x = 0; //Inicia posición en eje x
    this.y = 0; //Inicia posición en eje y
    this.width = canvas.width; //Se indica la longitud. Se asigna a lo largo del canvas.
    this.height = canvas.height; //Se indica la longitud. Se asigna a lo alto del canvas.
    this.image = new Image(); //Se declara variable para fondo y obtiene ruta,
    this.image.src = imagenes.fondo; 
    this.image.onload = function(){ //Funcion anonima
      this.draw(); //Se llama metodo para dibujar
      }.bind(this);// Carga la imagen hasta que está completa y disponible
    }

      gameOver(){
        ctx.font = ("50px Helvetica"); // Revisar fuente, y ruta.
        ctx.fillStyle = 'red';
        ctx.fillText("Game Over :'(", 20,100); //Mensaje y posición en pantalla.
        ctx.font = ("50px  Helvetica");
        ctx.fillStyle = 'yellow';
        ctx.fillText("Press 'ESC' to restart", 10, 150);
      }

      draw(){ //metodo para dibujar el fondo en el canvas
        this.x--;
        if(this.x === -this.width) this.x=0; //Aquí se genera el Loop para el fondo
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);//Repetir imagen cuando la 
        ctx.fillStyle = "white";
        ctx.font = '80px  Helvetica';
        ctx.fillText(Math.floor(cuadros/60), this.width -100, 80); // Aquí se usaron los frames para el movimiento
          }
} // Aqui termina la clase TABLERO

class Obstaculo{
  constructor(position, y, height){ //No se determinan valores, sino variables por que llegaran aleatoriamente.
    this.x = canvas.width; // Su posición será entregada en 'X' <--
    this.y = y;
    this.width = 60; // Longitud del obstaculo es de 60px
    this.height = height; 
    this.image = new Image();
    this.image.src = position === 'top' ? imagenes.obstaculoTop : imagenes.obstaculoBottom;
    this.image.onload = function(){
      this.draw();
    }.bind(this);
  }
    draw() {
    this.x-=2;  // ELos obstáculos se mueven hacia el origen de X (x-2)
    ctx.drawImage(this.image,this.x,this.y, this.width, this.height);
  }
} //TERMINA CLASE OBSTÁCULO

class Flappy {
  constructor(){
    this.x=100; // Posición Inicial de Flappy en el tablero en el eje x y en eje y
    this.y=100;
    this.width = 32; //Dimensiones de flappy
    this.height= 24; 
    this.image = new Image(); //Se llama a la imagen de Flappy
    this.image.src = imagenes.flappy;
    this.image.onload=function(){
      this.draw(); //dibujas a flappy
    }.bind(this);
    this.caida=1.5; //Flappy cae ¿caída? --> Se define  función para caída
  }
    salta (){
      this.y-=30; //Flappy sube en el eje Y. (evitado la caída)
    }

    colisiones (element){
      return (this.x < element.x + element.width) &&  // Si la posición de flappy en 'X' es menor que la posición del elemento en 'X' más su longitud <-- NO HAY CONTACTO EN 'X'
             (this.x + this.width > element.x) &&     // y si la posicion del flappy en 'X' más su propia longitud es mayor a la posición del elemento en 'X' <-- OCUPAN POSICIÓNES 'X' IGUALES (PERO NO EN 'Y')
             (this.y < element.y + element.height) && // y si la posición de flappy en 'Y' es menor que la posición del elemento en 'Y' más su altura <-- NO HAY CONTACTO en 'Y'
             (this.y + this.height > element.y);      // y si la posicion del flappy en 'Y' más su propia altura es mayor a la posición del elemento en 'Y' <-- OCUPAN POSICIÓNES 'Y' IGUALES PERO NO EN 'X'
    }
    draw(){
      this.y += this.caida;     // La caída se efectua porque 'Y' aumenta de valor (posición en el tablero)
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
} // Aquí termina la clase Flappy


// INSTANCIAS
var tablero = new Tablero(); //Se declaran una sola vez, por eso están fuera de la clase.
var flappy = new Flappy();

//MAIN FUNCTION
function update(){
  cuadros++;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  tablero.draw();
  flappy.draw();
  crearObstaculos(); // Se crea función porque se generan constantemente. 
  drawObstaculos();  // Se Dibujan constantemente al actualizar el canvas.
}

function startGame() {
  if (interval) return; //Interval NO FUE inicializada en 0
    interval = setInterval(update, 1000/60); //16.666 (milisegundos?) 
    sonido.play(); //Ejecuta sonido
} //TERMINAN INSTANCIAS

window.onload = function() {
  document.getElementById("start-button").onclick = function() { //Esto es Javascript - - > Sustituible por JQuery //$('#start-button');
    startGame();
  }; 
};
 
//FUNCIONES AUXILIARES

function crearObstaculos() {
  if(!(cuadros%100===0)) return; //Si el módulo de cuadros entre 100 ES DIFERENTE DE CERO, ¿detente?;
  var height = Math.floor((Math.random() * canvas.height * .6) +30); // Aquí se define la separación entre obstaculos
  var obstaculo1 = new Obstaculo('top', 0, height);
  var obstaculo2 = new Obstaculo(null, obstaculo1.height + 80, canvas.height - obstaculo1.y - 80);
  obstaculos.push(obstaculo1);
  obstaculos.push(obstaculo2);
}

function drawObstaculos(){
  obstaculos.forEach(function(obstaculo){
    obstaculo.draw();
    if(flappy.colisiones(obstaculo)){ //Si flappy está tocando obstaculos, termina el juegp.
      detente();
    }
  });
}

function detente() { //Detiene el Juego
  clearInterval(interval);
  interval = undefined;
  tablero.gameOver();
  sonido.pause();
  sonido.currentTime=0;
}

function restart(){
    if(interval) return;
    obstaculos = [];
    cuadros = 0;
    flappy.x = 100;
    flappy.y = 100;
    startGame();
}

//LISTENERS
addEventListener('keydown', function(e){ // Acción. Si se presionan las teclas
    if(e.keyCode === 90 || e.keyCode === 32 || e.keyCode === 38){  // `Z` or 'SPACE' or 'UP-ARROW'
        flappy.salta(); // Flappy salta
        sonido.play();  // El sonido compienza
    }else if(e.keyCode === 27){ 
        restart();
    }
})

//startGame();
