/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A API do teste bloqueia o navegador por CORS. O mesmo proxy vale para
// `npm run dev` e `npm run preview`, então o navegador só fala com o localhost.
const produtosProxy = {
  '/api/produtos': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: () => '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json',
  },
};

export default defineConfig({
  plugins: [react()],
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
  server: { proxy: produtosProxy },
  preview: { proxy: produtosProxy },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
