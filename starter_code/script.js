window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    start();
  };

//1.- DEFINIR VARIABLES UNIVERSALES
const canvas = document.querySelector('canvas') //'canvas' & 'ctx': Nos ayudan a ligar el lienzo del html y a definir el contexto de lo que vamos a dibujar ahí.
const ctx = canvas.getContext('2d') 
let frames = 0 //'frames': Define el cuadros... debería de actualizarse siempre para dar el efecto de la animación.
let score = 0 // 'score': Registra la puntuación.
let interval // 'interval': Es el avance de cada cuanto se actualiza el canvas
const pipes = [] //'pipes': Son los obstáculos, es un array que va recibiendo elementos que son los obstáculos.

//2.- CREA SUS FUNCIONES CONSTRUCTORAS
//'class Board': ESta no recibe parámetros y se ejecuta automáticamente, básicamente ejecuta el fondo, mprestar atención al método draw() que nos ayuda a mover el fondo
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width //la anchura de la imagen y la del canvas debe ser igual.
    this.height = canvas.height // same que arriba
    this.img = new Image()
    this.img.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true'
    this.img.onload = () => {
      this.draw()
    }
  }
  /* ESTE MÈTODO ES BIEN IMPORTANTE
  ¿Qué hace?:
  
  'this.x--': Va reduciendo en 1 el espacio de x, por lo que la imagen de fondo, con cada cuadro, va recorriendose a la izquierda
  'if (this.x < -canvas.width)...': Para entnedlo se explica así:
      Imagina que el tamaño de tu lienzo es 100 y tu imagen empieza en 'this.x = 0', en ese caso la funcion de 'x es menor a -100 (en ancho exacto del lienzo)
      lo que permite que se vaya renovando automáticamente una vez que "termine" la otra, dando la ilusión que es un loop.

      ¿Y si diferente que el canvas width?
      Si fuera menor aparerecìa un glitch en que la imagen "nueva" se superpondría a la "original" cada que pasara la distancia indicada.
      Si fuera mayor habría un espacio en blanco entre el fin de de la imagen "original" y el inicio de la "nueva"

  Ya después del this el resto sólo sirve para imprimir con los parámetros de la imagen
  */
  draw() {
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height) // este dibuja la imagen inicial
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height) // este dibuja la segunda (es casi lo mismo. pero suma el canvas width)
  }
}

//'class Flappyoso': Define al personaje y en la función original recibia los parámetros 'x' y 'y'
/* CAMBIO REALIZADO

En este caso el personaje se mueve únicamente en x, por lo que poner el parámmetro de y y definirlo como variable es ocioso. En este caso lo borré de los parámetros
y lo definí dentro con un número fijo 0, me ocupé de borrar el parámetro de y cada que se invicaba a este constructor o a su instancia del resto del código y no 
se rompió
*/
class Flappyoso {
  constructor(y) {
    this.x = 0
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true'
  }
  draw() {
    this.y++ // cada que se dibuje el flappy por defecto va a empezar en bajar (aumentar su 'y')
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
    this.y -= 20 //// arriba cuando se dibuja por defecto se va bajando, el método fly es interno de la calse y se activa más abajo, cuando se presiona el botón
  }
  isTouching(obstacle) { // El parámetro que recibe debe ser una instacia de la clase que define a los objetos
    return (
      this.x < obstacle.x + obstacle.width && //atrás
      this.x + this.width > obstacle.x && //en frente
      this.y < obstacle.y + obstacle.height && //arriba (se suma con height porque el obstàculo no está pegado al margen superior)
      this.y + this.height > obstacle.y //abajo

      /* Este código refiere a los contactos y se intrepretaria así:
      
      'this.x < obstacle.x + obstacle.width': Cuando la posición de mi personaje en x menor ( <= ) a la de la longitud
      de mi obstáculo significa que mi peronaje golpeó por atrás a al obstàculo, and so on

      */
    )
  }
}

//'class Pipe': Define a los obstáculos (son lìneas verticales, no se mueven en X, por lo que no requiere ese parámetro)
class Pipe {
  constructor(y, width, height, type) {
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.imgTop = new Image()
    this.imgTop.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'
    this.imgBot = new Image()
    this.imgBot.src =
      'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true'
  }
  draw() {
    this.x-- // porque siempre va acercàndose a la izquierda (donde x es 0)
    if (this.type) { // es una condicion booleana, si es cierto dibuja a la imagen superior, si es falso a la imagen inferior
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

const board = new Board()
const flappy = new Flappyoso(10)

//dibuja el puntaje
function drawScore() {
  if (frames % 200 === 0) { //Define cada cuantos cuadros se va a imprimir un punto adicional
    score += 1
  }
  ctx.font = '24px Courier'
  ctx.fillText(score, canvas.width / 2, 50)
}

//****************************************************************************************************************************************+******+*++***********
function generatePipes() {
  const min = 0 // el minimo en x de la height
  const max = 400 // el máximo en x de la heinght
  const ventanita = 100 // está definiendo el gao que habrá en todo el obstáculo
  if (frames % 200 === 0) {   //en esta linea tambien està definiendo cada cuando van a aparecer sus pipes
    const randomHeight = Math.floor(Math.random() * (max - min))
    pipes.push(new Pipe(0, 50, randomHeight, true))
    pipes.push(new Pipe(randomHeight + ventanita, 50, canvas.height - randomHeight, false)
    )
  }
}

function drawPipes() {
  pipes.forEach(pipe => {
    pipe.draw()
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  board.draw()
  flappy.draw()
  generatePipes()
  drawPipes()
  checkCollition()
  drawScore()
}

function start() {
  interval = setInterval(update, 1000 / 60) //Aquí se define los 60 fps (haces que vaya màs ràpido o màs lento)
}

function gameOver() {
  ctx.font = '50px Courier'
  ctx.fillText('Game Over', canvas.width / 2 - 100, 200)
  clearInterval(interval) //
}

function checkCollition() {
  if (flappy.y > canvas.height - flappy.height) return gameOver()  // si el flappy toca fondo muere
  pipes.forEach(pipe => { // si el flappy is touching, muere
    if (flappy.isTouching(pipe)) return gameOver()
  })
}

document.onkeydown = e => {
  e.preventDefault()
  switch (e.keyCode) {
    case 32:
      flappy.fly()
      break

    default:
      break
  }
}


};