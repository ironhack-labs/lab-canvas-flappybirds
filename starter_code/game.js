const game = {
    name: 'Race Car',
    description: 'Race Car game',
    author: 'Sergio & Cesar',
    license: undefined,
    version: '1.0',
    canvasDom: undefined,
    ctx: undefined,
    wSize: {
        width: undefined,
        height: undefined
    },
    imgBackSource: './images/bg.png',
    imgPlayerSource: "./images/flappy.png",
    imgObsTop: './images/obstacle_top.png',
    imgObsBot: './images/obstacle_bottom.png',
    fps: 30,
    counter: 0,
    background: undefined,
    player: undefined,
    playerSize: {
        width: 70 * 0.8,
        height: 49 * 0.8
    },
    gravity: 0.6,
    obstacles: [],
    interval: undefined,
    score: 0,
    init() {
        this.canvasDom = document.getElementById("canvas")
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.background = new Background(this.ctx, this.wSize, this.imgBackSource)
        this.player = new Faby(this.ctx, this.wSize, this.imgPlayerSource, this.playerSize, this.gravity)
        this.interval = setInterval(() => {
            this.clearScreen()
            this.counter++
            if (this.counter % 50 === 0) {
                this.obstaclesGererator()
            }
            this.drawAll()
            this.moveAll()
            if (this.checkCollision()) {
                this.gameOver()
            }
            if (this.checkScore()) {
                this.score++
                this.obstacles.shift()
            }
            document.querySelector('#score-number').innerHTML = this.score
        }, 1000 / this.fps)
    },
    setDimensions() {
        this.wSize.width = this.canvasDom.width
        this.wSize.height = this.canvasDom.height
    },
    drawAll() {
        this.background.draw()
        this.obstacles.forEach(elem => {
            elem.draw()
            elem.move()
        })
        this.player.draw()
    },
    moveAll() {
        this.background.move()
        this.player.move()
        this.player.jump()
    },
    obstaclesGererator() {
        obstacle = new Obstacles(this.ctx, this.wSize, this.imgObsTop, this.imgObsBot, this.playerSize)
        this.obstacles.push(obstacle)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height)
    },
    checkCollision() {
        return this.obstacles.some((obstacle) => {
            return (
                ((this.player._posX + this.playerSize.width) >= obstacle._posTop.x) &&
                (this.player._posY <= (obstacle._posTop.y + obstacle._size.height)) &&
                (this.player._posX <= (obstacle._posTop.x + obstacle._size.width)) &&
                ((this.player._posY + this.playerSize.height) >= obstacle._posTop.y) ||

                ((this.player._posX + this.playerSize.width) >= obstacle._posBot.x) &&
                (this.player._posY <= (obstacle._posBot.y + obstacle._size.height)) &&
                (this.player._posX <= (obstacle._posBot.x + obstacle._size.width)) &&
                ((this.player._posY + this.playerSize.height) >= obstacle._posBot.y)
            )
        })
    },
    gameOver() {
        clearInterval(this.interval)
        alert(`PERDISTE!! Tu Score ha sido: ${this.score}`)
    },
    checkScore() {
        return this.obstacles.some((obj) => {
            return (obj._posTop.x + obj._size.width) < this.player._posX
        })
    }
}

class Background {
    constructor(ctx, wSize, imgBackSource) {
        this._ctx = ctx
        this._wSize = wSize
        this._image = new Image()
        this._image.src = imgBackSource

        this._posX = 0
        this._posY = 0

        this._velX = 1
    }

    draw() {

        this._ctx.drawImage(this._image, this._posX, this._posY, this._wSize.width, this._wSize.height)
        this._ctx.drawImage(this._image, this._posX + this._wSize.width, this._posY, this._wSize.width, this._wSize.height)
    }

    move() {
        if (this._posX <= -this._wSize.width) {
            this._posX = 0
        }
        this._posX -= this._velX
    }
}

class Faby {
    constructor(ctx, wSize, imgPlayerSource, playerSize, gravity) {
        this._ctx = ctx
        this._wSize = wSize
        this._image = new Image()
        this._image.src = imgPlayerSource

        this._playerWidth = playerSize.width
        this._playerHeight = playerSize.height

        this._posX = 20
        this._posY = this._wSize.height / 2 - this._playerHeight / 2
        this._posYact = this._posY

        this._velY = 1

        this._gravity = gravity
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._playerWidth, this._playerHeight)
    }

    move() {
        if (this._posY > 0) {
            this._posY += this._velY;
            this._velY += this._gravity;
        }
        if (this._posY <= 0) {
            this._posY = 1
        }
    }

    jump() {
        window.onkeydown = e => {
            if (e.keyCode === 37) {
                // this._posY -= 10
                this._velY -= 10
            }
            if (this._velY < -10) {
                this._velY = -10
            }
        }
    }
}

class Obstacles {
    constructor(ctx, wSize, imgObsTop, imgObsBot, playerSize) {
        this._ctx = ctx
        this._wSize = wSize

        this._top = new Image()
        this._top.src = imgObsTop

        this._bot = new Image()
        this._bot.src = imgObsBot

        this._space = playerSize.height * 4

        this._size = {
            width: 138,
            height: 504
        }

        this._posTop = {
            x: this._wSize.width,
            y: (Math.random() * ((this._wSize.height - 50 - this._space) - (50)) + (50)) - this._size.height
        }

        this._posBot = {
            x: this._wSize.width,
            y: this._posTop.y + this._space + this._size.height
        }
    }

    draw() {
        this._ctx.drawImage(this._top, this._posTop.x, this._posTop.y, this._size.width, this._size.height)
        this._ctx.drawImage(this._bot, this._posBot.x, this._posBot.y, this._size.width, this._size.height)
    }

    move() {
        this._posBot.x -= 10
        this._posTop.x -= 10
    }
}