# 📚 Jak dodawać nowe poradniki SEO (Wielojęzyczne Guides)

W projekcie wdrożono **elastyczny i bezpieczny system poradników**, który:
1. **Automatycznie generuje strony SEO** we wszystkich 11 językach (`en`, `pl`, `es`, `de`, `fr`, `it`, `nl`, `ja`, `ko`, `cs`, `pt`).
2. **Automatycznie dodaje poradniki do mapy strony (`sitemap.xml`)** oraz ustawia tagi `canonical` i `hreflang` dla Google.
3. **Posiada bezpieczny mechanizm fallbacku**: jeśli napiszesz poradnik najpierw po angielsku lub polsku, w pozostałych językach strona **nie rzuci błędu 404 ani błędu kompilacji** — automatycznie wyświetli wersję domyślną do czasu przetłumaczenia!
4. **Zawiera bogate dane strukturalne Schema.org** (`Article`, `FAQPage`, `BreadcrumbList`) dla wyższych pozycji w wyszukiwarce.

---

## 🚀 Dodawanie nowego poradnika w 2 prostych krokach

### Krok 1: Zarejestruj poradnik w `lib/guides/registry.ts`

Otwórz plik `lib/guides/registry.ts` i dopisz swój nowy poradnik do tablicy `GUIDE_REGISTRY`:

```ts
// lib/guides/registry.ts
export const GUIDE_REGISTRY: GuideMeta[] = [
    // ... dotychczasowe poradniki
    {
        slug: "twoj-nowy-poradnik-slug", // Unikalny URL, np. "anki-export-guide"
        image: "/showcase/5.jpg",        // Zdjęcie główne (lub z /showcase/ lub /guide/)
        category: "Spaced Repetition & SRS", // Kategoria do badge'a
        publishedAt: "2026-09-24T00:00:00.000Z",
        updatedAt: "Wrzesień 2026",
        readingTime: "8 min read",
        featured: true,
    },
];
```

---

### Krok 2: Dodaj treść poradnika

Otwórz plik języka, w którym piszesz poradnik:
- **Dla wersji angielskiej (główny fallback)**: `lib/guides/en.ts`
- **Dla wersji polskiej**: `lib/guides/pl.ts`
- **Dla wersji hiszpańskiej**: `lib/guides/es.ts` (itd.)

Skorzystaj z szablonu z pliku `lib/guides/template.ts` i wklej go do słownika:

```ts
// W lib/guides/en.ts (lub pl.ts):
export const enGuides: GuideDictionary = {
    // ... istniejące poradniki

    "twoj-nowy-poradnik-slug": {
        locale: "en",
        slug: "twoj-nowy-poradnik-slug",
        title: "How to Export Video Flashcards to Anki",
        description:
            "Step-by-step tutorial on exporting contextual Netflix & YouTube vocabulary to Anki with audio and snapshots.",
        eyebrow: "Anki integration guide",
        updatedAt: "Updated September 2026",
        readingTime: "8 min read",
        intro: "Tutaj napisz lead wprowadzający do artykułu...",
        sections: [
            {
                heading: "Why Anki combined with video context works best",
                paragraphs: [
                    "Akapit pierwszy...",
                    "Akapit drugi...",
                ],
                bullets: [
                    "Kluczowa korzyść 1",
                    "Kluczowa korzyść 2",
                ],
            },
            {
                heading: "Step-by-step workflow",
                paragraphs: ["Opis procedury..."],
                steps: [
                    {
                        title: "1. Save the subtitle in Lectoro",
                        text: "Click any word during video playback...",
                    },
                    {
                        title: "2. Open Dashboard and export CSV",
                        text: "Navigate to your reviews tab...",
                    },
                ],
            },
        ],
        faq: [
            {
                question: "Czy eksport zawiera nagrania audio?",
                answer: "Tak, pliki wymowy są dołączane do kart.",
            },
        ],
        relatedLabel: "Następny polecany poradnik",
        ctaTitle: "Zacznij uczyć się z Lectoro AI",
        ctaText: "Pobierz bezpłatne rozszerzenie do Chrome i ucz się podczas oglądania.",
        ctaButton: "Zainstaluj Lectoro AI",
    },
};
```

---

## ⚡ Co dzieje się automatycznie?

1. **URL**: Poradnik jest od razu dostępny pod:
   - `https://lectoroai.com/guides/twoj-nowy-poradnik-slug`
   - `https://lectoroai.com/pl/guides/twoj-nowy-poradnik-slug`
   - oraz pod wszystkimi pozostałymi 9 językami (`/es/`, `/de/`, `/ja/`, itd.)!
2. **Katalog `/guides`**: Poradnik automatycznie pojawia się na liście z miniaturką, czasem czytania i etykietą kategorii.
3. **SEO & Sitemap**: Automatycznie trafia do pliku `sitemap.xml` dla wszystkich języków z parametrem `changeFrequency: "monthly"`.
4. **Rich Snippets w Google**: Strona generuje Schema.org `Article`, `FAQPage` (pytania z sekcji FAQ pojawiają się bezpośrednio w wynikach wyszukiwania Google!) oraz `BreadcrumbList`.
5. **Nawigacja**: Na końcu poradnika automatycznie wyświetla się karta polecająca kolejny przewodnik w serii.
