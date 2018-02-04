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
      var bg = new Image();
      bg.src = 'images/bg.png';
      ctx.drawImage(bg, 0, 0,1000,800);
      var flappy = new Image();
      flappy.src='images/flappy.png';
      ctx.drawImage(flappy, 0, 400,120,100);
      var obstacle_top = new Image();
      obstacle_top.src='images/obstacle_top.png';
      ctx.drawImage(obstacle_top, 700, 0, 120, 300);
      var obstacle_bottom = new Image();
      obstacle_bottom.src='images/obstacle_bottom.png';
      ctx.drawImage(obstacle_bottom, 700, 700, 120, 160);
    }
    draw();

    function update() {
      ctx.clearRect(0,0, canvas.width, canvas.height);
      draw();
      obstacle_top.x += obstacle_top.vx;
      obstacle_top.y += obstacle_top.vy;
      obstacle_bottom.x += obstacle_bottom.vx;
      obstacle_bottom.y += obstacle_bottom.vy;
    }
    
    setInterval(update, 20);

    function jump(){
      //Hacer que cambie x e y 
    }

    document.getElementById("flappy").onclick = function() {
      jump();
    };
  };
};