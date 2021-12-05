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

            this.obstaclesFrameCount++;

            }, this.fps);
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
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

}