class Obstacle {
  constructor() {
    this.ctx = myCanvas.getContext('2d'); //myCanvas is ID attribute of canvas
    this.width = 50;
    this.height = 200;
    this.x = myCanvas.width; //myCanvas is ID attribute of canvas
    this.y = 0;
    this.vx = 0.5;
    this.obstacles = [
      { name: 'top', src: './images/obstacle_top.png' },
      { name: 'bottom', src: './images/obstacle_bottom.png' },
    ];
    this.obs = new Image();
  }
  getTopObstacle = () => {
    // let index = Math.floor(Math.random() * this.obstacles.length);
    // this.obs.src = this.obstacles[index];
    this.x -= this.vx;
    this.obs.src = this.obstacles[0].src;
    this.ctx.drawImage(this.obs, this.x, this.y, this.width, this.height);
  };
}
