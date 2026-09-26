// ============================================================================
// Informativa e Termini del sito, ricavati dai testi dell'app.
//
//   node scripts/legali-dall-app.mjs <cartella delle traduzioni dell'app>
//   es.  node scripts/legali-dall-app.mjs ../Progetti/Orma/assets/translations
//
// PERCHE'
// -------
// Fino alla 1.1 il sito e l'app avevano due informative e due Termini diversi,
// scritti in momenti diversi: i Termini del sito avevano ancora l'esonero di
// responsabilita' e la «legge italiana» che quelli dell'app avevano tolto, e
// l'informativa del sito diceva «posizione approssimativa» per una posizione
// che approssimata non e' (TESTI-LEGALI-1.1, punto 6). Con due testi non si sa
// quale vale.
//
// Da qui in avanti il testo e' UNO, quello delle chiavi legalDoc.* dell'app,
// in tutte le lingue: questo script lo mette in LEGAL.privacy.html e
// LEGAL.termini.html di src/data/legal.js. Il sito aggiunge solo quello che
// l'app non ha, e che sta in scripts/legali-sito.json:
//   - la sezione «Il sito orma.pet» (#sito), prima di MODIFICHE;
//   - la frase sull'eta' al posto di {minAge}: l'app sa il paese di chi legge,
//     il sito no;
//   - il rimando alla pagina di cancellazione, in fondo a CONSERVAZIONE;
//   - il blocco «cosa viene cancellato» della pagina di cancellazione;
//   - i titoli delle sezioni in tedesco e in greco (vedi titolo()).
//
// Quando il legale cambia una frase: si cambia la chiave nell'app, si rilancia
// lo script, e il sito dice la stessa cosa. NON si corregge legal.js a mano:
// al giro dopo la correzione sparirebbe.
//
// Le sezioni hanno un id fisso, uguale in tutte le lingue, cosi' l'app e le
// pagine possono puntare a orma.pet/privacy/#giro.
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';

const dirTraduzioni = process.argv[2];
if (!dirTraduzioni || !fs.existsSync(dirTraduzioni)) {
  console.error('Uso: node scripts/legali-dall-app.mjs <cartella assets/translations dell\'app>');
  process.exit(1);
}

const FILE_LEGAL = new URL('../src/data/legal.js', import.meta.url);
const SITO = JSON.parse(fs.readFileSync(new URL('./legali-sito.json', import.meta.url), 'utf8'));
const EMAIL = 'info@orma.pet';
const ATTACCO = 'export const LEGAL = ';

// Gli id delle sezioni, nell'ordine dell'app (s1, s2, ...).
const ID_PRIVACY = [
  'titolare', 'dati', 'posizione', 'terzi', 'basi', 'conservazione', 'condivisione',
  'diritti', 'minori', 'giro', 'fascicolo', 'storie', 'modifiche',
];
const ID_TERMINI = [
  'servizio', 'account', 'condotta', 'pericoli', 'contenuti-illeciti', 'ricompense',
  'nessuna-garanzia', 'moderazione', 'proprieta', 'responsabilita', 'legge', 'contatti',
  'eta', 'regole-paese', 'informazioni',
];

// Le pagine di cancellazione: italiano e inglese hanno i percorsi storici,
// le altre lingue lo slug inglese sotto il proprio prefisso (urlPagina in
// src/data/site.js).
const urlCancellazione = (lang) =>
  lang === 'it' ? '/cancellazione/' : lang === 'en' ? '/en/account-deletion/' : `/${lang}/account-deletion/`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const conEmail = (s) => s.replaceAll('{email}', `<a href="mailto:${EMAIL}">${EMAIL}</a>`);

/// Un corpo dell'app in HTML: «• » a inizio riga fa un punto elenco, le
/// righe vuote separano i capoversi e non producono niente.
function corpo(testo) {
  const out = [];
  let punti = [];
  const chiudi = () => {
    if (punti.length) out.push('<ul>\n' + punti.map((p) => `  <li>${p}</li>`).join('\n') + '\n</ul>');
    punti = [];
  };
  for (const riga of testo.split('\n')) {
    const r = riga.trim();
    if (!r) { chiudi(); continue; }
    const h = conEmail(esc(r.startsWith('• ') ? r.slice(2) : r));
    if (r.startsWith('• ')) punti.push(h);
    else { chiudi(); out.push(`<p>${h}</p>`); }
  }
  chiudi();
  return out.join('\n');
}

/// Nell'app i titoli sono in MAIUSCOLO; sul sito, come prima, in minuscolo
/// con l'iniziale grande. In tedesco e in greco non si puo' ricavarlo:
/// il tedesco scrive i nomi con la maiuscola, e il greco in maiuscolo perde
/// gli accenti. Per loro i titoli stanno in legali-sito.json.
function titolo(lang, doc, i, maiuscolo) {
  const scritti = SITO[lang].titoli?.[doc];
  if (scritti) return scritti[i];
  const t = maiuscolo.toLocaleLowerCase(lang);
  return (t.charAt(0).toLocaleUpperCase(lang) + t.slice(1)).replace(/\borma\b/g, 'Orma');
}

const sezione = (id, n, tit, html) => `<h2 id="${id}">${n}. ${esc(tit)}</h2>\n${html}`;

