import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { en } from "@/lib/i18n/en";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "Terms of Service for Lectoro AI Chrome Extension and website services (lectoroai.com). Read our subscription rules, 3-day trial terms, and usage guidelines.",
    alternates: {
        canonical: "/terms",
    },
    openGraph: {
        type: "website",
        url: "/terms",
        title: "Terms of Service | Lectoro AI",
        description:
            "Read the terms for using Lectoro AI, including account rules, subscriptions and the three-day trial.",
    },
    twitter: {
        card: "summary",
        title: "Terms of Service | Lectoro AI",
        description:
            "Read the terms for using Lectoro AI, including account rules, subscriptions and the three-day trial.",
    },
};

export default function TermsPage() {
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
                            Terms of Service
                        </span>
                    </div>

                    <div className="glass-panel p-8 sm:p-12 shadow-2xl">
                        {/* Document Header */}
                        <div className="border-b border-white/10 pb-8 mb-8">
                            <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                                Legal Agreement
                            </div>
                            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
                                Terms of Service
                            </h1>
                            <p className="text-xs text-slate-400 font-mono">
                                Last Updated: August 26, 2026 • Official Domain:
                                lectoroai.com
                            </p>
                        </div>

                        {/* Policy Sections */}
                        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    1. Agreement to Terms
                                </h2>
                                <p>
                                    By downloading, installing, or using the{" "}
                                    <strong>Lectoro AI</strong> Chrome Extension
                                    or accessing our website at{" "}
                                    <Link
                                        href="/"
                                        className="text-indigo-400 hover:underline"
                                    >
                                        lectoroai.com
                                    </Link>
                                    , you agree to be bound by these Terms of
                                    Service. If you do not agree to these terms,
                                    please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    2. Description of Service & License
                                </h2>
                                <p>
                                    Lectoro AI provides educational language
                                    immersion tools, including dual bilingual
                                    subtitles for video platforms (such as
                                    YouTube and Netflix), contextual text
                                    translation, Gemini AI explanations,
                                    ElevenLabs voice synthesis, and Spaced
                                    Repetition (SRS) flashcard management.
                                </p>
                                <p className="mt-2">
                                    We grant you a non-exclusive,
                                    non-transferable, revocable license to use
                                    Lectoro AI for personal, non-commercial
                                    educational purposes in accordance with
                                    these Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    3. Subscriptions, 3-Day Free Trial & Billing
                                </h2>
                                <div className="space-y-3 pl-2">
                                    <div>
                                        <strong className="text-white">
                                            A. Free Plan:
                                        </strong>
                                        <p className="text-slate-400">
                                            Available at $0 with no time limit,
                                            providing essential dual subtitles,
                                            in-page translations, up to 50 SRS
                                            flashcards, and basic monthly AI
                                            queries.
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="text-white">
                                            B. Paid Plans (Basic & Pro):
                                        </strong>
                                        <p className="text-slate-400">
                                            Paid plans are billed on a recurring
                                            monthly or annual basis via Stripe.
                                            Features include expanded cloud
                                            flashcard limits, higher Gemini AI
                                            quotas, ElevenLabs neural voice
                                            characters, and Anki/PDF exports.
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="text-white">
                                            C. 3-Day Free Trial:
                                        </strong>
                                        <p className="text-slate-400">
                                            New subscribers to Basic or Pro
                                            plans receive a 3-day free trial. If
                                            you cancel before the trial period
                                            concludes, your credit card will not
                                            be charged.
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="text-white">
                                            D. Cancellation & Refunds:
                                        </strong>
                                        <p className="text-slate-400">
                                            You may cancel your subscription at
                                            any time from your account settings.
                                            Upon cancellation, you will retain
                                            access until the end of your current
                                            billing cycle.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    4. Acceptable Use & Conduct
                                </h2>
                                <p>You agree not to:</p>
                                <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-400">
                                    <li>
                                        Attempt to reverse engineer, decompile,
                                        or extract the source code of the
                                        extension.
                                    </li>
                                    <li>
                                        Automate abuse of our backend AI
                                        endpoints (Gemini, ElevenLabs) beyond
                                        typical human learning interactions.
                                    </li>
                                    <li>
                                        Circumvent subscription verification or
                                        DRM protections on third-party video
                                        platforms.
                                    </li>
                                    <li>
                                        Resell or redistribute Lectoro AI
                                        services or generated content databases
                                        commercially without explicit written
                                        consent.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    5. Third-Party Trademarks & Affiliations
                                </h2>
                                <p>
                                    <strong>Netflix</strong> and{" "}
                                    <strong>YouTube</strong> are registered
                                    trademarks of Netflix, Inc. and Google LLC
                                    respectively. Lectoro AI is an independent
                                    browser extension developed to enhance user
                                    educational workflows and is not officially
                                    affiliated with, endorsed by, or sponsored
                                    by Netflix, Inc., Google LLC, or TED
                                    Conferences.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    6. Disclaimer of Warranties & Limitation of
                                    Liability
                                </h2>
                                <p>
                                    Lectoro AI is provided on an &quot;AS
                                    IS&quot; and &quot;AS AVAILABLE&quot; basis.
                                    While we strive for high uptime and accurate
                                    AI translations, we make no warranties that
                                    translations or voice pronunciations will
                                    always be 100% error-free or uninterrupted.
                                </p>
                                <p className="mt-2">
                                    To the maximum extent permitted by law,
                                    Lectoro AI and its creators shall not be
                                    liable for any indirect, incidental, or
                                    consequential damages resulting from your
                                    use of the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    7. Modifications to the Service and Terms
                                </h2>
                                <p>
                                    We reserve the right to modify or
                                    discontinue features, adjust pricing with
                                    prior notice, or update these Terms of
                                    Service. Continued use of Lectoro AI after
                                    updates constitutes acceptance of the
                                    revised Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display font-bold text-xl text-white mb-3">
                                    8. Contact Information
                                </h2>
                                <p>
                                    For inquiries regarding these Terms of
                                    Service or billing questions, please reach
                                    out to:
                                </p>
                                <div className="mt-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                                    <div className="font-bold text-white">
                                        Lectoro AI Legal & Support
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
