export class WaitWindow {
  constructor(root) {
    this.root = root;

    this.waitHTML = document.createElement("div");

    this.html = `
      <div id = 'waitWindow' class='wait-screen hidden' >
          <div class = 'wait-title' id = 'waitTitle'></div>          
          <div class = 'wait-main' id = 'waitMain'></div>

          <div class = 'wait-bottom' id = 'waitBottom'></div>
      </div>
  `;

    this.birdPlayer = `<div id = 'playerCard' class = 'playerCard'>
      <img src="./assets/img/birdNew.png" id='playerCardIco' alt="{PlayerName}">
      <p>{PlayerName}</p>
    </div>`;

    this.root.insertAdjacentHTML("beforeend", this.html);
    this.waitWindow = document.getElementById("waitWindow");
    this.waitTitle = document.getElementById("waitTitle");
    this.waitMain = document.getElementById("waitMain");
    this.waitBottom = document.getElementById("waitBottom");
  }

  setState(waitState) {
    let stateText = document.createTextNode(waitState.header);

    document.getElementById("playerCard")?.remove();

    this.waitWindow.appendChild(stateText);

    console.log(waitState.players);

    waitState.players.forEach((player) => {
      this.waitBottom.insertAdjacentHTML(
        "beforeend",
        this.birdPlayer.replaceAll("{PlayerName}", player.name),
      );
    });
  }

  show(config = {}) {
    const { title, main, bottom } = config;

    if (title) this.waitTitle.innerHTML = title;
    if (main) this.waitMain.innerHTML = main;
    if (bottom) this.waitBottom.innerHTML = bottom;

    this.waitWindow.classList.remove("hidden");
  }

  close() {
    this.waitTitle.innerHTML = "";
    this.waitMain.innerHTML = "";
    this.waitBottom.innerHTML = "";

    this.hide();

    this.waitWindow.classList.add("hidden");
  }
  hide() {
    this.waitWindow.classList.add("hidden");
  }
}
