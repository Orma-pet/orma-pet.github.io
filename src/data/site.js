// ============================================================================
// Orma — Versione B (Astro). Configurazione bilingue centralizzata.
// Tutte le stringhe IT/EN del sito vivono qui, così le pagine .astro restano
// pulite e i contenuti sono "baked" a build time (niente traduzione runtime).
// ============================================================================

export const BRAND = {
  name: 'Orma',
  email: 'info@orma.pet',
  owner: 'Nicholas Iacoviello',
  siteUrl: 'https://orma.pet',
  ogImage: '/og.jpg', // anteprima social 1200x630
  playStoreUrl: 'https://play.google.com/store/apps/details?id=pet.orma.app',
  gradient: 'linear-gradient(90deg,#2A6BA8,#1AB8A0)',
  // Token di Cloudflare Web Analytics (senza cookie). Vuoto = beacon non
  // inserito. Da incollare quando attivato sul pannello Cloudflare.
  cfAnalyticsToken: '1095aec9468649adb0b0596e09af24f6',
};

// Mappa delle pagine: per ogni "chiave" l'URL IT e quello EN.
// Serve sia per il menu sia per il selettore lingua (collega le due versioni).
export const ROUTES = {
  home:          { it: '/',                en: '/en/' },
  howItWorks:    { it: '/come-funziona/',  en: '/en/how-it-works/' },
  features:      { it: '/funzionalita/',   en: '/en/features/' },
  privacy:       { it: '/privacy/',        en: '/en/privacy/' },
  terms:         { it: '/termini/',        en: '/en/terms/' },
  deletion:      { it: '/cancellazione/',  en: '/en/account-deletion/' },
  guides:        { it: '/guida/',          en: '/en/guides/' },
  map:           { it: '/mappa/',          en: '/en/map/' },
  faq:           { it: '/faq/',            en: '/en/faq/' },
  forOrgs:       { it: '/per-strutture/',  en: '/en/for-organizations/' },
  childSafety:   { it: '/sicurezza-minori/', en: '/en/child-safety/' },
  pet:           { it: '/pet/',            en: '/en/pet/' },
};

// ============================================================================
// REGISTRO DELLE LINGUE
// ----------------------------------------------------------------------------
// Aggiungere una lingua qui, non creando 12 file .astro nuovi. Le pagine
// italiane e inglesi restano dove sono (i loro URL sono indicizzati e non si
// toccano); tutte le altre nascono dalla rotta dinamica /[lang]/.
//
//   code    codice ISO, usato in <html lang> e negli URL
//   name    nome della lingua NELLA lingua stessa (per un eventuale menu)
//   dir     'ltr' per tutte le lingue UE
//   base    dove vive: '' = radice (italiano), altrimenti '/<code>'
//
// `pronta` dice se i testi di quella lingua esistono davvero. Finche' e'
// false la lingua non viene generata: meglio non esistere che esistere mezza
// tradotta con l'inglese sotto.
// ============================================================================
export const LANGS = [
  { code: 'it', name: 'Italiano',   base: '',    pronta: true  },
  { code: 'en', name: 'English',    base: '/en', pronta: true  },
  { code: 'bg', name: 'Български',  base: '/bg', pronta: false },
  { code: 'cs', name: 'Čeština',    base: '/cs', pronta: false },
  { code: 'da', name: 'Dansk',      base: '/da', pronta: false },
  { code: 'de', name: 'Deutsch',    base: '/de', pronta: true  },
  { code: 'el', name: 'Ελληνικά',   base: '/el', pronta: false },
  { code: 'es', name: 'Español',    base: '/es', pronta: true  },
  { code: 'et', name: 'Eesti',      base: '/et', pronta: false },
  { code: 'fi', name: 'Suomi',      base: '/fi', pronta: false },
  { code: 'fr', name: 'Français',   base: '/fr', pronta: true  },
  { code: 'ga', name: 'Gaeilge',    base: '/ga', pronta: false },
  { code: 'hr', name: 'Hrvatski',   base: '/hr', pronta: false },
  { code: 'hu', name: 'Magyar',     base: '/hu', pronta: false },
  { code: 'lt', name: 'Lietuvių',   base: '/lt', pronta: false },
  { code: 'lv', name: 'Latviešu',   base: '/lv', pronta: false },
  { code: 'mt', name: 'Malti',      base: '/mt', pronta: false },
  { code: 'nl', name: 'Nederlands', base: '/nl', pronta: false },
  { code: 'pl', name: 'Polski',     base: '/pl', pronta: false },
  { code: 'pt', name: 'Português',  base: '/pt', pronta: true  },
  { code: 'ro', name: 'Română',     base: '/ro', pronta: true  },
  { code: 'sk', name: 'Slovenčina', base: '/sk', pronta: false },
  { code: 'sl', name: 'Slovenščina',base: '/sl', pronta: false },
  { code: 'sv', name: 'Svenska',    base: '/sv', pronta: false },
];

/// Le lingue effettivamente pubblicate.
export const LANGS_PRONTE = LANGS.filter((l) => l.pronta);

/// Le lingue nuove: quelle servite dalla rotta dinamica /[lang]/.
export const LANGS_DINAMICHE = LANGS_PRONTE.filter((l) => l.code !== 'it' && l.code !== 'en');

/// Prende `oggetto[lang]`, e se quella lingua manca ripiega sull'inglese e
/// poi sull'italiano. Serve durante la traduzione: una lingua a meta' mostra
/// il pezzo tradotto e il resto in inglese, invece di rompersi.
export function testo(oggetto, lang) {
  if (!oggetto) return undefined;
  return oggetto[lang] ?? oggetto.en ?? oggetto.it;
}

/// URL di una pagina in una lingua. Italiano e inglese conservano i loro
/// percorsi storici (sono indicizzati); le lingue nuove usano gli slug
/// inglesi sotto il proprio prefisso.
export function urlPagina(chiave, lang) {
  const r = ROUTES[chiave];
  if (!r) return '/';
  if (r[lang]) return r[lang];
  const base = (LANGS.find((l) => l.code === lang) || {}).base || '';
  // Lo slug inglese porta gia' il prefisso /en: va tolto, altrimenti si
  // ottiene /de/en/terms/ invece di /de/terms/.
  const slug = (r.en || '/').replace(/^\/en/, '') || '/';
  return base + slug;
}

// Navigazione principale (le voci puntano alle pagine vere, non agli anchor).
export const NAV = {
  es: [
    {
      "key": "howItWorks",
      "label": "Cómo funciona"
    },
    {
      "key": "features",
      "label": "Funciones"
    },
    {
      "key": "map",
      "label": "Mapa"
    },
    {
      "key": "guides",
      "label": "Guías"
    }
  ],
  fr: [
    {
      "key": "howItWorks",
      "label": "Comment ça marche"
    },
    {
      "key": "features",
      "label": "Fonctionnalités"
    },
    {
      "key": "map",
      "label": "Carte"
    },
    {
      "key": "guides",
      "label": "Guides"
    }
  ],
  de: [
    {
      "key": "howItWorks",
      "label": "So funktioniert es"
    },
    {
      "key": "features",
      "label": "Funktionen"
    },
    {
      "key": "map",
      "label": "Karte"
    },
    {
      "key": "guides",
      "label": "Ratgeber"
    }
  ],
  pt: [
    {
      "key": "howItWorks",
      "label": "Como funciona"
    },
    {
      "key": "features",
      "label": "Funcionalidades"
    },
    {
      "key": "map",
      "label": "Mapa"
    },
    {
      "key": "guides",
      "label": "Guias"
    }
  ],
  ro: [
    {
      "key": "howItWorks",
      "label": "Cum funcționează"
    },
    {
      "key": "features",
      "label": "Funcții"
    },
    {
      "key": "map",
      "label": "Hartă"
    },
    {
      "key": "guides",
      "label": "Ghiduri"
    }
  ],
  it: [
    { key: 'howItWorks', label: 'Come funziona' },
    { key: 'features',   label: 'Funzionalità' },
    { key: 'map',        label: 'Mappa' },
    { key: 'guides',     label: 'Guide' },
  ],
  en: [
    { key: 'howItWorks', label: 'How it works' },
    { key: 'features',   label: 'Features' },
    { key: 'map',        label: 'Map' },
    { key: 'guides',     label: 'Guides' },
  ],
};

