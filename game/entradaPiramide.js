//-------------------------------------------
// Clase para la entrada de la pirámide
// ---------------------------
// Esta clase representa la puerta de entrada a la pirámide, que el jugador debe alcanzar para completar el nivel.
// Tiene una zona de activación que, al ser alcanzada por el jugador, inicia un auto-desplazamiento hacia la puerta 
// y marca el nivel como completado.

class PyramidEntrance {
  constructor(x, y, w, h, img = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;

    this.triggered = false;

    this.triggerX = this.x + 100;
    this.triggerW = 90;
  }

  show() {
    imageMode(CORNER);

    if (this.img) {
      image(this.img, this.x, this.y, this.w, this.h);
    } else {
      push();
      fill(160, 120, 60);
      rect(this.x, this.y, this.w, this.h);

      fill(30);
      rect(
        this.x + this.w * 0.35,
        this.y + this.h * 0.35,
        this.w * 0.22,
        this.h * 0.65
      );
      pop();
    }
  }

  checkTrigger(player) {
    if (this.triggered || player.autoWalk || levelCompleted) return;

    const sueloY = gameHeight - 100;
    const playerGroundY = sueloY - player.h / 2;

    // --- Comprobación X ---
    const inTriggerX =
      player.pos.x >= this.triggerX &&
      player.pos.x <= this.triggerX + this.triggerW;

    // --- Comprobación Y ---
    const onCorrectY = abs(player.pos.y - playerGroundY) < 12;
    const grounded = player.onGround;

    // --- Activación ---
    if (inTriggerX && onCorrectY && grounded) {
      this.triggered = true;
      player.startAutoWalk(this.x + this.w / 2);
    }
  }
}