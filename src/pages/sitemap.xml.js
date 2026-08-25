// ============================================================================
// La mappa del sito, generata dai dati invece che scritta a mano.
// ============================================================================
//
// PERCHE' NON E' PIU' UN FILE
// ---------------------------
// C'era un public/sitemap.xml compilato a mano. Al 25/08/2026 conteneva 46
// indirizzi: solo italiano e inglese. Le altre cinque lingue gia' pubblicate --
// tedesco, spagnolo, francese, portoghese, rumeno -- non c'erano, e nessuno se
// n'era accorto, perche' una mappa incompleta non da' nessun errore: dice a
// Google meno di quello che esiste, e Google non ha modo di sapere che manca
// qualcosa.
//
// Con quindici lingue quel file andava aggiornato a mano ogni volta che si
// aggiunge una guida o una lingua, in centinaia di righe. Sarebbe rimasto
// indietro alla prima distrazione. Qui invece si costruisce da ROUTES,
// LANGS_PRONTE e GUIDES: aggiungere una lingua o una guida aggiorna la mappa
// da sola.
//
// Gli <xhtml:link rel="alternate"> valgono quanto gli <loc>: dicono a Google
// che queste pagine sono la stessa cosa in lingue diverse, non copie. Senza,
// quindici traduzioni della stessa pagina competono fra loro.
import { BRAND, LANGS_PRONTE, ROUTES, urlPagina } from '../data/site.js';
import { GUIDES } from '../data/guides.js';

const SITO = BRAND.siteUrl;
const assoluto = (percorso) => new URL(percorso, SITO).href;

// Quanto conta ogni pagina, per chi legge la mappa. La home prima di tutto,
// poi le pagine che rispondono a una ricerca, poi i documenti legali.
const PESO = {
  home: '1.0',
  guides: '0.8',
  howItWorks: '0.7',
  features: '0.7',
  map: '0.7',
  faq: '0.6',
  forOrgs: '0.6',
  childSafety: '0.5',
  privacy: '0.3',
  terms: '0.3',
  deletion: '0.3',
};

// Le pagine che ricevono un identificativo da fuori (/pet, /t, /i, /join) non
// stanno qui ed e' voluto: senza il loro parametro non mostrano niente, e sono
// gia' escluse da robots.txt e marcate noindex.
const PAGINE = Object.keys(PESO).filter((k) => ROUTES[k]);

function voce(alternative, href, peso, data) {
  const righe = alternative.map(
    (a) => `    <xhtml:link rel="alternate" hreflang="${a.code}" href="${a.href}"/>`,
  );
  // x-default: dove mandare chi non parla nessuna delle lingue pubblicate.
  const xdefault = alternative.find((a) => a.code === 'en') || alternative[0];
  righe.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${xdefault.href}"/>`);
  return [
    '  <url>',
    `    <loc>${href}</loc>`,
    ...righe,
    `    <lastmod>${data}</lastmod>`,
    `    <priority>${peso}</priority>`,
    '  </url>',
  ].join('\n');
}

// `get` minuscolo e `{ body }`: e' la forma degli endpoint statici in Astro 2,
// che e' la versione di questo progetto. Il `GET()` maiuscolo che restituisce
// una Response arriva con Astro 3 -- scritto cosi' qui non da' errore, semplicemente
// non genera il file, ed e' un modo perfetto per non accorgersene.
export async function get() {
  // La data di costruzione: e' l'unica che il sito conosce con certezza.
  // Inventare un lastmod per pagina sarebbe peggio che non darlo.
  const oggi = new Date().toISOString().slice(0, 10);
  const voci = [];

  for (const chiave of PAGINE) {
    const alternative = LANGS_PRONTE.map((l) => ({
      code: l.code,
      href: assoluto(urlPagina(chiave, l.code)),
    }));
    for (const a of alternative) voci.push(voce(alternative, a.href, PESO[chiave], oggi));
  }

  for (const g of GUIDES) {
    // Lo slug e' diverso in ogni lingua: /cs/guides/ztraceny-pes-co-delat/.
    // Le lingue senza slug proprio ricadono su quello inglese, come fa la rotta.
    const alternative = LANGS_PRONTE.map((l) => {
      const slug = g.slug[l.code] ?? g.slug.en ?? g.slug.it;
      return { code: l.code, href: assoluto(`${urlPagina('guides', l.code)}${slug}/`) };
    });
    for (const a of alternative) voci.push(voce(alternative, a.href, '0.6', oggi));
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
      + ' xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...voci,
    '</urlset>',
    '',
  ].join('\n');

  return { body: xml };
}
