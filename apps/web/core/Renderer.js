export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawGame(pipes, player, bg) {
    this.clear();

    this.ctx.drawImage(bg, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (const pipe of pipes) {
      pipe.draw(this.ctx);
    }

    player.draw(this.ctx);
  }

  checkCollision(pipes, player) {
    for (const pipe of pipes) {
      if (
        player.x + player.playerWidth >= pipe.x &&
        player.x <= pipe.x + pipe.pipeWidth &&
        (player.y + player.playerHeight >= pipe.pipeHeight + pipe.hGap ||
          player.y <= pipe.pipeHeight)
      ) {
        return true;
      }

      console.log(
        player.y,
        player.playerHeight,
        ">=",
        pipe.pipeHeight + pipe.hGap,
      );
    }

    return false;
  }
}
