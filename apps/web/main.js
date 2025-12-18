import { Game } from "./core/Game.js";
import { Menu } from "./ui/menu.js";
import { WaitWindow } from "./ui/waitWindow.js";
import { GameSockets } from "../net/socket.js";
import { Player } from "./core/Player.js";

const SKIN_PATH = "assets/img/bird.png";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const root = document.getElementById("gameContainer");
  const ctx = canvas.getContext("2d");

  const skin = new Image();
  skin.src = SKIN_PATH;

  const player = new Player("Vladik", 120, 250, skin);
  let roomState = {
    state: "pending",
    players: [player],
  };

  const roomOnUpdateClb = (newState) => {
    console.log(newState);
    waitWindow.setState({
      header: newState.state,
      players: newState.players,
    });
  };

  const game = new Game(ctx, roomState);

  game.roomState = roomState;
  const waitWindow = new WaitWindow(root);
  const menu = new Menu();

  game.onGameEndCallback = () => {
    menu.showGameEndMenu();
  };

  menu.showMenu();
  menu.onStartCallback = () => {
    game.gameReady = true;
  };

  menu.onMultiplayerStart = () => {
    game.gameModeMultiplayer = true;
    waitWindow.show({ title: "Searching server", main: "", bottom: "" });
    GameSockets.setConnection(
      "http://localhost:3000",
      player.name,
      (socket) => {
        socket.emit("findRoom");
      },
      roomOnUpdateClb,
    );
  };

  menu.onRestartCallback = (startNewGame) => {
    game.restart(startNewGame);
  };
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && game.gameReady) {
      if (!game.running) game.start();
      player.flap();
    }
  });
});
