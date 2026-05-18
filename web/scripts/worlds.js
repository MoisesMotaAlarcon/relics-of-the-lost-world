// ---------------------------
// WORLDS
// ---------------------------
// Gestiona la pantalla de selección de mundos.
// Egipto inicia el juego; el resto lleva a Coming Soon.

const worldCards = document.querySelectorAll(".world-card");
const worldsBackBtn = document.getElementById("backBtn");

// ---------------------------
// CLICK EN MUNDOS
// ---------------------------

worldCards.forEach((card) => {
  card.addEventListener("click", () => {
    const world = card.getAttribute("data-world");

    if (world === "egipto") {
      window.location.href = `game.html?world=${world}`;
    } else {
      window.location.href = `coming-soon.html?world=${world}`;
    }
  });
});

// ---------------------------
// FUNCIÓN VOLVER
// ---------------------------

function goBackToIndexFromWorlds() {
  window.location.href = "index.html";
}

// ---------------------------
// BOTÓN BACK
// ---------------------------

if (worldsBackBtn) {
  worldsBackBtn.addEventListener("click", goBackToIndexFromWorlds);
}

// ---------------------------
// TECLA ESC
// ---------------------------

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    e.preventDefault();
    goBackToIndexFromWorlds();
  }
});