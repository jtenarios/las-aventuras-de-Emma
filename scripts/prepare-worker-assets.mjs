import { cp, mkdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const browserOutput = join(root, 'frontend', 'dist', 'cuentos-emma', 'browser');
const workerAssets = join(root, 'dist', 'worker', 'cuentos');
await rm(join(root, 'dist', 'worker'), { recursive: true, force: true });
await mkdir(workerAssets, { recursive: true });
await cp(browserOutput, workerAssets, { recursive: true });
console.log('Archivos estáticos preparados para jymy.dev/cuentos/.');
