import vue from '@vitejs/plugin-vue';
import { globbySync } from 'globby';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import NodeCGPlugin from 'vite-plugin-nodecg';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}),
    checker({ vueTsc: { tsconfigPath: 'tsconfig.browser.json' } }),
    NodeCGPlugin(),
  ],
  build: {
    rollupOptions: {
      input: globbySync([
        './src/dashboard/*.ts',
        './src/graphics/*.ts',
        '!**.d.ts',
      ]),
    },
  },
});
