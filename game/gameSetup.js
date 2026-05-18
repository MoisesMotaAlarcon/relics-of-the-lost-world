// ---------------------------
// CONFIGURACIÓN INICIAL
// ---------------------------

// ---------------------------
// CREAR CANVAS
// ---------------------------
// Esta función se ejecuta una vez al inicio para crear
// el canvas del juego y colocarlo dentro del contenedor HTML.

function createGameCanvas() {
  scaleFactor = windowHeight / BASE_HEIGHT;
  gameHeight = BASE_HEIGHT;
  gameWidth = windowWidth / scaleFactor;

  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("gameContainer");
}

// ---------------------------
// INICIALIZAR JUEGO
// ---------------------------
// Inicializa el nivel, crea el jugador y genera
// los objetos coleccionables del juego.

function initializeGame() {
  initLevel();

  player = new Player(200, gameHeight - 150);
  player.jumpSprites = jumpSprites;

  initObjects();
  initTutorials();
}

// ---------------------------
// ACTUALIZAR CÁMARA
// ---------------------------
// Desplaza la cámara horizontalmente siguiendo al jugador
// sin salir de los límites del mundo.

function updateCamera() {
  scrollX = constrain(player.pos.x - gameWidth / 2, 0, worldWidth - gameWidth);
}

// ---------------------------
// COMPROBAR PELIGROS
// ---------------------------
// Verifica si el jugador ha colisionado con peligros
// del nivel, como los pinchos.

function checkHazards() {
  checkSpikeCollision(player);
  checkEnemyCollision(player);
}

// ---------------------------
// COMPROBAR ESTADO DEL JUEGO
// ---------------------------
// Verifica si el jugador ha perdido la partida.

function checkGameState() {
  checkGameOver(player);
}

// ---------------------------
// COMPROBAR SALIDA DEL NIVEL
// ---------------------------
// Verifica si el jugador ha alcanzado la salida final
// para completar el nivel.

function checkLevelExit() {
  if (finalExit) {
    finalExit.checkTrigger(player);
  }
}

// ---------------------------
// RECOGER OBJETO
// ---------------------------
// Desactiva el objeto recogido, lo añade al inventario
// y abre el modal con la información asociada.

function collectObject(obj) {
  if (!obj.active) return;

  obj.active = false;

  playRelicSound();

  inventory.push({
    name: obj.name,
    url: obj.wikipediaURL
  });

  checkFullCompletion();

  new WikiModalVisual(obj.wikipediaURL, true).open();
}

// ---------------------------
// TOGGLE PAUSA
// ---------------------------
// Alterna el estado de pausa del juego. Si el juego se pausa, se muestra un overlay con información. 
// Si se reanuda, se elimina el overlay y se continúa el juego.

function togglePause() {
  if (isPaused) {
    // REANUDAR
    isPaused = false;

    if (pauseOverlay) {
      pauseOverlay.remove();
      pauseOverlay = null;
    }

    loop();

  } else {
    // PAUSAR
    isPaused = true;
    showPauseOverlay();
    noLoop();
  }
}

// ---------------------------
// MOSTRAR OVERLAY DE PAUSA
// ---------------------------
// Crea un overlay con un mensaje de pausa y lo añade al DOM.

function showPauseOverlay() {
  pauseOverlay = createDiv();
  pauseOverlay.class("game-modal-overlay");

  const modal = createDiv();
  modal.class("game-modal");

  const title = createElement("h2", "Pausa");
  title.class("game-modal-title");
  title.parent(modal);

  const text = createP("Pulsa P para continuar");
  text.class("game-modal-text");
  text.parent(modal);

  pauseOverlay.child(modal);
}

// ---------------------------
// COMPROBAR COMPLECIÓN TOTAL
// ---------------------------
// Verifica si el jugador ha recogido todos los objetos coleccionables del nivel. 
// Si es así, reproduce un sonido de completado y muestra un banner de felicitación.
// La duracion del banner se controla con un temporizador 

function checkFullCompletion() {
  if (fullCompletionPlayed) return;

  const collectedCoins = coins.filter(coin => !coin.active).length;
  const allCoins = collectedCoins === totalCoins;
  const allRelics = inventory.length === totalRelics;

  if (allCoins && allRelics) {
    playCompleteSound();
    fullCompletionPlayed = true;
    completionBannerTimer = 180;
  }
}