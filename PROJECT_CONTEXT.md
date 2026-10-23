# Contexto del proyecto: Cuentos de Emma

Este documento reúne las decisiones narrativas, visuales y de producto que conviene conservar al continuar el proyecto en otros chats o al colaborar en el código.

## Propósito

Crear una pequeña biblioteca digital de cuentos ilustrados para compartir entre Emma y su familia. La app ayuda a elegir una historia y leerla juntos en voz alta; no es un generador configurable. Emma es siempre la protagonista y el catálogo publicado contiene exactamente diez cuentos.

## Público y experiencia de lectura

- Edad orientativa: 6–7 años, con una persona adulta que acompaña la lectura.
- Duración objetivo: aproximadamente 3–5 minutos por cuento.
- Idioma: español claro, natural y expresivo; diálogos fáciles de leer en voz alta.
- La opción tipográfica inicial es **ligada**. Se mantienen las alternativas de imprenta y mayúsculas.
- Cada cuento incluye una pregunta corta para conversar o imaginar en familia.
- La experiencia debe ser cálida, sencilla y cómoda tanto en móvil como en escritorio.

## Personajes y referencias visuales

La familia está representada como conejos antropomórficos. Las referencias de personaje están en `frontend/public/characters/`:

- **Emma:** conejita niña de pelaje marrón, orejas largas, grandes ojos marrones y pelo castaño largo y ondulado. Su ropa de referencia es chaqueta turquesa, camiseta rosa con corazón y prendas rosas. Es curiosa, expresiva y capaz de tomar decisiones; puede pedir ayuda cuando la necesita.
- **Jaime (papá):** conejo adulto de pelaje marrón, pelo corto oscuro, gafas negras y chaqueta verde oliva.
- **Rocío (mamá):** coneja adulta de pelaje marrón y pelo castaño oscuro ondulado, con chaqueta amarilla y pantalones verde oliva.
- **Mía:** conejita pequeña de pelaje marrón, pelo castaño, lazo rosa, camisa clara con flores y peto rosa.

Usar estos archivos como referencias al crear nuevas ilustraciones para conservar identidad, proporciones, pelaje y estilo. Las imágenes generadas deben mostrar escenas narrativas, no fichas de personajes, y no deben incluir texto, rótulos ni marcas de agua.

## Dirección visual

- Acuarela cálida de álbum ilustrado, textura suave de papel, rostros expresivos y entornos acogedores.
- Composición horizontal 3:2 para integrarse bien en la lectura.
- Tres imágenes por cuento: apertura, momento central y desenlace. Cada una tiene texto alternativo en español.
- Emma aparece sin casco ni cubrecabezas en las próximas ilustraciones; conservar visibles su pelo ondulado y sus orejas.
- Recursos finales: `frontend/public/stories/illustrations/{id}-inicio.webp`, `{id}-medio.webp` y `{id}-fin.webp`.
- Mantener continuidad entre las tres escenas de un cuento y coherencia general entre los diez relatos.

## Enfoque narrativo

- Cada historia tiene un deseo o pregunta reconocible, un pequeño obstáculo o misterio, intentos visibles y un desenlace que nace de las decisiones de Emma.
- Incluir detalles concretos que un niño pueda imaginar, diálogo, ritmo variado y una progresión que invite a descubrir qué ocurre.
- Las emociones pueden ser reales, pero los conflictos y peligros son amables y adecuados para lectura compartida.
- Mostrar la idea o valor mediante acciones y relaciones; evitar cerrar con una moraleja explicada.
- Alternar escenarios, animales, objetos y tipos de aventura para que los diez cuentos se sientan distintos.

## Catálogo actual

1. **La cometa que atrapó el viento** — perseverancia.
2. **El mapa de las huellas luminosas** — curiosidad.
3. **El claro donde cabían todos** — amistad.
4. **El camino de las dos señales** — autonomía.
5. **El bosque de las luces dormidas** — valentía.
6. **El río que cantaba al revés** — cooperación.
7. **El árbol que guardaba ecos** — escucha.
8. **La carrera de los caracoles** — paciencia.
9. **La luna invitada a merendar** — generosidad.
10. **El día que llovieron botones** — imaginación.

Los originales Markdown viven en `stories/`. Cada archivo usa un `id` de minúsculas y guiones que coincide con su nombre, un orden único, título, valor, pregunta y los nombres y textos alternativos de sus tres ilustraciones. El cuerpo separa cada párrafo con una línea en blanco.

## Estructura y mantenimiento

- Aplicación estática Angular en `frontend/`; no depende de una API de generación de cuentos.
- `scripts/prepare-story-catalog.mjs` valida y convierte los Markdown en `frontend/public/stories/index.json`, incluyendo párrafos, pregunta, posiciones de ilustración y textos alternativos. Exige exactamente diez relatos y comprueba que existan las tres imágenes de cada uno.
- `frontend/src/app/app.ts` construye bloques de lectura e inserta las ilustraciones al inicio, aproximadamente a mitad y al final.
- `frontend/src/app/app.html` presenta el menú, los controles tipográficos, el relato y la pregunta familiar.
- `frontend/src/styles.css` contiene estilos globales, de lectura y adaptación a distintos tamaños de pantalla.
- Para probar localmente: desde `frontend/`, ejecutar `npm ci` una vez y después `npm start`; la app queda disponible en `http://localhost:4200`.
- Para compilar el sitio estático: desde `frontend/`, ejecutar `npm run build`; la compilación de producción establece `/cuentos/` como base para Cloudflare.
- El despliegue de Cloudflare Workers está preparado en el repositorio, pero los cambios de esta colección deben revisarse en local antes de subirlos a GitHub o publicar.

## Decisiones de producto que no deben perderse

- Emma es fija; no añadir un campo para cambiar el nombre de la protagonista.
- La colección muestra exactamente diez cuentos, con menú ordenado como el catálogo anterior.
- No subir ni desplegar los cambios antes de que el usuario revise el resultado local.
- Al ampliar o reescribir un cuento, actualizar sus tres escenas, textos alternativos y pregunta familiar junto con el Markdown.
