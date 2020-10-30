const flappyBirdsApp = {
  name: 'Flappy Birds App',
  description: 'Ironhack\'s lab: Flappy Birds Game Clone',
  version: '1.0.0',
  author: 'Jose A. Casado',
  license: undefined,
  canvasTag: undefined,
  ctx: undefined,
  canvasSize: {
    w: undefined,
    h: undefined
  },
  frames: 0,
  FPS: 60,
  background: undefined,
  player: undefined,
  obstacles: [],
  key: ' ', 
  score: 0,

  init(id) {
    this.canvasTag = document.getElementById(id)
    this.ctx = this.canvasTag.getContext('2d')
    this.setDimensions()
    this.start()
  },

  setDimensions() {
    this.canvasSize = {
      w: window.innerWidth,
      h: window.innerHeight
    }
    this.canvasTag.setAttribute('width', this.canvasSize.w)
    this.canvasTag.setAttribute('height', this.canvasSize.h)
  },
  
  start() {
    this.reset()

    this.intervalID = setInterval(() => {
      this.clear()
      this.drawAll()

      // this.generateObstacles()
      // this.clearObstacles()

      if (this.frames > 5000) {
        this.frames = 0
      } else {
        this.frames++
      }

      // if (this.isCollision()) {
      //   gameOver()
      // } 

     }, 1000 / this.FPS)
  },

  reset() {
    this.background = new Background(this.ctx, this.canvasSize, 'images/bg.png')
    this.player = new Player(this.ctx, this.canvasSize, this.key)
    // this.obstacles = []
  },
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
  },

  drawAll() {
    this.background.draw()
    this.player.draw()
    // this.obstacles.forEach(elm => elm.draw())
  }

  // generateObstacles() {
  //   if (this.frames % 90 === 0) {
  //     this.obstacles.push(new Obstacle(this.ctx, this.canvasSize, this.player.position, this.player.size))
  //   }
  // },

  // clearObstacles() {
  //   this.obstacles = this.obstacles.filter(elm => elm.position.x >= 0)
  // },

  // isCollision() {
  //   return this.obstacles.some(elm => {
  //     return (
        
  //     )
  //   })
  // }

}