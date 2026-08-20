"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import {
  CHROME_STORE_URL,
  dictionaries,
  supportedLocales,
  type Dictionary,
  type SiteCurrency,
  type SiteLocale,
} from "../lib/site";

type LandingPageProps = {
  dictionary: Dictionary;
  locale: SiteLocale;
  currency: SiteCurrency;
  monthlyPrice: string;
  annualPrice: string;
};

function ChromeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#fff" d="M12 1a11 11 0 0 0-9.65 5.72l4.63 8.02A5.5 5.5 0 0 1 12 6.5h9.59A11 11 0 0 0 12 1Z" />
      <path fill="#fff" opacity=".86" d="M2.05 7.29A11 11 0 0 0 10.7 22.92l4.61-7.99a5.5 5.5 0 0 1-7.97-.88L2.05 7.29Z" />
      <path fill="#fff" opacity=".72" d="M16.02 14.55a5.5 5.5 0 0 1-4.67 8.4h.65A11 11 0 0 0 22 7.31h-9.23l3.25 7.24Z" />
      <circle cx="12" cy="12" r="3.55" fill="#07111d" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m5 10.2 3.1 3.1L15.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 7 8 5-8 5V7Z" fill="currentColor" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9.3 4.5h2.1a2.4 2.4 0 1 1 4.7 0h2.4c.6 0 1 .4 1 1v4.1a2.4 2.4 0 1 0 0 4.8v4.1c0 .6-.4 1-1 1h-4.1a2.4 2.4 0 1 1-4.8 0H5.5a1 1 0 0 1-1-1v-4.1a2.4 2.4 0 1 0 0-4.8V5.5c0-.6.4-1 1-1h3.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path d="m8.4 4.5 7.1 7.1-2.1 1.1-.7 3.5-2.1-2.1-4.9 4.9-.7-.7 4.9-4.9-2.1-2.1 3.5-.7 1.1-2.1-4-4Z" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Brand() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="brand-icon">
        <Image src="/icon.png" alt="" width={32} height={32} priority />
      </span>
      <span className="text-[1.08rem] font-semibold tracking-[-0.035em] text-white">Lectoro</span>
    </span>
  );
}

function PlatformLogos({ more }: { more: string }) {
  return (
    <div className="platforms" aria-label={`Netflix, YouTube, TED, Plex, X — ${more}`}>
      <span className="platform platform-netflix" aria-label="Netflix">N</span>
      <span className="platform platform-youtube" aria-label="YouTube">
        <span className="youtube-play" />
        <span>YouTube</span>
      </span>
      <span className="platform platform-ted" aria-label="TED">TED</span>
      <span className="platform platform-plex" aria-label="Plex">ple<span>x</span></span>
      <span className="platform platform-x" aria-label="X">𝕏</span>
      <span className="platform-more"><span className="platform-cc">CC</span>{more}</span>
    </div>
  );
}

function HeroDemo({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className="demo-shell" aria-label="Lectoro dual subtitle preview">
      <div className="demo-topbar">
        <div className="flex gap-1.5" aria-hidden="true"><span /><span /><span /></div>
        <div className="demo-address">youtube.com/watch</div>
        <div className="demo-cc">CC</div>
      </div>
      <div className="demo-scene">
        <div className="demo-noise" />
        <div className="demo-moon" />
        <div className="demo-person" />
        <div className="word-card">
          <div className="flex items-center justify-between gap-4">
            <span className="word-card-title">{dictionary.hero.word}</span>
            <span className="word-card-audio" aria-hidden="true">)))</span>
          </div>
          <p>{dictionary.hero.meaning}</p>
          <div className="word-card-saved"><CheckIcon />{dictionary.hero.saved}</div>
        </div>
        <div className="captions">
          <p lang="en">{dictionary.hero.captionOriginal.split("simple")[0]}<mark>simple</mark>.</p>
          <p>{dictionary.hero.captionTranslation}</p>
        </div>
        <div className="demo-controls" aria-hidden="true">
          <span className="demo-play" />
          <span className="demo-timeline"><i /></span>
          <span className="demo-control-cc">CC</span>
        </div>
      </div>
    </div>
  );
}

