import { copyFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');

try {
  await stat(indexPath);
  await copyFile(indexPath, notFoundPath);
  console.log('Created dist/404.html for GitHub Pages SPA fallback.');
} catch (error) {
  console.error('Unable to create GitHub Pages 404 fallback. Run vite build first.');
  console.error(error);
  process.exit(1);
}
