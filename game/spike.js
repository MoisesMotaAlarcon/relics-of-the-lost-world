// ---------------------------
// PINCHOS
// ---------------------------
// Clase de pinchos.
// Cada pincho tiene una posición, tamaño y una imagen opcional.
// También tiene un área de colisión ajustada para que sea
// más justa para el jugador.

class Spike {
  constructor(x, y, w = 128, h = 64) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.offsetY = 40;

    this.hitboxOffsetX = 8;
    this.hitboxOffsetTop = 18;
    this.hitboxOffsetBottom = 6;
  }

  // ---------------------------
  // DIBUJAR PINCHO
  // ---------------------------
  // Dibuja la imagen del pincho si existe.
  // Si no existe, dibuja una versión simple con triángulos.

  show() {
    push();
    imageMode(CORNER);

    if (spikeImg) {
      image(spikeImg, this.x, this.y + this.offsetY, this.w, this.h);
    } else {
      fill(180, 180, 180);
      noStroke();

      triangle(
        this.x,
        this.y + this.offsetY + this.h,
        this.x + this.w / 4,
        this.y + this.offsetY,
        this.x + this.w / 2,
        this.y + this.offsetY + this.h
      );

      triangle(
        this.x + this.w / 2,
        this.y + this.offsetY + this.h,
        this.x + (3 * this.w) / 4,
        this.y + this.offsetY,
        this.x + this.w,
        this.y + this.offsetY + this.h
      );
    }

    pop();
  }

  // ---------------------------
  // COLISIÓN CON PLAYER
  // ---------------------------
  // Comprueba si el jugador colisiona con la hitbox
  // ajustada del pincho.

  checkCollision(player) {
    const playerLeft = player.pos.x - player.w / 2;
    const playerRight = player.pos.x + player.w / 2;
    const playerTop = player.pos.y - player.h / 2;
    const playerBottom = player.pos.y + player.h / 2;

    const spikeLeft = this.x + this.hitboxOffsetX;
    const spikeRight = this.x + this.w - this.hitboxOffsetX;
    const spikeTop = this.y + this.offsetY + this.hitboxOffsetTop;
    const spikeBottom = this.y + this.offsetY + this.h - this.hitboxOffsetBottom;

    return (
      playerRight > spikeLeft &&
      playerLeft < spikeRight &&
      playerBottom > spikeTop &&
      playerTop < spikeBottom
    );
  }
}