function FeatureGlyph({ index }: { index: number }) {
  if (index === 0) return <span className="text-[0.72rem] font-black tracking-wider">CC</span>;
  if (index === 1) {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 4 13.5 7.2-6 1.8-2.2 5.7L5 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>;
  }
  if (index === 2) {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 5.5h8.5A2.5 2.5 0 0 1 18 8v10.5H9.5A2.5 2.5 0 0 1 7 16V5.5Z" stroke="currentColor" strokeWidth="1.6"/><path d="M7 8H5.8A1.8 1.8 0 0 0 4 9.8v8.4A1.8 1.8 0 0 0 5.8 20H15v-1.5" stroke="currentColor" strokeWidth="1.6"/></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5 13.5 9l5.5 1.5-5.5 1.5-1.5 5.5-1.5-5.5L5 10.5 10.5 9 12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m18.5 15 .6 2.2 2.2.6-2.2.6-.6 2.1-.6-2.1-2.2-.6 2.2-.6.6-2.2Z" fill="currentColor"/></svg>;
}

export default function LandingPage({ dictionary, locale, currency, monthlyPrice, annualPrice }: LandingPageProps) {
  const router = useRouter();
  const [annual, setAnnual] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function changeLanguage(nextLocale: string) {
    const search = new URLSearchParams(window.location.search);
    search.set("lang", nextLocale);
    startTransition(() => router.replace(`/?${search.toString()}`, { scroll: false }));
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-container header-inner flex h-[4.5rem] items-center justify-between gap-4">
          <a href="#top" aria-label="Lectoro home"><Brand /></a>
          <nav className="header-nav hidden items-center gap-8 text-sm text-white/60 lg:flex" aria-label="Main navigation">
            <a href="#showcase">{dictionary.nav.showcase}</a>
            <a href="#features">{dictionary.nav.features}</a>
            <a href="#pricing">{dictionary.nav.pricing}</a>
            <a href="#faq">{dictionary.nav.faq}</a>
          </nav>
          <div className="header-actions flex items-center gap-2 sm:gap-3">
            <label className={`language-picker ${isPending ? "opacity-60" : ""}`}>
              <span className="sr-only">{dictionary.nav.language}</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M3 10h14M10 3c2.8 3.1 2.8 10.9 0 14M10 3c-2.8 3.1-2.8 10.9 0 14" stroke="currentColor" strokeWidth="1.2"/></svg>
              <select value={locale} onChange={(event) => changeLanguage(event.target.value)} disabled={isPending}>
                {supportedLocales.map((item) => <option key={item} value={item}>{dictionaries[item].localeName}</option>)}
              </select>
            </label>
            <a className="header-cta hidden sm:inline-flex" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">
              {dictionary.nav.add}<ArrowIcon />
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
          <div className="site-container relative z-10">
            <div className="hero-platform-block">
              <p>{dictionary.hero.platforms}</p>
              <PlatformLogos more={dictionary.hero.more} />
            </div>
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="eyebrow"><span className="eyebrow-dot" />{dictionary.hero.eyebrow}</div>
                <h1>{dictionary.hero.title}<br /><span>{dictionary.hero.accent}</span></h1>
                <p className="hero-body">{dictionary.hero.body}</p>
                <div className="hero-actions">
                  <a className="primary-button" href={CHROME_STORE_URL} target="_blank" rel="noreferrer"><ChromeIcon />{dictionary.hero.primary}</a>
                  <a className="text-button" href="#how">{dictionary.hero.secondary}<ArrowIcon /></a>
                </div>
                <div className="hero-trust"><span><CheckIcon />{dictionary.hero.free}</span><span><CheckIcon />{dictionary.hero.noCard}</span></div>
              </div>
              <HeroDemo dictionary={dictionary} />
            </div>
          </div>
        </section>

        <section id="how" className="section-block section-line">
          <div className="site-container">
            <div className="section-heading">
              <p className="section-kicker">{dictionary.how.eyebrow}</p>
              <h2>{dictionary.how.title}</h2>
              <p>{dictionary.how.body}</p>
            </div>
            <div className="steps-grid">
              {dictionary.how.steps.map((step) => (
                <article className="step-card" key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="video" className="section-block video-section">
          <div className="site-container">
            <div className="section-heading video-heading">
              <p className="section-kicker">{dictionary.video.eyebrow}</p>
              <h2>{dictionary.video.title}</h2>
              <p>{dictionary.video.body}</p>
            </div>
            {/* Replace this placeholder with a <video> or responsive YouTube iframe. */}
            <div className="video-slot" data-video-slot aria-label={dictionary.video.placeholder}>
              <div className="video-slot-grid" />
              <div className="video-slot-brand"><Brand /></div>
              <div className="video-play" aria-hidden="true"><PlayIcon /></div>
              <div className="video-slot-copy">
                <strong>{dictionary.video.placeholder}</strong>
                <span>{dictionary.video.note}</span>
              </div>
              <span className="video-time" aria-hidden="true">00:00 / 02:30</span>
              <span className="video-cc" aria-hidden="true">CC</span>
            </div>
          </div>
        </section>

        <section id="showcase" className="section-block section-line showcase-section">
          <div className="site-container">
            <div className="section-heading showcase-heading">
              <p className="section-kicker">{dictionary.showcase.eyebrow}</p>
              <h2>{dictionary.showcase.title}</h2>
              <p>{dictionary.showcase.body}</p>
            </div>
            <div className="showcase-grid">
              <article className="showcase-card showcase-card-main">
                <div className="showcase-image">
                  <Image src="/showcase/video-ai-open.jpg" alt={dictionary.showcase.items[0].alt} width={1800} height={919} sizes="(max-width: 960px) 100vw, 66vw" />
                </div>
                <div className="showcase-copy"><span>01</span><div><h3>{dictionary.showcase.items[0].title}</h3><p>{dictionary.showcase.items[0].body}</p></div></div>
              </article>
              <div className="showcase-side">
                <article className="showcase-card">
                  <div className="showcase-image"><Image src="/showcase/review-panel.jpg" alt={dictionary.showcase.items[1].alt} width={1800} height={1033} sizes="(max-width: 960px) 100vw, 34vw" /></div>
                  <div className="showcase-copy"><span>02</span><div><h3>{dictionary.showcase.items[1].title}</h3><p>{dictionary.showcase.items[1].body}</p></div></div>
                </article>
                <article className="showcase-card">
                  <div className="showcase-image"><Image src="/showcase/article-tools.jpg" alt={dictionary.showcase.items[2].alt} width={1458} height={908} sizes="(max-width: 960px) 100vw, 34vw" /></div>
                  <div className="showcase-copy"><span>03</span><div><h3>{dictionary.showcase.items[2].title}</h3><p>{dictionary.showcase.items[2].body}</p></div></div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section-block">
          <div className="site-container features-layout">
            <div className="section-heading features-heading">
              <p className="section-kicker">{dictionary.features.eyebrow}</p>
              <h2>{dictionary.features.title}</h2>
              <p>{dictionary.features.body}</p>
              <div className="mini-caption-demo" aria-hidden="true">
                <span className="mini-label">EN</span><p>Small steps become <mark>real progress</mark>.</p>
                <span className="mini-label">CC</span><p>Małe kroki zmieniają się w prawdziwy postęp.</p>
              </div>
            </div>
            <div className="features-grid">
              {dictionary.features.items.map((item, index) => (
                <article className="feature-card" key={item.title}>
                  <div className="feature-icon"><FeatureGlyph index={index} /></div>
                  <span className="feature-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="install" className="section-block install-section section-line">
          <div className="site-container install-layout">
            <div>
              <div className="section-heading install-heading">
                <p className="section-kicker">{dictionary.install.eyebrow}</p>
                <h2>{dictionary.install.title}</h2>
                <p>{dictionary.install.body}</p>
              </div>
              <ol className="install-steps">
                {dictionary.install.steps.map((step, index) => (
                  <li key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>
                ))}
              </ol>
              <a className="primary-button" href={CHROME_STORE_URL} target="_blank" rel="noreferrer"><ChromeIcon />{dictionary.install.cta}</a>
            </div>
            <div className="pin-demo" aria-label={dictionary.install.title}>
              <div className="pin-browser-bar">
                <div className="pin-address">chrome://extensions</div>
                <div className="puzzle-button"><PuzzleIcon /></div>
              </div>
              <div className="extensions-popover">
                <div className="extensions-title"><strong>{dictionary.install.browserLabel}</strong><span>×</span></div>
                <div className="extension-row extension-row-muted"><span className="extension-placeholder" /><span /><PinIcon /></div>
                <div className="extension-row extension-row-lectoro">
                  <Image src="/icon.png" alt="" width={36} height={36} />
                  <div><strong>Lectoro</strong><small>Language learning</small></div>
                  <span className="pin-active"><PinIcon filled /></span>
                </div>
                <div className="extension-row extension-row-muted"><span className="extension-placeholder" /><span /><PinIcon /></div>
              </div>
              <div className="pinned-toast"><CheckIcon />{dictionary.install.pinned}</div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section-block section-line">
          <div className="site-container">
            <div className="section-heading pricing-heading">
              <p className="section-kicker">{dictionary.pricing.eyebrow}</p>
              <h2>{dictionary.pricing.title}</h2>
              <p>{dictionary.pricing.body}</p>
              <div className="pricing-toolbar">
                <div className="billing-toggle" role="group" aria-label="Billing period">
                  <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>{dictionary.pricing.monthly}</button>
                  <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>{dictionary.pricing.annual}<span>{dictionary.pricing.save}</span></button>
                </div>
                <span className="currency-badge"><span />{dictionary.pricing.region}: {currency}</span>
              </div>
            </div>
            <div className="pricing-grid">
              <article className="price-card">
                <div><h3>{dictionary.pricing.freeName}</h3><p>{dictionary.pricing.freeDesc}</p></div>
                <div className="price"><strong>0</strong><span>{currency}<br />{dictionary.pricing.forever}</span></div>
                <ul>{dictionary.pricing.freeFeatures.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul>
                <a className="secondary-button" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">{dictionary.pricing.freeCta}</a>
              </article>
              <article className="price-card price-card-pro">
                <div className="popular-label">{dictionary.pricing.popular}</div>
                <div><h3>{dictionary.pricing.proName}</h3><p>{dictionary.pricing.proDesc}</p></div>
                <div className="price"><strong>{annual ? annualPrice : monthlyPrice}</strong><span>{dictionary.pricing.perMonth}<br />{annual ? dictionary.pricing.billedAnnually : "\u00a0"}</span></div>
                <ul>{dictionary.pricing.proFeatures.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul>
                <a className="primary-button justify-center" href={CHROME_STORE_URL} target="_blank" rel="noreferrer">{dictionary.pricing.proCta}<ArrowIcon /></a>
              </article>
            </div>
          </div>
        </section>

        <section id="faq" className="section-block">
          <div className="site-container faq-layout">
            <div className="section-heading faq-heading">
              <p className="section-kicker">{dictionary.faq.eyebrow}</p>
              <h2>{dictionary.faq.title}</h2>
            </div>
            <div className="faq-list">
              {dictionary.faq.items.map((item, index) => (
                <details key={item.q} open={index === 0}>
                  <summary>{item.q}<span aria-hidden="true">+</span></summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="site-container">
            <div className="final-card">
              <div className="final-cc" aria-hidden="true">CC</div>
              <h2>{dictionary.final.title}</h2>
              <p>{dictionary.final.body}</p>
              <a className="primary-button" href={CHROME_STORE_URL} target="_blank" rel="noreferrer"><ChromeIcon />{dictionary.final.cta}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-main"><div><Brand /><p>{dictionary.footer.tagline}</p></div><div className="footer-links"><a href="#showcase">{dictionary.nav.showcase}</a><a href="#features">{dictionary.nav.features}</a><a href="#pricing">{dictionary.nav.pricing}</a><a href="#faq">{dictionary.nav.faq}</a></div></div>
          <div className="footer-bottom"><p>© {new Date().getFullYear()} Lectoro. {dictionary.footer.rights}</p><p>{dictionary.footer.disclaimer}</p></div>
        </div>
      </footer>
    </div>
  );
}
