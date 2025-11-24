export class Pipe {
  constructor(x, pipeWidth, canvasHeight, canvasWidth, vGap, hGap) {
    this.x = x;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.vGap = vGap;
    this.hGap = hGap;
    this.pipeWidth = pipeWidth;
    this.speed = 2;
    this.pipeHeight = Math.random() * (canvasHeight - hGap);
    this.isRecorded = false;
  }

  update() {
    this.x -= this.speed;
  }

  isOffScreen() {
    return this.x + this.pipeWidth < 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(this.x, 0, this.pipeWidth, this.pipeHeight);
    ctx.fillRect(
      this.x,
      this.pipeHeight + this.hGap,
      this.pipeWidth,
      this.canvasHeight - (this.pipeHeight + this.hGap),
    );
  }
}
