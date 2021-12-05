const obstaclesFrame = 90;

class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.background = new Background(ctx);
        this.footer = new Footer(ctx);
        this.player = new Player(ctx);
        this.obstacles = [];
        this.intervalId = undefined;
        this.fps = 1000/60;

        this.obstaclesFrameCount = 0;
        this.score = 0;
    }

    start(){
        if(!this.intervalId){
            this.intervalId = setInterval(() => {
                if(this.obstaclesFrameCount % obstaclesFrame === 0){
                    this.addObstacle();
                    this.obstaclesFrameCount = 0;
                }

            this.clear();

            this.move();

            this.draw();

            this.isColliding();

            this.obstaclesFrameCount++;

            }, this.fps);
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        const previousObstaclesLength = this.obstacles.length;

        console.log(previousObstaclesLength)

        this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.imgTop.width > 0);

        console.log(this.obstacles);

        if(previousObstaclesLength > this.obstacles.length){
            this.score++;
        }
    }
    
    move(){
        this.obstacles.forEach(obstacle => obstacle.move());
        this.footer.move();
        this.player.move();
    }

    draw(){
        this.background.draw();
        this.obstacles.forEach(obstacle => obstacle.draw());
        this.footer.draw();
        this.player.draw();
        this.drawScore();
    }
    
    onKeyDown(keyCode){
        this.player.onKeyDown(keyCode)
    }
    
    onKeyUp(keyCode){
        this.player.onKeyUp(keyCode)
    }

    addObstacle() {
        this.obstacles.push(new Obstacles(ctx));
    }

    isColliding(){
        const condition = this.obstacles.some(obstacle => this.player.colladesWith(obstacle));

        if(condition || this.player.y + this.player.height >= this.ctx.canvas.height - 79){
            this.gameOver();
            this.obstacles = [];
            this.intervalId = undefined;
            this.score = 0;
            this.player.x = 450;
            this.player.y = 252;
        }
    }

    gameOver(){
        clearInterval(this.intervalId);

        this.ctx.save();

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.fillText(`Game Over`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 30);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Your final score`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 30);
        this.ctx.font = 'bold 28px sans-serif';
        this.ctx.fillText(`${this.score}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 60);

        this.ctx.restore();
    }

    drawScore(){
        this.ctx.save();

        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 24px sans-serif';
        this.ctx.fillText(`Score: ${this.score}`, 85, 50);

        this.ctx.restore();
    }


}