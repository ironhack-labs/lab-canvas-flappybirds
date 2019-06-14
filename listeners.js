function keyDown(e) {
  if (interval != 0) {
    switch (e.keyCode) {
      case 32:
        bird.jump();
        break;
    }
  }
}
