const obstacleBottomImg = document.createElement('img');
obstacleBottomImg.src = '../images/obstacle_bottom.png';

const obstacleTopImg = document.createElement('img');
obstacleTopImg.src = '../images/obstacle_top.png';

// in progress. Draw obastacle pair
class Obstacle {
	constructor(canvasContext, positionX, positionTopY, positionBottomY, width, topHeight, bottomHeight, speed) {
		this.ctx = canvasContext,
		this.x = positionX,
		this.topY = positionTopY,
        this.BottomY = positionBottomY,
		this.width = width,
		this.topHeight = topHeight,
        this.bottomHeight = bottomHeight
        this.speed = speed;
	}

    // in progress: draw top obstacle 
	draw() {
        this.ctx.drawImage(obstacleTopImg, this.x, this.topY, this.width, this.topHeight);
		this.ctx.drawImage(obstacleBottomImg, this.x, this.BottomY, this.width, this.bottomHeight);
	}

    // in progress: not sure if it will be used
	move() {
		this.x -= this.speed;
	}
}