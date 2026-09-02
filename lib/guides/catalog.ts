import type { Locale } from "@/lib/i18n/types";

interface GuideCatalogCopy {
    title: string;
    description: string;
    eyebrow: string;
    readGuide: string;
    label: string;
}

const catalogCopy: Record<Locale, GuideCatalogCopy> = {
    en: {
        title: "Language Learning Guides",
        description:
            "Practical guides to learning languages with Netflix, YouTube, contextual video flashcards and spaced repetition.",
        eyebrow: "Lectoro AI learning library",
        readGuide: "Read guide",
        label: "Guides",
    },
    pl: {
        title: "Poradniki do nauki języków",
        description:
            "Praktyczne poradniki o nauce języków z Netflixem, YouTube, kontekstowymi fiszkami wideo i powtórkami rozłożonymi w czasie.",
        eyebrow: "Biblioteka wiedzy Lectoro AI",
        readGuide: "Czytaj poradnik",
        label: "Poradniki",
    },
    de: {
        title: "Ratgeber zum Sprachenlernen",
        description:
            "Praktische Anleitungen zum Sprachenlernen mit Netflix, YouTube, kontextbezogenen Video-Karteikarten und Spaced Repetition.",
        eyebrow: "Lectoro AI Lernbibliothek",
        readGuide: "Ratgeber lesen",
        label: "Ratgeber",
    },
    es: {
        title: "Guías para aprender idiomas",
        description:
            "Guías prácticas para aprender idiomas con Netflix, YouTube, tarjetas de vídeo contextuales y repetición espaciada.",
        eyebrow: "Biblioteca de aprendizaje de Lectoro AI",
        readGuide: "Leer guía",
        label: "Guías",
    },
    ja: {
        title: "語学学習ガイド",
        description:
            "Netflix、YouTube、文脈付き動画フラッシュカード、間隔反復を活用した実践的な語学学習ガイドです。",
        eyebrow: "Lectoro AI 学習ライブラリ",
        readGuide: "ガイドを読む",
        label: "ガイド",
    },
    ko: {
        title: "언어 학습 가이드",
        description:
            "Netflix, YouTube, 문맥형 비디오 플래시카드와 간격 반복으로 언어를 배우는 실용적인 가이드입니다.",
        eyebrow: "Lectoro AI 학습 라이브러리",
        readGuide: "가이드 읽기",
        label: "가이드",
    },
    fr: {
        title: "Guides d'apprentissage des langues",
        description:
            "Des guides pratiques pour apprendre les langues avec Netflix, YouTube, des flashcards vidéo contextuelles et la répétition espacée.",
        eyebrow: "Bibliothèque d'apprentissage Lectoro AI",
        readGuide: "Lire le guide",
        label: "Guides",
    },
    "pt-BR": {
        title: "Guias para aprender idiomas",
        description:
            "Guias práticos para aprender idiomas com Netflix, YouTube, flashcards de vídeo contextuais e repetição espaçada.",
        eyebrow: "Biblioteca de aprendizagem Lectoro AI",
        readGuide: "Ler guia",
        label: "Guias",
    },
    "es-MX": {
        title: "Guías para aprender idiomas",
        description:
            "Guías prácticas para aprender idiomas con Netflix, YouTube, tarjetas de video contextuales y repetición espaciada.",
        eyebrow: "Biblioteca de aprendizaje de Lectoro AI",
        readGuide: "Leer guía",
        label: "Guías",
    },
    hi: {
        title: "भाषा सीखने की गाइड",
        description:
            "Netflix, YouTube, संदर्भयुक्त वीडियो फ्लैशकार्ड और अंतराल पुनरावृत्ति से भाषा सीखने की व्यावहारिक गाइड।",
        eyebrow: "Lectoro AI अध्ययन लाइब्रेरी",
        readGuide: "गाइड पढ़ें",
        label: "गाइड",
    },
};

export function getGuideCatalogCopy(locale: Locale): GuideCatalogCopy {
    return catalogCopy[locale];
}
