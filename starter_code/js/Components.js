FB.Components = {
  ctx: null,
  w: null,
  h: null,
  w2: null,
  h2: null,
  players: null,
  init: function(){
    this.Background.init();
    this.players = [];
    this.createPlayer(50, FB.h-150);
  },
  move: function(){
    this.Background.move();
    this.movePlayers();
    this.checkCanvasBoundaries();
  },
  draw: function(){
    this.Background.draw();
    this.drawPlayers();
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
  checkCanvasBoundaries(){
    for(let player of this.players){
      if(player.y - player.height < 0){
        player.y = player.height;
      }
      if(player.y - player.height/2 > FB.h){
        FB.gameOver();
      }
    }
  }

};