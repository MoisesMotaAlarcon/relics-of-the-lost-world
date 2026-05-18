// ---------------------------
// CONTROLS
// ---------------------------
// Gestiona la pantalla de controles.
// Permite volver a Options con botón Back o tecla ESC.

const controlsBackBtn = document.getElementById("backBtn");

// ---------------------------
// FUNCIÓN VOLVER
// ---------------------------

function goBackToOptions() {
  window.location.href = "options.html";
}

// ---------------------------
// BOTÓN BACK
// ---------------------------

if (controlsBackBtn) {
  controlsBackBtn.addEventListener("click", goBackToOptions);
}

// ---------------------------
// TECLA ESC
// ---------------------------

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    goBackToOptions();
  }
});