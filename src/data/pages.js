// ============================================================================
// Orma — testi delle pagine che erano scritti dentro l'HTML.
// ----------------------------------------------------------------------------
// child-safety.astro e for-organizations.astro avevano il testo direttamente
// nel markup, quindi sfuggivano al sistema delle traduzioni: aggiungendo una
// lingua sarebbero rimaste in inglese senza che nessuno se ne accorgesse.
//
// Indicizzato per lingua come legal.js, guides.js e site.js. Il corpo e' HTML
// gia' pronto, iniettato con set:html: gli indirizzi email sono scritti per
// esteso invece di essere interpolati, esattamente come in legal.js.
// ============================================================================

export const CHILD_SAFETY = {
  title: {
    it: 'Orma — Standard di sicurezza dei minori',
    en: 'Orma — Child safety standards',
  },
  description: {
    it: "Gli standard di Orma contro l'abuso e lo sfruttamento sessuale dei minori (CSAE): tolleranza zero, moderazione, segnalazione in-app e collaborazione con le autorità.",
    en: "Orma's standards against child sexual abuse and exploitation (CSAE): zero tolerance, moderation, in-app reporting and cooperation with the authorities.",
  },
  eyebrow: {
    it: 'Sicurezza dei minori',
    en: 'Child safety',
  },
  h1: {
    it: 'Standard di sicurezza dei minori',
    en: 'Child safety standards',
  },
  lead: {
    it: 'Orma tutela i minori con tolleranza zero verso qualsiasi forma di abuso o sfruttamento sessuale di minori (CSAE). Questa pagina descrive i nostri standard e come segnalare.',
    en: 'Orma protects minors with zero tolerance for any form of child sexual abuse and exploitation (CSAE). This page describes our standards and how to report.',
  },
  html: {
    it: `<h2>A chi è rivolta Orma</h2>
<p>Orma è un'app di community per animali smarriti <strong>riservata ai maggiori di 16 anni</strong>. Non è destinata ai bambini e non raccoglie intenzionalmente dati di minori di 16 anni.</p>

<h2>Tolleranza zero verso i contenuti CSAE</h2>
<p>È severamente vietato caricare, richiedere, condividere o promuovere materiale di abuso o sfruttamento sessuale di minori (CSAE) o qualsiasi contenuto che metta a rischio un minore. Questi contenuti e comportamenti non sono tollerati in nessuna forma.</p>

<h2>I nostri impegni</h2>
<ul>
  <li><strong>Moderazione</strong>: i contenuti segnalati vengono esaminati e quelli illeciti rimossi.</li>
  <li><strong>Segnalazione in-app</strong>: ogni contenuto e ogni chat hanno un tasto <strong>Segnala</strong>, con una categoria dedicata all'abuso sui minori.</li>
  <li><strong>Blocco utente</strong>: puoi bloccare un altro utente dalla chat in qualsiasi momento.</li>
  <li><strong>Sospensione e chiusura</strong>: gli account coinvolti in contenuti CSAE vengono sospesi o chiusi.</li>
  <li><strong>Collaborazione con le autorità</strong>: collaboriamo con le forze dell'ordine e conserviamo le informazioni necessarie nei casi che lo richiedono.</li>
</ul>

<h2>Come segnalare un contenuto che riguarda un minore</h2>
<ul>
  <li><strong>Nell'app</strong>: usa il tasto <strong>Segnala</strong> sul contenuto o nella chat e scegli la voce relativa all'abuso o allo sfruttamento di minori.</li>
  <li><strong>Via email</strong>: scrivi al nostro punto di contatto <strong><a href="mailto:info@orma.pet">info@orma.pet</a></strong>.</li>
  <li><strong>Alle autorità</strong>: in caso di pericolo immediato chiama il <strong>112</strong>; in Italia puoi segnalare alla <strong>Polizia Postale</strong> (commissariatodips.it).</li>
</ul>

<h2>Punto di contatto</h2>
<p>Per qualsiasi segnalazione o domanda sulla sicurezza dei minori puoi scrivere a <strong><a href="mailto:info@orma.pet">info@orma.pet</a></strong>.</p>`,
    en: `<h2>Who Orma is for</h2>
<p>Orma is a community app for lost pets, <strong>intended for people aged 16 and over</strong>. It is not directed at children and does not knowingly collect data from anyone under 16.</p>

<h2>Zero tolerance for CSAE content</h2>
<p>Uploading, requesting, sharing or promoting child sexual abuse or exploitation material (CSAE), or any content that endangers a minor, is strictly prohibited. Such content and behaviour are not tolerated in any form.</p>

<h2>Our commitments</h2>
<ul>
  <li><strong>Moderation</strong>: reported content is reviewed and unlawful content is removed.</li>
  <li><strong>In-app reporting</strong>: every piece of content and every chat has a <strong>Report</strong> button, with a dedicated category for child abuse.</li>
  <li><strong>User blocking</strong>: you can block another user from the chat at any time.</li>
  <li><strong>Suspension and termination</strong>: accounts involved in CSAE content are suspended or closed.</li>
  <li><strong>Cooperation with authorities</strong>: we cooperate with law enforcement and retain the information needed in cases that require it.</li>
</ul>

<h2>How to report content involving a minor</h2>
<ul>
  <li><strong>In the app</strong>: use the <strong>Report</strong> button on the content or in the chat and choose the child abuse / exploitation option.</li>
  <li><strong>By email</strong>: write to our point of contact <strong><a href="mailto:info@orma.pet">info@orma.pet</a></strong>.</li>
  <li><strong>To the authorities</strong>: in case of immediate danger call your local emergency number (in Italy, <strong>112</strong>); in Italy you can also report to the <strong>Polizia Postale</strong> (commissariatodips.it).</li>
</ul>

<h2>Point of contact</h2>
<p>For any report or question about child safety, write to <strong><a href="mailto:info@orma.pet">info@orma.pet</a></strong>.</p>`,
  },
};

