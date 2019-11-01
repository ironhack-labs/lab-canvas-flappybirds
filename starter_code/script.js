/**
 * Global variables
 */
const images = {
	bg: './images/bg.png',
	flappy: './images/flappy.png',
	logo: './logo.png',
	bottomPipe: './images/obstacle_bottom.png',
	topPipe: './images/obstacle_top.png'
};
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let score = 0;
let interval;
let frames = 0;
let obstacles = [];

/**
 * Classes
 */
class Board {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.vx = 1.5;
		this.width = canvas.width;
		this.height = canvas.height;
		this.img = new Image();
		this.img.src = images.bg;
		this.img.onload = () => {
			this.draw();
		};
	}
	draw() {
		// Moving bg to left by decreasing the his x value
		this.x -= this.vx;
		// Is image outside of the canvas
		if (this.x < -canvas.width) this.x = 0;
		// Draw background
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		// Draw second picture after the first one to fill blank space
		ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
	}
}

class Flappy {
	constructor() {
		this.x = 75;
		this.y = 150;
		this.width = 50;
		this.height = 50;
		this.speedX;
		this.speedY = 30;
		this.gravity = 1.5;
		this.img = new Image();
		this.img.src = images.flappy;
		this.img.onload = () => {
			this.draw();
		};
	}

	draw() {
		this.y += this.gravity;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	fly() {
		this.y -= this.speedY;
	}

	isTouching(obstacle) {
		return (
			this.x < obstacle.x + obstacle.width &&
			this.x + this.width > obstacle.x &&
			this.y < obstacle.y + obstacle.height &&
			this.y + this.height > obstacle.y
		);
	}
}

class Obstacle {
	constructor(y, height, type) {
		this.x = canvas.width + 50;
		this.y = y;
		this.height = height;
		this.width = 50;
		this.imgTop = new Image();
		this.imgTop.src = images.topPipe;
		this.imgBot = new Image();
		this.imgBot.src = images.bottomPipe;
		this.type = type;
	}
	draw() {
		this.x -= 2;
		if (this.type) {
			ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height);
		} else {
			ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height);
		}
	}
}

/**
 * Game instances
 */
const board = new Board();
const flappy = new Flappy();

/**
 * Game functions
 */
//Generate pipes and add them to obstacle array
function generatePipes() {
	// maximo de un pipe
	const max = canvas.height - 100;
	// minimo de un pipe
	const min = 50;
	// espacio calculado a traves de mucho research para saber donde si quepo, sin albur
	const ventanita = 100;
	// expresion matematica, hecha por los dioses, e Isaac Newton, para calcular max o min
	const randomHeight = Math.floor(Math.random() * (max - min));
	if (frames % 300 === 0) {
		obstacles.push(new Obstacle(0, randomHeight, true));
		obstacles.push(new Obstacle(randomHeight + ventanita, canvas.height - randomHeight - ventanita, false));
	}
}
//Draw pipes from obstacles array
function drawPipes() {
	generatePipes();
	obstacles.forEach((pipe) => pipe.draw());
}
//Keep score of the passed obstacle
function keepScore() {
	if (frames % 300 === 0 && frames > 650) {
		score++;
	}
}
//Clears canvas everytime update() is called
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//Update the screen every 1000/60
function update() {
	console.log(board);
	frames++;
	clearCanvas();
	board.draw();
	flappy.draw();
	drawPipes();
	checkCollition();
	keepScore();
}
//Check if bird collides with obstacles
function checkCollition() {
	obstacles.forEach((pipe) => {
		if (flappy.isTouching(pipe)) {
			gameOver();
		}
		if (flappy.y <= 0 || flappy.y >= canvas.height - flappy.height) {
			gameOver();
		}
	});
}
//Stops game if Flappy collides with obstacle
function gameOver() {
	ctx.font = '30px Courier';
	ctx.fillText('Game over', canvas.width / 2 - 75, canvas.height / 2);
	ctx.fillText(`Score: ${score}`, canvas.width / 2 - 75, canvas.height / 2 + 40);

	clearInterval(interval);
}
//Starts game
function startGame() {
	if (interval) return;
	interval = setInterval(update, 1000 / 60);
}
//Restart game
function restart() {
	interval = false;
	flappy.x = 30;
	flappy.y = 70;
	score = 0;
	obstacles = [];
	frames = 0;
	startGame();
}
/**
  * Game listeners
  */
window.onload = function() {
	document.getElementById('start-button').onclick = function() {
		console.log('Start button clicked');
		startGame();
	};
};

document.onkeydown = (e) => {
	switch (e.keyCode) {
		case 32:
			flappy.fly();
			break;

		case 13:
			startGame();
			break;

		case 82:
			restart();
			break;

		default:
			break;
	}
};
