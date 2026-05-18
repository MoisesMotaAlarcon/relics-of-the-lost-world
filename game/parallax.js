// ---------------------------
// PARALLAX
// ---------------------------
// Este módulo gestiona el fondo con efecto parallax.
// Carga las imágenes de fondo y las dibuja con diferentes
// velocidades para crear sensación de profundidad.
// Se utilizan tres capas:
// - cielo (fondo)
// - dunas (plano medio)
// - pirámides (plano frontal)

let cieloImg;
let dunasImg;
let piramidesImg;

// ---------------------------
// CARGAR FONDO PARALLAX
// ---------------------------
// Carga las imágenes necesarias para el fondo.

function preloadParallax() {
  cieloImg = loadImage("/assets/parallax/cielo.png");
  dunasImg = loadImage("/assets/parallax/dunas.png");
  piramidesImg = loadImage("/assets/parallax/piramides.png");
}

// ---------------------------
// DIBUJAR PARALLAX
// ---------------------------
// Dibuja el fondo y las capas con diferentes velocidades
// para crear el efecto de profundidad.

function drawParallax(scrollX) {
  push();
  imageMode(CORNER);

  const viewW = gameWidth;
  const viewH = gameHeight;

  noStroke();
  fill(200);
  rect(0, 0, viewW, viewH);

  const escala = Math.max(viewW / 1920, viewH / 1080);

  // Cielo fijo (plano fondo)
  if (cieloImg) {
    image(cieloImg, 0, 0, viewW, viewH);
  }

  // Dunas (plano medio)
  if (dunasImg) {
    const dunasW = 1920 * escala;
    const dunasH = 1080 * escala;
    const offsetY = 300;

    drawLayer(
      dunasImg,
      scrollX,
      0.28,
      viewH - dunasH + offsetY,
      dunasW,
      dunasH,
      viewW
    );
  }

  // Pirámides (plano frontal)
  if (piramidesImg) {
    const piramidesW = 1920 * escala;
    const piramidesH = 1080 * escala;
    const offsetY = 200;

    drawLayer(
      piramidesImg,
      scrollX,
      0.32,
      viewH - piramidesH + offsetY,
      piramidesW,
      piramidesH,
      viewW
    );
  }

  pop();
}

// ---------------------------
// DIBUJAR CAPA REPETIDA 
// ---------------------------
// Dibuja una capa horizontal repetida para simular
// un fondo continuo en movimiento, optimizando el número
// de imágenes dibujadas.
function drawLayer(img, scrollX, speed, y, layerWidth, layerHeight, viewW) {
  const offsetX = (scrollX * speed) % layerWidth;

  for (let x = -offsetX - layerWidth; x < viewW + layerWidth; x += layerWidth) {
    image(img, x, y, layerWidth, layerHeight);
  }
}