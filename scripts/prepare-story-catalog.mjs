import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const storiesDirectory = join(root, 'stories');
const catalogDirectory = join(root, 'frontend', 'public', 'stories');
const files = (await readdir(storiesDirectory)).filter((file) => file.endsWith('.md'));
const stories = [];

for (const file of files) {
  const source = await readFile(join(storiesDirectory, file), 'utf8');
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: falta la cabecera Markdown entre ---`);

  const metadata = Object.fromEntries(match[1].split(/\r?\n/).map((line) => {
    const separator = line.indexOf(':');
    if (separator < 0) throw new Error(`${file}: metadato inválido: ${line}`);
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
  }));
  const id = metadata.id;
  if (!id || basename(file, '.md') !== id || !/^[a-z0-9-]+$/.test(id)) {
    throw new Error(`${file}: el id debe coincidir con el nombre del archivo y usar minúsculas, números o guiones`);
  }
  if (!metadata.title || !metadata.value) throw new Error(`${file}: title y value son obligatorios`);

  const paragraphs = match[2].trim().split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  if (!paragraphs.length) throw new Error(`${file}: el cuento no tiene párrafos`);

  stories.push({
    id,
    order: Number.parseInt(metadata.order ?? '999', 10),
    title: metadata.title,
    value: metadata.value,
    paragraphs,
  });
}

stories.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id, 'es'));
await mkdir(catalogDirectory, { recursive: true });
await writeFile(join(catalogDirectory, 'index.json'), `${JSON.stringify(stories, null, 2)}\n`, 'utf8');
console.log(`Catálogo listo: ${stories.length} cuentos.`);
