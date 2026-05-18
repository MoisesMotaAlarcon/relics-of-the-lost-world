// ---------------------------
// COMING SOON
// ---------------------------
// Gestiona la pantalla de mundos en desarrollo.
// Cambia el título y el fondo según el mundo seleccionado.

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const world = params.get("world") || "roma";

  const comingSoonTitle = document.getElementById("comingSoonTitle");
  const comingSoonBackBtn = document.getElementById("backBtn");

  const worldNames = {
    roma: "Roma",
    selva: "Selva",
    catacumbas: "Catacumbas"
  };

  // ---------------------------
  // TÍTULO
  // ---------------------------

  if (comingSoonTitle) {
    comingSoonTitle.textContent = `${worldNames[world] || "Mundo"} en proceso`;
  }

  // ---------------------------
  // TEMA VISUAL
  // ---------------------------

  document.body.classList.remove(
    "world-roma",
    "world-selva",
    "world-catacumbas"
  );

  if (world === "roma" || world === "selva" || world === "catacumbas") {
    document.body.classList.add(`world-${world}`);
  }

  // ---------------------------
  // BOTÓN BACK
  // ---------------------------

  if (comingSoonBackBtn) {
    comingSoonBackBtn.addEventListener("click", goBackToWorlds);
  }

  // ---------------------------
  // TECLA ESC
  // ---------------------------

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      goBackToWorlds();
    }
  });
});

// ---------------------------
// FUNCIÓN VOLVER
// ---------------------------

function goBackToWorlds() {
  window.location.href = "worlds.html";
}