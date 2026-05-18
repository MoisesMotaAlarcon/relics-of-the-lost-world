// ---------------------------
// INPUT DE TECLADO Y RATÓN
// ---------------------------
// Bloquea cualquier input hasta que el audio haya comenzado
function keyPressed() {
  if (!audioStarted) {
    return false; 
  }

  // ---------------------------
  // MENÚ DE PAUSA CON ESC
  // ---------------------------
  if (keyCode === ESCAPE) {
    showEscapeMenu();
    return false;
  }       

  // ---------------------------
  // PAUSA CON P
  // ---------------------------
  if (key === "p" || key === "P") {
    togglePause();
    return false;
  }

  // Si el juego está pausado, bloquear el resto de inputs
  if (isPaused) {
    return false;
  }

  // ---------------------------
  // MUTE / UNMUTE CON M
  // ---------------------------
  if (key === "m" || key === "M") {
    toggleMute();
    return false;
  }

  // ---------------------------
  // CERRAR MODAL WIKI CON SPACE
  // ---------------------------
  if (activeWikiModal && activeWikiModal.active) {
    if (key === " " || keyCode === 32) {
      activeWikiModal.close();
      return false;
    }
    return false;
  }

  if (!player) return false;

  // ---------------------------
  // SALTO CON SPACE
  // ---------------------------
  if (key === " " || keyCode === 32) {
    player.jump();

    if (!hasJumped) {
      hasJumped = true;
      showJumpHint = false;
      hideHint("jump");
    }

    return false;
  }

  // ---------------------------
  // TUTORIAL DE LIANA
  // ---------------------------
  if ((keyCode === UP_ARROW || keyCode === DOWN_ARROW) && showLianaHint) {
    lianaTutorialCompleted = true;
    showLianaHint = false;
    hideHint("liana");
    return false;
  }
}


// ---------------------------
// INPUT DE RATÓN
// ---------------------------
// Bloquea cualquier input hasta que el audio haya comenzado
function mousePressed() {
  if (isPaused) {
    return false;
  }
  if (activeWikiModal && activeWikiModal.active) {
    activeWikiModal.close();
    return false;
  }

  InventoryModal.checkClick();
}