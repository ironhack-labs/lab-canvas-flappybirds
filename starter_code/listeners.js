document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 32:
      flappy.fly();
      break;

    case 13:
      start();
      break;

    case 82:
      restart();
      break;

    default:
      break;
  }
};