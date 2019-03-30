FB.Helpers = {
  toRadians: function(ang){
    return ang * (Math.PI/180);
  },
  randomIntFromInterval: function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};