export const UI = {
  es: {
    "skipToContent": "Ir al contenido",
    "langGroupLabel": "Idioma",
    "navCta": "Descargar la app",
    "footerLinks": {
      "faq": "Preguntas frecuentes",
      "forOrgs": "Para veterinarios y refugios",
      "childSafety": "Seguridad de los menores",
      "privacy": "Privacidad",
      "terms": "Términos",
      "deletion": "Eliminar la cuenta",
      "contact": "Contacto"
    },
    "footerTagline": "Orma — Encuentra a tu amigo. Hecho con cuidado, en Italia.",
    "footerColophon": "Versión editorial del sitio · 2026",
    "storeSoon": "Pronto en",
    "backHome": "Volver al inicio",
    "allGuides": "Todas las guías",
    "faqTitle": "Preguntas frecuentes",
    "homeGuidesTitle": "Guías útiles",
    "homeGuidesLead": "Qué hacer cuando cuenta: ¿has perdido o encontrado un animal? Aquí tienes los pasos correctos.",
    "guidesHubTitle": "Guías para animales perdidos y encontrados",
    "guidesHubLead": "Consejos prácticos para los momentos que cuentan: qué hacer si has perdido o encontrado un animal, el microchip, las adopciones.",
    "guideCtaTitle": "Publica un aviso en Orma",
    "guideCtaText": "Con Orma avisas a las personas cercanas, recibes avistamientos con foto y encuentras a tu amigo más deprisa."
  },
  fr: {
    "skipToContent": "Aller au contenu",
    "langGroupLabel": "Langue",
    "navCta": "Télécharger l'application",
    "footerLinks": {
      "faq": "Questions fréquentes",
      "forOrgs": "Pour vétérinaires et refuges",
      "childSafety": "Sécurité des mineurs",
      "privacy": "Confidentialité",
      "terms": "Conditions",
      "deletion": "Suppression du compte",
      "contact": "Contact"
    },
    "footerTagline": "Orma — Retrouvez votre ami. Fait avec soin, en Italie.",
    "footerColophon": "Version éditoriale du site · 2026",
    "storeSoon": "Bientôt sur",
    "backHome": "Retour à l'accueil",
    "allGuides": "Tous les guides",
    "faqTitle": "Questions fréquentes",
    "homeGuidesTitle": "Guides utiles",
    "homeGuidesLead": "Quoi faire quand cela compte : vous avez perdu ou trouvé un animal ? Voici les bons réflexes.",
    "guidesHubTitle": "Guides pour animaux perdus et trouvés",
    "guidesHubLead": "Des conseils pratiques pour les moments qui comptent : quoi faire si vous avez perdu ou trouvé un animal, la puce électronique, les adoptions.",
    "guideCtaTitle": "Signalez sur Orma",
    "guideCtaText": "Avec Orma vous prévenez les personnes proches, vous recevez des observations avec photos et vous retrouvez votre ami plus vite."
  },
  de: {
    "skipToContent": "Zum Inhalt springen",
    "langGroupLabel": "Sprache",
    "navCta": "App herunterladen",
    "footerLinks": {
      "faq": "Häufige Fragen",
      "forOrgs": "Für Tierärzte und Tierheime",
      "childSafety": "Sicherheit von Minderjährigen",
      "privacy": "Datenschutz",
      "terms": "Nutzungsbedingungen",
      "deletion": "Konto löschen",
      "contact": "Kontakt"
    },
    "footerTagline": "Orma — Finde deinen Freund. Mit Sorgfalt gemacht, in Italien.",
    "footerColophon": "Redaktionelle Fassung der Website · 2026",
    "storeSoon": "Bald im",
    "backHome": "Zurück zur Startseite",
    "allGuides": "Alle Ratgeber",
    "faqTitle": "Häufige Fragen",
    "homeGuidesTitle": "Nützliche Ratgeber",
    "homeGuidesLead": "Was zu tun ist, wenn es darauf ankommt: Hast du ein Tier verloren oder gefunden? Hier stehen die richtigen Schritte.",
    "guidesHubTitle": "Ratgeber für vermisste und gefundene Tiere",
    "guidesHubLead": "Praktische Tipps für die Momente, die zählen: was zu tun ist, wenn du ein Tier verloren oder gefunden hast, der Mikrochip, die Vermittlung.",
    "guideCtaTitle": "Melde es auf Orma",
    "guideCtaText": "Mit Orma benachrichtigst du die Menschen in deiner Nähe, bekommst Sichtungen mit Fotos und findest deinen Freund schneller wieder."
  },
  pt: {
    "skipToContent": "Ir para o conteúdo",
    "langGroupLabel": "Idioma",
    "navCta": "Descarregar a aplicação",
    "footerLinks": {
      "faq": "Perguntas frequentes",
      "forOrgs": "Para veterinários e abrigos",
      "childSafety": "Segurança de menores",
      "privacy": "Privacidade",
      "terms": "Termos",
      "deletion": "Eliminação da conta",
      "contact": "Contactos"
    },
    "footerTagline": "Orma — Encontra o teu amigo. Feito com cuidado, em Itália.",
    "footerColophon": "Versão editorial do site · 2026",
    "storeSoon": "Em breve na",
    "backHome": "Voltar à página inicial",
    "allGuides": "Todos os guias",
    "faqTitle": "Perguntas frequentes",
    "homeGuidesTitle": "Guias úteis",
    "homeGuidesLead": "O que fazer quando conta: perdeste ou encontraste um animal? Aqui estão os passos certos.",
    "guidesHubTitle": "Guias para animais perdidos e encontrados",
    "guidesHubLead": "Conselhos práticos para os momentos que contam: o que fazer se perdeste ou encontraste um animal, o microchip, as adoções.",
    "guideCtaTitle": "Publica um alerta na Orma",
    "guideCtaText": "Com a Orma avisas as pessoas próximas, recebes avistamentos com fotografias e encontras o teu amigo mais depressa."
  },
  ro: {
    "skipToContent": "Sari la conținut",
    "langGroupLabel": "Limbă",
    "navCta": "Descarcă aplicația",
    "footerLinks": {
      "faq": "Întrebări frecvente",
      "forOrgs": "Pentru veterinari și adăposturi",
      "childSafety": "Siguranța minorilor",
      "privacy": "Confidențialitate",
      "terms": "Termeni",
      "deletion": "Ștergerea contului",
      "contact": "Contact"
    },
    "footerTagline": "Orma — Găsește-ți prietenul. Făcut cu grijă, în Italia.",
    "footerColophon": "Versiunea editorială a site-ului · 2026",
    "storeSoon": "În curând pe",
    "backHome": "Înapoi la pagina principală",
    "allGuides": "Toate ghidurile",
    "faqTitle": "Întrebări frecvente",
    "homeGuidesTitle": "Ghiduri utile",
    "homeGuidesLead": "Ce să faci când contează: ai pierdut sau ai găsit un animal? Aici sunt pașii corecți.",
    "guidesHubTitle": "Ghiduri pentru animale pierdute și găsite",
    "guidesHubLead": "Sfaturi practice pentru momentele care contează: ce să faci dacă ai pierdut sau ai găsit un animal, microcipul, adopțiile.",
    "guideCtaTitle": "Publică un anunț pe Orma",
    "guideCtaText": "Cu Orma anunți persoanele din apropiere, primești semnalări cu fotografii și îți găsești prietenul mai repede."
  },
  it: {
    skipToContent: 'Vai al contenuto',
    langGroupLabel: 'Lingua',
    navCta: "Scarica l'app",
    footerLinks: { faq: 'FAQ', forOrgs: 'Per veterinari e canili', childSafety: 'Sicurezza dei minori', privacy: 'Privacy', terms: 'Termini', deletion: 'Cancellazione account', contact: 'Contatti' },
    footerTagline: 'Orma — Ritrova il tuo amico. Fatto con cura, in Italia.',
    footerColophon: 'Versione editoriale del sito · 2026',
    storeSoon: 'Presto su',
    backHome: 'Torna alla home',
    allGuides: 'Tutte le guide',
    faqTitle: 'Domande frequenti',
    homeGuidesTitle: 'Guide utili',
    homeGuidesLead: 'Cosa fare quando conta: hai perso o trovato un animale? Qui trovi i passi giusti.',
    guidesHubTitle: 'Guide per animali smarriti e trovati',
    guidesHubLead: 'Consigli pratici per i momenti che contano: cosa fare se hai perso o trovato un animale, il microchip, le adozioni.',
    guideCtaTitle: 'Segnala su Orma',
    guideCtaText: 'Con Orma avvisi le persone vicine, ricevi avvistamenti con foto e ritrovi il tuo amico più in fretta.',
  },
  en: {
    skipToContent: 'Skip to content',
    langGroupLabel: 'Language',
    navCta: 'Get the app',
    footerLinks: { faq: 'FAQ', forOrgs: 'For vets & shelters', childSafety: 'Child safety', privacy: 'Privacy', terms: 'Terms', deletion: 'Account deletion', contact: 'Contact' },
    footerTagline: 'Orma — Find your friend. Made with care, in Italy.',
    footerColophon: 'Editorial edition of the website · 2026',
    storeSoon: 'Coming soon to',
    backHome: 'Back to home',
    allGuides: 'All guides',
    faqTitle: 'Frequently asked questions',
    homeGuidesTitle: 'Helpful guides',
    homeGuidesLead: "When it matters: have you lost or found an animal? Here are the right steps.",
    guidesHubTitle: 'Guides for lost & found pets',
    guidesHubLead: "Practical advice for the moments that matter: what to do if you've lost or found a pet, microchips, adoptions.",
    guideCtaTitle: 'Post on Orma',
    guideCtaText: 'With Orma you alert people nearby, get sightings with photos and find your friend faster.',
  },
};

