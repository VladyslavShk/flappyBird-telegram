export class Hud {
  constructor() {
    this.hud = document.getElementById("hud");
    this.hud_score = document.getElementById("hud-score");
  }

  showScore() {
    this.hud.visibility = "visible";
    this.hud_score.display = "visible";
  }
  showHud() {
    this.hud.visibility = "visible";
  }
  hideHud() {
    this.hud.visibility = "hidden";
  }
  hideScore() {
    this.hud_score.display = "hidden";
  }
  setScore(score) {
    this.hud_score.textContent = score;
  }
}
