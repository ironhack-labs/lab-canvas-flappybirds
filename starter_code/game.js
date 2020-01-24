const game = {

    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    
   
   
   
     
    init() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setDimensions();
        this.background = new Background(this.ctx, this.width, this.height, this.src);
        this.bird = new Bird(this.ctx, this.width, this.height, this.keys),
       // this.obstaclesTop = new obstaclesTop(this.ctx, this.width, this.height);
        
        
        this.start();
        


    },

    start() {
        this.interval = setInterval(() => {
            this.clear();
            this.background.move();
            this.background.draw();
            this.bird.move();
           // this.obstaclesTop.draw();
            this.bird.draw();


        }, 1000 / 60)

    },

    setDimensions() {
        this.width = 1000;
        this.height = 600;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);

    }

    
}
