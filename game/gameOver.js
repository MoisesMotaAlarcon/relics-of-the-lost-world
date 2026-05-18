// ---------------------------
// GAME OVER / RESPAWN
// ---------------------------

// Variables para controlar el estado de game over y los modales.
// isGameOver: indica si el juego está en estado de game over.
// gameOverModal: referencia al panel modal de game over.
// gameOverOverlay: capa semitransparente del fondo.
// levelCompleteModal: panel modal al completar el nivel.
// levelCompleteOverlay: capa semitransparente del final de nivel.

let isGameOver = false;
let gameOverModal = null;
let gameOverOverlay = null;
let levelCompleteModal = null;
let levelCompleteOverlay = null;
let escapeMenuModal = null;
let escapeMenuOverlay = null;

// ---------------------------
// COMPROBAR GAME OVER
// ---------------------------
// Comprueba si el jugador ha caído fuera del mapa.

function checkGameOver(player) {
  if (player.pos.y > gameHeight + 200 && !isGameOver) {
    triggerGameOver(player);
  }
}

// ---------------------------
// CERRAR MODAL GAME OVER
// ---------------------------
// Elimina el modal de game over y su overlay del DOM, y reinicia las variables.

function clearGameOverModal() {
  if (gameOverModal) {
    gameOverModal.remove();
    gameOverModal = null;
  }

  if (gameOverOverlay) {
    gameOverOverlay.remove();
    gameOverOverlay = null;
  }
}

// ---------------------------
// CERRAR MODAL FINAL DE NIVEL
// ---------------------------
// Elimina el modal de final de nivel y su overlay del DOM, y reinicia las variables.

function clearLevelCompleteModal() {
  if (levelCompleteModal) {
    levelCompleteModal.remove();
    levelCompleteModal = null;
  }

  if (levelCompleteOverlay) {
    levelCompleteOverlay.remove();
    levelCompleteOverlay = null;
  }
}

// ---------------------------
// MENÚ DE PAUSA
// ---------------------------
// Muestra un menú modal al presionar la tecla ESC, con opciones para continuar o volver al menú principal.
function showEscapeMenu() {
  if (escapeMenuModal) return;

  noLoop();
  isPaused = true;

  escapeMenuOverlay = createDiv();
  escapeMenuOverlay.class("game-modal-overlay");

  escapeMenuModal = createDiv();
  escapeMenuModal.class("game-modal");

  const title = createElement("h2", "Pausa");
  title.parent(escapeMenuModal);
  title.class("game-modal-title");

  const text = createP("¿Qué quieres hacer?");
  text.parent(escapeMenuModal);
  text.class("game-modal-text");

  const buttons = createDiv();
  buttons.parent(escapeMenuModal);
  buttons.class("game-modal-buttons");

  const continueBtn = createButton("Continuar");
  continueBtn.parent(buttons);
  continueBtn.class("game-modal-btn");

  continueBtn.mousePressed(() => {
    closeEscapeMenu();
  });

  const menuBtn = createButton("Menú principal");
  menuBtn.parent(buttons);
  menuBtn.class("game-modal-btn");

  menuBtn.mousePressed(() => {
    closeEscapeMenu();
    window.location.href = "/web/index.html";
  });
}

// ---------------------------
// CERRAR MENÚ DE PAUSA
// ---------------------------
// Elimina el modal de pausa y su overlay del DOM, y reanuda el juego.
function closeEscapeMenu() {
  if (escapeMenuModal) {
    escapeMenuModal.remove();
    escapeMenuModal = null;
  }

  if (escapeMenuOverlay) {
    escapeMenuOverlay.remove();
    escapeMenuOverlay = null;
  }

  isPaused = false;
  loop();
}

// ---------------------------
// ACTIVAR GAME OVER
// ---------------------------
// Detiene el juego y muestra un panel modal con
// información y opciones para reiniciar o volver al menú.

