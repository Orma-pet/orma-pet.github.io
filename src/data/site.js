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
  "home": {
    "it": "/",
    "en": "/en/"
  },
  "howItWorks": {
    "it": "/come-funziona/",
    "en": "/en/how-it-works/"
  },
  "features": {
    "it": "/funzionalita/",
    "en": "/en/features/"
  },
  "privacy": {
    "it": "/privacy/",
    "en": "/en/privacy/"
  },
  "terms": {
    "it": "/termini/",
    "en": "/en/terms/"
  },
  "deletion": {
    "it": "/cancellazione/",
    "en": "/en/account-deletion/"
  },
  "guides": {
    "it": "/guida/",
    "en": "/en/guides/"
  },
  "map": {
    "it": "/mappa/",
    "en": "/en/map/"
  },
  "faq": {
    "it": "/faq/",
    "en": "/en/faq/"
  },
  "forOrgs": {
    "it": "/per-strutture/",
    "en": "/en/for-organizations/"
  },
  "childSafety": {
    "it": "/sicurezza-minori/",
    "en": "/en/child-safety/"
  },
  "pet": {
    "it": "/pet/",
    "en": "/en/pet/"
  }
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
  { code: 'cs', name: 'Čeština',    base: '/cs', pronta: true  },
  { code: 'da', name: 'Dansk',      base: '/da', pronta: true  },
  { code: 'de', name: 'Deutsch',    base: '/de', pronta: true  },
  { code: 'el', name: 'Ελληνικά',   base: '/el', pronta: true  },
  { code: 'es', name: 'Español',    base: '/es', pronta: true  },
  { code: 'et', name: 'Eesti',      base: '/et', pronta: false },
  { code: 'fi', name: 'Suomi',      base: '/fi', pronta: false },
  { code: 'fr', name: 'Français',   base: '/fr', pronta: true  },
  { code: 'ga', name: 'Gaeilge',    base: '/ga', pronta: false },
  { code: 'hr', name: 'Hrvatski',   base: '/hr', pronta: true  },
  { code: 'hu', name: 'Magyar',     base: '/hu', pronta: true  },
  { code: 'lt', name: 'Lietuvių',   base: '/lt', pronta: false },
  { code: 'lv', name: 'Latviešu',   base: '/lv', pronta: false },
  { code: 'mt', name: 'Malti',      base: '/mt', pronta: false },
  { code: 'nl', name: 'Nederlands', base: '/nl', pronta: true  },
  { code: 'pl', name: 'Polski',     base: '/pl', pronta: true  },
  { code: 'pt', name: 'Português',  base: '/pt', pronta: true  },
  { code: 'ro', name: 'Română',     base: '/ro', pronta: true  },
  { code: 'sk', name: 'Slovenčina', base: '/sk', pronta: false },
  { code: 'sl', name: 'Slovenščina',base: '/sl', pronta: false },
  { code: 'sv', name: 'Svenska',    base: '/sv', pronta: true  },
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
  "es": [
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
  "fr": [
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
  "de": [
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
  "pt": [
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
  "ro": [
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
  "it": [
    {
      "key": "howItWorks",
      "label": "Come funziona"
    },
    {
      "key": "features",
      "label": "Funzionalità"
    },
    {
      "key": "map",
      "label": "Mappa"
    },
    {
      "key": "guides",
      "label": "Guide"
    }
  ],
  "en": [
    {
      "key": "howItWorks",
      "label": "How it works"
    },
    {
      "key": "features",
      "label": "Features"
    },
    {
      "key": "map",
      "label": "Map"
    },
    {
      "key": "guides",
      "label": "Guides"
    }
  ],
  "cs": [
    {
      "key": "howItWorks",
      "label": "Jak to funguje"
    },
    {
      "key": "features",
      "label": "Funkce"
    },
    {
      "key": "map",
      "label": "Mapa"
    },
    {
      "key": "guides",
      "label": "Rady"
    }
  ],
  "da": [
    {
      "key": "howItWorks",
      "label": "Sådan virker det"
    },
    {
      "key": "features",
      "label": "Funktioner"
    },
    {
      "key": "map",
      "label": "Kort"
    },
    {
      "key": "guides",
      "label": "Guider"
    }
  ],
  "el": [
    {
      "key": "howItWorks",
      "label": "Πώς λειτουργεί"
    },
    {
      "key": "features",
      "label": "Λειτουργίες"
    },
    {
      "key": "map",
      "label": "Χάρτης"
    },
    {
      "key": "guides",
      "label": "Οδηγοί"
    }
  ],
  "hr": [
    {
      "key": "howItWorks",
      "label": "Kako radi"
    },
    {
      "key": "features",
      "label": "Mogućnosti"
    },
    {
      "key": "map",
      "label": "Karta"
    },
    {
      "key": "guides",
      "label": "Vodiči"
    }
  ],
  "hu": [
    {
      "key": "howItWorks",
      "label": "Hogyan működik"
    },
    {
      "key": "features",
      "label": "Funkciók"
    },
    {
      "key": "map",
      "label": "Térkép"
    },
    {
      "key": "guides",
      "label": "Útmutatók"
    }
  ],
  "nl": [
    {
      "key": "howItWorks",
      "label": "Hoe het werkt"
    },
    {
      "key": "features",
      "label": "Functies"
    },
    {
      "key": "map",
      "label": "Kaart"
    },
    {
      "key": "guides",
      "label": "Gidsen"
    }
  ],
  "pl": [
    {
      "key": "howItWorks",
      "label": "Jak to działa"
    },
    {
      "key": "features",
      "label": "Funkcje"
    },
    {
      "key": "map",
      "label": "Mapa"
    },
    {
      "key": "guides",
      "label": "Poradniki"
    }
  ],
  "sv": [
    {
      "key": "howItWorks",
      "label": "Så fungerar det"
    },
    {
      "key": "features",
      "label": "Funktioner"
    },
    {
      "key": "map",
      "label": "Karta"
    },
    {
      "key": "guides",
      "label": "Guider"
    }
  ]
};

export const UI = {
  "es": {
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
  "fr": {
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
  "de": {
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
  "pt": {
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
  "ro": {
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
  "it": {
    "skipToContent": "Vai al contenuto",
    "langGroupLabel": "Lingua",
    "navCta": "Scarica l'app",
    "footerLinks": {
      "faq": "FAQ",
      "forOrgs": "Per veterinari e canili",
      "childSafety": "Sicurezza dei minori",
      "privacy": "Privacy",
      "terms": "Termini",
      "deletion": "Cancellazione account",
      "contact": "Contatti"
    },
    "footerTagline": "Orma — Ritrova il tuo amico. Fatto con cura, in Italia.",
    "footerColophon": "Versione editoriale del sito · 2026",
    "storeSoon": "Presto su",
    "backHome": "Torna alla home",
    "allGuides": "Tutte le guide",
    "faqTitle": "Domande frequenti",
    "homeGuidesTitle": "Guide utili",
    "homeGuidesLead": "Cosa fare quando conta: hai perso o trovato un animale? Qui trovi i passi giusti.",
    "guidesHubTitle": "Guide per animali smarriti e trovati",
    "guidesHubLead": "Consigli pratici per i momenti che contano: cosa fare se hai perso o trovato un animale, il microchip, le adozioni.",
    "guideCtaTitle": "Segnala su Orma",
    "guideCtaText": "Con Orma avvisi le persone vicine, ricevi avvistamenti con foto e ritrovi il tuo amico più in fretta."
  },
  "en": {
    "skipToContent": "Skip to content",
    "langGroupLabel": "Language",
    "navCta": "Get the app",
    "footerLinks": {
      "faq": "FAQ",
      "forOrgs": "For vets & shelters",
      "childSafety": "Child safety",
      "privacy": "Privacy",
      "terms": "Terms",
      "deletion": "Account deletion",
      "contact": "Contact"
    },
    "footerTagline": "Orma — Find your friend. Made with care, in Italy.",
    "footerColophon": "Editorial edition of the website · 2026",
    "storeSoon": "Coming soon to",
    "backHome": "Back to home",
    "allGuides": "All guides",
    "faqTitle": "Frequently asked questions",
    "homeGuidesTitle": "Helpful guides",
    "homeGuidesLead": "When it matters: have you lost or found an animal? Here are the right steps.",
    "guidesHubTitle": "Guides for lost & found pets",
    "guidesHubLead": "Practical advice for the moments that matter: what to do if you've lost or found a pet, microchips, adoptions.",
    "guideCtaTitle": "Post on Orma",
    "guideCtaText": "With Orma you alert people nearby, get sightings with photos and find your friend faster."
  },
  "cs": {
    "skipToContent": "Přejít na obsah",
    "langGroupLabel": "Jazyk",
    "navCta": "Stáhnout aplikaci",
    "footerLinks": {
      "faq": "Časté dotazy",
      "forOrgs": "Pro veterináře a útulky",
      "childSafety": "Bezpečnost dětí",
      "privacy": "Soukromí",
      "terms": "Podmínky",
      "deletion": "Smazání účtu",
      "contact": "Kontakt"
    },
    "footerTagline": "Orma — Najdi svého kamaráda. Vyrobeno s péčí, v Itálii.",
    "footerColophon": "Redakční verze webu · 2026",
    "storeSoon": "Brzy na",
    "backHome": "Zpět na úvod",
    "allGuides": "Všechny rady",
    "faqTitle": "Časté dotazy",
    "homeGuidesTitle": "Užitečné rady",
    "homeGuidesLead": "Co dělat, když na tom záleží: ztratilo se ti zvíře, nebo jsi nějaké našel? Tady najdeš správné kroky.",
    "guidesHubTitle": "Rady pro ztracená a nalezená zvířata",
    "guidesHubLead": "Praktické rady pro chvíle, kdy na tom záleží: co dělat, když se ti ztratilo zvíře nebo jsi nějaké našel, mikročip, adopce.",
    "guideCtaTitle": "Nahlas to v aplikaci Orma",
    "guideCtaText": "S aplikací Orma upozorníš lidi ve svém okolí, dostaneš hlášení o spatření i s fotkou a najdeš svého kamaráda rychleji."
  },
  "da": {
    "skipToContent": "Gå til indhold",
    "langGroupLabel": "Sprog",
    "navCta": "Hent appen",
    "footerLinks": {
      "faq": "FAQ",
      "forOrgs": "For dyrlæger og internater",
      "childSafety": "Børns sikkerhed",
      "privacy": "Privatliv",
      "terms": "Vilkår",
      "deletion": "Slet konto",
      "contact": "Kontakt"
    },
    "footerTagline": "Orma — Find din ven. Lavet med omhu, i Italien.",
    "footerColophon": "Redaktionel udgave af websitet · 2026",
    "storeSoon": "Snart i",
    "backHome": "Tilbage til forsiden",
    "allGuides": "Alle guider",
    "faqTitle": "Ofte stillede spørgsmål",
    "homeGuidesTitle": "Nyttige guider",
    "homeGuidesLead": "Hvad du gør, når det gælder: har du mistet eller fundet et dyr? Her er de rigtige skridt.",
    "guidesHubTitle": "Guider til savnede og fundne kæledyr",
    "guidesHubLead": "Praktiske råd til de øjeblikke, der tæller: hvad du gør, hvis du har mistet eller fundet et dyr, mikrochippen og adoptionerne.",
    "guideCtaTitle": "Efterlys på Orma",
    "guideCtaText": "Med Orma giver du besked til folk i nærheden, får observationer med billeder og finder din ven hurtigere."
  },
  "el": {
    "skipToContent": "Μετάβαση στο περιεχόμενο",
    "langGroupLabel": "Γλώσσα",
    "navCta": "Κατέβασε την εφαρμογή",
    "footerLinks": {
      "faq": "Συχνές ερωτήσεις",
      "forOrgs": "Για κτηνιάτρους και καταφύγια",
      "childSafety": "Ασφάλεια ανηλίκων",
      "privacy": "Απόρρητο",
      "terms": "Όροι χρήσης",
      "deletion": "Διαγραφή λογαριασμού",
      "contact": "Επικοινωνία"
    },
    "footerTagline": "Orma — Βρες ξανά τον φίλο σου. Φτιαγμένο με φροντίδα, στην Ιταλία.",
    "footerColophon": "Συντακτική έκδοση του ιστότοπου · 2026",
    "storeSoon": "Σύντομα στο",
    "backHome": "Επιστροφή στην αρχική",
    "allGuides": "Όλοι οι οδηγοί",
    "faqTitle": "Συχνές ερωτήσεις",
    "homeGuidesTitle": "Χρήσιμοι οδηγοί",
    "homeGuidesLead": "Τι να κάνεις όταν μετράει: έχασες ή βρήκες ένα ζώο; Εδώ θα βρεις τα σωστά βήματα.",
    "guidesHubTitle": "Οδηγοί για χαμένα ζώα και ζώα που βρέθηκαν",
    "guidesHubLead": "Πρακτικές συμβουλές για τις στιγμές που μετράνε: τι να κάνεις αν έχασες ή βρήκες ένα ζώο, το μικροτσίπ, οι υιοθεσίες.",
    "guideCtaTitle": "Δήλωσέ το στο Orma",
    "guideCtaText": "Με το Orma ειδοποιείς τους ανθρώπους που είναι κοντά, δέχεσαι εντοπισμούς με φωτογραφίες και βρίσκεις τον φίλο σου πιο γρήγορα."
  },
  "hr": {
    "skipToContent": "Prijeđi na sadržaj",
    "langGroupLabel": "Jezik",
    "navCta": "Preuzmi aplikaciju",
    "footerLinks": {
      "faq": "Česta pitanja",
      "forOrgs": "Za veterinare i skloništa",
      "childSafety": "Sigurnost djece",
      "privacy": "Privatnost",
      "terms": "Uvjeti",
      "deletion": "Brisanje računa",
      "contact": "Kontakt"
    },
    "footerTagline": "Orma — Pronađi svog prijatelja. Napravljeno s pažnjom, u Italiji.",
    "footerColophon": "Uredničko izdanje stranice · 2026",
    "storeSoon": "Uskoro na",
    "backHome": "Natrag na početnu",
    "allGuides": "Svi vodiči",
    "faqTitle": "Česta pitanja",
    "homeGuidesTitle": "Korisni vodiči",
    "homeGuidesLead": "Kad je najvažnije: izgubio si ili pronašao životinju? Ovdje su pravi koraci.",
    "guidesHubTitle": "Vodiči za izgubljene i pronađene ljubimce",
    "guidesHubLead": "Praktični savjeti za trenutke koji su važni: što učiniti ako si izgubio ili pronašao životinju, mikročip, udomljavanje.",
    "guideCtaTitle": "Prijavi na Ormi",
    "guideCtaText": "S Ormom obavještavaš ljude u blizini, primaš dojave s fotografijom i brže pronalaziš svog prijatelja."
  },
  "hu": {
    "skipToContent": "Ugrás a tartalomra",
    "langGroupLabel": "Nyelv",
    "navCta": "Töltsd le az appot",
    "footerLinks": {
      "faq": "GYIK",
      "forOrgs": "Állatorvosoknak és menhelyeknek",
      "childSafety": "Gyermekvédelem",
      "privacy": "Adatvédelem",
      "terms": "Felhasználási feltételek",
      "deletion": "Fiók törlése",
      "contact": "Kapcsolat"
    },
    "footerTagline": "Orma — Találd meg a barátodat. Gondosan készült, Olaszországban.",
    "footerColophon": "A weboldal szerkesztői változata · 2026",
    "storeSoon": "Hamarosan itt:",
    "backHome": "Vissza a főoldalra",
    "allGuides": "Összes útmutató",
    "faqTitle": "Gyakori kérdések",
    "homeGuidesTitle": "Hasznos útmutatók",
    "homeGuidesLead": "Amikor számít: elveszett vagy találtál egy állatot? Itt megtalálod a helyes lépéseket.",
    "guidesHubTitle": "Útmutatók elveszett és megtalált állatokhoz",
    "guidesHubLead": "Gyakorlati tanácsok a döntő pillanatokra: mit tegyél, ha elveszett vagy találtál egy állatot, a mikrochip, az örökbefogadás.",
    "guideCtaTitle": "Tedd közzé az Ormán",
    "guideCtaText": "Az Ormával értesíted a közeledben lakókat, fotós észleléseket kapsz, és gyorsabban találod meg a barátodat."
  },
  "nl": {
    "skipToContent": "Naar de inhoud",
    "langGroupLabel": "Taal",
    "navCta": "Download de app",
    "footerLinks": {
      "faq": "Veelgestelde vragen",
      "forOrgs": "Voor dierenartsen en asielen",
      "childSafety": "Kinderveiligheid",
      "privacy": "Privacy",
      "terms": "Voorwaarden",
      "deletion": "Account verwijderen",
      "contact": "Contact"
    },
    "footerTagline": "Orma — Vind je vriend terug. Met zorg gemaakt, in Italië.",
    "footerColophon": "Redactionele versie van de website · 2026",
    "storeSoon": "Binnenkort in de",
    "backHome": "Terug naar de homepage",
    "allGuides": "Alle gidsen",
    "faqTitle": "Veelgestelde vragen",
    "homeGuidesTitle": "Handige gidsen",
    "homeGuidesLead": "Wat je moet doen als het erop aankomt: ben je een dier kwijt of heb je er een gevonden? Hier staan de juiste stappen.",
    "guidesHubTitle": "Gidsen voor vermiste en gevonden dieren",
    "guidesHubLead": "Praktisch advies voor de momenten die tellen: wat je doet als je een dier kwijt bent of gevonden hebt, de chip, adoptie.",
    "guideCtaTitle": "Meld het op Orma",
    "guideCtaText": "Met Orma waarschuw je de mensen in de buurt, ontvang je waarnemingen met foto's en vind je je vriend sneller terug."
  },
  "pl": {
    "skipToContent": "Przejdź do treści",
    "langGroupLabel": "Język",
    "navCta": "Pobierz aplikację",
    "footerLinks": {
      "faq": "FAQ",
      "forOrgs": "Dla weterynarzy i schronisk",
      "childSafety": "Bezpieczeństwo dzieci",
      "privacy": "Prywatność",
      "terms": "Regulamin",
      "deletion": "Usunięcie konta",
      "contact": "Kontakt"
    },
    "footerTagline": "Orma — Odnajdź swojego przyjaciela. Zrobione z troską, we Włoszech.",
    "footerColophon": "Wersja redakcyjna strony · 2026",
    "storeSoon": "Wkrótce w",
    "backHome": "Wróć na stronę główną",
    "allGuides": "Wszystkie poradniki",
    "faqTitle": "Najczęstsze pytania",
    "homeGuidesTitle": "Przydatne poradniki",
    "homeGuidesLead": "Co robić, kiedy liczy się każda minuta: zgubiłeś albo znalazłeś zwierzę? Tutaj znajdziesz właściwe kroki.",
    "guidesHubTitle": "Poradniki o zaginionych i znalezionych zwierzętach",
    "guidesHubLead": "Praktyczne rady na chwile, które się liczą: co robić, gdy zwierzak zaginął albo gdy jakiegoś znalazłeś, mikroczip, adopcje.",
    "guideCtaTitle": "Dodaj zgłoszenie w aplikacji Orma",
    "guideCtaText": "Z aplikacją Orma powiadamiasz osoby w pobliżu, dostajesz zgłoszenia ze zdjęciami i szybciej odnajdujesz przyjaciela."
  },
  "sv": {
    "skipToContent": "Hoppa till innehållet",
    "langGroupLabel": "Språk",
    "navCta": "Ladda ner appen",
    "footerLinks": {
      "faq": "Vanliga frågor",
      "forOrgs": "För veterinärer och djurhem",
      "childSafety": "Barns säkerhet",
      "privacy": "Integritet",
      "terms": "Villkor",
      "deletion": "Radera konto",
      "contact": "Kontakt"
    },
    "footerTagline": "Orma — Hitta din vän. Gjort med omsorg, i Italien.",
    "footerColophon": "Redaktionell version av webbplatsen · 2026",
    "storeSoon": "Snart på",
    "backHome": "Tillbaka till startsidan",
    "allGuides": "Alla guider",
    "faqTitle": "Vanliga frågor",
    "homeGuidesTitle": "Nyttiga guider",
    "homeGuidesLead": "Vad du gör när det gäller: har din vän sprungit bort, eller har du hittat ett djur? Här är stegen som fungerar.",
    "guidesHubTitle": "Guider för bortsprungna och upphittade djur",
    "guidesHubLead": "Praktiska råd för stunderna som räknas: vad du gör om du har tappat bort eller hittat ett djur, om id-märkning och om adoption.",
    "guideCtaTitle": "Anmäl på Orma",
    "guideCtaText": "Med Orma varnar du människorna i närheten, får observationer med foto och hittar din vän snabbare."
  }
};

// ----------------------------------------------------------------------------
// HOMEPAGE — testi (dalle stringhe fornite, adattate al taglio editoriale).
// ----------------------------------------------------------------------------
export const HOME = {
  "es": {
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
  "fr": {
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
  "de": {
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
  "pt": {
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
  "ro": {
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
  "it": {
    "title": "Orma — App per animali smarriti | Ritrova il tuo amico",
    "metaDesc": "App per segnalare e ritrovare cani e gatti smarriti: avvisi alle persone vicine, avvistamenti con foto, corrispondenza microchip. Privacy al primo posto.",
    "heroEyebrow": "App per animali smarriti, trovati e da adottare",
    "heroTitle": "Ritrova il tuo amico",
    "heroSub": "Orma collega chi ha perso un animale con chi lo ha avvistato o trovato. Segnali in pochi tap, ricevi avvisi quando qualcosa si muove vicino a te e tieni i contatti al sicuro nella chat dell'app.",
    "heroCta1": "Scarica Orma",
    "heroCta2": "Scopri come funziona",
    "heroProof": "Una community che si dà una zampa, città per città.",
    "trust": [
      "Dati in Europa",
      "Privacy by design",
      "Made in Italy"
    ],
    "animalsTitle": "Orma è per ogni animale",
    "animalsSub": "Cani e gatti, certo, ma anche conigli, uccelli, roditori e tutti gli altri. Se qualcuno gli vuole bene, qui ha un posto: smarrito, trovato, abbandonato o in cerca di una famiglia.",
    "animals": [
      {
        "key": "dog",
        "label": "Cani"
      },
      {
        "key": "cat",
        "label": "Gatti"
      },
      {
        "key": "rabbit",
        "label": "Conigli"
      },
      {
        "key": "bird",
        "label": "Uccelli"
      },
      {
        "key": "rodent",
        "label": "Roditori"
      },
      {
        "key": "reptile",
        "label": "Rettili"
      },
      {
        "key": "horse",
        "label": "Cavalli"
      },
      {
        "key": "more",
        "label": "e altri"
      }
    ],
    "stepsEyebrow": "Come funziona",
    "stepsTitle": "Tre passi verso casa",
    "steps": [
      {
        "t": "Segnala",
        "x": "Hai perso il tuo animale? Crea una segnalazione con foto, descrizione e ultima posizione conosciuta. In pochi secondi la vede la community della tua zona."
      },
      {
        "t": "Avvista",
        "x": "Hai visto un animale che sembra smarrito o ne hai trovato uno? Pubblica un avvistamento con una foto e il punto in cui era. Anche una sola segnalazione può fare la differenza."
      },
      {
        "t": "Ritrova",
        "x": "Orma ti avvisa quando una segnalazione vicina potrebbe corrispondere. Scrivi nella chat sicura, verificate i dettagli e organizzate il ritorno a casa."
      }
    ],
    "stepsCta": "Leggi la storia per intero",
    "featEyebrow": "Funzionalità",
    "featTitle": "Tutto quello che serve, niente di superfluo",
    "featLead": "Strumenti essenziali, progettati intorno alla privacy e alla velocità. Niente fronzoli: solo ciò che aiuta un animale a tornare a casa.",
    "feats": [
      {
        "t": "Segnala smarrito, trovato o abbandonato",
        "x": "Crea in pochi tap una segnalazione di animale smarrito, trovato o abbandonato, con foto, descrizione e ultima posizione. La segnalazione resta attiva 90 giorni, poi viene archiviata automaticamente."
      },
      {
        "t": "Mappa con privacy",
        "x": "Vedi smarrimenti e avvistamenti intorno a te su una mappa. Per proteggere chi segnala, sulla mappa pubblica la posizione è offuscata di circa 150 metri: aiuti senza rivelare indirizzi esatti."
      },
      {
        "t": "Avvisi vicino a te",
        "x": "Attiva le notifiche e ricevi un avviso quando qualcuno pubblica una segnalazione nella tua zona. I primi minuti contano, e tu li sai già."
      },
      {
        "t": "Avvistamenti con foto",
        "x": "Hai visto un animale che sembra smarrito? Pubblica un avvistamento con foto e luogo: chi cerca riconosce subito il proprio animale, anche da una sola segnalazione."
      },
      {
        "t": "Possibili corrispondenze e microchip",
        "x": "Orma confronta smarriti e trovati e ti suggerisce le possibili corrispondenze — \"è forse il tuo?\". Se è disponibile il numero di microchip, il collegamento è ancora più preciso."
      },
      {
        "t": "Chat sicura",
        "x": "Mettiti in contatto con chi ha pubblicato una segnalazione direttamente nell'app, senza scambiare numero di telefono o email finché non lo decidi tu."
      },
      {
        "t": "Volantino PDF con QR",
        "x": "Genera in un tocco un volantino in PDF pronto da stampare, con il QR della segnalazione. Chi lo trova scansiona il codice e apre la scheda aggiornata dell'animale."
      },
      {
        "t": "Adozioni da rifugi verificati",
        "x": "Sfoglia gli animali in cerca di casa nei canili e rifugi verificati da Orma. Controlliamo le strutture al meglio per darti riferimenti più affidabili quando scegli di adottare."
      },
      {
        "t": "Tag QR e collare digitale",
        "x": "Applica un tag Orma al collare del tuo animale. Chi lo trova lo scansiona e apre subito la sua scheda per avvisarti — senza che tu debba rivelare telefono o indirizzo."
      },
      {
        "t": "Libretto sanitario digitale",
        "x": "Tieni con te vaccinazioni, peso e promemoria del tuo animale: un libretto digitale semplice, utile ogni giorno e non solo nell'emergenza."
      },
      {
        "t": "Veterinari e canili sulla mappa",
        "x": "Trova le strutture intorno a te, scopri chi è aperto in emergenza h24 e dove portare un animale trovato. Dalle strutture veterinarie puoi anche chiedere un appuntamento."
      },
      {
        "t": "Modalità cercatore",
        "x": "Attiva la modalità cercatore per dare una mano nelle ricerche in zona e scala la classifica dei volontari più attivi della community."
      }
    ],
    "featsCta": "Vedi tutte le funzionalità",
    "adoptEyebrow": "Adozioni",
    "adoptTitle": "Non solo ritrovare: anche adottare",
    "adoptText": "Orma non serve solo a ritrovare chi si è perso. Nella sezione adozioni trovi cani, gatti e altri animali in cerca di una famiglia nei canili e rifugi verificati da noi. Sfogli le schede, conosci la loro storia e contatti la struttura: un modo in più per cambiare una vita.",
    "adoptCta": "Scopri le adozioni",
    "adoptPoints": [
      "Canili e rifugi verificati",
      "Schede con foto e storia",
      "Contatto diretto con la struttura"
    ],
    "reunitedEyebrow": "Lieti fini",
    "reunitedTitle": "Ogni ritorno a casa è una storia",
    "reunitedText": "Quando un animale ritrova la sua famiglia, su Orma diventa una storia a lieto fine da festeggiare insieme. Sono loro il motivo per cui esiste tutto questo.",
    "vetsEyebrow": "Per veterinari e strutture",
    "vetsTitle": "Sei un veterinario o hai un canile? Fatti trovare.",
    "vetsText": "Orma ti mostra sulla mappa a chi cerca aiuto: chi trova un animale te lo porta, chi ha un'emergenza ti trova subito. Attivarti richiede cinque minuti.",
    "vetsPoints": [
      "Visibilità sulla mappa",
      "Richieste di appuntamento dall'app",
      "Punto di consegna o emergenza h24"
    ],
    "vetsCta": "Scrivici",
    "downloadTitle": "Il tuo amico ti sta aspettando",
    "downloadSub": "Orma arriva prima su Android, poi su iOS. Unisciti alla community e aiuta ogni animale a tornare a casa.",
    "btnAndroid": "Scarica su Google Play",
    "btnIos": "Presto su App Store"
  },
  "en": {
    "title": "Orma — Lost & found pets app | Find your friend",
    "metaDesc": "App to report and find lost dogs and cats: alerts to people nearby, sightings with photos, microchip matching. Privacy first.",
    "heroEyebrow": "For lost pets, found animals and adoptions",
    "heroTitle": "Find your friend",
    "heroSub": "Orma connects people who've lost a pet with people who've spotted or found one. Post in a few taps, get alerts when something happens near you, and keep contact safe in the in-app chat.",
    "heroCta1": "Get Orma",
    "heroCta2": "See how it works",
    "heroProof": "A community that lends a paw, town by town.",
    "trust": [
      "Data in the EU",
      "Privacy by design",
      "Made in Italy"
    ],
    "animalsTitle": "Orma is for every animal",
    "animalsSub": "Dogs and cats, of course — but also rabbits, birds, rodents and everyone else. If someone loves them, they belong here: lost, found, abandoned or looking for a family.",
    "animals": [
      {
        "key": "dog",
        "label": "Dogs"
      },
      {
        "key": "cat",
        "label": "Cats"
      },
      {
        "key": "rabbit",
        "label": "Rabbits"
      },
      {
        "key": "bird",
        "label": "Birds"
      },
      {
        "key": "rodent",
        "label": "Rodents"
      },
      {
        "key": "reptile",
        "label": "Reptiles"
      },
      {
        "key": "horse",
        "label": "Horses"
      },
      {
        "key": "more",
        "label": "and more"
      }
    ],
    "stepsEyebrow": "How it works",
    "stepsTitle": "Three steps back home",
    "steps": [
      {
        "t": "Report",
        "x": "Lost your pet? Create a report with photos, a description and the last known location. Within seconds it reaches the community around you."
      },
      {
        "t": "Spot",
        "x": "Seen an animal that looks lost, or found one? Post a sighting with a photo and where it was. Even a single report can make the difference."
      },
      {
        "t": "Reunite",
        "x": "Orma alerts you when a nearby report might match. Message through the secure chat, check the details together and arrange the reunion."
      }
    ],
    "stepsCta": "Read the whole story",
    "featEyebrow": "Features",
    "featTitle": "Everything you need, nothing you don't",
    "featLead": "Essential tools, designed around privacy and speed. No frills: just what helps an animal find its way home.",
    "feats": [
      {
        "t": "Report lost, found or abandoned",
        "x": "Create a lost, found or abandoned report in a few taps, with photos, a description and the last known location. A report stays active for 90 days, then is archived automatically."
      },
      {
        "t": "Privacy-first map",
        "x": "See lost and found reports around you on a map. To protect whoever posts, the public map blurs each location by about 150 metres — you can help without exposing exact addresses."
      },
      {
        "t": "Alerts near you",
        "x": "Turn on notifications and get pinged when someone posts a report in your area. The first minutes matter most — and you'll be the first to know."
      },
      {
        "t": "Sightings with photos",
        "x": "Seen an animal that looks lost? Post a sighting with a photo and the place: owners recognise their pet at a glance, even from a single report."
      },
      {
        "t": "Possible matches & microchip",
        "x": "Orma compares lost and found reports and suggests possible matches — \"could this be yours?\". When a microchip number is available, the link is even more precise."
      },
      {
        "t": "Secure chat",
        "x": "Get in touch with whoever posted a report right inside the app — without handing over your phone number or email until you choose to."
      },
      {
        "t": "PDF flyer with QR",
        "x": "Generate a print-ready PDF flyer in one tap, with the report's QR code. Whoever finds it scans the code and opens the animal's up-to-date card."
      },
      {
        "t": "Adoptions from verified shelters",
        "x": "Browse animals looking for a home in shelters verified by Orma. We vet the facilities as best we can, so you have more trustworthy options when you decide to adopt."
      },
      {
        "t": "QR tag & digital collar",
        "x": "Attach an Orma tag to your pet's collar. Whoever finds them scans it and opens their card right away to reach you — without revealing your phone number or address."
      },
      {
        "t": "Digital health booklet",
        "x": "Keep your pet's vaccinations, weight and reminders with you: a simple digital health record, useful every day and not just in an emergency."
      },
      {
        "t": "Vets & shelters on the map",
        "x": "Find the facilities around you, see who's open for 24/7 emergencies and where to bring a found animal. From veterinary clinics you can also request an appointment."
      },
      {
        "t": "Finder mode",
        "x": "Turn on finder mode to help with searches in your area and climb the leaderboard of the community's most active volunteers."
      }
    ],
    "featsCta": "See all features",
    "adoptEyebrow": "Adoptions",
    "adoptTitle": "Not only reuniting: adopting too",
    "adoptText": "Orma is not only about finding who got lost. In the adoptions section you'll find dogs, cats and other animals looking for a family in shelters verified by us. Browse their cards, get to know their story and contact the shelter: one more way to change a life.",
    "adoptCta": "Discover adoptions",
    "adoptPoints": [
      "Verified shelters",
      "Cards with photos and story",
      "Direct contact with the shelter"
    ],
    "reunitedEyebrow": "Happy endings",
    "reunitedTitle": "Every reunion is a story",
    "reunitedText": "When an animal finds its family again, on Orma it becomes a happy ending to celebrate together. They are the reason all of this exists.",
    "vetsEyebrow": "For vets & shelters",
    "vetsTitle": "A vet or a shelter? Get found.",
    "vetsText": "Orma puts you on the map for people who need help: whoever finds an animal brings it to you, whoever has an emergency finds you right away. Joining takes five minutes.",
    "vetsPoints": [
      "Visibility on the map",
      "Appointment requests from the app",
      "Drop-off point or 24/7 emergency"
    ],
    "vetsCta": "Get in touch",
    "downloadTitle": "Your friend is waiting for you",
    "downloadSub": "Orma launches first on Android and then on iOS. Join the community and help every animal find its way home.",
    "btnAndroid": "Get it on Google Play",
    "btnIos": "Coming soon to the App Store"
  },
  "cs": {
    "title": "Orma — Aplikace pro ztracená zvířata | Najdi svého kamaráda",
    "metaDesc": "Aplikace pro nahlášení a hledání ztracených psů a koček: upozornění pro lidi v okolí, hlášení o spatření s fotkou, párování podle mikročipu. Soukromí na prvním místě.",
    "heroEyebrow": "Aplikace pro ztracená a nalezená zvířata i pro adopce",
    "heroTitle": "Najdi svého kamaráda",
    "heroSub": "Orma propojuje ty, komu se ztratilo zvíře, s těmi, kdo ho viděli nebo našli. Nahlásíš to pár klepnutími, dostaneš upozornění, když se něco děje ve tvém okolí, a kontakt zůstane v bezpečí v chatu přímo v aplikaci.",
    "heroCta1": "Stáhnout aplikaci Orma",
    "heroCta2": "Podívej se, jak to funguje",
    "heroProof": "Komunita, která si podá tlapu — město po městě.",
    "trust": [
      "Data v Evropě",
      "Soukromí už od návrhu",
      "Vyrobeno v Itálii"
    ],
    "animalsTitle": "Orma je pro každé zvíře",
    "animalsSub": "Psi a kočky samozřejmě, ale i králíci, ptáci, hlodavci a všichni ostatní. Když je má někdo rád, mají tu své místo: ztracení, nalezení, opuštění nebo hledající rodinu.",
    "animals": [
      {
        "key": "dog",
        "label": "Psi"
      },
      {
        "key": "cat",
        "label": "Kočky"
      },
      {
        "key": "rabbit",
        "label": "Králíci"
      },
      {
        "key": "bird",
        "label": "Ptáci"
      },
      {
        "key": "rodent",
        "label": "Hlodavci"
      },
      {
        "key": "reptile",
        "label": "Plazi"
      },
      {
        "key": "horse",
        "label": "Koně"
      },
      {
        "key": "more",
        "label": "a další"
      }
    ],
    "stepsEyebrow": "Jak to funguje",
    "stepsTitle": "Tři kroky domů",
    "steps": [
      {
        "t": "Nahlas",
        "x": "Ztratilo se ti zvíře? Vytvoř hlášení s fotkou, popisem a poslední známou polohou. Během pár vteřin ho uvidí komunita ve tvém okolí."
      },
      {
        "t": "Všimni si",
        "x": "Viděl jsi zvíře, které vypadá ztraceně, nebo jsi nějaké našel? Zveřejni spatření s fotkou a místem, kde bylo. I jediné hlášení může všechno změnit."
      },
      {
        "t": "Najdi",
        "x": "Orma tě upozorní, když by hlášení v okolí mohlo sedět. Napiš v bezpečném chatu, ověřte si spolu podrobnosti a domluvte se na návratu domů."
      }
    ],
    "stepsCta": "Přečti si celý příběh",
    "featEyebrow": "Funkce",
    "featTitle": "Všechno, co potřebuješ, nic navíc",
    "featLead": "Základní nástroje navržené kolem soukromí a rychlosti. Žádné zbytečnosti: jen to, co pomáhá zvířeti vrátit se domů.",
    "feats": [
      {
        "t": "Nahlas ztracené, nalezené nebo opuštěné zvíře",
        "x": "Pár klepnutími vytvoříš hlášení o ztraceném, nalezeném nebo opuštěném zvířeti, s fotkou, popisem a poslední známou polohou. Hlášení zůstane aktivní 90 dní, pak se automaticky archivuje."
      },
      {
        "t": "Mapa se soukromím",
        "x": "Uvidíš ztráty a spatření kolem sebe na mapě. Aby byl ten, kdo hlásí, chráněný, je poloha na veřejné mapě rozostřená zhruba o 150 metrů: pomůžeš, aniž bys prozradil přesnou adresu."
      },
      {
        "t": "Upozornění ve tvém okolí",
        "x": "Zapni si oznámení a dostaneš upozornění, když někdo zveřejní hlášení ve tvé oblasti. První minuty rozhodují — a ty o nich budeš vědět jako první."
      },
      {
        "t": "Spatření s fotkou",
        "x": "Viděl jsi zvíře, které vypadá ztraceně? Zveřejni spatření s fotkou a místem: kdo hledá, pozná svého kamaráda hned, i z jediného hlášení."
      },
      {
        "t": "Možné shody a mikročip",
        "x": "Orma porovnává ztracená a nalezená zvířata a navrhuje ti možné shody — „není to náhodou tvoje?“. Když je k dispozici číslo mikročipu, je spojení ještě přesnější."
      },
      {
        "t": "Bezpečný chat",
        "x": "Spoj se s tím, kdo hlášení zveřejnil, přímo v aplikaci, bez výměny telefonního čísla nebo e-mailu, dokud se tak sám nerozhodneš."
      },
      {
        "t": "PDF leták s QR kódem",
        "x": "Jedním klepnutím vytvoříš leták v PDF připravený k tisku, s QR kódem hlášení. Kdo ho najde, načte kód a otevře si aktuální kartu zvířete."
      },
      {
        "t": "Adopce z ověřených útulků",
        "x": "Prohlédni si zvířata, která hledají domov, v útulcích a spolcích ověřených aplikací Orma. Zařízení prověřujeme, jak nejlépe umíme, abys měl spolehlivější kontakty, když se rozhodneš adoptovat."
      },
      {
        "t": "QR známka a digitální obojek",
        "x": "Připni svému zvířeti na obojek známku Orma. Kdo ho najde, známku načte a hned otevře jeho kartu, aby ti dal vědět — a ty nemusíš prozrazovat telefon ani adresu."
      },
      {
        "t": "Digitální očkovací průkaz",
        "x": "Měj u sebe očkování, váhu a připomínky svého zvířete: jednoduchý digitální průkaz, který se hodí každý den, nejen v nouzi."
      },
      {
        "t": "Veterináři a útulky na mapě",
        "x": "Najdi zařízení ve svém okolí, zjisti, kdo má nonstop pohotovost a kam odnést nalezené zvíře. U veterinárních zařízení si můžeš rovnou požádat o termín."
      },
      {
        "t": "Režim hledače",
        "x": "Zapni si režim hledače, pomoz s pátráním ve svém okolí a vyšplhej se v žebříčku nejaktivnějších dobrovolníků komunity."
      }
    ],
    "featsCta": "Zobrazit všechny funkce",
    "adoptEyebrow": "Adopce",
    "adoptTitle": "Nejen najít: taky adoptovat",
    "adoptText": "Orma neslouží jen k hledání těch, kdo se ztratili. V sekci adopcí najdeš psy, kočky a další zvířata, která hledají rodinu, v útulcích a spolcích ověřených námi. Prolistuješ si jejich karty, poznáš jejich příběh a spojíš se se zařízením: další způsob, jak změnit jeden život.",
    "adoptCta": "Prohlédni si adopce",
    "adoptPoints": [
      "Ověřené útulky a spolky",
      "Karty s fotkou a příběhem",
      "Přímý kontakt se zařízením"
    ],
    "reunitedEyebrow": "Šťastné konce",
    "reunitedTitle": "Každý návrat domů je příběh",
    "reunitedText": "Když zvíře znovu najde svou rodinu, stane se z toho v aplikaci Orma šťastný konec, který slavíme společně. Právě kvůli nim to všechno existuje.",
    "vetsEyebrow": "Pro veterináře a zařízení",
    "vetsTitle": "Jsi veterinář nebo vedeš útulek? Nech se najít.",
    "vetsText": "Orma tě ukáže na mapě těm, kdo hledají pomoc: kdo najde zvíře, přinese ho k tobě, kdo řeší nouzi, tě najde hned. Zapojení zabere pět minut.",
    "vetsPoints": [
      "Viditelnost na mapě",
      "Žádosti o termín přímo z aplikace",
      "Místo pro předání nebo nonstop pohotovost"
    ],
    "vetsCta": "Napiš nám",
    "downloadTitle": "Tvůj kamarád na tebe čeká",
    "downloadSub": "Orma přichází nejdřív na Android, pak na iOS. Přidej se ke komunitě a pomoz každému zvířeti vrátit se domů.",
    "btnAndroid": "Stáhnout na Google Play",
    "btnIos": "Brzy v App Store"
  },
  "da": {
    "title": "Orma — App til savnede kæledyr | Find din ven",
    "metaDesc": "App til at efterlyse og finde savnede hunde og katte: besked til folk i nærheden, observationer med billeder, match på mikrochip. Privatliv først.",
    "heroEyebrow": "App til savnede og fundne dyr — og til adoption",
    "heroTitle": "Find din ven",
    "heroSub": "Orma forbinder dem, der har mistet et dyr, med dem, der har set eller fundet det. Du efterlyser med få tryk, får besked, når der sker noget i nærheden af dig, og holder kontakten sikker i appens chat.",
    "heroCta1": "Hent Orma",
    "heroCta2": "Se hvordan det virker",
    "heroProof": "Et fællesskab, der giver en pote — by for by.",
    "trust": [
      "Data i Europa",
      "Privatliv fra starten",
      "Lavet i Italien"
    ],
    "animalsTitle": "Orma er til alle dyr",
    "animalsSub": "Hunde og katte, selvfølgelig — men også kaniner, fugle, gnavere og alle de andre. Hvis nogen holder af dem, hører de til her: savnede, fundne, efterladte eller på jagt efter en familie.",
    "animals": [
      {
        "key": "dog",
        "label": "Hunde"
      },
      {
        "key": "cat",
        "label": "Katte"
      },
      {
        "key": "rabbit",
        "label": "Kaniner"
      },
      {
        "key": "bird",
        "label": "Fugle"
      },
      {
        "key": "rodent",
        "label": "Gnavere"
      },
      {
        "key": "reptile",
        "label": "Krybdyr"
      },
      {
        "key": "horse",
        "label": "Heste"
      },
      {
        "key": "more",
        "label": "og flere"
      }
    ],
    "stepsEyebrow": "Sådan virker det",
    "stepsTitle": "Tre skridt hjem",
    "steps": [
      {
        "t": "Efterlys",
        "x": "Har du mistet dit dyr? Opret en efterlysning med billeder, beskrivelse og sidste kendte sted. På få sekunder ser fællesskabet i dit område den."
      },
      {
        "t": "Observér",
        "x": "Har du set et dyr, der ser ud til at være løbet væk, eller har du fundet et? Læg en observation op med et billede og stedet, hvor det var. Selv en enkelt melding kan gøre forskellen."
      },
      {
        "t": "Genfind",
        "x": "Orma giver dig besked, når en efterlysning i nærheden måske passer. Skriv i den sikre chat, tjek detaljerne sammen, og aftal turen hjem."
      }
    ],
    "stepsCta": "Læs hele historien",
    "featEyebrow": "Funktioner",
    "featTitle": "Alt det, du har brug for — og intet andet",
    "featLead": "Kun det nødvendige, bygget op om privatliv og hastighed. Ingen pynt: bare det, der hjælper et dyr hjem igen.",
    "feats": [
      {
        "t": "Efterlys savnet, fundet eller efterladt",
        "x": "Opret på få tryk en efterlysning for et savnet, fundet eller efterladt dyr med billeder, beskrivelse og sidste kendte sted. Efterlysningen er aktiv i 90 dage og bliver derefter arkiveret automatisk."
      },
      {
        "t": "Kort med privatliv",
        "x": "Se savnede og fundne dyr omkring dig på et kort. For at beskytte den, der efterlyser, er stedet på det offentlige kort sløret med cirka 150 meter: du hjælper uden at afsløre præcise adresser."
      },
      {
        "t": "Beskeder tæt på dig",
        "x": "Slå notifikationer til, og få besked, når nogen lægger en efterlysning op i dit område. De første minutter tæller mest — og dem kender du allerede."
      },
      {
        "t": "Observationer med billeder",
        "x": "Har du set et dyr, der ser ud til at være løbet væk? Læg en observation op med billede og sted: den, der leder, genkender straks sit eget dyr — også ud fra en enkelt melding."
      },
      {
        "t": "Mulige match og mikrochip",
        "x": "Orma sammenligner savnede og fundne dyr og foreslår de mulige match — »er det måske dit?«. Findes mikrochippens nummer, bliver forbindelsen endnu mere præcis."
      },
      {
        "t": "Sikker chat",
        "x": "Kom i kontakt med den, der har lagt en efterlysning op, direkte i appen — uden at udveksle telefonnummer eller e-mail, før du selv beslutter det."
      },
      {
        "t": "PDF-plakat med QR-kode",
        "x": "Lav med ét tryk en trykklar PDF-plakat med efterlysningens QR-kode. Den, der finder den, scanner koden og åbner dyrets opdaterede side."
      },
      {
        "t": "Adoption fra godkendte internater",
        "x": "Bladr gennem de dyr, der søger et hjem, på internater og dyrehjem, som Orma har tjekket. Vi undersøger stederne, så godt vi kan, så du har mere pålidelige holdepunkter, når du vælger at adoptere."
      },
      {
        "t": "QR-tag og digitalt halsbånd",
        "x": "Sæt et Orma-tag på dit dyrs halsbånd. Den, der finder dyret, scanner det og åbner straks siden for at give dig besked — uden at du skal afsløre telefonnummer eller adresse."
      },
      {
        "t": "Digital sundhedsbog",
        "x": "Hav dit dyrs vaccinationer, vægt og påmindelser med dig: en enkel digital sundhedsbog, der er nyttig hver dag og ikke kun i en nødsituation."
      },
      {
        "t": "Dyrlæger og internater på kortet",
        "x": "Find stederne omkring dig, se hvem der har døgnåbent i akutte tilfælde, og hvor du kan aflevere et fundet dyr. Hos dyreklinikkerne kan du også bede om en tid."
      },
      {
        "t": "Søgetilstand",
        "x": "Slå søgetilstand til for at give en hånd med eftersøgninger i dit område, og ryk op på listen over fællesskabets mest aktive frivillige."
      }
    ],
    "featsCta": "Se alle funktioner",
    "adoptEyebrow": "Adoption",
    "adoptTitle": "Ikke kun at finde igen: også at adoptere",
    "adoptText": "Orma handler ikke kun om at finde dem, der er blevet væk. I adoptionsdelen finder du hunde, katte og andre dyr, der søger en familie, på internater og dyrehjem, vi har tjekket. Du bladrer gennem profilerne, lærer deres historie at kende og kontakter stedet: endnu en måde at ændre et liv på.",
    "adoptCta": "Se adoptionerne",
    "adoptPoints": [
      "Godkendte internater og dyrehjem",
      "Profiler med billeder og historie",
      "Direkte kontakt til stedet"
    ],
    "reunitedEyebrow": "Lykkelige slutninger",
    "reunitedTitle": "Hver hjemkomst er en historie",
    "reunitedText": "Når et dyr finder sin familie igen, bliver det på Orma til en lykkelig slutning, vi fejrer sammen. De er grunden til, at alt det her findes.",
    "vetsEyebrow": "For dyrlæger og internater",
    "vetsTitle": "Er du dyrlæge, eller driver du et internat? Bliv fundet.",
    "vetsText": "Orma viser dig på kortet for dem, der søger hjælp: den, der finder et dyr, kommer til dig, og den, der står i en akut situation, finder dig med det samme. Det tager fem minutter at komme i gang.",
    "vetsPoints": [
      "Synlighed på kortet",
      "Tidsbestillinger fra appen",
      "Afleveringssted eller døgnåben akuthjælp"
    ],
    "vetsCta": "Skriv til os",
    "downloadTitle": "Din ven venter på dig",
    "downloadSub": "Orma kommer først på Android og derefter på iOS. Vær med i fællesskabet, og hjælp alle dyr hjem igen.",
    "btnAndroid": "Hent det på Google Play",
    "btnIos": "Snart i App Store"
  },
  "el": {
    "title": "Orma — Εφαρμογή για χαμένα ζώα | Βρες ξανά τον φίλο σου",
    "metaDesc": "Εφαρμογή για να δηλώσεις και να βρεις χαμένους σκύλους και γάτες: ειδοποιήσεις στους ανθρώπους που είναι κοντά, εντοπισμοί με φωτογραφίες, αντιστοίχιση μικροτσίπ. Το απόρρητο πρώτα από όλα.",
    "heroEyebrow": "Εφαρμογή για ζώα που χάθηκαν, βρέθηκαν ή ψάχνουν σπίτι",
    "heroTitle": "Βρες ξανά τον φίλο σου",
    "heroSub": "Το Orma συνδέει όποιον έχασε ένα ζώο με όποιον το εντόπισε ή το βρήκε. Δηλώνεις με λίγα πατήματα, λαμβάνεις ειδοποίηση μόλις κάτι κινηθεί κοντά σου και κρατάς τα στοιχεία σου ασφαλή στη συνομιλία της εφαρμογής.",
    "heroCta1": "Κατέβασε το Orma",
    "heroCta2": "Δες πώς λειτουργεί",
    "heroProof": "Μια κοινότητα που δίνει μια πατούσα, πόλη με πόλη.",
    "trust": [
      "Δεδομένα στην Ευρώπη",
      "Απόρρητο εκ σχεδιασμού",
      "Φτιαγμένο στην Ιταλία"
    ],
    "animalsTitle": "Το Orma είναι για κάθε ζώο",
    "animalsSub": "Σκύλοι και γάτες, φυσικά, αλλά και κουνέλια, πουλιά, τρωκτικά και όλα τα υπόλοιπα. Αν κάποιος τα αγαπάει, εδώ έχουν θέση: είτε χάθηκαν, είτε βρέθηκαν, είτε τα εγκατέλειψαν, είτε ψάχνουν μια οικογένεια.",
    "animals": [
      {
        "key": "dog",
        "label": "Σκύλοι"
      },
      {
        "key": "cat",
        "label": "Γάτες"
      },
      {
        "key": "rabbit",
        "label": "Κουνέλια"
      },
      {
        "key": "bird",
        "label": "Πουλιά"
      },
      {
        "key": "rodent",
        "label": "Τρωκτικά"
      },
      {
        "key": "reptile",
        "label": "Ερπετά"
      },
      {
        "key": "horse",
        "label": "Άλογα"
      },
      {
        "key": "more",
        "label": "και άλλα"
      }
    ],
    "stepsEyebrow": "Πώς λειτουργεί",
    "stepsTitle": "Τρία βήματα για την επιστροφή στο σπίτι",
    "steps": [
      {
        "t": "Δήλωσε",
        "x": "Έχασες το ζώο σου; Δημιούργησε μια αγγελία με φωτογραφίες, περιγραφή και την τελευταία γνωστή τοποθεσία. Μέσα σε λίγα δευτερόλεπτα τη βλέπει η κοινότητα της περιοχής σου."
      },
      {
        "t": "Εντόπισε",
        "x": "Είδες ένα ζώο που μοιάζει χαμένο ή βρήκες κάποιο; Δημοσίευσε έναν εντοπισμό με μια φωτογραφία και το σημείο όπου ήταν. Ακόμη και μία μόνο αναφορά μπορεί να κάνει τη διαφορά."
      },
      {
        "t": "Βρες",
        "x": "Το Orma σε ειδοποιεί όταν μια κοντινή αγγελία μπορεί να ταιριάζει. Γράφεις στην ασφαλή συνομιλία, ελέγχετε μαζί τις λεπτομέρειες και κανονίζετε την επιστροφή στο σπίτι."
      }
    ],
    "stepsCta": "Διάβασε όλη την ιστορία",
    "featEyebrow": "Λειτουργίες",
    "featTitle": "Ό,τι χρειάζεσαι, τίποτα περιττό",
    "featLead": "Βασικά εργαλεία, σχεδιασμένα γύρω από το απόρρητο και την ταχύτητα. Χωρίς περιττά στολίδια: μόνο ό,τι βοηθάει ένα ζώο να γυρίσει σπίτι.",
    "feats": [
      {
        "t": "Δήλωσε ζώο που χάθηκε, βρέθηκε ή εγκαταλείφθηκε",
        "x": "Δημιούργησε με λίγα πατήματα μια αγγελία για ζώο που χάθηκε, βρέθηκε ή εγκαταλείφθηκε, με φωτογραφίες, περιγραφή και την τελευταία τοποθεσία. Η αγγελία μένει ενεργή 90 ημέρες και μετά αρχειοθετείται αυτόματα."
      },
      {
        "t": "Χάρτης με σεβασμό στο απόρρητο",
        "x": "Δες στον χάρτη τα ζώα που χάθηκαν και τους εντοπισμούς γύρω σου. Για να προστατεύεται όποιος δημοσιεύει, στον δημόσιο χάρτη η τοποθεσία εμφανίζεται θολωμένη κατά περίπου 150 μέτρα: βοηθάς χωρίς να αποκαλύπτονται ακριβείς διευθύνσεις."
      },
      {
        "t": "Ειδοποιήσεις κοντά σου",
        "x": "Ενεργοποίησε τις ειδοποιήσεις και μάθε αμέσως όταν κάποιος δημοσιεύει μια αγγελία στην περιοχή σου. Τα πρώτα λεπτά μετράνε — κι εσύ τα ξέρεις ήδη."
      },
      {
        "t": "Εντοπισμοί με φωτογραφίες",
        "x": "Είδες ένα ζώο που μοιάζει χαμένο; Δημοσίευσε έναν εντοπισμό με φωτογραφία και τοποθεσία: όποιος ψάχνει αναγνωρίζει αμέσως το ζώο του, ακόμη κι από μία μόνο αναφορά."
      },
      {
        "t": "Πιθανές αντιστοιχίες και μικροτσίπ",
        "x": "Το Orma συγκρίνει τα ζώα που χάθηκαν με αυτά που βρέθηκαν και σου προτείνει τις πιθανές αντιστοιχίες — «μήπως είναι το δικό σου;». Αν υπάρχει ο αριθμός του μικροτσίπ, η σύνδεση γίνεται ακόμη πιο ακριβής."
      },
      {
        "t": "Ασφαλής συνομιλία",
        "x": "Έλα σε επαφή με όποιον δημοσίευσε μια αγγελία μέσα από την εφαρμογή, χωρίς να ανταλλάξεις τηλέφωνο ή email μέχρι να το αποφασίσεις εσύ."
      },
      {
        "t": "Αφίσα PDF με QR",
        "x": "Φτιάξε με ένα πάτημα μια αφίσα σε PDF, έτοιμη για εκτύπωση, με το QR της αγγελίας. Όποιος τη βρει σκανάρει τον κωδικό και ανοίγει την ενημερωμένη καρτέλα του ζώου."
      },
      {
        "t": "Υιοθεσίες από ελεγμένα καταφύγια",
        "x": "Δες τα ζώα που ψάχνουν σπίτι σε κυνοκομεία και καταφύγια που έχει ελέγξει το Orma. Ελέγχουμε τις δομές όσο καλύτερα μπορούμε, για να έχεις πιο αξιόπιστες επιλογές όταν αποφασίσεις να υιοθετήσεις."
      },
      {
        "t": "Ετικέτα QR και ψηφιακό κολάρο",
        "x": "Βάλε μια ετικέτα Orma στο κολάρο του ζώου σου. Όποιος το βρει τη σκανάρει και ανοίγει αμέσως την καρτέλα του για να σε ειδοποιήσει — χωρίς να χρειαστεί να δώσεις τηλέφωνο ή διεύθυνση."
      },
      {
        "t": "Ψηφιακό βιβλιάριο υγείας",
        "x": "Κράτα μαζί σου τα εμβόλια, το βάρος και τις υπενθυμίσεις του ζώου σου: ένα απλό ψηφιακό βιβλιάριο, χρήσιμο κάθε μέρα κι όχι μόνο στην έκτακτη ανάγκη."
      },
      {
        "t": "Κτηνίατροι και καταφύγια στον χάρτη",
        "x": "Βρες τις δομές γύρω σου, δες ποιος είναι ανοιχτός για επείγοντα 24 ώρες το 24ωρο και πού να πας ένα ζώο που βρήκες. Από τα κτηνιατρεία μπορείς επίσης να ζητήσεις ραντεβού."
      },
      {
        "t": "Λειτουργία εθελοντή αναζήτησης",
        "x": "Ενεργοποίησε τη λειτουργία εθελοντή για να δώσεις ένα χέρι στις αναζητήσεις της περιοχής σου και ανέβα στην κατάταξη των πιο ενεργών εθελοντών της κοινότητας."
      }
    ],
    "featsCta": "Δες όλες τις λειτουργίες",
    "adoptEyebrow": "Υιοθεσίες",
    "adoptTitle": "Όχι μόνο να βρίσκεις: και να υιοθετείς",
    "adoptText": "Το Orma δεν είναι μόνο για να ξαναβρίσκεις όποιον χάθηκε. Στην ενότητα υιοθεσιών θα βρεις σκύλους, γάτες και άλλα ζώα που ψάχνουν οικογένεια, σε κυνοκομεία και καταφύγια που έχουμε ελέγξει. Ξεφυλλίζεις τις καρτέλες τους, μαθαίνεις την ιστορία τους και επικοινωνείς με τη δομή: ένας ακόμη τρόπος να αλλάξεις μια ζωή.",
    "adoptCta": "Δες τις υιοθεσίες",
    "adoptPoints": [
      "Ελεγμένα κυνοκομεία και καταφύγια",
      "Καρτέλες με φωτογραφίες και ιστορία",
      "Απευθείας επικοινωνία με τη δομή"
    ],
    "reunitedEyebrow": "Ευτυχισμένα τέλη",
    "reunitedTitle": "Κάθε επιστροφή στο σπίτι είναι μια ιστορία",
    "reunitedText": "Όταν ένα ζώο ξαναβρίσκει την οικογένειά του, στο Orma γίνεται μια ιστορία με ευτυχισμένο τέλος που τη γιορτάζουμε μαζί. Αυτές οι ιστορίες είναι ο λόγος που υπάρχουν όλα αυτά.",
    "vetsEyebrow": "Για κτηνιάτρους και δομές",
    "vetsTitle": "Είσαι κτηνίατρος ή έχεις καταφύγιο; Κάνε τους να σε βρίσκουν.",
    "vetsText": "Το Orma σε δείχνει στον χάρτη σε όποιον ψάχνει βοήθεια: όποιος βρίσκει ένα ζώο στο φέρνει, όποιος έχει επείγον περιστατικό σε βρίσκει αμέσως. Η εγγραφή θέλει πέντε λεπτά.",
    "vetsPoints": [
      "Ορατότητα στον χάρτη",
      "Αιτήματα για ραντεβού μέσα από την εφαρμογή",
      "Σημείο παράδοσης ή επείγοντα 24 ώρες το 24ωρο"
    ],
    "vetsCta": "Γράψε μας",
    "downloadTitle": "Ο φίλος σου σε περιμένει",
    "downloadSub": "Το Orma έρχεται πρώτα σε Android και μετά σε iOS. Μπες στην κοινότητα και βοήθησε κάθε ζώο να γυρίσει σπίτι.",
    "btnAndroid": "Κατέβασέ το στο Google Play",
    "btnIos": "Σύντομα στο App Store"
  },
  "hr": {
    "title": "Orma — Aplikacija za izgubljene ljubimce | Pronađi svog prijatelja",
    "metaDesc": "Aplikacija za prijavu i pronalaženje izgubljenih pasa i mačaka: obavijesti ljudima u blizini, dojave s fotografijom, podudaranje mikročipa. Privatnost na prvom mjestu.",
    "heroEyebrow": "Aplikacija za izgubljene i pronađene životinje te za udomljavanje",
    "heroTitle": "Pronađi svog prijatelja",
    "heroSub": "Orma povezuje one koji su izgubili životinju s onima koji su je vidjeli ili pronašli. Prijaviš u nekoliko dodira, dobiješ obavijest čim se nešto dogodi u tvojoj blizini, a kontakt ostaje siguran u chatu unutar aplikacije.",
    "heroCta1": "Preuzmi Ormu",
    "heroCta2": "Pogledaj kako radi",
    "heroProof": "Zajednica koja pruža šapu, grad po grad.",
    "trust": [
      "Podaci u Europi",
      "Privatnost od početka",
      "Made in Italy"
    ],
    "animalsTitle": "Orma je za svaku životinju",
    "animalsSub": "Psi i mačke, naravno, ali i kunići, ptice, glodavci i svi ostali. Ako ih netko voli, ovdje imaju svoje mjesto: izgubljeni, pronađeni, napušteni ili u potrazi za obitelji.",
    "animals": [
      {
        "key": "dog",
        "label": "Psi"
      },
      {
        "key": "cat",
        "label": "Mačke"
      },
      {
        "key": "rabbit",
        "label": "Kunići"
      },
      {
        "key": "bird",
        "label": "Ptice"
      },
      {
        "key": "rodent",
        "label": "Glodavci"
      },
      {
        "key": "reptile",
        "label": "Gmazovi"
      },
      {
        "key": "horse",
        "label": "Konji"
      },
      {
        "key": "more",
        "label": "i drugi"
      }
    ],
    "stepsEyebrow": "Kako radi",
    "stepsTitle": "Tri koraka do doma",
    "steps": [
      {
        "t": "Prijavi",
        "x": "Izgubio si svog ljubimca? Napravi prijavu s fotografijom, opisom i posljednjom poznatom lokacijom. U nekoliko sekundi vidi je zajednica u tvom kraju."
      },
      {
        "t": "Dojavi",
        "x": "Vidio si životinju koja djeluje izgubljeno ili si je pronašao? Objavi dojavu s fotografijom i mjestom na kojem je bila. I jedna jedina dojava može promijeniti ishod."
      },
      {
        "t": "Pronađi",
        "x": "Orma te obavijesti kad bi se prijava u blizini mogla podudarati. Javi se u sigurnom chatu, zajedno provjerite pojedinosti i dogovorite povratak kući."
      }
    ],
    "stepsCta": "Pročitaj cijelu priču",
    "featEyebrow": "Mogućnosti",
    "featTitle": "Sve što treba, ništa suvišno",
    "featLead": "Osnovni alati, osmišljeni oko privatnosti i brzine. Bez ukrasa: samo ono što pomaže životinji da se vrati kući.",
    "feats": [
      {
        "t": "Prijava izgubljene, pronađene ili napuštene životinje",
        "x": "U nekoliko dodira napraviš prijavu izgubljene, pronađene ili napuštene životinje, s fotografijom, opisom i posljednjom lokacijom. Prijava ostaje aktivna 90 dana, a zatim se automatski arhivira."
      },
      {
        "t": "Karta koja čuva privatnost",
        "x": "Vidiš nestanke i dojave oko sebe na karti. Da bismo zaštitili one koji prijavljuju, na javnoj karti lokacija je zamućena za otprilike 150 metara: pomažeš bez otkrivanja točnih adresa."
      },
      {
        "t": "Obavijesti u tvojoj blizini",
        "x": "Uključi obavijesti i javit ćemo ti čim netko objavi prijavu u tvom kraju. Prve minute su najvažnije, a ti ćeš doznati među prvima."
      },
      {
        "t": "Dojave s fotografijom",
        "x": "Vidio si životinju koja djeluje izgubljeno? Objavi dojavu s fotografijom i mjestom: vlasnik odmah prepozna svog ljubimca, i po jednoj jedinoj objavi."
      },
      {
        "t": "Moguća podudaranja i mikročip",
        "x": "Orma uspoređuje izgubljene i pronađene životinje i predlaže moguća podudaranja — „je li ovo možda tvoj?”. Ako je dostupan broj mikročipa, poveznica je još preciznija."
      },
      {
        "t": "Siguran chat",
        "x": "Javi se onome tko je objavio prijavu izravno u aplikaciji, bez razmjene broja telefona ili e-adrese sve dok sam ne odlučiš drukčije."
      },
      {
        "t": "PDF letak s QR kodom",
        "x": "Jednim dodirom napraviš letak u PDF-u spreman za ispis, s QR kodom prijave. Tko ga pronađe, skenira kod i otvori ažuriranu karticu životinje."
      },
      {
        "t": "Udomljavanje iz provjerenih skloništa",
        "x": "Pregledaj životinje koje traže dom u skloništima i azilima koje je Orma provjerila. Ustanove provjeravamo najbolje što možemo kako bi imao pouzdanije podatke kad se odlučiš udomiti."
      },
      {
        "t": "QR privjesak i digitalna ogrlica",
        "x": "Stavi Ormin privjesak na ogrlicu svoje životinje. Tko je pronađe, skenira ga i odmah otvori njezinu karticu da te obavijesti — a da ti ne moraš otkriti broj telefona ni adresu."
      },
      {
        "t": "Digitalna zdravstvena knjižica",
        "x": "Drži uza se cijepljenja, težinu i podsjetnike svoje životinje: jednostavna digitalna knjižica, korisna svaki dan, a ne samo u hitnom slučaju."
      },
      {
        "t": "Veterinari i skloništa na karti",
        "x": "Pronađi ustanove oko sebe, saznaj tko radi 0–24 u hitnim slučajevima i kamo odnijeti pronađenu životinju. Kod veterinarskih ambulanti možeš zatražiti i termin."
      },
      {
        "t": "Način tragača",
        "x": "Uključi način tragača da pomogneš u potragama u svom kraju i popni se na ljestvici najaktivnijih volontera zajednice."
      }
    ],
    "featsCta": "Pogledaj sve mogućnosti",
    "adoptEyebrow": "Udomljavanje",
    "adoptTitle": "Ne samo pronaći: i udomiti",
    "adoptText": "Orma ne služi samo za pronalaženje onih koji su se izgubili. U dijelu za udomljavanje naći ćeš pse, mačke i druge životinje koje traže obitelj u skloništima i azilima koje smo provjerili. Pregledaš kartice, upoznaš njihovu priču i javiš se ustanovi: još jedan način da promijeniš jedan život.",
    "adoptCta": "Otkrij udomljavanje",
    "adoptPoints": [
      "Provjerena skloništa i azili",
      "Kartice s fotografijama i pričom",
      "Izravan kontakt sa skloništem"
    ],
    "reunitedEyebrow": "Sretni završeci",
    "reunitedTitle": "Svaki povratak kući je priča",
    "reunitedText": "Kad životinja ponovno pronađe svoju obitelj, na Ormi to postaje sretan završetak koji slavimo zajedno. Oni su razlog zbog kojeg sve ovo postoji.",
    "vetsEyebrow": "Za veterinare i ustanove",
    "vetsTitle": "Veterinar si ili vodiš sklonište? Neka te pronađu.",
    "vetsText": "Orma te pokazuje na karti onima koji traže pomoć: tko pronađe životinju, donese ti je; tko ima hitan slučaj, odmah te nađe. Za prijavu ti treba pet minuta.",
    "vetsPoints": [
      "Vidljivost na karti",
      "Zahtjevi za termin iz aplikacije",
      "Mjesto preuzimanja ili hitna služba 0–24"
    ],
    "vetsCta": "Piši nam",
    "downloadTitle": "Tvoj prijatelj te čeka",
    "downloadSub": "Orma prvo stiže na Android, a zatim na iOS. Pridruži se zajednici i pomozi svakoj životinji da se vrati kući.",
    "btnAndroid": "Preuzmi na Google Playu",
    "btnIos": "Uskoro na App Storeu"
  },
  "hu": {
    "title": "Orma — Elveszett kutya és macska app | Találd meg a barátodat",
    "metaDesc": "App elveszett kutyák és macskák bejelentéséhez és megtalálásához: értesítés a közeledben lakóknak, észlelések fotóval, mikrochip-egyeztetés. Az adatvédelem az első.",
    "heroEyebrow": "App elveszett, megtalált és örökbefogadható állatokhoz",
    "heroTitle": "Találd meg a barátodat",
    "heroSub": "Az Orma összeköti azt, aki elvesztette az állatát, azzal, aki látta vagy megtalálta. Néhány koppintással bejelentesz, értesítést kapsz, ha történik valami a közeledben, és biztonságban tartod az elérhetőségeidet az app védett csevegésében.",
    "heroCta1": "Töltsd le az Ormát",
    "heroCta2": "Nézd meg, hogyan működik",
    "heroProof": "Egy közösség, amely mancsot nyújt — városról városra.",
    "trust": [
      "Adatok Európában",
      "Beépített adatvédelem",
      "Olaszországban készült"
    ],
    "animalsTitle": "Az Orma minden állatnak szól",
    "animalsSub": "Kutyák és macskák, persze, de nyulak, madarak, rágcsálók és mindenki más is. Ha valaki szereti őket, itt helyük van: elveszett, megtalált, kidobott vagy családot kereső.",
    "animals": [
      {
        "key": "dog",
        "label": "Kutyák"
      },
      {
        "key": "cat",
        "label": "Macskák"
      },
      {
        "key": "rabbit",
        "label": "Nyulak"
      },
      {
        "key": "bird",
        "label": "Madarak"
      },
      {
        "key": "rodent",
        "label": "Rágcsálók"
      },
      {
        "key": "reptile",
        "label": "Hüllők"
      },
      {
        "key": "horse",
        "label": "Lovak"
      },
      {
        "key": "more",
        "label": "és mások"
      }
    ],
    "stepsEyebrow": "Hogyan működik",
    "stepsTitle": "Három lépés hazáig",
    "steps": [
      {
        "t": "Bejelentés",
        "x": "Elveszett az állatod? Készíts bejelentést fotóval, leírással és az utolsó ismert helyszínnel. Másodpercek alatt látja a környékbeli közösség."
      },
      {
        "t": "Észlelés",
        "x": "Láttál egy állatot, amely elveszettnek tűnik, vagy találtál egyet? Tegyél közzé egy észlelést fotóval és a hellyel, ahol volt. Egyetlen bejelentés is fordulatot hozhat."
      },
      {
        "t": "Viszontlátás",
        "x": "Az Orma szól, ha egy közeli bejelentés egyezhet. Írj a védett csevegésben, ellenőrizzétek együtt a részleteket, és szervezzétek meg a hazatérést."
      }
    ],
    "stepsCta": "Olvasd el az egész történetet",
    "featEyebrow": "Funkciók",
    "featTitle": "Minden, ami kell — semmi fölösleges",
    "featLead": "Alapvető eszközök, az adatvédelem és a gyorsaság köré tervezve. Semmi cicoma: csak az, ami segít egy állatnak hazatalálni.",
    "feats": [
      {
        "t": "Elveszett, megtalált vagy kidobott állat bejelentése",
        "x": "Néhány koppintással készíts bejelentést elveszett, megtalált vagy kidobott állatról: fotó, leírás és az utolsó ismert helyszín. A bejelentés 90 napig marad aktív, utána automatikusan archiválódik."
      },
      {
        "t": "Térkép adatvédelemmel",
        "x": "Nézd meg a térképen a környékbeli eltűnéseket és észleléseket. A bejelentők védelmében a nyilvános térképen a hely körülbelül 150 méterrel el van mosva: úgy segítesz, hogy pontos címek nem derülnek ki."
      },
      {
        "t": "Értesítések a közeledből",
        "x": "Kapcsold be az értesítéseket, és szólunk, ha valaki bejelentést tesz a környékeden. Az első percek számítanak — és te már tudsz róluk."
      },
      {
        "t": "Észlelések fotóval",
        "x": "Láttál egy állatot, amely elveszettnek tűnik? Tegyél közzé egy észlelést fotóval és hellyel: aki keres, azonnal felismeri a sajátját, akár egyetlen bejelentésből is."
      },
      {
        "t": "Lehetséges egyezések és mikrochip",
        "x": "Az Orma összeveti az elveszett és a megtalált állatokat, és felkínálja a lehetséges egyezéseket — „talán a tiéd?”. Ha van mikrochipszám, a kapcsolat még pontosabb."
      },
      {
        "t": "Védett csevegés",
        "x": "Lépj kapcsolatba azzal, aki közzétette a bejelentést, közvetlenül az appban — anélkül, hogy telefonszámot vagy e-mail-címet adnál ki, amíg te úgy nem döntesz."
      },
      {
        "t": "PDF-plakát QR-kóddal",
        "x": "Egy koppintással készíts nyomtatásra kész PDF-plakátot a bejelentés QR-kódjával. Aki megtalálja, beolvassa a kódot, és megnyílik az állat naprakész adatlapja."
      },
      {
        "t": "Örökbefogadás ellenőrzött menhelyekről",
        "x": "Böngészd az otthont kereső állatokat az Orma által ellenőrzött menhelyeken. A helyeket a lehető legalaposabban átnézzük, hogy megbízhatóbb támpontod legyen, amikor az örökbefogadás mellett döntesz."
      },
      {
        "t": "QR-medál és digitális nyakörv",
        "x": "Tegyél Orma-medált az állatod nyakörvére. Aki megtalálja, beolvassa, és rögtön megnyitja az adatlapját, hogy értesíthessen téged — anélkül, hogy telefonszámot vagy címet kellene megadnod."
      },
      {
        "t": "Digitális kisállatkönyv",
        "x": "Tartsd magadnál az állatod oltásait, súlyát és emlékeztetőit: egyszerű digitális kisállatkönyv, amely nemcsak vészhelyzetben hasznos, hanem minden nap."
      },
      {
        "t": "Állatorvosok és menhelyek a térképen",
        "x": "Találd meg a körülötted lévő helyeket, nézd meg, ki tart 24 órás ügyeletet, és hová viheted a talált állatot. Az állatorvosi rendelőktől időpontot is kérhetsz."
      },
      {
        "t": "Keresői mód",
        "x": "Kapcsold be a keresői módot, hogy segíts a környékbeli keresésekben, és lépj feljebb a közösség legaktívabb önkénteseinek rangsorában."
      }
    ],
    "featsCta": "Nézd meg az összes funkciót",
    "adoptEyebrow": "Örökbefogadás",
    "adoptTitle": "Nemcsak megtalálni: örökbe fogadni is",
    "adoptText": "Az Orma nem csak arra jó, hogy megtaláld azt, aki elveszett. Az örökbefogadási részben családot kereső kutyákat, macskákat és más állatokat találsz az általunk ellenőrzött menhelyeken. Átnézed az adatlapjukat, megismered a történetüket, és felveszed a kapcsolatot a menhellyel: még egy mód arra, hogy megváltoztass egy életet.",
    "adoptCta": "Fedezd fel az örökbefogadást",
    "adoptPoints": [
      "Ellenőrzött menhelyek",
      "Adatlapok fotóval és történettel",
      "Közvetlen kapcsolat a menhellyel"
    ],
    "reunitedEyebrow": "Boldog végek",
    "reunitedTitle": "Minden hazatérés egy történet",
    "reunitedText": "Amikor egy állat újra megtalálja a családját, az Ormán boldog véggé válik, amit együtt ünneplünk. Miattuk létezik mindez.",
    "vetsEyebrow": "Állatorvosoknak és intézményeknek",
    "vetsTitle": "Állatorvos vagy, vagy menhelyet vezetsz? Legyél megtalálható.",
    "vetsText": "Az Orma megmutat a térképen azoknak, akik segítséget keresnek: aki állatot talál, hozzád viszi, akinek vészhelyzete van, azonnal rád talál. A csatlakozás öt percet vesz igénybe.",
    "vetsPoints": [
      "Láthatóság a térképen",
      "Időpontkérés az appból",
      "Átadási pont vagy 24 órás ügyelet"
    ],
    "vetsCta": "Írj nekünk",
    "downloadTitle": "A barátod vár rád",
    "downloadSub": "Az Orma előbb Androidra érkezik, aztán iOS-re. Csatlakozz a közösséghez, és segíts, hogy minden állat hazataláljon.",
    "btnAndroid": "Letöltés a Google Playről",
    "btnIos": "Hamarosan az App Store-ban"
  },
  "nl": {
    "title": "Orma — App voor vermiste huisdieren | Vind je vriend terug",
    "metaDesc": "App om vermiste honden en katten te melden en terug te vinden: bericht aan mensen in de buurt, waarnemingen met foto's, koppeling via de chip. Privacy voorop.",
    "heroEyebrow": "App voor vermiste en gevonden dieren en voor adoptie",
    "heroTitle": "Vind je vriend terug",
    "heroSub": "Orma brengt mensen die een dier kwijt zijn samen met mensen die er een gezien of gevonden hebben. Je meldt het met een paar tikken, krijgt bericht zodra er iets gebeurt bij jou in de buurt en houdt je contactgegevens veilig in de chat van de app.",
    "heroCta1": "Download Orma",
    "heroCta2": "Ontdek hoe het werkt",
    "heroProof": "Een community die een pootje helpt, stad voor stad.",
    "trust": [
      "Gegevens in Europa",
      "Privacy by design",
      "Made in Italy"
    ],
    "animalsTitle": "Orma is er voor elk dier",
    "animalsSub": "Honden en katten natuurlijk, maar ook konijnen, vogels, knaagdieren en alle andere. Als iemand van ze houdt, horen ze hier thuis: vermist, gevonden, achtergelaten of op zoek naar een gezin.",
    "animals": [
      {
        "key": "dog",
        "label": "Honden"
      },
      {
        "key": "cat",
        "label": "Katten"
      },
      {
        "key": "rabbit",
        "label": "Konijnen"
      },
      {
        "key": "bird",
        "label": "Vogels"
      },
      {
        "key": "rodent",
        "label": "Knaagdieren"
      },
      {
        "key": "reptile",
        "label": "Reptielen"
      },
      {
        "key": "horse",
        "label": "Paarden"
      },
      {
        "key": "more",
        "label": "en meer"
      }
    ],
    "stepsEyebrow": "Hoe het werkt",
    "stepsTitle": "Drie stappen naar huis",
    "steps": [
      {
        "t": "Melden",
        "x": "Ben je je dier kwijt? Maak een melding met foto's, een beschrijving en de laatst bekende plek. Binnen enkele seconden bereikt hij de community bij jou in de buurt."
      },
      {
        "t": "Waarnemen",
        "x": "Zie je een dier dat verdwaald lijkt, of heb je er een gevonden? Plaats een waarneming met een foto en de plek waar het dier was. Eén enkele melding kan al het verschil maken."
      },
      {
        "t": "Terugvinden",
        "x": "Orma waarschuwt je wanneer een melding in de buurt zou kunnen passen. Je schrijft elkaar in de veilige chat, controleert samen de details en regelt de thuiskomst."
      }
    ],
    "stepsCta": "Lees het hele verhaal",
    "featEyebrow": "Functies",
    "featTitle": "Alles wat nodig is, niets overbodigs",
    "featLead": "Essentiële hulpmiddelen, ontworpen rond privacy en snelheid. Geen opsmuk: alleen wat een dier helpt om thuis te komen.",
    "feats": [
      {
        "t": "Vermist, gevonden of achtergelaten melden",
        "x": "Maak met een paar tikken een melding voor een vermist, gevonden of achtergelaten dier, met foto's, een beschrijving en de laatste plek. De melding blijft 90 dagen actief en wordt daarna automatisch gearchiveerd."
      },
      {
        "t": "Kaart met privacy",
        "x": "Je ziet vermissingen en waarnemingen om je heen op een kaart. Om wie meldt te beschermen wordt de plek op de openbare kaart ongeveer 150 meter vervaagd: je helpt zonder exacte adressen prijs te geven."
      },
      {
        "t": "Bericht bij jou in de buurt",
        "x": "Zet meldingen aan en krijg bericht zodra iemand in jouw omgeving iets plaatst. De eerste minuten tellen het zwaarst — en jij weet ze als eerste."
      },
      {
        "t": "Waarnemingen met foto's",
        "x": "Zie je een dier dat verdwaald lijkt? Plaats een waarneming met foto en plek: wie zoekt, herkent zijn dier meteen, ook aan één enkele melding."
      },
      {
        "t": "Mogelijke overeenkomsten en chip",
        "x": "Orma vergelijkt vermiste en gevonden dieren en stelt je mogelijke overeenkomsten voor — \"is dit misschien die van jou?\". Is het chipnummer bekend, dan is de koppeling nog nauwkeuriger."
      },
      {
        "t": "Veilige chat",
        "x": "Neem rechtstreeks in de app contact op met wie een melding heeft geplaatst, zonder je telefoonnummer of e-mailadres uit te wisselen zolang jij dat niet wilt."
      },
      {
        "t": "PDF-poster met QR-code",
        "x": "Maak met één tik een printklare poster in PDF, met de QR-code van de melding. Wie hem vindt, scant de code en opent de bijgewerkte pagina van het dier."
      },
      {
        "t": "Adoptie uit gecontroleerde asielen",
        "x": "Blader door de dieren die een thuis zoeken in de asielen en opvangcentra die door Orma zijn gecontroleerd. We toetsen de opvangplekken zo goed we kunnen, zodat je betrouwbaardere aanknopingspunten hebt als je besluit te adopteren."
      },
      {
        "t": "QR-penning en digitale halsband",
        "x": "Doe een Orma-penning aan de halsband van je dier. Wie hem vindt, scant hem en opent meteen zijn pagina om jou te waarschuwen — zonder dat jij je telefoonnummer of adres hoeft prijs te geven."
      },
      {
        "t": "Digitaal gezondheidsboekje",
        "x": "Houd de vaccinaties, het gewicht en de herinneringen van je dier bij je: een eenvoudig digitaal boekje, elke dag handig en niet alleen bij nood."
      },
      {
        "t": "Dierenartsen en asielen op de kaart",
        "x": "Vind de adressen om je heen, zie wie 24 uur per dag open is voor spoedgevallen en waar je een gevonden dier naartoe kunt brengen. Bij dierenartsenpraktijken kun je ook een afspraak aanvragen."
      },
      {
        "t": "Zoekmodus",
        "x": "Zet de zoekmodus aan om mee te helpen bij zoekacties in de buurt en klim in de ranglijst van de actiefste vrijwilligers van de community."
      }
    ],
    "featsCta": "Bekijk alle functies",
    "adoptEyebrow": "Adoptie",
    "adoptTitle": "Niet alleen terugvinden: ook adopteren",
    "adoptText": "Orma is er niet alleen om terug te vinden wie kwijt is. In het adoptiegedeelte vind je honden, katten en andere dieren die een gezin zoeken, in de asielen en opvangcentra die wij gecontroleerd hebben. Je bekijkt hun pagina's, leert hun verhaal kennen en neemt contact op met de opvang: nog een manier om een leven te veranderen.",
    "adoptCta": "Ontdek de adopties",
    "adoptPoints": [
      "Gecontroleerde asielen en opvangcentra",
      "Pagina's met foto's en verhaal",
      "Rechtstreeks contact met de opvang"
    ],
    "reunitedEyebrow": "Goede afloop",
    "reunitedTitle": "Elke thuiskomst is een verhaal",
    "reunitedText": "Wanneer een dier zijn gezin terugvindt, wordt dat op Orma een verhaal met een goede afloop om samen te vieren. Zij zijn de reden dat dit allemaal bestaat.",
    "vetsEyebrow": "Voor dierenartsen en opvang",
    "vetsTitle": "Ben je dierenarts of run je een asiel? Laat je vinden.",
    "vetsText": "Orma laat je op de kaart zien aan wie hulp zoekt: wie een dier vindt, brengt het naar jou; wie een spoedgeval heeft, vindt je meteen. Je aanmelden kost vijf minuten.",
    "vetsPoints": [
      "Zichtbaar op de kaart",
      "Afspraakaanvragen vanuit de app",
      "Afgiftepunt of 24-uurs spoeddienst"
    ],
    "vetsCta": "Schrijf ons",
    "downloadTitle": "Je vriend wacht op je",
    "downloadSub": "Orma komt eerst op Android en daarna op iOS. Sluit je aan bij de community en help elk dier om thuis te komen.",
    "btnAndroid": "Downloaden via Google Play",
    "btnIos": "Binnenkort in de App Store"
  },
  "pl": {
    "title": "Orma — aplikacja na zaginione zwierzęta | Zaginiony pies lub kot",
    "metaDesc": "Aplikacja do zgłaszania i odnajdywania zaginionych psów i kotów: powiadomienia dla osób w pobliżu, zgłoszenia ze zdjęciami, dopasowanie po mikroczipie. Prywatność na pierwszym miejscu.",
    "heroEyebrow": "Aplikacja dla zwierząt zaginionych, znalezionych i do adopcji",
    "heroTitle": "Odnajdź swojego przyjaciela",
    "heroSub": "Orma łączy osoby, które zgubiły zwierzaka, z tymi, które go zauważyły albo znalazły. Zgłaszasz w kilku dotknięciach, dostajesz powiadomienia, gdy coś dzieje się w pobliżu, a kontakt trzymasz bezpiecznie na czacie w aplikacji.",
    "heroCta1": "Pobierz aplikację Orma",
    "heroCta2": "Zobacz, jak to działa",
    "heroProof": "Społeczność, która podaje łapę — miasto po mieście.",
    "trust": [
      "Dane w Europie",
      "Prywatność od podstaw",
      "Made in Italy"
    ],
    "animalsTitle": "Orma jest dla każdego zwierzaka",
    "animalsSub": "Psy i koty, oczywiście, ale też króliki, ptaki, gryzonie i wszyscy pozostali. Jeśli ktoś ich kocha, mają tu swoje miejsce: zaginione, znalezione, porzucone albo szukające rodziny.",
    "animals": [
      {
        "key": "dog",
        "label": "Psy"
      },
      {
        "key": "cat",
        "label": "Koty"
      },
      {
        "key": "rabbit",
        "label": "Króliki"
      },
      {
        "key": "bird",
        "label": "Ptaki"
      },
      {
        "key": "rodent",
        "label": "Gryzonie"
      },
      {
        "key": "reptile",
        "label": "Gady"
      },
      {
        "key": "horse",
        "label": "Konie"
      },
      {
        "key": "more",
        "label": "i inne"
      }
    ],
    "stepsEyebrow": "Jak to działa",
    "stepsTitle": "Trzy kroki do domu",
    "steps": [
      {
        "t": "Zgłoś",
        "x": "Zgubił ci się zwierzak? Dodaj zgłoszenie ze zdjęciem, opisem i ostatnim znanym miejscem. W kilka sekund zobaczy je społeczność z twojej okolicy."
      },
      {
        "t": "Zauważ",
        "x": "Widziałeś zwierzę, które wygląda na zagubione, albo jakieś znalazłeś? Dodaj obserwację ze zdjęciem i miejscem, w którym było. Nawet jedno zgłoszenie może wszystko zmienić."
      },
      {
        "t": "Odnajdź",
        "x": "Orma powiadamia cię, kiedy zgłoszenie z okolicy może pasować. Napiszcie na bezpiecznym czacie, sprawdźcie razem szczegóły i umówcie powrót do domu."
      }
    ],
    "stepsCta": "Przeczytaj całą historię",
    "featEyebrow": "Funkcje",
    "featTitle": "Wszystko, co potrzebne — nic ponad to",
    "featLead": "Niezbędne narzędzia, zaprojektowane wokół prywatności i szybkości. Bez ozdobników: tylko to, co pomaga zwierzakowi wrócić do domu.",
    "feats": [
      {
        "t": "Zgłoś zaginięcie, znalezienie lub porzucenie",
        "x": "W kilku dotknięciach dodajesz zgłoszenie zwierzaka zaginionego, znalezionego lub porzuconego — ze zdjęciem, opisem i ostatnim miejscem. Zgłoszenie jest aktywne przez 90 dni, potem automatycznie trafia do archiwum."
      },
      {
        "t": "Mapa z ochroną prywatności",
        "x": "Widzisz zaginięcia i obserwacje wokół siebie na mapie. Żeby chronić osobę zgłaszającą, na publicznej mapie miejsce jest rozmyte o około 150 metrów: pomagasz, nie ujawniając dokładnych adresów."
      },
      {
        "t": "Powiadomienia z twojej okolicy",
        "x": "Włącz powiadomienia i dostaniesz sygnał, gdy ktoś doda zgłoszenie w twojej okolicy. Pierwsze minuty liczą się najbardziej, a ty już o nich wiesz."
      },
      {
        "t": "Obserwacje ze zdjęciami",
        "x": "Widziałeś zwierzę, które wygląda na zagubione? Dodaj obserwację ze zdjęciem i miejscem: kto szuka, od razu rozpozna swojego zwierzaka, nawet z jednego zgłoszenia."
      },
      {
        "t": "Możliwe dopasowania i mikroczip",
        "x": "Orma zestawia zgłoszenia zaginionych i znalezionych i podpowiada możliwe dopasowania — „czy to przypadkiem twój?”. Jeśli jest dostępny numer mikroczipa, powiązanie jest jeszcze pewniejsze."
      },
      {
        "t": "Bezpieczny czat",
        "x": "Skontaktuj się z osobą, która dodała zgłoszenie, bezpośrednio w aplikacji, bez wymiany numeru telefonu czy adresu e-mail, dopóki sam tego nie zechcesz."
      },
      {
        "t": "Ulotka PDF z kodem QR",
        "x": "Jednym dotknięciem tworzysz ulotkę PDF gotową do druku, z kodem QR zgłoszenia. Kto ją znajdzie, skanuje kod i otwiera aktualną kartę zwierzaka."
      },
      {
        "t": "Adopcje ze sprawdzonych schronisk",
        "x": "Przeglądaj zwierzęta szukające domu w schroniskach i fundacjach sprawdzonych przez nas. Weryfikujemy placówki najlepiej, jak potrafimy, żebyś miał pewniejsze punkty odniesienia, kiedy decydujesz się na adopcję."
      },
      {
        "t": "Zawieszka QR i cyfrowa obroża",
        "x": "Przypnij zawieszkę Orma do obroży swojego zwierzaka. Kto go znajdzie, zeskanuje ją i od razu otworzy jego kartę, żeby cię powiadomić — bez ujawniania twojego telefonu i adresu."
      },
      {
        "t": "Cyfrowa książeczka zdrowia",
        "x": "Miej pod ręką szczepienia, wagę i przypomnienia swojego zwierzaka: prosta cyfrowa książeczka, przydatna na co dzień, a nie tylko w nagłym wypadku."
      },
      {
        "t": "Weterynarze i schroniska na mapie",
        "x": "Znajdź placówki wokół siebie, sprawdź, kto przyjmuje w nagłych wypadkach całą dobę i gdzie zawieźć znalezione zwierzę. W lecznicach możesz też poprosić o termin wizyty."
      },
      {
        "t": "Tryb poszukiwacza",
        "x": "Włącz tryb poszukiwacza, żeby pomagać w poszukiwaniach w okolicy i piąć się w rankingu najbardziej aktywnych wolontariuszy społeczności."
      }
    ],
    "featsCta": "Zobacz wszystkie funkcje",
    "adoptEyebrow": "Adopcje",
    "adoptTitle": "Nie tylko odnajdywać: także adoptować",
    "adoptText": "Orma to nie tylko odnajdywanie tych, którzy się zgubili. W sekcji adopcji znajdziesz psy, koty i inne zwierzęta szukające rodziny w schroniskach i fundacjach sprawdzonych przez nas. Przeglądasz karty, poznajesz ich historię i kontaktujesz się z placówką: jeszcze jeden sposób, żeby odmienić czyjeś życie.",
    "adoptCta": "Zobacz adopcje",
    "adoptPoints": [
      "Sprawdzone schroniska i fundacje",
      "Karty ze zdjęciami i historią",
      "Bezpośredni kontakt z placówką"
    ],
    "reunitedEyebrow": "Szczęśliwe zakończenia",
    "reunitedTitle": "Każdy powrót do domu to osobna historia",
    "reunitedText": "Kiedy zwierzę odnajduje swoją rodzinę, w aplikacji Orma staje się to szczęśliwym zakończeniem, które świętujemy razem. To dla nich powstało to wszystko.",
    "vetsEyebrow": "Dla weterynarzy i placówek",
    "vetsTitle": "Masz lecznicę albo schronisko? Daj się znaleźć.",
    "vetsText": "Orma pokazuje cię na mapie tym, którzy szukają pomocy: kto znajdzie zwierzę, przywiezie je do ciebie, kto ma nagły wypadek, od razu cię znajdzie. Dołączenie zajmuje pięć minut.",
    "vetsPoints": [
      "Widoczność na mapie",
      "Prośby o wizytę prosto z aplikacji",
      "Punkt przyjęć albo dyżur całodobowy"
    ],
    "vetsCta": "Napisz do nas",
    "downloadTitle": "Twój przyjaciel na ciebie czeka",
    "downloadSub": "Orma trafia najpierw na Androida, potem na iOS. Dołącz do społeczności i pomóż każdemu zwierzakowi wrócić do domu.",
    "btnAndroid": "Pobierz z Google Play",
    "btnIos": "Wkrótce w App Store"
  },
  "sv": {
    "title": "Orma — App för bortsprungna djur | Hitta din vän",
    "metaDesc": "App för att anmäla och hitta bortsprungna hundar och katter: varning till människorna i närheten, observationer med foto, matchning via id-märkning. Integriteten först.",
    "heroEyebrow": "App för bortsprungna, upphittade och adoptionsklara djur",
    "heroTitle": "Hitta din vän",
    "heroSub": "Orma kopplar ihop den som har tappat bort ett djur med den som har sett eller hittat det. Du anmäler med några få tryck, får en avisering när något rör sig nära dig och håller kontakten tryggt i appens chatt.",
    "heroCta1": "Ladda ner Orma",
    "heroCta2": "Se hur det fungerar",
    "heroProof": "En gemenskap som räcker fram en tass, ort för ort.",
    "trust": [
      "Data inom EU",
      "Inbyggd integritet",
      "Made in Italy"
    ],
    "animalsTitle": "Orma är till för alla djur",
    "animalsSub": "Hundar och katter förstås, men också kaniner, fåglar, gnagare och alla de andra. Om någon håller av dem har de en plats här: bortsprungna, upphittade, övergivna eller på jakt efter en familj.",
    "animals": [
      {
        "key": "dog",
        "label": "Hundar"
      },
      {
        "key": "cat",
        "label": "Katter"
      },
      {
        "key": "rabbit",
        "label": "Kaniner"
      },
      {
        "key": "bird",
        "label": "Fåglar"
      },
      {
        "key": "rodent",
        "label": "Gnagare"
      },
      {
        "key": "reptile",
        "label": "Reptiler"
      },
      {
        "key": "horse",
        "label": "Hästar"
      },
      {
        "key": "more",
        "label": "och fler"
      }
    ],
    "stepsEyebrow": "Så fungerar det",
    "stepsTitle": "Tre steg hem",
    "steps": [
      {
        "t": "Anmäl",
        "x": "Har din vän sprungit bort? Skapa en anmälan med foto, beskrivning och senast kända plats. På några sekunder ser gemenskapen i ditt område den."
      },
      {
        "t": "Tipsa",
        "x": "Har du sett ett djur som verkar bortsprunget, eller hittat ett? Lägg upp en observation med ett foto och platsen där det var. Även ett enda tips kan göra skillnad."
      },
      {
        "t": "Hitta hem",
        "x": "Orma varnar dig när en anmälan i närheten kan stämma. Skriv i den trygga chatten, stäm av detaljerna tillsammans och planera hemresan."
      }
    ],
    "stepsCta": "Läs hela historien",
    "featEyebrow": "Funktioner",
    "featTitle": "Allt som behövs, inget överflödigt",
    "featLead": "Nödvändiga verktyg, byggda kring integritet och snabbhet. Inget krimskrams: bara det som hjälper ett djur hem igen.",
    "feats": [
      {
        "t": "Anmäl bortsprunget, upphittat eller övergivet",
        "x": "Skapa på några tryck en anmälan om ett bortsprunget, upphittat eller övergivet djur, med foto, beskrivning och senast kända plats. Anmälan är aktiv i 90 dagar och arkiveras sedan automatiskt."
      },
      {
        "t": "Karta med integritet",
        "x": "Se bortsprungna djur och observationer runt omkring dig på en karta. För att skydda den som anmäler görs platsen på den öppna kartan otydlig med omkring 150 meter: du hjälper till utan att exakta adresser avslöjas."
      },
      {
        "t": "Aviseringar nära dig",
        "x": "Slå på aviseringarna och få veta när någon lägger upp en anmälan i ditt område. De första minuterna räknas — och du vet redan om dem."
      },
      {
        "t": "Observationer med foto",
        "x": "Har du sett ett djur som verkar bortsprunget? Lägg upp en observation med foto och plats: den som letar känner genast igen sitt djur, även från ett enda tips."
      },
      {
        "t": "Möjliga träffar och id-märkning",
        "x": "Orma jämför bortsprungna och upphittade djur och föreslår möjliga träffar — \"är det kanske ditt?\". Finns chipnumret med blir kopplingen ännu säkrare."
      },
      {
        "t": "Trygg chatt",
        "x": "Ta kontakt med den som lagt upp en anmälan direkt i appen, utan att byta telefonnummer eller e-post förrän du själv bestämmer det."
      },
      {
        "t": "PDF-affisch med QR-kod",
        "x": "Skapa med ett tryck en färdig affisch i PDF att skriva ut, med anmälans QR-kod. Den som hittar den skannar koden och öppnar djurets uppdaterade sida."
      },
      {
        "t": "Adoption från kontrollerade djurhem",
        "x": "Bläddra bland djuren som söker hem på de djurhem som Orma har kontrollerat. Vi granskar verksamheterna så gott vi kan, så att du har tryggare hållpunkter när du väljer att adoptera."
      },
      {
        "t": "QR-bricka och digitalt halsband",
        "x": "Sätt en Orma-bricka på din väns halsband. Den som hittar djuret skannar den och öppnar sidan direkt för att nå dig — utan att du behöver lämna ut telefonnummer eller adress."
      },
      {
        "t": "Digitalt hälsokort",
        "x": "Ha vaccinationer, vikt och påminnelser för ditt djur med dig: ett enkelt digitalt hälsokort, användbart varje dag och inte bara när det brinner."
      },
      {
        "t": "Veterinärer och djurhem på kartan",
        "x": "Hitta verksamheterna runt omkring dig, se vem som har akutjour dygnet runt och vart du kan lämna ett upphittat djur. Från veterinärmottagningarna kan du också be om en tid."
      },
      {
        "t": "Sökarläge",
        "x": "Slå på sökarläget för att hjälpa till i sökningarna i ditt område och klättra på listan över gemenskapens mest aktiva frivilliga."
      }
    ],
    "featsCta": "Se alla funktioner",
    "adoptEyebrow": "Adoption",
    "adoptTitle": "Inte bara hitta tillbaka: också adoptera",
    "adoptText": "Orma finns inte bara till för att hitta den som sprungit bort. I adoptionsdelen hittar du hundar, katter och andra djur som söker en familj på de djurhem vi har kontrollerat. Du bläddrar bland sidorna, lär känna deras historia och kontaktar djurhemmet: ett sätt till att förändra ett liv.",
    "adoptCta": "Upptäck adoptionerna",
    "adoptPoints": [
      "Kontrollerade djurhem",
      "Sidor med foto och historia",
      "Direktkontakt med djurhemmet"
    ],
    "reunitedEyebrow": "Lyckliga slut",
    "reunitedTitle": "Varje hemkomst är en historia",
    "reunitedText": "När ett djur hittar tillbaka till sin familj blir det på Orma ett lyckligt slut att fira tillsammans. Det är de som är hela anledningen till att det här finns.",
    "vetsEyebrow": "För veterinärer och verksamheter",
    "vetsTitle": "Är du veterinär eller driver du ett djurhem? Låt dig hittas.",
    "vetsText": "Orma visar dig på kartan för den som söker hjälp: den som hittar ett djur tar det till dig, den som har ett akutfall hittar dig direkt. Att komma igång tar fem minuter.",
    "vetsPoints": [
      "Synlighet på kartan",
      "Tidsförfrågningar från appen",
      "Inlämningsställe eller akutjour dygnet runt"
    ],
    "vetsCta": "Skriv till oss",
    "downloadTitle": "Din vän väntar på dig",
    "downloadSub": "Orma kommer först till Android och sedan till iOS. Gå med i gemenskapen och hjälp varje djur hem igen.",
    "btnAndroid": "Ladda ned på Google Play",
    "btnIos": "Snart på App Store"
  }
};

// ----------------------------------------------------------------------------
// Pagine dedicate "Come funziona" e "Funzionalità" — intro editoriale extra.
// (riusano gli array steps/feats di HOME, con un cappello introduttivo proprio)
// ----------------------------------------------------------------------------
export const HOWITWORKS = {
  "es": {
    "title": "Cómo encontrar un animal perdido — Cómo funciona Orma",
    "metaDesc": "Cómo encontrar un perro o un gato perdido: del primer aviso a la vuelta a casa, los tres pasos de Orma explicados con calma.",
    "eyebrow": "Guía",
    "h1": "Cómo funciona",
    "lead": "Orma no promete milagros: es una herramienta. Pero es una herramienta construida alrededor de los minutos que cuentan, cuando un animal se aleja y cada par de ojos de más puede cambiar el final. Así se mueve la comunidad, paso a paso.",
    "closingTitle": "Sin garantías, con mucha comunidad",
    "closingText": "Orma ayuda, no garantiza: ninguna app puede asegurar que un animal aparezca. Lo que sí podemos hacer es poner en contacto a las personas adecuadas, deprisa y respetando la privacidad. El resto lo hace una comunidad que echa una pata."
  },
  "fr": {
    "title": "Comment retrouver un animal perdu — Comment fonctionne Orma",
    "metaDesc": "Comment retrouver un chien ou un chat perdu : de la première alerte au retour à la maison, les trois étapes d'Orma expliquées calmement.",
    "eyebrow": "Guide",
    "h1": "Comment ça marche",
    "lead": "Orma ne promet pas de miracles : c'est un outil. Mais un outil construit autour des minutes qui comptent, quand un animal s'éloigne et que chaque paire d'yeux en plus peut changer la fin. Voici comment la communauté se met en mouvement, étape par étape.",
    "closingTitle": "Aucune garantie, beaucoup de communauté",
    "closingText": "Orma aide, mais ne garantit pas : aucune application ne peut assurer des retrouvailles. Ce que nous pouvons faire, c'est mettre en relation les bonnes personnes, vite et dans le respect de la vie privée. Le reste, c'est une communauté qui donne un coup de patte."
  },
  "de": {
    "title": "Wie man ein vermisstes Tier wiederfindet — So funktioniert Orma",
    "metaDesc": "Wie du einen vermissten Hund oder eine vermisste Katze wiederfindest: von der ersten Meldung bis zur Heimkehr, die drei Schritte von Orma in Ruhe erklärt.",
    "eyebrow": "Ratgeber",
    "h1": "So funktioniert es",
    "lead": "Orma verspricht keine Wunder: Es ist ein Werkzeug. Aber ein Werkzeug, das rund um die Minuten gebaut ist, die zählen — wenn ein Tier sich entfernt und jedes zusätzliche Augenpaar das Ende verändern kann. So bewegt sich die Gemeinschaft, Schritt für Schritt.",
    "closingTitle": "Keine Garantien, viel Gemeinschaft",
    "closingText": "Orma hilft, garantiert aber nicht: Keine App kann ein Wiederfinden zusichern. Was wir tun können, ist die richtigen Menschen schnell und datenschutzgerecht zusammenzubringen. Den Rest macht eine Gemeinschaft, die eine Pfote reicht."
  },
  "pt": {
    "title": "Como encontrar um animal perdido — Como funciona a Orma",
    "metaDesc": "Como encontrar um cão ou um gato perdido: do primeiro alerta ao regresso a casa, os três passos da Orma explicados com calma.",
    "eyebrow": "Guia",
    "h1": "Como funciona",
    "lead": "A Orma não promete milagres: é uma ferramenta. Mas é uma ferramenta construída à volta dos minutos que contam, quando um animal se afasta e cada par de olhos a mais pode mudar o final. Eis como a comunidade se move, passo a passo.",
    "closingTitle": "Nenhuma garantia, muita comunidade",
    "closingText": "A Orma ajuda, não garante: nenhuma aplicação pode assegurar um reencontro. O que podemos fazer é ligar as pessoas certas, depressa e respeitando a privacidade. O resto fá-lo uma comunidade que dá uma pata."
  },
  "ro": {
    "title": "Cum găsești un animal pierdut — Cum funcționează Orma",
    "metaDesc": "Cum găsești un câine sau o pisică pierdută: de la prima alertă până la întoarcerea acasă, cei trei pași ai Orma explicați pe îndelete.",
    "eyebrow": "Ghid",
    "h1": "Cum funcționează",
    "lead": "Orma nu promite minuni: este un instrument. Dar este un instrument construit în jurul minutelor care contează, când un animal se îndepărtează și fiecare pereche de ochi în plus poate schimba finalul. Iată cum se mișcă comunitatea, pas cu pas.",
    "closingTitle": "Nicio garanție, multă comunitate",
    "closingText": "Orma ajută, nu garantează: nicio aplicație nu poate asigura o regăsire. Ceea ce putem face este să punem în legătură oamenii potriviți, repede și cu respect pentru confidențialitate. Restul îl face o comunitate care întinde o labă."
  },
  "it": {
    "title": "Come ritrovare un animale smarrito — Come funziona Orma",
    "metaDesc": "Come ritrovare un cane o un gatto smarrito: dal primo avviso al ritorno a casa, i tre passi di Orma spiegati con calma.",
    "eyebrow": "Guida",
    "h1": "Come funziona",
    "lead": "Orma non promette miracoli: è uno strumento. Ma è uno strumento costruito intorno ai minuti che contano, quando un animale si allontana e ogni occhio in più può cambiare il finale. Ecco come si muove la community, passo dopo passo.",
    "closingTitle": "Niente garanzie, molta community",
    "closingText": "Orma aiuta, non garantisce: nessuna app può assicurare un ritrovamento. Quello che possiamo fare è mettere in contatto le persone giuste, in fretta e nel rispetto della privacy. Il resto lo fa una community che si dà una zampa."
  },
  "en": {
    "title": "How to find a lost pet — How Orma works",
    "metaDesc": "How to find a lost dog or cat: from the first alert to the way home, the three steps of Orma explained calmly.",
    "eyebrow": "Guide",
    "h1": "How it works",
    "lead": "Orma promises no miracles: it is a tool. But it is a tool built around the minutes that matter, when an animal wanders off and every extra pair of eyes can change the ending. Here is how the community moves, step by step.",
    "closingTitle": "No guarantees, plenty of community",
    "closingText": "Orma helps, it does not guarantee: no app can ensure a reunion. What we can do is connect the right people, fast and with respect for privacy. The rest is done by a community that lends a paw."
  },
  "cs": {
    "title": "Jak najít ztracené zvíře — Jak funguje Orma",
    "metaDesc": "Jak najít ztraceného psa nebo kočku: od prvního upozornění až po návrat domů, tři kroky aplikace Orma v klidu vysvětlené.",
    "eyebrow": "Návod",
    "h1": "Jak to funguje",
    "lead": "Orma neslibuje zázraky: je to nástroj. Ale nástroj postavený kolem minut, na kterých záleží — když se zvíře zatoulá a každý pár očí navíc může změnit konec příběhu. Takhle se komunita hýbe, krok za krokem.",
    "closingTitle": "Žádné záruky, hodně komunity",
    "closingText": "Orma pomáhá, nezaručuje: žádná aplikace nemůže slíbit, že se zvíře najde. Co umíme, je rychle a s respektem k soukromí propojit ty správné lidi. Zbytek udělá komunita, která si podá tlapu."
  },
  "da": {
    "title": "Sådan finder du et savnet kæledyr — sådan virker Orma",
    "metaDesc": "Sådan finder du en savnet hund eller kat: fra den første besked til turen hjem — Ormas tre skridt forklaret i ro og mag.",
    "eyebrow": "Guide",
    "h1": "Sådan virker det",
    "lead": "Orma lover ingen mirakler: det er et værktøj. Men et værktøj, der er bygget op om de minutter, der tæller, når et dyr forsvinder, og hvor hvert ekstra par øjne kan ændre slutningen. Sådan bevæger fællesskabet sig, skridt for skridt.",
    "closingTitle": "Ingen garantier, masser af fællesskab",
    "closingText": "Orma hjælper, men garanterer ikke: ingen app kan love, at et dyr bliver fundet. Det, vi kan gøre, er at sætte de rigtige mennesker i forbindelse med hinanden, hurtigt og med respekt for privatlivet. Resten klarer et fællesskab, der giver en pote."
  },
  "el": {
    "title": "Πώς να βρεις ένα χαμένο ζώο — Πώς λειτουργεί το Orma",
    "metaDesc": "Πώς να βρεις έναν χαμένο σκύλο ή μια χαμένη γάτα: από την πρώτη ειδοποίηση μέχρι την επιστροφή στο σπίτι, τα τρία βήματα του Orma με απλά λόγια.",
    "eyebrow": "Οδηγός",
    "h1": "Πώς λειτουργεί",
    "lead": "Το Orma δεν υπόσχεται θαύματα: είναι ένα εργαλείο. Είναι όμως ένα εργαλείο φτιαγμένο γύρω από τα λεπτά που μετράνε, όταν ένα ζώο απομακρύνεται και κάθε ζευγάρι μάτια παραπάνω μπορεί να αλλάξει το τέλος. Να πώς κινείται η κοινότητα, βήμα βήμα.",
    "closingTitle": "Καμία εγγύηση, πολλή κοινότητα",
    "closingText": "Το Orma βοηθάει, δεν εγγυάται: καμία εφαρμογή δεν μπορεί να διασφαλίσει ότι ένα ζώο θα βρεθεί. Αυτό που μπορούμε να κάνουμε είναι να φέρουμε σε επαφή τους σωστούς ανθρώπους, γρήγορα και με σεβασμό στο απόρρητο. Τα υπόλοιπα τα κάνει μια κοινότητα που δίνει μια πατούσα."
  },
  "hr": {
    "title": "Kako pronaći izgubljenu životinju — Kako radi Orma",
    "metaDesc": "Kako pronaći izgubljenog psa ili mačku: od prve obavijesti do povratka kući, tri koraka Orme objašnjena mirno i jasno.",
    "eyebrow": "Vodič",
    "h1": "Kako radi",
    "lead": "Orma ne obećava čuda: ona je alat. Ali alat izgrađen oko minuta koje su najvažnije, kad se životinja udalji i svaki par očiju više može promijeniti kraj priče. Evo kako se zajednica pokreće, korak po korak.",
    "closingTitle": "Bez jamstava, s puno zajednice",
    "closingText": "Orma pomaže, ali ne jamči: nijedna aplikacija ne može osigurati pronalazak. Ono što možemo jest brzo povezati prave ljude, uz poštovanje privatnosti. Ostalo čini zajednica koja pruža šapu."
  },
  "hu": {
    "title": "Hogyan találj meg egy elveszett állatot — Így működik az Orma",
    "metaDesc": "Hogyan találj meg egy elveszett kutyát vagy macskát: az első értesítéstől a hazatérésig, az Orma három lépése nyugodtan elmagyarázva.",
    "eyebrow": "Útmutató",
    "h1": "Hogyan működik",
    "lead": "Az Orma nem ígér csodát: ez egy eszköz. De olyan eszköz, amely a döntő percek köré épült — amikor egy állat elkóborol, és minden újabb szempár megváltoztathatja a végét. Így mozdul a közösség, lépésről lépésre.",
    "closingTitle": "Semmi garancia, annál több közösség",
    "closingText": "Az Orma segít, nem garantál: egyetlen app sem ígérhet biztos megtalálást. Amit tehetünk: gyorsan és a magánélet tiszteletben tartásával összekötjük a megfelelő embereket. A többit egy közösség teszi, amely mancsot nyújt."
  },
  "nl": {
    "title": "Een vermist huisdier terugvinden — Zo werkt Orma",
    "metaDesc": "Hoe vind je een vermiste hond of kat terug: van het eerste bericht tot de thuiskomst, de drie stappen van Orma rustig uitgelegd.",
    "eyebrow": "Gids",
    "h1": "Hoe het werkt",
    "lead": "Orma belooft geen wonderen: het is een hulpmiddel. Maar wel een hulpmiddel dat gebouwd is rond de minuten die tellen, wanneer een dier wegloopt en elk extra paar ogen de afloop kan veranderen. Zo beweegt de community, stap voor stap.",
    "closingTitle": "Geen garanties, wel veel community",
    "closingText": "Orma helpt, maar geeft geen garantie: geen enkele app kan een terugvinden verzekeren. Wat wij wel kunnen doen, is de juiste mensen snel en met respect voor privacy met elkaar in contact brengen. De rest doet een community die een pootje helpt."
  },
  "pl": {
    "title": "Jak odnaleźć zaginione zwierzę — jak działa Orma",
    "metaDesc": "Jak odnaleźć zaginionego psa lub kota: od pierwszego powiadomienia do powrotu do domu — trzy kroki aplikacji Orma wytłumaczone spokojnie.",
    "eyebrow": "Poradnik",
    "h1": "Jak to działa",
    "lead": "Orma nie obiecuje cudów: to narzędzie. Ale narzędzie zbudowane wokół minut, które się liczą — kiedy zwierzak się oddala, a każda dodatkowa para oczu może zmienić zakończenie. Oto jak porusza się społeczność, krok po kroku.",
    "closingTitle": "Żadnych gwarancji, dużo społeczności",
    "closingText": "Orma pomaga, ale nie gwarantuje: żadna aplikacja nie zapewni odnalezienia. To, co możemy zrobić, to szybko i z poszanowaniem prywatności połączyć właściwe osoby. Resztę robi społeczność, która podaje łapę."
  },
  "sv": {
    "title": "Så hittar du en bortsprungen hund eller katt — Så fungerar Orma",
    "metaDesc": "Så hittar du en bortsprungen hund eller borttappad katt: från den första varningen till hemkomsten, Ormas tre steg lugnt förklarade.",
    "eyebrow": "Guide",
    "h1": "Så fungerar det",
    "lead": "Orma lovar inga mirakel: det är ett verktyg. Men ett verktyg byggt kring minuterna som räknas, när ett djur springer iväg och varje par ögon till kan ändra slutet. Så här rör sig gemenskapen, steg för steg.",
    "closingTitle": "Inga garantier, mycket gemenskap",
    "closingText": "Orma hjälper, det garanterar inte: ingen app kan lova att ett djur hittas. Det vi kan göra är att snabbt föra samman rätt människor, med respekt för integriteten. Resten sköter en gemenskap som räcker fram en tass."
  }
};

export const FEATURES = {
  "es": {
    "title": "App para avisar de animales perdidos y encontrados — Funciones de Orma",
    "metaDesc": "App para animales perdidos: mapa con privacidad, alertas cerca de ti, chat seguro, coincidencia por microchip y adopciones verificadas.",
    "eyebrow": "Funciones",
    "h1": "Todo lo que hace falta, nada de más",
    "lead": "Hemos quitado todo lo que no servía. Lo que queda son herramientas esenciales, cada una pensada para un momento concreto de la búsqueda, y cada una con la privacidad como ajuste de partida, no como añadido posterior.",
    "privacyTitle": "La privacidad no es una función: es el punto de partida",
    "privacyText": "Tus datos no se venden. La posición en el mapa público siempre aparece difuminada unos 150 metros. Los servidores de datos están en la Unión Europea, en Estocolmo."
  },
  "fr": {
    "title": "Application pour signaler animaux perdus et trouvés — Fonctions d'Orma",
    "metaDesc": "Application pour animaux perdus : carte respectueuse de la vie privée, alertes près de chez vous, messagerie sécurisée, correspondance par puce et adoptions vérifiées.",
    "eyebrow": "Fonctionnalités",
    "h1": "Tout ce qu'il faut, rien de superflu",
    "lead": "Nous avons retiré tout ce qui n'était pas nécessaire. Ce qui reste, ce sont des outils essentiels, chacun pensé pour un moment précis de la recherche — et chacun avec la confidentialité comme réglage par défaut, non comme arrière-pensée.",
    "privacyTitle": "La confidentialité n'est pas une fonctionnalité : c'est le point de départ",
    "privacyText": "Vos données ne sont pas vendues. La position sur la carte publique est toujours floutée d'environ 150 mètres. Les serveurs qui hébergent les données se trouvent dans l'Union européenne, à Stockholm."
  },
  "de": {
    "title": "App zum Melden vermisster und gefundener Tiere — Funktionen von Orma",
    "metaDesc": "App für vermisste Tiere: Karte mit Datenschutz, Benachrichtigungen in deiner Nähe, sicherer Chat, Abgleich über den Mikrochip und geprüfte Vermittlung.",
    "eyebrow": "Funktionen",
    "h1": "Alles, was nötig ist — und nichts darüber hinaus",
    "lead": "Wir haben alles weggelassen, was nicht gebraucht wurde. Übrig bleiben grundlegende Werkzeuge, jedes für einen bestimmten Moment der Suche gedacht — und jedes mit Datenschutz als Voreinstellung, nicht als nachträglichem Einfall.",
    "privacyTitle": "Datenschutz ist keine Funktion: Er ist der Ausgangspunkt",
    "privacyText": "Deine Daten werden nicht verkauft. Der Standort auf der öffentlichen Karte ist immer um etwa 150 Meter unscharf gemacht. Die Server mit den Daten stehen in der Europäischen Union, in Stockholm."
  },
  "pt": {
    "title": "Aplicação para animais perdidos e encontrados — Funções da Orma",
    "metaDesc": "Aplicação para animais perdidos: mapa com privacidade, alertas perto de ti, chat seguro, correspondência por microchip e adoções verificadas.",
    "eyebrow": "Funcionalidades",
    "h1": "Tudo o que é preciso, nada a mais",
    "lead": "Cortámos tudo o que não era necessário. O que resta são ferramentas essenciais, cada uma pensada para um momento preciso da busca — e cada uma com a privacidade como definição predefinida, não como reflexão tardia.",
    "privacyTitle": "A privacidade não é uma funcionalidade: é o ponto de partida",
    "privacyText": "Os teus dados não são vendidos. A posição no mapa público está sempre desfocada em cerca de 150 metros. Os servidores com os dados estão na União Europeia, em Estocolmo."
  },
  "ro": {
    "title": "Aplicație pentru animale pierdute și găsite — Funcțiile Orma",
    "metaDesc": "Aplicație pentru animale pierdute: hartă care respectă confidențialitatea, alerte în apropierea ta, chat sigur, potrivire după microcip și adopții verificate.",
    "eyebrow": "Funcții",
    "h1": "Tot ce trebuie, nimic în plus",
    "lead": "Am tăiat tot ce nu era necesar. Ce rămâne sunt instrumente esențiale, fiecare gândit pentru un moment precis al căutării — și fiecare cu confidențialitatea ca setare implicită, nu ca gând de pe urmă.",
    "privacyTitle": "Confidențialitatea nu este o funcție: este punctul de plecare",
    "privacyText": "Datele tale nu sunt vândute. Poziția de pe harta publică este întotdeauna estompată cu aproximativ 150 de metri. Serverele cu datele se află în Uniunea Europeană, la Stockholm."
  },
  "it": {
    "title": "App per segnalare animali smarriti e trovati — Funzioni di Orma",
    "metaDesc": "App per animali smarriti: mappa con privacy, avvisi vicino a te, chat sicura, corrispondenza microchip e adozioni verificate.",
    "eyebrow": "Funzionalità",
    "h1": "Tutto quello che serve, niente di superfluo",
    "lead": "Abbiamo tagliato tutto ciò che non serviva. Quello che resta sono strumenti essenziali, ognuno pensato per un momento preciso della ricerca — e ognuno con la privacy come impostazione predefinita, non come ripensamento.",
    "privacyTitle": "La privacy non è una funzione: è il punto di partenza",
    "privacyText": "I tuoi dati non vengono venduti. La posizione sulla mappa pubblica è sempre offuscata di circa 150 metri. I server dei dati sono in Unione Europea, a Stoccolma."
  },
  "en": {
    "title": "App to report lost & found pets — Orma features",
    "metaDesc": "Lost pet app: privacy-first map, alerts near you, secure chat, microchip matches and verified adoptions.",
    "eyebrow": "Features",
    "h1": "Everything you need, nothing you don't",
    "lead": "We cut everything that did not belong. What remains are essential tools, each made for a precise moment in the search — and each with privacy as the default, not an afterthought.",
    "privacyTitle": "Privacy is not a feature: it is the starting point",
    "privacyText": "Your data is never sold. The location on the public map is always blurred by about 150 metres. Data servers are in the European Union, in Stockholm."
  },
  "cs": {
    "title": "Aplikace pro hlášení ztracených a nalezených zvířat — Funkce aplikace Orma",
    "metaDesc": "Aplikace pro ztracená zvířata: mapa se soukromím, upozornění ve tvém okolí, bezpečný chat, párování podle mikročipu a ověřené adopce.",
    "eyebrow": "Funkce",
    "h1": "Všechno, co potřebuješ, nic navíc",
    "lead": "Odstranili jsme všechno, co nebylo potřeba. Zůstaly základní nástroje, každý myšlený na konkrétní chvíli hledání — a každý se soukromím jako výchozím nastavením, ne jako dodatečným nápadem.",
    "privacyTitle": "Soukromí není funkce: je to výchozí bod",
    "privacyText": "Tvoje data se neprodávají. Poloha na veřejné mapě je vždycky rozostřená zhruba o 150 metrů. Servery s daty stojí v Evropské unii, ve Stockholmu."
  },
  "da": {
    "title": "App til at efterlyse savnede og fundne dyr — Ormas funktioner",
    "metaDesc": "App til savnede kæledyr: kort med privatliv, beskeder tæt på dig, sikker chat, match på mikrochip og godkendte adoptioner.",
    "eyebrow": "Funktioner",
    "h1": "Alt det, du har brug for — og intet andet",
    "lead": "Vi har skåret alt det væk, der ikke hørte til. Tilbage står kun det nødvendige, hvert værktøj tænkt til et bestemt øjeblik i eftersøgningen — og hvert med privatliv som standard, ikke som en eftertanke.",
    "privacyTitle": "Privatliv er ikke en funktion: det er udgangspunktet",
    "privacyText": "Dine data bliver ikke solgt. Stedet på det offentlige kort er altid sløret med cirka 150 meter. Dataserverne står i EU, i Stockholm."
  },
  "el": {
    "title": "Εφαρμογή για χαμένα ζώα και ζώα που βρέθηκαν — Λειτουργίες Orma",
    "metaDesc": "Εφαρμογή για χαμένα ζώα: χάρτης με προστασία απορρήτου, ειδοποιήσεις κοντά σου, ασφαλής συνομιλία, αντιστοίχιση μικροτσίπ και ελεγμένες υιοθεσίες.",
    "eyebrow": "Λειτουργίες",
    "h1": "Ό,τι χρειάζεσαι, τίποτα περιττό",
    "lead": "Κόψαμε ό,τι δεν χρειαζόταν. Αυτό που έμεινε είναι βασικά εργαλεία, φτιαγμένα το καθένα για μια συγκεκριμένη στιγμή της αναζήτησης — και το καθένα με το απόρρητο ως προεπιλογή, όχι ως δεύτερη σκέψη.",
    "privacyTitle": "Το απόρρητο δεν είναι λειτουργία: είναι η αφετηρία",
    "privacyText": "Τα δεδομένα σου δεν πωλούνται. Η τοποθεσία στον δημόσιο χάρτη είναι πάντα θολωμένη κατά περίπου 150 μέτρα. Οι διακομιστές των δεδομένων βρίσκονται στην Ευρωπαϊκή Ένωση, στη Στοκχόλμη."
  },
  "hr": {
    "title": "Aplikacija za prijavu izgubljenih i pronađenih životinja — Mogućnosti Orme",
    "metaDesc": "Aplikacija za izgubljene ljubimce: karta koja čuva privatnost, obavijesti u tvojoj blizini, siguran chat, podudaranje mikročipa i provjerena udomljavanja.",
    "eyebrow": "Mogućnosti",
    "h1": "Sve što treba, ništa suvišno",
    "lead": "Izbacili smo sve što nije bilo potrebno. Ostali su osnovni alati, svaki osmišljen za točno određeni trenutak potrage — i svaki s privatnošću kao zadanom postavkom, a ne kao naknadnom mišlju.",
    "privacyTitle": "Privatnost nije mogućnost: ona je polazišna točka",
    "privacyText": "Tvoji se podaci ne prodaju. Lokacija na javnoj karti uvijek je zamućena za otprilike 150 metara. Poslužitelji s podacima nalaze se u Europskoj uniji, u Stockholmu."
  },
  "hu": {
    "title": "App elveszett és megtalált állatok bejelentésére — Az Orma funkciói",
    "metaDesc": "App elveszett állatokhoz: adatvédő térkép, értesítések a közeledből, védett csevegés, mikrochip-egyezés és ellenőrzött örökbefogadás.",
    "eyebrow": "Funkciók",
    "h1": "Minden, ami kell — semmi fölösleges",
    "lead": "Kivágtunk mindent, ami nem tartozott ide. Ami maradt, alapvető eszközök: mindegyik a keresés egy-egy pontos pillanatára készült — és mindegyikben az adatvédelem az alapállapot, nem utólagos ötlet.",
    "privacyTitle": "Az adatvédelem nem funkció: ez a kiindulópont",
    "privacyText": "Az adataidat nem adjuk el. A nyilvános térképen a hely mindig körülbelül 150 méterrel el van mosva. Az adatszerverek az Európai Unióban, Stockholmban vannak."
  },
  "nl": {
    "title": "App om vermiste en gevonden dieren te melden — Functies van Orma",
    "metaDesc": "App voor vermiste huisdieren: kaart met privacy, bericht bij jou in de buurt, veilige chat, koppeling via de chip en gecontroleerde adopties.",
    "eyebrow": "Functies",
    "h1": "Alles wat nodig is, niets overbodigs",
    "lead": "We hebben alles weggelaten wat niet nodig was. Wat overblijft zijn essentiële hulpmiddelen, elk bedacht voor een precies moment in de zoektocht — en elk met privacy als standaardinstelling, niet als bijgedachte.",
    "privacyTitle": "Privacy is geen functie: het is het uitgangspunt",
    "privacyText": "Je gegevens worden niet verkocht. De plek op de openbare kaart is altijd ongeveer 150 meter vervaagd. De servers met de gegevens staan in de Europese Unie, in Stockholm."
  },
  "pl": {
    "title": "Zgłoszenia zaginionych i znalezionych zwierząt — funkcje aplikacji Orma",
    "metaDesc": "Aplikacja na zaginione zwierzęta: mapa z ochroną prywatności, powiadomienia z twojej okolicy, bezpieczny czat, dopasowanie po mikroczipie i sprawdzone adopcje.",
    "eyebrow": "Funkcje",
    "h1": "Wszystko, co potrzebne — nic ponad to",
    "lead": "Wycięliśmy wszystko, co było zbędne. Zostały niezbędne narzędzia, każde pomyślane pod konkretny moment poszukiwań — i każde z prywatnością jako ustawieniem domyślnym, a nie dodatkiem po fakcie.",
    "privacyTitle": "Prywatność to nie funkcja: to punkt wyjścia",
    "privacyText": "Twoich danych nie sprzedajemy. Miejsce na publicznej mapie jest zawsze rozmyte o około 150 metrów. Serwery z danymi stoją w Unii Europejskiej, w Sztokholmie."
  },
  "sv": {
    "title": "App för att anmäla bortsprungna och upphittade djur — Ormas funktioner",
    "metaDesc": "App för bortsprungna djur: karta med integritet, aviseringar nära dig, trygg chatt, matchning via id-märkning och kontrollerade adoptioner.",
    "eyebrow": "Funktioner",
    "h1": "Allt som behövs, inget överflödigt",
    "lead": "Vi har skurit bort allt som inte hörde hit. Kvar finns de nödvändiga verktygen, vart och ett gjort för ett bestämt ögonblick i sökandet — och vart och ett med integriteten som förvalt läge, inte som en eftertanke.",
    "privacyTitle": "Integritet är inte en funktion: det är utgångspunkten",
    "privacyText": "Dina uppgifter säljs aldrig. Platsen på den öppna kartan görs alltid otydlig med omkring 150 meter. Servrarna med data står inom EU, i Stockholm."
  }
};

// ----------------------------------------------------------------------------
// /pet — stringhe UI della landing del QR (il rendering della scheda è client-side).
// ----------------------------------------------------------------------------
export const PET = {
  "es": {
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
  "fr": {
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
  "de": {
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
  "pt": {
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
  "ro": {
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
  "it": {
    "title": "Orma — Segnalazione",
    "loading": "Sto caricando la segnalazione…",
    "noidTitle": "Segnalazione non specificata",
    "noidText": "Questo link va aperto scansionando il QR di un volantino Orma. Manca il riferimento alla segnalazione.",
    "notfoundTitle": "Segnalazione non trovata",
    "notfoundText": "Questa segnalazione non esiste più o è stata chiusa. Le segnalazioni su Orma scadono e vengono archiviate dopo 90 giorni.",
    "errorTitle": "Qualcosa è andato storto",
    "errorText": "Non siamo riusciti a caricare la segnalazione. Controlla la connessione e riprova.",
    "retry": "Riprova",
    "discover": "Scopri Orma",
    "locationNote": "Per proteggere la privacy, la posizione mostrata è la zona approssimativa (offuscata di circa 150 metri), non l'indirizzo esatto.",
    "appBoxTitle": "Hai visto questo animale?",
    "appBoxText": "Apri la segnalazione in Orma per scrivere a chi l'ha pubblicata nella chat sicura e segnalare un avvistamento. L'app arriva presto: intanto puoi scoprire come funziona.",
    "locale": "it-IT"
  },
  "en": {
    "title": "Orma — Report",
    "loading": "Loading the report…",
    "noidTitle": "No report specified",
    "noidText": "This link is meant to be opened by scanning the QR code on an Orma flyer. The report reference is missing.",
    "notfoundTitle": "Report not found",
    "notfoundText": "This report no longer exists or has been closed. Reports on Orma expire and are archived after 90 days.",
    "errorTitle": "Something went wrong",
    "errorText": "We couldn't load the report. Check your connection and try again.",
    "retry": "Try again",
    "discover": "Discover Orma",
    "locationNote": "To protect privacy, the location shown is the approximate area (blurred by about 150 metres), not the exact address.",
    "appBoxTitle": "Have you seen this animal?",
    "appBoxText": "Open this report in Orma to message whoever posted it in the secure chat and report a sighting. The app is coming soon — in the meantime, see how it works.",
    "locale": "en-GB"
  },
  "cs": {
    "title": "Orma — Hlášení",
    "loading": "Načítám hlášení…",
    "noidTitle": "Hlášení není uvedené",
    "noidText": "Tenhle odkaz se otevírá načtením QR kódu z letáku Orma. Chybí odkaz na konkrétní hlášení.",
    "notfoundTitle": "Hlášení nenalezeno",
    "notfoundText": "Tohle hlášení už neexistuje nebo bylo uzavřeno. Hlášení v aplikaci Orma vyprší a po 90 dnech se archivují.",
    "errorTitle": "Něco se pokazilo",
    "errorText": "Hlášení se nám nepodařilo načíst. Zkontroluj připojení a zkus to znovu.",
    "retry": "Zkusit znovu",
    "discover": "Poznej aplikaci Orma",
    "locationNote": "Kvůli ochraně soukromí se zobrazuje přibližná oblast (rozostřená zhruba o 150 metrů), ne přesná adresa.",
    "appBoxTitle": "Viděl jsi tohle zvíře?",
    "appBoxText": "Otevři hlášení v aplikaci Orma, napiš v bezpečném chatu tomu, kdo ho zveřejnil, a nahlas spatření. Aplikace brzy přijde: zatím se můžeš podívat, jak funguje.",
    "locale": "cs-CZ"
  },
  "da": {
    "title": "Orma — Efterlysning",
    "loading": "Henter efterlysningen…",
    "noidTitle": "Ingen efterlysning angivet",
    "noidText": "Dette link åbnes ved at scanne QR-koden på en Orma-plakat. Henvisningen til efterlysningen mangler.",
    "notfoundTitle": "Efterlysningen blev ikke fundet",
    "notfoundText": "Denne efterlysning findes ikke længere eller er blevet lukket. Efterlysninger på Orma udløber og bliver arkiveret efter 90 dage.",
    "errorTitle": "Noget gik galt",
    "errorText": "Vi kunne ikke hente efterlysningen. Tjek forbindelsen, og prøv igen.",
    "retry": "Prøv igen",
    "discover": "Oplev Orma",
    "locationNote": "For at beskytte privatlivet er det viste sted det omtrentlige område (sløret med cirka 150 meter), ikke den præcise adresse.",
    "appBoxTitle": "Har du set dette dyr?",
    "appBoxText": "Åbn efterlysningen i Orma for at skrive til den, der har lagt den op, i den sikre chat og melde en observation. Appen kommer snart: indtil da kan du se, hvordan den virker.",
    "locale": "da-DK"
  },
  "el": {
    "title": "Orma — Αγγελία",
    "loading": "Φορτώνω την αγγελία…",
    "noidTitle": "Δεν προσδιορίστηκε αγγελία",
    "noidText": "Αυτός ο σύνδεσμος ανοίγει σκανάροντας το QR μιας αφίσας Orma. Λείπει η αναφορά στην αγγελία.",
    "notfoundTitle": "Η αγγελία δεν βρέθηκε",
    "notfoundText": "Αυτή η αγγελία δεν υπάρχει πια ή έχει κλείσει. Οι αγγελίες στο Orma λήγουν και αρχειοθετούνται μετά από 90 ημέρες.",
    "errorTitle": "Κάτι πήγε στραβά",
    "errorText": "Δεν καταφέραμε να φορτώσουμε την αγγελία. Έλεγξε τη σύνδεσή σου και δοκίμασε ξανά.",
    "retry": "Δοκίμασε ξανά",
    "discover": "Ανακάλυψε το Orma",
    "locationNote": "Για την προστασία του απορρήτου, η τοποθεσία που εμφανίζεται είναι η κατά προσέγγιση περιοχή (θολωμένη κατά περίπου 150 μέτρα), όχι η ακριβής διεύθυνση.",
    "appBoxTitle": "Είδες αυτό το ζώο;",
    "appBoxText": "Άνοιξε την αγγελία στο Orma για να γράψεις σε όποιον τη δημοσίευσε στην ασφαλή συνομιλία και να δηλώσεις έναν εντοπισμό. Η εφαρμογή έρχεται σύντομα: στο μεταξύ, μπορείς να δεις πώς λειτουργεί.",
    "locale": "el-GR"
  },
  "hr": {
    "title": "Orma — Prijava",
    "loading": "Učitavam prijavu…",
    "noidTitle": "Prijava nije navedena",
    "noidText": "Ovu poveznicu treba otvoriti skeniranjem QR koda s Orminog letka. Nedostaje oznaka prijave.",
    "notfoundTitle": "Prijava nije pronađena",
    "notfoundText": "Ova prijava više ne postoji ili je zatvorena. Prijave na Ormi istječu i arhiviraju se nakon 90 dana.",
    "errorTitle": "Nešto je pošlo po zlu",
    "errorText": "Nismo uspjeli učitati prijavu. Provjeri vezu i pokušaj ponovno.",
    "retry": "Pokušaj ponovno",
    "discover": "Otkrij Ormu",
    "locationNote": "Radi zaštite privatnosti prikazana lokacija je približno područje (zamućeno za otprilike 150 metara), a ne točna adresa.",
    "appBoxTitle": "Jesi li vidio ovu životinju?",
    "appBoxText": "Otvori prijavu u Ormi da u sigurnom chatu pišeš onome tko ju je objavio i prijaviš dojavu. Aplikacija stiže uskoro: u međuvremenu možeš otkriti kako radi.",
    "locale": "hr-HR"
  },
  "hu": {
    "title": "Orma — Bejelentés",
    "loading": "Töltöm a bejelentést…",
    "noidTitle": "Nincs megadva bejelentés",
    "noidText": "Ezt a linket egy Orma-plakát QR-kódjának beolvasásával kell megnyitni. Hiányzik a bejelentésre mutató hivatkozás.",
    "notfoundTitle": "A bejelentés nem található",
    "notfoundText": "Ez a bejelentés már nem létezik, vagy lezárták. Az Orma bejelentései lejárnak, és 90 nap után archiválódnak.",
    "errorTitle": "Valami elromlott",
    "errorText": "Nem sikerült betölteni a bejelentést. Ellenőrizd a kapcsolatot, és próbáld újra.",
    "retry": "Újra",
    "discover": "Ismerd meg az Ormát",
    "locationNote": "A magánélet védelmében a megjelenített hely a hozzávetőleges környék (körülbelül 150 méterrel elmosva), nem a pontos cím.",
    "appBoxTitle": "Láttad ezt az állatot?",
    "appBoxText": "Nyisd meg a bejelentést az Ormában, hogy a védett csevegésben írhass annak, aki közzétette, és jelezhess egy észlelést. Az app hamarosan érkezik: addig megnézheted, hogyan működik.",
    "locale": "hu-HU"
  },
  "nl": {
    "title": "Orma — Melding",
    "loading": "De melding wordt geladen…",
    "noidTitle": "Geen melding opgegeven",
    "noidText": "Deze link open je door de QR-code op een Orma-poster te scannen. De verwijzing naar de melding ontbreekt.",
    "notfoundTitle": "Melding niet gevonden",
    "notfoundText": "Deze melding bestaat niet meer of is gesloten. Meldingen op Orma verlopen en worden na 90 dagen gearchiveerd.",
    "errorTitle": "Er is iets misgegaan",
    "errorText": "We konden de melding niet laden. Controleer je verbinding en probeer het opnieuw.",
    "retry": "Opnieuw proberen",
    "discover": "Ontdek Orma",
    "locationNote": "Om de privacy te beschermen wordt de plek bij benadering getoond (ongeveer 150 meter vervaagd), niet het exacte adres.",
    "appBoxTitle": "Heb je dit dier gezien?",
    "appBoxText": "Open de melding in Orma om in de veilige chat te schrijven aan wie hem geplaatst heeft en een waarneming door te geven. De app komt binnenkort: ontdek intussen hoe hij werkt.",
    "locale": "nl-NL"
  },
  "pl": {
    "title": "Orma — Zgłoszenie",
    "loading": "Wczytuję zgłoszenie…",
    "noidTitle": "Nie wskazano zgłoszenia",
    "noidText": "Ten link otwiera się przez zeskanowanie kodu QR z ulotki Orma. Brakuje odniesienia do zgłoszenia.",
    "notfoundTitle": "Nie znaleziono zgłoszenia",
    "notfoundText": "To zgłoszenie już nie istnieje albo zostało zamknięte. Zgłoszenia w aplikacji Orma wygasają i trafiają do archiwum po 90 dniach.",
    "errorTitle": "Coś poszło nie tak",
    "errorText": "Nie udało nam się wczytać zgłoszenia. Sprawdź połączenie i spróbuj ponownie.",
    "retry": "Spróbuj ponownie",
    "discover": "Poznaj aplikację Orma",
    "locationNote": "Żeby chronić prywatność, pokazane miejsce to przybliżona okolica (rozmyta o około 150 metrów), a nie dokładny adres.",
    "appBoxTitle": "Widziałeś to zwierzę?",
    "appBoxText": "Otwórz zgłoszenie w aplikacji Orma, żeby napisać na bezpiecznym czacie do osoby, która je dodała, i zgłosić, że widziałeś zwierzaka. Aplikacja pojawi się wkrótce: na razie możesz zobaczyć, jak działa.",
    "locale": "pl-PL"
  },
  "sv": {
    "title": "Orma — Anmälan",
    "loading": "Laddar anmälan…",
    "noidTitle": "Ingen anmälan angiven",
    "noidText": "Den här länken öppnas genom att skanna QR-koden på en Orma-affisch. Hänvisningen till anmälan saknas.",
    "notfoundTitle": "Anmälan hittades inte",
    "notfoundText": "Den här anmälan finns inte längre eller har avslutats. Anmälningar på Orma går ut och arkiveras efter 90 dagar.",
    "errorTitle": "Något gick fel",
    "errorText": "Vi kunde inte ladda anmälan. Kontrollera anslutningen och försök igen.",
    "retry": "Försök igen",
    "discover": "Upptäck Orma",
    "locationNote": "För att skydda integriteten visas det ungefärliga området (otydliggjort med omkring 150 meter), inte den exakta adressen.",
    "appBoxTitle": "Har du sett det här djuret?",
    "appBoxText": "Öppna anmälan i Orma för att skriva till den som lagt upp den, i den trygga chatten, och rapportera en observation. Appen kommer snart: under tiden kan du se hur den fungerar.",
    "locale": "sv-SE"
  }
};
