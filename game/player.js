// ---------------------------
// PLAYER
// ---------------------------
// Esta clase representa al personaje principal del juego.
// Controla su posición, movimiento, colisiones, animaciones,
// lianas, daño, plataformas móviles y salida final del nivel.

class Player {
  constructor(x, y) {
    // ---------------------------
    // POSICIÓN Y MOVIMIENTO
    // ---------------------------
    // Posición inicial del jugador y vector de velocidad.
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);

    // Dimensiones físicas usadas para colisiones.
    this.w = 50;
    this.h = 80;

    // Dimensiones visuales del sprite.
    this.spriteH = 166;
    this.spriteW = this.spriteH * (700 / 1024);

    // ---------------------------
    // ESTADOS GENERALES
    // ---------------------------
    this.onGround = false;
    this.isMoving = false;
    this.facing = 1;
    this.visible = true;

    // Plataforma actual sobre la que está el jugador.
    this.currentPlatform = null;

    // ---------------------------
    // ANIMACIÓN DE CORRER
    // ---------------------------
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameDelay = 6;

    // ---------------------------
    // ANIMACIÓN DE SALTO
    // ---------------------------
    this.jumpFrame = 0;
    this.jumpSprites = [];
    this.jumpFrameDelay = 10;
    this.jumpCounter = 0;

    // ---------------------------
    // ANIMACIÓN DE ESCALADA
    // ---------------------------
    this.climbFrame = 0;
    this.climbCounter = 0;
    this.climbFrameDelay = 10;

    // ---------------------------
    // ANIMACION DE AGACHARSE
    // ---------------------------
    this.isDown = false;

    // ---------------------------
    // TRANSICIÓN DE BAJAR A LIANA
    // ---------------------------
    this.isDroppingToLiana = false;
    this.dropToLianaTimer = 0;
    this.dropToLianaDuration = 40;
    this.pendingLiana = null;

    // ---------------------------
    // TRANSICIÓN DE SUBIR DESDE LIANA
    // ---------------------------
    this.isClimbingToPlatform = false;
    this.climbToPlatformTimer = 0;
    this.climbToPlatformDuration = 20;
    this.pendingPlatform = null;

    // ---------------------------
    // SISTEMA DE DOBLE SALTO
    // ---------------------------
    this.jumpCount = 0;
    this.maxJumps = 2;

    // ---------------------------
    // RESPAWN
    // ---------------------------
    // Posición a la que vuelve el jugador al reaparecer.
    this.respawnX = x;
    this.respawnY = y;

    // ---------------------------
    // LIANAS
    // ---------------------------
    this.onLiana = false;
    this.currentLiana = null;
    this.lianaCooldown = 0;

    // ---------------------------
    // VIDA
    // ---------------------------
    this.maxHealth = 3;
    this.health = 3;

    // ---------------------------
    // INVULNERABILIDAD
    // ---------------------------
    this.isInvulnerable = false;
    this.invulnerableTimer = 0;
    this.invulnerableDuration = 75;

    // ---------------------------
    // ESTADO DE DAÑO TEMPORAL
    // ---------------------------
    this.isHurt = false;
    this.hurtTimer = 0;
    this.hurtDuration = 18;

    // ---------------------------
    // SALIDA AUTOMÁTICA DEL NIVEL
    // ---------------------------
    // Se usa cuando el jugador entra en la pirámide final.
    this.autoWalk = false;
    this.autoWalkTargetX = 0;
    this.isExitingLevel = false;
  }

// ---------------------------
// ACTUALIZAR PLAYER
// ---------------------------
// Este método se ejecuta en cada frame del juego y
// controla movimiento, gravedad, lianas, daño,
// plataformas móviles, animación y límites del mundo.

