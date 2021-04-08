window.onload = function() {
  const canvas = document.querySelector("#my-canvas")
  const ctx = canvas.getContext('2d')

  const backgroundImage = new Image()
  backgroundImage.src = './images/bg.png'

  class Faby{
    constructor(){
      this.img = ''
      this.width = 50
      this.height = 40
      this.speedX = 0
      this.speedY = 0
      this.gravity = 0
      this.gravitySpeed = 0
    }

    renderFaby(){
      this.img = new Image()
      this.img.src = './images/flappy.png'
    }

    update(){

    }

    newPos(){
      
    }
  }


  document.querySelector("#start-button").onclick = () => {
    startGame();
  };

  const startGame = () => {
    updateCanvas()
  }

  const clearCanvas = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const drawBackground = () => {
    ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const updateCanvas = () => {
    clearCanvas()
    drawBackground()

    requestAnimationFrame(updateCanvas)
  }

};
