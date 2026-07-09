import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const roots = ['src', 'tests'];
const extraFiles = ['vite.config.js'];
const ignoredDirectories = new Set(['node_modules', 'dist', 'coverage', '.git']);

function collectJavaScriptFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      return ignoredDirectories.has(entry) ? [] : collectJavaScriptFiles(path);
    }

    return path.endsWith('.js') || path.endsWith('.mjs') ? [path] : [];
  });
}

const files = [
  ...roots.flatMap(collectJavaScriptFiles),
  ...extraFiles
];
let failed = false;

files.forEach((file) => {
  const result = spawnSync(process.execPath, ['--check', file], {
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    failed = true;
    process.stderr.write(`\nSyntax check failed: ${relative(process.cwd(), file)}\n`);
    process.stderr.write(result.stderr || result.stdout);
  }
});

if (failed) {
  process.exit(1);
}

process.stdout.write(`Checked ${files.length} JavaScript files.\n`);
