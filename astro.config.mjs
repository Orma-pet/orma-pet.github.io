import { defineConfig } from 'astro/config';

// Versione B del sito Orma — output statico (default), sito di produzione orma.pet.
export default defineConfig({
  site: 'https://orma.pet',
  // output: 'static' è il default in Astro 2; lo rendiamo esplicito.
  output: 'static',
  build: {
    format: 'directory',
  },
});