// ----------------------------------------------------------------------------
// HOMEPAGE — testi (dalle stringhe fornite, adattate al taglio editoriale).
// ----------------------------------------------------------------------------
export const HOME = {
  es: {
    "title": "Orma — App para animales perdidos | Encuentra a tu amigo",
    "metaDesc": "App para avisar y encontrar perros y gatos perdidos: alertas a las personas cercanas, avistamientos con foto, coincidencia por microchip. La privacidad, lo primero.",
    "heroEyebrow": "App para animales perdidos, encontrados y en adopción",
    "heroTitle": "Encuentra a tu amigo",
    "heroSub": "Orma conecta a quien ha perdido un animal con quien lo ha visto o encontrado. Publicas un aviso en unos toques, recibes alertas cuando algo se mueve cerca de ti y mantienes el contacto a salvo en el chat de la app.",
    "heroCta1": "Descargar Orma",
    "heroCta2": "Descubre cómo funciona",
    "heroProof": "Una comunidad que echa una pata, ciudad a ciudad.",
    "trust": [
      "Datos en Europa",
      "Privacidad desde el diseño",
      "Hecho en Italia"
    ],
    "animalsTitle": "Orma es para todos los animales",
    "animalsSub": "Perros y gatos, claro, pero también conejos, aves, roedores y todos los demás. Si alguien los quiere, aquí tienen su sitio: perdidos, encontrados, abandonados o buscando una familia.",
    "animals": [
      {
        "key": "dog",
        "label": "Perros"
      },
      {
        "key": "cat",
        "label": "Gatos"
      },
      {
        "key": "rabbit",
        "label": "Conejos"
      },
      {
        "key": "bird",
        "label": "Aves"
      },
      {
        "key": "rodent",
        "label": "Roedores"
      },
      {
        "key": "reptile",
        "label": "Reptiles"
      },
      {
        "key": "horse",
        "label": "Caballos"
      },
      {
        "key": "more",
        "label": "y más"
      }
    ],
    "stepsEyebrow": "Cómo funciona",
    "stepsTitle": "Tres pasos hacia casa",
    "steps": [
      {
        "t": "Avisa",
        "x": "¿Has perdido a tu animal? Crea un aviso con foto, descripción y la última posición conocida. En unos segundos lo ve la comunidad de tu zona."
      },
      {
        "t": "Avista",
        "x": "¿Has visto un animal que parece perdido o has encontrado uno? Publica un avistamiento con una foto y el punto donde estaba. Un solo aviso puede marcar la diferencia."
      },
      {
        "t": "Encuentra",
        "x": "Orma te avisa cuando un aviso cercano podría coincidir. Escribes en el chat seguro, comprobáis los detalles y organizáis la vuelta a casa."
      }
    ],
    "stepsCta": "Lee la historia completa",
    "featEyebrow": "Funciones",
    "featTitle": "Todo lo que hace falta, nada de más",
    "featLead": "Herramientas esenciales, pensadas alrededor de la privacidad y la rapidez. Sin adornos: solo lo que ayuda a un animal a volver a casa.",
    "feats": [
      {
        "t": "Avisa de perdido, encontrado o abandonado",
        "x": "Crea en unos toques un aviso de animal perdido, encontrado o abandonado, con foto, descripción y última posición. El aviso sigue activo 90 días y después se archiva automáticamente."
      },
      {
        "t": "Mapa con privacidad",
        "x": "Ves pérdidas y avistamientos a tu alrededor en un mapa. Para proteger a quien avisa, en el mapa público la posición aparece difuminada unos 150 metros: ayudas sin revelar direcciones exactas."
      },
      {
        "t": "Alertas cerca de ti",
        "x": "Activa las notificaciones y recibe un aviso cuando alguien publica algo en tu zona. Los primeros minutos cuentan, y tú ya los tienes."
      },
      {
        "t": "Avistamientos con foto",
        "x": "¿Has visto un animal que parece perdido? Publica un avistamiento con foto y lugar: quien busca reconoce enseguida a su animal, aunque sea por un solo aviso."
      },
      {
        "t": "Posibles coincidencias y microchip",
        "x": "Orma compara perdidos y encontrados y te sugiere las posibles coincidencias: «¿será el tuyo?». Si está disponible el número de microchip, el enlace es todavía más preciso."
      },
      {
        "t": "Chat seguro",
        "x": "Ponte en contacto con quien ha publicado un aviso directamente en la app, sin intercambiar el número de teléfono ni el correo hasta que tú lo decidas."
      },
      {
        "t": "Cartel PDF con QR",
        "x": "Genera con un toque un cartel en PDF listo para imprimir, con el QR del aviso. Quien lo encuentre escanea el código y abre la ficha actualizada del animal."
      },
      {
        "t": "Adopciones de refugios verificados",
        "x": "Consulta los animales que buscan casa en las protectoras y refugios verificados por Orma. Comprobamos las entidades lo mejor que podemos para darte referencias más fiables cuando decides adoptar."
      },
      {
        "t": "Chapa QR y collar digital",
        "x": "Pon una chapa Orma en el collar de tu animal. Quien lo encuentre la escanea y abre su ficha al momento para avisarte, sin que tengas que revelar tu teléfono ni tu dirección."
      },
      {
        "t": "Cartilla sanitaria digital",
        "x": "Lleva contigo las vacunas, el peso y los recordatorios de tu animal: una cartilla digital sencilla, útil cada día y no solo en la emergencia."
      },
      {
        "t": "Veterinarios y refugios en el mapa",
        "x": "Encuentra las entidades a tu alrededor, descubre quién abre en urgencias 24 h y dónde llevar un animal encontrado. A las clínicas veterinarias también puedes pedirles cita."
      },
      {
        "t": "Modo buscador",
        "x": "Activa el modo buscador para echar una mano en las búsquedas de la zona y sube en la clasificación de los voluntarios más activos de la comunidad."
      }
    ],
    "featsCta": "Ver todas las funciones",
    "adoptEyebrow": "Adopciones",
    "adoptTitle": "No solo encontrar: también adoptar",
    "adoptText": "Orma no sirve solo para encontrar a quien se ha perdido. En la sección de adopciones hay perros, gatos y otros animales que buscan una familia en protectoras y refugios verificados por nosotros. Miras las fichas, conoces su historia y contactas con la entidad: una forma más de cambiar una vida.",
    "adoptCta": "Descubre las adopciones",
    "adoptPoints": [
      "Protectoras y refugios verificados",
      "Fichas con foto e historia",
      "Contacto directo con la entidad"
    ],
    "reunitedEyebrow": "Finales felices",
    "reunitedTitle": "Cada vuelta a casa es una historia",
    "reunitedText": "Cuando un animal reencuentra a su familia, en Orma se convierte en una historia con final feliz para celebrar juntos. Ellos son el motivo por el que existe todo esto.",
    "vetsEyebrow": "Para veterinarios y entidades",
    "vetsTitle": "¿Eres veterinario o tienes un refugio? Deja que te encuentren.",
    "vetsText": "Orma te muestra en el mapa a quien busca ayuda: quien encuentra un animal te lo lleva, quien tiene una urgencia te localiza enseguida. Darte de alta lleva cinco minutos.",
    "vetsPoints": [
      "Visibilidad en el mapa",
      "Peticiones de cita desde la app",
      "Punto de entrega o urgencias 24 h"
    ],
    "vetsCta": "Escríbenos",
    "downloadTitle": "Tu amigo te está esperando",
    "downloadSub": "Orma llega primero a Android y después a iOS. Únete a la comunidad y ayuda a cada animal a volver a casa.",
    "btnAndroid": "Descargar en Google Play",
    "btnIos": "Pronto en la App Store"
  },
  fr: {
    "title": "Orma — Application pour animaux perdus | Retrouvez votre ami",
    "metaDesc": "Application pour signaler et retrouver les chiens et chats perdus : alertes aux personnes proches, observations avec photos, correspondance par puce électronique. La confidentialité d'abord.",
    "heroEyebrow": "Application pour animaux perdus, trouvés et à adopter",
    "heroTitle": "Retrouvez votre ami",
    "heroSub": "Orma met en relation celles et ceux qui ont perdu un animal avec celles et ceux qui l'ont aperçu ou trouvé. Vous signalez en quelques touches, vous êtes prévenu quand quelque chose bouge près de vous, et vos coordonnées restent protégées dans la messagerie de l'application.",
    "heroCta1": "Télécharger Orma",
    "heroCta2": "Voir comment ça marche",
    "heroProof": "Une communauté qui donne un coup de patte, ville après ville.",
    "trust": [
      "Données en Europe",
      "Confidentialité dès la conception",
      "Fabriqué en Italie"
    ],
    "animalsTitle": "Orma est pour tous les animaux",
    "animalsSub": "Chiens et chats bien sûr, mais aussi lapins, oiseaux, rongeurs et tous les autres. Si quelqu'un les aime, ils ont ici une place : perdus, trouvés, abandonnés ou à la recherche d'une famille.",
    "animals": [
      {
        "key": "dog",
        "label": "Chiens"
      },
      {
        "key": "cat",
        "label": "Chats"
      },
      {
        "key": "rabbit",
        "label": "Lapins"
      },
      {
        "key": "bird",
        "label": "Oiseaux"
      },
      {
        "key": "rodent",
        "label": "Rongeurs"
      },
      {
        "key": "reptile",
        "label": "Reptiles"
      },
      {
        "key": "horse",
        "label": "Chevaux"
      },
      {
        "key": "more",
        "label": "et d'autres"
      }
    ],
    "stepsEyebrow": "Comment ça marche",
    "stepsTitle": "Trois pas vers la maison",
    "steps": [
      {
        "t": "Signalez",
        "x": "Vous avez perdu votre animal ? Créez un signalement avec des photos, une description et la dernière position connue. En quelques secondes, la communauté de votre secteur le voit."
      },
      {
        "t": "Observez",
        "x": "Vous avez vu un animal qui semble perdu, ou vous en avez trouvé un ? Publiez une observation avec une photo et l'endroit où il se trouvait. Un seul signalement peut faire la différence."
      },
      {
        "t": "Retrouvez",
        "x": "Orma vous prévient quand un signalement proche pourrait correspondre. Vous échangez dans la messagerie sécurisée, vous vérifiez les détails ensemble et vous organisez le retour à la maison."
      }
    ],
    "stepsCta": "Lire l'histoire en entier",
    "featEyebrow": "Fonctionnalités",
    "featTitle": "Tout ce qu'il faut, rien de superflu",
    "featLead": "Des outils essentiels, conçus autour de la confidentialité et de la rapidité. Sans fioritures : seulement ce qui aide un animal à rentrer chez lui.",
    "feats": [
      {
        "t": "Signaler perdu, trouvé ou abandonné",
        "x": "Créez en quelques touches un signalement d'animal perdu, trouvé ou abandonné, avec photos, description et dernière position. Le signalement reste actif 90 jours, puis il est archivé automatiquement."
      },
      {
        "t": "Carte respectueuse de la vie privée",
        "x": "Vous voyez les disparitions et les observations autour de vous sur une carte. Pour protéger celles et ceux qui signalent, la position sur la carte publique est floutée d'environ 150 mètres : vous aidez sans révéler d'adresses exactes."
      },
      {
        "t": "Alertes près de chez vous",
        "x": "Activez les notifications et recevez une alerte quand quelqu'un publie un signalement dans votre secteur. Les premières minutes comptent, et vous les connaissez déjà."
      },
      {
        "t": "Observations avec photos",
        "x": "Vous avez vu un animal qui semble perdu ? Publiez une observation avec photo et lieu : celui qui cherche reconnaît aussitôt son animal, même à partir d'un seul signalement."
      },
      {
        "t": "Correspondances possibles et puce électronique",
        "x": "Orma compare les animaux perdus et trouvés et vous propose les correspondances possibles — « serait-ce le vôtre ? ». Si le numéro de puce est disponible, le rapprochement est encore plus précis."
      },
      {
        "t": "Messagerie sécurisée",
        "x": "Entrez en contact avec la personne qui a publié un signalement directement dans l'application, sans échanger de numéro de téléphone ni d'adresse e-mail tant que vous ne l'avez pas décidé."
      },
      {
        "t": "Affiche PDF avec QR code",
        "x": "Générez d'une touche une affiche PDF prête à imprimer, avec le QR code du signalement. Celui qui la trouve scanne le code et ouvre la fiche à jour de l'animal."
      },
      {
        "t": "Adoptions depuis des refuges vérifiés",
        "x": "Parcourez les animaux qui cherchent un foyer dans les refuges vérifiés par Orma. Nous contrôlons les structures du mieux que nous pouvons pour vous donner des repères plus fiables au moment d'adopter."
      },
      {
        "t": "Médaille QR et collier numérique",
        "x": "Fixez une médaille Orma au collier de votre animal. Celui qui le trouve la scanne et ouvre aussitôt sa fiche pour vous prévenir — sans que vous ayez à révéler téléphone ou adresse."
      },
      {
        "t": "Carnet de santé numérique",
        "x": "Gardez avec vous les vaccins, le poids et les rappels de votre animal : un carnet numérique simple, utile chaque jour et pas seulement dans l'urgence."
      },
      {
        "t": "Vétérinaires et refuges sur la carte",
        "x": "Trouvez les structures autour de vous, voyez qui est ouvert en urgence 24 h/24 et où amener un animal trouvé. Auprès des cabinets vétérinaires, vous pouvez aussi demander un rendez-vous."
      },
      {
        "t": "Mode chercheur",
        "x": "Activez le mode chercheur pour donner un coup de main aux recherches du secteur et montez dans le classement des bénévoles les plus actifs de la communauté."
      }
    ],
    "featsCta": "Voir toutes les fonctionnalités",
    "adoptEyebrow": "Adoptions",
    "adoptTitle": "Pas seulement retrouver : adopter aussi",
    "adoptText": "Orma ne sert pas qu'à retrouver ceux qui se sont perdus. Dans la section adoptions, vous trouvez des chiens, des chats et d'autres animaux à la recherche d'une famille, dans les refuges que nous avons vérifiés. Vous parcourez les fiches, vous découvrez leur histoire et vous contactez la structure : une façon de plus de changer une vie.",
    "adoptCta": "Découvrir les adoptions",
    "adoptPoints": [
      "Refuges vérifiés",
      "Fiches avec photos et histoire",
      "Contact direct avec la structure"
    ],
    "reunitedEyebrow": "Fins heureuses",
    "reunitedTitle": "Chaque retour à la maison est une histoire",
    "reunitedText": "Quand un animal retrouve sa famille, cela devient sur Orma une histoire à fin heureuse que l'on fête ensemble. Ce sont eux la raison pour laquelle tout cela existe.",
    "vetsEyebrow": "Pour vétérinaires et structures",
    "vetsTitle": "Vous êtes vétérinaire ou vous gérez un refuge ? Faites-vous trouver.",
    "vetsText": "Orma vous montre sur la carte à celles et ceux qui cherchent de l'aide : qui trouve un animal vous l'amène, qui a une urgence vous trouve tout de suite. Vous inscrire prend cinq minutes.",
    "vetsPoints": [
      "Visibilité sur la carte",
      "Demandes de rendez-vous depuis l'application",
      "Point de dépôt ou urgence 24 h/24"
    ],
    "vetsCta": "Écrivez-nous",
    "downloadTitle": "Votre ami vous attend",
    "downloadSub": "Orma arrive d'abord sur Android, puis sur iOS. Rejoignez la communauté et aidez chaque animal à rentrer chez lui.",
    "btnAndroid": "Télécharger sur Google Play",
    "btnIos": "Bientôt sur l'App Store"
  },
  de: {
    "title": "Orma — App für vermisste Tiere | Finde deinen Freund",
    "metaDesc": "App zum Melden und Wiederfinden vermisster Hunde und Katzen: Benachrichtigungen für Menschen in der Nähe, Sichtungen mit Fotos, Abgleich über den Mikrochip. Datenschutz an erster Stelle.",
    "heroEyebrow": "App für vermisste, gefundene und zu vermittelnde Tiere",
    "heroTitle": "Finde deinen Freund",
    "heroSub": "Orma bringt Menschen zusammen, die ein Tier verloren haben, und Menschen, die eines gesehen oder gefunden haben. Du meldest es mit wenigen Fingertipps, wirst benachrichtigt, wenn sich in deiner Nähe etwas tut, und deine Kontaktdaten bleiben im Chat der App geschützt.",
    "heroCta1": "Orma herunterladen",
    "heroCta2": "So funktioniert es",
    "heroProof": "Eine Gemeinschaft, die eine Pfote reicht — Stadt für Stadt.",
    "trust": [
      "Daten in Europa",
      "Datenschutz von Anfang an",
      "Made in Italy"
    ],
    "animalsTitle": "Orma ist für jedes Tier da",
    "animalsSub": "Hunde und Katzen natürlich, aber auch Kaninchen, Vögel, Nagetiere und alle anderen. Wenn jemand sie liebt, haben sie hier einen Platz: vermisst, gefunden, ausgesetzt oder auf der Suche nach einer Familie.",
    "animals": [
      {
        "key": "dog",
        "label": "Hunde"
      },
      {
        "key": "cat",
        "label": "Katzen"
      },
      {
        "key": "rabbit",
        "label": "Kaninchen"
      },
      {
        "key": "bird",
        "label": "Vögel"
      },
      {
        "key": "rodent",
        "label": "Nagetiere"
      },
      {
        "key": "reptile",
        "label": "Reptilien"
      },
      {
        "key": "horse",
        "label": "Pferde"
      },
      {
        "key": "more",
        "label": "und weitere"
      }
    ],
    "stepsEyebrow": "So funktioniert es",
    "stepsTitle": "Drei Schritte nach Hause",
    "steps": [
      {
        "t": "Melden",
        "x": "Dein Tier ist weg? Erstelle eine Meldung mit Fotos, Beschreibung und dem letzten bekannten Standort. Innerhalb von Sekunden sieht sie die Gemeinschaft in deiner Gegend."
      },
      {
        "t": "Sichten",
        "x": "Du hast ein Tier gesehen, das verloren wirkt, oder eines gefunden? Veröffentliche eine Sichtung mit Foto und Ort. Schon eine einzige Meldung kann den Unterschied machen."
      },
      {
        "t": "Wiederfinden",
        "x": "Orma benachrichtigt dich, wenn eine Meldung in der Nähe passen könnte. Ihr schreibt euch im sicheren Chat, prüft gemeinsam die Details und organisiert die Rückkehr nach Hause."
      }
    ],
    "stepsCta": "Die ganze Geschichte lesen",
    "featEyebrow": "Funktionen",
    "featTitle": "Alles, was nötig ist — und nichts darüber hinaus",
    "featLead": "Grundlegende Werkzeuge, entworfen rund um Datenschutz und Schnelligkeit. Kein Schnickschnack: nur das, was einem Tier hilft, nach Hause zu kommen.",
    "feats": [
      {
        "t": "Vermisst, gefunden oder ausgesetzt melden",
        "x": "Erstelle mit wenigen Fingertipps eine Meldung für ein vermisstes, gefundenes oder ausgesetztes Tier, mit Fotos, Beschreibung und letztem Standort. Die Meldung bleibt 90 Tage aktiv und wird danach automatisch archiviert."
      },
      {
        "t": "Karte mit Datenschutz",
        "x": "Du siehst Vermisstenfälle und Sichtungen um dich herum auf einer Karte. Um die Meldenden zu schützen, wird der Standort auf der öffentlichen Karte um etwa 150 Meter unscharf gemacht: Du hilfst, ohne genaue Adressen preiszugeben."
      },
      {
        "t": "Benachrichtigungen in deiner Nähe",
        "x": "Aktiviere die Mitteilungen und werde benachrichtigt, wenn jemand in deiner Gegend etwas meldet. Die ersten Minuten zählen — und du kennst sie schon."
      },
      {
        "t": "Sichtungen mit Fotos",
        "x": "Du hast ein Tier gesehen, das verloren wirkt? Veröffentliche eine Sichtung mit Foto und Ort: Wer sucht, erkennt sein Tier sofort, auch anhand einer einzigen Meldung."
      },
      {
        "t": "Mögliche Übereinstimmungen und Mikrochip",
        "x": "Orma vergleicht vermisste und gefundene Tiere und schlägt dir mögliche Übereinstimmungen vor — „ist das vielleicht deins?“. Liegt die Mikrochipnummer vor, wird die Verbindung noch genauer."
      },
      {
        "t": "Sicherer Chat",
        "x": "Nimm direkt in der App Kontakt zu der Person auf, die eine Meldung veröffentlicht hat, ohne Telefonnummer oder E-Mail auszutauschen, solange du das nicht willst."
      },
      {
        "t": "PDF-Aushang mit QR-Code",
        "x": "Erstelle mit einem Fingertipp einen druckfertigen PDF-Aushang mit dem QR-Code der Meldung. Wer ihn findet, scannt den Code und öffnet die aktuelle Seite des Tieres."
      },
      {
        "t": "Vermittlung aus geprüften Tierheimen",
        "x": "Stöbere durch die Tiere, die ein Zuhause suchen, in den von Orma geprüften Tierheimen. Wir prüfen die Einrichtungen so gut wir können, um dir verlässlichere Anhaltspunkte zu geben, wenn du dich für eine Adoption entscheidest."
      },
      {
        "t": "QR-Marke und digitales Halsband",
        "x": "Bring eine Orma-Marke am Halsband deines Tieres an. Wer es findet, scannt sie und öffnet sofort seine Seite, um dich zu benachrichtigen — ohne dass du Telefonnummer oder Adresse preisgeben musst."
      },
      {
        "t": "Digitaler Impfpass",
        "x": "Hab Impfungen, Gewicht und Erinnerungen deines Tieres immer dabei: ein einfacher digitaler Pass, jeden Tag nützlich und nicht nur im Notfall."
      },
      {
        "t": "Tierärzte und Tierheime auf der Karte",
        "x": "Finde die Einrichtungen um dich herum, sieh, wer im Notfall rund um die Uhr geöffnet hat, und wohin du ein gefundenes Tier bringen kannst. Bei Tierarztpraxen kannst du auch einen Termin anfragen."
      },
      {
        "t": "Suchmodus",
        "x": "Aktiviere den Suchmodus, um bei Suchaktionen in der Gegend mitzuhelfen, und steige in der Rangliste der aktivsten Freiwilligen der Gemeinschaft auf."
      }
    ],
    "featsCta": "Alle Funktionen ansehen",
    "adoptEyebrow": "Vermittlung",
    "adoptTitle": "Nicht nur wiederfinden: auch adoptieren",
    "adoptText": "Orma dient nicht nur dazu, Verlorene wiederzufinden. Im Bereich Vermittlung findest du Hunde, Katzen und andere Tiere, die eine Familie suchen, in den von uns geprüften Tierheimen. Du schaust dir die Profile an, erfährst ihre Geschichte und nimmst Kontakt zur Einrichtung auf: eine weitere Möglichkeit, ein Leben zu verändern.",
    "adoptCta": "Vermittlung entdecken",
    "adoptPoints": [
      "Geprüfte Tierheime",
      "Profile mit Fotos und Geschichte",
      "Direkter Kontakt zur Einrichtung"
    ],
    "reunitedEyebrow": "Glückliche Enden",
    "reunitedTitle": "Jede Heimkehr ist eine Geschichte",
    "reunitedText": "Wenn ein Tier seine Familie wiederfindet, wird daraus auf Orma eine Geschichte mit glücklichem Ende, die wir gemeinsam feiern. Sie sind der Grund, warum es das alles gibt.",
    "vetsEyebrow": "Für Tierärzte und Einrichtungen",
    "vetsTitle": "Du bist Tierarzt oder betreibst ein Tierheim? Lass dich finden.",
    "vetsText": "Orma zeigt dich auf der Karte denen, die Hilfe suchen: Wer ein Tier findet, bringt es zu dir; wer einen Notfall hat, findet dich sofort. Dich einzutragen dauert fünf Minuten.",
    "vetsPoints": [
      "Sichtbarkeit auf der Karte",
      "Terminanfragen aus der App",
      "Abgabestelle oder Notdienst rund um die Uhr"
    ],
    "vetsCta": "Schreib uns",
    "downloadTitle": "Dein Freund wartet auf dich",
    "downloadSub": "Orma kommt zuerst für Android, dann für iOS. Werde Teil der Gemeinschaft und hilf jedem Tier, nach Hause zu finden.",
    "btnAndroid": "Bei Google Play herunterladen",
    "btnIos": "Bald im App Store"
  },
  pt: {
    "title": "Orma — Aplicação para animais perdidos | Encontra o teu amigo",
    "metaDesc": "Aplicação para assinalar e encontrar cães e gatos perdidos: alertas às pessoas próximas, avistamentos com fotografias, correspondência por microchip. Privacidade em primeiro lugar.",
    "heroEyebrow": "Aplicação para animais perdidos, encontrados e para adoção",
    "heroTitle": "Encontra o teu amigo",
    "heroSub": "A Orma liga quem perdeu um animal a quem o viu ou encontrou. Publicas um alerta em poucos toques, recebes avisos quando algo se mexe perto de ti e manténs os teus contactos protegidos no chat da aplicação.",
    "heroCta1": "Descarregar a Orma",
    "heroCta2": "Ver como funciona",
    "heroProof": "Uma comunidade que dá uma pata, cidade a cidade.",
    "trust": [
      "Dados na Europa",
      "Privacidade desde a conceção",
      "Feito em Itália"
    ],
    "animalsTitle": "A Orma é para todos os animais",
    "animalsSub": "Cães e gatos, claro, mas também coelhos, aves, roedores e todos os outros. Se alguém gosta deles, aqui têm um lugar: perdidos, encontrados, abandonados ou à procura de uma família.",
    "animals": [
      {
        "key": "dog",
        "label": "Cães"
      },
      {
        "key": "cat",
        "label": "Gatos"
      },
      {
        "key": "rabbit",
        "label": "Coelhos"
      },
      {
        "key": "bird",
        "label": "Aves"
      },
      {
        "key": "rodent",
        "label": "Roedores"
      },
      {
        "key": "reptile",
        "label": "Répteis"
      },
      {
        "key": "horse",
        "label": "Cavalos"
      },
      {
        "key": "more",
        "label": "e outros"
      }
    ],
    "stepsEyebrow": "Como funciona",
    "stepsTitle": "Três passos até casa",
    "steps": [
      {
        "t": "Assinala",
        "x": "Perdeste o teu animal? Cria um alerta com fotografias, descrição e última posição conhecida. Em poucos segundos a comunidade da tua zona vê-o."
      },
      {
        "t": "Avista",
        "x": "Viste um animal que parece perdido ou encontraste algum? Publica um avistamento com uma fotografia e o local onde estava. Até um único aviso pode fazer a diferença."
      },
      {
        "t": "Reencontra",
        "x": "A Orma avisa-te quando um alerta próximo pode corresponder. Escreves no chat seguro, confirmam os detalhes juntos e organizam o regresso a casa."
      }
    ],
    "stepsCta": "Ler a história completa",
    "featEyebrow": "Funcionalidades",
    "featTitle": "Tudo o que é preciso, nada a mais",
    "featLead": "Ferramentas essenciais, pensadas à volta da privacidade e da rapidez. Sem enfeites: apenas o que ajuda um animal a voltar para casa.",
    "feats": [
      {
        "t": "Assinala perdido, encontrado ou abandonado",
        "x": "Cria em poucos toques um alerta de animal perdido, encontrado ou abandonado, com fotografias, descrição e última posição. O alerta fica ativo 90 dias e depois é arquivado automaticamente."
      },
      {
        "t": "Mapa com privacidade",
        "x": "Vês desaparecimentos e avistamentos à tua volta num mapa. Para proteger quem assinala, no mapa público a posição é desfocada em cerca de 150 metros: ajudas sem revelar moradas exatas."
      },
      {
        "t": "Alertas perto de ti",
        "x": "Ativa as notificações e recebe um aviso quando alguém publica um alerta na tua zona. Os primeiros minutos contam, e tu já os conheces."
      },
      {
        "t": "Avistamentos com fotografias",
        "x": "Viste um animal que parece perdido? Publica um avistamento com fotografia e local: quem procura reconhece logo o seu animal, mesmo a partir de um único aviso."
      },
      {
        "t": "Correspondências possíveis e microchip",
        "x": "A Orma compara animais perdidos e encontrados e sugere-te as correspondências possíveis — «será o teu?». Se o número do microchip estiver disponível, a ligação é ainda mais precisa."
      },
      {
        "t": "Chat seguro",
        "x": "Entra em contacto com quem publicou um alerta diretamente na aplicação, sem trocar número de telefone ou e-mail enquanto não fores tu a decidir."
      },
      {
        "t": "Cartaz PDF com código QR",
        "x": "Gera num toque um cartaz em PDF pronto a imprimir, com o código QR do alerta. Quem o encontra digitaliza o código e abre a ficha atualizada do animal."
      },
      {
        "t": "Adoções de abrigos verificados",
        "x": "Percorre os animais à procura de casa nos canis e abrigos verificados pela Orma. Verificamos as instituições o melhor que podemos para te dar referências mais fiáveis quando decides adotar."
      },
      {
        "t": "Medalha QR e coleira digital",
        "x": "Coloca uma medalha Orma na coleira do teu animal. Quem o encontrar digitaliza-a e abre logo a sua ficha para te avisar — sem que tenhas de revelar telefone ou morada."
      },
      {
        "t": "Boletim de saúde digital",
        "x": "Tens sempre contigo as vacinas, o peso e os lembretes do teu animal: um boletim digital simples, útil todos os dias e não só na emergência."
      },
      {
        "t": "Veterinários e abrigos no mapa",
        "x": "Encontra as instituições à tua volta, descobre quem está aberto em urgência 24 horas e onde levar um animal encontrado. Nas clínicas veterinárias podes também pedir uma marcação."
      },
      {
        "t": "Modo procurador",
        "x": "Ativa o modo procurador para dar uma ajuda nas buscas da zona e sobe na classificação dos voluntários mais ativos da comunidade."
      }
    ],
    "featsCta": "Ver todas as funcionalidades",
    "adoptEyebrow": "Adoções",
    "adoptTitle": "Não é só reencontrar: também adotar",
    "adoptText": "A Orma não serve apenas para reencontrar quem se perdeu. Na secção de adoções encontras cães, gatos e outros animais à procura de uma família, nos canis e abrigos verificados por nós. Percorres as fichas, ficas a conhecer a sua história e contactas a instituição: mais uma forma de mudar uma vida.",
    "adoptCta": "Descobrir as adoções",
    "adoptPoints": [
      "Canis e abrigos verificados",
      "Fichas com fotografias e história",
      "Contacto direto com a instituição"
    ],
    "reunitedEyebrow": "Finais felizes",
    "reunitedTitle": "Cada regresso a casa é uma história",
    "reunitedText": "Quando um animal reencontra a sua família, na Orma torna-se uma história de final feliz para celebrar em conjunto. São eles a razão pela qual tudo isto existe.",
    "vetsEyebrow": "Para veterinários e instituições",
    "vetsTitle": "És veterinário ou tens um abrigo? Faz-te encontrar.",
    "vetsText": "A Orma mostra-te no mapa a quem procura ajuda: quem encontra um animal traz-to, quem tem uma urgência encontra-te logo. Ativares-te leva cinco minutos.",
    "vetsPoints": [
      "Visibilidade no mapa",
      "Pedidos de marcação a partir da aplicação",
      "Ponto de entrega ou urgência 24 horas"
    ],
    "vetsCta": "Escreve-nos",
    "downloadTitle": "O teu amigo está à tua espera",
    "downloadSub": "A Orma chega primeiro ao Android e depois ao iOS. Junta-te à comunidade e ajuda cada animal a voltar para casa.",
    "btnAndroid": "Descarregar no Google Play",
    "btnIos": "Em breve na App Store"
  },
  ro: {
    "title": "Orma — Aplicație pentru animale pierdute | Găsește-ți prietenul",
    "metaDesc": "Aplicație pentru a anunța și a găsi câini și pisici pierdute: alerte pentru persoanele din apropiere, semnalări cu fotografii, potrivire după microcip. Confidențialitatea pe primul loc.",
    "heroEyebrow": "Aplicație pentru animale pierdute, găsite și de adoptat",
    "heroTitle": "Găsește-ți prietenul",
    "heroSub": "Orma îi pune în legătură pe cei care au pierdut un animal cu cei care l-au văzut sau l-au găsit. Publici un anunț din câteva atingeri, primești alerte când se întâmplă ceva lângă tine și îți păstrezi datele de contact în siguranță, în chatul aplicației.",
    "heroCta1": "Descarcă Orma",
    "heroCta2": "Vezi cum funcționează",
    "heroProof": "O comunitate care întinde o labă, oraș cu oraș.",
    "trust": [
      "Date în Europa",
      "Confidențialitate din construcție",
      "Făcut în Italia"
    ],
    "animalsTitle": "Orma este pentru orice animal",
    "animalsSub": "Câini și pisici, desigur, dar și iepuri, păsări, rozătoare și toate celelalte. Dacă cineva le poartă de grijă, aici au un loc: pierdute, găsite, abandonate sau în căutarea unei familii.",
    "animals": [
      {
        "key": "dog",
        "label": "Câini"
      },
      {
        "key": "cat",
        "label": "Pisici"
      },
      {
        "key": "rabbit",
        "label": "Iepuri"
      },
      {
        "key": "bird",
        "label": "Păsări"
      },
      {
        "key": "rodent",
        "label": "Rozătoare"
      },
      {
        "key": "reptile",
        "label": "Reptile"
      },
      {
        "key": "horse",
        "label": "Cai"
      },
      {
        "key": "more",
        "label": "și altele"
      }
    ],
    "stepsEyebrow": "Cum funcționează",
    "stepsTitle": "Trei pași spre casă",
    "steps": [
      {
        "t": "Anunță",
        "x": "Ți-ai pierdut animalul? Creează un anunț cu fotografii, descriere și ultima poziție cunoscută. În câteva secunde îl vede comunitatea din zona ta."
      },
      {
        "t": "Semnalează",
        "x": "Ai văzut un animal care pare pierdut sau ai găsit unul? Publică o semnalare cu o fotografie și locul unde se afla. Chiar și o singură semnalare poate face diferența."
      },
      {
        "t": "Regăsește",
        "x": "Orma te anunță când un anunț din apropiere s-ar putea potrivi. Scrii în chatul sigur, verificați detaliile împreună și organizați întoarcerea acasă."
      }
    ],
    "stepsCta": "Citește povestea întreagă",
    "featEyebrow": "Funcții",
    "featTitle": "Tot ce trebuie, nimic în plus",
    "featLead": "Instrumente esențiale, gândite în jurul confidențialității și al vitezei. Fără înflorituri: doar ceea ce ajută un animal să se întoarcă acasă.",
    "feats": [
      {
        "t": "Anunță pierdut, găsit sau abandonat",
        "x": "Creezi din câteva atingeri un anunț pentru un animal pierdut, găsit sau abandonat, cu fotografii, descriere și ultima poziție. Anunțul rămâne activ 90 de zile, apoi este arhivat automat."
      },
      {
        "t": "Hartă care respectă confidențialitatea",
        "x": "Vezi pierderile și semnalările din jurul tău pe o hartă. Pentru a-i proteja pe cei care anunță, pe harta publică poziția este estompată cu aproximativ 150 de metri: ajuți fără să dezvălui adrese exacte."
      },
      {
        "t": "Alerte în apropierea ta",
        "x": "Activează notificările și primești o alertă când cineva publică un anunț în zona ta. Primele minute contează, iar tu le știi deja."
      },
      {
        "t": "Semnalări cu fotografii",
        "x": "Ai văzut un animal care pare pierdut? Publică o semnalare cu fotografie și loc: cine caută își recunoaște imediat animalul, chiar și dintr-o singură semnalare."
      },
      {
        "t": "Potriviri posibile și microcip",
        "x": "Orma compară animalele pierdute cu cele găsite și îți sugerează potrivirile posibile — „o fi al tău?”. Dacă numărul microcipului este disponibil, legătura este și mai precisă."
      },
      {
        "t": "Chat sigur",
        "x": "Iei legătura cu cine a publicat un anunț direct în aplicație, fără să schimbi numărul de telefon sau adresa de e-mail până când nu decizi tu."
      },
      {
        "t": "Afiș PDF cu cod QR",
        "x": "Generezi dintr-o atingere un afiș PDF gata de tipărit, cu codul QR al anunțului. Cine îl găsește scanează codul și deschide fișa actualizată a animalului."
      },
      {
        "t": "Adopții din adăposturi verificate",
        "x": "Răsfoiești animalele care caută o casă în adăposturile verificate de Orma. Verificăm structurile cât putem de bine, ca să îți oferim repere mai de încredere când alegi să adopți."
      },
      {
        "t": "Medalion QR și zgardă digitală",
        "x": "Pui un medalion Orma la zgarda animalului tău. Cine îl găsește îl scanează și deschide imediat fișa lui ca să te anunțe — fără ca tu să fii nevoit să dezvălui telefonul sau adresa."
      },
      {
        "t": "Carnet de sănătate digital",
        "x": "Ai mereu la tine vaccinurile, greutatea și memento-urile animalului tău: un carnet digital simplu, util în fiecare zi, nu doar în situații de urgență."
      },
      {
        "t": "Veterinari și adăposturi pe hartă",
        "x": "Găsești structurile din jurul tău, afli cine este deschis non-stop pentru urgențe și unde poți duce un animal găsit. De la cabinetele veterinare poți cere și o programare."
      },
      {
        "t": "Mod căutător",
        "x": "Activezi modul căutător ca să dai o mână de ajutor la căutările din zonă și urci în clasamentul celor mai activi voluntari din comunitate."
      }
    ],
    "featsCta": "Vezi toate funcțiile",
    "adoptEyebrow": "Adopții",
    "adoptTitle": "Nu doar regăsire: și adopție",
    "adoptText": "Orma nu servește doar la regăsirea celor care s-au pierdut. În secțiunea de adopții găsești câini, pisici și alte animale care caută o familie, în adăposturile verificate de noi. Răsfoiești fișele, le afli povestea și contactezi structura: încă un mod de a schimba o viață.",
    "adoptCta": "Descoperă adopțiile",
    "adoptPoints": [
      "Adăposturi verificate",
      "Fișe cu fotografii și poveste",
      "Contact direct cu structura"
    ],
    "reunitedEyebrow": "Final fericit",
    "reunitedTitle": "Fiecare întoarcere acasă este o poveste",
    "reunitedText": "Când un animal își regăsește familia, pe Orma devine o poveste cu final fericit de sărbătorit împreună. Ele sunt motivul pentru care există tot acest lucru.",
    "vetsEyebrow": "Pentru veterinari și structuri",
    "vetsTitle": "Ești veterinar sau ai un adăpost? Fă-te găsit.",
    "vetsText": "Orma te arată pe hartă celor care caută ajutor: cine găsește un animal ți-l aduce, cine are o urgență te găsește imediat. Îți ia cinci minute să te activezi.",
    "vetsPoints": [
      "Vizibilitate pe hartă",
      "Cereri de programare din aplicație",
      "Punct de predare sau urgențe non-stop"
    ],
    "vetsCta": "Scrie-ne",
    "downloadTitle": "Prietenul tău te așteaptă",
    "downloadSub": "Orma ajunge întâi pe Android, apoi pe iOS. Alătură-te comunității și ajută fiecare animal să se întoarcă acasă.",
    "btnAndroid": "Descarcă din Google Play",
    "btnIos": "În curând pe App Store"
  },
  it: {
    title: 'Orma — App per animali smarriti | Ritrova il tuo amico',
    metaDesc: 'App per segnalare e ritrovare cani e gatti smarriti: avvisi alle persone vicine, avvistamenti con foto, corrispondenza microchip. Privacy al primo posto.',
    heroEyebrow: 'App per animali smarriti, trovati e da adottare',
    heroTitle: 'Ritrova il tuo amico',
    heroSub: "Orma collega chi ha perso un animale con chi lo ha avvistato o trovato. Segnali in pochi tap, ricevi avvisi quando qualcosa si muove vicino a te e tieni i contatti al sicuro nella chat dell'app.",
    heroCta1: 'Scarica Orma',
    heroCta2: 'Scopri come funziona',
    heroProof: 'Una community che si dà una zampa, città per città.',
    trust: ['Dati in Europa', 'Privacy by design', 'Made in Italy'],
    animalsTitle: 'Orma è per ogni animale',
    animalsSub: 'Cani e gatti, certo, ma anche conigli, uccelli, roditori e tutti gli altri. Se qualcuno gli vuole bene, qui ha un posto: smarrito, trovato, abbandonato o in cerca di una famiglia.',
    animals: [
      { key: 'dog',     label: 'Cani' },
      { key: 'cat',     label: 'Gatti' },
      { key: 'rabbit',  label: 'Conigli' },
      { key: 'bird',    label: 'Uccelli' },
      { key: 'rodent',  label: 'Roditori' },
      { key: 'reptile', label: 'Rettili' },
      { key: 'horse',   label: 'Cavalli' },
      { key: 'more',    label: 'e altri' },
    ],
    stepsEyebrow: 'Come funziona',
    stepsTitle: 'Tre passi verso casa',
    steps: [
      { t: 'Segnala', x: 'Hai perso il tuo animale? Crea una segnalazione con foto, descrizione e ultima posizione conosciuta. In pochi secondi la vede la community della tua zona.' },
      { t: 'Avvista', x: 'Hai visto un animale che sembra smarrito o ne hai trovato uno? Pubblica un avvistamento con una foto e il punto in cui era. Anche una sola segnalazione può fare la differenza.' },
      { t: 'Ritrova', x: 'Orma ti avvisa quando una segnalazione vicina potrebbe corrispondere. Scrivi nella chat sicura, verificate i dettagli e organizzate il ritorno a casa.' },
    ],
    stepsCta: 'Leggi la storia per intero',
    featEyebrow: 'Funzionalità',
    featTitle: 'Tutto quello che serve, niente di superfluo',
    featLead: 'Strumenti essenziali, progettati intorno alla privacy e alla velocità. Niente fronzoli: solo ciò che aiuta un animale a tornare a casa.',
    feats: [
      { t: 'Segnala smarrito, trovato o abbandonato', x: "Crea in pochi tap una segnalazione di animale smarrito, trovato o abbandonato, con foto, descrizione e ultima posizione. La segnalazione resta attiva 90 giorni, poi viene archiviata automaticamente." },
      { t: 'Mappa con privacy', x: 'Vedi smarrimenti e avvistamenti intorno a te su una mappa. Per proteggere chi segnala, sulla mappa pubblica la posizione è offuscata di circa 150 metri: aiuti senza rivelare indirizzi esatti.' },
      { t: 'Avvisi vicino a te', x: 'Attiva le notifiche e ricevi un avviso quando qualcuno pubblica una segnalazione nella tua zona. I primi minuti contano, e tu li sai già.' },
      { t: 'Avvistamenti con foto', x: 'Hai visto un animale che sembra smarrito? Pubblica un avvistamento con foto e luogo: chi cerca riconosce subito il proprio animale, anche da una sola segnalazione.' },
      { t: 'Possibili corrispondenze e microchip', x: 'Orma confronta smarriti e trovati e ti suggerisce le possibili corrispondenze — "è forse il tuo?". Se è disponibile il numero di microchip, il collegamento è ancora più preciso.' },
      { t: 'Chat sicura', x: "Mettiti in contatto con chi ha pubblicato una segnalazione direttamente nell'app, senza scambiare numero di telefono o email finché non lo decidi tu." },
      { t: 'Volantino PDF con QR', x: 'Genera in un tocco un volantino in PDF pronto da stampare, con il QR della segnalazione. Chi lo trova scansiona il codice e apre la scheda aggiornata dell\'animale.' },
      { t: 'Adozioni da rifugi verificati', x: 'Sfoglia gli animali in cerca di casa nei canili e rifugi verificati da Orma. Controlliamo le strutture al meglio per darti riferimenti più affidabili quando scegli di adottare.' },
      { t: 'Tag QR e collare digitale', x: "Applica un tag Orma al collare del tuo animale. Chi lo trova lo scansiona e apre subito la sua scheda per avvisarti — senza che tu debba rivelare telefono o indirizzo." },
      { t: 'Libretto sanitario digitale', x: "Tieni con te vaccinazioni, peso e promemoria del tuo animale: un libretto digitale semplice, utile ogni giorno e non solo nell'emergenza." },
      { t: 'Veterinari e canili sulla mappa', x: 'Trova le strutture intorno a te, scopri chi è aperto in emergenza h24 e dove portare un animale trovato. Dalle strutture veterinarie puoi anche chiedere un appuntamento.' },
      { t: 'Modalità cercatore', x: 'Attiva la modalità cercatore per dare una mano nelle ricerche in zona e scala la classifica dei volontari più attivi della community.' },
    ],
    featsCta: 'Vedi tutte le funzionalità',
    adoptEyebrow: 'Adozioni',
    adoptTitle: 'Non solo ritrovare: anche adottare',
    adoptText: 'Orma non serve solo a ritrovare chi si è perso. Nella sezione adozioni trovi cani, gatti e altri animali in cerca di una famiglia nei canili e rifugi verificati da noi. Sfogli le schede, conosci la loro storia e contatti la struttura: un modo in più per cambiare una vita.',
    adoptCta: 'Scopri le adozioni',
    adoptPoints: ['Canili e rifugi verificati', 'Schede con foto e storia', 'Contatto diretto con la struttura'],
    reunitedEyebrow: 'Lieti fini',
    reunitedTitle: 'Ogni ritorno a casa è una storia',
    reunitedText: 'Quando un animale ritrova la sua famiglia, su Orma diventa una storia a lieto fine da festeggiare insieme. Sono loro il motivo per cui esiste tutto questo.',
    vetsEyebrow: 'Per veterinari e strutture',
    vetsTitle: 'Sei un veterinario o hai un canile? Fatti trovare.',
    vetsText: "Orma ti mostra sulla mappa a chi cerca aiuto: chi trova un animale te lo porta, chi ha un'emergenza ti trova subito. Attivarti richiede cinque minuti.",
    vetsPoints: ['Visibilità sulla mappa', "Richieste di appuntamento dall'app", 'Punto di consegna o emergenza h24'],
    vetsCta: 'Scrivici',
    downloadTitle: 'Il tuo amico ti sta aspettando',
    downloadSub: 'Orma arriva prima su Android, poi su iOS. Unisciti alla community e aiuta ogni animale a tornare a casa.',
    btnAndroid: 'Scarica su Google Play',
    btnIos: 'Presto su App Store',
  },
  en: {
    title: 'Orma — Lost & found pets app | Find your friend',
    metaDesc: "App to report and find lost dogs and cats: alerts to people nearby, sightings with photos, microchip matching. Privacy first.",
    heroEyebrow: 'For lost pets, found animals and adoptions',
    heroTitle: 'Find your friend',
    heroSub: "Orma connects people who've lost a pet with people who've spotted or found one. Post in a few taps, get alerts when something happens near you, and keep contact safe in the in-app chat.",
    heroCta1: 'Get Orma',
    heroCta2: 'See how it works',
    heroProof: 'A community that lends a paw, town by town.',
    trust: ['Data in the EU', 'Privacy by design', 'Made in Italy'],
    animalsTitle: 'Orma is for every animal',
    animalsSub: 'Dogs and cats, of course — but also rabbits, birds, rodents and everyone else. If someone loves them, they belong here: lost, found, abandoned or looking for a family.',
    animals: [
      { key: 'dog',     label: 'Dogs' },
      { key: 'cat',     label: 'Cats' },
      { key: 'rabbit',  label: 'Rabbits' },
      { key: 'bird',    label: 'Birds' },
      { key: 'rodent',  label: 'Rodents' },
      { key: 'reptile', label: 'Reptiles' },
      { key: 'horse',   label: 'Horses' },
      { key: 'more',    label: 'and more' },
    ],
    stepsEyebrow: 'How it works',
    stepsTitle: 'Three steps back home',
    steps: [
      { t: 'Report', x: 'Lost your pet? Create a report with photos, a description and the last known location. Within seconds it reaches the community around you.' },
      { t: 'Spot', x: 'Seen an animal that looks lost, or found one? Post a sighting with a photo and where it was. Even a single report can make the difference.' },
      { t: 'Reunite', x: 'Orma alerts you when a nearby report might match. Message through the secure chat, check the details together and arrange the reunion.' },
    ],
    stepsCta: 'Read the whole story',
    featEyebrow: 'Features',
    featTitle: "Everything you need, nothing you don't",
    featLead: 'Essential tools, designed around privacy and speed. No frills: just what helps an animal find its way home.',
    feats: [
      { t: 'Report lost, found or abandoned', x: 'Create a lost, found or abandoned report in a few taps, with photos, a description and the last known location. A report stays active for 90 days, then is archived automatically.' },
      { t: 'Privacy-first map', x: 'See lost and found reports around you on a map. To protect whoever posts, the public map blurs each location by about 150 metres — you can help without exposing exact addresses.' },
      { t: 'Alerts near you', x: "Turn on notifications and get pinged when someone posts a report in your area. The first minutes matter most — and you'll be the first to know." },
      { t: 'Sightings with photos', x: 'Seen an animal that looks lost? Post a sighting with a photo and the place: owners recognise their pet at a glance, even from a single report.' },
      { t: 'Possible matches & microchip', x: 'Orma compares lost and found reports and suggests possible matches — "could this be yours?". When a microchip number is available, the link is even more precise.' },
      { t: 'Secure chat', x: 'Get in touch with whoever posted a report right inside the app — without handing over your phone number or email until you choose to.' },
      { t: 'PDF flyer with QR', x: 'Generate a print-ready PDF flyer in one tap, with the report\'s QR code. Whoever finds it scans the code and opens the animal\'s up-to-date card.' },
      { t: 'Adoptions from verified shelters', x: 'Browse animals looking for a home in shelters verified by Orma. We vet the facilities as best we can, so you have more trustworthy options when you decide to adopt.' },
      { t: 'QR tag & digital collar', x: "Attach an Orma tag to your pet's collar. Whoever finds them scans it and opens their card right away to reach you — without revealing your phone number or address." },
      { t: 'Digital health booklet', x: "Keep your pet's vaccinations, weight and reminders with you: a simple digital health record, useful every day and not just in an emergency." },
      { t: 'Vets & shelters on the map', x: "Find the facilities around you, see who's open for 24/7 emergencies and where to bring a found animal. From veterinary clinics you can also request an appointment." },
      { t: 'Finder mode', x: "Turn on finder mode to help with searches in your area and climb the leaderboard of the community's most active volunteers." },
    ],
    featsCta: 'See all features',
    adoptEyebrow: 'Adoptions',
    adoptTitle: 'Not only reuniting: adopting too',
    adoptText: 'Orma is not only about finding who got lost. In the adoptions section you\'ll find dogs, cats and other animals looking for a family in shelters verified by us. Browse their cards, get to know their story and contact the shelter: one more way to change a life.',
    adoptCta: 'Discover adoptions',
    adoptPoints: ['Verified shelters', 'Cards with photos and story', 'Direct contact with the shelter'],
    reunitedEyebrow: 'Happy endings',
    reunitedTitle: 'Every reunion is a story',
    reunitedText: 'When an animal finds its family again, on Orma it becomes a happy ending to celebrate together. They are the reason all of this exists.',
    vetsEyebrow: 'For vets & shelters',
    vetsTitle: 'A vet or a shelter? Get found.',
    vetsText: 'Orma puts you on the map for people who need help: whoever finds an animal brings it to you, whoever has an emergency finds you right away. Joining takes five minutes.',
    vetsPoints: ['Visibility on the map', 'Appointment requests from the app', 'Drop-off point or 24/7 emergency'],
    vetsCta: 'Get in touch',
    downloadTitle: 'Your friend is waiting for you',
    downloadSub: 'Orma launches first on Android and then on iOS. Join the community and help every animal find its way home.',
    btnAndroid: 'Get it on Google Play',
    btnIos: 'Coming soon to the App Store',
  },
};

