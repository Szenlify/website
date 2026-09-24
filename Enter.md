# Enter — Pełna Specyfikacja Funkcji Analizy Zdania AI w Lectoro (1:1 na WWW)

Dokument zawiera kompletny kod CSS, układ DOM (HTML), ikony SVG, animacje, stany komponentu oraz gotowy komponent React / Next.js pozwalający przenieść funkcję **Enter (Analiza Zdania AI & Word Cloud)** 1 do 1 na stronę internetową.

---

## 1. Wygląd i Układ Wizualny (DOM Architecture)

Karta analizy `Enter` to półprzezroczysty, pływający dymek (glassmorphic card) o zaokrąglonych rogach `16px`, z subtelnym obramowaniem, rozmyciem tła `blur(20px)` oraz spektakularnym, obracającym się gradientem stożkowym AI (`conic-gradient`) wzdłuż krawędzi.

### Schemat struktury DOM (3 stany):

```text
1. Stan Ładowania (Loader):
╭──────────────────────────────────────────────────╮
│            ✨ Analizowanie zdania...             │ (tekst z animowanym gradientem)
╰──────────────────────────────────────────────────╯

2. Krok 1/N — Całe zdanie (Sentence Stage):
╭──────────────────────────────────────────────────╮
│                                        ◀ 1/3 ▶   │ ← Header (.lectoro-ai-header)
│                                                  │
│         Tłumaczenie całego zdania  🔊            │ ← Body (.lectoro-ai-body)
│                                                  │
│──────────────────────────────────────────────────│
│                 Zapisz [Z]     Zdanie AI [X]     │ ← Footer (.lectoro-ai-footer)
╰──────────────────────────────────────────────────╯

3. Krok 2/N — Słowo lub Idiom (Word/Term Stage):
╭──────────────────────────────────────────────────╮
│                                        ◀ 2/3 ▶   │ ← Header
│                                                  │
│                 hang out  🔊                     │ ← Termin (#00ffea neon cyan)
│            spędzać czas, przebywać               │ ← Znaczenie (bold white #ffffff)
│    "Często używane w nieformalnym kontekście..." │ ← Wyjaśnienie (.lectoro-ai-explanation)
│                                                  │
│──────────────────────────────────────────────────│
│                 Zapisz [Z]     Zdanie AI [X]     │ ← Footer
╰──────────────────────────────────────────────────╯
```

---

## 2. Kompletny Kod HTML (Czysta Struktura DOM)

### A. Stan Ładowania (Shimmer Loader)
```html
<div class="lectoro-ai-card" data-state="ai-loading">
  <span class="lectoro-ai-loader-label">✨ Analizowanie zdania...</span>
</div>
```

### B. Krok 1: Tłumaczenie Całego Zdania (`data-type="sentence"`)
```html
<div class="lectoro-ai-card is-revealed" data-state="ready">
  <!-- 1. Nagłówek z nawigacją i licznikiem -->
  <div class="lectoro-ai-header">
    <div class="lectoro-ai-nav-group">
      <button type="button" class="lectoro-ai-nav-btn" data-action="prev" disabled title="Poprzedni (A)">
        ◀
      </button>
      <span class="lectoro-ai-step-counter">1/3</span>
      <button type="button" class="lectoro-ai-nav-btn" data-action="next" title="Następny (D)">
        ▶
      </button>
    </div>
  </div>

  <!-- 2. Treść karty -->
  <div class="lectoro-ai-body">
    <div class="lectoro-ai-term-card" data-type="sentence">
      <div class="lectoro-ai-sentence-wrap">
        <div class="lectoro-ai-meaning">
          Więc co tak właściwie oznacza to dla nas?
        </div>
        <div class="lectoro-ai-actions">
          <button type="button" class="lectoro-ai-speak-btn" aria-label="Odsłuchaj">
            <!-- SVG SPEAKER -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 3. Stopka akcji zapisu -->
  <div class="lectoro-ai-footer">
    <button type="button" class="lectoro-ai-btn lectoro-ai-btn-save" title="Zapisz (Z)">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Zapisz</span>
      <kbd class="lectoro-ai-key-hint">Z</kbd>
    </button>
    <button type="button" class="lectoro-ai-btn lectoro-ai-btn-ai" title="Zdanie AI (X)">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
      <span>Zdanie AI</span>
      <kbd class="lectoro-ai-key-hint">X</kbd>
    </button>
  </div>
</div>
```

