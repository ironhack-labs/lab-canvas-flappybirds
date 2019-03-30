FB.Components.ScoreManager = {
  points: null,
  addPoints: function(n){
    this.points += n;
  },
  draw: function(){
    FB.ctx.font = '64px Arial';
    FB.ctx.fillStyle = 'white';
    FB.ctx.textAlign = 'center';
    FB.ctx.fillText(this.points, FB.w/2, 100);
  },
  init: function(){
    this.points = 0;
  }
};