function privacy(lang, t, s) {
  const parti = [`<p><strong>${esc(t['legalDoc.privacy.updated'])}</strong></p>`, `<p>${conEmail(esc(t['legalDoc.privacy.intro']))}</p>`];
  let n = 0;
  ID_PRIVACY.forEach((id, i) => {
    const k = `legalDoc.privacy.s${i + 1}`;
    if (id === 'modifiche') {
      // Solo sul sito: com'e' fatto il sito stesso, prima di MODIFICHE.
      parti.push(sezione('sito', ++n, s.sitoTitolo, corpo(s.sitoCorpo)));
    }
    let html = corpo(t[`${k}.body`]);
    if (id === 'conservazione') {
      html += '\n<p>' + s.rimandoCancellazione
        .replace('{url}', urlCancellazione(lang))
        .replace('{titolo}', esc(LEGAL.cancellazione.title[lang])) + '</p>';
    }
    parti.push(sezione(id, ++n, titolo(lang, 'privacy', i, t[`${k}.title`]), html));
  });
  return parti.join('\n\n');
}

function termini(lang, t, s) {
  const parti = [`<p><strong>${esc(t['legalDoc.terms.updated'])}</strong></p>`, `<p>${conEmail(esc(t['legalDoc.terms.intro']))}</p>`];
  ID_TERMINI.forEach((id, i) => {
    const k = `legalDoc.terms.s${i + 1}`;
    let testo = t[`${k}.body`];
    if (testo.includes('{minAge}')) {
      // La frase con la soglia del paese di chi legge diventa quella del sito.
      const frase = /[^.!?;]*\{minAge\}[^.!?;]*[.!?;]/;
      if (!frase.test(testo)) throw new Error(`${lang}: frase con {minAge} non trovata`);
      testo = testo.replace(frase, ' ' + s.minAge).replace(/ {2,}/g, ' ');
    }
    parti.push(sezione(id, i + 1, titolo(lang, 'termini', i, t[`${k}.title`]), corpo(testo)));
  });
  parti.push(`<p><em>${esc(t['legalDoc.terms.prevailing'])}</em></p>`);
  return parti.join('\n\n');
}

/// Nella pagina di cancellazione cambia solo il blocco «cosa viene cancellato»
/// (fra il terzo e il quarto <h3>) e la data in fondo.
function cancellazione(lang, html, t, s) {
  const h3 = [...html.matchAll(/<h3>/g)].map((m) => m.index);
  if (h3.length < 4) throw new Error(`${lang}: la pagina di cancellazione non ha i suoi <h3>`);
  const dopoTitolo = html.indexOf('</h3>', h3[2]) + '</h3>'.length;
  const blocco = '\n' + corpo(s.cancellazione) + '\n\n';
  let nuovo = html.slice(0, dopoTitolo) + blocco + html.slice(h3[3]);
  nuovo = nuovo.replace(/<p><em>[^<]*<\/em><\/p>\s*$/, `<p><em>${esc(t['legalDoc.privacy.updated'])}</em></p>`);
  return nuovo;
}

const sorgente = fs.readFileSync(FILE_LEGAL, 'utf8');
const inizio = sorgente.indexOf(ATTACCO);
const LEGAL = JSON.parse(sorgente.slice(inizio + ATTACCO.length).trim().replace(/;$/, ''));

for (const lang of Object.keys(LEGAL.privacy.html)) {
  const t = JSON.parse(fs.readFileSync(path.join(dirTraduzioni, `${lang}.json`), 'utf8'));
  const s = SITO[lang];
  if (!s) throw new Error(`${lang}: manca in scripts/legali-sito.json`);
  LEGAL.privacy.html[lang] = privacy(lang, t, s);
  LEGAL.termini.html[lang] = termini(lang, t, s);
  LEGAL.cancellazione.html[lang] = cancellazione(lang, LEGAL.cancellazione.html[lang], t, s);
  for (const doc of ['privacy', 'termini', 'cancellazione']) {
    const resto = LEGAL[doc].html[lang].match(/\{\w+\}|\[[A-Z]\d?\]|\[DECIDI|\[LEGALE/);
    if (resto) throw new Error(`${lang} ${doc}: resta «${resto[0]}»`);
  }
}

const TESTA = `// ============================================================================
// Orma — contenuti legali (privacy, termini, cancellazione).
// HTML reale, gia pronto. Le pagine .astro lo iniettano con set:html.
//
// Indicizzato per lingua come guides.js e site.js: aggiungere una lingua
// significa aggiungere una chiave dentro title{} e html{}.
//
// privacy e termini NON si scrivono qui: li genera scripts/legali-dall-app.mjs
// dalle chiavi legalDoc.* dell'app, che sono il testo unico in tutte le
// lingue (vale la clausola legalDoc.terms.prevailing, in fondo ai Termini).
// Lo stesso script aggiorna il blocco «cosa viene cancellato» della pagina di
// cancellazione. Le parti solo del sito stanno in scripts/legali-sito.json.
// ============================================================================
`;
fs.writeFileSync(FILE_LEGAL, TESTA + ATTACCO + JSON.stringify(LEGAL, null, 2) + ';\n');
console.log('legal.js aggiornato:', Object.keys(LEGAL.privacy.html).join(' '));
