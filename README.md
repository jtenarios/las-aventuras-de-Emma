# Las aventuras de Emma

Aplicación estática de lectura en familia. Está construida con Angular y publica los cuentos desde archivos Markdown, sin servidor FastAPI ni API de generación.

## Desarrollo local

Requiere Node.js 22 o posterior.

```bash
cd frontend
npm ci
npm start
```

Abre http://localhost:4200.

## Añadir un cuento

Crea un archivo `.md` dentro de `stories/`. El catálogo se genera automáticamente al iniciar la app o compilarla.

```markdown
---
id: bosque-magico
order: 4
title: El bosque de Emma
value: Amistad
---
Emma encuentra un sendero entre los árboles.

Su amiga la acompaña y juntas exploran el bosque.
```

El `id` debe coincidir con el nombre del archivo, sin la extensión. Usa minúsculas, números y guiones. `order` determina el orden en la lista; los cuentos sin orden aparecen al final. El título, el valor y cada párrafo se muestran en la app.

## Despliegue

Cloudflare Workers sirve la app en `https://jymy.dev/cuentos/`. El portfolio raíz continúa sirviéndose desde su origen actual. La ruta `/cuentos` redirige a `/cuentos/`.

El flujo de GitHub Actions compila con cada envío a `main`. Para desplegar automáticamente, añade en Settings > Secrets and variables > Actions los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`. El token necesita permisos para publicar Workers y administrar la ruta de Workers de la zona `jymy.dev`.

## Acceso

La página no aparece en el menú del portfolio ni en el sitemap y declara `noindex`. No pide contraseña: cualquiera que conozca o encuentre la URL puede leer y compartir los cuentos. Los archivos fuente y el código están en un repositorio privado; el contenido del sitio publicado es accesible por URL.
