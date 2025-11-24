export class Menu {
  constructor() {
    this.menuDiv = document.getElementById("menu");
    this.startBtn = document.getElementById("start-btn");
    this.backMenuBtn = document.getElementById("backToMenu-btn");
    this.restartBtn = document.getElementById("restart-btn");
    this.menuEndDiv = document.getElementById("menu_end");
    this.onRestartCallback = null;
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
  }

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
