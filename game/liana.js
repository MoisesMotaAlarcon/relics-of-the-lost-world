// ---------------------------
// LIANAS
// ---------------------------
// Clase de lianas.
// Cada liana tiene una posición, altura, ancho visual y de colisión,
// y puede estar unida a una plataforma.
// Si está unida a una plataforma móvil, su posición se actualiza
// automáticamente para seguirla.

class Liana {
  constructor(x, y, h, attachedPlatform = null) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = 50;
    this.attachedPlatform = attachedPlatform;
    this.type = h <= 200 ? "short" : "long";
  }

  // ---------------------------
  // ACTUALIZAR LIANA
  // ---------------------------
  // Si la liana está unida a una plataforma,
  // sigue automáticamente su posición.

  update() {
    if (this.attachedPlatform) {
      const offsetVisual = 18;

      this.x = this.attachedPlatform.x + this.attachedPlatform.w / 2;
      this.y = this.attachedPlatform.y + this.attachedPlatform.h - offsetVisual;
    }
  }

  // ---------------------------
  // DIBUJAR LIANA
  // ---------------------------
  // Dibuja la liana usando la imagen correspondiente
  // según su tipo (corta o larga).

  show() {
    this.update();

    const img = this.type === "short" ? lianaCortaImg : lianaLargaImg;
    if (!img) return;

    push();
    imageMode(CENTER);

    image(
      img,
      this.x,
      this.y + this.h / 2,
      this.w,
      this.h
    );

    pop();
  }

  // ---------------------------
  // COLISIÓN CON PLAYER
  // ---------------------------
  // Comprueba si el jugador está tocando la liana
  // usando una colisión rectangular simple.

  checkCollision(player) {
    this.update();

    const playerLeft = player.pos.x - player.w / 2;
    const playerRight = player.pos.x + player.w / 2;
    const playerTop = player.pos.y - player.h / 2;
    const playerBottom = player.pos.y + player.h / 2;

    const lianaLeft = this.x - this.w / 2;
    const lianaRight = this.x + this.w / 2;
    const lianaTop = this.y;
    const lianaBottom = this.y + this.h;

    return (
      playerRight > lianaLeft &&
      playerLeft < lianaRight &&
      playerBottom > lianaTop &&
      playerTop < lianaBottom
    );
  }
}