// ---------------------------
// AUDIO MANAGER
// ---------------------------

// Música de fondo
let egyptMusic;

// Efectos de sonido
let jumpSound;
let coinSound;
let hurtSound;
let gameOverSound;
let relicSound;
let completeSound;
let levelCompleteSound;
let openBagSound;
let inventoryAmbientSound;

// Estado del audio
let audioStarted = false;
let isMuted = false;
let startOverlay = null;

// Volúmenes predeterminados
let musicVolume = 0.04;
let sfxVolume = 0.2;

// ---------------------------
// OVERLAY DE INICIO
// ---------------------------
// Muestra un overlay con el título del mundo y un botón para iniciar el audio y el juego.
// La función showStartOverlay se llama al cargar la página para mostrar el overlay de inicio.
// El botón "Play" inicia el audio y cierra el overlay, permitiendo que el juego comience.

function showStartOverlay() {
  if (startOverlay) return;

  startOverlay = document.createElement("div");
  startOverlay.className = "game-modal-overlay";

  const modal = document.createElement("div");
  modal.className = "game-modal";

  const title = document.createElement("h2");
  title.className = "game-modal-title";
  title.textContent = "Egipto";

  const text = document.createElement("p");
  text.className = "game-modal-text";
  text.textContent = "Encuentra las reliquias ocultas en las ruinas olvidadas";

  const buttons = document.createElement("div");
  buttons.className = "game-modal-buttons";

  const playBtn = document.createElement("button");
  playBtn.className = "game-modal-btn";
  playBtn.textContent = "Play";

  playBtn.addEventListener("click", async () => {
    await startGameAudio();
    closeStartOverlay();
    loop();
  });

  buttons.appendChild(playBtn);
  modal.appendChild(title);
  modal.appendChild(text);
  modal.appendChild(buttons);
  startOverlay.appendChild(modal);

  document.body.appendChild(startOverlay);
}

// ---------------------------
// CERRAR OVERLAY DE INICIO
// ---------------------------
// Elimina el overlay de inicio del DOM.
function closeStartOverlay() {
  if (startOverlay) {
    startOverlay.remove();
    startOverlay = null;
  }
}

// ---------------------------
// INICIAR AUDIO
// ---------------------------
// Solicita al usuario que inicie el audio y carga la música y los efectos de sonido.
// Esta función se llama al hacer clic en el botón "Play" del overlay de inicio.

async function startGameAudio() {
  if (audioStarted) return;

  await userStartAudio();

  loadBackgroundMusic();
  loadSoundEffects();

  setTimeout(() => {
    startBackgroundMusic();
  }, 200);

  audioStarted = true;
}

// ---------------------------
// MÚSICA
// ---------------------------
// Carga la música de fondo y la reproduce en bucle.
// La función startBackgroundMusic espera a que la música esté cargada antes de reproducirla.

function loadBackgroundMusic() {
  egyptMusic = loadSound("/assets/audio/egypt.mp3");
  egyptMusic = loadSound("/assets/audio/egypt.ogg");
}

function startBackgroundMusic() {
  const interval = setInterval(() => {
    if (egyptMusic && egyptMusic.isLoaded()) {
      clearInterval(interval);

      egyptMusic.setLoop(true);
      egyptMusic.setVolume(isMuted ? 0 : musicVolume);

      if (!egyptMusic.isPlaying()) {
        egyptMusic.play();
      }
    }
  }, 100);
}

// ---------------------------
// EFECTOS
// ---------------------------
// Carga los efectos de sonido que se usan durante la partida.

function loadSoundEffects() {
  jumpSound = loadSound("../assets/audio/jump.mp3");
  coinSound = loadSound("../assets/audio/coin.mp3");
  hurtSound = loadSound("../assets/audio/hurt.mp3");
  gameOverSound = loadSound("../assets/audio/game_over.mp3");
  relicSound = loadSound("../assets/audio/relic.mp3");
  completeSound = loadSound("../assets/audio/complete.mp3");
  levelCompleteSound = loadSound("../assets/audio/level_complete.mp3");
  openBagSound = loadSound("../assets/audio/open_bag.mp3");
  inventoryAmbientSound = loadSound("../assets/audio/inventory_ambient.mp3");
}

