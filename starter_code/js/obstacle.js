class Obstacle {
  constructor() {
    this.ctx = canvas.getContext('2d');
    this.width = 50;
    this.height = 200;
    this.x = canvas.width;
    this.y = 0;
    this.vx = 0.5;
    this.obstacles = [
      { name: 'top', src: './images/obstacle_top.png' },
      { name: 'bottom', src: './images/obstacle_bottom.png' },
    ];
    this.obs = new Image();
  }
  getTopObstacles = () => {
    // let index = Math.floor(Math.random() * this.obstacles.length);
    // this.obs.src = this.obstacles[index];
    this.x -= this.vx;
    this.obs.src = this.obstacles[0].src;
    this.ctx.drawImage(this.obs, this.x, this.y, this.width, this.height);
    console.log('Output for: Obstacle -> getTopObstacles -> this.x', this.x);
  };
}
