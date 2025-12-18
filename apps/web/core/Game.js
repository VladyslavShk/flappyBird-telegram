import { Hud } from "../ui/hud.js";
import { Pipe } from "./Pipe.js";
import { Player } from "./Player.js";
import { Renderer } from "./Renderer.js";

const SKIN_PATH = "assets/img/bird.png";
const BACKGROUND_PATH = "assets/img/background.jpg";
export class Game {
  constructor(ctx, roomState) {
    this.ctx = ctx;

    this.bg = new Image();
    this.skin = new Image();
    this.skin.src = SKIN_PATH;
    this.bg.src = BACKGROUND_PATH;
    this.roomState = roomState;
    this.gameModeMultiplayer = true;
    this.bg.onload = () => {
      this.ctx.drawImage(
        this.bg,
        0,
        0,
        this.ctx.canvas.width + 100,
        this.ctx.canvas.height,
      );
    };

    this.renderer = new Renderer(ctx);
    this.hud = new Hud();
    this.pipes = [];

    this.score = 0;
    this.running = false;
    this.lastTime = null;
    this.gameReady = false;
    this.backGround = new Image();
    this.onGameEndCallback = null;
    this.loop();
  }

  start() {
    this.running = true;
    this.roomState.players.forEach((player) => player.reset());
    this.score = 0;
    this.lastTime = null;
    this.hud.showScore();
    this.hud.setScore(this.score);
    this.loop();
  }
  restart(startNewGame) {
    this.running = false;
    this.gameReady = startNewGame;
    this.roomState.players.forEach((player) => player.reset());
    this.score = 0;
    this.pipes = [];
    this.renderer.clear();
    this.lastTime = null;
    this.loop();
  }
  loop() {
    this.update();
    this.renderer.drawGame(this.pipes, this.roomState.players, this.bg);

    if (this.roomState.players.length === 1) {
      if (this.renderer.checkCollision(this.pipes, this.roomState.players[0])) {
        this.running = false;
        this.gameReady = false;
        this.onGameEndCallback();
        return;
      }
    }
    if (!this.running) return;

    requestAnimationFrame(() => this.loop());
  }

  update() {
    const timeStamp = Math.floor(Date.now() / 100);

    if (this.lastTime === null) this.lastTime = timeStamp;

    const deltaTime = timeStamp - this.lastTime;

    this.lastTime = timeStamp;
    this.roomState.players.forEach((player) => player.update(deltaTime));

    if (this.pipes.length === 0 || this.pipes[this.pipes.length - 1].x < 200) {
      this.pipes.push(
        new Pipe(
          this.ctx.canvas.width,
          40,
          this.ctx.canvas.height,
          this.ctx.canvas.width,
          300,
          300,
        ),
      );
    }

    for (const pipe of this.pipes) {
      if (
        pipe.x + pipe.pipeWidth <
          this.roomState.players[0].x + this.roomState.players[0].playerWidth &&
        !pipe.isRecorded
      ) {
        pipe.isRecorded = true;
        this.score += 1;

        this.hud.setScore(this.score);
      }
    }

    console.log(this.score);

    this.pipes.forEach((pipe) => pipe.update());

    this.pipes = this.pipes.filter((pipe) => !pipe.isOffScreen());
  }
}
