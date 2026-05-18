// ---------------------------
// INVENTORY MODAL
// ---------------------------
// Clase del inventario.
// Muestra los objetos recogidos y permite abrir su ficha en Wikipedia.
// Se accede a través de un icono en pantalla.

class InventoryModal {
  constructor(items) {
    this.items = items;
    this.div = null;
    this.closeBtn = null;
  }

  // ---------------------------
  // ABRIR INVENTARIO
  // ---------------------------
  // Crea y muestra la ventana modal del inventario con los objetos recogidos.
  // Pausa el juego mientras el inventario está abierto.

  open() {
    if (inventoryOpen) return;

    inventoryOpen = true;
    pauseBackgroundMusic();
    playOpenBagSound();
    playInventoryAmbientSound();
    noLoop();

    this.div = createDiv("");
    this.div.id("inventoryModal");
    this.div.class("game-modal inventory-modal");

    const title = createElement("h2", "Inventario");
    title.parent(this.div);
    title.class("game-modal-title inventory-modal-title");

    const list = createDiv();
    list.parent(this.div);
    list.class("inventory-list");

    if (this.items.length === 0) {
      const emptyText = createP("No hay objetos recogidos.");
      emptyText.parent(list);
      emptyText.class("game-modal-text inventory-empty-text");
    } else {
      for (let obj of this.items) {
        const itemButton = createDiv();
        itemButton.parent(list);
        itemButton.class("inventory-relic-btn");

        const imgBox = createDiv();
        imgBox.parent(itemButton);
        imgBox.class("inventory-relic-img-box");

        if (obj.wikiImage) {
          const img = createImg(obj.wikiImage, obj.name);
          img.parent(imgBox);
          img.class("inventory-relic-img");
        } else {
          InventoryModal.loadWikiImage(obj, imgBox);
        }

        const relicName = createSpan(obj.name);
        relicName.parent(itemButton);
        relicName.class("inventory-relic-name");

        itemButton.mousePressed(() => {
          const wiki = new WikiModalVisual(obj.url, true, obj);
          wiki.open();
        });
      }
    }

    this.closeBtn = createButton("Cerrar");
    this.closeBtn.parent(this.div);
    this.closeBtn.class("menu-btn inventory-close-btn");
    this.closeBtn.mousePressed(() => this.close());
  }

  // ---------------------------
  // CERRAR INVENTARIO
  // ---------------------------
  // Elimina la ventana modal del inventario y reanuda el juego.

  close() {
    if (this.div) {
      this.div.remove();
      this.div = null;
    }

    this.closeBtn = null;
    inventoryOpen = false;

    stopInventoryAmbientSound();
    resumeBackgroundMusic();
    loop();
  }

  // ---------------------------
  // CARGAR IMAGEN DE WIKIPEDIA
  // ---------------------------
  // Obtiene la imagen de Wikipedia para mostrarla en el inventario.

  static async loadWikiImage(obj, parentDiv) {
    const title = obj.url.split("/").pop();
    const apiUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${title}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.originalimage && data.originalimage.source) {
        obj.wikiImage = data.originalimage.source;

        const img = createImg(obj.wikiImage, obj.name);
        img.parent(parentDiv);
        img.class("inventory-relic-img");
      }
    } catch (err) {
      console.error("Error al cargar imagen de inventario:", err);
    }
  }

  // ---------------------------
  // DIBUJAR ICONO
  // ---------------------------
  // Dibuja el icono del inventario en la esquina superior izquierda de la pantalla.

  static drawIcon() {
    push();
    resetMatrix();

    imageMode(CORNER);
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    noStroke();

    inventoryButton = { x: 20, y: 20, w: 45, h: 45 };

    if (inventoryIconImg) {
      image(
        inventoryIconImg,
        inventoryButton.x,
        inventoryButton.y,
        inventoryButton.w,
        inventoryButton.h
      );
    } else {
      fill(212, 175, 55);
      rect(
        inventoryButton.x,
        inventoryButton.y,
        inventoryButton.w,
        inventoryButton.h,
        6
      );

      fill(47, 30, 15);
      textSize(20);
      text(
        "I",
        inventoryButton.x + inventoryButton.w / 2,
        inventoryButton.y + inventoryButton.h / 2
      );
    }

    pop();
  }

  // ---------------------------
  // DETECTAR CLICK EN ICONO
  // ---------------------------
  // Verifica si el jugador ha hecho click en el icono del inventario para abrirlo.

  static checkClick() {
    if (inventoryOpen || !inventoryButton) return;

    if (
      mouseX >= inventoryButton.x &&
      mouseX <= inventoryButton.x + inventoryButton.w &&
      mouseY >= inventoryButton.y &&
      mouseY <= inventoryButton.y + inventoryButton.h
    ) {
      const modal = new InventoryModal(inventory);
      modal.open();
    }
  }
}