//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

//variables
var interval
var frames = 0
var images = {
    bg: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/bg.png?raw=true",
    flappy: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/flappy.png?raw=true",
    logo: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true",
    obstacle_bottom: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true",
    obstacle_top: "https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true"
}
var pipes = []
//clases
function Board() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image()
    this.image.src = images.bg
    //this.image.onload = ()=>this.draw()
    this.draw = function () {
        this.x--
        if (this.x < -this.width) this.x = 0
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }

    this.drawScore = function () {
        ctx.font = "bold 24px Avenir"
        ctx.fillText("Score: " + Math.floor(frames / 60), 50, 50)
    }
}

function Flappy() {
    Board.call(this)
    this.x = 100
    this.y = 200
    this.width = 40
    this.height = 30
    this.image.src = images.flappy
    //this.image.onload = ()=>this.draw()
    this.draw = function () {
        this.boundaries()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    this.boundaries = function () {
        if (this.y + this.height > canvas.height - 10) {
            this.y = canvas.height - this.height
        }
        else if (this.y < 10) {
            this.y = 10
        }
        else this.y += 2.01

    }

    this.isTouching = function (item) {
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }

} //flappy
//pipe
function Pipe(height, y, position) {
    this.x = canvas.width + 60
    this.y = y || 0
    this.width = 60
    this.height = height
    this.image = new Image()
    this.image.src = position === "top" ? images.obstacle_top : images.obstacle_bottom
    this.draw = function () {
        this.x -= 2
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}

//instances
var bg = new Board()
var flappy = new Flappy()
var pipe = new Pipe()
//main functions
var bgMusic = new Audio()
bgMusic.src = "http://www.mariomayhem.com/downloads/sound_tracks/Super_Mario_Bros._1/15-hurry-underwater-.mp3"
function start() {
    if (bgMusic.paused) bgMusic.play()
    pipes = []
    frames = 0
    flappy = new Flappy()
    if (!interval) interval = setInterval(update, 1000 / 60)
}
function update() {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bg.draw()
    flappy.draw()
    drawPipes()
    bg.drawScore()
    checkFlappyCollition()
}
function gameOver() {
    clearInterval(interval)
    interval = null
    ctx.fillStyle = "red"
    ctx.font = "bold 80px Arial"
    ctx.fillText("GAME OVER", 50, 200)
    ctx.fillStyle = "black"
    ctx.font = "bold 40px Arial"
    ctx.fillText("Tu score: " + Math.floor(frames / 60), 200, 300)
    ctx.font = "bold 20px Arial"
    ctx.fillText("Presiona 'Return' para reiniciar", 50, 350)
    var youlose = new Audio()
    youlose.src = "https://staticcrate.com/content/audio/soundscrate-battle-narrator-you-lose.mp3"
    youlose.play()
    bgMusic.pause()
}

//aux functions
function drawCover() {
    var img = new Image()
    img.src = images.logo
    img.onload = function () {
        bg.draw()
        ctx.drawImage(img, 50, 100, 300, 100)
        ctx.font = "bold 24px Avenir"
        ctx.fillText("Presiona la tecla 'Return' para comenzar", 50, 300)
    }
}

function generatePipes() {
    if (frames % 150 === 0) {
        var height = Math.floor(Math.random() * 200 + 50)
        pipes.push(new Pipe(height, 0, "top"))
        var h = canvas.height - height - 100
        var y = canvas.height - h
        pipes.push(new Pipe(h, y))
    }

}

function drawPipes() {
    generatePipes()
    pipes.forEach(function (pipe) {
        pipe.draw()
    })
}

function checkFlappyCollition() {
    for (var pipe of pipes) {
        if (flappy.isTouching(pipe)) {
            gameOver()
        }
    }
}

//listeners
addEventListener('keyup', function (e) {
    switch (e.keyCode) {
        case 13:
            return start()
        default:
            return
    }
})


addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 32:
            flappy.y -= 40
            return
        default:
            return
    }
})

drawCover()
