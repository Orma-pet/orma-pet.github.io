// ============================================================================
// Orma — testi delle pagine che erano scritti dentro l''HTML.
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
  "title": {
    "it": "Orma — Standard di sicurezza dei minori",
    "en": "Orma — Child safety standards",
    "ro": "Orma — Standarde de siguranță a minorilor",
    "pt": "Orma — Normas de segurança de menores",
    "de": "Orma — Standards zum Schutz von Minderjährigen",
    "fr": "Orma — Normes de sécurité des mineurs"
  },
  "description": {
    "it": "Gli standard di Orma contro l'abuso e lo sfruttamento sessuale dei minori (CSAE): tolleranza zero, moderazione, segnalazione in-app e collaborazione con le autorità.",
    "en": "Orma's standards against child sexual abuse and exploitation (CSAE): zero tolerance, moderation, in-app reporting and cooperation with the authorities.",
    "ro": "Standardele Orma împotriva abuzului și exploatării sexuale a minorilor (CSAE): toleranță zero, moderare, raportare în aplicație și cooperare cu autoritățile.",
    "pt": "As normas da Orma contra o abuso e a exploração sexual de menores (CSAE): tolerância zero, moderação, denúncia na aplicação e cooperação com as autoridades.",
    "de": "Die Standards von Orma gegen sexuellen Missbrauch und sexuelle Ausbeutung von Kindern (CSAE): null Toleranz, Moderation, Meldung in der App und Zusammenarbeit mit den Behörden.",
    "fr": "Les normes d'Orma contre l'abus et l'exploitation sexuelle des mineurs (CSAE) : tolérance zéro, modération, signalement dans l'application et coopération avec les autorités."
  },
  "eyebrow": {
    "it": "Sicurezza dei minori",
    "en": "Child safety",
    "ro": "Siguranța minorilor",
    "pt": "Segurança de menores",
    "de": "Sicherheit von Minderjährigen",
    "fr": "Sécurité des mineurs"
  },
  "h1": {
    "it": "Standard di sicurezza dei minori",
    "en": "Child safety standards",
    "ro": "Standarde de siguranță a minorilor",
    "pt": "Normas de segurança de menores",
    "de": "Standards zum Schutz von Minderjährigen",
    "fr": "Normes de sécurité des mineurs"
  },
  "lead": {
    "it": "Orma tutela i minori con tolleranza zero verso qualsiasi forma di abuso o sfruttamento sessuale di minori (CSAE). Questa pagina descrive i nostri standard e come segnalare.",
    "en": "Orma protects minors with zero tolerance for any form of child sexual abuse and exploitation (CSAE). This page describes our standards and how to report.",
    "ro": "Orma protejează minorii cu toleranță zero față de orice formă de abuz sau exploatare sexuală a copiilor (CSAE). Această pagină descrie standardele noastre și modul în care poți raporta.",
    "pt": "A Orma protege os menores com tolerância zero perante qualquer forma de abuso ou exploração sexual de crianças (CSAE). Esta página descreve as nossas normas e como denunciar.",
    "de": "Orma schützt Minderjährige mit null Toleranz gegenüber jeder Form von sexuellem Missbrauch und sexueller Ausbeutung von Kindern (CSAE). Diese Seite beschreibt unsere Standards und wie du etwas melden kannst.",
    "fr": "Orma protège les mineurs avec une tolérance zéro envers toute forme d'abus ou d'exploitation sexuelle d'enfants (CSAE). Cette page décrit nos normes et la manière de signaler."
  },
  "html": {
    "it": "<h2>A chi è rivolta Orma</h2>\n<p>Orma è un'app di community per animali smarriti <strong>riservata ai maggiori di 16 anni</strong>. Non è destinata ai bambini e non raccoglie intenzionalmente dati di minori di 16 anni.</p>\n\n<h2>Tolleranza zero verso i contenuti CSAE</h2>\n<p>È severamente vietato caricare, richiedere, condividere o promuovere materiale di abuso o sfruttamento sessuale di minori (CSAE) o qualsiasi contenuto che metta a rischio un minore. Questi contenuti e comportamenti non sono tollerati in nessuna forma.</p>\n\n<h2>I nostri impegni</h2>\n<ul>\n  <li><strong>Moderazione</strong>: i contenuti segnalati vengono esaminati e quelli illeciti rimossi.</li>\n  <li><strong>Segnalazione in-app</strong>: ogni contenuto e ogni chat hanno un tasto <strong>Segnala</strong>, con una categoria dedicata all'abuso sui minori.</li>\n  <li><strong>Blocco utente</strong>: puoi bloccare un altro utente dalla chat in qualsiasi momento.</li>\n  <li><strong>Sospensione e chiusura</strong>: gli account coinvolti in contenuti CSAE vengono sospesi o chiusi.</li>\n  <li><strong>Collaborazione con le autorità</strong>: collaboriamo con le forze dell'ordine e conserviamo le informazioni necessarie nei casi che lo richiedono.</li>\n</ul>\n\n<h2>Come segnalare un contenuto che riguarda un minore</h2>\n<ul>\n  <li><strong>Nell'app</strong>: usa il tasto <strong>Segnala</strong> sul contenuto o nella chat e scegli la voce relativa all'abuso o allo sfruttamento di minori.</li>\n  <li><strong>Via email</strong>: scrivi al nostro punto di contatto <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</li>\n  <li><strong>Alle autorità</strong>: in caso di pericolo immediato chiama il <strong>112</strong>; in Italia puoi segnalare alla <strong>Polizia Postale</strong> (commissariatodips.it).</li>\n</ul>\n\n<h2>Punto di contatto</h2>\n<p>Per qualsiasi segnalazione o domanda sulla sicurezza dei minori puoi scrivere a <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</p>",
    "en": "<h2>Who Orma is for</h2>\n<p>Orma is a community app for lost pets, <strong>intended for people aged 16 and over</strong>. It is not directed at children and does not knowingly collect data from anyone under 16.</p>\n\n<h2>Zero tolerance for CSAE content</h2>\n<p>Uploading, requesting, sharing or promoting child sexual abuse or exploitation material (CSAE), or any content that endangers a minor, is strictly prohibited. Such content and behaviour are not tolerated in any form.</p>\n\n<h2>Our commitments</h2>\n<ul>\n  <li><strong>Moderation</strong>: reported content is reviewed and unlawful content is removed.</li>\n  <li><strong>In-app reporting</strong>: every piece of content and every chat has a <strong>Report</strong> button, with a dedicated category for child abuse.</li>\n  <li><strong>User blocking</strong>: you can block another user from the chat at any time.</li>\n  <li><strong>Suspension and termination</strong>: accounts involved in CSAE content are suspended or closed.</li>\n  <li><strong>Cooperation with authorities</strong>: we cooperate with law enforcement and retain the information needed in cases that require it.</li>\n</ul>\n\n<h2>How to report content involving a minor</h2>\n<ul>\n  <li><strong>In the app</strong>: use the <strong>Report</strong> button on the content or in the chat and choose the child abuse / exploitation option.</li>\n  <li><strong>By email</strong>: write to our point of contact <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</li>\n  <li><strong>To the authorities</strong>: in case of immediate danger call your local emergency number (in Italy, <strong>112</strong>); in Italy you can also report to the <strong>Polizia Postale</strong> (commissariatodips.it).</li>\n</ul>\n\n<h2>Point of contact</h2>\n<p>For any report or question about child safety, write to <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</p>",
    "ro": "<h2>Cui i se adresează Orma</h2>\n<p>Orma este o aplicație de comunitate pentru animale pierdute, <strong>destinată persoanelor de peste 16 ani</strong>. Nu se adresează copiilor și nu colectează cu bună știință date de la persoane sub 16 ani.</p>\n\n<h2>Toleranță zero față de conținutul CSAE</h2>\n<p>Încărcarea, solicitarea, distribuirea sau promovarea materialelor de abuz ori exploatare sexuală a copiilor (CSAE), sau a oricărui conținut care pune în pericol un minor, sunt strict interzise. Astfel de conținuturi și comportamente nu sunt tolerate sub nicio formă.</p>\n\n<h2>Angajamentele noastre</h2>\n<ul>\n  <li><strong>Moderare</strong>: conținutul raportat este analizat, iar cel ilegal este eliminat.</li>\n  <li><strong>Raportare în aplicație</strong>: fiecare conținut și fiecare conversație au un buton <strong>Raportează</strong>, cu o categorie dedicată abuzului asupra minorilor.</li>\n  <li><strong>Blocarea utilizatorilor</strong>: poți bloca oricând un alt utilizator din conversație.</li>\n  <li><strong>Suspendare și închidere</strong>: conturile implicate în conținut CSAE sunt suspendate sau închise.</li>\n  <li><strong>Cooperare cu autoritățile</strong>: colaborăm cu organele de aplicare a legii și păstrăm informațiile necesare în cazurile care o cer.</li>\n</ul>\n\n<h2>Cum raportezi un conținut care implică un minor</h2>\n<ul>\n  <li><strong>În aplicație</strong>: folosește butonul <strong>Raportează</strong> de pe conținut sau din conversație și alege opțiunea privind abuzul ori exploatarea minorilor.</li>\n  <li><strong>Prin e-mail</strong>: scrie punctului nostru de contact <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</li>\n  <li><strong>Autorităților</strong>: în caz de pericol imediat sună numărul de urgență local (în Italia, <strong>112</strong>); în Italia poți raporta și la <strong>Polizia Postale</strong> (commissariatodips.it).</li>\n</ul>\n\n<h2>Punct de contact</h2>\n<p>Pentru orice raportare sau întrebare privind siguranța minorilor, scrie la <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</p>",
    "pt": "<h2>A quem se destina a Orma</h2>\n<p>A Orma é uma aplicação de comunidade para animais perdidos, <strong>destinada a pessoas com 16 anos ou mais</strong>. Não se dirige a crianças e não recolhe conscientemente dados de pessoas com menos de 16 anos.</p>\n\n<h2>Tolerância zero perante conteúdos CSAE</h2>\n<p>É estritamente proibido carregar, solicitar, partilhar ou promover material de abuso ou exploração sexual de crianças (CSAE), ou qualquer conteúdo que ponha um menor em risco. Estes conteúdos e comportamentos não são tolerados sob nenhuma forma.</p>\n\n<h2>Os nossos compromissos</h2>\n<ul>\n  <li><strong>Moderação</strong>: o conteúdo denunciado é analisado e o conteúdo ilegal é removido.</li>\n  <li><strong>Denúncia na aplicação</strong>: cada conteúdo e cada conversa têm um botão <strong>Denunciar</strong>, com uma categoria dedicada ao abuso de menores.</li>\n  <li><strong>Bloqueio de utilizadores</strong>: podes bloquear outro utilizador a partir da conversa a qualquer momento.</li>\n  <li><strong>Suspensão e encerramento</strong>: as contas envolvidas em conteúdos CSAE são suspensas ou encerradas.</li>\n  <li><strong>Cooperação com as autoridades</strong>: colaboramos com as autoridades policiais e conservamos as informações necessárias nos casos que o exijam.</li>\n</ul>\n\n<h2>Como denunciar um conteúdo que envolva um menor</h2>\n<ul>\n  <li><strong>Na aplicação</strong>: usa o botão <strong>Denunciar</strong> no conteúdo ou na conversa e escolhe a opção relativa ao abuso ou à exploração de menores.</li>\n  <li><strong>Por e-mail</strong>: escreve ao nosso ponto de contacto <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</li>\n  <li><strong>Às autoridades</strong>: em caso de perigo imediato liga para o número de emergência local (em Itália, <strong>112</strong>); em Itália podes também denunciar à <strong>Polizia Postale</strong> (commissariatodips.it).</li>\n</ul>\n\n<h2>Ponto de contacto</h2>\n<p>Para qualquer denúncia ou dúvida sobre a segurança de menores, escreve para <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</p>",
    "de": "<h2>An wen sich Orma richtet</h2>\n<p>Orma ist eine Gemeinschafts-App für vermisste Tiere, <strong>bestimmt für Personen ab 16 Jahren</strong>. Sie richtet sich nicht an Kinder und erhebt wissentlich keine Daten von Personen unter 16 Jahren.</p>\n\n<h2>Null Toleranz gegenüber CSAE-Inhalten</h2>\n<p>Das Hochladen, Anfordern, Teilen oder Bewerben von Material über sexuellen Missbrauch oder sexuelle Ausbeutung von Kindern (CSAE) oder von Inhalten, die eine minderjährige Person gefährden, ist strengstens untersagt. Solche Inhalte und Verhaltensweisen werden in keiner Form geduldet.</p>\n\n<h2>Unsere Zusagen</h2>\n<ul>\n  <li><strong>Moderation</strong>: gemeldete Inhalte werden geprüft, rechtswidrige Inhalte werden entfernt.</li>\n  <li><strong>Meldung in der App</strong>: jeder Inhalt und jeder Chat hat eine Schaltfläche <strong>Melden</strong>, mit einer eigenen Kategorie für Kindesmissbrauch.</li>\n  <li><strong>Nutzer blockieren</strong>: du kannst eine andere Person jederzeit aus dem Chat heraus blockieren.</li>\n  <li><strong>Sperrung und Schließung</strong>: Konten, die in CSAE-Inhalte verwickelt sind, werden gesperrt oder geschlossen.</li>\n  <li><strong>Zusammenarbeit mit den Behörden</strong>: wir arbeiten mit den Strafverfolgungsbehörden zusammen und bewahren die notwendigen Informationen in den Fällen auf, die es erfordern.</li>\n</ul>\n\n<h2>Wie du einen Inhalt meldest, der eine minderjährige Person betrifft</h2>\n<ul>\n  <li><strong>In der App</strong>: nutze die Schaltfläche <strong>Melden</strong> auf dem Inhalt oder im Chat und wähle den Punkt zu Missbrauch oder Ausbeutung von Minderjährigen.</li>\n  <li><strong>Per E-Mail</strong>: schreibe an unsere Kontaktstelle <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</li>\n  <li><strong>An die Behörden</strong>: bei unmittelbarer Gefahr wähle die örtliche Notrufnummer (in Italien <strong>112</strong>); in Italien kannst du dich auch an die <strong>Polizia Postale</strong> wenden (commissariatodips.it).</li>\n</ul>\n\n<h2>Kontaktstelle</h2>\n<p>Für jede Meldung oder Frage zum Schutz von Minderjährigen schreibe an <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</p>",
    "fr": "<h2>À qui s'adresse Orma</h2>\n<p>Orma est une application communautaire pour animaux perdus, <strong>destinée aux personnes de 16 ans et plus</strong>. Elle ne s'adresse pas aux enfants et ne collecte pas sciemment de données de personnes de moins de 16 ans.</p>\n\n<h2>Tolérance zéro envers les contenus CSAE</h2>\n<p>Il est strictement interdit de téléverser, demander, partager ou promouvoir du matériel d'abus ou d'exploitation sexuelle d'enfants (CSAE), ou tout contenu mettant un mineur en danger. Ces contenus et comportements ne sont tolérés sous aucune forme.</p>\n\n<h2>Nos engagements</h2>\n<ul>\n  <li><strong>Modération</strong> : les contenus signalés sont examinés et les contenus illicites sont retirés.</li>\n  <li><strong>Signalement dans l'application</strong> : chaque contenu et chaque conversation disposent d'un bouton <strong>Signaler</strong>, avec une catégorie dédiée à l'abus sur mineur.</li>\n  <li><strong>Blocage d'utilisateur</strong> : vous pouvez bloquer une autre personne depuis la conversation à tout moment.</li>\n  <li><strong>Suspension et fermeture</strong> : les comptes impliqués dans des contenus CSAE sont suspendus ou fermés.</li>\n  <li><strong>Coopération avec les autorités</strong> : nous coopérons avec les forces de l'ordre et conservons les informations nécessaires dans les cas qui l'exigent.</li>\n</ul>\n\n<h2>Comment signaler un contenu impliquant un mineur</h2>\n<ul>\n  <li><strong>Dans l'application</strong> : utilisez le bouton <strong>Signaler</strong> sur le contenu ou dans la conversation et choisissez l'option relative à l'abus ou à l'exploitation de mineurs.</li>\n  <li><strong>Par e-mail</strong> : écrivez à notre point de contact <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</li>\n  <li><strong>Aux autorités</strong> : en cas de danger immédiat, appelez le numéro d'urgence local (en Italie, le <strong>112</strong>) ; en Italie vous pouvez aussi signaler à la <strong>Polizia Postale</strong> (commissariatodips.it).</li>\n</ul>\n\n<h2>Point de contact</h2>\n<p>Pour tout signalement ou toute question sur la sécurité des mineurs, écrivez à <strong><a href=\"mailto:info@orma.pet\">info@orma.pet</a></strong>.</p>"
  }
};

