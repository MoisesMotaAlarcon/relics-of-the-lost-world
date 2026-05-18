// ---------------------------
// WIKIMODALVISUAL
// ---------------------------
// Esta clase se encarga de mostrar un modal con información
// extraída de Wikipedia sobre un objeto. Se abre al pulsar
// un objeto del inventario o al recogerlo en el nivel.

let activeWikiModal = null;

class WikiModalVisual {
  constructor(url, pauseGame = false, inventoryItem = null) {
    // URL de la página de Wikipedia a mostrar.
    this.url = url;

    // Indica si el juego debe pausarse al abrir el modal.
    this.pauseGame = pauseGame;

    // Contenedor del modal y botón de cierre. Se crean al abrir el modal.
    this.div = null;
    this.closeBtn = null;

    // Estado del modal. Solo se puede abrir uno a la vez, y el juego solo se pausa si el modal está activo.
    this.active = false;

    // Guarda una referencia al objeto del inventario que abrió el modal, para actualizar su imagen si la página de Wikipedia tiene una.
    this.inventoryItem = inventoryItem;
  }

  // ---------------------------
  // ABRIR MODAL
  // ---------------------------
  // Obtiene la información desde la API de Wikipedia,
  // crea el panel visual y opcionalmente pausa el juego.

  async open() {
    if (this.active) return;

    if (activeWikiModal) {
      activeWikiModal.close();
    }

    if (this.pauseGame) {
      noLoop();
    }

    const title = this.url.split("/").pop();
    const apiUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${title}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      const modalTitle =
        data.title || "Información";

      const modalText =
        data.extract ||
        "No se pudo cargar información para este elemento.";

        if (
        this.inventoryItem &&
        data.originalimage &&
        data.originalimage.source
      ) {
        this.inventoryItem.wikiImage = data.originalimage.source;
      }
      
      // ---------------------------
      // CONTENEDOR MODAL
      // ---------------------------
      // Crea el panel del modal y lo añade al DOM.
      // Si el modal se abrió desde el inventario, también actualiza la imagen del objeto.
      this.div = createDiv();
      this.div.class("wiki-modal");

      // ---------------------------
      // IMAGEN
      // ---------------------------
      // Si la página de Wikipedia tiene una imagen, se muestra en el modal. Si el modal 
      // se abrió desde el inventario, también se actualiza la imagen del objeto.

      if (data.originalimage && data.originalimage.source) {
        const img = createImg(
          data.originalimage.source,
          modalTitle
        );

        img.parent(this.div);
        img.class("wiki-modal-img");
      }

      // ---------------------------
      // TÍTULO
      // ---------------------------
      // Muestra el título de la página de Wikipedia como encabezado del modal.

      const h2 = createElement("h2", modalTitle);

      h2.parent(this.div);
      h2.class("wiki-modal-title");

      // ---------------------------
      // TEXTO
      // ---------------------------
      // Muestra el extracto de la página de Wikipedia como texto del modal.
      const p = createP(modalText);

      p.parent(this.div);
      p.class("wiki-modal-text");

      // ---------------------------
      // BOTÓN CERRAR
      // ---------------------------
      this.closeBtn = createButton(
        "Continuar explorando"
      );

      this.closeBtn.parent(this.div);

      this.closeBtn.mousePressed(() =>
        this.close()
      );

      this.closeBtn.class(
        "menu-btn wiki-modal-btn"
      );

      this.active = true;
      activeWikiModal = this;

    } catch (err) {
      console.error(
        "Error al cargar Wikipedia:",
        err
      );

      if (this.pauseGame && !inventoryOpen) {
        loop();
      }
    }
  }

  // ---------------------------
  // CERRAR MODAL
  // ---------------------------
  // Elimina el panel y reanuda el juego si corresponde.

  close() {
    if (!this.active) return;

    if (this.div) {
      this.div.remove();
    }

    this.div = null;
    this.closeBtn = null;
    this.active = false;
    activeWikiModal = null;

    // Reanudar juego SOLO si no estamos en inventario.
    if (this.pauseGame && !inventoryOpen) {
      loop();
    }
  }
}