function triggerGameOver(player) {
  if (isGameOver) return;

  isGameOver = true;

  pauseBackgroundMusic();
  playGameOverSound();

  noLoop();

  if (gameOverModal) return;

  // ---------------------------
  // OVERLAY OSCURO
  // ---------------------------
  gameOverOverlay = createDiv();
  gameOverOverlay.class("game-modal-overlay");

  // ---------------------------
  // CONTENEDOR DEL PANEL
  // ---------------------------
  gameOverModal = createDiv();
  gameOverModal.class("game-modal");

  // ---------------------------
  // TÍTULO DEL PANEL
  // ---------------------------
  const title = createElement("h2", "Game Over");
  title.parent(gameOverModal);
  title.class("game-modal-title");

  // ---------------------------
  // TEXTO DEL PANEL
  // ---------------------------
  const text = createP("Aún quedan reliquias por descubrir...");
  text.parent(gameOverModal);
  text.class("game-modal-text");

  // ---------------------------
  // CONTENEDOR DE BOTONES
  // ---------------------------
  const buttons = createDiv();
  buttons.parent(gameOverModal);
  buttons.class("game-modal-buttons");

  // ---------------------------
  // BOTÓN REINICIAR NIVEL
  // ---------------------------
  const restartBtn = createButton("Reiniciar nivel");
  restartBtn.parent(buttons);
  restartBtn.class("game-modal-btn");

  restartBtn.mousePressed(() => {
    clearGameOverModal();
    restartLevel();
    resumeBackgroundMusic();
    loop();
  });

  // ---------------------------
  // BOTÓN MENÚ PRINCIPAL
  // ---------------------------
  const menuBtn = createButton("Menú principal");
  menuBtn.parent(buttons);
  menuBtn.class("game-modal-btn");

  menuBtn.mousePressed(() => {
    clearGameOverModal();
    window.location.href = "/web/index.html";
  });
}

// ---------------------------
// ACTIVAR FINAL DE NIVEL
// ---------------------------
// Muestra un panel cuando el jugador completa el nivel.

function triggerLevelComplete() {
  if (levelCompleteModal) return;

  pauseBackgroundMusic();  
  playLevelCompleteSound();

  noLoop();

  // ---------------------------
  // OVERLAY OSCURO
  // ---------------------------
  levelCompleteOverlay = createDiv();
  levelCompleteOverlay.class("game-modal-overlay");

  // ---------------------------
  // CONTENEDOR DEL PANEL
  // ---------------------------
  levelCompleteModal = createDiv();
  levelCompleteModal.class("game-modal");

  // ---------------------------
  // TÍTULO DEL PANEL
  // ---------------------------
  const title = createElement("h2", "¡Enhorabuena!");
  title.parent(levelCompleteModal);
  title.class("game-modal-title");

  // ---------------------------
  // TEXTO DEL PANEL
  // ---------------------------
  const text = createP("Has recuperado las reliquias de Egipto y desvelado parte de su historia.");
  text.parent(levelCompleteModal);
  text.class("game-modal-text");

  // ---------------------------
  // CONTENEDOR DE BOTONES
  // ---------------------------
  const buttons = createDiv();
  buttons.parent(levelCompleteModal);
  buttons.class("game-modal-buttons");

  // ---------------------------
  // BOTÓN REINICIAR NIVEL
  // ---------------------------
  const restartBtn = createButton("Reiniciar nivel");
  restartBtn.parent(buttons);
  restartBtn.class("game-modal-btn");

  restartBtn.mousePressed(() => {
    clearLevelCompleteModal();
    restartLevel();
    resumeBackgroundMusic();
    loop();
  });

  // ---------------------------
  // BOTÓN MENÚ PRINCIPAL
  // ---------------------------
  const menuBtn = createButton("Menú principal");
  menuBtn.parent(buttons);
  menuBtn.class("game-modal-btn");

  menuBtn.mousePressed(() => {
    clearLevelCompleteModal();
    window.location.href = "/web/index.html";
  });
}

// ---------------------------
// REINICIAR NIVEL COMPLETO
// ---------------------------
// Reinicia el nivel desde el principio.

function restartLevel() {
  levelCompleted = false;
  isGameOver = false;
  inventoryOpen = false;
  fullCompletionPlayed = false;
  completionBannerTimer = 0;

  scrollX = 0;
  inventory = [];
  coins = [];

  if (activeWikiModal) {
    activeWikiModal.close();
    activeWikiModal = null;
  }

  clearGameOverModal();
  clearLevelCompleteModal();

  initLevel();
  initObjects();
  initTutorials();

  player = new Player(200, gameHeight - 150);
  player.jumpSprites = jumpSprites;
}

// ---------------------------
// RESPAWN DEL JUGADOR
// ---------------------------
// Recoloca al jugador en su punto inicial y reinicia
// velocidad, salto, vida y estados temporales.

function respawnPlayer(player) {
  // Recolocar al jugador en su punto de respawn.
  player.pos.x = player.respawnX;
  player.pos.y = player.respawnY;
  player.vel.x = 0;
  player.vel.y = 0;

  // Reset salto y movimiento.
  player.jumpCount = 0;
  player.onGround = false;
  player.isMoving = false;
  player.currentPlatform = null;

  // Reset vida.
  player.health = player.maxHealth;

  // Reset invulnerabilidad.
  player.isInvulnerable = false;
  player.invulnerableTimer = 0;

  // Reset estado de daño.
  player.isHurt = false;
  player.hurtTimer = 0;

  // Reset lianas.
  player.onLiana = false;
  player.currentLiana = null;
  player.lianaCooldown = 0;

  // Reset salida automática.
  player.autoWalk = false;
  player.isExitingLevel = false;
  player.visible = true;
}