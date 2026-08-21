import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { GUIDES } from './src/data/guides.js';

// Uso: node _merge_guides.mjs <lingua>
// Legge tutti i file _<lingua>_guides_*.json e li innesta in guides.js.
// Ogni file e' { slugInglese: { slug, title, metaDesc, html, faq[] } }.
const LANG = process.argv[2];
if (!LANG) throw new Error('manca la lingua');

const indice = new Map(GUIDES.map((g) => [g.slug.en, g]));
let quante = 0;

for (const nome of readdirSync('.').filter((n) => n.startsWith('_' + LANG + '_guides_') && n.endsWith('.json')).sort()) {
  const dati = JSON.parse(readFileSync('./' + nome, 'utf8'));
  for (const [slugEn, g] of Object.entries(dati)) {
    const guida = indice.get(slugEn);
    if (!guida) throw new Error('guida sconosciuta: ' + slugEn);
    for (const campo of ['slug', 'title', 'metaDesc', 'html']) {
      if (!g[campo]) throw new Error(slugEn + ': manca ' + campo);
    }
    if (!Array.isArray(g.faq) || g.faq.length !== guida.faq.it.length) {
      throw new Error(slugEn + ': le domande sono ' + (g.faq || []).length + ' invece di ' + guida.faq.it.length);
    }
    if (/[^ -ɏ‐-‾₠-⃏\n]/.test(g.html + g.title + g.metaDesc)) {
      const strani = [...new Set([...(g.html + g.title + g.metaDesc)].filter((c) => /[^ -ɏ‐-‾₠-⃏\n]/.test(c)))];
      throw new Error(slugEn + ': caratteri fuori posto -> ' + strani.join(' '));
    }
    guida.slug[LANG] = g.slug;
    guida[LANG] = { title: g.title, metaDesc: g.metaDesc, html: g.html };
    guida.faq[LANG] = g.faq;
    quante++;
  }
}

const testa = readFileSync('./src/data/guides.js', 'utf8').split('export const GUIDES')[0];
writeFileSync('./src/data/guides.js', testa + 'export const GUIDES = ' + JSON.stringify(GUIDES, null, 2) + ';\n', 'utf8');

const fatte = GUIDES.filter((g) => g[LANG]).length;
console.log('ok — innestate ' + quante + ' guide in ' + LANG + '; tradotte ' + fatte + ' su ' + GUIDES.length);
const slugs = GUIDES.filter((g) => g.slug[LANG]).map((g) => g.slug[LANG]);
if (new Set(slugs).size !== slugs.length) throw new Error('due guide hanno lo stesso indirizzo in ' + LANG);
