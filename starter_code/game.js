let Game = {
	canvas: undefined,
	ctx: undefined,
	fps: 60,
	obstacles: [],
	frameCounter: 0,
	key: {
		TOP_KEY: 38
	},
	score: undefined,

	init: function(id) {
		this.canvas = document.getElementById(id)
		this.ctx = this.canvas.getContext('2d')
		this.canvas.width = window.innerWidth * 0.4
		this.canvas.height = window.innerHeight * 0.7
		this.start()
	},

	start: function() {
		this.restart()
		this.interval = setInterval(() => {
			this.drawAll()
			this.moveAll()
			this.frameCounter++
			this.frameCounter > 10000 ? (this.frameCounter = 0) : null
			this.generateObstacles()
			this.clearObstacles()
			this.isCollision()
			if (this.obstacles[0].posX == 0) {
				this.score++
			}
		}, 1000 / this.fps)
	},

	restart: function() {
		this.background = new BackGround(this.ctx, this.canvas.width, this.canvas.height)
		this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.key)
		clearInterval(this.interval)
		this.obstacles = []
		this.scoreboard = ScoreBoard
		this.scoreboard.init(this.ctx)
		this.score = 0
	},

	drawAll: function() {
		this.background.draw()
		this.player.draw()
		this.obstacles.forEach(obs => obs.draw())
		this.drawScore()
	},

	moveAll: function() {
		this.background.move()
		this.player.move()
		this.obstacles.forEach(obs => obs.move())
	},

	generateObstacles: function() {
		if (this.frameCounter % 130 === 0) {
			this.obstacles.push(new Obstacle(this.ctx, this.canvas.width))
		}
	},
	clearObstacles: function() {
		this.obstacles = this.obstacles.filter(obs => obs.posX + obs.width > 0)
	},
	isCollision: function() {
		this.obstacles.some(obs => {
			if (
				this.player.posX + this.player.width > obs.posX &&
				this.player.posX < obs.posX + obs.width &&
				this.player.posY < obs.posY + obs.height
			) {
				this.gameOver()
			} else if (
				this.player.posX + this.player.width > obs.posX &&
				this.player.posX < obs.posX + obs.width &&
				this.player.posY + this.player.height > obs.posY + obs.height + obs.distance
			) {
				this.gameOver()
			}
		})
	},
	gameOver: function() {
		clearInterval(this.interval)
	},

	drawScore: function() {
		//con esta funcion pintamos el marcador
		this.scoreboard.update(this.score)
	}
}
