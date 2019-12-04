class Obstacle {
  constructor() {
    this.ctx = myCanvas.getContext('2d'); //myCanvas is ID attribute of canvas
    this.width = 50;
    this.height = 200;
    this.x = myCanvas.width; //myCanvas is ID attribute of canvas
    this.yTop = 0;
    this.yBottom = myCanvas.height - this.height;
    this.vx = 0.5;
    this.obstacles = [
      { name: 'top', src: './images/obstacle_top.png' },
      { name: 'bottom', src: './images/obstacle_bottom.png' },
    ];
    this.obs1 = new Image();
    this.obs2 = new Image();
  }
  getTopObstacle = () => {
    // let index = Math.floor(Math.random() * this.obstacles.length);
    // this.obs.src = this.obstacles[index];
    this.x -= this.vx;
    this.obs1.src = this.obstacles[0].src;
    this.ctx.drawImage(this.obs1, this.x, this.yTop, this.width, this.height);
  };
  getBottomObstacle = () => {
    this.x -= this.vx;
    this.obs2.src = this.obstacles[1].src;
    this.ctx.drawImage(
      this.obs2,
      this.x,
      this.yBottom,
      this.width,
      this.height
    );
  };
}
