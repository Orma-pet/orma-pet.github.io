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
  cfAnalyticsToken: '',
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
  pet:           { it: '/pet/',            en: '/en/pet/' },
};

// Navigazione principale (le voci puntano alle pagine vere, non agli anchor).
export const NAV = {
  it: [
    { key: 'howItWorks', label: 'Come funziona' },
    { key: 'features',   label: 'Funzionalità' },
  ],
  en: [
    { key: 'howItWorks', label: 'How it works' },
    { key: 'features',   label: 'Features' },
  ],
};

export const UI = {
  it: {
    skipToContent: 'Vai al contenuto',
    langGroupLabel: 'Lingua',
    navCta: "Scarica l'app",
    footerLinks: { privacy: 'Privacy', terms: 'Termini', deletion: 'Cancellazione account', contact: 'Contatti' },
    footerTagline: 'Orma — Ritrova il tuo amico. Fatto con cura, in Italia.',
    footerColophon: 'Versione editoriale del sito · 2026',
    storeSoon: 'Presto su',
    backHome: 'Torna alla home',
  },
  en: {
    skipToContent: 'Skip to content',
    langGroupLabel: 'Language',
    navCta: 'Get the app',
    footerLinks: { privacy: 'Privacy', terms: 'Terms', deletion: 'Account deletion', contact: 'Contact' },
    footerTagline: 'Orma — Find your friend. Made with care, in Italy.',
    footerColophon: 'Editorial edition of the website · 2026',
    storeSoon: 'Coming soon to',
    backHome: 'Back to home',
  },
};

// ----------------------------------------------------------------------------
// HOMEPAGE — testi (dalle stringhe fornite, adattate al taglio editoriale).
// ----------------------------------------------------------------------------
export const HOME = {
  it: {
    title: 'Orma — Ritrova il tuo amico',
    metaDesc: 'Orma collega chi ha perso un animale con chi lo ha avvistato o trovato. Gratis, con la privacy al primo posto.',
    heroEyebrow: 'App per animali smarriti, trovati e da adottare',
    heroTitle: 'Ritrova il tuo amico',
    heroSub: "Orma collega chi ha perso un animale con chi lo ha avvistato o trovato. Segnali in pochi tap, ricevi avvisi quando qualcosa si muove vicino a te e tieni i contatti al sicuro nella chat dell'app. Gratis.",
    heroCta1: 'Scarica Orma',
    heroCta2: 'Scopri come funziona',
    heroProof: 'Una community che si dà una zampa, città per città.',
    trust: ['Gratuita', 'Dati in Europa', 'Privacy by design', 'Made in Italy'],
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
    vetsText: "Orma ti mostra sulla mappa a chi cerca aiuto: chi trova un animale te lo porta, chi ha un'emergenza ti trova subito. Attivarti è gratis e richiede cinque minuti.",
    vetsPoints: ['Visibilità gratuita sulla mappa', "Richieste di appuntamento dall'app", 'Punto di consegna o emergenza h24'],
    vetsCta: 'Scrivici',
    downloadTitle: 'Il tuo amico ti sta aspettando',
    downloadSub: 'Orma è gratuita e arriva prima su Android, poi su iOS. Unisciti alla community e aiuta ogni animale a tornare a casa.',
    btnAndroid: 'Scarica su Google Play',
    btnIos: 'Presto su App Store',
  },
  en: {
    title: 'Orma — Find your friend',
    metaDesc: "Orma connects people who've lost a pet with people who've spotted or found one. Free, with privacy first.",
    heroEyebrow: 'For lost pets, found animals and adoptions',
    heroTitle: 'Find your friend',
    heroSub: "Orma connects people who've lost a pet with people who've spotted or found one. Post in a few taps, get alerts when something happens near you, and keep contact safe in the in-app chat. Free.",
    heroCta1: 'Get Orma',
    heroCta2: 'See how it works',
    heroProof: 'A community that lends a paw, town by town.',
    trust: ['Free', 'Data in the EU', 'Privacy by design', 'Made in Italy'],
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
    vetsText: 'Orma puts you on the map for people who need help: whoever finds an animal brings it to you, whoever has an emergency finds you right away. Joining is free and takes five minutes.',
    vetsPoints: ['Free visibility on the map', 'Appointment requests from the app', 'Drop-off point or 24/7 emergency'],
    vetsCta: 'Get in touch',
    downloadTitle: 'Your friend is waiting for you',
    downloadSub: 'Orma is free, launching first on Android and then on iOS. Join the community and help every animal find its way home.',
    btnAndroid: 'Get it on Google Play',
    btnIos: 'Coming soon to the App Store',
  },
};

