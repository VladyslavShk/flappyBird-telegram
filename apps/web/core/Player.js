export class Player {
  constructor(x, y, skin) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.gravity = 20;
    this.jumpForce = -80;
    this.isDead = false;
    this.prevAngle = 0;
    this.playerWidth = 40;
    this.playerHeight = 20;
    this.skin = skin;
  }

  update(deltaTime) {
    this.velocity += this.gravity * deltaTime;
    this.y = Math.max(this.y + this.velocity * deltaTime, 0);
  }

  flap() {
    if (!this.isDead) this.velocity = this.jumpForce;
  }

  draw(ctx) {
    ctx.drawImage(this.skin, this.x, this.y, 40, 40);

    ctx.restore();
  }

  reset(y = 250) {
    this.y = y;
    this.velocity = 0;
    this.isDead = false;
  }
}
