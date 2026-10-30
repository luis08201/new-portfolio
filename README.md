# Portafolio de Luis Selva

Página del portafolio con azul marino y lima: presentación, proyectos, 34 retos de Frontend Mentor filtrables por nivel, acerca de mí y formulario de contacto (Formspree). Es HTML, CSS y JavaScript sin paso de compilación, así que GitHub Pages la sirve tal cual.

En línea: https://luis08201.github.io/new-portfolio/

- `index.html`: contenido de la página
- `css/style.css`: estilos
- `js/main.js`: formulario, filtros de retos, animaciones y cambio de idioma
- `js/i18n.js`: textos en inglés; el español se toma del propio HTML (cada texto traducible lleva `data-i18n`)
- `js/vendor/`: GSAP 3.15 (núcleo, ScrollTrigger, Flip y SplitText)
- `img/`: retrato y capturas de los proyectos y retos
- `forja/`: Forja, sitio de un instituto técnico ficticio (ver abajo)

El idioma inicial depende de la región del visitante, según la zona horaria del navegador: Latinoamérica ve la página en español y el resto del mundo en inglés. El botón ES / EN del pie de página cambia el idioma sin recargar y recuerda la elección, que tiene prioridad sobre la detección. Un enlace con `?lang=es` o `?lang=en` fuerza el idioma.

La carga de la página, la cinta de capturas (dos filas que se mueven en sentidos opuestos con el scroll) y el efecto de los botones siguen las interacciones de la plantilla Consulrick de Webflow.

Las animaciones se desactivan cuando el sistema pide reducir el movimiento, y el contenido se muestra igual si GSAP no carga.

## Forja

`forja/` es un caso de estudio: el rediseño de mi proyecto ISIC de 2021 como un instituto técnico ficticio. Tiene cuatro páginas (inicio, catálogo, detalle de curso y contacto), es bilingüe con la misma detección de idioma que el portafolio y comparte la elección de idioma con él. Usa el GSAP de `js/vendor/`.

- `forja/js/courses.js`: los 12 cursos, áreas e instructores en español e inglés; el catálogo, las páginas de curso y el formulario se generan desde aquí
- `forja/js/strings.js`: textos en inglés y mensajes que solo existen en JavaScript
- `forja/curso.html?c=<slug>`: plantilla única para todos los cursos
- Los filtros del catálogo usan [Finsweet Attributes](https://finsweet.com/attributes/list-filter) (`fs-list`, v2.7.1 desde jsDelivr): áreas como botones de radio, modalidad, buscador, conteo por área, estado vacío y filtros en la URL (`?area_equal=diseno`). Como el sitio no corre en Webflow, `forja/js/pages/catalog.js` simula `Webflow.push`, carga el script después de dibujar las tarjetas y lo reinicia al cambiar de idioma
- El formulario de inscripción valida los datos y muestra la confirmación, pero no envía nada: es un sitio de demostración
- Fotos de Unsplash en WebP; la carpeta completa pesa 1,3 MB frente a los 24 MB del original

## Casos de estudio

- `case-studies/forja/` y `case-studies/burgerlicious/`: objetivo, rol, stack, desafío, solución, capturas y resultado de cada proyecto
- `js/case.js`: idioma, botones y animaciones de las páginas de caso; sus textos en inglés están en `js/cases-en.js`
- `js/pills.js`: efecto de los botones, compartido por la portada y los casos
- `img/casos/`: capturas propias en escritorio (1280 × 800) y móvil (390 px a 2x)

## QA (30 de octubre de 2026)

- Responsive: portada y casos revisados en 1920, 1440, 1280, 992, 991, 767, 479 y 375 px, sin scroll horizontal ni errores de consola
- Accesibilidad: un H1 por página, todas las imágenes con `alt`, campos con `label`, foco visible al navegar con teclado y contenido visible con movimiento reducido
- Idioma: cambiar ES ↔ EN no deja textos mezclados en ninguna de las tres páginas
- Enlaces: 48 enlaces internos y externos responden 200; el formulario muestra errores al enviarse vacío (no se enviaron mensajes reales)
- Lighthouse (local):

  | Página | Móvil (rend. / acc. / prácticas / SEO) | Escritorio |
  |---|---|---|
  | Portada | 86 / 97 / 100 / 100 | 99 / 97 / 100 / 100 |
  | Caso Forja | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
  | Caso Burgerlicious | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

  El 97 de accesibilidad de la portada viene del título de «Acerca de mí», cuyas palabras empiezan tenues a propósito y se completan con el scroll.

## Verla en local

Abre la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```
