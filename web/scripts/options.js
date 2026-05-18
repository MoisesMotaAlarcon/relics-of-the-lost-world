// ---------------------------
// OPTIONS
// ---------------------------

const controlsBtn = document.getElementById("controlsBtn");
const soundBtn = document.getElementById("soundBtn");
const optionsBackBtn = document.getElementById("backBtn");

// ---------------------------
// IR A CONTROLS
// ---------------------------

if (controlsBtn) {
controlsBtn.addEventListener("click", () => {
window.location.href = "/web/controls.html";
});
}

// ---------------------------
// IR A SOUND
// ---------------------------

if (soundBtn) {
soundBtn.addEventListener("click", () => {
window.location.href = "/web/sound.html";
});
}

// ---------------------------
// FUNCIÓN VOLVER
// ---------------------------

function goBackToIndex() {
window.location.href = "/web/index.html";
}

// ---------------------------
// BOTÓN BACK
// ---------------------------

if (optionsBackBtn) {
optionsBackBtn.addEventListener("click", goBackToIndex);
}

// ---------------------------
// TECLA ESC
// ---------------------------

document.addEventListener("keyup", (e) => {
if (e.key === "Escape") {
goBackToIndex();
}
});