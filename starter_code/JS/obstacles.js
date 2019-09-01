class Obstacles {
	constructor(ctx, gameWidth) {
		this.ctx = ctx
		this.gameWidth = gameWidth

		this.imageTop = new Image()
		this.imageBottom = new Image()
		this.imageTop.src = 'images/obstacle_top.png'
		this.imageBottom.src = 'images/obstacle_bottom.png'

		this.paramX = this.gameWidth
		this.paramY = (Math.random() * (450 - 150) + 150) * -1
		this.width = 100
		this.height = 600
		this.distance = 380
		this.bottomY = this.paramY + this.height + this.distance
	}

	draw() {
		this.ctx.drawImage(this.imageTop, this.paramX, this.paramY, this.width, this.height)
		this.ctx.drawImage(this.imageBottom, this.paramX, this.bottomY, this.width, this.height)
	}

	move() {
		this.paramX -= 5
	}
}
