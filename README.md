# Las aventuras de Emma

Aplicación estática de lectura en familia. Está construida con Angular y publica los cuentos desde archivos Markdown, sin servidor FastAPI ni API de generación.

Cada cuento se lee en tres páginas. Las ilustraciones mantienen su ubicación narrativa y la última página incluye una pregunta para conversar. La letra ligada aparece seleccionada al abrir la app; imprenta y mayúsculas están disponibles en el lector. Una ayuda inicial indica dónde cambiarla y desaparece para ese navegador al cerrarla o usar el selector.

Consulta [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) para las decisiones de personajes, estilo narrativo, ilustración y producto al retomar el proyecto.

Al escribir nuevos cuentos, busca una aventura divertida y curiosa, con humor que puedan disfrutar los niños y alguna observación cómplice para quien lee en voz alta. Emma es fija, pero no es necesario que aparezca toda la familia en cada historia. Comprueba que cada escena y sus objetos coincidan con las ilustraciones.

## Desarrollo local

Requiere Node.js 22 o posterior.

```bash
cd frontend
npm ci
npm start
```

Abre http://localhost:4200.

El HTML fuente usa `/` para que `ng serve` encuentre `main.js` y `styles.css` en local. La compilación de producción aplica `/cuentos/` mediante `npm run build`.

## Mantener los diez cuentos

La colección debe contener exactamente diez archivos `.md` en `stories/`. Al iniciar la app o compilar, el catálogo se vuelve a generar y comprueba que cada cuento tenga pregunta familiar, tres imágenes WebP y sus textos alternativos.

```markdown
---
id: bosque-magico
order: 4
title: El bosque de Emma
value: Amistad
question: ¿Qué harías tú en su lugar?
imageStart: bosque-magico-inicio.webp
altStart: Emma descubre un sendero entre los árboles.
imageMiddle: bosque-magico-medio.webp
altMiddle: Emma y su amiga cruzan un arroyo por unas piedras.
imageEnd: bosque-magico-fin.webp
altEnd: Las amigas vuelven a casa al atardecer.
---

Emma encuentra un sendero entre los árboles y se pregunta adónde llevará.

Su amiga la acompaña y juntas exploran el bosque.
```

El `id` debe coincidir con el nombre del archivo, sin la extensión. Usa minúsculas, números y guiones. `order` determina la posición en el menú. Guarda los recursos en `frontend/public/stories/illustrations/`. Los párrafos se separan con una línea en blanco.

## Despliegue

Cloudflare Workers sirve la app en `https://jymy.dev/cuentos/`. El portfolio raíz continúa sirviéndose desde su origen actual. La ruta `/cuentos` redirige a `/cuentos/`.

El flujo de GitHub Actions compila con cada envío a `main`. Para desplegar automáticamente, añade en Settings > Secrets and variables > Actions los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`. El token necesita permisos para publicar Workers y administrar la ruta de Workers de la zona `jymy.dev`.

## Acceso

La página no aparece en el menú del portfolio ni en el sitemap y declara `noindex`. No pide contraseña: cualquiera que conozca o encuentre la URL puede leer y compartir los cuentos. Los archivos fuente y el código están en un repositorio privado; el contenido del sitio publicado es accesible por URL.