// ---------------------------
// MUTE
// ---------------------------
// Alterna el estado de muteo del audio.
// Si el audio se silencia, la música queda a volumen cero.

function toggleMute() {
  isMuted = !isMuted;

  if (egyptMusic && egyptMusic.isLoaded()) {
    egyptMusic.setVolume(isMuted ? 0 : musicVolume);
  }
}

// ---------------------------
// SONIDO DE SALTO
// ---------------------------

function playJumpSound() {
  if (jumpSound && jumpSound.isLoaded()) {
    jumpSound.stop();
    jumpSound.setVolume(sfxVolume);
    jumpSound.play();
  }
}

// ---------------------------
// SONIDO DE MONEDA
// ---------------------------

function playCoinSound() {
  if (coinSound && coinSound.isLoaded()) {
    coinSound.stop();
    coinSound.setVolume(sfxVolume);
    coinSound.play();
  }
}

// ---------------------------
// SONIDO DE DAÑO
// ---------------------------

function playHurtSound() {
  if (hurtSound && hurtSound.isLoaded()) {
    hurtSound.stop();
    hurtSound.setVolume(sfxVolume);
    hurtSound.play();
  }
}

// ---------------------------
// SONIDO DE GAME OVER
// ---------------------------

function playGameOverSound() {
  if (gameOverSound && gameOverSound.isLoaded()) {
    gameOverSound.stop();
    gameOverSound.setVolume(sfxVolume);
    gameOverSound.play();
  }
}

// ---------------------------
// SONIDO DE RELIQUIA
// ---------------------------

function playRelicSound() {
  if (relicSound && relicSound.isLoaded()) {
    relicSound.stop();
    relicSound.setVolume(1);
    relicSound.play();
  }
}

// ---------------------------
// SONIDO DE COMPLECIÓN TOTAL
// ---------------------------

function playCompleteSound() {
  if (completeSound && completeSound.isLoaded()) {
    completeSound.stop();
    completeSound.setVolume(sfxVolume);
    completeSound.play();
  }
}

// ---------------------------
// SONIDO DE NIVEL COMPLETADO
// ---------------------------

function playLevelCompleteSound() {
  if (levelCompleteSound && levelCompleteSound.isLoaded()) {
    levelCompleteSound.stop();
    levelCompleteSound.setVolume(0.7);
    levelCompleteSound.play();
  }
}

// ---------------------------
// PAUSAR MÚSICA
// ---------------------------

function pauseBackgroundMusic() {
  if (egyptMusic && egyptMusic.isLoaded() && egyptMusic.isPlaying()) {
    egyptMusic.pause();
  }
}

// ---------------------------
// REANUDAR MÚSICA
// ---------------------------

function resumeBackgroundMusic() {
  if (egyptMusic && egyptMusic.isLoaded() && !egyptMusic.isPlaying()) {
    egyptMusic.setVolume(isMuted ? 0 : musicVolume);
    egyptMusic.play();
  }
}

// ---------------------------
// SONIDO DE INVENTARIO
// ---------------------------

function playOpenBagSound() {
  if (openBagSound && openBagSound.isLoaded()) {
    openBagSound.stop();
    openBagSound.setVolume(1);
    openBagSound.play();
  }
}

// ---------------------------
// AMBIENTE DE INVENTARIO
// ---------------------------

function playInventoryAmbientSound() {
  if (inventoryAmbientSound && inventoryAmbientSound.isLoaded()) {
    inventoryAmbientSound.setLoop(true);
    inventoryAmbientSound.setVolume(sfxVolume);

    if (!inventoryAmbientSound.isPlaying()) {
      inventoryAmbientSound.play();
    }
  }
}

// ---------------------------
// DETENER AMBIENTE DE INVENTARIO
// ---------------------------

function stopInventoryAmbientSound() {
  if (inventoryAmbientSound && inventoryAmbientSound.isLoaded()) {
    inventoryAmbientSound.stop();
  }
}