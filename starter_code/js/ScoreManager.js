FB.Components.ScoreManager = {
  points: null,
  addPoints: function(n){
    this.points += n;
  },
  draw: function(){
    FB.ctx.font = '64px Arial';
    FB.ctx.fillStyle = 'white';
    FB.ctx.fillText(this.points, 50, 100);
  },
  init: function(){
    this.points = 0;
  }
};