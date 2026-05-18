// ---------------------------
// PLATAFORMAS
// ---------------------------
// Clase base de plataformas del nivel.
// Puede representar suelo, plataformas normales o plataformas unidireccionales.
// Cada plataforma tiene una posición, tamaño, tipo (suelo o no),
// si se muestra visualmente o no, y si es unidireccional o no.

class Platform {
  constructor(x, y, w, h, isGround = false, showVisual = true, isOneWay = false) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isGround = isGround;
    this.showVisual = showVisual;
    this.isOneWay = isOneWay;
  }

  show() {
    if (!this.showVisual) return;

    push();
    imageMode(CORNER);
    noStroke();

    if (this.isGround && platformImg) {
      const visualOffset = 20;
      image(platformImg, this.x, this.y - visualOffset, this.w, this.h + visualOffset);
    } 
    else if (brickTileImg) {
      const tileW = 128;
      const tileH = 64;
      const visualOffsetY = 10;

      for (let i = this.x; i < this.x + this.w; i += tileW) {
        const drawW = min(tileW, this.x + this.w - i);
        image(brickTileImg, i, this.y - visualOffsetY, drawW, tileH);
      }

      fill(110, 72, 38);
      rect(this.x, this.y + tileH - visualOffsetY, this.w, max(0, this.h - tileH));
    } 
    else {
      fill(181, 120, 58);
      rect(this.x, this.y, this.w, this.h);
    }

    pop();
  }
}

// ---------------------------
// PLATAFORMAS MÓVILES HORIZONTALES
// ---------------------------
// Plataforma que se mueve hacia izquierda y derecha dentro de un rango.
// Calcula deltaX para que el jugador pueda desplazarse junto con ella.

class MovingPlatform extends Platform {
  constructor(x, y, w, h, range = 200, speed = 2, isOneWay = true, showVisual = true) {
    super(x, y, w, h, false, showVisual, isOneWay);

    this.startX = x;
    this.range = range;
    this.speed = speed;
    this.direction = 1;
    this.deltaX = 0;
  }

  update() {
    this.deltaX = 0;
    const prevX = this.x;

    this.x += this.speed * this.direction;

    if (this.x > this.startX + this.range) {
      this.x = this.startX + this.range;
      this.direction = -1;
    }

    if (this.x < this.startX - this.range) {
      this.x = this.startX - this.range;
      this.direction = 1;
    }

    this.deltaX = this.x - prevX;
  }
}

// ---------------------------
// PLATAFORMAS MÓVILES VERTICALES
// ---------------------------
// Plataforma que se mueve hacia arriba y abajo dentro de un rango.
// Calcula deltaY para que el jugador pueda desplazarse junto con ella.

class VerticalMovingPlatform extends Platform {
  constructor(x, y, w, h, range = 200, speed = 2, isOneWay = true, showVisual = true) {
    super(x, y, w, h, false, showVisual, isOneWay);

    this.startY = y;
    this.range = range;
    this.speed = speed;
    this.direction = 1;
    this.deltaY = 0;
  }

  update() {
    this.deltaY = 0;
    const prevY = this.y;

    this.y += this.speed * this.direction;

    if (this.y > this.startY + this.range) {
      this.y = this.startY + this.range;
      this.direction = -1;
    }

    if (this.y < this.startY - this.range) {
      this.y = this.startY - this.range;
      this.direction = 1;
    }

    this.deltaY = this.y - prevY;
  }
}