import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { en } from "@/lib/i18n/en";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for Lectoro AI Chrome Extension and web services (lectoroai.com). Learn how we protect your data, handle AI requests, and ensure total transparency.",
    alternates: {
        canonical: "/privacy",
    },
    openGraph: {
        type: "website",
        url: "/privacy",
        title: "Privacy Policy | Lectoro AI",
        description:
            "Learn how the Lectoro AI Chrome extension handles account data, saved vocabulary and AI requests.",
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy | Lectoro AI",
        description:
            "Learn how the Lectoro AI Chrome extension handles account data, saved vocabulary and AI requests.",
    },
};

export default function PrivacyPage() {
    return (
        <>
            <Navbar dict={en} locale="en" />
            <main className="flex-grow">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    {/* Breadcrumb Bar */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                        <Link href="/" className="hover:text-white transition">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-indigo-400 font-semibold">
                            Privacy Policy
                        </span>
                    </div>

                    <div className="glass-panel p-8 sm:p-12 shadow-2xl">
                        {/* Document Header */}
                        <div className="border-b border-white/10 pb-8 mb-8">
                            <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                                Legal Documentation
                            </div>
                            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
                                Privacy Policy
                            </h1>
                            <p className="text-xs text-slate-400 font-mono">
                                Last Updated: August 26, 2026 • Domain:
                                lectoroai.com
                            </p>
                        </div>

                        {/* Callout Box: Google API & Manifest V3 Compliance */}
                        <div className="bg-indigo-500/10 border-l-4 border-indigo-500 rounded-r-xl p-5 mb-8">
                            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                                <span>
                                    🛡️ Chrome Web Store & Google Limited Use
                                    Disclosure
                                </span>
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Lectoro AI adheres strictly to the{" "}
                                <strong>
                                    Chrome Web Store Developer Program Policies
                                </strong>
                                , including the Limited Use requirements. We
                                never sell, monetize, or transfer your personal
                                data, browsing history, or viewing logs to
                                third-party data brokers.
                            </p>
                        </div>

                        {/* Policy Sections */}
                        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    1. Introduction & Scope
                                </h2>
                                <p>
                                    This Privacy Policy describes how{" "}
                                    <strong>Lectoro AI</strong>{" "}
                                    (&quot;Lectoro&quot;, &quot;we&quot;,
                                    &quot;us&quot;, or &quot;our&quot;),
                                    accessible via{" "}
                                    <Link
                                        href="/"
                                        className="text-indigo-400 hover:underline"
                                    >
                                        lectoroai.com
                                    </Link>{" "}
                                    and through the Lectoro AI Chrome Browser
                                    Extension, collects, uses, and safeguards
                                    your information.
                                </p>
                                <p className="mt-2">
                                    By installing the extension or using our web
                                    services, you agree to the collection and
                                    use of information in accordance with this
                                    policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    2. Information We Collect
                                </h2>
                                <div className="space-y-3 pl-2">
                                    <div>
                                        <strong className="text-white">
                                            A. Account Information:
                                        </strong>
                                        <p className="text-slate-400">
                                            When you sign in via Google
                                            Authentication, we collect your
                                            name, email address, and profile
                                            avatar URL solely for account
                                            identification, license
                                            verification, and cross-device cloud
                                            synchronization.
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="text-white">
                                            B. Learning Data & Flashcards:
                                        </strong>
                                        <p className="text-slate-400">
                                            Saved words, user translations,
                                            contextual sentence snippets, Spaced
                                            Repetition (SRS) interval scores,
                                            and generated quiz results are
                                            stored to power your personalized
                                            vocabulary database.
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="text-white">
                                            C. Technical & Diagnostic Logs:
                                        </strong>
                                        <p className="text-slate-400">
                                            Browser type, extension version, and
                                            anonymized error traces to maintain
                                            extension stability and debug
                                            client-side performance.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    3. What We DO NOT Collect
                                </h2>
                                <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                                    <li>
                                        We <strong>do not</strong> track your
                                        general browsing history or monitor web
                                        pages unrelated to your active
                                        translation requests.
                                    </li>
                                    <li>
                                        We <strong>do not</strong> intercept,
                                        store, or transmit your Netflix,
                                        YouTube, or other account credentials.
                                    </li>
                                    <li>
                                        We <strong>do not</strong> record
                                        keystrokes or sensitive input fields
                                        (passwords, credit cards).
                                    </li>
                                    <li>
                                        We <strong>do not</strong> sell your
                                        data to advertisers or commercial data
                                        brokers.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    4. Artificial Intelligence & Third-Party
                                    Processors
                                </h2>
                                <p>
                                    To provide advanced features, Lectoro AI
                                    integrates with vetted AI infrastructure
                                    partners:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 mt-3 text-slate-400">
                                    <li>
                                        <strong className="text-white">
                                            Google Gemini 2.5 AI:
                                        </strong>{" "}
                                        When you request an AI explanation or
                                        idiom breakdown, the selected word and
                                        surrounding sentence context are sent to
                                        Google Cloud Vertex AI / Gemini API.
                                        Google does not use data submitted via
                                        our enterprise API to train foundational
                                        AI models.
                                    </li>
                                    <li>
                                        <strong className="text-white">
                                            ElevenLabs AI Voice Synthesis:
                                        </strong>{" "}
                                        Pronunciation requests convert isolated
                                        text strings into audio streams. No
                                        personal user identifiers are passed in
                                        audio synthesis requests.
                                    </li>
                                    <li>
                                        <strong className="text-white">
                                            Stripe:
                                        </strong>{" "}
                                        Payment processing for Basic and Pro
                                        subscription tiers is handled directly
                                        by Stripe. Lectoro never receives or
                                        stores your full credit card number.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    5. Data Storage, Security & Retention
                                </h2>
                                <p>
                                    Your learning records and settings are
                                    stored locally in your browser&apos;s{" "}
                                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 font-mono text-xs">
                                        chrome.storage.local
                                    </code>{" "}
                                    and synced securely via Google Firebase
                                    Firestore using industry-standard TLS 1.3
                                    encryption in transit and AES-256 encryption
                                    at rest.
                                </p>
                                <p className="mt-2">
                                    Data is retained as long as your account
                                    remains active. You may request permanent
                                    deletion of your account and all associated
                                    vocabulary databases at any time.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    6. User Rights (GDPR & CCPA)
                                </h2>
                                <p>
                                    Under the General Data Protection Regulation
                                    (GDPR) and California Consumer Privacy Act
                                    (CCPA), you possess the following rights:
                                </p>
                                <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-400">
                                    <li>
                                        <strong>Right to Access:</strong>{" "}
                                        Request a complete export of your
                                        personal flashcard database.
                                    </li>
                                    <li>
                                        <strong>Right to Rectification:</strong>{" "}
                                        Edit or correct any saved translation
                                        records.
                                    </li>
                                    <li>
                                        <strong>Right to Erasure:</strong>{" "}
                                        Request the total deletion of your user
                                        account and cloud storage records.
                                    </li>
                                    <li>
                                        <strong>
                                            Right to Data Portability:
                                        </strong>{" "}
                                        Export all saved words to Anki, CSV, or
                                        PDF formats anytime.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    7. Contact & Data Protection Officer
                                </h2>
                                <p>
                                    If you have any questions, concerns, or data
                                    deletion requests regarding this Privacy
                                    Policy, please contact our support team at:
                                </p>
                                <div className="mt-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                                    <div className="font-bold text-white">
                                        Lectoro AI Privacy Team
                                    </div>
                                    <div className="text-slate-400 text-xs mt-1">
                                        Official Domain:{" "}
                                        <span className="text-indigo-400">
                                            lectoroai.com
                                        </span>
                                    </div>
                                    <div className="text-slate-400 text-xs">
                                        Email:{" "}
                                        <a
                                            href="mailto:lectoroai@gmail.com"
                                            className="text-indigo-400 font-mono"
                                        >
                                            lectoroai@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer dict={en} locale="en" />
        </>
    );
}
