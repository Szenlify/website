export const SITE_URL = "https://lectoro.com";
export const CHROME_STORE_URL = "https://chromewebstore.google.com";

export const supportedLocales = ["en", "pl", "es", "de", "fr", "pt"] as const;
export type SiteLocale = (typeof supportedLocales)[number];

export const supportedCurrencies = [
  "USD",
  "EUR",
  "PLN",
  "GBP",
  "CAD",
  "AUD",
  "BRL",
  "MXN",
  "JPY",
  "INR",
] as const;
export type SiteCurrency = (typeof supportedCurrencies)[number];

export type Dictionary = {
  localeName: string;
  meta: { title: string; description: string; keywords: string[] };
  nav: { showcase: string; features: string; pricing: string; faq: string; add: string; language: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    body: string;
    primary: string;
    secondary: string;
    free: string;
    noCard: string;
    platforms: string;
    more: string;
    captionOriginal: string;
    captionTranslation: string;
    word: string;
    meaning: string;
    saved: string;
  };
  how: {
    eyebrow: string;
    title: string;
    body: string;
    steps: Array<{ number: string; title: string; body: string }>;
  };
  features: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string; tag: string }>;
  };
  video: { eyebrow: string; title: string; body: string; placeholder: string; note: string };
  showcase: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string; alt: string }>;
  };
  install: {
    eyebrow: string;
    title: string;
    body: string;
    steps: Array<{ title: string; body: string }>;
    browserLabel: string;
    pinned: string;
    cta: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    body: string;
    monthly: string;
    annual: string;
    save: string;
    region: string;
    freeName: string;
    freeDesc: string;
    forever: string;
    freeFeatures: string[];
    freeCta: string;
    proName: string;
    proDesc: string;
    perMonth: string;
    billedAnnually: string;
    proFeatures: string[];
    proCta: string;
    popular: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  final: { title: string; body: string; cta: string };
  footer: { tagline: string; product: string; legal: string; rights: string; disclaimer: string };
};

