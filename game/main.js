// ---------------------------
// VARIABLES GLOBALES
// ---------------------------
// Este archivo contiene las variables globales que se utilizan en todo el juego,
// como el jugador, la cámara, los objetos del nivel, los enemigos, las imágenes,
// el estado del juego y otros elementos compartidos entre módulos.

// ---------------------------
// PLAYER Y CÁMARA
// ---------------------------
let player;
let scrollX = 0;
let worldWidth;

// ---------------------------
// ESCALADO Y DIMENSIONES
// ---------------------------
const BASE_HEIGHT = 1080;
let scaleFactor = 1;
let gameHeight = BASE_HEIGHT;
let gameWidth = 0;

// ---------------------------
// ESTADO GENERAL DEL JUEGO
// ---------------------------
let selectedWorld = "egipto";
let levelCompleted = false;
let isPaused = false;
let pauseOverlay = null;

// ---------------------------
// SPRITES DEL PLAYER
// ---------------------------
let runSprites = [];
let jumpSprites = [];
let climbSprites = [];
let downSprites = []; 

// ---------------------------
// ELEMENTOS DEL NIVEL
// ---------------------------
let platforms = [];
let spikes = [];
let lianas = [];
let plataformasConLiana = [];
let finalExit = null;

// ---------------------------
// COLECCIONABLES
// ---------------------------
let gameObjects = [];
let totalRelics = 6;

let coins = [];
let totalCoins = 25;

// ---------------------------
// INVENTARIO
// ---------------------------
let inventory = [];
let inventoryOpen = false;
let inventoryButton;

// ---------------------------
// IMÁGENES DEL NIVEL
// ---------------------------
let platformImg;
let brickTileImg;
let spikeImg;
let lianaCortaImg;
let lianaLargaImg;
let pyramidImg;

// ---------------------------
// SPRITES DE ENEMIGOS
// ---------------------------
let mummySprites = [];
let scarabSprites = [];
let batSprites = [];

// ---------------------------
// IMÁGENES DE UI Y COLECCIONABLES
// ---------------------------
let lifeIconImg;
let inventoryIconImg;
let relicIconImg;
let egyptRelicImg;
let coinImg;

// ---------------------------
// NIVEL COMPLETADO
// ---------------------------
let fullCompletionPlayed = false;
let completionBannerTimer = 0;

// ---------------------------
// PRELOAD: CARGAR SPRITES
// ---------------------------
// Esta función se ejecuta antes de iniciar el juego para cargar
// los assets visuales: fondo, plataformas, pinchos, lianas,
// puerta final y sprites del jugador.

function preload() {
  preloadParallax();

  platformImg = loadImage("/assets/tiles/platform_egipto.png");
  brickTileImg = loadImage("/assets/tiles/brick.png");
  spikeImg = loadImage("/assets/tiles/spikes.png");
  lianaCortaImg = loadImage("/assets/tiles/lianaCorta.png");
  lianaLargaImg = loadImage("/assets/tiles/lianaLarga.png");
  pyramidImg = loadImage("/assets/tiles/puerta.png");
  lifeIconImg = loadImage("/assets/ui/life_icon.png");
  inventoryIconImg = loadImage("/assets/ui/inventory_icon.png");
  relicIconImg = loadImage("/assets/ui/relic_icon.png");
  egyptRelicImg = loadImage("/assets/ui/egypt_relic.png");
  coinImg = loadImage("/assets/ui/coin.png");

  for (let i = 1; i <= 4; i++) {
    runSprites.push(loadImage("/assets/sprites/Player/Sprites_run/Sprites_Run_" + i + ".png"));
  }

  for (let i = 1; i <= 3; i++) {
    jumpSprites.push(loadImage("/assets/sprites/Player/Sprites_jump/Sprites_Jump_" + i + ".png"));
  }

  for (let i = 1; i <= 2; i++) {
    climbSprites.push(loadImage("/assets/sprites/Player/Sprites_climb/Sprites_Climb_" + i + ".png"));
  }

  for (let i = 1; i <= 2; i++) {
    downSprites.push(
      loadImage("/assets/sprites/Player/Sprites_down/Sprites_Down_" + i + ".png"));
  }

  for (let i = 1; i <= 4; i++) {
    mummySprites.push(loadImage("/assets/sprites/Enemies/Sprites_mummy/Mummy_" + i + ".png"));
  }

  for (let i = 1; i <= 2; i++) {
    scarabSprites.push(loadImage("/assets/sprites/Enemies/Sprites_scarab/Scarab_" + i + ".png"));
  }

  for (let i = 1; i <= 4; i++) {
    batSprites.push(loadImage("/assets/sprites/Enemies/Sprites_bat/Bat_" + i + ".png"));
  }
}

// ---------------------------
// INICIAR JUEGO
// ---------------------------
// Esta función se ejecuta una vez al cargar la página para crear
// el canvas, inicializar el nivel, crear el jugador y preparar
// los objetos del juego.

function setup() {
  createGameCanvas();
  initializeGame();
  showStartOverlay();
  noLoop();
}

// ---------------------------
// DIBUJAR JUEGO
// ---------------------------
// Esta función se ejecuta continuamente mientras el juego está activo.
// Se encarga de dibujar el fondo, el mundo, los objetos, el jugador,
// la cámara, el estado del juego y la interfaz.

function draw() {
  if (!player) return;

  scaleFactor = windowHeight / BASE_HEIGHT;
  gameWidth = windowWidth / scaleFactor;
  gameHeight = BASE_HEIGHT;

  push();
  scale(scaleFactor);

  renderBackground();

  // Cámara
  push();
  translate(-scrollX, 0);

  updateAndRenderWorld();
  updateAndRenderCollectibles();

  player.update();
  checkLevelExit();
  player.show();

  pop();

  updateCamera();
  checkHazards();
  checkGameState();
  updateTutorials();

  drawHUD();
  drawCompletionBanner();
  InventoryModal.drawIcon();
  pop();
}

// ---------------------------
// AJUSTE DE PANTALLA
// ---------------------------
// Esta función se ejecuta cuando cambia el tamaño de la ventana
// para adaptar el canvas al nuevo tamaño.

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  scaleFactor = windowHeight / BASE_HEIGHT;
  gameWidth = windowWidth / scaleFactor;
  gameHeight = BASE_HEIGHT;
}