// ---------------------------
// INICIALIZAR NIVEL
// ---------------------------
// Esta función se encarga de inicializar todos los elementos del nivel, 
// incluyendo plataformas, pinchos, lianas, enemigos y monedas.

function initLevel() {
  platforms = [];
  spikes = [];
  lianas = [];
  enemies = [];
  coins = [];
  plataformasConLiana = [];
  finalExit = null;

  const sueloY = gameHeight - 100;
  const sueloH = 220;
  worldWidth = 14000;

  buildZona1(sueloY, sueloH);
  buildZona2(sueloY, sueloH);
  buildZona3(sueloY);
  buildZona4(sueloY, sueloH);
  buildZona5(sueloY, sueloH);

  initEnemies();
  initCoins();

  finalExit = new PyramidEntrance(13700, sueloY - 320, 500, 360, pyramidImg);

  initLianas();
}

// ---------------------------
// ZONA 1 - APRENDIZAJE
// ---------------------------
// En esta zona se presentan plataformas básicas y seguras para que el jugador 
// se familiarice con los controles y la mecánica de salto. 
// Las plataformas están dispuestas de manera que el jugador pueda practicar saltos simples 
// y dobles sin riesgo de caer en pinchos o enfrentar peligros.
function buildZona1(sueloY, sueloH) {
  platforms.push(new Platform(0, sueloY, 900, sueloH, true));
  platforms.push(new Platform(1000, sueloY, 800, sueloH, true));

  platforms.push(new Platform(400, sueloY - 180, 256, 64, false, true, true));
  platforms.push(new Platform(800, sueloY - 360, 256, 64, false, true, true));
  platforms.push(new Platform(1200, sueloY - 180, 256, 64, false, true, true));
  platforms.push(new Platform(1300, sueloY - 520, 128, 64, false, true, true));
  platforms.push(new Platform(1600, sueloY - 360, 128, 64, false, true, true));
}

// ---------------------------
// ZONA 2 - PLATAFORMEO Y PRIMER PELIGRO
// ---------------------------
// En esta zona se introducen plataformas más desafiantes y el primer peligro real: 
// un hueco con pinchos. El jugador debe aprender a usar plataformas móviles 
// y a calcular bien los saltos para