### C. Krok 2: Analiza Słowa / Idiomu (`data-type="word"`)
```html
<div class="lectoro-ai-card is-revealed" data-state="ready">
  <!-- 1. Nagłówek -->
  <div class="lectoro-ai-header">
    <div class="lectoro-ai-nav-group">
      <button type="button" class="lectoro-ai-nav-btn" data-action="prev" title="Poprzedni (A)">◀</button>
      <span class="lectoro-ai-step-counter">2/3</span>
      <button type="button" class="lectoro-ai-nav-btn" data-action="next" title="Następny (D)">▶</button>
    </div>
  </div>

  <!-- 2. Treść karty (Termin, głośnik, znaczenie, wyjaśnienie) -->
  <div class="lectoro-ai-body">
    <div class="lectoro-ai-term-card" data-type="word">
      <div class="lectoro-ai-term-header">
        <div class="lectoro-ai-term-title-wrap">
          <span class="lectoro-ai-term">hang out</span>
          <div class="lectoro-ai-actions">
            <button type="button" class="lectoro-ai-speak-btn" aria-label="Odsłuchaj">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="lectoro-ai-meaning">spędzać czas, przebywać ze znajomymi</div>
      <div class="lectoro-ai-explanation">
        Bardzo częsty idiom w języku potocznym oznaczający relaksowanie się w czyimś towarzystwie bez konkretnego celu.
      </div>
    </div>
  </div>

  <!-- 3. Stopka -->
  <div class="lectoro-ai-footer">
    <button type="button" class="lectoro-ai-btn lectoro-ai-btn-save" title="Zapisz (Z)">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>Zapisz</span>
      <kbd class="lectoro-ai-key-hint">Z</kbd>
    </button>
    <button type="button" class="lectoro-ai-btn lectoro-ai-btn-ai" title="Zdanie AI (X)">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
      <span>Zdanie AI</span>
      <kbd class="lectoro-ai-key-hint">X</kbd>
    </button>
  </div>
</div>
```

---

## 3. Kompletny Kod CSS (1:1 z Lectoro Extension)

Poniższy CSS to dokładne, oczyszczone z prefiksów wewnętrznych reguły stylów z `styles.css`. Możesz zapisać je bezpośrednio w pliku `.css` lub `.module.css`.

