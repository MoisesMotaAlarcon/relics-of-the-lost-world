// ---------------------------
// GAMEOBJECT
// ---------------------------
// Clase para los objetos coleccionables del juego.
// Guarda su posición, tamaño, nombre y enlace a Wikipedia.

class GameObject {
  constructor(x, y, w, h, name, url) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.name = name;
    this.wikipediaURL = url;
    this.color = [255, 215, 0];
    this.active = true;
  }

  // ---------------------------
  // DIBUJAR OBJETO
  // ---------------------------
  // Muestra el objeto en pantalla.
  // Si el objeto ya no está activo, no se dibuja.
  // Se representa como un rectángulo con su nombre encima.

  show() {
    if (!this.active) return;

    push();
    imageMode(CENTER);

    // Sombra suave para que destaque sobre el fondo
    noStroke();
    fill(0, 0, 0, 80);
    ellipse(this.pos.x, this.pos.y + this.h / 2 - 4, this.w * 0.75, 10);

    if (egyptRelicImg) {
      image(
        egyptRelicImg,
        this.pos.x,
        this.pos.y,
        this.w,
        this.h
      );
    } else {
      rectMode(CENTER);
      fill(...this.color);
      rect(this.pos.x, this.pos.y, this.w, this.h, 8);
    }

    pop();
  }

  // ---------------------------
  // COMPROBAR COLISIÓN
  // ---------------------------
  // Comprueba si el jugador colisiona con el objeto.
  // Si el objeto no está activo, no se comprueba la colisión.

  checkCollision(player) {
    if (!this.active) return false;

    const px = player.pos.x;
    const py = player.pos.y;
    const pw = player.w;
    const ph = player.h;

    const ox = this.pos.x;
    const oy = this.pos.y;
    const ow = this.w;
    const oh = this.h;

    return (
      px + pw / 2 > ox - ow / 2 &&
      px - pw / 2 < ox + ow / 2 &&
      py + ph / 2 > oy - oh / 2 &&
      py - ph / 2 < oy + oh / 2
    );
  }
}