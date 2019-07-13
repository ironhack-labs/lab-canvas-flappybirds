class Obstacle {
	constructor(ctx, gameWidth) {
		this.ctx = ctx
		this.gameWidth = gameWidth

		this.imageTop = new Image()
		this.imageBottom = new Image()
		this.imageTop.src = 'images/obstacle_top.png'
		this.imageBottom.src = 'images/obstacle_bottom.png'

		this.posX = this.gameWidth
		this.posY = (Math.random() * (350 - 150) + 150) * -1
		this.width = 100
		this.height = 400
		this.distance = 180
		this.bottomY = this.posY + this.height + this.distance
	}

	draw() {
		this.ctx.drawImage(this.imageTop, this.posX, this.posY, this.width, this.height)
		this.ctx.drawImage(this.imageBottom, this.posX, this.posY + this.height + this.distance, this.width, this.height)
	}

	move() {
		this.posX -= 3
	}
}