```css
/* ═══════════════════════════════════════════════════════════════
   Karta Enter AI Explanation — Główne Zmienne i Kontener
   ═══════════════════════════════════════════════════════════════ */

@property --qt-ai-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

:root {
  --lectoro-ai-term-font-size: 15px;
  --lectoro-ai-meaning-font-size: 16px;
  --lectoro-ai-explanation-font-size: 12px;
  --lectoro-ai-meta-font-size: 10px;
  --lectoro-ai-sentence-term-font-size: 15px;
  --lectoro-ai-sentence-meaning-font-size: 16px;
}

.lectoro-ai-card {
  position: relative;
  width: 100%;
  max-width: min(520px, calc(100vw - 24px));
  max-height: min(560px, calc(100vh - 48px));
  margin: 0 auto;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: #0f0f23bf; /* 75% przezroczysty granat */
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  color: #ffffff;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  box-sizing: border-box;
  isolation: isolate;
  user-select: text;
  cursor: default;
  animation: lectoroAiBubbleIn 0.2s cubic-bezier(0.34, 1.3, 0.64, 1) both;
  transition: width 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* ═══════════════════════════════════════════════════════════════
   Efekt Obracającego się Obramowania AI (Conic Gradient Sweep)
   ═══════════════════════════════════════════════════════════════ */

.lectoro-ai-card::before {
  content: "";
  position: absolute;
  inset: -1.5px;
  border-radius: 17px;
  padding: 1.5px;
  background: conic-gradient(
    from var(--qt-ai-angle, 0deg),
    transparent 0%,
    transparent 25%,
    #a855f7 45%,
    #4ecdc4 65%,
    #ffffff 80%,
    #a855f7 92%,
    transparent 100%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  z-index: 2;
}

.lectoro-ai-card.is-revealed::before {
  animation: lectoroAiBorderSweep 2.2s cubic-bezier(0.35, 1, 0.5, 0.9) 1 forwards;
}

@keyframes lectoroAiBorderSweep {
  0% {
    --qt-ai-angle: 0deg;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    --qt-ai-angle: 360deg;
    opacity: 0;
  }
}

@keyframes lectoroAiBubbleIn {
  from {
    opacity: 0;
    transform: translateY(7px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ═══════════════════════════════════════════════════════════════
   Stan Ładowania (Loader ze Shimmerem)
   ═══════════════════════════════════════════════════════════════ */

.lectoro-ai-card[data-state="ai-loading"] {
  padding: 16px 24px;
  align-items: center;
  justify-content: center;
  min-height: 52px;
}

.lectoro-ai-loader-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: 600 13px/1.2 "Inter", sans-serif;
  letter-spacing: 0.03em;
  color: transparent;
  background: linear-gradient(
    90deg,
    #a855f7 0%,
    #4ecdc4 25%,
    #ffffff 50%,
    #4ecdc4 75%,
    #a855f7 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: lectoroAiShimmer 1.8s linear infinite;
}

@keyframes lectoroAiShimmer {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

/* ═══════════════════════════════════════════════════════════════
   Nagłówek i Nawigacja Kroków (Header & Navigation)
   ═══════════════════════════════════════════════════════════════ */

.lectoro-ai-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 14px 2px;
}

.lectoro-ai-nav-group {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  margin-left: auto;
  flex-shrink: 0;
}

.lectoro-ai-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 3px 6px;
  border-radius: 6px;
  font-size: var(--lectoro-ai-meta-font-size, 10px);
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
}

.lectoro-ai-nav-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.2);
}

.lectoro-ai-nav-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.lectoro-ai-step-counter {
  font-size: var(--lectoro-ai-meta-font-size, 10px);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  padding: 0 4px;
  letter-spacing: 0.5px;
}

/* ═══════════════════════════════════════════════════════════════
   Ciało Karty (Body & Content Typography)
   ═══════════════════════════════════════════════════════════════ */

.lectoro-ai-body {
  padding: 14px 22px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  max-height: min(400px, calc(100vh - 140px));
  overflow-y: auto;
}

.lectoro-ai-term-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: 10px;
  width: 100%;
}

/* Styl dla etapu zdania (Sentence Stage) */
.lectoro-ai-term-card[data-type="sentence"] {
  gap: 0;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
}

.lectoro-ai-sentence-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.lectoro-ai-sentence-wrap .lectoro-ai-meaning {
  width: auto;
  max-width: calc(100% - 36px);
  margin-top: 0;
}

/* Styl dla etapu słowa/idiomu (Word Stage) */
.lectoro-ai-term-header {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 100%;
  text-align: center;
}

.lectoro-ai-term-title-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  text-align: center;
}

/* Podświetlenie terminu w kolorze turkusowym #00ffea */
.lectoro-ai-term {
  font-size: var(--lectoro-ai-term-font-size, 15px);
  font-weight: 700;
  letter-spacing: -0.2px;
  color: #00ffea;
  line-height: 1.35;
  text-align: center;
}

/* Główne znaczenie / tłumaczenie w kolorze białym */
.lectoro-ai-meaning {
  font-size: var(--lectoro-ai-meaning-font-size, 16px);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  width: 100%;
  margin-top: 2px;
}

/* Wyjaśnienie użycia słowa w ramce */
.lectoro-ai-explanation {
  font-size: var(--lectoro-ai-explanation-font-size, 12px);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.82);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 10px 14px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  margin-top: 4px;
}

/* Cytowane słowo wewnątrz wyjaśnienia (kolor żółty bursztynowy) */
.lectoro-ai-explanation .quote,
.lectoro-ai-quote {
  color: #ffd000;
  font-weight: 500;
}

/* Przycisk odsłuchu (Głośnik) */
.lectoro-ai-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.lectoro-ai-speak-btn {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  transition: all 0.2s ease;
}

.lectoro-ai-speak-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
}

.lectoro-ai-speak-btn.speaking {
  color: #4ecdc4;
  border-color: rgba(78, 205, 196, 0.3);
  background: rgba(78, 205, 196, 0.1);
}

/* ═══════════════════════════════════════════════════════════════
   Pasek Akcji na Dole (Save Footer Z / X)
   ═══════════════════════════════════════════════════════════════ */

.lectoro-ai-footer {
  display: flex;
  gap: 6px;
  padding: 6px 14px 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
}

.lectoro-ai-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  line-height: 1.3;
}

.lectoro-ai-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

/* Przycisk Zwykły Zapis [Z] */
.lectoro-ai-btn-save.saved {
  color: #4ecdc4;
  border-color: rgba(78, 205, 196, 0.3);
  background: rgba(78, 205, 196, 0.1);
  pointer-events: none;
}

/* Przycisk Zdanie AI [X] w odcieniach fioletu */
.lectoro-ai-btn-ai {
  border-color: rgba(168, 85, 247, 0.3);
  background: rgba(168, 85, 247, 0.08);
  color: rgba(200, 160, 255, 0.85);
}

.lectoro-ai-btn-ai:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.16);
  border-color: rgba(168, 85, 247, 0.5);
  color: #fff;
}

.lectoro-ai-btn-ai.saved {
  color: #a78bfa;
  border-color: rgba(168, 85, 247, 0.4);
  background: rgba(168, 85, 247, 0.12);
  pointer-events: none;
}

/* Skrót klawiszowy w przycisku [Z] / [X] */
.lectoro-ai-key-hint {
  margin-left: 2px;
  padding: 1px 3px;
  font-size: 8.5px;
  line-height: 1;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.6);
  font-family: inherit;
}

/* ═══════════════════════════════════════════════════════════════
   Podświetlenia Napisów w Wideo (Word Highlights)
   ═══════════════════════════════════════════════════════════════ */

/* Aktywne słowo podświetlone w filmie (turkusowo-fioletowy neon) */
.lectoro-ai-sub-active {
  background: linear-gradient(
    135deg,
    rgba(78, 205, 196, 0.45),
    rgba(168, 85, 247, 0.45)
  );
  color: #ffffff;
  text-shadow:
    0 0 8px rgba(78, 205, 196, 0.8),
    0 1px 2px rgba(0, 0, 0, 0.9);
  border-radius: 4px;
  box-shadow:
    inset 0 0 0 1px #4ecdc4,
    0 0 8px rgba(78, 205, 196, 0.45);
  padding: 1px 4px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Oczekujące słowa z kolejki AI w napisach (fioletowe) */
.lectoro-ai-sub-upcoming,
.lectoro-ai-sub-queued {
  background: rgba(168, 85, 247, 0.26);
  color: #f3e8ff;
  text-shadow:
    0 0 8px rgba(168, 85, 247, 0.7),
    0 1px 2px rgba(0, 0, 0, 0.9);
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(168, 85, 247, 0.4);
  padding: 1px 4px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.lectoro-ai-sub-upcoming:hover {
  background: rgba(168, 85, 247, 0.42);
  box-shadow:
    inset 0 0 0 1.5px #c084fc,
    0 0 12px rgba(168, 85, 247, 0.65);
  color: #ffffff;
}
```

