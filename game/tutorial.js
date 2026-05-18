// ---------------------------
// TUTORIALES
// ---------------------------
// Gestiona los tutoriales y ayudas que se muestran al jugador durante el nivel. 
// Se encarga de mostrar mensajes de ayuda en momentos clave, como al
// llegar a ciertas zonas o al realizar acciones específicas.

// ---------------------------
// INTRO NIVEL
// ---------------------------
let levelIntroDiv = null;
let levelIntroShown = false;
let levelIntroStartTime = 0;

// ---------------------------
// SALTO
// ---------------------------
let showJumpHint = true;
let hasJumped = false;
let jumpHintActivated = false;
let jumpHintDiv = null;

// ---------------------------
// DOBLE SALTO
// ---------------------------
let showDoubleJumpHint = false;
let doubleJumpHintShown = false;
let doubleJumpTutorialCompleted = false;
let doubleJumpHintDiv = null;

// ---------------------------
// LIANA
// ---------------------------
let showLianaHint = false;
let lianaHintShown = false;
let lianaTutorialCompleted = false;
let lianaHintDiv = null;

// ---------------------------
// INICIALIZAR TUTORIALES
// ---------------------------
// Reinicia el estado de los tutoriales y muestra primero la introducción del nivel.
// También se asegura de limpiar cualquier mensaje de ayuda que 
// pudiera quedar de una partida anterior.

function initTutorials() {
  levelIntroShown = false;
  levelIntroStartTime = 0;

  showJumpHint = true;
  hasJumped = false;
  jumpHintActivated = false;

  showDoubleJumpHint = false;
  doubleJumpHintShown = false;
  doubleJumpTutorialCompleted = false;

  showLianaHint = false;
  lianaHintShown = false;
  lianaTutorialCompleted = false;

  hideHint("levelIntro");
  hideHint("jump");
  hideHint("doubleJump");
  hideHint("liana");

  showHint("jump", "Pulsa SPACE para saltar");
  jumpHintActivated = true;
}

// ---------------------------
// ACTUALIZAR TUTORIALES
// ---------------------------
// Activa ayudas contextuales según el progreso
// del jugador en el nivel.

function updateTutorials() {
  if (!player) return;

  // ---------------------------
  // DOBLE SALTO
  // ---------------------------
  if (
    player.pos.x > 2500 &&
    !doubleJumpHintShown &&
    !doubleJumpTutorialCompleted
  ) {
    showDoubleJumpHint = true;
    doubleJumpHintShown = true;
    showHint("doubleJump", "Pulsa SPACE dos veces para doble salto");
  }

  // ---------------------------
  // LIANA
  // ---------------------------
  if (
    player.pos.x > 4500 &&
    !lianaHintShown &&
    !lianaTutorialCompleted
  ) {
    showLianaHint = true;
    lianaHintShown = true;
    showHint("liana", "Trepa por la liana con ↑ y ↓");
  }
}

// ---------------------------
// MOSTRAR HINT
// ---------------------------
// Crea y muestra un mensaje de ayuda en pantalla
// según el tipo de tutorial.

function showHint(type, message) {
  let targetDiv = null;

  if (type === "levelIntro") {
    if (levelIntroDiv) return;
    levelIntroDiv = createDiv(message);
    levelIntroDiv.class("game-hint game-hint-center");
    targetDiv = levelIntroDiv;

  } else if (type === "jump") {
    if (jumpHintDiv) return;
    jumpHintDiv = createDiv(message);
    jumpHintDiv.class("game-hint");
    targetDiv = jumpHintDiv;

  } else if (type === "doubleJump") {
    if (doubleJumpHintDiv) return;
    doubleJumpHintDiv = createDiv(message);
    doubleJumpHintDiv.class("game-hint");
    targetDiv = doubleJumpHintDiv;

  } else if (type === "liana") {
    if (lianaHintDiv) return;
    lianaHintDiv = createDiv(message);
    lianaHintDiv.class("game-hint");
    targetDiv = lianaHintDiv;
  }

  if (targetDiv) {
    targetDiv.parent("gameContainer");
  }
}

// ---------------------------
// OCULTAR HINT
// ---------------------------
// Elimina de pantalla el mensaje de ayuda indicado.

function hideHint(type) {
  if (type === "levelIntro" && levelIntroDiv) {
    levelIntroDiv.remove();
    levelIntroDiv = null;

  } else if (type === "jump" && jumpHintDiv) {
    jumpHintDiv.remove();
    jumpHintDiv = null;

  } else if (type === "doubleJump" && doubleJumpHintDiv) {
    doubleJumpHintDiv.remove();
    doubleJumpHintDiv = null;

  } else if (type === "liana" && lianaHintDiv) {
    lianaHintDiv.remove();
    lianaHintDiv = null;
  }
}