export const FOR_ORGS = {
  title: {
    it: 'Orma — Per veterinari, canili e rifugi',
    en: 'Orma — For vets, shelters and rescues',
  },
  description: {
    it: 'Sei un veterinario, un canile o un rifugio? Aiuta i tuoi clienti a ritrovare gli animali smarriti: metti Orma sul tuo sito e fatti trovare dalla community.',
    en: 'Are you a vet, a shelter or a rescue? Help your clients find lost pets: add Orma to your website and get found by the community near you.',
  },
  eyebrow: {
    it: 'Per veterinari, canili e rifugi',
    en: 'For vets, shelters and rescues',
  },
  h1: {
    it: 'Aiuta chi ha perso un animale, dal tuo sito',
    en: 'Help people who lost a pet, right from your site',
  },
  lead: {
    it: "Orma è l'app di community per animali smarriti. Se sei un veterinario, un canile o un rifugio, puoi dare ai tuoi clienti uno strumento in più per ritrovare i loro animali — e farti trovare da chi cerca aiuto vicino a te.",
    en: "Orma is the community app for lost pets. If you're a vet, a shelter or a rescue, you can give your clients one more tool to find their animals — and get found by people looking for help near you.",
  },
  // Immagine del badge: le lingue senza badge dedicato ripiegano su quello
  // inglese, che e' gia' neutro.
  badge: { it: '/badge-orma-it.png', en: '/badge-orma-en.png' },
  badgeAlt: {
    it: 'Cerca animali smarriti su Orma',
    en: 'Find lost pets on Orma',
  },
  previewAlt: {
    it: 'Anteprima del badge Orma',
    en: 'Orma badge preview',
  },
  embedLabel: {
    it: 'Codice da incollare sul tuo sito',
    en: 'Code to paste on your website',
  },
  copyLabel: { it: 'Copia', en: 'Copy' },
  copiedLabel: { it: 'Copiato ✓', en: 'Copied ✓' },
  ctaLabel: { it: 'Scrivici', en: 'Contact us' },
  ctaSubject: { it: 'Struttura%20su%20Orma', en: 'Facility%20on%20Orma' },
  htmlWhy: {
    it: `<h2>Perché mettere Orma sul tuo sito</h2>
<ul>
  <li><strong>Un aiuto concreto per i tuoi clienti</strong>: chi perde o trova un animale ha subito un posto dove segnalarlo e ricevere avvistamenti dalle persone vicine.</li>
  <li><strong>Meno telefonate a vuoto</strong>: chi trova un animale può fartene leggere il microchip e collegarlo a una segnalazione.</li>
  <li><strong>Visibilità</strong>: canili, rifugi e veterinari possono comparire sulla mappa di Orma e ricevere richieste dalla community.</li>
</ul>

<h2>Metti il badge di Orma sul tuo sito</h2>
<p>Copia questo codice e incollalo dove vuoi (footer, pagina contatti, sezione "link utili"): mostrerà un pulsante che porta i tuoi visitatori su Orma.</p>`,
    en: `<h2>Why add Orma to your website</h2>
<ul>
  <li><strong>Real help for your clients</strong>: anyone who loses or finds an animal has a place to report it and receive sightings from people nearby.</li>
  <li><strong>Fewer dead-end calls</strong>: whoever finds an animal can have its microchip scanned by you and matched to a report.</li>
  <li><strong>Visibility</strong>: shelters, rescues and vets can appear on the Orma map and receive requests from the community.</li>
</ul>

<h2>Add the Orma badge to your website</h2>
<p>Copy this code and paste it anywhere (footer, contact page, "useful links" section): it shows a button that sends your visitors to Orma.</p>`,
  },
  htmlAppear: {
    it: `<h2>Vuoi comparire tra le strutture?</h2>
<p>Se gestisci un canile, un rifugio o una clinica veterinaria e vuoi essere presente (e verificato) sulla mappa di Orma, scrivici: ti aiutiamo a impostare tutto.</p>`,
    en: `<h2>Want to appear among the facilities?</h2>
<p>If you run a shelter, a rescue or a veterinary clinic and want to be listed (and verified) on the Orma map, write to us: we'll help you set everything up.</p>`,
  },
  htmlPress: {
    it: `<h2>Per la stampa</h2>
<p>Orma è un'app italiana di community per ritrovare animali smarriti, trovati o abbandonati e favorire le adozioni da canili e rifugi. Nasce con la privacy al primo posto: dati su server europei.</p>
<ul>
  <li><strong>Nome</strong>: Orma — "Ritrova il tuo amico"</li>
  <li><strong>Dove</strong>: Italia · <a href="https://orma.pet">orma.pet</a></li>
  <li><strong>Piattaforme</strong>: Android e iPhone</li>
  <li><strong>Contatto</strong>: <a href="mailto:info@orma.pet">info@orma.pet</a></li>
  <li><strong>Logo</strong>: <a href="/favicon.svg">scarica</a></li>
</ul>`,
    en: `<h2>For the press</h2>
<p>Orma is an Italian community app to find lost, found or abandoned animals and support adoptions from shelters and rescues. Built privacy-first: data on European servers.</p>
<ul>
  <li><strong>Name</strong>: Orma — "Find your friend"</li>
  <li><strong>Where</strong>: Italy · <a href="https://orma.pet/en/">orma.pet</a></li>
  <li><strong>Platforms</strong>: Android and iPhone</li>
  <li><strong>Contact</strong>: <a href="mailto:info@orma.pet">info@orma.pet</a></li>
  <li><strong>Logo</strong>: <a href="/favicon.svg">download</a></li>
</ul>`,
  },
};
