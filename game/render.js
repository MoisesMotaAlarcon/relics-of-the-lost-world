// ======================================================
// RENDER / UPDATE DEL MUNDO
// ======================================================
// Este archivo contiene funciones auxiliares para
// renderizar el fondo, el mundo, los coleccionables
// y otros elementos visuales del juego.

// ---------------------------
// FONDO
// ---------------------------
// Dibuja el fondo según el mundo seleccionado.

function renderBackground() {
  switch (selectedWorld) {
    case "egipto":
      drawParallax(scrollX);
      break;
    case "roma":
      background(233, 214, 196);
      break;
    case "selva":
      background(46, 93, 43);
      break;
    case "catacumbas":
      background(126, 126, 126);
      break;
    default:
      background(200);
      break;
  }
}

// ---------------------------
// MUNDO
// ---------------------------
// Actualiza y renderiza los elementos principales
// del mundo: plataformas, pinchos, lianas y salida final.

function updateAndRenderWorld() {
  updateAndRenderPlatforms();
  renderSpikes();
  renderLianas();
  updateAndRenderEnemies();
  renderFinalExit();
}

// ---------------------------
// PLATAFORMAS
// ---------------------------
// Actualiza y dibuja todas las plataformas del nivel.

function updateAndRenderPlatforms() {
  for (let plat of platforms) {
    if (typeof plat.update === "function") {
      plat.update();
    }

    plat.show();
  }
}

// ---------------------------
// PINCHOS
// ---------------------------
// Dibuja todos los pinchos del nivel.

function renderSpikes() {
  for (let spike of spikes) {
    spike.show();
  }
}

// ---------------------------
// LIANAS
// ---------------------------
// Dibuja todas las lianas del nivel.

function renderLianas() {
  for (let liana of lianas) {
    liana.show();
  }
}

// ---------------------------
// COLECCIONABLES
// ---------------------------
// Dibuja los objetos coleccionables activos y comprueba
// si el jugador los recoge.

function updateAndRenderCollectibles() {
  updateAndRenderCoins();
  
  for (let obj of gameObjects) {
    if (!obj.active) continue;

    obj.show();

    if (obj.checkCollision(player)) {
      collectObject(obj);
    }
  }
}

// ---------------------------
// SALIDA FINAL
// ---------------------------
// Dibuja la salida final del nivel si existe.

function renderFinalExit() {
  if (finalExit) {
    finalExit.show();
  }
}