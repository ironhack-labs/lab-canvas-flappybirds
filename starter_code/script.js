let pipes=[]
let frames=0
let interval
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let flappy
let board

function update(){
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    
    generatePipes()
    pipes.forEach(pipe => pipe.draw())
    flappy.draw()
    checkCollitions()
    record()
}
function start() {
  if (interval>0) clearInterval(interval)
    pipes=[]
    frames=0
    flappy = new Bird()
    board = new BoardImage()
    board.draw()
    flappy.draw()
    interval = setInterval(update, 1000 / 60)
}
document.getElementById("start").onclick = function() {
    start();
  }
document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 65:
    flappy.fly()
    }
  })


class BoardImage{
    constructor(){
        this.x=0
        this.y=0
        this.img=new Image()
        this.img.src='./images/bg.png'
        this.img.onload=()=>{
            this.draw()
            }
        }
    draw(){
        this.x--
        if (-this.x>canvas.width) this.x=0    
        ctx.drawImage(this.img,this.x,this.y,canvas.width,canvas.height)
        ctx.drawImage(this.img,this.x + canvas.width,this.y,canvas.width,canvas.height)
        
        }
}
class Bird{
    constructor(){
        this.x=100
        this.y=250
        this.puntuacion=0
        this.img=new Image()
        this.img.src="./images/flappy.png"
        this.height=50
        this.width=50

    }
    draw(){
        this.y+=1
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.lineWidth="5px"
    ctx.font = '48px serif';
    ctx.fillStyle="white"
        ctx.fillText(this.puntuacion,20,50,50)
    }
    fly(){
        this.y-=30
    }
    isTouching(pipe) {
        return (
          this.x < pipe.x + pipe.width &&
          this.x + this.width > pipe.x &&
          this.y < pipe.y + pipe.height &&
          this.y + this.height > pipe.y
        )
      }
}

class Pipe {
    constructor(y, height, imgType) {
      this.x = canvas.width
      this.y = y
      this.height = height
      this.width = canvas.width / 5
      this.bottom = new Image()
      this.top = new Image()
      this.bottom.src = './images/obstacle_bottom.png'
      this.top.src = './images/obstacle_top.png'
      this.imgType = imgType
      this.scored=false
    }
    draw() {
      this.x--
      if (this.imgType==="top") {
        ctx.drawImage(this.top, this.x, this.y, this.width, this.height)
      } else {
        ctx.drawImage(this.bottom, this.x, this.y, this.width, this.height)
      }
    }

  }

  function checkCollitions() {
    if (flappy.y >= canvas.height - flappy.height) return gameOver()
    pipes.forEach((pipe, i) => {
      if (pipe.x + pipe.width <= 0) {
        pipes.splice(i, 1)
      }
      flappy.isTouching(pipe) ? gameOver() : null
    })
  }

  function gameOver() {
    clearInterval(interval)
    ctx.fillStyle="red"
    ctx.fillRect(0,180,700,140)
    ctx.lineWidth="5px"
    ctx.font = '48px serif';
    ctx.fillStyle="white"
    ctx.fillText("GAME OVER",230,250,200)
    ctx.fillText("score: "+flappy.puntuacion,250,290,200)
  }

  function generatePipes() {
    if (frames % 360 === 0) {
      const min = 100
      const ventana = Math.floor(Math.random() *150)+100
      const rndHeight = Math.floor(Math.random() * ventana) + min
      pipes.push(new Pipe(0, rndHeight, 'top'))
      pipes.push( new Pipe(rndHeight + ventana, canvas.height - rndHeight, 'bottom')
      )
    }
  }


  function record(){
      pipes.forEach(pipe=>{
          if (pipe.x+pipe.width<flappy.x && !pipe.scored) {
            flappy.puntuacion+=10
            pipe.scored=true
          }
        })

  }

  
  
    




 
  