// ----------------------------------------------------------------------------
// Pagine dedicate "Come funziona" e "Funzionalità" — intro editoriale extra.
// (riusano gli array steps/feats di HOME, con un cappello introduttivo proprio)
// ----------------------------------------------------------------------------
export const HOWITWORKS = {
  es: {
    "title": "Cómo encontrar un animal perdido — Cómo funciona Orma",
    "metaDesc": "Cómo encontrar un perro o un gato perdido: del primer aviso a la vuelta a casa, los tres pasos de Orma explicados con calma.",
    "eyebrow": "Guía",
    "h1": "Cómo funciona",
    "lead": "Orma no promete milagros: es una herramienta. Pero es una herramienta construida alrededor de los minutos que cuentan, cuando un animal se aleja y cada par de ojos de más puede cambiar el final. Así se mueve la comunidad, paso a paso.",
    "closingTitle": "Sin garantías, con mucha comunidad",
    "closingText": "Orma ayuda, no garantiza: ninguna app puede asegurar que un animal aparezca. Lo que sí podemos hacer es poner en contacto a las personas adecuadas, deprisa y respetando la privacidad. El resto lo hace una comunidad que echa una pata."
  },
  fr: {
    "title": "Comment retrouver un animal perdu — Comment fonctionne Orma",
    "metaDesc": "Comment retrouver un chien ou un chat perdu : de la première alerte au retour à la maison, les trois étapes d'Orma expliquées calmement.",
    "eyebrow": "Guide",
    "h1": "Comment ça marche",
    "lead": "Orma ne promet pas de miracles : c'est un outil. Mais un outil construit autour des minutes qui comptent, quand un animal s'éloigne et que chaque paire d'yeux en plus peut changer la fin. Voici comment la communauté se met en mouvement, étape par étape.",
    "closingTitle": "Aucune garantie, beaucoup de communauté",
    "closingText": "Orma aide, mais ne garantit pas : aucune application ne peut assurer des retrouvailles. Ce que nous pouvons faire, c'est mettre en relation les bonnes personnes, vite et dans le respect de la vie privée. Le reste, c'est une communauté qui donne un coup de patte."
  },
  de: {
    "title": "Wie man ein vermisstes Tier wiederfindet — So funktioniert Orma",
    "metaDesc": "Wie du einen vermissten Hund oder eine vermisste Katze wiederfindest: von der ersten Meldung bis zur Heimkehr, die drei Schritte von Orma in Ruhe erklärt.",
    "eyebrow": "Ratgeber",
    "h1": "So funktioniert es",
    "lead": "Orma verspricht keine Wunder: Es ist ein Werkzeug. Aber ein Werkzeug, das rund um die Minuten gebaut ist, die zählen — wenn ein Tier sich entfernt und jedes zusätzliche Augenpaar das Ende verändern kann. So bewegt sich die Gemeinschaft, Schritt für Schritt.",
    "closingTitle": "Keine Garantien, viel Gemeinschaft",
    "closingText": "Orma hilft, garantiert aber nicht: Keine App kann ein Wiederfinden zusichern. Was wir tun können, ist die richtigen Menschen schnell und datenschutzgerecht zusammenzubringen. Den Rest macht eine Gemeinschaft, die eine Pfote reicht."
  },
  pt: {
    "title": "Como encontrar um animal perdido — Como funciona a Orma",
    "metaDesc": "Como encontrar um cão ou um gato perdido: do primeiro alerta ao regresso a casa, os três passos da Orma explicados com calma.",
    "eyebrow": "Guia",
    "h1": "Como funciona",
    "lead": "A Orma não promete milagres: é uma ferramenta. Mas é uma ferramenta construída à volta dos minutos que contam, quando um animal se afasta e cada par de olhos a mais pode mudar o final. Eis como a comunidade se move, passo a passo.",
    "closingTitle": "Nenhuma garantia, muita comunidade",
    "closingText": "A Orma ajuda, não garante: nenhuma aplicação pode assegurar um reencontro. O que podemos fazer é ligar as pessoas certas, depressa e respeitando a privacidade. O resto fá-lo uma comunidade que dá uma pata."
  },
  ro: {
    "title": "Cum găsești un animal pierdut — Cum funcționează Orma",
    "metaDesc": "Cum găsești un câine sau o pisică pierdută: de la prima alertă până la întoarcerea acasă, cei trei pași ai Orma explicați pe îndelete.",
    "eyebrow": "Ghid",
    "h1": "Cum funcționează",
    "lead": "Orma nu promite minuni: este un instrument. Dar este un instrument construit în jurul minutelor care contează, când un animal se îndepărtează și fiecare pereche de ochi în plus poate schimba finalul. Iată cum se mișcă comunitatea, pas cu pas.",
    "closingTitle": "Nicio garanție, multă comunitate",
    "closingText": "Orma ajută, nu garantează: nicio aplicație nu poate asigura o regăsire. Ceea ce putem face este să punem în legătură oamenii potriviți, repede și cu respect pentru confidențialitate. Restul îl face o comunitate care întinde o labă."
  },
  it: {
    title: 'Come ritrovare un animale smarrito — Come funziona Orma',
    metaDesc: 'Come ritrovare un cane o un gatto smarrito: dal primo avviso al ritorno a casa, i tre passi di Orma spiegati con calma.',
    eyebrow: 'Guida',
    h1: 'Come funziona',
    lead: "Orma non promette miracoli: è uno strumento. Ma è uno strumento costruito intorno ai minuti che contano, quando un animale si allontana e ogni occhio in più può cambiare il finale. Ecco come si muove la community, passo dopo passo.",
    closingTitle: 'Niente garanzie, molta community',
    closingText: 'Orma aiuta, non garantisce: nessuna app può assicurare un ritrovamento. Quello che possiamo fare è mettere in contatto le persone giuste, in fretta e nel rispetto della privacy. Il resto lo fa una community che si dà una zampa.',
  },
  en: {
    title: 'How to find a lost pet — How Orma works',
    metaDesc: 'How to find a lost dog or cat: from the first alert to the way home, the three steps of Orma explained calmly.',
    eyebrow: 'Guide',
    h1: 'How it works',
    lead: 'Orma promises no miracles: it is a tool. But it is a tool built around the minutes that matter, when an animal wanders off and every extra pair of eyes can change the ending. Here is how the community moves, step by step.',
    closingTitle: 'No guarantees, plenty of community',
    closingText: 'Orma helps, it does not guarantee: no app can ensure a reunion. What we can do is connect the right people, fast and with respect for privacy. The rest is done by a community that lends a paw.',
  },
};