export const FOR_ORGS = {
  "title": {
    "it": "Orma — Per veterinari, canili e rifugi",
    "en": "Orma — For vets, shelters and rescues",
    "ro": "Orma — Pentru veterinari, adăposturi și asociații",
    "pt": "Orma — Para veterinários, canis e abrigos",
    "de": "Orma — Für Tierärzte, Tierheime und Vereine",
    "fr": "Orma — Pour vétérinaires, refuges et associations"
  },
  "description": {
    "it": "Sei un veterinario, un canile o un rifugio? Aiuta i tuoi clienti a ritrovare gli animali smarriti: metti Orma sul tuo sito e fatti trovare dalla community.",
    "en": "Are you a vet, a shelter or a rescue? Help your clients find lost pets: add Orma to your website and get found by the community near you.",
    "ro": "Ești veterinar, adăpost sau asociație? Ajută-ți clienții să își găsească animalele pierdute: pune Orma pe site-ul tău și fă-te găsit de comunitate.",
    "pt": "És veterinário, canil ou abrigo? Ajuda os teus clientes a encontrar os animais perdidos: coloca a Orma no teu site e faz-te encontrar pela comunidade.",
    "de": "Du bist Tierarzt, Tierheim oder Verein? Hilf deinen Kundinnen und Kunden, ihre vermissten Tiere wiederzufinden: bring Orma auf deine Website und lass dich von der Gemeinschaft finden.",
    "fr": "Vous êtes vétérinaire, refuge ou association ? Aidez vos clients à retrouver leurs animaux perdus : mettez Orma sur votre site et faites-vous trouver par la communauté."
  },
  "eyebrow": {
    "it": "Per veterinari, canili e rifugi",
    "en": "For vets, shelters and rescues",
    "ro": "Pentru veterinari, adăposturi și asociații",
    "pt": "Para veterinários, canis e abrigos",
    "de": "Für Tierärzte, Tierheime und Vereine",
    "fr": "Pour vétérinaires, refuges et associations"
  },
  "h1": {
    "it": "Aiuta chi ha perso un animale, dal tuo sito",
    "en": "Help people who lost a pet, right from your site",
    "ro": "Ajută-i pe cei care au pierdut un animal, direct de pe site-ul tău",
    "pt": "Ajuda quem perdeu um animal, a partir do teu site",
    "de": "Hilf denen, die ein Tier verloren haben — direkt von deiner Website aus",
    "fr": "Aidez celles et ceux qui ont perdu un animal, depuis votre site"
  },
  "lead": {
    "it": "Orma è l'app di community per animali smarriti. Se sei un veterinario, un canile o un rifugio, puoi dare ai tuoi clienti uno strumento in più per ritrovare i loro animali — e farti trovare da chi cerca aiuto vicino a te.",
    "en": "Orma is the community app for lost pets. If you're a vet, a shelter or a rescue, you can give your clients one more tool to find their animals — and get found by people looking for help near you.",
    "ro": "Orma este aplicația de comunitate pentru animale pierdute. Dacă ești veterinar, adăpost sau asociație, le poți oferi clienților tăi un instrument în plus pentru a-și găsi animalele — și te poți face găsit de cei care caută ajutor în apropierea ta.",
    "pt": "A Orma é a aplicação de comunidade para animais perdidos. Se és veterinário, canil ou abrigo, podes dar aos teus clientes mais uma ferramenta para encontrarem os seus animais — e fazer-te encontrar por quem procura ajuda perto de ti.",
    "de": "Orma ist die Gemeinschafts-App für vermisste Tiere. Wenn du Tierarzt bist oder ein Tierheim oder einen Verein betreibst, kannst du deinen Kundinnen und Kunden ein zusätzliches Werkzeug geben, um ihre Tiere wiederzufinden — und dich von denen finden lassen, die in deiner Nähe Hilfe suchen.",
    "fr": "Orma est l'application communautaire pour animaux perdus. Si vous êtes vétérinaire, refuge ou association, vous pouvez offrir à vos clients un outil de plus pour retrouver leurs animaux — et vous faire trouver par celles et ceux qui cherchent de l'aide près de chez vous."
  },
  "badge": {
    "it": "/badge-orma-it.png",
    "en": "/badge-orma-en.png",
    "ro": "/badge-orma-en.png",
    "pt": "/badge-orma-en.png",
    "de": "/badge-orma-en.png",
    "fr": "/badge-orma-en.png"
  },
  "badgeAlt": {
    "it": "Cerca animali smarriti su Orma",
    "en": "Find lost pets on Orma",
    "ro": "Caută animale pierdute pe Orma",
    "pt": "Procura animais perdidos na Orma",
    "de": "Vermisste Tiere auf Orma suchen",
    "fr": "Rechercher des animaux perdus sur Orma"
  },
  "previewAlt": {
    "it": "Anteprima del badge Orma",
    "en": "Orma badge preview",
    "ro": "Previzualizarea insignei Orma",
    "pt": "Pré-visualização do emblema Orma",
    "de": "Vorschau des Orma-Abzeichens",
    "fr": "Aperçu du badge Orma"
  },
  "embedLabel": {
    "it": "Codice da incollare sul tuo sito",
    "en": "Code to paste on your website",
    "ro": "Cod de lipit pe site-ul tău",
    "pt": "Código para colar no teu site",
    "de": "Code zum Einfügen auf deiner Website",
    "fr": "Code à coller sur votre site"
  },
  "copyLabel": {
    "it": "Copia",
    "en": "Copy",
    "ro": "Copiază",
    "pt": "Copiar",
    "de": "Kopieren",
    "fr": "Copier"
  },
  "copiedLabel": {
    "it": "Copiato ✓",
    "en": "Copied ✓",
    "ro": "Copiat ✓",
    "pt": "Copiado ✓",
    "de": "Kopiert ✓",
    "fr": "Copié ✓"
  },
  "ctaLabel": {
    "it": "Scrivici",
    "en": "Contact us",
    "ro": "Scrie-ne",
    "pt": "Escreve-nos",
    "de": "Schreib uns",
    "fr": "Écrivez-nous"
  },
  "ctaSubject": {
    "it": "Struttura%20su%20Orma",
    "en": "Facility%20on%20Orma",
    "ro": "Structura%20pe%20Orma",
    "pt": "Instituicao%20na%20Orma",
    "de": "Einrichtung%20auf%20Orma",
    "fr": "Structure%20sur%20Orma"
  },
  "htmlWhy": {
    "it": "<h2>Perché mettere Orma sul tuo sito</h2>\n<ul>\n  <li><strong>Un aiuto concreto per i tuoi clienti</strong>: chi perde o trova un animale ha subito un posto dove segnalarlo e ricevere avvistamenti dalle persone vicine.</li>\n  <li><strong>Meno telefonate a vuoto</strong>: chi trova un animale può fartene leggere il microchip e collegarlo a una segnalazione.</li>\n  <li><strong>Visibilità</strong>: canili, rifugi e veterinari possono comparire sulla mappa di Orma e ricevere richieste dalla community.</li>\n</ul>\n\n<h2>Metti il badge di Orma sul tuo sito</h2>\n<p>Copia questo codice e incollalo dove vuoi (footer, pagina contatti, sezione \"link utili\"): mostrerà un pulsante che porta i tuoi visitatori su Orma.</p>",
    "en": "<h2>Why add Orma to your website</h2>\n<ul>\n  <li><strong>Real help for your clients</strong>: anyone who loses or finds an animal has a place to report it and receive sightings from people nearby.</li>\n  <li><strong>Fewer dead-end calls</strong>: whoever finds an animal can have its microchip scanned by you and matched to a report.</li>\n  <li><strong>Visibility</strong>: shelters, rescues and vets can appear on the Orma map and receive requests from the community.</li>\n</ul>\n\n<h2>Add the Orma badge to your website</h2>\n<p>Copy this code and paste it anywhere (footer, contact page, \"useful links\" section): it shows a button that sends your visitors to Orma.</p>",
    "ro": "<h2>De ce să pui Orma pe site-ul tău</h2>\n<ul>\n  <li><strong>Un ajutor concret pentru clienții tăi</strong>: cine pierde sau găsește un animal are imediat un loc unde să anunțe și să primească semnalări de la persoanele din apropiere.</li>\n  <li><strong>Mai puține telefoane fără rezultat</strong>: cine găsește un animal poate să îi citească microcipul la tine și să îl lege de un anunț.</li>\n  <li><strong>Vizibilitate</strong>: adăposturile, asociațiile și veterinarii pot apărea pe harta Orma și pot primi cereri din partea comunității.</li>\n</ul>\n\n<h2>Pune insigna Orma pe site-ul tău</h2>\n<p>Copiază acest cod și lipește-l unde vrei (subsol, pagina de contact, secțiunea „linkuri utile”): va afișa un buton care îți duce vizitatorii pe Orma.</p>",
    "pt": "<h2>Porquê colocar a Orma no teu site</h2>\n<ul>\n  <li><strong>Uma ajuda concreta para os teus clientes</strong>: quem perde ou encontra um animal tem logo um sítio onde o assinalar e receber avistamentos das pessoas próximas.</li>\n  <li><strong>Menos telefonemas sem resultado</strong>: quem encontra um animal pode levá-lo até ti para ler o microchip e ligá-lo a um alerta.</li>\n  <li><strong>Visibilidade</strong>: canis, abrigos e veterinários podem aparecer no mapa da Orma e receber pedidos da comunidade.</li>\n</ul>\n\n<h2>Coloca o emblema da Orma no teu site</h2>\n<p>Copia este código e cola-o onde quiseres (rodapé, página de contactos, secção «ligações úteis»): mostrará um botão que leva os teus visitantes até à Orma.</p>",
    "de": "<h2>Warum Orma auf deine Website gehört</h2>\n<ul>\n  <li><strong>Eine konkrete Hilfe für deine Kundinnen und Kunden</strong>: Wer ein Tier verliert oder findet, hat sofort einen Ort, um es zu melden und Sichtungen von Menschen aus der Nähe zu erhalten.</li>\n  <li><strong>Weniger vergebliche Anrufe</strong>: Wer ein Tier findet, kann dir den Mikrochip auslesen lassen und es mit einer Meldung verknüpfen.</li>\n  <li><strong>Sichtbarkeit</strong>: Tierheime, Vereine und Tierärzte können auf der Orma-Karte erscheinen und Anfragen aus der Gemeinschaft erhalten.</li>\n</ul>\n\n<h2>Bring das Orma-Abzeichen auf deine Website</h2>\n<p>Kopiere diesen Code und füge ihn ein, wo du möchtest (Fußzeile, Kontaktseite, Bereich „nützliche Links“): Er zeigt eine Schaltfläche, die deine Besucherinnen und Besucher zu Orma führt.</p>",
    "fr": "<h2>Pourquoi mettre Orma sur votre site</h2>\n<ul>\n  <li><strong>Une aide concrète pour vos clients</strong> : qui perd ou trouve un animal dispose aussitôt d'un endroit pour le signaler et recevoir des observations des personnes proches.</li>\n  <li><strong>Moins d'appels sans suite</strong> : qui trouve un animal peut vous en faire lire la puce et le relier à un signalement.</li>\n  <li><strong>Visibilité</strong> : refuges, associations et vétérinaires peuvent apparaître sur la carte d'Orma et recevoir des demandes de la communauté.</li>\n</ul>\n\n<h2>Mettez le badge Orma sur votre site</h2>\n<p>Copiez ce code et collez-le où vous voulez (pied de page, page contact, rubrique « liens utiles ») : il affichera un bouton qui conduit vos visiteurs vers Orma.</p>"
  },
  "htmlAppear": {
    "it": "<h2>Vuoi comparire tra le strutture?</h2>\n<p>Se gestisci un canile, un rifugio o una clinica veterinaria e vuoi essere presente (e verificato) sulla mappa di Orma, scrivici: ti aiutiamo a impostare tutto.</p>",
    "en": "<h2>Want to appear among the facilities?</h2>\n<p>If you run a shelter, a rescue or a veterinary clinic and want to be listed (and verified) on the Orma map, write to us: we'll help you set everything up.</p>",
    "ro": "<h2>Vrei să apari printre structuri?</h2>\n<p>Dacă administrezi un adăpost, o asociație sau o clinică veterinară și vrei să fii prezent (și verificat) pe harta Orma, scrie-ne: te ajutăm să configurezi totul.</p>",
    "pt": "<h2>Queres aparecer entre as instituições?</h2>\n<p>Se geres um canil, um abrigo ou uma clínica veterinária e queres estar presente (e verificado) no mapa da Orma, escreve-nos: ajudamos-te a configurar tudo.</p>",
    "de": "<h2>Möchtest du unter den Einrichtungen erscheinen?</h2>\n<p>Wenn du ein Tierheim, einen Verein oder eine Tierarztpraxis führst und auf der Orma-Karte präsent (und geprüft) sein möchtest, schreib uns: Wir helfen dir, alles einzurichten.</p>",
    "fr": "<h2>Vous voulez figurer parmi les structures ?</h2>\n<p>Si vous gérez un refuge, une association ou une clinique vétérinaire et souhaitez être présent (et vérifié) sur la carte d'Orma, écrivez-nous : nous vous aidons à tout configurer.</p>"
  },
  "htmlPress": {
    "it": "<h2>Per la stampa</h2>\n<p>Orma è un'app italiana di community per ritrovare animali smarriti, trovati o abbandonati e favorire le adozioni da canili e rifugi. Nasce con la privacy al primo posto: dati su server europei.</p>\n<ul>\n  <li><strong>Nome</strong>: Orma — \"Ritrova il tuo amico\"</li>\n  <li><strong>Dove</strong>: Italia · <a href=\"https://orma.pet\">orma.pet</a></li>\n  <li><strong>Piattaforme</strong>: Android e iPhone</li>\n  <li><strong>Contatto</strong>: <a href=\"mailto:info@orma.pet\">info@orma.pet</a></li>\n  <li><strong>Logo</strong>: <a href=\"/favicon.svg\">scarica</a></li>\n</ul>",
    "en": "<h2>For the press</h2>\n<p>Orma is an Italian community app to find lost, found or abandoned animals and support adoptions from shelters and rescues. Built privacy-first: data on European servers.</p>\n<ul>\n  <li><strong>Name</strong>: Orma — \"Find your friend\"</li>\n  <li><strong>Where</strong>: Italy · <a href=\"https://orma.pet/en/\">orma.pet</a></li>\n  <li><strong>Platforms</strong>: Android and iPhone</li>\n  <li><strong>Contact</strong>: <a href=\"mailto:info@orma.pet\">info@orma.pet</a></li>\n  <li><strong>Logo</strong>: <a href=\"/favicon.svg\">download</a></li>\n</ul>",
    "ro": "<h2>Pentru presă</h2>\n<p>Orma este o aplicație italiană de comunitate pentru a găsi animale pierdute, găsite sau abandonate și pentru a sprijini adopțiile din adăposturi. S-a născut cu confidențialitatea pe primul loc: date pe servere europene.</p>\n<ul>\n  <li><strong>Nume</strong>: Orma — „Găsește-ți prietenul”</li>\n  <li><strong>Unde</strong>: Italia · <a href=\"https://orma.pet/ro/\">orma.pet</a></li>\n  <li><strong>Platforme</strong>: Android și iPhone</li>\n  <li><strong>Contact</strong>: <a href=\"mailto:info@orma.pet\">info@orma.pet</a></li>\n  <li><strong>Logo</strong>: <a href=\"/favicon.svg\">descarcă</a></li>\n</ul>",
    "pt": "<h2>Para a imprensa</h2>\n<p>A Orma é uma aplicação italiana de comunidade para encontrar animais perdidos, encontrados ou abandonados e apoiar as adoções em canis e abrigos. Nasceu com a privacidade em primeiro lugar: dados em servidores europeus.</p>\n<ul>\n  <li><strong>Nome</strong>: Orma — «Encontra o teu amigo»</li>\n  <li><strong>Onde</strong>: Itália · <a href=\"https://orma.pet/pt/\">orma.pet</a></li>\n  <li><strong>Plataformas</strong>: Android e iPhone</li>\n  <li><strong>Contacto</strong>: <a href=\"mailto:info@orma.pet\">info@orma.pet</a></li>\n  <li><strong>Logótipo</strong>: <a href=\"/favicon.svg\">descarregar</a></li>\n</ul>",
    "de": "<h2>Für die Presse</h2>\n<p>Orma ist eine italienische Gemeinschafts-App, um vermisste, gefundene oder ausgesetzte Tiere wiederzufinden und die Vermittlung aus Tierheimen zu unterstützen. Sie ist mit Datenschutz an erster Stelle entstanden: Daten auf europäischen Servern.</p>\n<ul>\n  <li><strong>Name</strong>: Orma — „Finde deinen Freund“</li>\n  <li><strong>Wo</strong>: Italien · <a href=\"https://orma.pet/de/\">orma.pet</a></li>\n  <li><strong>Plattformen</strong>: Android und iPhone</li>\n  <li><strong>Kontakt</strong>: <a href=\"mailto:info@orma.pet\">info@orma.pet</a></li>\n  <li><strong>Logo</strong>: <a href=\"/favicon.svg\">herunterladen</a></li>\n</ul>",
    "fr": "<h2>Pour la presse</h2>\n<p>Orma est une application communautaire italienne permettant de retrouver des animaux perdus, trouvés ou abandonnés et de favoriser les adoptions depuis les refuges. Elle est née avec la confidentialité en premier : données sur des serveurs européens.</p>\n<ul>\n  <li><strong>Nom</strong> : Orma — « Retrouvez votre ami »</li>\n  <li><strong>Où</strong> : Italie · <a href=\"https://orma.pet/fr/\">orma.pet</a></li>\n  <li><strong>Plateformes</strong> : Android et iPhone</li>\n  <li><strong>Contact</strong> : <a href=\"mailto:info@orma.pet\">info@orma.pet</a></li>\n  <li><strong>Logo</strong> : <a href=\"/favicon.svg\">télécharger</a></li>\n</ul>"
  }
};

