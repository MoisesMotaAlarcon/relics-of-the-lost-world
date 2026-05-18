// ---------------------------
// START GAME
// ---------------------------
// Lee el mundo seleccionado desde la URL.
// Actualmente solo Egipto está jugable.

selectedWorld = "egipto";

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  selectedWorld = params.get("world") || "egipto";

  applyWorldTheme(selectedWorld);
});

// ---------------------------
// CAMBIAR TEMA SEGÚN MUNDO
// ---------------------------

function applyWorldTheme(world) {
  const body = document.body;

  body.classList.remove(
    "world-egipto",
    "world-selva",
    "world-catacumbas",
    "world-roma"
  );

  body.classList.add(`world-${world}`);
}