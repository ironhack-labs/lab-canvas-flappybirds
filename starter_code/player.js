class Player {
	constructor(ctx, width, height, keys) {
		this.ctx = ctx
		this.gameWidth = width
		this.gameHeight = height
		this.key = keys

		this.image = new Image()
		this.image.src = 'images/flappy.png'

		this.height = 40
		this.width = 50

		this.posX = 40
		this.posY = this.gameHeight / 2
		this.velY = 1
		this.gravity = 0.4
		this.setListeners()
	}
	draw() {
		this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
	}

	move() {
		if (this.posY < this.gameHeight - this.height && this.posY >= 0) {
			this.posY += this.velY
			this.velY += this.gravity
		} else if (this.posY < 0) {
			this.posY = 0
			this.velY = 0
		} else this.posY = this.gameHeight - this.height
	}

	setListeners() {
		document.onkeydown = e => {
			if (e.keyCode == 38) {
				this.posY -= 25
				this.velY = -8

				console.log('pulsadaaaa')
			}
		}
	}
}
