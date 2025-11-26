import { GameSockets } from "../net/socket.js";

export class Menu {
  constructor() {
    this.menuDiv = document.getElementById("menu");
    this.startBtn = document.getElementById("start-btn");
    this.startMultBtn = document.getElementById("startMlt-btn");
    this.backMenuBtn = document.getElementById("backToMenu-btn");
    this.restartBtn = document.getElementById("restart-btn");
    this.menuEndDiv = document.getElementById("menu_end");

    this.searchRoomWindow = document.getElementById("search_window");

    this.onMultiplayerFindRoomCallback = null;
    this.onRestartCallback = null;

    this.room = {
      players: 0,
      state: "searching",
    };

    GameSockets.setConnection("http://localhost:3000");
    GameSockets.onSearchRoomUpdate((room) => {
      this.room = room;
    });
    this.onStartCallback = () => {};

    this.startBtn.onclick = () => {
      this.hideMenu();
      this.onStartCallback();
    };
    this.restartBtn.onclick = () => {
      this.hideGameEndMenu();
      this.onStartCallback();
      this.onRestartCallback(true);
    };

    this.backMenuBtn.onclick = () => {
      this.hideGameEndMenu();
      this.showMenu();
      this.onRestartCallback(false);
    };

    this.startMultBtn.onclick = () => {
      GameSockets.findRoom();
    };
  }

  updateRoomSearchState() {}

  showMenu() {
    this.menuDiv.style.display = "flex";
  }
  hideMenu() {
    this.menuDiv.style.display = "none";
  }
  showGameEndMenu() {
    this.menuEndDiv.style.display = "flex";
  }
  hideGameEndMenu() {
    this.menuEndDiv.style.display = "none";
  }
}