export const dictionaries: Record<SiteLocale, Dictionary> = {
  en: {
    localeName: "English",
    meta: {
      title: "Lectoro — Learn Languages with Netflix, YouTube & Dual Subtitles",
      description:
        "Learn a language while watching Netflix, YouTube, TED, Plex and more. Dual subtitles, instant translation and smart video flashcards in one Chrome extension.",
      keywords: [
        "dual subtitles",
        "learn languages with Netflix",
        "YouTube language learning extension",
        "bilingual subtitles Chrome extension",
        "video flashcards",
      ],
    },
    nav: { showcase: "Showcase", features: "Features", pricing: "Pricing", faq: "FAQ", add: "Add to Chrome", language: "Language" },
    hero: {
      eyebrow: "Your browser is now your language classroom",
      title: "Watch anything.",
      accent: "Understand everything.",
      body: "Dual subtitles, one-click translations and smart flashcards—right inside the videos you already love.",
      primary: "Add to Chrome — it’s free",
      secondary: "See how it works",
      free: "Free to start",
      noCard: "No card required",
      platforms: "Works wherever stories live",
      more: "and 1,000+ sites",
      captionOriginal: "I never thought it would be this simple.",
      captionTranslation: "Nigdy nie sądziłem, że to będzie takie proste.",
      word: "simple",
      meaning: "easy to understand or do",
      saved: "Saved to review",
    },
    how: {
      eyebrow: "Less studying. More living language.",
      title: "From watching to remembering in three clicks.",
      body: "Lectoro keeps you in the story and turns the moments that matter into lasting vocabulary.",
      steps: [
        { number: "01", title: "Turn on dual subtitles", body: "See the language you learn and the language you know at the same time." },
        { number: "02", title: "Click any word", body: "Get its meaning, pronunciation and context without leaving the video." },
        { number: "03", title: "Remember it", body: "Save the scene as a smart flashcard and review it at the right moment." },
      ],
    },
    features: {
      eyebrow: "One calm layer over the web",
      title: "Everything you need. Nothing in the way.",
      body: "Designed to feel native to every player, with the same focused dark interface as the Lectoro extension.",
      items: [
        { title: "Dual CC", body: "Accurate bilingual subtitles that follow every scene.", tag: "CC × 2" },
        { title: "Instant meaning", body: "Translation, pronunciation and context under your cursor.", tag: "1 click" },
        { title: "Memory that works", body: "Video flashcards and spaced repetition, built in.", tag: "Smart review" },
        { title: "AI when useful", body: "Explain phrases, grammar and cultural context in plain language.", tag: "AI explain" },
      ],
    },
    video: {
      eyebrow: "See the whole experience",
      title: "One video. Every reason to use Lectoro.",
      body: "A single product walkthrough will show dual subtitles, instant explanations, flashcards and reviews from start to finish.",
      placeholder: "Your Lectoro product video",
      note: "16:9 video space ready for the final file or YouTube embed",
    },
    showcase: {
      eyebrow: "Product showcase",
      title: "Built into the content. Never in your way.",
      body: "The real Lectoro interface stays close when you need it and disappears when you do not.",
      items: [
        { title: "AI inside the player", body: "Explain a phrase without pausing your flow.", alt: "Lectoro AI explanation panel inside a video player" },
        { title: "Review what matters", body: "Return to saved words at the right time.", alt: "Lectoro spaced repetition review panel" },
        { title: "Learn across the web", body: "Use the same tools while reading articles.", alt: "Lectoro language tools on an article page" },
      ],
    },
    install: {
      eyebrow: "Ready in seconds",
      title: "Pin Lectoro once. Keep it one click away.",
      body: "After installing, pin the extension to your Chrome toolbar for quick access to settings and reviews.",
      steps: [
        { title: "Open Extensions", body: "Click the puzzle icon in the top-right corner of Chrome." },
        { title: "Find Lectoro", body: "Locate Lectoro on your installed extensions list." },
        { title: "Click the pin", body: "The Lectoro icon will stay visible in your toolbar." },
      ],
      browserLabel: "Extensions",
      pinned: "Pinned to Chrome",
      cta: "Install Lectoro",
    },
    pricing: {
      eyebrow: "Simple pricing",
      title: "Start free. Upgrade when it clicks.",
      body: "Prices are shown in your local currency whenever possible.",
      monthly: "Monthly",
      annual: "Yearly",
      save: "Save 20%",
      region: "Regional pricing",
      freeName: "Free",
      freeDesc: "For relaxed everyday watching.",
      forever: "forever",
      freeFeatures: ["Dual subtitles", "Instant word translation", "30 AI explanations / month", "Built-in reviews"],
      freeCta: "Start free",
      proName: "Pro",
      proDesc: "For learners who want to move faster.",
      perMonth: "/ month",
      billedAnnually: "billed yearly",
      proFeatures: ["Everything in Free", "1,000 AI explanations / month", "Unlimited video flashcards", "Natural AI voices", "Anki export"],
      proCta: "Get Lectoro Pro",
      popular: "Most popular",
    },
    faq: {
      eyebrow: "Good to know",
      title: "A few quick answers.",
      items: [
        { q: "Which websites does Lectoro support?", a: "Lectoro works with Netflix, YouTube, TED, Plex, X and many other video and article websites." },
        { q: "Can I use it for any language?", a: "Yes. Choose the language you know and the one you are learning. Availability of source subtitles depends on the video." },
        { q: "Does it replace the original subtitles?", a: "No. Lectoro adds a clean interactive layer, and you can turn it off at any time." },
      ],
    },
    final: { title: "Your next episode can teach you something.", body: "Install Lectoro and turn the web into language you remember.", cta: "Add Lectoro to Chrome" },
    footer: { tagline: "Understand more of what you watch.", product: "Product", legal: "Legal", rights: "All rights reserved.", disclaimer: "Netflix, YouTube, TED, Plex and X are trademarks of their respective owners. Lectoro is not affiliated with them." },
  },
  pl: {
    localeName: "Polski",
    meta: {
      title: "Lectoro — Nauka języków z Netflix, YouTube i podwójnymi napisami",
      description: "Ucz się języka z Netflix, YouTube, TED, Plex i innych stron. Podwójne napisy, tłumaczenie jednym kliknięciem i inteligentne fiszki w Chrome.",
      keywords: ["podwójne napisy", "nauka angielskiego Netflix", "nauka języka YouTube", "wtyczka Chrome do języków", "fiszki z filmów"],
    },
    nav: { showcase: "Showcase", features: "Funkcje", pricing: "Cennik", faq: "FAQ", add: "Dodaj do Chrome", language: "Język" },
    hero: {
      eyebrow: "Twoja przeglądarka jest teraz szkołą języka",
      title: "Oglądaj wszystko.",
      accent: "Rozumiej więcej.",
      body: "Podwójne napisy, tłumaczenia jednym kliknięciem i inteligentne fiszki — w filmach, które i tak oglądasz.",
      primary: "Dodaj do Chrome — za darmo",
      secondary: "Zobacz, jak to działa",
      free: "Darmowy start",
      noCard: "Bez karty",
      platforms: "Działa tam, gdzie oglądasz",
      more: "i ponad 1000 stron",
      captionOriginal: "I never thought it would be this simple.",
      captionTranslation: "Nie sądziłem, że to będzie takie proste.",
      word: "simple",
      meaning: "prosty, łatwy do zrozumienia",
      saved: "Zapisano do powtórek",
    },
    how: {
      eyebrow: "Mniej nauki. Więcej żywego języka.",
      title: "Od oglądania do zapamiętania w trzech kliknięciach.",
      body: "Lectoro nie wyrywa Cię z filmu. Ważne momenty zmienia w słownictwo, które zostaje na dłużej.",
      steps: [
        { number: "01", title: "Włącz podwójne napisy", body: "Widzisz język, którego się uczysz, i tłumaczenie jednocześnie." },
        { number: "02", title: "Kliknij dowolne słowo", body: "Poznaj znaczenie, wymowę i kontekst bez opuszczania filmu." },
        { number: "03", title: "Zapamiętaj", body: "Zapisz scenę jako fiszkę i wróć do niej we właściwym momencie." },
      ],
    },
    features: {
      eyebrow: "Jedna spokojna warstwa nad internetem",
      title: "Wszystko, czego potrzebujesz. Zero rozpraszaczy.",
      body: "Interfejs pasuje do każdego odtwarzacza i zachowuje ciemny, skupiony styl wtyczki Lectoro.",
      items: [
        { title: "Podwójne CC", body: "Dwujęzyczne napisy, które nadążają za każdą sceną.", tag: "CC × 2" },
        { title: "Znaczenie od razu", body: "Tłumaczenie, wymowa i kontekst pod kursorem.", tag: "1 klik" },
        { title: "Skuteczna pamięć", body: "Fiszki z filmów i powtórki rozłożone w czasie.", tag: "Smart review" },
        { title: "AI, gdy go potrzebujesz", body: "Proste wyjaśnienia zwrotów, gramatyki i kontekstu.", tag: "AI explain" },
      ],
    },
    video: {
      eyebrow: "Zobacz wszystko w praktyce",
      title: "Jedno wideo. Całe Lectoro od początku do końca.",
      body: "W jednym materiale pokażesz podwójne napisy, wyjaśnienia AI, tworzenie fiszek i system powtórek.",
      placeholder: "Miejsce na główne wideo Lectoro",
      note: "Gotowy format 16:9 pod plik wideo lub osadzenie z YouTube",
    },
    showcase: {
      eyebrow: "Showcase produktu",
      title: "W treści, kiedy go potrzebujesz. Poza drogą, kiedy oglądasz.",
      body: "Prawdziwy interfejs Lectoro działa bezpośrednio na filmach i stronach, bez przełączania kart.",
      items: [
        { title: "AI w odtwarzaczu", body: "Wyjaśniaj całe zwroty bez wychodzenia z filmu.", alt: "Panel wyjaśnień AI Lectoro na odtwarzaczu wideo" },
        { title: "Powtarzaj to, co ważne", body: "Wracaj do zapisanych słów we właściwym momencie.", alt: "Panel inteligentnych powtórek Lectoro" },
        { title: "Ucz się w całym internecie", body: "Korzystaj z tych samych narzędzi podczas czytania.", alt: "Narzędzia językowe Lectoro na stronie z artykułem" },
      ],
    },
    install: {
      eyebrow: "Gotowe w kilka sekund",
      title: "Przypnij Lectoro raz. Miej je zawsze pod ręką.",
      body: "Po instalacji przypnij rozszerzenie do paska Chrome, aby szybko otwierać ustawienia i powtórki.",
      steps: [
        { title: "Otwórz rozszerzenia", body: "Kliknij ikonę puzzla w prawym górnym rogu Chrome." },
        { title: "Znajdź Lectoro", body: "Odszukaj Lectoro na liście zainstalowanych rozszerzeń." },
        { title: "Kliknij pinezkę", body: "Ikona Lectoro zostanie na stałe na pasku przeglądarki." },
      ],
      browserLabel: "Rozszerzenia",
      pinned: "Przypięto do Chrome",
      cta: "Zainstaluj Lectoro",
    },
    pricing: {
      eyebrow: "Prosty cennik",
      title: "Zacznij za darmo. Przejdź wyżej, gdy zechcesz.",
      body: "Jeśli to możliwe, pokazujemy ceny w Twojej lokalnej walucie.",
      monthly: "Miesięcznie",
      annual: "Rocznie",
      save: "Oszczędź 20%",
      region: "Cena regionalna",
      freeName: "Free",
      freeDesc: "Do swobodnego oglądania na co dzień.",
      forever: "na zawsze",
      freeFeatures: ["Podwójne napisy", "Tłumaczenie słów", "30 wyjaśnień AI / miesiąc", "Wbudowane powtórki"],
      freeCta: "Zacznij za darmo",
      proName: "Pro",
      proDesc: "Dla osób, które chcą uczyć się szybciej.",
      perMonth: "/ miesiąc",
      billedAnnually: "płatne raz w roku",
      proFeatures: ["Wszystko z Free", "1000 wyjaśnień AI / miesiąc", "Fiszki wideo bez limitu", "Naturalne głosy AI", "Eksport do Anki"],
      proCta: "Wybierz Lectoro Pro",
      popular: "Najczęściej wybierany",
    },
    faq: {
      eyebrow: "Warto wiedzieć",
      title: "Kilka krótkich odpowiedzi.",
      items: [
        { q: "Na jakich stronach działa Lectoro?", a: "Na Netflix, YouTube, TED, Plex, X oraz wielu innych stronach z filmami i artykułami." },
        { q: "Czy mogę uczyć się dowolnego języka?", a: "Tak. Wybierasz język znany i język nauki. Dostępność napisów źródłowych zależy od filmu." },
        { q: "Czy Lectoro zastępuje oryginalne napisy?", a: "Nie. Dodaje lekką, interaktywną warstwę, którą możesz wyłączyć w każdej chwili." },
      ],
    },
    final: { title: "Następny odcinek może Cię czegoś nauczyć.", body: "Zainstaluj Lectoro i zamieniaj oglądanie w język, który pamiętasz.", cta: "Dodaj Lectoro do Chrome" },
    footer: { tagline: "Rozumiej więcej z tego, co oglądasz.", product: "Produkt", legal: "Informacje", rights: "Wszelkie prawa zastrzeżone.", disclaimer: "Netflix, YouTube, TED, Plex i X są znakami towarowymi odpowiednich właścicieli. Lectoro nie jest z nimi powiązane." },
  },
  es: {
    localeName: "Español",
    meta: {
      title: "Lectoro — Aprende idiomas con Netflix, YouTube y subtítulos dobles",
      description: "Aprende idiomas con Netflix, YouTube, TED, Plex y más. Subtítulos dobles, traducción instantánea y tarjetas de vídeo en Chrome.",
      keywords: ["subtítulos dobles", "aprender idiomas con Netflix", "extensión de idiomas YouTube", "subtítulos bilingües Chrome", "tarjetas de vídeo"],
    },
    nav: { showcase: "Showcase", features: "Funciones", pricing: "Precios", faq: "FAQ", add: "Añadir a Chrome", language: "Idioma" },
    hero: {
      eyebrow: "Tu navegador ahora es tu aula de idiomas",
      title: "Mira lo que quieras.",
      accent: "Entiéndelo todo.",
      body: "Subtítulos dobles, traducciones con un clic y tarjetas inteligentes dentro de los vídeos que ya te gustan.",
      primary: "Añadir a Chrome — gratis",
      secondary: "Cómo funciona",
      free: "Empieza gratis",
      noCard: "Sin tarjeta",
      platforms: "Funciona donde viven las historias",
      more: "y más de 1000 sitios",
      captionOriginal: "I never thought it would be this simple.",
      captionTranslation: "Nunca pensé que sería tan sencillo.",
      word: "simple",
      meaning: "fácil de entender o hacer",
      saved: "Guardado para repasar",
    },
    how: {
      eyebrow: "Menos estudio. Más idioma real.",
      title: "De mirar a recordar en tres clics.",
      body: "Lectoro te mantiene en la historia y convierte cada momento importante en vocabulario duradero.",
      steps: [
        { number: "01", title: "Activa subtítulos dobles", body: "Ve al mismo tiempo el idioma que aprendes y el que ya conoces." },
        { number: "02", title: "Haz clic en una palabra", body: "Descubre su significado, pronunciación y contexto sin salir del vídeo." },
        { number: "03", title: "Recuérdala", body: "Guarda la escena como tarjeta y repásala en el momento adecuado." },
      ],
    },
    features: {
      eyebrow: "Una capa tranquila sobre la web",
      title: "Todo lo necesario. Nada que moleste.",
      body: "Creado para sentirse natural en cada reproductor, con el estilo oscuro y enfocado de Lectoro.",
      items: [
        { title: "CC dobles", body: "Subtítulos bilingües precisos para cada escena.", tag: "CC × 2" },
        { title: "Significado al instante", body: "Traducción, pronunciación y contexto bajo el cursor.", tag: "1 clic" },
        { title: "Memoria eficaz", body: "Tarjetas de vídeo y repetición espaciada integradas.", tag: "Repaso smart" },
        { title: "IA cuando ayuda", body: "Explica frases, gramática y contexto con claridad.", tag: "IA explica" },
      ],
    },
    video: {
      eyebrow: "Todo en acción", title: "Un vídeo. Todo Lectoro de principio a fin.",
      body: "Un recorrido mostrará subtítulos dobles, explicaciones, tarjetas y repasos en una sola historia.",
      placeholder: "Espacio para el vídeo principal de Lectoro", note: "Formato 16:9 listo para vídeo o YouTube",
    },
    showcase: {
      eyebrow: "Showcase del producto", title: "Dentro del contenido. Nunca en medio.",
      body: "La interfaz real de Lectoro aparece cuando la necesitas y desaparece cuando solo quieres mirar.",
      items: [
        { title: "IA en el reproductor", body: "Explica frases sin salir del vídeo.", alt: "Panel de explicación IA de Lectoro en un vídeo" },
        { title: "Repasa lo importante", body: "Vuelve a tus palabras en el momento justo.", alt: "Panel de repaso espaciado de Lectoro" },
        { title: "Aprende en toda la web", body: "Usa las mismas herramientas al leer.", alt: "Herramientas de Lectoro en un artículo" },
      ],
    },
    install: {
      eyebrow: "Listo en segundos", title: "Fija Lectoro una vez. Tenlo siempre a un clic.",
      body: "Después de instalarlo, fija la extensión en la barra de Chrome para abrir ajustes y repasos rápidamente.",
      steps: [
        { title: "Abre Extensiones", body: "Haz clic en el puzle de la esquina superior derecha." },
        { title: "Busca Lectoro", body: "Encuéntralo en tu lista de extensiones instaladas." },
        { title: "Pulsa la chincheta", body: "El icono quedará visible en la barra de Chrome." },
      ],
      browserLabel: "Extensiones", pinned: "Fijado en Chrome", cta: "Instalar Lectoro",
    },
    pricing: {
      eyebrow: "Precios simples",
      title: "Empieza gratis. Mejora cuando quieras.",
      body: "Mostramos precios en tu moneda local cuando es posible.",
      monthly: "Mensual", annual: "Anual", save: "Ahorra 20%", region: "Precio regional",
      freeName: "Gratis", freeDesc: "Para mirar y aprender cada día.", forever: "para siempre",
      freeFeatures: ["Subtítulos dobles", "Traducción instantánea", "30 explicaciones IA / mes", "Repasos integrados"], freeCta: "Empezar gratis",
      proName: "Pro", proDesc: "Para avanzar más rápido.", perMonth: "/ mes", billedAnnually: "facturado anualmente",
      proFeatures: ["Todo lo de Gratis", "1000 explicaciones IA / mes", "Tarjetas de vídeo ilimitadas", "Voces IA naturales", "Exportación a Anki"], proCta: "Obtener Lectoro Pro", popular: "Más popular",
    },
    faq: {
      eyebrow: "Conviene saberlo", title: "Respuestas rápidas.",
      items: [
        { q: "¿Qué sitios admite Lectoro?", a: "Netflix, YouTube, TED, Plex, X y muchos otros sitios de vídeo y artículos." },
        { q: "¿Puedo aprender cualquier idioma?", a: "Sí. Elige el idioma que conoces y el que aprendes. Los subtítulos disponibles dependen del vídeo." },
        { q: "¿Sustituye los subtítulos originales?", a: "No. Lectoro añade una capa interactiva que puedes desactivar cuando quieras." },
      ],
    },
    final: { title: "Tu próximo episodio puede enseñarte algo.", body: "Instala Lectoro y convierte la web en un idioma que recuerdas.", cta: "Añadir Lectoro a Chrome" },
    footer: { tagline: "Entiende más de lo que ves.", product: "Producto", legal: "Legal", rights: "Todos los derechos reservados.", disclaimer: "Netflix, YouTube, TED, Plex y X son marcas de sus respectivos propietarios. Lectoro no está afiliado a ellos." },
  },
  de: {
    localeName: "Deutsch",
    meta: {
      title: "Lectoro — Sprachen lernen mit Netflix, YouTube & zweisprachigen Untertiteln",
      description: "Lerne Sprachen mit Netflix, YouTube, TED, Plex und mehr. Zweisprachige Untertitel, Sofortübersetzung und Video-Lernkarten für Chrome.",
      keywords: ["zweisprachige Untertitel", "Sprachen lernen mit Netflix", "YouTube Sprachlern-Erweiterung", "Chrome Untertitel Erweiterung", "Video Lernkarten"],
    },
    nav: { showcase: "Showcase", features: "Funktionen", pricing: "Preise", faq: "FAQ", add: "Zu Chrome", language: "Sprache" },
    hero: {
      eyebrow: "Dein Browser wird zum Sprachkurs",
      title: "Schau, was du willst.",
      accent: "Verstehe alles.",
      body: "Zweisprachige Untertitel, Übersetzungen per Klick und smarte Lernkarten — direkt in deinen Lieblingsvideos.",
      primary: "Kostenlos zu Chrome",
      secondary: "So funktioniert’s",
      free: "Kostenlos starten",
      noCard: "Keine Karte nötig",
      platforms: "Funktioniert überall, wo Geschichten laufen",
      more: "und auf 1.000+ Seiten",
      captionOriginal: "I never thought it would be this simple.",
      captionTranslation: "Ich hätte nie gedacht, dass es so einfach ist.",
      word: "simple",
      meaning: "leicht zu verstehen oder zu tun",
      saved: "Zum Wiederholen gespeichert",
    },
    how: {
      eyebrow: "Weniger pauken. Mehr echte Sprache.",
      title: "Vom Zuschauen zum Erinnern in drei Klicks.",
      body: "Lectoro hält dich in der Geschichte und macht wichtige Momente zu dauerhaftem Wortschatz.",
      steps: [
        { number: "01", title: "Zwei Untertitel aktivieren", body: "Sieh Lernsprache und Übersetzung gleichzeitig." },
        { number: "02", title: "Ein Wort anklicken", body: "Bedeutung, Aussprache und Kontext, ohne das Video zu verlassen." },
        { number: "03", title: "Im Gedächtnis behalten", body: "Speichere die Szene als Lernkarte und wiederhole sie zur richtigen Zeit." },
      ],
    },
    features: {
      eyebrow: "Eine ruhige Ebene über dem Web",
      title: "Alles, was du brauchst. Nichts, was stört.",
      body: "Passt zu jedem Player und behält den fokussierten Dark-Look der Lectoro-Erweiterung.",
      items: [
        { title: "Doppelte CC", body: "Präzise zweisprachige Untertitel für jede Szene.", tag: "CC × 2" },
        { title: "Sofort verstehen", body: "Übersetzung, Aussprache und Kontext unter dem Cursor.", tag: "1 Klick" },
        { title: "Wirksam erinnern", body: "Video-Lernkarten und verteiltes Wiederholen inklusive.", tag: "Smart Review" },
        { title: "KI, wenn sie hilft", body: "Klare Erklärungen zu Redewendungen, Grammatik und Kultur.", tag: "KI erklärt" },
      ],
    },
    video: {
      eyebrow: "Alles in Aktion", title: "Ein Video. Lectoro von Anfang bis Ende.",
      body: "Ein Rundgang zeigt doppelte Untertitel, Erklärungen, Lernkarten und Wiederholungen in einem Ablauf.",
      placeholder: "Platz für das große Lectoro-Video", note: "16:9, bereit für Videodatei oder YouTube",
    },
    showcase: {
      eyebrow: "Produkt-Showcase", title: "Im Inhalt. Niemals im Weg.",
      body: "Die echte Lectoro-Oberfläche ist da, wenn du sie brauchst, und verschwindet beim Zuschauen.",
      items: [
        { title: "KI im Player", body: "Redewendungen erklären, ohne das Video zu verlassen.", alt: "Lectoro KI-Erklärung in einem Videoplayer" },
        { title: "Das Wichtige wiederholen", body: "Gespeicherte Wörter zur richtigen Zeit üben.", alt: "Lectoro Wiederholungsansicht" },
        { title: "Im ganzen Web lernen", body: "Dieselben Werkzeuge beim Lesen verwenden.", alt: "Lectoro Sprachwerkzeuge auf einer Artikelseite" },
      ],
    },
    install: {
      eyebrow: "In Sekunden bereit", title: "Lectoro einmal anheften. Immer griffbereit.",
      body: "Hefte die Erweiterung nach der Installation an Chrome an, um Einstellungen und Wiederholungen schnell zu öffnen.",
      steps: [
        { title: "Erweiterungen öffnen", body: "Klicke oben rechts in Chrome auf das Puzzle-Symbol." },
        { title: "Lectoro finden", body: "Suche Lectoro in der Liste deiner Erweiterungen." },
        { title: "Pin anklicken", body: "Das Lectoro-Symbol bleibt in der Browserleiste sichtbar." },
      ],
      browserLabel: "Erweiterungen", pinned: "An Chrome angeheftet", cta: "Lectoro installieren",
    },
    pricing: {
      eyebrow: "Einfache Preise", title: "Kostenlos starten. Später upgraden.", body: "Wo möglich, zeigen wir Preise in deiner lokalen Währung.",
      monthly: "Monatlich", annual: "Jährlich", save: "20 % sparen", region: "Regionaler Preis",
      freeName: "Kostenlos", freeDesc: "Für entspanntes tägliches Schauen.", forever: "für immer",
      freeFeatures: ["Zweisprachige Untertitel", "Sofortübersetzung", "30 KI-Erklärungen / Monat", "Integrierte Wiederholungen"], freeCta: "Kostenlos starten",
      proName: "Pro", proDesc: "Für alle, die schneller vorankommen wollen.", perMonth: "/ Monat", billedAnnually: "jährlich abgerechnet",
      proFeatures: ["Alles aus Kostenlos", "1.000 KI-Erklärungen / Monat", "Unbegrenzte Video-Lernkarten", "Natürliche KI-Stimmen", "Anki-Export"], proCta: "Lectoro Pro wählen", popular: "Am beliebtesten",
    },
    faq: {
      eyebrow: "Gut zu wissen", title: "Kurz beantwortet.",
      items: [
        { q: "Welche Websites unterstützt Lectoro?", a: "Netflix, YouTube, TED, Plex, X und viele weitere Video- und Artikelseiten." },
        { q: "Kann ich jede Sprache lernen?", a: "Ja. Wähle deine bekannte Sprache und deine Lernsprache. Quelluntertitel hängen vom Video ab." },
        { q: "Ersetzt Lectoro die Originaluntertitel?", a: "Nein. Lectoro ergänzt eine interaktive Ebene, die du jederzeit ausschalten kannst." },
      ],
    },
    final: { title: "Deine nächste Folge kann dir etwas beibringen.", body: "Installiere Lectoro und mache das Web zu Sprache, die bleibt.", cta: "Lectoro zu Chrome hinzufügen" },
    footer: { tagline: "Verstehe mehr von dem, was du siehst.", product: "Produkt", legal: "Rechtliches", rights: "Alle Rechte vorbehalten.", disclaimer: "Netflix, YouTube, TED, Plex und X sind Marken ihrer jeweiligen Inhaber. Lectoro steht in keiner Verbindung zu ihnen." },
  },
  fr: {
    localeName: "Français",
    meta: {
      title: "Lectoro — Apprendre les langues avec Netflix, YouTube et doubles sous-titres",
      description: "Apprenez avec Netflix, YouTube, TED, Plex et plus. Doubles sous-titres, traduction instantanée et cartes vidéo dans Chrome.",
      keywords: ["doubles sous-titres", "apprendre avec Netflix", "extension langues YouTube", "sous-titres bilingues Chrome", "cartes vidéo"],
    },
    nav: { showcase: "Showcase", features: "Fonctions", pricing: "Tarifs", faq: "FAQ", add: "Ajouter à Chrome", language: "Langue" },
    hero: {
      eyebrow: "Votre navigateur devient votre cours de langue",
      title: "Regardez tout.",
      accent: "Comprenez vraiment.",
      body: "Doubles sous-titres, traduction en un clic et cartes intelligentes — dans les vidéos que vous aimez déjà.",
      primary: "Ajouter à Chrome — gratuit",
      secondary: "Voir comment ça marche",
      free: "Démarrage gratuit",
      noCard: "Sans carte bancaire",
      platforms: "Partout où vivent les histoires",
      more: "et plus de 1 000 sites",
      captionOriginal: "I never thought it would be this simple.",
      captionTranslation: "Je n’aurais jamais pensé que ce serait si simple.",
      word: "simple",
      meaning: "facile à comprendre ou à faire",
      saved: "Enregistré pour révision",
    },
    how: {
      eyebrow: "Moins étudier. Plus vivre la langue.",
      title: "Du visionnage à la mémoire en trois clics.",
      body: "Lectoro vous garde dans l’histoire et transforme les bons moments en vocabulaire durable.",
      steps: [
        { number: "01", title: "Activez les doubles sous-titres", body: "Voyez en même temps la langue apprise et celle que vous connaissez." },
        { number: "02", title: "Cliquez sur un mot", body: "Obtenez le sens, la prononciation et le contexte sans quitter la vidéo." },
        { number: "03", title: "Mémorisez-le", body: "Gardez la scène comme carte et révisez-la au bon moment." },
      ],
    },
    features: {
      eyebrow: "Une couche calme sur le web",
      title: "Tout le nécessaire. Rien qui gêne.",
      body: "Conçu pour s’intégrer à chaque lecteur avec l’interface sombre et concentrée de Lectoro.",
      items: [
        { title: "Double CC", body: "Des sous-titres bilingues précis pour chaque scène.", tag: "CC × 2" },
        { title: "Sens instantané", body: "Traduction, prononciation et contexte sous le curseur.", tag: "1 clic" },
        { title: "Mémoire efficace", body: "Cartes vidéo et répétition espacée intégrées.", tag: "Révision smart" },
        { title: "L’IA au bon moment", body: "Des explications simples pour les expressions et la grammaire.", tag: "IA explique" },
      ],
    },
    video: {
      eyebrow: "Tout voir en action", title: "Une vidéo. Tout Lectoro du début à la fin.",
      body: "Une seule démonstration présentera les doubles sous-titres, les explications, les cartes et les révisions.",
      placeholder: "Emplacement pour la vidéo Lectoro", note: "Format 16:9 prêt pour une vidéo ou YouTube",
    },
    showcase: {
      eyebrow: "Showcase produit", title: "Dans le contenu. Jamais dans votre chemin.",
      body: "La véritable interface Lectoro reste disponible quand vous en avez besoin et s’efface pendant le visionnage.",
      items: [
        { title: "L’IA dans le lecteur", body: "Expliquez une expression sans quitter la vidéo.", alt: "Panneau d’explication IA Lectoro dans une vidéo" },
        { title: "Révisez l’essentiel", body: "Retrouvez vos mots au bon moment.", alt: "Panneau de répétition espacée Lectoro" },
        { title: "Apprenez sur tout le web", body: "Utilisez les mêmes outils pendant la lecture.", alt: "Outils Lectoro sur une page d’article" },
      ],
    },
    install: {
      eyebrow: "Prêt en quelques secondes", title: "Épinglez Lectoro une fois. Gardez-le à portée de clic.",
      body: "Après l’installation, épinglez l’extension à Chrome pour accéder vite aux réglages et aux révisions.",
      steps: [
        { title: "Ouvrez les extensions", body: "Cliquez sur le puzzle en haut à droite de Chrome." },
        { title: "Trouvez Lectoro", body: "Repérez Lectoro dans la liste des extensions installées." },
        { title: "Cliquez sur l’épingle", body: "L’icône Lectoro restera visible dans la barre." },
      ],
      browserLabel: "Extensions", pinned: "Épinglé à Chrome", cta: "Installer Lectoro",
    },
    pricing: {
      eyebrow: "Tarifs simples", title: "Commencez gratuitement. Évoluez ensuite.", body: "Les prix s’affichent dans votre devise locale si possible.",
      monthly: "Mensuel", annual: "Annuel", save: "Économisez 20 %", region: "Prix régional",
      freeName: "Gratuit", freeDesc: "Pour regarder et apprendre au quotidien.", forever: "pour toujours",
      freeFeatures: ["Doubles sous-titres", "Traduction instantanée", "30 explications IA / mois", "Révisions intégrées"], freeCta: "Commencer gratuitement",
      proName: "Pro", proDesc: "Pour progresser plus vite.", perMonth: "/ mois", billedAnnually: "facturé annuellement",
      proFeatures: ["Tout le plan Gratuit", "1 000 explications IA / mois", "Cartes vidéo illimitées", "Voix IA naturelles", "Export Anki"], proCta: "Choisir Lectoro Pro", popular: "Le plus populaire",
    },
    faq: {
      eyebrow: "Bon à savoir", title: "Quelques réponses rapides.",
      items: [
        { q: "Quels sites sont compatibles ?", a: "Netflix, YouTube, TED, Plex, X et de nombreux autres sites de vidéos et d’articles." },
        { q: "Puis-je apprendre n’importe quelle langue ?", a: "Oui. Choisissez la langue connue et celle à apprendre. Les sous-titres source dépendent de la vidéo." },
        { q: "Lectoro remplace-t-il les sous-titres ?", a: "Non. Il ajoute une couche interactive légère que vous pouvez désactiver à tout moment." },
      ],
    },
    final: { title: "Votre prochain épisode peut vous apprendre quelque chose.", body: "Installez Lectoro et transformez le web en langue que vous retenez.", cta: "Ajouter Lectoro à Chrome" },
    footer: { tagline: "Comprenez mieux ce que vous regardez.", product: "Produit", legal: "Mentions", rights: "Tous droits réservés.", disclaimer: "Netflix, YouTube, TED, Plex et X sont des marques de leurs propriétaires respectifs. Lectoro n’y est pas affilié." },
  },
  pt: {
    localeName: "Português",
    meta: {
      title: "Lectoro — Aprenda idiomas com Netflix, YouTube e legendas duplas",
      description: "Aprenda com Netflix, YouTube, TED, Plex e mais. Legendas duplas, tradução instantânea e flashcards de vídeo no Chrome.",
      keywords: ["legendas duplas", "aprender idiomas Netflix", "extensão idiomas YouTube", "legendas bilíngues Chrome", "flashcards de vídeo"],
    },
    nav: { showcase: "Showcase", features: "Recursos", pricing: "Preços", faq: "FAQ", add: "Adicionar ao Chrome", language: "Idioma" },
    hero: {
      eyebrow: "Seu navegador virou sua sala de idiomas",
      title: "Assista a tudo.",
      accent: "Entenda de verdade.",
      body: "Legendas duplas, traduções com um clique e flashcards inteligentes nos vídeos que você já ama.",
      primary: "Adicionar ao Chrome — grátis",
      secondary: "Veja como funciona",
      free: "Comece grátis",
      noCard: "Sem cartão",
      platforms: "Funciona onde as histórias acontecem",
      more: "e mais de 1.000 sites",
      captionOriginal: "I never thought it would be this simple.",
      captionTranslation: "Nunca pensei que seria tão simples.",
      word: "simple",
      meaning: "fácil de entender ou fazer",
      saved: "Salvo para revisão",
    },
    how: {
      eyebrow: "Menos estudo. Mais língua real.",
      title: "De assistir a lembrar em três cliques.",
      body: "Lectoro mantém você na história e transforma os momentos certos em vocabulário duradouro.",
      steps: [
        { number: "01", title: "Ative legendas duplas", body: "Veja ao mesmo tempo o idioma que aprende e o que já conhece." },
        { number: "02", title: "Clique em qualquer palavra", body: "Veja significado, pronúncia e contexto sem sair do vídeo." },
        { number: "03", title: "Lembre-se", body: "Salve a cena como flashcard e revise na hora certa." },
      ],
    },
    features: {
      eyebrow: "Uma camada tranquila sobre a web",
      title: "Tudo o que precisa. Nada atrapalhando.",
      body: "Feito para parecer nativo em cada player, com o visual escuro e focado do Lectoro.",
      items: [
        { title: "CC duplo", body: "Legendas bilíngues precisas em cada cena.", tag: "CC × 2" },
        { title: "Significado imediato", body: "Tradução, pronúncia e contexto sob o cursor.", tag: "1 clique" },
        { title: "Memória eficiente", body: "Flashcards de vídeo e repetição espaçada integrados.", tag: "Revisão smart" },
        { title: "IA quando ajuda", body: "Explicações simples de frases, gramática e contexto.", tag: "IA explica" },
      ],
    },
    video: {
      eyebrow: "Veja tudo em ação", title: "Um vídeo. Todo o Lectoro do início ao fim.",
      body: "Uma demonstração mostrará legendas duplas, explicações, flashcards e revisões em uma única história.",
      placeholder: "Espaço para o vídeo principal do Lectoro", note: "Formato 16:9 pronto para vídeo ou YouTube",
    },
    showcase: {
      eyebrow: "Showcase do produto", title: "Dentro do conteúdo. Nunca no caminho.",
      body: "A interface real do Lectoro aparece quando você precisa e desaparece quando quer apenas assistir.",
      items: [
        { title: "IA no player", body: "Explique expressões sem sair do vídeo.", alt: "Painel de explicação por IA do Lectoro em um vídeo" },
        { title: "Revise o que importa", body: "Volte às palavras salvas na hora certa.", alt: "Painel de repetição espaçada do Lectoro" },
        { title: "Aprenda em toda a web", body: "Use as mesmas ferramentas durante a leitura.", alt: "Ferramentas do Lectoro em uma página de artigo" },
      ],
    },
    install: {
      eyebrow: "Pronto em segundos", title: "Fixe o Lectoro uma vez. Tenha-o sempre a um clique.",
      body: "Após instalar, fixe a extensão na barra do Chrome para abrir configurações e revisões rapidamente.",
      steps: [
        { title: "Abra Extensões", body: "Clique no quebra-cabeça no canto superior direito." },
        { title: "Encontre o Lectoro", body: "Localize o Lectoro na lista de extensões instaladas." },
        { title: "Clique no alfinete", body: "O ícone ficará visível na barra do Chrome." },
      ],
      browserLabel: "Extensões", pinned: "Fixado no Chrome", cta: "Instalar Lectoro",
    },
    pricing: {
      eyebrow: "Preços simples", title: "Comece grátis. Faça upgrade depois.", body: "Mostramos preços na sua moeda local quando possível.",
      monthly: "Mensal", annual: "Anual", save: "Economize 20%", region: "Preço regional",
      freeName: "Grátis", freeDesc: "Para assistir e aprender todo dia.", forever: "para sempre",
      freeFeatures: ["Legendas duplas", "Tradução instantânea", "30 explicações de IA / mês", "Revisões integradas"], freeCta: "Começar grátis",
      proName: "Pro", proDesc: "Para avançar mais rápido.", perMonth: "/ mês", billedAnnually: "cobrado anualmente",
      proFeatures: ["Tudo do Grátis", "1.000 explicações de IA / mês", "Flashcards de vídeo ilimitados", "Vozes naturais de IA", "Exportação para Anki"], proCta: "Obter Lectoro Pro", popular: "Mais popular",
    },
    faq: {
      eyebrow: "Bom saber", title: "Respostas rápidas.",
      items: [
        { q: "Quais sites o Lectoro suporta?", a: "Netflix, YouTube, TED, Plex, X e muitos outros sites de vídeos e artigos." },
        { q: "Posso aprender qualquer idioma?", a: "Sim. Escolha o idioma que conhece e o que aprende. As legendas disponíveis dependem do vídeo." },
        { q: "Ele substitui as legendas originais?", a: "Não. O Lectoro adiciona uma camada interativa que pode ser desligada a qualquer momento." },
      ],
    },
    final: { title: "Seu próximo episódio pode ensinar algo.", body: "Instale o Lectoro e transforme a web em um idioma que você lembra.", cta: "Adicionar Lectoro ao Chrome" },
    footer: { tagline: "Entenda mais do que você assiste.", product: "Produto", legal: "Legal", rights: "Todos os direitos reservados.", disclaimer: "Netflix, YouTube, TED, Plex e X são marcas de seus respectivos proprietários. O Lectoro não é afiliado a eles." },
  },
};

