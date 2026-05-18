// ---------------------------
// ENEMIGOS
// ---------------------------
// Sistema de enemigos del nivel.
// Incluye:
// - Momia: patrulla lenta sobre plataforma.
// - Escarabajo: patrulla rápida sobre plataforma.
// - Murciélago: movimiento aéreo en bucle.

// ---------------------------
// CLASE BASE ENEMY
// ---------------------------
// Clase base para enemigos, con propiedades comunes,
// animación por sprites y métodos de colisión.
// Cada tipo de enemigo hereda de esta clase y define
// su propio comportamiento en update().

class Enemy {
  constructor(x, y, w, h, speed = 1, sprites = [], platform = null) {
    this.x = x;
    this.y = y;

    this.startX = x;
    this.startY = y;

    this.w = w;
    this.h = h;

    this.speed = speed;
    this.direction = 1;

    this.sprites = sprites;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameDelay = 10;

    this.platform = platform;
    this.active = true;
  }

  update() {}

  // ---------------------------
  // ANIMACIÓN
  // ---------------------------
  // Avanza entre los sprites del enemigo para crear animación.
  // La velocidad de animación se controla con frameDelay.

  updateAnimation() {
    if (!this.sprites || this.sprites.length === 0) return;

    this.frameCounter++;

    if (this.frameCounter >= this.frameDelay) {
      this.currentFrame++;

      if (this.currentFrame >= this.sprites.length) {
        this.currentFrame = 0;
      }

      this.frameCounter = 0;
    }
  }

  updatePlatformPosition() {
    if (this.platform) {
      this.y = this.platform.y - this.h / 2;
    }
  }

  show() {
    if (!this.active) return;

    push();
    imageMode(CENTER);

    if (this.sprites && this.sprites.length > 0) {
      translate(this.x, this.y);
      scale(this.direction, 1);

      image(
        this.sprites[this.currentFrame],
        0,
        0,
        this.w,
        this.h
      );
    } else {
      rectMode(CENTER);
      fill(180, 80, 60);
      noStroke();
      rect(this.x, this.y, this.w, this.h);
    }

    pop();
  }

  checkCollision(player) {
    if (!this.active) return false;

    const playerLeft = player.pos.x - player.w / 2;
    const playerRight = player.pos.x + player.w / 2;
    const playerTop = player.pos.y - player.h / 2;
    const playerBottom = player.pos.y + player.h / 2;

    const enemyLeft = this.x - this.w / 2;
    const enemyRight = this.x + this.w / 2;
    const enemyTop = this.y - this.h / 2;
    const enemyBottom = this.y + this.h / 2;

    return (
      playerRight > enemyLeft &&
      playerLeft < enemyRight &&
      playerBottom > enemyTop &&
      playerTop < enemyBottom
    );
  }
}

// ---------------------------
// MOMIA
// ---------------------------
// Enemigo lento que patrulla sobre una plataforma.
// Cambia de dirección al llegar a los bordes.

class Mummy extends Enemy {
  constructor(x, platform) {
    const h = 180;
    const w = h * (700 / 1024);

    super(
      x,
      platform.y - h / 2,
      w,
      h,
      2.5,
      mummySprites,
      platform
    );

    this.frameDelay = 12;
  }

  update() {
    if (!this.active) return;

    this.updatePlatformPosition();

    this.x += this.speed * this.direction;

    const leftLimit = this.platform.x + this.w / 2;
    const rightLimit = this.platform.x + this.platform.w - this.w / 2;

    if (this.x <= leftLimit) {
      this.x = leftLimit;
      this.direction = 1;
    }

    if (this.x >= rightLimit) {
      this.x = rightLimit;
      this.direction = -1;
    }

    this.updateAnimation();
  }
}

// ---------------------------
// ESCARABAJO
// ---------------------------
// Enemigo rápido que patrulla sobre una plataforma.
// Cambia de dirección al llegar a los bordes.

class Scarab extends Enemy {
  constructor(x, platform) {
    const w = 100;
    const h = w * (500 / 700);

    super(
      x,
      platform.y - h / 2,
      w,
      h,
      3.5,
      scarabSprites,
      platform
    );

    this.frameDelay = 7;
  }

  update() {
    if (!this.active) return;

    this.updatePlatformPosition();

    this.x += this.speed * this.direction;

    const leftLimit = this.platform.x + this.w / 2;
    const rightLimit = this.platform.x + this.platform.w - this.w / 2;

    if (this.x <= leftLimit) {
      this.x = leftLimit;
      this.direction = 1;
    }

    if (this.x >= rightLimit) {
      this.x = rightLimit;
      this.direction = -1;
    }

    this.updateAnimation();
  }
}

// ---------------------------
// MURCIÉLAGO
// ---------------------------
// Enemigo aéreo con movimiento en bucle.
// Se mueve en un patrón elíptico.

class Bat extends Enemy {
  constructor(x, y, rangeX = 150, rangeY = 60) {
    const w = 120;
    const h = w * (500 / 700);

    super(
      x,
      y,
      w,
      h,
      0.04,
      batSprites,
      null
    );

    this.rangeX = rangeX;
    this.rangeY = rangeY;
    this.angle = random(TWO_PI);
    this.frameDelay = 6;
  }

  update() {
    if (!this.active) return;

    this.angle += this.speed;

    this.x = this.startX + cos(this.angle) * this.rangeX;
    this.y = this.startY + sin(this.angle * 2) * this.rangeY;

    this.direction = cos(this.angle) >= 0 ? 1 : -1;

    this.updateAnimation();
  }
}

// ---------------------------
// ACTUALIZAR Y DIBUJAR ENEMIGOS
// ---------------------------
// Recorre la lista de enemigos, actualiza su posición
// y los dibuja en pantalla.

function updateAndRenderEnemies() {
  for (let enemy of enemies) {
    enemy.update();
    enemy.show();
  }
}

// ---------------------------
// COLISIÓN ENEMIGO - PLAYER
// ---------------------------
// Verifica si el jugador colisiona con algún enemigo.
// Si es así, el jugador recibe daño.

function checkEnemyCollision(player) {
  if (isGameOver || player.isInvulnerable) return;

  for (let enemy of enemies) {
    if (enemy.checkCollision(player)) {
      player.takeDamage(enemy.x);
      return;
    }
  }
}