---

## 4. Gotowy Komponent React / Next.js (1:1 do wdrożenia na WWW)

Poniższy komponent TypeScript (`EnterAiExplain.tsx`) implementuje całą logikę:
- Przełączanie kroków (strzałki ◀ ▶ oraz klawisze `A` / `D`)
- Zamykanie (`W`, `Escape`)
- Zapisywanie (`Z` / `X`)
- Odsłuch lektora (zintegrowany z Microsoft Edge TTS lub natywnym głosem)
- Wszystkie animacje i klasy identyczne jak w rozszerzeniu

```tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./EnterAiExplain.css"; // lub zaimportuj powyższy CSS

export interface AiExplainItem {
  type: "sentence" | "word";
  term?: string;
  meaning: string;
  explanation?: string;
}

interface EnterAiExplainProps {
  sentence: string;
  items: AiExplainItem[];
  lang?: string;
  onClose?: () => void;
  onSave?: (item: AiExplainItem, isAiSentence: boolean) => void;
  onSpeak?: (text: string, lang: string) => void;
}

export default function EnterAiExplain({
  sentence,
  items,
  lang = "en",
  onClose,
  onSave,
  onSpeak,
}: EnterAiExplainProps) {
  const [index, setIndex] = useState(0);
  const [savedIndices, setSavedIndices] = useState<Set<number>>(new Set());
  const [aiSavedIndices, setAiSavedIndices] = useState<Set<number>>(new Set());
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentItem = items[index];
  const isSentenceStage = currentItem?.type === "sentence";

  const handlePrev = useCallback(() => {
    setIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setIndex((prev) => Math.min(items.length - 1, prev + 1));
  }, [items.length]);

  const handleSpeak = useCallback(() => {
    if (!currentItem) return;
    const textToSpeak = isSentenceStage
      ? currentItem.meaning
      : `${currentItem.term}. ${currentItem.meaning}`;

    setIsSpeaking(true);
    if (onSpeak) {
      onSpeak(textToSpeak, lang);
    } else if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(textToSpeak);
      u.lang = lang;
      u.onend = () => setIsSpeaking(false);
      u.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
    }
  }, [currentItem, isSentenceStage, lang, onSpeak]);

  const handleSaveWord = useCallback(() => {
    if (!currentItem) return;
    setSavedIndices((prev) => new Set(prev).add(index));
    onSave?.(currentItem, false);
  }, [currentItem, index, onSave]);

  const handleSaveAi = useCallback(() => {
    if (!currentItem) return;
    setAiSavedIndices((prev) => new Set(prev).add(index));
    onSave?.(currentItem, true);
  }, [currentItem, index, onSave]);

  // Skróty klawiszowe (A, D, Z, X, W, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();
      if (key === "a" || key === "arrowleft") {
        e.preventDefault();
        handlePrev();
      } else if (key === "d" || key === "arrowright") {
        e.preventDefault();
        handleNext();
      } else if (key === "z") {
        e.preventDefault();
        handleSaveWord();
      } else if (key === "x") {
        e.preventDefault();
        handleSaveAi();
      } else if (key === "w" || key === "escape" || key === "arrowup") {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, handleSaveWord, handleSaveAi, onClose]);

  if (!currentItem) return null;

  const isSaved = savedIndices.has(index);
  const isAiSaved = aiSavedIndices.has(index);

  return (
    <div className="lectoro-ai-card is-revealed" data-state="ready">
      {/* 1. Header & Step Navigation */}
      <div className="lectoro-ai-header">
        <div className="lectoro-ai-nav-group">
          <button
            type="button"
            className="lectoro-ai-nav-btn"
            onClick={handlePrev}
            disabled={index === 0}
            title="Poprzedni (A)"
          >
            ◀
          </button>
          <span className="lectoro-ai-step-counter">
            {index + 1}/{items.length}
          </span>
          <button
            type="button"
            className="lectoro-ai-nav-btn"
            onClick={handleNext}
            disabled={index >= items.length - 1}
            title="Następny (D)"
          >
            ▶
          </button>
        </div>
      </div>

      {/* 2. Body */}
      <div className="lectoro-ai-body">
        <div className="lectoro-ai-term-card" data-type={currentItem.type}>
          {isSentenceStage ? (
            <div className="lectoro-ai-sentence-wrap">
              <div className="lectoro-ai-meaning">{currentItem.meaning}</div>
              <div className="lectoro-ai-actions">
                <button
                  type="button"
                  className={`lectoro-ai-speak-btn ${isSpeaking ? "speaking" : ""}`}
                  onClick={handleSpeak}
                  title="Odsłuchaj"
                  aria-label="Odsłuchaj"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="lectoro-ai-term-header">
                <div className="lectoro-ai-term-title-wrap">
                  <span className="lectoro-ai-term">{currentItem.term}</span>
                  <div className="lectoro-ai-actions">
                    <button
                      type="button"
                      className={`lectoro-ai-speak-btn ${isSpeaking ? "speaking" : ""}`}
                      onClick={handleSpeak}
                      title="Odsłuchaj"
                      aria-label="Odsłuchaj"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="lectoro-ai-meaning">{currentItem.meaning}</div>
              {currentItem.explanation && (
                <div className="lectoro-ai-explanation">{currentItem.explanation}</div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 3. Footer */}
      <div className="lectoro-ai-footer">
        <button
          type="button"
          className={`lectoro-ai-btn lectoro-ai-btn-save ${isSaved ? "saved" : ""}`}
          onClick={handleSaveWord}
          disabled={isSaved}
          title="Zapisz do powtórek (Z)"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span>{isSaved ? "Zapisano!" : "Zapisz"}</span>
          {!isSaved && <kbd className="lectoro-ai-key-hint">Z</kbd>}
        </button>

        <button
          type="button"
          className={`lectoro-ai-btn lectoro-ai-btn-ai ${isAiSaved ? "saved" : ""}`}
          onClick={handleSaveAi}
          disabled={isAiSaved}
          title="Wygeneruj przykład AI i zapisz (X)"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>{isAiSaved ? "Zapisano z AI!" : "Zdanie AI"}</span>
          {!isAiSaved && <kbd className="lectoro-ai-key-hint">X</kbd>}
        </button>
      </div>
    </div>
  );
}
```

