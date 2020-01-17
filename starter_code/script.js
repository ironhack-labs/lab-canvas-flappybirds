const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let interval
let frames = 0

const images = {
  bg: 'images/bg_flapy.jpeg',
  flappy: 'images/kratosFlappy.png',
  logo: 'images/logo.png',
  obstacle_bot: 'images/obs_bot.png',
  obstacle_top: 'images/obstacle_top.png'
}


class Background{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = images.bg
    this.img.onload = () => {
      this.draw()
    }
  }

  draw(){
    this.x--
    if(this.x < -700) this.x = 0
    ctx.drawImage(this.img, this.x, this.y, 700, 500) //medidas para que no se apachurre la imagen
    ctx.drawImage(this.img, this.x + canvas.width + 300, this.y, 700, 500)
  }

}

let board = new Background() //SE INSTANCIA BACKG GLOBAL

function update(){
  frames++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.draw()

}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    interval = setInterval(update, 1000/40)
  }
};
