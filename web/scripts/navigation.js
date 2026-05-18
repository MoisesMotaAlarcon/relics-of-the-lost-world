// ---------------------------
// NAVIGATION
// ---------------------------
// Gestiona los botones principales del menú inicial.

const startBtn = document.getElementById("startBtn");
const optionsBtn = document.getElementById("optionsBtn");

// ---------------------------
// BOTÓN PLAY
// ---------------------------

if (startBtn) {
  startBtn.addEventListener("click", () => {
    window.location.href = "worlds.html";
  });
}

// ---------------------------
// BOTÓN OPTIONS
// ---------------------------

if (optionsBtn) {
  optionsBtn.addEventListener("click", () => {
    window.location.href = "options.html";
  });
}