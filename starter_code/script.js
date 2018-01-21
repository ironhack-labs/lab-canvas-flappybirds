window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {

    function draw() {
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      var vx = 5;
      var vy = 0;
      var img = new Image();   // Create new img element
      img.src = 'images/bg.png';
      ctx.drawImage(img, 0, 0,1000,800);
      var img2 = new Image();
      img2.src='images/flappy.png';
      ctx.drawImage(img2, 0, 400,120,100);
      var img3 = new Image();
      img3.src='images/obstacle_top.png';
      ctx.drawImage(img3, 700, 0, 120, 300);
      var img4 = new Image();
      img4.src='images/obstacle_bottom.png';
      ctx.drawImage(img4, 700, 700, 120, 120);
    }
    draw();
  };
};