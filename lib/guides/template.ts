import type { GuideContent } from "./types";

/**
 * GUIDE TEMPLATE / WZORZEC PORADNIKA
 *
 * Skopiuj poniższy obiekt, zmień wartości i wklej do pliku językowego:
 * - Dla angielskiego: lib/guides/en.ts
 * - Dla polskiego: lib/guides/pl.ts
 * - Dla innych języków: odpowiednio es.ts, de.ts itd.
 *
 * Pamiętaj, aby dodać slug do rejestru w: lib/guides/registry.ts
 */
export const exampleGuideTemplate: GuideContent = {
    locale: "en", // lub "pl", "es", "de" itp.
    slug: "twoj-nowy-poradnik-slug",
    title: "Jak nauczyć się języka z napisami i AI",
    description:
        "Kompletny przewodnik po immersji językowej z podwójnymi napisami na Netflix i YouTube oraz fiszkami SRS.",
    eyebrow: "Poradnik immersji językowej",
    updatedAt: "Zaktualizowano wrzesień 2026",
    readingTime: "8 min czytania",
    intro: "Wprowadzenie do poradnika. Krótki zarys problemu i obietnica tego, czego czytelnik się dowie w tym artykule.",
    sections: [
        {
            heading: "1. Dlaczego tradycyjne metody zawodzą",
            paragraphs: [
                "Pierwszy akapit opisujący kontekst i wyzwania w nauce języka.",
                "Drugi akapit wprowadzający rozwiązanie oparte na autentycznym wideo.",
            ],
            bullets: [
                "Autentyczny kontekst wizualny i emocjonalny",
                "Naturalne tempo mowy i akcenty",
                "Brak sztucznych, podręcznikowych zdań",
            ],
        },
        {
            heading: "2. Krok po kroku: Skuteczna sesja oglądania",
            paragraphs: [
                "Opis procesu krok po kroku. Użyj listy kroków (steps), aby treść była przystępna i czytelna.",
            ],
            steps: [
                {
                    title: "Krok 1: Oglądaj dla ogólnego sensu",
                    text: "Nie zatrzymuj wideo przy każdym słowie. Skup się na fabule i intonacji postaci.",
                },
                {
                    title: "Krok 2: Klikaj tylko kluczowe słowa",
                    text: "Zapisuj tylko zwroty, które powtarzają się lub są kluczowe dla zrozumienia sceny.",
                },
                {
                    title: "Krok 3: Sprawdź kontekstowe wyjaśnienie AI",
                    text: "Sprawdź niuanse gramatyczne i idiomatyczne znaczenie w danej scenie.",
                },
            ],
        },
    ],
    faq: [
        {
            question: "Czy podwójne napisy nie rozpraszają?",
            answer: "Na początku mogą wymagać przyzwyczajenia, ale skupienie się na napisach oryginalnych z językiem ojczystym jako wsparciem daje najlepsze rezultaty.",
        },
        {
            question: "Ile słówek dziennie warto dodawać do powtórek?",
            answer: "Zalecamy od 5 do 15 wartościowych słówek na odcinek. Jakość i regularność są ważniejsze niż ilość.",
        },
    ],
    relatedLabel: "Kolejny polecany poradnik",
    ctaTitle: "Zacznij uczyć się z Netflixem i YouTube już teraz",
    ctaText: "Zainstaluj darmowe rozszerzenie Lectoro AI do Chrome i zamień filmy w interaktywne lekcje języka.",
    ctaButton: "Zainstaluj darmowe rozszerzenie Chrome",
};
