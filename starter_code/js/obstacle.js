class Obstacle {
  constructor() {
    this.width = 50;
    this.height = 100;
    this.x = undefined;
    this.y = undefined;
    this.obstacles = [
      { name: 'top', src: './images/obstacle_top.png' },
      { name: 'bottom', src: './images/obstacle_bottom.png' },
    ];
    this.obs = new Image();
  }
  getObstacle = () => {
    let index = Math.floor(Math.random() * this.obstacles.length);
    this.obs.src = this.obstacles[index];
    ctx.drawImage(this.obs);
  };
}
