import type { Dict } from "./types";

export const en: Dict = {
    locale: "en",

    nav: {
        features: "Features",
        liveDemo: "Live Demo",
        howItWorks: "How It Works",
        comparison: "Comparison",
        pricing: "Pricing",
        faq: "FAQ",
        addToChrome: "Add to Chrome",
        addToChromeFree: "Add to Chrome — Free",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
    },

    lang: {
        en: "English",
        pl: "Polski",
        de: "Deutsch",
        es: "Español",
        selectLanguage: "Language",
    },

    hero: {
        badge: "Language learning Chrome extension",
        title: "Learn Languages with Dual Subtitles on",
        titleHighlight: "Netflix & YouTube",
        subtitle:
            "Click any word in bilingual subtitles for a translation, pronunciation and contextual AI explanation. Save vocabulary with video snapshots, then remember it with spaced-repetition flashcards.",
        installCta: "Install in Chrome",
        trialBadge: "3-Day Free",
        demoCta: "Try Interactive Demo",
        noCard: "No credit card for the free plan",
        builtFor: "Built for Google Chrome",
    },

    platforms: {
        label: "Seamlessly Integrates with Your Favorite Video & Web Platforms",
        anyWeb: "Any Web Articles",
    },

    features: {
        tag: "Complete Learning Ecosystem",
        title: "One Language Learning Extension, From Immersion to Review",
        subtitle:
            "Turn authentic videos and web pages into lessons with clickable subtitles, contextual AI help and spaced-repetition flashcards.",
        f1: {
            title: "Dual Subtitles & Frame Captures",
            desc: "Display original language alongside your native translation. Click any unknown word to automatically pause the video and capture high-res scene snapshots for your flashcards.",
            b1: "YouTube & Netflix",
            b2: "Click-to-Pause",
            b3: "Snapshots",
        },
        f2: {
            title: "In-Page Web Translator",
            desc: "Reading technical documentation, Reddit, or industry news? Highlight any text snippet to instantly reveal contextual definitions and grammatical analysis in a floating dock.",
            b1: "Floating Toolbar",
            b2: "Multi-Tier Cache",
            b3: "Phrase Detection",
        },
        f3: {
            title: "AI Tutor",
            desc: "Forget rigid dictionary definitions. AI breaks down slang, cultural references, and phrasal verbs in 1 ultra-sharp sentence, exactly like a personal native tutor.",
            b1: "AI",
            b2: "1-Sentence Nuance",
            b3: "Context Examples",
        },
        f4: {
            badge: "SuperMemo Algorithm",
            title: "Lock Words Into Long-Term Memory Without Cramming",
            desc: "Lectoro schedules vocabulary reviews with spaced repetition, helping you focus on words that need more practice instead of reviewing every saved item equally.",
            l1: "5-minute daily sessions in the extension popup",
            l2: "Real-time pending review badge in your browser bar",
            l3: "Visual flashcards paired with exact movie frame snapshots",
        },
        f5: {
            title: "ElevenLabs Neural Voice TTS",
            desc: "Master authentic accents and natural cadence with world-class ElevenLabs voice synthesis models (Roger, Sarah, Charlie) with ultra-fast local audio caching.",
            b1: "ElevenLabs Flash v2.5",
            b2: "Lifelike Accents",
            b3: "Audio Cache",
        },
        f6: {
            title: "AI Quizzes & 1-Click Anki Export",
            desc: "Test yourself with 6 dynamic AI-generated quiz types. Export your entire vocabulary collection to Anki (.txt), Excel/CSV, or printable PDF study worksheets in seconds.",
            b1: "Anki .txt Export",
            b2: "Interactive Quizzes",
            b3: "PDF Printouts",
        },
    },

    showcase: {
        tag: "Visual experience",
        title: "See Lectoro AI in action",
        previous: "Previous screenshot",
        next: "Next screenshot",
        slideLabel: "Screenshot",
        s1: {
            alt: "Lectoro AI clickable subtitles and translation panel on a TED video",
            title: "Learn from Clickable Video Subtitles",
        },
        s2: {
            alt: "Lectoro AI Chrome extension translating selected text and subtitles on X",
            title: "Translate Text on Any Web Page",
        },
        s3: {
            alt: "Lectoro AI setup guide for YouTube and Netflix subtitles, keyboard shortcuts and flashcard reviews",
            title: "Video Learning and Review Workflow",
        },
        s4: {
            alt: "Lectoro AI English to German subtitle translation with a contextual AI explanation on YouTube",
            title: "AI Explains Phrases in Context",
        },
        s5: {
            alt: "Lectoro AI spaced-repetition flashcard with a saved Netflix scene snapshot",
            title: "Review Video Flashcards with SRS",
        },
        s6: {
            alt: "Lectoro AI toolbar translating and reading selected words on an X post",
            title: "Translate, Listen or Ask AI",
        },
        s7: {
            alt: "Lectoro AI English to French translation and idiom explanation over a video",
            title: "Understand Idioms While Watching",
        },
        s8: {
            alt: "Lectoro AI daily flashcard review open beside the Plex streaming catalog",
            title: "Learn and Review Vocabulary on Plex",
        },
    },

    comparison: {
        tag: "Direct Feature Breakdown",
        title: "Compare Language Learning Extensions and Apps",
        titleHighlight: "Feature by Feature",
        subtitle:
            "Compare Lectoro AI with other popular approaches to video immersion and language learning.",
        disclaimer:
            "Based on publicly listed product features and pricing; availability and prices may vary.",
        winnerBadge: "Winner",
        lectoSubtitle: "Next-Gen AI Media Immersion",
        lrSubtitle: "Legacy extension (ex-LLN)",
        lingoSubtitle: "Curated streaming platform",
        featureCol: "Feature & Capability",
        previousAriaLabel: "Previous comparison",
        slidesAriaLabel: "Comparison slides",
        goToAriaLabel: "Go to comparison",
        nextAriaLabel: "Next comparison",
        verdictTag: "The Verdict",
        verdictTitle: "Choose the workflow that fits how you already learn.",
        verdictBody:
            "Lectoro AI combines AI context intelligence, keyboard navigation and video snapshots, with a free tier available to start.",
        verdictCta: "Add to Chrome Free ➔",
        tabs: {
            vsLR: "vs. Language Reactor",
            vsLRbadge: "Primary Competitor",
            vsLingopie: "vs. Lingopie",
            vsLingopieBadge: "Streaming Platform",
            vsDuolingo: "vs. Duolingo",
            vsDuolingoBadge: "Course-Based App",
        },
        rows: [
            {
                category: "AI & Intelligence",
                feature: "Contextual AI Tutor (Slang & Idioms)",
                description:
                    "Explains nuanced cultural references, jokes, and phrasal verbs in real time.",
                lectoro: {
                    title: "AI Tutor",
                    detail: "Explains slang, cultural humor & grammar in 1 sharp sentence.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Translation & Lookup Tools",
                    detail: "Offers bilingual subtitles, dictionary tools and machine translation in Pro.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Conversational Meanings",
                    detail: "Includes contextual word meanings, video flashcards and grammar explanations.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Course-Based AI Features",
                    detail: "AI conversation features vary by course, platform and subscription tier.",
                    isPositive: false,
                },
            },
            {
                category: "Content Freedom",
                feature: "Supported Platforms & Web Reading",
                description:
                    "Where you can actually learn without paying extra or switching apps.",
                lectoro: {
                    title: "YouTube, Netflix & Entire Web",
                    detail: "Works on videos AND any webpage, news, Reddit or X (Twitter).",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Netflix, YouTube, Books & Web",
                    detail: "Supports video, podcasts, imported webpages and uploaded books on desktop.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Curated Streaming Catalog",
                    detail: "Provides thousands of shows, movies, podcasts and other learning content.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Structured Course Content",
                    detail: "Focuses on guided lessons rather than learning across arbitrary webpages.",
                    isPositive: false,
                },
            },
            {
                category: "Ergonomics & UX",
                feature: "Zero-Mouse Keyboard Flow",
                description:
                    "Hands-free video playback and subtitle navigation from your couch.",
                lectoro: {
                    title: "Keyboard Navigation",
                    detail: "Navigate subtitles, control playback and access learning tools from the keyboard.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Keyboard & Gesture Controls",
                    detail: "Provides shortcuts and gestures for precise video navigation and playback.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Interactive Video Player",
                    detail: "Words can be selected directly from subtitles while watching catalog content.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Interactive Exercises",
                    detail: "Uses short listening, speaking, writing and selection-based exercises.",
                    isPositive: false,
                },
            },
            {
                category: "Memory Retention",
                feature: "Automated Scene Snapshots for Anki",
                description:
                    "Captures visual frames so your memory links words directly to scenes.",
                lectoro: {
                    title: "Automatic Scene Snapshots",
                    detail: "Pairs saved vocabulary with high-resolution frames from the current scene.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Saved Vocabulary Tools",
                    detail: "Lets learners save vocabulary; media-rich export options depend on workflow.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Video Flashcards",
                    detail: "Builds flashcards around vocabulary encountered in its video catalog.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Course Visuals",
                    detail: "Uses course illustrations rather than snapshots from the learner's media.",
                    isPositive: false,
                },
            },
            {
                category: "Export & Ownership",
                feature: "1-Click Anki & Excel Export",
                description:
                    "Own your vocabulary database forever without platform lock-in.",
                lectoro: {
                    title: "1-Click Anki .txt / CSV / PDF",
                    detail: "Exports saved vocabulary in formats listed elsewhere on this site.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Vocabulary Export Available",
                    detail: "Export format and media support depend on the selected plan and workflow.",
                    isPositive: false,
                },
                lingopie: {
                    title: "In-App Vocabulary Review",
                    detail: "Official product pages emphasize in-app flashcards and repetition tools.",
                    isPositive: false,
                },
                duolingo: {
                    title: "In-App Progress",
                    detail: "Official plans focus on synced course progress, not study-deck export.",
                    isPositive: false,
                },
            },
            {
                category: "Study System",
                feature: "Spaced Repetition System (SRS)",
                description:
                    "Scientifically proven memory algorithm that schedules optimal review intervals.",
                lectoro: {
                    title: "Built-in Spaced Repetition",
                    detail: "5-min daily micro-reviews right in Chrome popup. Zero setup.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Saved Items & Phrase Practice",
                    detail: "Includes saved-language tools, with a different review workflow from Lectoro.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Flashcards & Repetition Tools",
                    detail: "Includes video flashcards and repetition features within its subscription.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Personalized Practice",
                    detail: "Schedules practice inside its course-based learning path.",
                    isPositive: false,
                },
            },
            {
                category: "Design & Performance",
                feature: "Modern Video Overlay & Speed",
                description:
                    "Aesthetic non-intrusive UI that keeps the movie front and center.",
                lectoro: {
                    title: "Sleek Dark Glassmorphism",
                    detail: "Ultra-fast, lightweight dock that never covers or blocks the video.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Subtitle-Focused Browser UI",
                    detail: "Adds bilingual subtitles and learning controls around supported media.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Dedicated Streaming Player",
                    detail: "Combines catalog playback with clickable subtitles and learning tools.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Gamified Course UI",
                    detail: "Uses streaks, hearts and challenges; paid plans include an ad-free option.",
                    isPositive: false,
                },
            },
            {
                category: "Cost & Value",
                feature: "Pricing & Fair Access",
                description:
                    "Honest pricing without subscription traps or forced long-term lock-in.",
                lectoro: {
                    title: "Free Tier + Affordable Access",
                    detail: "Generous free immersion. No credit card required to start.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Free + Pro Features",
                    detail: "Core access is free; features such as machine translation are offered in Pro.",
                    isPositive: false,
                },
                lingopie: {
                    title: "$83.88 / year listed",
                    detail: "The official pricing page also lists quarterly and lifetime options.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Free + Paid Subscriptions",
                    detail: "Super adds no ads, unlimited hearts and extra practice; prices vary by market.",
                    isPositive: false,
                },
            },
        ],
    },

    hiw: {
        tag: "Simple Onboarding",
        title: "How to Learn a Language with Netflix or YouTube",
        subtitle:
            "Install the Chrome extension, learn from clickable subtitles and review saved vocabulary.",
        s1title: "Install the Chrome Extension",
        s1desc: "Add Lectoro AI to Chrome with a single click. Zero complicated setup, no credit card required.",
        s2title: "Watch with Bilingual Subtitles",
        s2desc: "Play your favorite Netflix series or YouTube videos. Click any unknown word in the subtitles to reveal its meaning instantly.",
        s3title: "Review Video Flashcards",
        s3desc: "Open the extension popup during your morning coffee for a 5-minute SRS session. Long-term memory handles the rest!",
    },

    pricing: {
        tag: "Transparent Pricing",
        title: "Choose the Plan That Fits Your Goals",
        subtitle:
            "Start completely free. Upgrade whenever you're ready to unlock the full power of AI tutors and ElevenLabs voices.",
        mostPopular: "Most Popular",
        free: {
            name: "FREE",
            desc: "For casual viewers and beginners",
            forever: "/ forever",
            cta: "Get Started Free",
            f1: "Dual subtitles for Netflix & YouTube",
            f2: "In-page web article translation",
            f3: "Up to 50 saved SRS flashcards",
            f4: "10 AI queries / month",
            f5: "Standard browser speech synthesis",
        },
        basic: {
            name: "BASIC",
            desc: "For regular language learners",
            mo: "/ month",
            cta: "Start 3-Day Free Trial",
            trial: "3 DAYS FREE TRIAL",
            f1: "Everything in FREE plan",
            f2: "Up to 3,000 SRS flashcards in cloud",
            f3: "200 AI queries / month",
            f4: "20,000 ElevenLabs characters / mo",
            f5: "1-Click export to Anki, PDF, and CSV",
            f6: "Everything in FREE plan (included)",
        },
        pro: {
            name: "PRO",
            desc: "For exam preparation & polyglots",
            mo: "/ month",
            cta: "Start Pro Trial",
            trial: "3 DAYS FREE TRIAL",
            f1: "Everything in BASIC plan",
            f2: "Up to 10,000 SRS flashcards",
            f3: "1,200 AI queries / month",
            f4: "120,000 ElevenLabs characters / mo",
            f5: "Priority AI quiz generation",
        },
    },

    testimonials: {
        starsLabel: "5 out of 5 stars",
        previous: "Previous testimonial",
        next: "Next testimonial",
        tag: "User Testimonials",
        title: "Loved by Language Enthusiasts",
        t1: {
            quote: "I was watching Peaky Blinders on Netflix and finally understand British slang! I click a word, AI explains the nuance in 1 second, and the snapshot lands right on my flashcard. Brilliant.",
            name: "Michael Kowalczyk",
            role: "Software Engineer & Netflix Enthusiast",
        },
        t2: {
            quote: "Preparing for my CAE exam has never been easier. I save advanced collocations from TED talks and academic articles, then export them in one click to Anki. Saved me 20+ hours of typing.",
            name: "Anna Novak",
            role: "English Philology Student",
        },
        t3: {
            quote: "ElevenLabs pronunciation sounds so incredibly natural that my accent improved significantly. A quick 5-minute review session every morning has become my favorite ritual.",
            name: "Peter Zielinski",
            role: "Founder & Polyglot",
        },
    },

    faq: {
        tag: "Frequently Asked Questions",
        title: "Have Questions? We Have Answers.",
        items: [
            {
                question:
                    "Is Lectoro AI safe for my Netflix and YouTube accounts?",
                answer: "Lectoro AI is a Chrome Manifest V3 extension that runs in your browser. It does not change your streaming account or access DRM-protected video streams; it works with subtitle content available in the page.",
            },
            {
                question: "Does the free plan require a credit card?",
                answer: "No. You can install Lectoro AI and use the free plan without entering payment details. The free plan includes dual subtitles, in-page translations and up to 50 saved flashcards.",
            },
            {
                question:
                    "How does the three-day trial work for Basic and Pro?",
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
        ],
    },

    finalCta: {
        title1: "Stop Memorizing Words.",
        title2: "Start Living the Language Today.",
        subtitle:
            "Learn English, Spanish, German, French and more from the Netflix shows, YouTube videos and web content you already enjoy.",
        cta: "Add Lectoro AI to Chrome",
    },

    footer: {
        tagline:
            "Next-generation immersion platform with bilingual video subtitles, AI assistant, ElevenLabs audio, and Spaced Repetition.",
        product: "Product",
        legal: "Legal & Help",
        contact: "Contact",
        subtitlesLink: "Netflix & YouTube Subtitles",
        translatorLink: "In-Page Web Translator",
        flashcardsLink: "SRS Flashcard Library",
        pricingLink: "Pricing & Trials",
        privacyLink: "Privacy Policy",
        termsLink: "Terms of Service",
        faqLink: "FAQ",
        copyright: "© 2026 Lectoro AI (lectoroai.com). All rights reserved.",
        disclaimer:
            "Netflix and YouTube are registered trademarks of their respective owners. Lectoro AI is an independent software extension and is not affiliated with Netflix Inc. or Google LLC.",
    },

    meta: {
        homeTitle: "Lectoro AI: Dual Subtitles for Netflix & YouTube",
        homeDesc:
            "Learn languages while watching Netflix, YouTube, Plex and TED. Click bilingual subtitles for AI explanations, save video flashcards and review them with SRS.",
        privacyTitle: "Privacy Policy",
        privacyDesc:
            "Privacy Policy for Lectoro AI Chrome Extension and web services (lectoroai.com). Learn how we protect your data, handle AI requests, and ensure total transparency.",
        termsTitle: "Terms of Service",
        termsDesc:
            "Terms of Service for Lectoro AI Chrome Extension and website services (lectoroai.com). Read our subscription rules, 3-day trial terms, and usage guidelines.",
    },

    privacy: {
        breadcrumbHome: "Home",
        breadcrumbCurrent: "Privacy Policy",
        badge: "Legal Documentation",
        title: "Privacy Policy",
        updatedAt: "Last Updated: August 26, 2026 • Domain: lectoroai.com",
        googleCallout: {
            title: "🛡️ Chrome Web Store & Google Limited Use Disclosure",
            body: "Lectoro AI adheres strictly to the Chrome Web Store Developer Program Policies, including the Limited Use requirements. We never sell, monetize, or transfer your personal data, browsing history, or viewing logs to third-party data brokers.",
        },
        s1: {
            heading: "1. Introduction & Scope",
            p1: 'This Privacy Policy describes how Lectoro AI ("Lectoro", "we", "us", or "our"), accessible via lectoroai.com and through the Lectoro AI Chrome Browser Extension, collects, uses, and safeguards your information.',
            p2: "By installing the extension or using our web services, you agree to the collection and use of information in accordance with this policy.",
        },
        s2: {
            heading: "2. Information We Collect",
            aLabel: "A. Account Information:",
            aText: "When you sign in via Google Authentication, we collect your name, email address, and profile avatar URL solely for account identification, license verification, and cross-device cloud synchronization.",
            bLabel: "B. Learning Data & Flashcards:",
            bText: "Saved words, user translations, contextual sentence snippets, Spaced Repetition (SRS) interval scores, and generated quiz results are stored to power your personalized vocabulary database.",
            cLabel: "C. Technical & Diagnostic Logs:",
            cText: "Browser type, extension version, and anonymized error traces to maintain extension stability and debug client-side performance.",
        },
        s3: {
            heading: "3. What We DO NOT Collect",
            l1: "We do not track your general browsing history or monitor web pages unrelated to your active translation requests.",
            l2: "We do not intercept, store, or transmit your Netflix, YouTube, or other account credentials.",
            l3: "We do not record keystrokes or sensitive input fields (passwords, credit cards).",
            l4: "We do not sell your data to advertisers or commercial data brokers.",
        },
        s4: {
            heading: "4. Artificial Intelligence & Third-Party Processors",
            intro: "To provide advanced features, Lectoro AI integrates with vetted AI infrastructure partners:",
            geminiLabel: "Google Gemini 2.5 AI:",
            geminiText:
                "When you request an AI explanation or idiom breakdown, the selected word and surrounding sentence context are sent to Google Cloud Vertex AI / Gemini API. Google does not use data submitted via our enterprise API to train foundational AI models.",
            elevenlabsLabel: "ElevenLabs AI Voice Synthesis:",
            elevenlabsText:
                "Pronunciation requests convert isolated text strings into audio streams. No personal user identifiers are passed in audio synthesis requests.",
            stripeLabel: "Stripe:",
            stripeText:
                "Payment processing for Basic and Pro subscription tiers is handled directly by Stripe. Lectoro never receives or stores your full credit card number.",
        },
        s5: {
            heading: "5. Data Storage, Security & Retention",
            p1: "Your learning records and settings are stored locally in your browser's chrome.storage.local and synced securely via Google Firebase Firestore using industry-standard TLS 1.3 encryption in transit and AES-256 encryption at rest.",
            p2: "Data is retained as long as your account remains active. You may request permanent deletion of your account and all associated vocabulary databases at any time.",
        },
        s6: {
            heading: "6. User Rights (GDPR & CCPA)",
            intro: "Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you possess the following rights:",
            l1label: "Right to Access:",
            l1text: "Request a complete export of your personal flashcard database.",
            l2label: "Right to Rectification:",
            l2text: "Edit or correct any saved translation records.",
            l3label: "Right to Erasure:",
            l3text: "Request the total deletion of your user account and cloud storage records.",
            l4label: "Right to Data Portability:",
            l4text: "Export all saved words to Anki, CSV, or PDF formats anytime.",
        },
        s7: {
            heading: "7. Contact & Data Protection Officer",
            p1: "If you have any questions, concerns, or data deletion requests regarding this Privacy Policy, please contact our support team at:",
            teamName: "Lectoro AI Privacy Team",
            domainLabel: "Official Domain:",
            domain: "lectoroai.com",
            emailLabel: "Email:",
            email: "lectoroai@gmail.com",
        },
    },

    terms: {
        breadcrumbHome: "Home",
        breadcrumbCurrent: "Terms of Service",
        badge: "Legal Agreement",
        title: "Terms of Service",
        updatedAt:
            "Last Updated: August 26, 2026 • Official Domain: lectoroai.com",
        s1: {
            heading: "1. Agreement to Terms",
            p1: "By downloading, installing, or using the Lectoro AI Chrome Extension or accessing our website at lectoroai.com, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        },
        s2: {
            heading: "2. Description of Service & License",
            p1: "Lectoro AI provides educational language immersion tools, including dual bilingual subtitles for video platforms (such as YouTube and Netflix), contextual text translation, Gemini AI explanations, ElevenLabs voice synthesis, and Spaced Repetition (SRS) flashcard management.",
            p2: "We grant you a non-exclusive, non-transferable, revocable license to use Lectoro AI for personal, non-commercial educational purposes in accordance with these Terms.",
        },
        s3: {
            heading: "3. Subscriptions, 3-Day Free Trial & Billing",
            aLabel: "A. Free Plan:",
            aText: "Available at $0 with no time limit, providing essential dual subtitles, in-page translations, up to 50 SRS flashcards, and basic monthly AI queries.",
            bLabel: "B. Paid Plans (Basic & Pro):",
            bText: "Paid plans are billed on a recurring monthly or annual basis via Stripe. Features include expanded cloud flashcard limits, higher Gemini AI quotas, ElevenLabs neural voice characters, and Anki/PDF exports.",
            cLabel: "C. 3-Day Free Trial:",
            cText: "New subscribers to Basic or Pro plans receive a 3-day free trial. If you cancel before the trial period concludes, your credit card will not be charged.",
            dLabel: "D. Cancellation & Refunds:",
            dText: "You may cancel your subscription at any time from your account settings. Upon cancellation, you will retain access until the end of your current billing cycle.",
        },
        s4: {
            heading: "4. Acceptable Use & Conduct",
            intro: "You agree not to:",
            l1: "Attempt to reverse engineer, decompile, or extract the source code of the extension.",
            l2: "Automate abuse of our backend AI endpoints (Gemini, ElevenLabs) beyond typical human learning interactions.",
            l3: "Circumvent subscription verification or DRM protections on third-party video platforms.",
            l4: "Resell or redistribute Lectoro AI services or generated content databases commercially without explicit written consent.",
        },
        s5: {
            heading: "5. Third-Party Trademarks & Affiliations",
            p1: "Netflix and YouTube are registered trademarks of Netflix, Inc. and Google LLC respectively. Lectoro AI is an independent browser extension developed to enhance user educational workflows and is not officially affiliated with, endorsed by, or sponsored by Netflix, Inc., Google LLC, or TED Conferences.",
        },
        s6: {
            heading: "6. Disclaimer of Warranties & Limitation of Liability",
            p1: 'Lectoro AI is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for high uptime and accurate AI translations, we make no warranties that translations or voice pronunciations will always be 100% error-free or uninterrupted.',
            p2: "To the maximum extent permitted by law, Lectoro AI and its creators shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service.",
        },
        s7: {
            heading: "7. Modifications to the Service and Terms",
            p1: "We reserve the right to modify or discontinue features, adjust pricing with prior notice, or update these Terms of Service. Continued use of Lectoro AI after updates constitutes acceptance of the revised Terms.",
        },
        s8: {
            heading: "8. Contact Information",
            p1: "For inquiries regarding these Terms of Service or billing questions, please reach out to:",
            teamName: "Lectoro AI Legal & Support",
            domainLabel: "Official Domain:",
            domain: "lectoroai.com",
            emailLabel: "Email:",
            email: "lectoroai@gmail.com",
        },
    },
};