export const FEATURES = {
  es: {
    "title": "App para avisar de animales perdidos y encontrados — Funciones de Orma",
    "metaDesc": "App para animales perdidos: mapa con privacidad, alertas cerca de ti, chat seguro, coincidencia por microchip y adopciones verificadas.",
    "eyebrow": "Funciones",
    "h1": "Todo lo que hace falta, nada de más",
    "lead": "Hemos quitado todo lo que no servía. Lo que queda son herramientas esenciales, cada una pensada para un momento concreto de la búsqueda, y cada una con la privacidad como ajuste de partida, no como añadido posterior.",
    "privacyTitle": "La privacidad no es una función: es el punto de partida",
    "privacyText": "Tus datos no se venden. La posición en el mapa público siempre aparece difuminada unos 150 metros. Los servidores de datos están en la Unión Europea, en Estocolmo."
  },
  fr: {
    "title": "Application pour signaler animaux perdus et trouvés — Fonctions d'Orma",
    "metaDesc": "Application pour animaux perdus : carte respectueuse de la vie privée, alertes près de chez vous, messagerie sécurisée, correspondance par puce et adoptions vérifiées.",
    "eyebrow": "Fonctionnalités",
    "h1": "Tout ce qu'il faut, rien de superflu",
    "lead": "Nous avons retiré tout ce qui n'était pas nécessaire. Ce qui reste, ce sont des outils essentiels, chacun pensé pour un moment précis de la recherche — et chacun avec la confidentialité comme réglage par défaut, non comme arrière-pensée.",
    "privacyTitle": "La confidentialité n'est pas une fonctionnalité : c'est le point de départ",
    "privacyText": "Vos données ne sont pas vendues. La position sur la carte publique est toujours floutée d'environ 150 mètres. Les serveurs qui hébergent les données se trouvent dans l'Union européenne, à Stockholm."
  },
  de: {
    "title": "App zum Melden vermisster und gefundener Tiere — Funktionen von Orma",
    "metaDesc": "App für vermisste Tiere: Karte mit Datenschutz, Benachrichtigungen in deiner Nähe, sicherer Chat, Abgleich über den Mikrochip und geprüfte Vermittlung.",
    "eyebrow": "Funktionen",
    "h1": "Alles, was nötig ist — und nichts darüber hinaus",
    "lead": "Wir haben alles weggelassen, was nicht gebraucht wurde. Übrig bleiben grundlegende Werkzeuge, jedes für einen bestimmten Moment der Suche gedacht — und jedes mit Datenschutz als Voreinstellung, nicht als nachträglichem Einfall.",
    "privacyTitle": "Datenschutz ist keine Funktion: Er ist der Ausgangspunkt",
    "privacyText": "Deine Daten werden nicht verkauft. Der Standort auf der öffentlichen Karte ist immer um etwa 150 Meter unscharf gemacht. Die Server mit den Daten stehen in der Europäischen Union, in Stockholm."
  },
  pt: {
    "title": "Aplicação para animais perdidos e encontrados — Funções da Orma",
    "metaDesc": "Aplicação para animais perdidos: mapa com privacidade, alertas perto de ti, chat seguro, correspondência por microchip e adoções verificadas.",
    "eyebrow": "Funcionalidades",
    "h1": "Tudo o que é preciso, nada a mais",
    "lead": "Cortámos tudo o que não era necessário. O que resta são ferramentas essenciais, cada uma pensada para um momento preciso da busca — e cada uma com a privacidade como definição predefinida, não como reflexão tardia.",
    "privacyTitle": "A privacidade não é uma funcionalidade: é o ponto de partida",
    "privacyText": "Os teus dados não são vendidos. A posição no mapa público está sempre desfocada em cerca de 150 metros. Os servidores com os dados estão na União Europeia, em Estocolmo."
  },
  ro: {
    "title": "Aplicație pentru animale pierdute și găsite — Funcțiile Orma",
    "metaDesc": "Aplicație pentru animale pierdute: hartă care respectă confidențialitatea, alerte în apropierea ta, chat sigur, potrivire după microcip și adopții verificate.",
    "eyebrow": "Funcții",
    "h1": "Tot ce trebuie, nimic în plus",
    "lead": "Am tăiat tot ce nu era necesar. Ce rămâne sunt instrumente esențiale, fiecare gândit pentru un moment precis al căutării — și fiecare cu confidențialitatea ca setare implicită, nu ca gând de pe urmă.",
    "privacyTitle": "Confidențialitatea nu este o funcție: este punctul de plecare",
    "privacyText": "Datele tale nu sunt vândute. Poziția de pe harta publică este întotdeauna estompată cu aproximativ 150 de metri. Serverele cu datele se află în Uniunea Europeană, la Stockholm."
  },
  it: {
    title: 'App per segnalare animali smarriti e trovati — Funzioni di Orma',
    metaDesc: 'App per animali smarriti: mappa con privacy, avvisi vicino a te, chat sicura, corrispondenza microchip e adozioni verificate.',
    eyebrow: 'Funzionalità',
    h1: 'Tutto quello che serve, niente di superfluo',
    lead: "Abbiamo tagliato tutto ciò che non serviva. Quello che resta sono strumenti essenziali, ognuno pensato per un momento preciso della ricerca — e ognuno con la privacy come impostazione predefinita, non come ripensamento.",
    privacyTitle: 'La privacy non è una funzione: è il punto di partenza',
    privacyText: 'I tuoi dati non vengono venduti. La posizione sulla mappa pubblica è sempre offuscata di circa 150 metri. I server dei dati sono in Unione Europea, a Stoccolma.',
  },
  en: {
    title: 'App to report lost & found pets — Orma features',
    metaDesc: 'Lost pet app: privacy-first map, alerts near you, secure chat, microchip matches and verified adoptions.',
    eyebrow: 'Features',
    h1: "Everything you need, nothing you don't",
    lead: 'We cut everything that did not belong. What remains are essential tools, each made for a precise moment in the search — and each with privacy as the default, not an afterthought.',
    privacyTitle: 'Privacy is not a feature: it is the starting point',
    privacyText: 'Your data is never sold. The location on the public map is always blurred by about 150 metres. Data servers are in the European Union, in Stockholm.',
  },
};

