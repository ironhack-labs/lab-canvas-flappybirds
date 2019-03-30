FB.Components = {
  players: null,
  obstacles: null,
  init: function(){
    this.Background.init();
    this.ScoreManager.init();
    this.players = [];
    this.obstacles = [];
    this.createPlayer(100, FB.h-150);
    this.createObstacle();
  },
  move: function(){
    this.Background.move();
    this.movePlayers();
    this.checkCanvasBoundaries();
    this.checkObstaclesBoundaries();
    this.checkScoreBoundary();
    this.createObstacle();
    this.moveObstacles();
  },
  draw: function(){
    this.Background.draw();
    this.drawPlayers();
    this.drawObstacles();
    this.ScoreManager.draw();
  },
  movePlayers: function(){
    for(let player of this.players){
      player.move();
    }
  },
  drawPlayers: function(){
    for(let player of this.players){
      player.draw();
    }
  },
  createPlayer: function(x, y){
    this.players.push(new this.Player(x, y));
  },
  createObstacle: function(){
    if(FB.frameCount % 480 === 0){
      this.obstacles.push(new this.Obstacle());
    }
  },
  moveObstacles: function(){
    for(let obstacle of this.obstacles){
      obstacle.move();
    }
  },
  drawObstacles: function(){
    for(let obstacle of this.obstacles){
      obstacle.draw();
    }
  },
  checkCanvasBoundaries: function(){
    for(let player of this.players){
      if(player.y - player.height/2 < 0){
        player.y = player.height/2;
      }
      if(player.y - player.height/2 > FB.h){
        FB.gameOver();
      }
    }
  },
  checkObstaclesBoundaries: function(){
    // O(n**2) complexity!!!
    for(let obstacle of this.obstacles){
      for(let player of this.players){
        if( (player.x + player.width > obstacle.top.x && 
          player.x < obstacle.top.x + obstacle.top.width && 
          player.y < obstacle.top.y + obstacle.top.height) || 
          (player.x + player.width > obstacle.bottom.x && 
          player.x < obstacle.bottom.x + obstacle.bottom.width && 
          player.y + player.height > obstacle.bottom.y)){
            FB.gameOver();
          }
      }
    }
  },
  checkScoreBoundary: function(){
    // O(n**2) complexity!!! Also, if there are only one scoreManager, it does not make so much sense to go through all players...
    for(let obstacle of this.obstacles){
      for(let player of this.players){
        if(player.x === obstacle.top.x + obstacle.top.width/2){
          this.ScoreManager.addPoints(1);
        }
      }
    }
  },

};