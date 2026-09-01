export interface FaqItem {
    question: string;
    answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: "Is Lectoro AI safe for my Netflix and YouTube accounts?",
        answer: "Lectoro AI is a Chrome Manifest V3 extension that runs in your browser. It does not change your streaming account or access DRM-protected video streams; it works with subtitle content available in the page.",
    },
    {
        question: "Does the free plan require a credit card?",
        answer: "No. You can install Lectoro AI and use the free plan without entering payment details. The free plan includes dual subtitles, in-page translations and up to 50 saved flashcards.",
    },
    {
        question: "How does the three-day trial work for Basic and Pro?",
        answer: "When you choose a paid plan, you receive three days of access at no charge. Cancel in your account dashboard before the trial ends to avoid the first subscription payment.",
    },
    {
        question: "How do Anki and CSV exports work?",
        answer: "Choose Export to Anki in the extension library to download a formatted text file with mapped fields such as the word, translation, context sentence and screenshot link. You can import that file into Anki or export your vocabulary as CSV.",
    },
    {
        question: "Do my flashcards sync across computers?",
        answer: "Yes. When you sign in with your Google account, your saved vocabulary, spaced-repetition intervals and settings sync across supported computers.",
    },
];
