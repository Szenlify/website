import Image, { type StaticImageData } from "next/image";

type ScreenshotFrameProps = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  label: string;
  status?: string;
  sizes?: string;
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="none">
      <path
        d="m5 10.25 3.1 3.1L15 6.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  label,
  status = "Podgląd produktu",
  sizes = "(max-width: 1024px) 100vw, 960px",
}: ScreenshotFrameProps) {
  return (
    <figure className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#080d17] shadow-[0_32px_90px_-38px_rgba(0,0,0,0.95)]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#0b111d] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div aria-hidden="true" className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="truncate text-left text-[11px] font-semibold text-zinc-300 sm:text-xs">
            {label}
          </span>
        </div>
        <span className="shrink-0 rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-300 sm:text-[10px]">
          {status}
        </span>
      </figcaption>

      <div className="relative bg-black">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={88}
          className="h-auto w-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]"
        />
      </div>
    </figure>
  );
}

function FeatureCopy({
  eyebrow,
  title,
  description,
  points,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="space-y-5 text-left">
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
        {eyebrow}
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
          {title}
        </h3>
        <p className="max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
          {description}
        </p>
      </div>
      <ul className="space-y-2.5">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-200">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
              <CheckIcon />
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InteractiveDemo() {
  return (
    <section
      aria-labelledby="product-showcase-title"
      className="mt-14 w-full text-left sm:mt-16"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#07121f]/90 shadow-[0_42px_120px_-55px_rgba(79,70,229,0.65)] backdrop-blur-xl">
        <div
          aria-hidden="true"
          className="absolute -left-36 top-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-36 bottom-16 h-80 w-80 rounded-full bg-emerald-400/[0.08] blur-[110px]"
        />

        <div className="relative border-b border-white/10 px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.8)]" />
                Lectoro w praktyce
              </span>
              <h2
                id="product-showcase-title"
                className="text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
              >
                Zobacz naukę dokładnie tak,
                <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-emerald-300 bg-clip-text text-transparent">
                  jak wygląda na ekranie
                </span>
              </h2>
              <p className="max-w-xl text-sm leading-7 text-zinc-300 sm:text-base">
                Prawdziwy kontekst zamiast sztucznych przykładów: napisy z filmu,
                tłumaczenie zaznaczonego tekstu, wyjaśnienie AI i powtórka z kadrem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-[20rem] lg:justify-end">
              {["Napisy wideo", "Strony WWW", "Wyjaśnienia AI", "Powtórki"].map(
                (item, index) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-[11px] font-bold text-zinc-300"
                  >
                    <span className="font-mono text-indigo-300">0{index + 1}</span>
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2 text-[10px] font-semibold text-zinc-400 sm:text-xs">
            <svg aria-hidden="true" className="h-4 w-4 text-zinc-500" viewBox="0 0 20 20" fill="none">
              <path d="M5.5 5.5h9v9h-9z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 8h4v4H8z" fill="currentColor" />
            </svg>
            Statyczna prezentacja interfejsu — bez odtwarzania, TTS i elementów klikalnych
          </div>
        </div>

        <div className="relative space-y-16 px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <section className="space-y-7">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <FeatureCopy
                eyebrow="Napisy wideo"
                title="Słowo, znaczenie i kontekst w jednym kadrze"
                description="Nakładka pozostaje blisko zaznaczonego fragmentu, dzięki czemu wzrok nie ucieka od sceny. Oryginalne zdanie zachowuje rytm filmu, a tłumaczenie jest podane dokładnie tam, gdzie go potrzebujesz."
                points={[
                  "Dwa języki widoczne jednocześnie",
                  "Czytelna karta słowa bez zasłaniania sceny",
                  "Kadr z filmu jako naturalny kontekst pamięciowy",
                ]}
              />

              <div className="lg:-mr-20">
                <ScreenshotFrame
                  src="/showcase/video-word-card.jpg"
                  alt="Kadr z filmu z dwujęzycznymi napisami i kartą tłumaczenia słowa"
                  width={1800}
                  height={1003}
                  label="Odtwarzacz wideo · kontekstowe tłumaczenie"
                  status="EN → PL"
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="grid gap-7 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            <div className="lg:-ml-20">
              <ScreenshotFrame
                src="/showcase/article-tools.jpg"
                alt="Artykuł internetowy z zaznaczonym fragmentem i pływającym paskiem narzędzi"
                width={1458}
                height={908}
                label="Strona internetowa · zaznaczony tekst"
                status="WWW"
              />
            </div>

            <FeatureCopy
              eyebrow="Strony internetowe"
              title="Mały pasek, który nie wyrywa Cię z czytania"
              description="Kompaktowe narzędzia pojawiają się przy zaznaczeniu, a rezultat pozostaje w tym samym miejscu. Układ jest czytelny zarówno przy pojedynczym słowie, jak i przy całym akapicie."
              points={[
                "Tłumaczenie bez otwierania nowej karty",
                "Trzy rozpoznawalne akcje w jednym pasku",
                "Panel dopasowany kolorystycznie do treści strony",
              ]}
            />
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <FeatureCopy
                eyebrow="Wyjaśnienia AI"
                title="Wyjaśnienie pojawia się nad sceną, nie zamiast niej"
                description="Panel zachowuje czytelną hierarchię: oryginalna wypowiedź, tłumaczenie i krótkie objaśnienie użytej konstrukcji. To wizualna warstwa nad materiałem, a nie osobny ekran do obsługi."
                points={[
                  "Jasny podział EN / PL / wyjaśnienie",
                  "Półprzezroczyste tło utrzymuje kontekst sceny",
                  "Treść AI ograniczona do najważniejszej informacji",
                ]}
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:-mr-20">
                <div className="space-y-2">
                  <span className="pl-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                    Widok bazowy
                  </span>
                  <ScreenshotFrame
                    src="/showcase/video-ai-closed.jpg"
                    alt="Odtwarzacz wideo z dwujęzycznym napisem przed wyświetleniem wyjaśnienia"
                    width={1800}
                    height={924}
                    label="Materiał źródłowy"
                    status="Kontekst"
                    sizes="(max-width: 640px) 100vw, 480px"
                  />
                </div>
                <div className="space-y-2 sm:translate-y-7">
                  <span className="pl-1 text-[10px] font-black uppercase tracking-[0.18em] text-indigo-300">
                    Z panelem wyjaśnienia
                  </span>
                  <ScreenshotFrame
                    src="/showcase/video-ai-open.jpg"
                    alt="Odtwarzacz wideo ze statycznym panelem wyjaśnienia AI nad sceną"
                    width={1800}
                    height={919}
                    label="Nakładka AI"
                    status="AI"
                    sizes="(max-width: 640px) 100vw, 480px"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <section className="space-y-7">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.08] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />
                  Powtórki z kontekstem
                </div>
              </div>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                Ten sam kadr wraca wtedy, kiedy uczysz się słowa
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                Panel powtórek łączy oryginalne zdanie z obrazem ze źródła. Duży obszar karty i spokojna hierarchia pomagają skupić się na jednym przykładzie naraz.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <ScreenshotFrame
                src="/showcase/review-panel.jpg"
                alt="Panel codziennej powtórki z angielskim zdaniem oraz kadrem z filmu"
                width={1800}
                height={1033}
                label="Panel rozszerzenia · powtórka dnia"
                status="1 / 1"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Zdanie", "Dokładny fragment, który pojawił się w materiale"],
                ["02", "Kadr", "Obraz przywołujący sytuację i emocję ze sceny"],
                ["03", "Odpowiedź", "Miejsce na przypomnienie znaczenia we własnym tempie"],
              ].map(([number, title, copy]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-indigo-300">{number}</span>
                    <span className="text-sm font-bold text-white">{title}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{copy}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
