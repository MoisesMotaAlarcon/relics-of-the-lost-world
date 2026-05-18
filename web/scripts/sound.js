// ---------------------------
// SOUND
// ---------------------------
// Gestiona la pantalla de sonido.
// Guarda la preferencia del usuario en localStorage.

const soundOnBtn = document.getElementById("soundOnBtn");
const soundOffBtn = document.getElementById("soundOffBtn");
const soundBackBtn = document.getElementById("backBtn");

// ---------------------------
// AUDIO PREVIEW
// ---------------------------
// Se usa HTML5 Audio porque esta pantalla pertenece al menú,
// no al canvas principal de p5.js.

let previewMusic = new Audio("../assets/audio/egypt.mp3");
previewMusic.loop = true;
previewMusic.volume = 0.1;

// ---------------------------
// FUNCIÓN VOLVER
// ---------------------------

function goBackToOptionsFromSound() {
  previewMusic.pause();
  window.location.href = "options.html";
}

// ---------------------------
// BOTÓN ON
// ---------------------------

if (soundOnBtn) {
  soundOnBtn.addEventListener("click", () => {
    localStorage.setItem("gameSound", "on");

    previewMusic.currentTime = 0;
    previewMusic.play();

    soundOnBtn.classList.add("selected-btn");

    if (soundOffBtn) {
      soundOffBtn.classList.remove("selected-btn");
    }
  });
}

// ---------------------------
// BOTÓN OFF
// ---------------------------

if (soundOffBtn) {
  soundOffBtn.addEventListener("click", () => {
    localStorage.setItem("gameSound", "off");

    previewMusic.pause();

    soundOffBtn.classList.add("selected-btn");

    if (soundOnBtn) {
      soundOnBtn.classList.remove("selected-btn");
    }
  });
}

// ---------------------------
// CARGA INICIAL
// ---------------------------

window.addEventListener("DOMContentLoaded", () => {
  const soundSetting = localStorage.getItem("gameSound") || "on";

  if (soundSetting === "on") {
    if (soundOnBtn) {
      soundOnBtn.classList.add("selected-btn");
    }

    if (soundOffBtn) {
      soundOffBtn.classList.remove("selected-btn");
    }
  } else {
    previewMusic.pause();

    if (soundOffBtn) {
      soundOffBtn.classList.add("selected-btn");
    }

    if (soundOnBtn) {
      soundOnBtn.classList.remove("selected-btn");
    }
  }
});

// ---------------------------
// BOTÓN BACK
// ---------------------------

if (soundBackBtn) {
  soundBackBtn.addEventListener("click", goBackToOptionsFromSound);
}

// ---------------------------
// TECLA ESC
// ---------------------------

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    goBackToOptionsFromSound();
  }
});

// ---------------------------
// SEGURIDAD AL SALIR
// ---------------------------

window.addEventListener("beforeunload", () => {
  previewMusic.pause();
});