const localeTags: Record<SiteLocale, string> = {
  en: "en-US",
  pl: "pl-PL",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
  pt: "pt-BR",
};

const countryCurrencies: Record<string, SiteCurrency> = {
  PL: "PLN", GB: "GBP", IE: "EUR", FR: "EUR", DE: "EUR", ES: "EUR", PT: "EUR", IT: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", FI: "EUR", GR: "EUR", SK: "EUR", SI: "EUR", LT: "EUR", LV: "EUR", EE: "EUR", LU: "EUR", HR: "EUR", CY: "EUR", MT: "EUR",
  CA: "CAD", AU: "AUD", NZ: "AUD", BR: "BRL", MX: "MXN", JP: "JPY", IN: "INR",
};

const prices: Record<SiteCurrency, { monthly: number; annual: number }> = {
  USD: { monthly: 9.99, annual: 7.99 },
  EUR: { monthly: 8.99, annual: 6.99 },
  PLN: { monthly: 39, annual: 29 },
  GBP: { monthly: 7.99, annual: 5.99 },
  CAD: { monthly: 12.99, annual: 9.99 },
  AUD: { monthly: 14.99, annual: 11.99 },
  BRL: { monthly: 39.9, annual: 29.9 },
  MXN: { monthly: 179, annual: 139 },
  JPY: { monthly: 1400, annual: 1100 },
  INR: { monthly: 799, annual: 599 },
};

