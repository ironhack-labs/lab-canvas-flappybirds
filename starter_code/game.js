class Game {    //const
  constructor(){
  this.canvas = undefined
  this.ctx = undefined
  this.canvasSizes = {
    w: undefined,
    h: undefined
  }
  this.Background = new Background
  this.Player =  undefined
  this.key = 32
  this.intervalId = undefined
  }
  
  init= (canvasId) =>{
    //this.intervalId = setInterval(() =>{
    //obtenemos el id del canvas, lo extraemos y tb su contexto
    this.canvas = document.getElementById("canvas")  // o ("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.start()
    //Inicializaciones
    
    this.canvasSizes.w = window.innerWidth
    this.canvasSizes.h = window.innerHeight


    //llamar de las inicializaciones
     //this.setDimensions()
      // this.intervalId = setInterval = (() =>{
      //     console.log("setInterval")
      //   this.start()

      // }, 1000/60)

  
}
  setDimensions = () => {
    //para las dimensiones del canvas
    this.canvas.
    this.canvas.setAttributes('width',this.canvasSizes.w)
    this.canvas.setAttributes('height', this.canvasSizes.h)
 }

  start = () => {
    console.log("platano")
        
    this.reset()
    this.clear()
    this.drawAll()
    this.moveAll()
    
  }

  reset = () => {
    this.background = new Background(this.ctx, this.canvasSizes.w, this.canvasSizes.h)
    this.player = new Player(this.ctx, this.canvasSizes.w, this.canvasSizes.h, this.key)
    //this.obstaclesArray = []
    //this.scoreBoard = new ScoreBoard(this.ctx, this.canvasSizes.w)
    //this.score = undefined
  }

  clear = () =>{
    //Para borrar los elementos de la pantalla canvas
    this.ctx.clearRect(0, 0, this.canvasSizes.w, this.canvasSizes.h)
  }

  drawAll = () => {
    //dibujar todos los elemntos del canvas
    this.background.draw()
    this.player.draw()
    
  }

  moveAll = () => {
    //Mover todos los elementos del canvas
    this.background.move()
    this.player.move()
  }
  

}

