# Portafolio de Luis Selva

Página del portafolio con azul marino y lima: presentación, proyectos, 34 retos de Frontend Mentor filtrables por nivel, acerca de mí y formulario de contacto (Formspree). Es HTML, CSS y JavaScript sin paso de compilación, así que GitHub Pages la sirve tal cual.

En línea: https://luis08201.github.io/new-portfolio/

- `index.html`: contenido de la página
- `css/style.css`: estilos
- `js/main.js`: formulario, filtros de retos, animaciones y cambio de idioma
- `js/i18n.js`: textos en inglés; el español se toma del propio HTML (cada texto traducible lleva `data-i18n`)
- `js/vendor/`: GSAP 3.15 (núcleo, ScrollTrigger, Flip y SplitText)
- `img/`: retrato y capturas de los proyectos y retos

El idioma inicial depende de la región del visitante, según la zona horaria del navegador: Latinoamérica ve la página en español y el resto del mundo en inglés. El botón ES / EN del pie de página cambia el idioma sin recargar y recuerda la elección, que tiene prioridad sobre la detección. Un enlace con `?lang=es` o `?lang=en` fuerza el idioma.

Las animaciones se desactivan cuando el sistema pide reducir el movimiento, y el contenido se muestra igual si GSAP no carga.

## Verla en local

Abre la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```