// ----------------------------------------------------------------------------
// Pagine dedicate "Come funziona" e "Funzionalità" — intro editoriale extra.
// (riusano gli array steps/feats di HOME, con un cappello introduttivo proprio)
// ----------------------------------------------------------------------------
export const HOWITWORKS = {
  it: {
    title: 'Come funziona Orma',
    metaDesc: 'Dal primo allarme al ritorno a casa: i tre passi di Orma spiegati con calma.',
    eyebrow: 'Guida',
    h1: 'Come funziona',
    lead: "Orma non promette miracoli: è uno strumento. Ma è uno strumento costruito intorno ai minuti che contano, quando un animale si allontana e ogni occhio in più può cambiare il finale. Ecco come si muove la community, passo dopo passo.",
    closingTitle: 'Niente garanzie, molta community',
    closingText: 'Orma aiuta, non garantisce: nessuna app può assicurare un ritrovamento. Quello che possiamo fare è mettere in contatto le persone giuste, in fretta e nel rispetto della privacy. Il resto lo fa una community che si dà una zampa.',
  },
  en: {
    title: 'How Orma works',
    metaDesc: 'From the first alert to the way home: the three steps of Orma, explained calmly.',
    eyebrow: 'Guide',
    h1: 'How it works',
    lead: 'Orma promises no miracles: it is a tool. But it is a tool built around the minutes that matter, when an animal wanders off and every extra pair of eyes can change the ending. Here is how the community moves, step by step.',
    closingTitle: 'No guarantees, plenty of community',
    closingText: 'Orma helps, it does not guarantee: no app can ensure a reunion. What we can do is connect the right people, fast and with respect for privacy. The rest is done by a community that lends a paw.',
  },
};

export const FEATURES = {
  it: {
    title: 'Funzionalità di Orma',
    metaDesc: 'Mappa con privacy, avvisi vicino a te, chat sicura, corrispondenze microchip e adozioni verificate.',
    eyebrow: 'Funzionalità',
    h1: 'Tutto quello che serve, niente di superfluo',
    lead: "Abbiamo tagliato tutto ciò che non serviva. Quello che resta sono strumenti essenziali, ognuno pensato per un momento preciso della ricerca — e ognuno con la privacy come impostazione predefinita, non come ripensamento.",
    privacyTitle: 'La privacy non è una funzione: è il punto di partenza',
    privacyText: 'Niente tracciamento e niente analytics di terze parti: i tuoi dati non vengono venduti. La posizione sulla mappa pubblica è sempre offuscata di circa 150 metri. I server dei dati sono in Unione Europea, a Francoforte.',
  },
  en: {
    title: 'Orma features',
    metaDesc: 'Privacy-first map, alerts near you, secure chat, microchip matches and verified adoptions.',
    eyebrow: 'Features',
    h1: "Everything you need, nothing you don't",
    lead: 'We cut everything that did not belong. What remains are essential tools, each made for a precise moment in the search — and each with privacy as the default, not an afterthought.',
    privacyTitle: 'Privacy is not a feature: it is the starting point',
    privacyText: 'No tracking and no third-party analytics: your data is never sold. The location on the public map is always blurred by about 150 metres. Data servers are in the European Union, in Frankfurt.',
  },
};

// ----------------------------------------------------------------------------
// /pet — stringhe UI della landing del QR (il rendering della scheda è client-side).
// ----------------------------------------------------------------------------
export const PET = {
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
