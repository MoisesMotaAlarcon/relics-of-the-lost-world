# Relics of the Lost World

Videojuego 2D de plataformas desarrollado con tecnologías web (HTML5, CSS3 y JavaScript) utilizando la librería p5.js. El proyecto combina mecánicas clásicas de plataformas con contenido educativo dinámico obtenido desde la API de Wikipedia.

---

## Enlaces del proyecto

- Repositorio GitHub: https://github.com/MoisesMotaAlarcon/relics-of-the-lost-world
- Versión jugable online (Vercel): https://relics-of-the-lost-world.vercel.app/
- Tráiler oficial: https://youtu.be/Gs9AweuAA2E

---

## Descripción

El jugador controla a Gal·la, una exploradora en un nivel ambientado en el Antiguo Egipto. A lo largo del recorrido deberá superar obstáculos, evitar enemigos y recoger reliquias históricas.

Cada reliquia desbloquea un panel informativo con contenido real extraído de Wikipedia, integrando así una capa educativa dentro de la experiencia jugable.

El juego ha sido diseñado teniendo en cuenta la adaptación a diferentes resoluciones de pantalla y las limitaciones técnicas del entorno web, especialmente en la gestión del audio.

---

## Características principales

### Jugabilidad
- Movimiento lateral del personaje  
- Sistema de salto y doble salto  
- Uso de lianas (mecánica vertical)  
- Plataformas estáticas y móviles  
- Sistema de colisiones completo  
- Enemigos con diferentes comportamientos:
  - Momias (patrulla lenta)
  - Escarabajos (patrulla rápida)
  - Murciélagos (movimiento aéreo)

### Sistema de progreso
- Recolección de reliquias históricas  
- Sistema de monedas  
- Inventario interactivo  
- Sistema de completado del nivel (salida final)  

### Interfaz y feedback
- HUD con vida, monedas y reliquias  
- Sistema de tutoriales contextuales  
- Modales de:
  - Inicio de partida  
  - Game Over  
  - Nivel completado  
  - Inventario  
  - Información cultural (Wikipedia)  

### Audio
- Música de fondo  
- Efectos de sonido (salto, daño, recogida, etc.)  
- Sistema de mute  
- Inicialización mediante interacción del usuario (compatibilidad con navegadores)  

### Renderizado y visuales
- Fondo con efecto parallax multicapa  
- Escalado adaptativo a distintas resoluciones  
- Soporte para pantallas ultrapanorámicas  

## Controles

- A / D → movimiento
- Espacio → salto
- Doble espacio → doble salto
- E → interactuar
- ESC → cerrar ventanas / volver

---

## Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6)  
- p5.js  
- API REST de Wikipedia  

---

## Estructura del proyecto

- `web/` → interfaz, menús, estilos y navegación  
- `game/` → lógica del juego (player, enemigos, físicas, render, etc.)  
- `assets/` → recursos gráficos y de audio  

---

## Ejecución local

1. Clonar o descargar el repositorio  
2. Acceder a la carpeta `web/`  
3. Acceder a `web/index.html`  
4. Ejecutar mediante la extensión **Live Server**

También puede jugarse directamente desde la versión online publicada en Vercel.

---

## Consideraciones técnicas

- El audio requiere interacción del usuario para activarse (restricciones del navegador).  
- El juego utiliza un sistema de escalado basado en altura (1080p) para adaptarse a distintas resoluciones.  
- El renderizado se realiza mediante canvas (p5.js), sin uso de frameworks externos.  

---

## Autor

Proyecto desarrollado por **Moisés Mota Alarcón** como parte del Trabajo Final de Grado.

## Licencia

Proyecto desarrollado con fines académicos como Trabajo Final de Grado.

El contenido del proyecto se distribuye bajo la licencia:

Creative Commons Attribution-NonCommercial-NoDerivatives 3.0 Spain (CC BY-NC-ND 3.0 ES).