---

## 5. Podsumowanie Wymiarów i Kolorów dla Projektantów

| Element | Wartość | Uwagi |
| --- | --- | --- |
| **Tło dymka** | `#0f0f23bf` (rgba(15, 15, 35, 0.75)) | Półprzezroczysty ciemny granat |
| **Rozmycie szkła** | `backdrop-filter: blur(20px) saturate(1.4)` | Efekt iOS/macOS Glassmorphism |
| **Krawędzie** | `16px` | border-radius |
| **Cień dymka** | `0 8px 32px rgba(0,0,0,0.4)` + wewnętrzny `0 0 0 1px rgba(255,255,255,0.08) inset` | Głębia 3D |
| **Kolor terminu (słowa/idiomu)** | `#00ffea` (neon cyan) | Wyróżnia trudne słowo |
| **Kolor znaczenia** | `rgba(255, 255, 255, 0.95)` | Pogrubione (bold 700) 16px |
| **Cytowane słowa w opisie** | `#ffd000` (amber yellow) | Klasa `.quote` |
| **Przycisk Zdanie AI** | `rgba(168, 85, 247, 0.3)` border / `rgba(168, 85, 247, 0.08)` bg | Purpurowy akcent AI |
| **Aktywne podświetlenie w napisach** | Gradient `#4ecdc4` do `#a855f7` z neonowym cieniem | `.lectoro-ai-sub-active` |
| **Kolejne słowa w napisach** | `rgba(168, 85, 247, 0.26)` | `.lectoro-ai-sub-upcoming` |
