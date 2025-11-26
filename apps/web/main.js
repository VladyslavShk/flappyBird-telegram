import { Game } from "./core/Game.js";
import { Menu } from "./ui/menu.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const game = new Game(ctx, null);

  const menu = new Menu();
  game.onGameEndCallback = () => {
    menu.showGameEndMenu();
  };

  menu.showMenu();

  menu.onStartCallback = () => {
    game.gameReady = true;
  };

  menu.onMultiplayerFindRoomCallback = () => {};

  menu.onRestartCallback = (startNewGame) => {
    game.restart(startNewGame);
  };
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && game.gameReady) {
      if (!game.running) game.start();
      game.player.flap();
    }
  });
});
