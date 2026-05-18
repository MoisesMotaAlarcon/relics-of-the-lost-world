// ---------------------------
// COIN
// ---------------------------
// Clase para representar las monedas en el juego.
// Cada moneda tiene una posición, tamaño, estado activo y un ángulo para el efecto de giro.
// La función checkCollision utiliza un método de colisión de caja para 
// detectar si el jugador ha recogido la moneda.

class Coin {
  constructor(x, y, size = 50) {
    this.pos = createVector(x, y);
    this.size = size;
    this.active = true;

    this.angle = random(TWO_PI);
    this.rotationSpeed = 0.03;
  }

  update() {
    this.angle += this.rotationSpeed;
  }

  show() {
    if (!this.active) return;

    this.update();

    push();
    translate(this.pos.x, this.pos.y);

    const scaleX = abs(cos(this.angle));

    imageMode(CENTER);

    if (coinImg) {
      image(
        coinImg,
        0,
        0,
        this.size * scaleX,
        this.size
      );
    } else {
      noStroke();
      fill(255, 210, 40);
      ellipse(0, 0, this.size * scaleX, this.size);
    }

    pop();
  }

  checkCollision(player) {
    if (!this.active) return false;

    const playerLeft = player.pos.x - player.w / 2;
    const playerRight = player.pos.x + player.w / 2;
    const playerTop = player.pos.y - player.h / 2;
    const playerBottom = player.pos.y + player.h / 2;

    const coinLeft = this.pos.x - this.size / 2;
    const coinRight = this.pos.x + this.size / 2;
    const coinTop = this.pos.y - this.size / 2;
    const coinBottom = this.pos.y + this.size / 2;

    return (
      playerRight > coinLeft &&
      playerLeft < coinRight &&
      playerBottom > coinTop &&
      playerTop < coinBottom
    );
  }
}

// ---------------------------
// ACTUALIZAR Y DIBUJAR COINS
// ---------------------------
// Recorre todas las monedas activas, las dibuja y verifica si el jugador las ha recogido.
// Si el jugador colisiona con una moneda, se llama a la función collectCoin para manejar la recolección.
function updateAndRenderCoins() {
  for (let coin of coins) {
    if (!coin.active) continue;

    coin.show();

    if (coin.checkCollision(player)) {
      collectCoin(coin);
    }
  }
}

// ---------------------------
// RECOGER COIN
// ---------------------------
// Maneja la lógica cuando el jugador recoge una moneda.
// Marca la moneda como inactiva, reproduce el sonido de recolección y 
// verifica si se han recogido todas las monedas para completar el juego.

function collectCoin(coin) {
  if (!coin.active) return;

  coin.active = false;

  playCoinSound();
  checkFullCompletion();
}