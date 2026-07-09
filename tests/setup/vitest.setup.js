import { afterEach, vi } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  localStorage.clear();
  sessionStorage.clear();
  vi.restoreAllMocks();
});

