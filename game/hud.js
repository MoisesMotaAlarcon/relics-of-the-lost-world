// ---------------------------
// HUD
// ---------------------------
// Dibuja el HUD (Heads-Up Display) del juego,
// mostrando la vida del jugador y el número
// de reliquias recogidas.

function drawHUD() {
  if (!player) return;

  push();
  resetMatrix();
  rectMode(CORNER);
  imageMode(CORNER);

  const x = 20;
  const y = 85;

  // ---------------------------
  // VIDA: ICONO + BARRAS
  // ---------------------------
  // El icono de vida se muestra a la izquierda, seguido de una serie de 
  // tres barras que representan la salud actual del jugador.

  const lifeIconSize = 30;
  const barsX = x + lifeIconSize + 14;
  const barsY = y + 5;

  const barW = 70;
  const barH = 24;
  const gap = 6;

  if (lifeIconImg) {
    image(lifeIconImg, x, y, lifeIconSize, lifeIconSize);
  }

  for (let i = 0; i < player.maxHealth; i++) {
    stroke(0);
    strokeWeight(2);

    if (i < player.health) {
      fill(60, 200, 60);
    } else {
      fill(70);
    }

    rect(barsX + i * (barW + gap), barsY, barW, barH, 6);
  }

  // ---------------------------
  // RELIQUIAS: ICONO + CONTADOR
  // ---------------------------
  // El icono de reliquia se muestra a la izquierda, seguido de un contador que indica
  // cuántas reliquias ha recogido el jugador en relación al total disponible en el nivel.

  const relicY = y + 55;
  const relicIconSize = 30;
  const relicValue = `${inventory.length}/${totalRelics}`;

  drawCounterBadge(
    relicIconImg,
    relicValue,
    x,
    relicY,
    relicIconSize
  );

  // ---------------------------
  // COINS: ICONO + CONTADOR
  // ---------------------------
  // El icono de moneda se muestra a la izquierda, seguido de un contador que indica
  // cuántas monedas ha recogido el jugador en relación al total disponible en el nivel.

  const coinY = relicY + 45;
  const coinIconSize = 34;
  const collectedCoins = coins.filter(c => !c.active).length;
  const coinValue = `${collectedCoins}/${totalCoins}`;

  drawCounterBadge(
    coinImg,
    coinValue,
    x,
    coinY,
    coinIconSize
  );

  pop();
}

// ---------------------------
// CONTADOR TIPO BADGE
// ---------------------------
// Dibuja un contador con un icono a la izquierda y un recuadro con el número a la derecha.

function drawCounterBadge(iconImg, value, x, y, iconSize) {
  if (iconImg) {
    image(iconImg, x, y, iconSize, iconSize);
  }

  textSize(20);
  textAlign(LEFT, CENTER);

  const paddingX = 10;
  const textW = textWidth(value);
  const boxW = textW + paddingX * 2;
  const boxH = 28;

  const boxX = x + iconSize + 12;
  const boxY = y + iconSize / 2 - boxH / 2;

  fill(30, 20, 10, 180);
  stroke(212, 175, 55);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  noStroke();
  fill(255);
  text(value, boxX + paddingX, boxY + boxH / 2);
}


// ---------------------------
// DIBUJAR BANNER DE COMPLECIÓN
// ---------------------------
// Si el jugador ha recogido todas las monedas y reliquias, se muestra un 
// banner de felicitación en la parte superior de la pantalla durante unos segundos.

function drawCompletionBanner() {
  if (completionBannerTimer <= 0) return;

  completionBannerTimer--;

  push();
  resetMatrix();

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  const cx = width / 2;
  const cy = 130;

  fill(30, 20, 10, 220);
  stroke(212, 175, 55);
  strokeWeight(3);
  rect(cx, cy, 460, 90, 14);

  noStroke();
  fill(255, 220, 120);
  textSize(28);
  text("100% COMPLETADO", cx, cy - 16);

  fill(255);
  textSize(16);
  text("Todas las monedas y reliquias recuperadas", cx, cy + 18);

  pop();
}