export function isLocale(value: string | undefined): value is SiteLocale {
  return !!value && supportedLocales.includes(value as SiteLocale);
}

export function isCurrency(value: string | undefined): value is SiteCurrency {
  return !!value && supportedCurrencies.includes(value as SiteCurrency);
}

export function detectLocale(acceptLanguage: string | null, override?: string): SiteLocale {
  if (isLocale(override)) return override;
  const requested = acceptLanguage
    ?.split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase().split("-")[0])
    .find((locale): locale is SiteLocale => isLocale(locale));
  return requested ?? "en";
}

function countryFromLanguage(acceptLanguage: string | null, locale: SiteLocale): string {
  const region = acceptLanguage?.match(/^[a-z]{2,3}-([a-z]{2})/i)?.[1]?.toUpperCase();
  if (region) return region;
  return { pl: "PL", es: "ES", de: "DE", fr: "FR", pt: "BR", en: "US" }[locale];
}

export function detectCurrency(
  country: string | null,
  acceptLanguage: string | null,
  locale: SiteLocale,
  override?: string,
): SiteCurrency {
  if (isCurrency(override)) return override;
  const resolvedCountry = country?.toUpperCase() || countryFromLanguage(acceptLanguage, locale);
  return countryCurrencies[resolvedCountry] ?? "USD";
}

export function getPrice(currency: SiteCurrency) {
  return prices[currency];
}

export function formatPrice(value: number, currency: SiteCurrency, locale: SiteLocale) {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}