// ----------------------------------------------------------------------------
// /pet — stringhe UI della landing del QR (il rendering della scheda è client-side).
// ----------------------------------------------------------------------------
export const PET = {
  es: {
    "title": "Orma — Aviso",
    "loading": "Estoy cargando el aviso…",
    "noidTitle": "Aviso no indicado",
    "noidText": "Este enlace se abre escaneando el QR de un cartel de Orma. Falta la referencia al aviso.",
    "notfoundTitle": "Aviso no encontrado",
    "notfoundText": "Este aviso ya no existe o se ha cerrado. Los avisos de Orma caducan y se archivan a los 90 días.",
    "errorTitle": "Algo ha salido mal",
    "errorText": "No hemos podido cargar el aviso. Comprueba la conexión y vuelve a intentarlo.",
    "retry": "Reintentar",
    "discover": "Descubre Orma",
    "locationNote": "Para proteger la privacidad, la posición que se muestra es la zona aproximada (difuminada unos 150 metros), no la dirección exacta.",
    "appBoxTitle": "¿Has visto a este animal?",
    "appBoxText": "Abre el aviso en Orma para escribir a quien lo ha publicado en el chat seguro y comunicar un avistamiento. La app llega pronto: mientras tanto puedes descubrir cómo funciona.",
    "locale": "es-ES"
  },
  fr: {
    "title": "Orma — Signalement",
    "loading": "Chargement du signalement…",
    "noidTitle": "Signalement non précisé",
    "noidText": "Ce lien s'ouvre en scannant le QR code d'une affiche Orma. La référence au signalement est manquante.",
    "notfoundTitle": "Signalement introuvable",
    "notfoundText": "Ce signalement n'existe plus ou a été clôturé. Les signalements sur Orma expirent et sont archivés au bout de 90 jours.",
    "errorTitle": "Quelque chose s'est mal passé",
    "errorText": "Nous n'avons pas réussi à charger le signalement. Vérifiez la connexion et réessayez.",
    "retry": "Réessayer",
    "discover": "Découvrir Orma",
    "locationNote": "Pour protéger la vie privée, la position affichée est la zone approximative (floutée d'environ 150 mètres), pas l'adresse exacte.",
    "appBoxTitle": "Vous avez vu cet animal ?",
    "appBoxText": "Ouvrez le signalement dans Orma pour écrire à la personne qui l'a publié, dans la messagerie sécurisée, et signaler une observation. L'application arrive bientôt : en attendant, vous pouvez découvrir comment elle fonctionne.",
    "locale": "fr-FR"
  },
  de: {
    "title": "Orma — Meldung",
    "loading": "Meldung wird geladen…",
    "noidTitle": "Meldung nicht angegeben",
    "noidText": "Dieser Link öffnet sich, indem du den QR-Code eines Orma-Aushangs scannst. Der Verweis auf die Meldung fehlt.",
    "notfoundTitle": "Meldung nicht gefunden",
    "notfoundText": "Diese Meldung gibt es nicht mehr oder sie wurde geschlossen. Meldungen auf Orma laufen ab und werden nach 90 Tagen archiviert.",
    "errorTitle": "Etwas ist schiefgelaufen",
    "errorText": "Wir konnten die Meldung nicht laden. Prüfe die Verbindung und versuche es erneut.",
    "retry": "Erneut versuchen",
    "discover": "Orma entdecken",
    "locationNote": "Zum Schutz der Privatsphäre wird die ungefähre Gegend angezeigt (um etwa 150 Meter unscharf gemacht), nicht die genaue Adresse.",
    "appBoxTitle": "Hast du dieses Tier gesehen?",
    "appBoxText": "Öffne die Meldung in Orma, um der Person, die sie veröffentlicht hat, im sicheren Chat zu schreiben und eine Sichtung zu melden. Die App kommt bald: Bis dahin kannst du entdecken, wie sie funktioniert.",
    "locale": "de-DE"
  },
  pt: {
    "title": "Orma — Alerta",
    "loading": "A carregar o alerta…",
    "noidTitle": "Alerta não especificado",
    "noidText": "Esta ligação abre-se digitalizando o código QR de um cartaz Orma. Falta a referência ao alerta.",
    "notfoundTitle": "Alerta não encontrado",
    "notfoundText": "Este alerta já não existe ou foi encerrado. Os alertas na Orma expiram e são arquivados ao fim de 90 dias.",
    "errorTitle": "Algo correu mal",
    "errorText": "Não conseguimos carregar o alerta. Verifica a ligação e tenta novamente.",
    "retry": "Tentar novamente",
    "discover": "Descobrir a Orma",
    "locationNote": "Para proteger a privacidade, a posição mostrada é a zona aproximada (desfocada em cerca de 150 metros), não a morada exata.",
    "appBoxTitle": "Viste este animal?",
    "appBoxText": "Abre o alerta na Orma para escrever a quem o publicou, no chat seguro, e comunicar um avistamento. A aplicação chega em breve: entretanto podes descobrir como funciona.",
    "locale": "pt-PT"
  },
  ro: {
    "title": "Orma — Anunț",
    "loading": "Se încarcă anunțul…",
    "noidTitle": "Anunț nespecificat",
    "noidText": "Acest link se deschide scanând codul QR de pe un afiș Orma. Lipsește referința către anunț.",
    "notfoundTitle": "Anunțul nu a fost găsit",
    "notfoundText": "Acest anunț nu mai există sau a fost închis. Anunțurile de pe Orma expiră și sunt arhivate după 90 de zile.",
    "errorTitle": "Ceva nu a mers bine",
    "errorText": "Nu am reușit să încărcăm anunțul. Verifică conexiunea și încearcă din nou.",
    "retry": "Încearcă din nou",
    "discover": "Descoperă Orma",
    "locationNote": "Pentru a proteja confidențialitatea, poziția afișată este zona aproximativă (estompată cu aproximativ 150 de metri), nu adresa exactă.",
    "appBoxTitle": "Ai văzut acest animal?",
    "appBoxText": "Deschide anunțul în Orma ca să îi scrii celui care l-a publicat, în chatul sigur, și să raportezi o semnalare. Aplicația vine în curând: până atunci poți descoperi cum funcționează.",
    "locale": "ro-RO"
  },
  it: {
    title: 'Orma — Segnalazione',
    loading: 'Sto caricando la segnalazione…',
    noidTitle: 'Segnalazione non specificata',
    noidText: 'Questo link va aperto scansionando il QR di un volantino Orma. Manca il riferimento alla segnalazione.',
    notfoundTitle: 'Segnalazione non trovata',
    notfoundText: 'Questa segnalazione non esiste più o è stata chiusa. Le segnalazioni su Orma scadono e vengono archiviate dopo 90 giorni.',
    errorTitle: 'Qualcosa è andato storto',
    errorText: 'Non siamo riusciti a caricare la segnalazione. Controlla la connessione e riprova.',
    retry: 'Riprova',
    discover: 'Scopri Orma',
    locationNote: "Per proteggere la privacy, la posizione mostrata è la zona approssimativa (offuscata di circa 150 metri), non l'indirizzo esatto.",
    appBoxTitle: 'Hai visto questo animale?',
    appBoxText: "Apri la segnalazione in Orma per scrivere a chi l'ha pubblicata nella chat sicura e segnalare un avvistamento. L'app arriva presto: intanto puoi scoprire come funziona.",
    locale: 'it-IT',
  },
  en: {
    title: 'Orma — Report',
    loading: 'Loading the report…',
    noidTitle: 'No report specified',
    noidText: 'This link is meant to be opened by scanning the QR code on an Orma flyer. The report reference is missing.',
    notfoundTitle: 'Report not found',
    notfoundText: 'This report no longer exists or has been closed. Reports on Orma expire and are archived after 90 days.',
    errorTitle: 'Something went wrong',
    errorText: "We couldn't load the report. Check your connection and try again.",
    retry: 'Try again',
    discover: 'Discover Orma',
    locationNote: 'To protect privacy, the location shown is the approximate area (blurred by about 150 metres), not the exact address.',
    appBoxTitle: 'Have you seen this animal?',
    appBoxText: 'Open this report in Orma to message whoever posted it in the secure chat and report a sighting. The app is coming soon — in the meantime, see how it works.',
    locale: 'en-GB',
  },
};