function buildZona2(sueloY, sueloH) {
  platforms.push(new Platform(1900, sueloY - 520, 256, 64, false, true, true));

  platforms.push(new Platform(2000, sueloY, 800, sueloH, true));
  platforms.push(new Platform(2800, sueloY - 80, 500, sueloH, true));
  platforms.push(new Platform(3550, sueloY, 1200, sueloH, true));

  platforms.push(new Platform(3300, sueloY + 60, 250, sueloH, false, false, false));
  platforms.push(new Platform(3300, sueloY - 80, 20, 140, false, false, false));
  platforms.push(new Platform(3550, sueloY, 20, 120, false, false, false));

  spikes.push(new Spike(3300, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(3428, sueloY + 60 - 64, 122, 64));

  platforms.push(new Platform(2300, sueloY - 180, 256, 64, false, true, true));
  platforms.push(new Platform(2700, sueloY - 340, 256, 64, false, true, true));
  platforms.push(new Platform(3200, sueloY - 520, 256, 64, false, true, true));

  platforms.push(new Platform(3900, sueloY - 520, 128, 64, false, true, true));
  platforms.push(new Platform(4200, sueloY - 200, 128, 64, false, true, true));
  platforms.push(new Platform(4550, sueloY - 400, 128, 64, false, true, true));
}

// ---------------------------
// ZONA 3 - LIANAS SOBRE EL VACÍO 
// ---------------------------
// Esta zona se centra en el uso de lianas para cruzar grandes huecos con pinchos.
// El jugador debe usar las lianas para evitar caer en los pinchos y avanzar por 
// plataformas cada vez más altas.

function buildZona3(sueloY) {
  const p1 = new Platform(5125, sueloY - 700, 128, 64, false, true, true);
  platforms.push(new Platform(5075, sueloY, 256, 64, false, true, true));
  platforms.push(p1);

  plataformasConLiana.push({ plat: p1, altura: 260 });

  const p11 = new Platform(5450, sueloY - 800, 128, 64, false, true, true);
  platforms.push(p11);

  plataformasConLiana.push({ plat: p11, altura: 210 });

  platforms.push(new Platform(5400, sueloY - 200, 384, 64, false, true, true));

  spikes.push(new Spike(5400, sueloY + 60 - 356, 128, 64));
  spikes.push(new Spike(5528, sueloY + 60 - 356, 128, 64));
  spikes.push(new Spike(5656, sueloY + 60 - 356, 128, 64));

  const p2 = new Platform(5800, sueloY - 750, 128, 64, false, true, true);
  platforms.push(p2);

  plataformasConLiana.push({ plat: p2, altura: 230 });

  platforms.push(new Platform(6150, sueloY - 200, 128, 64, false, true, true));

  const p3 = new Platform(6400, sueloY - 700, 128, 64, false, true, true);
  platforms.push(p3);

  plataformasConLiana.push({ plat: p3, altura: 240 });

  const p4 = new Platform(6700, sueloY - 300, 128, 64, false, true, true);
  platforms.push(p4);

  const p5 = new Platform(7000, sueloY - 420, 256, 64, false, true, true);
  platforms.push(p5);
}

// ---------------------------
// ZONA 4 - TRANSICIÓN A PLATAFORMAS MÓVILES
// ---------------------------
// En esta zona se introduce al jugador a las plataformas móviles, 
// combinándolas con plataformas estáticas y peligrosas.
function buildZona4(sueloY, sueloH) {
  platforms.push(new Platform(7500, sueloY, 500, sueloH, true));

  platforms.push(new Platform(7500, sueloY - 180, 128, 64, false, true, true));
  platforms.push(new Platform(7900, sueloY - 360, 128, 64, false, true, true));
  platforms.push(new Platform(8200, sueloY - 360, 128, 64, false, true, true));
  platforms.push(new Platform(8700, sueloY - 180, 128, 64, false, true, true));

  platforms.push(new Platform(8000, sueloY + 60, 250, sueloH, false, false, false));
  platforms.push(new Platform(8000, sueloY, 20, 140, false, false, false));
  platforms.push(new Platform(8250, sueloY, 20, 120, false, false, false));

  spikes.push(new Spike(8000, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(8128, sueloY + 60 - 64, 128, 64));

  platforms.push(new Platform(8250, sueloY, 600, sueloH, true));

  platforms.push(new VerticalMovingPlatform(8850, sueloY - 180, 128, 40, 200, 1.8));
  platforms.push(new Platform(9100, sueloY - 200, 128, 64, false, true, true));
  platforms.push(new MovingPlatform(9400, sueloY - 400, 256, 40, 150, 2.2));
  platforms.push(new VerticalMovingPlatform(10000, sueloY - 200, 128, 40, 200, 2.5));
  platforms.push(new Platform(10500, sueloY, 128, 64, false, true, true));
}

// ---------------------------
// ZONA 5 - TRAMO FINAL
// ---------------------------
// Esta zona combina plataformas móviles, plataformas con pinchos y un tramo final 
// con una combinación de ambos. El jugador debe usar todo lo aprendido para superar esta 
// sección y llegar a la salida final.
function buildZona5(sueloY, sueloH) {
  const p8 = new MovingPlatform(10500, sueloY - 700, 128, 64, 250, 2.2);
  p8.direction = 1;
  platforms.push(p8);
  plataformasConLiana.push({ plat: p8, altura: 200 });

  const p9 = new MovingPlatform(11390, sueloY - 700, 128, 64, 250, 3);
  p9.direction = -1;
  platforms.push(p9);
  plataformasConLiana.push({ plat: p9, altura: 200 });

  platforms.push(new Platform(10800 - 50, sueloY, 128, 64, false, true, true));
  platforms.push(new Platform(10928 - 50, sueloY, 128, 64, false, true, true));
  platforms.push(new Platform(11056 - 50, sueloY, 256, 64, false, true, true));
  platforms.push(new Platform(11312 - 50, sueloY, 128, 64, false, true, true));
  platforms.push(new Platform(11440 - 50, sueloY, 128, 64, false, true, true));

  spikes.push(new Spike(10800 - 50, sueloY - 64, 128, 64));
  spikes.push(new Spike(10928 - 50, sueloY - 64, 128, 64));
  spikes.push(new Spike(11312 - 50, sueloY - 64, 128, 64));
  spikes.push(new Spike(11440 - 50, sueloY - 64, 128, 64));

  platforms.push(new Platform(11600, sueloY, 500, sueloH, true));

  platforms.push(new Platform(11900, sueloY - 440, 128, 64, false, true, true));
  platforms.push(new Platform(12425, sueloY - 660, 128, 64, false, true, true));
  platforms.push(new Platform(12550, sueloY - 100, 128, 64, false, true, true));
  platforms.push(new Platform(13100, sueloY - 440, 128, 64, false, true, true));

  platforms.push(new Platform(12100, sueloY + 60, 1536, sueloH, false, false, false));
  platforms.push(new Platform(12100, sueloY, 20, 140, false, false, false));
  platforms.push(new Platform(13640, sueloY, 20, 120, false, false, false));

  spikes.push(new Spike(12100, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(12228, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(12356, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(12484, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(12612, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(12740, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(12868, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(12996, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(13124, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(13252, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(13380, sueloY + 60 - 64, 128, 64));
  spikes.push(new Spike(13508, sueloY + 60 - 64, 128, 64));

  const p10 = new Platform(13640, sueloY - 700, 128, 64, false, true, true);
  platforms.push(p10);
  plataformasConLiana.push({ plat: p10, altura: 500 });

  platforms.push(new Platform(13640, sueloY, 500, sueloH, true));
}

// ---------------------------
// LIANAS DESDE PLATAFORMAS
// ---------------------------
// Esta función crea una liana que cuelga desde una plataforma dada, con una altura específica.
function crearLianaDesdePlataforma(plat, altura) {
  const offsetVisual = 18;

  return new Liana(
    plat.x + plat.w / 2,
    plat.y + plat.h - offsetVisual,
    altura,
    plat
  );
}

// ---------------------------
// INICIALIZAR LIANAS
// ---------------------------
// Esta función recorre la lista de plataformas que tienen lianas asociadas y 
// crea las lianas correspondientes.
function initLianas() {
  lianas = [];

  for (let item of plataformasConLiana) {
    lianas.push(crearLianaDesdePlataforma(item.plat, item.altura));
  }
}

// ---------------------------
// COLISIÓN CON SPIKES
// ---------------------------
// Esta función verifica si el jugador ha colisionado con algún spike. Si es así,
// se calcula el centro del spike para determinar la dirección del daño al jugador.
function checkSpikeCollision(player) {
  if (isGameOver) return;

  for (let spike of spikes) {
    if (spike.checkCollision(player)) {
      const spikeCenterX = spike.x + spike.w / 2;
      player.takeDamage(spikeCenterX);
      return;
    }
  }
}

// ---------------------------
// INICIALIZAR OBJETOS
// ---------------------------
// Crea los objetos coleccionables del juego con su posición,
// tamaño, nombre y enlace a Wikipedia.

function initObjects() {
  gameObjects = [];

  const sueloY = gameHeight - 100;

  gameObjects.push(
    new GameObject(
      1360,
      sueloY - 525 - 30,
      50, 70,
      "Osiris",
      "https://es.wikipedia.org/wiki/Osiris"
    )
  );

  gameObjects.push(
    new GameObject(
      3965,
      sueloY - 530 - 30,
      50, 70,
      "Ojo de Horus",
      "https://es.wikipedia.org/wiki/Ojo_de_Horus"
    )
  );

  gameObjects.push(
    new GameObject(
      5520,
      sueloY - 700 - 40,
      50, 70,
      "Máscara de Tutankamón",
      "https://es.wikipedia.org/wiki/Tutankam%C3%B3n"
    )
  );

  gameObjects.push(
    new GameObject(
      8125,
      sueloY - 100 - 30,
      50, 70,
      "Anj",
      "https://es.wikipedia.org/wiki/Anj"
    )
  );

  gameObjects.push(
    new GameObject(
      11100,
      sueloY - 50,
      50, 70,
      "Pirámide de Guiza",
      "https://es.wikipedia.org/wiki/Gran_Pir%C3%A1mide_de_Guiza"
    )
  );

  gameObjects.push(
    new GameObject(
      12620,
      sueloY - 120 - 30,
      50, 70,
      "Bastet",
      "https://es.wikipedia.org/wiki/Bastet"
    )
  );
}

// ---------------------------
// INICIALIZAR ENEMIGOS
// ---------------------------
// Crea los enemigos del juego con su posición, tamaño y comportamiento.
// Se colocan estratégicamente en plataformas específicas para aumentar el desafío.
// Se incluyen diferentes tipos de enemigos, como momias, escarabajos y murciélagos,
// cada uno con su propio patrón de movimiento y ataque.
function initEnemies() {
  enemies = [];

  const sueloY = gameHeight - 100;

  // Plataformas ya creadas
  const platformZona2A = platforms.find(p => p.x === 2000 && p.w === 800);
  const platformZona2B = platforms.find(p => p.x === 2800 && p.w === 500);
  const platformZona2C = platforms.find(p => p.x === 3550 && p.w === 1200);

  const platformZona4A = platforms.find(p => p.x === 7500 && p.w === 500);
  const platformZona4B = platforms.find(p => p.x === 8250 && p.w === 600);

  const platformZona5A = platforms.find(p => p.x === 11600 && p.w === 500);

  // ---------------------------
  // MOMIAS
  // ---------------------------
  if (platformZona2A) {
    enemies.push(new Mummy(2300, platformZona2A));
  }

  if (platformZona2C) {
    enemies.push(new Mummy(4100, platformZona2C));
  }

  if (platformZona4A) {
    enemies.push(new Mummy(7700, platformZona4A));
  }


  // ---------------------------
  // ESCARABAJOS
  // ---------------------------
  if (platformZona2B) {
    enemies.push(new Scarab(3000, platformZona2B));
  }

  if (platformZona2C) {
    enemies.push(new Scarab(4100, platformZona2C));
  }

  if (platformZona4B) {
    enemies.push(new Scarab(8500, platformZona4B));
  }

  if (platformZona5A) {
    enemies.push(new Scarab(11800, platformZona5A));
  }

  // ---------------------------
  // MURCIÉLAGOS EN EL AIRE
  // ---------------------------
  enemies.push(new Bat(5500, sueloY - 500, 220, 50));
  enemies.push(new Bat(9200, sueloY - 520, 160, 60));
  enemies.push(new Bat(10100, sueloY - 520, 120, 70));
  enemies.push(new Bat(12550, sueloY - 550, 400, 70));
}

// ---------------------------
// INICIALIZAR MONEDAS
// ---------------------------
// Crea las monedas del juego con su posición y tamaño.
// Se colocan estratégicamente para ofrecer recompensas por explorar.
function initCoins() {
  coins = [];

  const sueloY = gameHeight - 100;

  coins.push(new Coin(450, sueloY - 240));
  coins.push(new Coin(850, sueloY - 420));
  coins.push(new Coin(1250, sueloY - 240));
  coins.push(new Coin(1350, sueloY - 240));
  coins.push(new Coin(1650, sueloY - 420));

  coins.push(new Coin(2350, sueloY - 240));
  coins.push(new Coin(2750, sueloY - 400));
  coins.push(new Coin(3250, sueloY - 580));
  coins.push(new Coin(3350, sueloY - 580));
  coins.push(new Coin(4600, sueloY - 460));

  coins.push(new Coin(5150, sueloY - 760));
  coins.push(new Coin(5500, sueloY - 860));
  coins.push(new Coin(5850, sueloY - 810));
  coins.push(new Coin(6450, sueloY - 760));
  coins.push(new Coin(7050, sueloY - 480));

  coins.push(new Coin(7550, sueloY - 240));
  coins.push(new Coin(7950, sueloY - 420));
  coins.push(new Coin(8250, sueloY - 420));
  coins.push(new Coin(9150, sueloY - 260));
  coins.push(new Coin(9500, sueloY - 460));

  coins.push(new Coin(10550, sueloY - 760));
  coins.push(new Coin(11400, sueloY - 760));
  coins.push(new Coin(11950, sueloY - 500));
  coins.push(new Coin(12470, sueloY - 720));
  coins.push(new Coin(13150, sueloY - 500));

  totalCoins = coins.length;
} 