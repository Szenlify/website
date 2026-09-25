# 📖 Lectoro AI — Kompletny Przewodnik po Wtyczce Chrome

> **Lectoro AI** to inteligentne, wieloplatformowe rozszerzenie do przeglądarki Chrome, które przekształca codzienne przeglądanie stron internetowych oraz oglądanie filmów i seriali (YouTube, Netflix, TED i inne) w zintegrowane, immersyjne środowisko do nauki języków obcych.

Niniejsza dokumentacja stanowi **wyczerpujące kompendium wiedzy**: opisuje każdy moduł, wszystkie skróty klawiszowe, przyciski w interfejsie, opcje konfiguracyjne, cennik i limity (Free vs Basic vs Pro) oraz pedagogiczne podstawy, dzięki którym wtyczka przyspiesza naukę języka.

---

## Spis Treści
1. [Jak Lectoro AI pomaga w nauce języków (Metodyka & Pedagogika)](#1-jak-lectoro-ai-pomaga-w-nauce-języków-metodyka--pedagogika)
2. [Obsługiwane Języki](#2-obsługiwane-języki)
3. [Obsługa Wideo (YouTube, Netflix, TED, HTML5)](#3-obsługa-wideo-youtube-netflix-ted-html5)
   - [Skróty klawiszowe wideo](#skróty-klawiszowe-wideo)
   - [Dwujęzyczne napisy i personalizacja](#dwujęzyczne-napisy-i-personalizacja)
   - [Tryb czytania napisów (Word Cloud — klawisz S)](#tryb-czytania-napisów-word-cloud--klawisz-s)
   - [Głębokie wyjaśnienia AI (Klawisz Enter / Q)](#głębokie-wyjaśnienia-ai-klawisz-enter--q)
   - [Tryb YouTube Focus Mode](#tryb-youtube-focus-mode)
   - [Fiszki ze zrzutem ekranu](#fiszki-ze-zrzutem-ekranu)
4. [Czytanie Tekstu i Artykułów w Internecie (Web Reading)](#4-czytanie-tekstu-i-artykułów-w-internecie-web-reading)
   - [Pływający pasek po zaznaczeniu tekstu](#pływający-pasek-po-zaznaczeniu-tekstu)
   - [Dymek tłumaczenia i słownik kontekstowy](#dymek-tłumaczenia-i-słownik-kontekstowy)
   - [Inteligentny lektor (Read Aloud) ze śledzeniem tekstu](#inteligentny-lektor-read-aloud-ze-śledzeniem-tekstu)
5. [Okno Rozszerzenia (Popup) — Pełny Przegląd Zakładek i Opcji](#5-okno-rozszerzenia-popup--pełny-przegląd-zakładek-i-opcji)
   - [Zakładka 1: Ustawienia (⚙️ Settings)](#zakładka-1-ustawienia-️-settings)
   - [Zakładka 2: Instrukcja (🚨 Guide)](#zakładka-2-instrukcja--guide)
   - [Zakładka 3: Moje Słowa (📚 Words) & Narzędzia Eksportu](#zakładka-3-moje-słowa--words--narzędzia-eksportu)
   - [Zakładka 4: Codzienny Trening SRS (🧠 Review)](#zakładka-4-codzienny-trening-srs--review)
6. [Generator Quizów AI i Sprawdzianów](#6-generator-quizów-ai-i-sprawdzianów)
7. [Plany Subskrypcyjne i Cennik (Free vs Basic vs Pro)](#7-plany-subskrypcyjne-i-cennik-free-vs-basic-vs-pro)
   - [Tabela porównawcza limitów i funkcji](#tabela-porównawcza-limitów-i-funkcji)
   - [Płatności BLIK (dla Polski) oraz Stripe](#płatności-blik-dla-polski-oraz-stripe)
8. [Architektura, Bezpieczeństwo i Prywatność](#8-architektura-bezpieczeństwo-i-prywatność)

---

## 1. Jak Lectoro AI pomaga w nauce języków (Metodyka & Pedagogika)

Lectoro AI nie jest zwykłym słownikiem ani automatycznym translatorem. Zostało zaprojektowane w oparciu o sprawdzone zasady glottodydaktyki i kognitywistyki:

1. **Zrozumiały wkład językowy (*Comprehensible Input* — teoria Stephena Krashena)**:
   Najszybciej uczymy się języka, gdy konsumujemy treści odrobinę powyżej naszego obecnego poziomu zaawansowania ($i+1$), ale wciąż dla nas zrozumiałe. Oglądanie autentycznych materiałów na YouTube czy Netflixie z podwójnymi napisami pozwala mózgowi łączyć dźwięk mowy z pisownią i znaczeniem bez poczucia frustracji.
2. **Eliminacja bariery tarcia (*Zero-Friction Lookup*)**:
   Tradycyjne sprawdzanie słowa w zewnętrznym słowniku wybija z rytmu i niszczy przyjemność z oglądania lub czytania. W Lectoro najechanie kursorem na słowo lub wciśnięcie jednego klawisza natychmiast ujawnia definicję, wymowę audio i przykłady bez opuszczania filmu.
3. **Kontekst sytuacyjny i kotwice pamięciowe (*Contextual Anchoring*)**:
   Słówka nie są zapamiętywane w izolacji. Fiszka tworzona z wideo zawiera:
   - Dokładne zdanie, w którym słowo wystąpiło,
   - Naturalne tłumaczenie całego zdania,
   - **Kadr ze sceny filmu (zrzut ekranu)**, który stanowi wizualną kotwicę pamięciową,
   - Nagranie natywnej wymowy audio.
4. **Algorytm powtórek w interwałach (*Spaced Repetition System — SRS / Anki SM-2*)**:
   Mózg zapomina informacje według krzywej Ebbinghausa. Lectoro kalkuluje optymalny moment na powtórkę każdego słówka (np. po 10 minutach, 1 dniu, 3 dniach, 7 dniach itd.), przenosząc wiedzę z pamięci krótkotrwałej do długotrwałej.
5. **Aktywna rekapitulacja (*Active Recall*)**:
   W trybie powtórek oraz w generatorze quizów użytkownik nie tylko pasywnie rozpoznaje słowa, lecz musi samodzielnie odtworzyć odpowiedź z pamięci (Direct Recall, Context Cloze, uzupełnianie luk w zdaniach).
6. **Sztuczna Inteligencja jako osobisty lektor gramatyki (AI Tutor)**:
   Gdy trafisz na trudny idiom, phrasal verb, slang lub skomplikowaną strukturę gramatyczną, wciśnięcie klawisza `Enter` uruchamia analizę AI, która w ułamku sekundy rozbija zdanie na części pierwsze, podaje poziom CEFR (A1–C2) i wyjaśnia niuanse w Twoim języku ojczystym.

---

## 2. Obsługiwane Języki

Lectoro AI posiada wbudowany rejestr **11 w pełni wspieranych języków** (z pełną lokalizacją interfejsu, słownikami, syntezą mowy i modelami AI):

| Kod | Język | Nazwa natywna | Flaga |
|:---:|:---|:---|:---:|
| `en` | Angielski (*English*) | English | 🇬🇧 |
| `pl` | Polski | Polski | 🇵🇱 |
| `de` | Niemiecki (*German*) | Deutsch | 🇩🇪 |
| `es` | Hiszpański (*Spanish*) | Español | 🇪🇸 |
| `fr` | Francuski (*French*) | Français | 🇫🇷 |
| `it` | Włoski (*Italian*) | Italiano | 🇮🇹 |
| `ja` | Japoński (*Japanese*) | 日本語 | 🇯🇵 |
| `ko` | Koreański (*Korean*) | 한국어 | 🇰🇷 |
| `nl` | Niderlandzki (*Dutch*) | Nederlands | 🇳🇱 |
| `cs` | Czeski (*Czech*) | Čeština | 🇨🇿 |
| `pt` | Portugalski (*Portuguese*) | Português | 🇵🇹 |

W ustawieniach użytkownik niezależnie definiuje:
- **Język nauki (*Learning Language*)** — język oglądanego wideo lub czytanego artykułu.
- **Język ojczysty (*Native Language*)** — język tłumaczeń, wyjaśnień AI i całego interfejsu wtyczki.
- **Przycisk ⇄ (Swap)** pozwala na błyskawiczne odwrócenie kierunku nauki jednym kliknięciem.

---

## 3. Obsługa Wideo (YouTube, Netflix, TED, HTML5)

Lectoro AI integruje się bezpośrednio z odtwarzaczami wideo za pomocą dedykowanych adapterów:
- **YouTube Adapter & Player Bridge**: przechwytuje ścieżki TimedText, obsługuje napisy oficjalne oraz automatyczne (ASR), scala krótkie kwestie dialogowe,
- **Netflix Adapter & Player Bridge**: wstrzykiwany w główny kontekst strony (`MAIN world`), komunikuje się z wewnętrznym API odtwarzacza Netflix (`videoPlayer`), ładuje oficjalne manifesty TimedText, zapobiega ucinaniu pierwszych sylab dźwięku dzięki buforowi wyprzedzenia (125 ms) i gwarantuje stabilność napisów przy przewijaniu,
- **TED Talks Adapter**: integracja z kontenerami transkrypcji TED,
- **Generic Video Adapter**: uniwersalna obsługa dowolnego odtwarzacza HTML5, Video.js, Plyr, JWPlayer.

### Skróty klawiszowe wideo

Sterowanie klawiaturą zostało ujednolicone dla wszystkich platform:

| Klawisz | Alternatywa | Działanie |
|:---|:---|:---|
| **`W`** | **`↑` (Strzałka w górę)** | **Odtwarzaj / Pauza (*Play / Pause toggle*)** — zatrzymuje lub wznawia wideo. |
| **`A`** | **`←` (Strzałka w lewo)** | **Poprzedni dialog LUB powtórzenie bieżącego** — jeśli minęło ponad 40% czasu trwania bieżącego dialogu (lub min. 1.1 s), klawisz odnawia dialog od początku; jeśli jesteś na początku kwestii, cofa do poprzedniej kwestii. |
| **`D`** | **`→` (Strzałka w prawo)** | **Następny dialog** — natychmiast przeskakuje do następnej kwestii dialogowej (lub o 5 sekund w przód przy braku ścieżki dialogowej). |
| **`S`** | **`↓` (Strzałka w dół)** | **Tryb czytania (Word Cloud)** — pauzuje wideo, wyświetla chmurę tłumaczeń nad każdym słowem i czyta całe zdanie na głos. |
| **`Q`** | **`Enter` / `NumpadEnter`** | **Wyjaśnienie AI (AI Explanation)** — pauzuje wideo i otwiera panel głębokiej analizy językowej AI. |
| **`Z`** | **`V` / `Home` / `PageUp`** | **Zapisz zdanie do bazy SRS** — błyskawicznie zapisuje bieżącą kwestię jako fiszkę ze zrzutem ekranu z wideo. |
| **`[`** | **`{`** | **Zmniejsz prędkość odtwarzania** o 0.05× (np. z 1.00× na 0.95×) z widocznym wskaźnikiem na ekranie. |
| **`]`** | **`}`** | **Zwiększ prędkość odtwarzania** o 0.05× (np. do 1.05×, aż do 2.00×). |
| **`Spacja`** | *Spacebar* | **Zamknięcie dymków / wznowienie odtwarzania**. |
| **`Escape`** | — | **Zamknięcie dymków AI / powrót do odtwarzania**. |

---

### Dwujęzyczne napisy i personalizacja

Lectoro wyświetla własną, estetyczną warstwę napisów (*Custom Subtitles Layer*):
- **Oryginalna linia dialogowa** w języku nauki (np. angielskim),
- **Wtórna linia dialogowa** z precyzyjnym tłumaczeniem w języku ojczystym (np. polskim),
- **Inteligentne łączenie linii**: bardzo krótkie, urywane kwestie dialogowe są automatycznie łączone w logiczne zdania, co ułatwia czytanie,
- **Regulacja pozycji (Drag & Drop)**: po najechaniu na napisy pojawia się uchwyt (*drag handle*), którym można swobodnie przesunąć pasek napisów w pionie (np. wyżej, by nie zasłaniał elementów filmu),
- **Płynna zmiana wielkości**: w ustawieniach dostępne są 3 rozmiary czcionki: *Small*, *Medium*, *Large*,
- **Przezroczystość tła**: suwak od 0% (przezroczyste tło z cieniem tekstu) do 100% (pełne czarne tło dla maksymalnej czytelności na jasnych scenach).

---

### Tryb czytania napisów (Word Cloud — klawisz S)

Naciśnięcie klawisza **`S`** lub **`↓`** podczas oglądania wideo aktywuje **Word Cloud Mode**:
1. Odtwarzacz natychmiast zatrzymuje się na bieżącej klatce.
2. Nad każdym wyrazem w napisie pojawia się estetyczna chmurka z tłumaczeniem słownikowym.
3. System automatycznie wykrywa wielowyrazowe frazy i idiomy (*Phrase Detector*), łącząc je w jedną całość zamiast tłumaczyć dosłownie słowo po słowie.
4. Całe zdanie jest odczytywane przez syntezator mowy w języku nauki.
5. **Nawigacja w trybie S**:
   - Możesz użyć strzałek **`←` / `→`** lub klawiszy **`A` / `D`**, aby podświetlać kolejne słowa w zdaniu.
   - Wciśnięcie klawisza **`Z`** zapisuje aktualnie zaznaczone słowo do Twojego słownika.
   - Wciśnięcie klawisza **`X`** generuje zwięzłe zdanie przykładowe z tym słowem stworzone przez AI i zapisuje je do bazy fiszek.
   - Ponowne wciśnięcie **`S`** lub **`Spacji`** zamyka chmury i wznawia odtwarzanie.

---

### Głębokie wyjaśnienia AI (Klawisz Enter / Q)

Naciśnięcie klawisza **`Enter`** lub **`Q`** otwiera nakładkę **AI Sentence Explanation**:
- **Ocena poziomu CEFR**: model AI klasyfikuje trudność zdania (od A1 do C2).
- **Kontekstowe tłumaczenie**: całościowy, naturalny przekład z zachowaniem intencji wypowiedzi.
- **Ekstrakcja kluczowych pojęć (od 0 do 4 pozycji)**:
  - Trudne słownictwo (*vocabulary*),
  - Idiomy (*idioms*) oznaczone specjalną plakietką,
  - Czasowniki frazowe (*phrasal verbs*),
  - Slang i kolokwializmy.
- **Wyjaśnienie niuansów gramatycznych**: AI tłumaczy, dlaczego użyto danej konstrukcji lub czasu gramatycznego.
- **Nawigacja w panelu AI**:
  - Klawisze **`A` / `D`** lub **`←` / `→`**: przełączanie między wyodrębnionymi pojęciami,
  - Klawisz **`Z`**: zapisanie aktualnie wybranego pojęcia do powtórek SRS,
  - Klawisz **`X`**: zapisanie całego zdania z wyjaśnieniem AI,
  - Klawisze **`W` / `Escape`**: zamknięcie panelu i powrót do filmu.

---

### Tryb YouTube Focus Mode

Opcja stworzona specjalnie dla materiałów edukacyjnych, wywiadów i podcastów na YouTube:
- Działa na automatycznych napisach YouTube (*Auto-generated captions*).
- **Dynamiczne podświetlanie**: gdy lektor mówi, pojedyncze wypowiadane w danym ułamku sekundy słowo jest dynamicznie podświetlane wybranym kolorem w czasie rzeczywistym.
- **Wybór koloru**: w ustawieniach można wybrać gotowy odcień (*Indigo, Sky Blue, Emerald, Amber, Rose, Violet*) lub wskazać dowolny własny kolor za pomocą próbnika (*Color Picker*).

---

### Fiszki ze zrzutem ekranu

Klawisz `Z` zapisuje oryginalną treść bieżącego napisu z interpunkcją, tłumaczeniem tej samej wypowiedzi i zrzutem klatki wideo. Tłumaczenie ma oddawać sens 1:1 naturalnym językiem, bez skracania, dopisywania kontekstu ani tworzenia nowego zdania.

---

## 4. Czytanie Tekstu i Artykułów w Internecie (Web Reading)

Lectoro AI działa na **dowolnej stronie internetowej** — blogach, portalach informacyjnych (BBC, CNN, El País, Le Figaro, Der Spiegel), dokumentacji technicznej czy forach dyskusyjnych.

### Pływający pasek po zaznaczeniu tekstu
Gdy zaznaczysz kursorem myszy dowolne słowo lub całe zdanie na stronie, obok kursora pojawia się minimalistyczny pływający pasek z dwoma przyciskami:
1. **Przycisk Tłumaczenia (ikona języków)**: tłumaczy zaznaczony fragment i otwiera dymek ze słownikiem.
2. **Przycisk Czytania na głos (ikona głośnika — Read Aloud)**: rozpoczyna odczytywanie tekstu głosem lektora.

---

### Dymek tłumaczenia i słownik kontekstowy
Po kliknięciu ikony tłumaczenia pojawia się bogate okno popover (*Tooltip*):
- **Nagłówek par językowych**: np. `EN → PL`.
- **Hasło oryginalne** z dedykowanym przyciskiem odsłuchu audio.
- **Tłumaczenie** z dedykowanym przyciskiem odsłuchu audio w języku ojczystym.
- **Szczegóły słownikowe** (dla pojedynczych słów):
  - Podstawowa definicja i część mowy (rzeczownik, czasownik itp.),
  - Synonimy i bliskoznaczne określenia,
  - Przykłady użycia w autentycznych zdaniach (każde zdanie przykładowe posiada własną ikonę zapisu 💾 do bazy fiszek).
- **Stopka akcji (Save Footer)**:
  - **Przycisk "Zapisz słowo" (skrót `Z`)**: dodaje hasło do bazy powtórek SRS,
  - **Przycisk "Zdanie AI" (skrót `X`)**: generuje nowe zdanie przykładowe przez sztuczną inteligencję i dodaje je do bazy.

---

### Inteligentny lektor (Read Aloud) ze śledzeniem tekstu
Funkcja czytania artykułów na głos posiada mechanizm **zsynchronizowanego podświetlania**:
- Długi zaznaczony artykuł jest dzielony na naturalne zdania i frazy.
- W trakcie czytania fragment aktualnie wymawiany przez syntezator mowy jest **na bieżąco podświetlany w tekście strony**.
- Ponowne kliknięcie ikony głośnika natychmiast zatrzymuje czytanie.

---

## 5. Okno Rozszerzenia (Popup) — Pełny Przegląd Zakładek i Opcji

Kliknięcie ikony Lectoro AI na pasku rozszerzeń przeglądarki otwiera główne menu podzielone na 4 zakładki:

```
┌──────────────────────────────────────────────────────────────┐
│  [⚙️ Settings]    [🚨 Guide]    [📚 Words]    [🧠 Review 12] │
└──────────────────────────────────────────────────────────────┘
```

---

### Zakładka 1: Ustawienia (⚙️ Settings)

Zawiera pełną konfigurację konta, języków, sztucznej inteligencji, napisów i syntezatora mowy:

#### 1. Cloud Sync (Synchronizacja w chmurze)
- **Logowanie Google / Firebase**: możliwość zalogowania się jednym kliknięciem kontem Google.
- **Zalety logowania**: automatyczna synchronizacja wszystkich zapisanych słówek, historii powtórek i ustawień pomiędzy wieloma komputerami oraz dostęp do powtórek na smartfonie.
- **Status synchronizacji**: pokazuje stan kolejki zmian, datę ostatniej synchronizacji oraz przycisk wylogowania lub usunięcia konta.

#### 2. Wybór Języków (Language Direction)
- **Learning Language**: lista rozwijana z 11 językami do nauki.
- **Przycisk Swap (⇄)**: natychmiastowa zamiana języka nauki z językiem ojczystym.
- **Native Language**: lista rozwijana z językiem ojczystym użytkownika.

#### 3. Stan Kredytów AI i Wykorzystanie (AI Usage Overview)
- **Licznik Kredytów AI (AI Explanations)**:
  - Wizualny pasek postępu pokazujący liczbę wykorzystanych zapytań w danym miesiącu (np. `4 / 15` w planie Free, `120 / 800` w Basic lub `45 / ∞` w Pro).
  - Informacja o dacie comiesięcznego odnowienia puli kredytów.
- **Licznik Znaków AI TTS (Natural Voices)**:
  - Pasek postępu wykorzystania naturalnej syntezy mowy AI TTS (dostępnej w planach Basic i Pro).

#### 4. Subskrypcje i Plany (Subscription Plans)
- Przejrzysta karuzela prezentująca plany: **Free**, **Basic** oraz **Pro**.
- Przycisk uruchomienia 3-dniowego darmowego okresu próbnego ($0).
- Bezpieczne płatności kartą przez Stripe oraz **błyskawiczne płatności BLIK (30 dni bez zobowiązań)**.
- Przycisk przejścia do Portalu Klienta Stripe (zarządzanie subskrypcją, zmiana karty, pobieranie faktur).

#### 5. Ustawienia Napisów (Subtitles Section)
- **Subtitle font size**: trzy przyciski rozmiaru:
  - `A` (*Small*) — współczynnik 0.016 szerokości ekranu,
  - `A` (*Medium*) — współczynnik 0.020 (domyślny, optymalny),
  - `A` (*Large*) — współczynnik 0.027 (duże, wyraźne napisy).
- **Subtitle background opacity**: suwak od 0% do 100% regulujący stopień zaciemnienia tła pod napisami.
- **YouTube Focus Mode**:
  - Przełącznik aktywacji trybu śledzenia słów na YouTube,
  - Paleta gotowych kolorów podświetlenia (*Indigo, Sky Blue, Emerald, Amber, Rose, Violet*),
  - Natywny próbnik kolorów (*Custom Color Picker*) do wyboru dowolnego koloru HEX.

#### 6. Mowa i Lektor (Speech & Voice — TTS)
- **Speech rate**: suwak regulacji tempa mowy lektora od 0.3× (bardzo wolno) do 2.0× (bardzo szybko). Domyślna wartość to komfortowe 0.95× – 1.10×.
- **TTS Reader volume**: suwak regulacji głośności syntezatora od 0% do 100%.

---

### Zakładka 2: Instrukcja (🚨 Guide)
Podręczny samouczek wbudowany bezpośrednio w okno wtyczki:
- Przegląd wszystkich skrótów klawiszowych dla wideo,
- 3 proste kroki czytania i tłumaczenia stron internetowych,
- Wskazówki dotyczące codziennych powtórek SRS,
- Bezpośredni odnośnik do aplikacji webowej na telefony: `https://lectoroai.vercel.app/dashboard/reviews`.

---

### Zakładka 3: Moje Słowa (📚 Words) & Narzędzia Eksportu

Panel zarządzania całą bazą zapisanego słownictwa:

#### Filtry i Wyszukiwarka
- **Przyciski filtrów**:
  - `All` — wszystkie zapisane pozycje,
  - `Today` — słówka dodane dzisiaj,
  - `Week` — słówka z ostatnich 7 dni,
  - `Month` — słówka z bieżącego miesiąca,
  - `🆕 Unsynced` — pozycje jeszcze niepobrane lub oczekujące na eksport.
- **Wyszukiwarka na żywo**: przeszukuje jednocześnie oryginalne hasła, ich tłumaczenia oraz całe zdania kontekstowe.
- **Licznik pozycji**: informuje o liczbie widocznych i wszystkich słówek (np. *„14 z 120 słówek”*).

#### Lista Słówek i Operacje na Kartach
Każdy element na liście zawiera:
- Hasło oryginalne i jego tłumaczenie,
- Pełne zdanie kontekstowe z podświetlonym słowem kluczowym (*Cloze format*),
- Tłumaczenie zdania kontekstowego,
- Datę zapisu oraz parę językową (np. `EN → PL`),
- **Przycisk Edycji (✏️)**: otwiera formularz edycyjny, pozwalający zmienić pisownię, poprawić tłumaczenie lub zmodyfikować zdanie przykładowe,
- **Przycisk Usuwania (✕)**: usuwa dane słówko z bazy.

#### Dolny Pasek Narzędziowy Eksportu i Quizów
- **Generator Quizu AI**:
  - Wybór liczby pytań: **5, 10, 15 lub 20 słów**,
  - Wybór źródła słówek: **Recent** (najnowsze) lub **Random** (losowe z całej bazy),
  - Przycisk **✨ AI Quiz** z plakietką limitu darmowych generacji (np. `0/3`).
- **Eksport do Anki (📋 Anki)**:
  - Generuje kompletną paczkę `.zip` gotową do zaimportowania w programie Anki na komputerze lub telefonie.
  - Karty są przygotowane w czystym, minimalistycznym szablonie Basic (oryginał na froncie, znaczenie + zdanie kontekstowe na odwrocie).
  - Automatycznie dołącza **zrzuty ekranu zoptymalizowane pod telefony (format JPEG)**.
  - Dołącza pliki audio wymowy pobrane z pamięci podręcznej.
- **Eksport do Excela (📊 Excel)**:
  - Pobiera plik arkusza `.csv` kodowany w UTF-8 ze specjalnym znacznikiem BOM (brak problemów z polskimi znakami w programie Microsoft Excel).
  - Zawiera kolumny: słowo, tłumaczenie, zdanie oryginalne, zdanie przetłumaczone, zdanie AI, tłumaczenie AI, język źródłowy, język docelowy, datę i adres zrzutu ekranu.
- **Przycisk Usuń Widoczne (🗑)**: pozwala masowo wyczyścić aktualnie odfiltrowane pozycje.

---

### Zakładka 4: Codzienny Trening SRS (🧠 Review)

Wbudowany system powtórek fiszek oparty o algorytm **SuperMemo SM-2**:

#### Nagłówek i Ustawienia Powtórek
- **Licznik kart do powtórki**: czerwona plakietka na ikonie zakładki informuje o liczbie słówek wymagających powtórki na dany dzień.
- **Pasek postępu**: wizualizuje procent ukończenia dzisiejszej sesji.
- **Przycisk zmiany kierunku (np. `EN → PL` lub `PL → EN`)**:
  - *Tryb normalny*: widzisz słowo w języku obcym i odgadujesz znaczenie w języku ojczystym.
  - *Tryb odwrócony*: widzisz słowo w języku ojczystym i musisz przypomnieć sobie formę w języku obcym.
- **Wybór głosu w powtórkach (Review Voice Picker)**:
  - **Głos systemowy (System voice)**: szybki, darmowy i nielimitowany syntezator przeglądarki,
  - **AI TTS (Premium)**: ultra-realistyczne głosy sztucznej inteligencji:
    - **Sulafat** — ciepły, naturalny głos z perfekcyjną intonacją,
    - **Algieba** — wyrazisty, elegancki głos lektorski.
  - System posiada inteligentny mechanizm wyprzedzającego pobierania dźwięku (*N+1 prefetching*), dzięki czemu nagranie kolejnej karty ładuje się w tle zanim jeszcze na nią przejdziesz.

#### Interaktywna Fiszka i Ocenianie
Fiszka naśladuje fizyczną kartę z trójwymiarową animacją obrotu:
1. **Strona pytania**:
   - Słowo kluczowe,
   - Zdanie kontekstowe z wyróżnieniem wyrazu,
   - Zrzut ekranu z filmu stanowiący wizualną kotwicę pamięciową,
   - **Przycisk odsłuchu standardowego** (skrót klawiszowy **`W`** lub **`↑`**),
   - **Przycisk odsłuchu w zwolnionym tempie (0.75× — ikona żółwia)**: pozwala dokładnie usłyszeć każdą głoskę i akcent w trudnych wyrazach.
2. **Odwracanie karty**:
   - Kliknięcie przycisku "Pokaż odpowiedź" lub wciśnięcie klawisza **`S`** / **`↓`**.
3. **Ocena pamięciowa**:
   - **„Nie wiem” / Don't know (klawisz `A` lub `←`)**: karta otrzymuje ocenę 1. Fiszka przesuwa się w lewo i wróci w tej samej sesji za kilka minut.
   - **„Znam” / Know (klawisz `D` lub `→`)**: karta otrzymuje ocenę 2. Fiszka przesuwa się w prawo, a algorytm SM-2 wyznacza kolejną powtórkę w przyszłości (np. za 1 dzień, 3 dni, 7 dni, 21 dni itd.).
4. **Edycja i kasowanie w trakcie sesji**:
   - W dowolnym momencie sesji możesz kliknąć **✏️ Edytuj**, by poprawić treść karty, lub **🗑 Usuń**, by trwale usunąć słówko z powtórek.
5. **Dostęp Mobilny i Webowy**:
   - Baner na górze powtórek oraz ekran podsumowania sesji zawierają bezpośredni link do platformy **lectoroai.com**. Dzięki synchronizacji Google/Firebase możesz kontynuować naukę na telefonie w drodze do pracy lub szkoły bez instalowania aplikacji mobilnej z App Store / Google Play.

---

## 6. Generator Quizów AI i Sprawdzianów

Moduł quizów Lectoro to zaawansowany silnik generowania testów językowych z Twoich własnych słówek:

- **Dwa tryby wyjściowe**:
  1. **Interaktywny Quiz w przeglądarce**: uruchamiany w bezpiecznym środowisku sandbox (`quiz-runner.html`).
  2. **Sprawdzian szkolny do druku (PDF)**: profesjonalny arkusz testowy z miejscem na imię, klasę, datę, punktacją zadań, skalą ocen (od 1 do 6 / od F do A+) oraz kluczem odpowiedzi dla nauczyciela lub do samodzielnego sprawdzenia.
- **Różnorodne typy zadań generowane przez model AI**:
  - **Pytania wielokrotnego wyboru (*Multiple Choice*)**: wybór prawidłowego znaczenia spośród 4 wariantów.
  - **Aktywne przypominanie (*Direct Recall*)**: wpisywanie poprawnego słowa z pamięci w pole tekstowe (najwyżej punktowane).
  - **Uzupełnianie luk w kontekście (*Context Recall / Cloze*)**: wpisanie brakującego słowa w oryginalnym zdaniu z filmu.
  - **Łączenie par (*Matching pairs*)**: dopasowywanie słówek do ich definicji.
  - **Prawda czy Fałsz (*True / False*)**: ocena poprawności tłumaczenia zdania.
  - **Poprawna forma słowa (*Correct Form*)**: odmiana wyrazu do odpowiedniego kontekstu gramatycznego.
- **Inteligentne sprawdzanie z tolerancją na literówki (*Levenshtein Distance*)**:
  Algorytm nie odrzuca odpowiedzi z powodu drobnej literówki — analizuje odległość edycyjną i przyznaje punkty, informując użytkownika o drobnym błędzie w pisowni.
- **Dźwięk wymowy w każdym pytaniu**: każde pytanie i opcja odpowiedzi mogą zostać odsłuchane na głos.
- **Kolejka powtórki błędów**: słowa, w których popełniono błąd, pojawiają się ponownie na końcu quizu, aby utrwalić poprawną formę.
- **Wskaźnik opanowania materiału (*Mastery Tracking*)**: podsumowanie dzieli słówka na: *Opanowane w pełni (Mastered)*, *Prawie opanowane (Almost)*, *W trakcie nauki (Learning)* oraz *Wymagające pracy (Weak)*.
- **Działa offline**: wygenerowany plik HTML quizu można pobrać na dysk i uruchomić w dowolnym momencie bez połączenia z internetem.

---

## 7. Plany Subskrypcyjne i Cennik (Free vs Basic vs Pro)

Lectoro AI oferuje przejrzysty model rozliczeń: bogaty, w pełni użyteczny plan darmowy oraz pakiety płatne znoszące limity sztucznej inteligencji i odblokowujące ultra-naturalne głosy.

### Tabela porównawcza limitów i funkcji

| Funkcja / Limit | Plan FREE | Plan BASIC | Plan PRO |
|:---|:---:|:---:|:---:|
| **Cena miesięczna (Subskrypcja Stripe)** | **$0 / mc** | **$7.99 / mc** | **$19.99 / mc** |
| **Darmowy okres próbny (Trial)** | — | **3 dni za $0** | **3 dni za $0** |
| **Płatność jednorazowa BLIK (Polska)** | — | **29,99 zł / 30 dni** | **79,99 zł / 30 dni** |
| **Zoptymalizowany dla** | Początkujących i okazjonalnych widzów | Aktywnych uczniów języków obcych | Pasjonatów, poliglótów i zaawansowanych |
| **Wyjaśnienia AI (AI Explanations)** | **15 na miesiąc** | **800 na miesiąc** | **BEZ LIMITU (∞)** |
| **Maksymalna liczba kart w SRS** | **25 słówek** | **2 500 słówek** | **BEZ LIMITU (∞)** |
| **Eksport do Anki (.zip z audio i foto)** | **3 eksporty / mc** | **BEZ LIMITU (∞)** | **BEZ LIMITU (∞)** |
| **Eksport do Excela (.csv)** | **3 eksporty / mc** | **BEZ LIMITU (∞)** | **BEZ LIMITU (∞)** |
| **Generowanie Quizów AI** | **3 quizy / mc** | **BEZ LIMITU (∞)** *(max 10/h)* | **BEZ LIMITU (∞)** *(max 10/h)* |
| **Tłumaczenia napisów i stron WWW** | **Nielimitowane** | **Nielimitowane** | **Nielimitowane** |
| **Podwójne napisy (YouTube, Netflix itp.)** | **Tak** | **Tak** | **Tak** |
| **Tryb czytania (Word Cloud - klawisz S)** | **Tak** | **Tak** | **Tak** |
| **YouTube Focus Mode (śledzenie słów)** | **Tak** | **Tak** | **Tak** |
| **Głosy systemowe przeglądarki / Google** | **Tak (nielimitowane)** | **Tak (nielimitowane)** | **Tak (nielimitowane)** |
| **AI TTS Natural Voices (Sulafat & Algieba)** | ❌ *Wyłączone* | **10 000 znaków / mc** *(do 500 zn./zapytanie)* | **100 000 znaków / mc** *(do 1000 zn./zapytanie)* |
| **Synchronizacja w chmurze (Google/Firebase)** | **Tak** | **Tak** | **Tak** |
| **Dostęp do platformy Web & Mobile** | **Tak** | **Tak** | **Tak** |

---

### Płatności BLIK (dla Polski) oraz Stripe

Dla maksymalnej wygody użytkowników przygotowano dwie metody płatności:

1. **Subskrypcja Stripe (Karta płatnicza / debetowa / Apple Pay / Google Pay)**:
   - Dostępna na całym świecie w walucie USD ($7.99 lub $19.99).
   - Zawiera **3-dniowy darmowy okres próbny ($0)** — pierwsze obciążenie następuje dopiero po 3 dniach, jeśli subskrypcja nie zostanie wcześniej anulowana.
   - Automatyczne comiesięczne odnawianie.
   - W każdej chwili można zarządzać planem lub anulować subskrypcję jednym kliknięciem przez oficjalny Portal Klienta Stripe.
2. **Jednorazowa Płatność BLIK (dostępna w polskim interfejsie)**:
   - Stworzona z myślą o użytkownikach w Polsce, którzy nie chcą podpinać karty kredytowej ani włączać subskrypcji cyklicznej.
   - **Plan BASIC**: **29,99 zł** za pełny 30-dniowy dostęp.
   - **Plan PRO**: **79,99 zł** za pełny 30-dniowy dostęp.
   - **Brak automatycznego odnawiania**: po upływie 30 dni konto wraca do planu Free, chyba że użytkownik zdecyduje się kliknąć przycisk „Przedłuż BLIKIEM”.

---

## 8. Architektura, Bezpieczeństwo i Prywatność

Lectoro AI spełnia rygorystyczne wytyczne bezpieczeństwa Google dla rozszerzeń **Manifest V3**:
- **Zasada minimalnych uprawnień (*Principle of Least Privilege*)**:
  - `storage` — lokalny zapis słówek, historii powtórek i konfiguracji wyglądu napisów,
  - `alarms` — planowanie dyskretnych codziennych przypomnień o powtórkach SRS,
  - `identity` — opcjonalne logowanie przez konto Google,
  - `scripting` oraz `activeTab` — bezpieczne wstrzykiwanie nakładki napisów do ramek odtwarzaczy i pobieranie wykadrowanego zrzutu klatki wideo na potrzeby fiszki.
- **Prywatność danych**:
  - Brak jakichkolwiek trackerów analitycznych, reklam i skryptów śledzących zachowanie użytkownika.
  - Historia przeglądania stron **nigdy** nie jest zapisywana ani przesyłana na serwery. Tekst ze strony jest przetwarzany wyłącznie na żądanie użytkownika w momencie zaznaczenia fragmentu.
  - Zapisane słówka i fiszki są domyślnie przechowywane lokalnie na urządzeniu użytkownika (`chrome.storage.local`). W przypadku zalogowania kontem Google dane są synchronizowane z prywatnym, szyfrowanym rekordem w Google Cloud Firestore.
- **Szybkość i niezawodność (Cloudflare R2 CDN)**:
  Pakiety słowników frazowych oraz pamięć podręczna plików audio są serwowane za pośrednictwem globalnej sieci CDN Cloudflare R2, co gwarantuje natychmiastowe ładowanie haseł w ułamku sekundy bez obciążania łącza.

---

*Lectoro AI — Oglądaj ulubione filmy, czytaj ciekawe artykuły i ucz się języka naturalnie!*