update() {

  // ---------------------------
  // TRANSICIÓN DE SUBIR DESDE LIANA
  // ---------------------------
  // Mantiene al jugador pegado a la plataforma y lo mueve con ella, 
  // mientras se muestra la animación de subida desde la liana hasta colocar completamente.
  // Durante esta transición, el jugador no puede moverse ni caer, 
  // y se asegura de que se mantenga sincronizado con la plataforma si esta es móvil.

  if (this.isClimbingToPlatform) {
    this.climbToPlatformTimer--;

    this.isDown = false;
    this.vel.x = 0;
    this.vel.y = 0;
    this.isMoving = false;
    this.onLiana = false;

    if (this.pendingPlatform) {
      if (this.pendingPlatform instanceof MovingPlatform) {
        this.pos.x += this.pendingPlatform.deltaX;
      }

      if (this.pendingPlatform instanceof VerticalMovingPlatform) {
        this.pos.y += this.pendingPlatform.deltaY;
      }
    }

    if (this.climbToPlatformTimer <= 0 && this.pendingPlatform) {
      this.pos.x = this.pendingPlatform.x + this.pendingPlatform.w / 2;
      this.pos.y = this.pendingPlatform.y - this.h / 2;

      this.vel.y = 0;
      this.onGround = true;
      this.currentPlatform = this.pendingPlatform;

      this.isClimbingToPlatform = false;
      this.pendingPlatform = null;
      this.isDown = false;
    }

    this.handleAnimation();
    this.handleBounds();
    return;
  }

  // ---------------------------
  // TRANSICIÓN DE BAJAR A LIANA
  // ---------------------------
  // Mantiene al jugador pegado a la plataforma mientras se muestra la animación de bajada.
  // Durante esta transición, el jugador no puede moverse ni caer,
  // y se asegura de que se mantenga sincronizado con la plataforma si esta es móvil.

  if (this.isDroppingToLiana) {
    this.dropToLianaTimer--;

    this.isDown = true;
    this.vel.x = 0;
    this.vel.y = 0;
    this.isMoving = false;

    if (this.currentPlatform) {
      if (this.currentPlatform instanceof MovingPlatform) {
        this.pos.x += this.currentPlatform.deltaX;
      }

      if (this.currentPlatform instanceof VerticalMovingPlatform) {
        this.pos.y += this.currentPlatform.deltaY;
      }
    }

    if (this.dropToLianaTimer <= 0 && this.pendingLiana) {
      this.onLiana = true;
      this.currentLiana = this.pendingLiana;
      this.onGround = false;
      this.isDown = false;

      this.pendingLiana.update();

      this.pos.x = this.pendingLiana.x;
      this.pos.y = this.pendingLiana.y + this.h / 2 + 10;

      this.pendingLiana = null;
      this.isDroppingToLiana = false;
      this.currentPlatform = null;
    }

    this.handleAnimation();
    this.handleBounds();
    return;
  }

  if (this.autoWalk) {
    this.handleAutoWalk();
    this.handleAnimation();
    return;
  }

  // Temporizador de invulnerabilidad.
  if (this.invulnerableTimer > 0) {
    this.invulnerableTimer--;

    if (this.invulnerableTimer <= 0) {
      this.isInvulnerable = false;
    }
  }

  // Temporizador de estado de daño.
  if (this.hurtTimer > 0) {
    this.hurtTimer--;

    if (this.hurtTimer <= 0) {
      this.isHurt = false;
    }
  }

  // Cooldown para evitar volver a agarrarse inmediatamente a una liana.
  if (this.lianaCooldown > 0) {
    this.lianaCooldown--;
  }

  // Solo puede engancharse a una liana si no está en estado de daño.
  // Si está sobre una plataforma con liana y pulsa abajo, baja directamente a la liana.
  if (!this.isHurt) {
    if (!this.tryDropToLiana()) {
      this.checkLianaCollision();
    }
  }

  if (this.currentPlatform) {
    if (this.currentPlatform instanceof MovingPlatform) {
      this.pos.x += this.currentPlatform.deltaX;
    }

    if (this.currentPlatform instanceof VerticalMovingPlatform) {
      this.pos.y += this.currentPlatform.deltaY;
    }
  }

  // Si está en liana, usa movimiento de liana.
  // Si no, aplica gravedad, movimiento y colisiones normales.
  if (this.onLiana) {
    this.handleLianaMovement();
  } else {
    this.applyGravity();

    if (!this.isHurt) {
      this.handleMovement();
    }

    this.handleCollisions();
  }

  this.handleAnimation();
  this.handleBounds();
}
 
  // ---------------------------
  // DIBUJAR PLAYER
  // ---------------------------
  // Dibuja el personaje en pantalla usando los sprites correspondientes a su estado actual.
  // Si el jugador es invulnerable, parpadea para indicar que no puede recibir daño. 

  show() {
    if (!this.visible) return;

    if (this.isInvulnerable && frameCount % 6 < 3) {
      return;
    }

    imageMode(CENTER);

    const feetOffset = this.spriteH / 2 - this.h / 2;

    push();
    translate(this.pos.x, this.pos.y - feetOffset);
    scale(this.facing, 1);

    // ---------------------------
    // ESCALAR LIANAS
    // ---------------------------
    // Si el jugador está en una liana, mostrar animación de escalada.

    if (this.onLiana && climbSprites.length > 0) {
      const climbW = this.spriteW * 1.15;
      const climbH = this.spriteH * 1.15;

      image(climbSprites[this.climbFrame], -3, 60, climbW, climbH);
    }

    // ---------------------------
    // BAJAR HACIA LIANA
    // ---------------------------
    // Transición visual al bajar desde una plataforma a una liana.

    else if (this.isDroppingToLiana && downSprites.length > 1) {

      // DOWN 1, primeros 25 frames
      if (this.dropToLianaTimer > 25) {

        image(
          downSprites[0],
          0,
          0,
          this.spriteW,
          this.spriteH
        );

      // DOWN 2, últimos 25 frames
      } else {
        
        const downW = this.spriteW * 1.15;
        const downH = this.spriteH * 1.15;

        image(
          downSprites[1],
          0,
          120,
          this.spriteW,
          this.spriteH
        );
      }
    }

    // ---------------------------
    // SUBIR DESDE LIANA A PLATAFORMA
    // ---------------------------
    // Transición visual al subir desde una liana a una plataforma.

    else if (this.isClimbingToPlatform && downSprites.length > 1) {
      image(downSprites[1], 0, 120, this.spriteW, this.spriteH);
    }

    // ---------------------------
    // AGACHARSE
    // ---------------------------
    // Si el jugador está agachado, mostrar sprite de agacharse.

    else if (this.isDown && downSprites.length > 0) {
      image(downSprites[0], 0, 0, this.spriteW, this.spriteH);
    }

    // ---------------------------
    // SALTAR
    // ---------------------------
    else if (!this.onGround && jumpSprites.length > 0) {
      const jumpW = this.spriteW * 1.15;
      const jumpH = this.spriteH * 1.15;

      image(jumpSprites[this.jumpFrame], 0, 0, jumpW, jumpH);
    }

    // ---------------------------
    // CORRER O ESTAR QUIETO
    // ---------------------------
    else {
      image(runSprites[this.currentFrame], 0, 0, this.spriteW, this.spriteH);
    }

    pop();
  }

  // ---------------------------
  // MOVIMIENTO HORIZONTAL
  // ---------------------------
  // Controla el movimiento hacia la izquierda o derecha
  // usando las flechas del teclado.

  handleMovement() {
    if (keyIsDown(DOWN_ARROW) && this.onGround) {
      this.isDown = true;
      this.vel.x = 0;
      this.isMoving = false;
      return;
    }

    this.isDown = false;

    if (keyIsDown(LEFT_ARROW)) {
      this.vel.x = -5;
      this.isMoving = true;
      this.facing = -1;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vel.x = 5;
      this.isMoving = true;
      this.facing = 1;
    } else {
      this.vel.x = 0;
      this.isMoving = false;
    }
  }

  // ---------------------------
  // ANIMACIÓN
  // ---------------------------
  // Controla qué animación debe mostrarse dependiendo
  // de si el jugador está escalando, saltando,
  // quieto o corriendo.

  handleAnimation() {

    // ---------------------------
    // ANIMACIÓN EN LIANA
    // ---------------------------
    if (this.onLiana) {

      const isClimbing =
        keyIsDown(UP_ARROW) ||
        keyIsDown(DOWN_ARROW);

      if (isClimbing && climbSprites.length > 0) {

        this.climbCounter++;

        if (this.climbCounter >= this.climbFrameDelay) {

          this.climbFrame++;

          if (this.climbFrame >= climbSprites.length) {
            this.climbFrame = 0;
          }

          this.climbCounter = 0;
        }
      }

      if (!isClimbing) {
        this.climbFrame = 0;
        this.climbCounter = 0;
      }

      return;
    }

    // ---------------------------
    // ANIMACIÓN DE SALTO
    // ---------------------------
    if (!this.onGround) {

      this.jumpCounter++;

      if (this.jumpCounter >= this.jumpFrameDelay) {

        this.jumpFrame++;

        if (this.jumpFrame >= jumpSprites.length) {
          this.jumpFrame = jumpSprites.length - 1;
        }

        this.jumpCounter = 0;
      }

    // ---------------------------
    // ANIMACIÓN DE CORRER / IDLE
    // ---------------------------
    } else {

      this.jumpFrame = 0;

      if (this.isMoving) {

        this.frameCounter++;

        if (this.frameCounter >= this.frameDelay) {

          this.currentFrame++;

          if (this.currentFrame < 1) this.currentFrame = 1;
          if (this.currentFrame > 3) this.currentFrame = 1;

          this.frameCounter = 0;
        }

      } else {

        this.currentFrame = 0;
      }
    }
  }

  // ---------------------------
  // SALTO
  // ---------------------------
  // Permite al jugador saltar. Si está en una liana,
  // se suelta y salta desde ella. Si no, aplica salto
  // normal o doble salto.

  jump() {   
    if (this.onLiana) {
      this.onLiana = false;
      this.currentLiana = null;
      this.lianaCooldown = 15;
      this.onGround = false;
      this.vel.y = -16;
      this.jumpCount = 1;
      return;
    }

    if (this.jumpCount < this.maxJumps) {
      this.vel.y = this.jumpCount === 0 ? -18 : -16;
      this.jumpCount++;

      playJumpSound();

      if (this.jumpCount === 2 && showDoubleJumpHint) {
        doubleJumpTutorialCompleted = true;
        showDoubleJumpHint = false;
        hideHint("doubleJump");
      }
    }
  }

  // ---------------------------
  // GRAVEDAD
  // ---------------------------
  // Aplica gravedad al jugador aumentando la velocidad
  // vertical y actualizando su posición.

  applyGravity() {
    this.vel.y += 0.8;
    this.pos.add(this.vel);
  }

  // ---------------------------
  // COLISIONES CON PLATAFORMAS
  // ---------------------------
  // Comprueba si el jugador colisiona con plataformas
  // sólidas o one-way, corrigiendo posición y
  // restableciendo el salto cuando toca suelo.

  handleCollisions() {
    this.onGround = false;
    this.currentPlatform = null;

    const prevX = this.pos.x - this.vel.x;
    const prevY = this.pos.y - this.vel.y;

    const prevLeft = prevX - this.w / 2;
    const prevRight = prevX + this.w / 2;
    const prevTop = prevY - this.h / 2;
    const prevBottom = prevY + this.h / 2;

    const currentLeft = this.pos.x - this.w / 2;
    const currentRight = this.pos.x + this.w / 2;
    const currentTop = this.pos.y - this.h / 2;
    const currentBottom = this.pos.y + this.h / 2;

    const landingTolerance = 12;

    for (let plat of platforms) {
      const platLeft = plat.x;
      const platRight = plat.x + plat.w;
      const platTop = plat.y;
      const platBottom = plat.y + plat.h;

      const overlapsX = currentRight > platLeft && currentLeft < platRight;
      const overlapsY = currentBottom > platTop && currentTop < platBottom;

      // ---------------------------
      // PLATAFORMAS ONE-WAY
      // ---------------------------
      // Solo colisionan si el jugador viene por arriba, no está pulsando abajo
      // y está dentro de un margen de tolerancia para facilitar el salto.
      if (plat.isOneWay) {
        if (
          overlapsX &&
          this.vel.y >= 0 &&
          prevBottom <= platTop + landingTolerance &&
          currentBottom >= platTop
        ) {
          this.pos.y = platTop - this.h / 2;
          this.vel.y = 0;
          this.onGround = true;
          this.jumpCount = 0;
          this.currentPlatform = plat;
        }
        continue;
      }

      // ---------------------------
      // PLATAFORMAS SÓLIDAS
      // ---------------------------
      // Colisionan por cualquier lado, corrigiendo posición y velocidad según corresponda.
      // Si no hay solapamiento en ambos ejes, no hay colisión.
      if (!overlapsX || !overlapsY) continue;

      // Colisión por arriba
      if (
        this.vel.y >= 0 &&
        prevBottom <= platTop + landingTolerance &&
        currentBottom >= platTop
      ) {
        this.pos.y = platTop - this.h / 2;
        this.vel.y = 0;
        this.onGround = true;
        this.jumpCount = 0;
        this.currentPlatform = plat;
        continue;
      }

      // Colisión lateral izquierda
      if (prevRight <= platLeft && currentRight >= platLeft) {
        this.pos.x = platLeft - this.w / 2;
        this.vel.x = 0;
        continue;
      }

      // Colisión lateral derecha
      if (prevLeft >= platRight && currentLeft <= platRight) {
        this.pos.x = platRight + this.w / 2;
        this.vel.x = 0;
        continue;
      }

      // Colisión por abajo
      if (prevTop >= platBottom && currentTop <= platBottom && this.vel.y < 0) {
        this.pos.y = platBottom + this.h / 2;
        this.vel.y = 0;
        continue;
      }
    }
  }

  // ---------------------------
  // LÍMITES DEL MUNDO
  // ---------------------------
  // Evita que el jugador salga por la izquierda o
  // derecha del nivel.

  handleBounds() {
    const minX = this.w / 2;
    const maxX = worldWidth - this.w / 2;

    if (this.pos.x < minX) {
      this.pos.x = minX;
      this.vel.x = 0;
    }

    if (this.pos.x > maxX) {
      this.pos.x = maxX;
      this.vel.x = 0;
    }
  }

  // ---------------------------
  // BAJAR DESDE PLATAFORMA A LIANA
  // ---------------------------
  // Si el jugador está sobre una plataforma que tiene una liana
  // asociada y pulsa abajo, atraviesa la plataforma y se engancha
  // directamente a la liana.
 
  tryDropToLiana() {
    if (!this.onGround || !this.currentPlatform) return false;
    if (!keyIsDown(DOWN_ARROW)) return false;
    if (this.isDroppingToLiana) return true;

    for (let liana of lianas) {
      if (liana.attachedPlatform === this.currentPlatform) {
        this.isDroppingToLiana = true;
        this.dropToLianaTimer = this.dropToLianaDuration;
        this.pendingLiana = liana;

        this.isDown = true;
        this.vel.x = 0;
        this.vel.y = 0;
        this.isMoving = false;

        return true;
      }
    }

    return false;
  }

  // ---------------------------
  // SUBIR DESDE LIANA A PLATAFORMA
  // ---------------------------
  // Si el jugador llega a la parte superior de una liana
  // unida a una plataforma y pulsa arriba, se activa una
  // transición visual antes de colocarlo sobre la plataforma.

  tryClimbToPlatform() {
    if (!this.onLiana || !this.currentLiana) return false;
    if (!keyIsDown(UP_ARROW)) return false;

    const platform = this.currentLiana.attachedPlatform;
    if (!platform) return false;

    const topLimit = this.currentLiana.y + this.h / 2;

    if (this.pos.y <= topLimit + 2) {
      this.isClimbingToPlatform = true;
      this.climbToPlatformTimer = this.climbToPlatformDuration;
      this.pendingPlatform = platform;

      this.vel.x = 0;
      this.vel.y = 0;
      this.isMoving = false;
      this.onLiana = false;
      this.currentLiana = null;

      this.pos.x = platform.x + platform.w / 2;
      this.pos.y = platform.y - this.h / 2;

      return true;
    }

    return false;
  }

  // ---------------------------
  // COLISIÓN CON LIANAS
  // ---------------------------
  // Detecta si el jugador toca una liana y se agarra
  // automáticamente a ella, salvo que exista cooldown
  // o se esté pulsando abajo.

  checkLianaCollision() {
    if (this.onLiana) return;
    if (this.lianaCooldown > 0) return;
    if (keyIsDown(DOWN_ARROW)) return;

    for (let liana of lianas) {
      if (liana.checkCollision(this)) {
        this.onLiana = true;
        this.currentLiana = liana;
        this.vel.x = 0;
        this.vel.y = 0;
        this.isMoving = false;
        this.pos.x = liana.x;
        this.jumpCount = 0;
        return;
      }
    }
  }

  // ---------------------------
  // MOVIMIENTO EN LIANA
  // ---------------------------
  // Permite subir y bajar por la liana con las flechas.
  // Si baja hasta el final y sigue pulsando abajo,
  // el jugador se suelta.

  handleLianaMovement() {
    this.vel.x = 0;
    this.vel.y = 0;
    this.isMoving = false;

    if (!this.currentLiana) {
      this.onLiana = false;
      return;
    }

    if (this.tryClimbToPlatform()) {
      return;
    }

    const topLimit = this.currentLiana.y + this.h / 2;
    const bottomLimit = this.currentLiana.y + this.currentLiana.h - this.h / 2 + 60;

    if (keyIsDown(UP_ARROW)) {
      this.pos.y -= 4;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.pos.y += 4;
    }

    this.pos.x = this.currentLiana.x;
    this.pos.y = constrain(this.pos.y, topLimit, bottomLimit);

    if (this.pos.y >= bottomLimit - 1 && keyIsDown(DOWN_ARROW)) {
      const lianaBottom = this.currentLiana.y + this.currentLiana.h;

      this.onLiana = false;
      this.currentLiana = null;
      this.lianaCooldown = 10;
      this.pos.y = lianaBottom + this.h / 2 + 2;
    }
  }

  // ---------------------------
  // CAMINATA AUTOMÁTICA FINAL
  // ---------------------------
  // Hace que el jugador avance automáticamente hacia
  // la puerta al terminar el nivel.

  handleAutoWalk() {
    this.onGround = true;
    this.isMoving = true;
    this.facing = 1;
    this.vel.x = 2;
    this.vel.y = 0;

    this.pos.x += this.vel.x;

    const disappearOffset = 30;

    if (this.pos.x >= this.autoWalkTargetX - disappearOffset) {
      this.pos.x = this.autoWalkTargetX;
      this.visible = false;
      this.autoWalk = false;
      this.isExitingLevel = false;
      this.isMoving = false;
      levelCompleted = true;
      triggerLevelComplete();
    }
  }

  // ---------------------------
  // INICIAR CAMINATA AUTOMÁTICA
  // ---------------------------
  // Activa el desplazamiento automático hacia la salida.

  startAutoWalk(targetX) {
    this.autoWalk = true;
    this.isExitingLevel = true;
    this.autoWalkTargetX = targetX;
    this.vel.x = 0;
    this.vel.y = 0;
    this.onLiana = false;
    this.currentLiana = null;
    this.isHurt = false;
  }

  // ---------------------------
  // RECIBIR DAÑO
  // ---------------------------
  // Reduce vida, activa invulnerabilidad temporal y
  // aplica un pequeño rebote.

  takeDamage(sourceX) {
    if (this.isInvulnerable || isGameOver) return;

    playHurtSound();

    this.health--;

    if (this.health <= 0) {
      this.health = 0;
      triggerGameOver(this);
      return;
    }

    this.isInvulnerable = true;
    this.invulnerableTimer = this.invulnerableDuration;

    this.isHurt = true;
    this.hurtTimer = this.hurtDuration;

    this.onLiana = false;
    this.currentLiana = null;
    this.lianaCooldown = 15;

    if (this.pos.x < sourceX) {
      this.vel.x = -5;
    } else {
      this.vel.x = 5;
    }

    this.vel.y = -8;
    this.onGround = false;
  }
}