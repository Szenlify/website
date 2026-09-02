import type { Dict } from "./types";

export const ko: Dict = {
    locale: "ko",

    nav: {
        features: "기능",
        liveDemo: "라이브 데모",
        howItWorks: "작동 방식",
        comparison: "비교",
        pricing: "요금제",
        faq: "자주 묻는 질문",
        addToChrome: "Chrome에 추가",
        addToChromeFree: "Chrome에 무료로 추가",
        privacyPolicy: "개인정보 처리방침",
        termsOfService: "이용약관",
    },

    lang: {
        en: "English",
        pl: "Polski",
        de: "Deutsch",
        es: "Español",
        ja: "日本語",
        ko: "한국어",
        fr: "Français",
        "pt-BR": "Português (Brasil)",
        "es-MX": "Español (México)",
        hi: "हिन्दी",
        selectLanguage: "언어",
    },

    hero: {
        badge: "언어 학습용 Chrome 확장 프로그램",
        title: "이중 자막으로 언어를 배우세요",
        titleHighlight: "Netflix & YouTube에서",
        subtitle:
            "이중 자막의 단어를 클릭하면 번역, 발음, 문맥 기반 AI 설명을 즉시 확인할 수 있습니다. 영상 장면 스냅샷과 함께 어휘를 저장하고, 간격 반복 플래시카드로 오래 기억하세요.",
        installCta: "Chrome에 설치",
        trialBadge: "3일 무료",
        demoCta: "인터랙티브 데모 체험",
        noCard: "무료 플랜은 신용카드가 필요 없습니다",
        builtFor: "Google Chrome 전용",
    },

    platforms: {
        label: "좋아하는 영상 및 웹 플랫폼과 완벽하게 연동됩니다",
        anyWeb: "모든 웹 기사",
    },

    features: {
        tag: "완성형 학습 생태계",
        title: "몰입부터 복습까지, 하나의 언어 학습 확장 프로그램",
        subtitle:
            "클릭 가능한 자막, 문맥형 AI 도움말, 간격 반복 플래시카드로 실제 영상과 웹페이지를 학습 자료로 바꾸세요.",
        f1: {
            title: "이중 자막 & 장면 캡처",
            desc: "원어와 모국어 번역을 나란히 표시합니다. 모르는 단어를 클릭하면 영상이 자동 일시정지되고, 플래시카드용 고해상도 장면 스냅샷이 저장됩니다.",
            b1: "YouTube & Netflix",
            b2: "클릭 즉시 일시정지",
            b3: "스냅샷",
        },
        f2: {
            title: "페이지 내 웹 번역기",
            desc: "기술 문서, Reddit, 업계 뉴스를 읽는 중이신가요? 텍스트를 선택하면 플로팅 도크에서 문맥 기반 정의와 문법 분석을 즉시 확인할 수 있습니다.",
            b1: "플로팅 툴바",
            b2: "다단계 캐시",
            b3: "구문 감지",
        },
        f3: {
            title: "AI 튜터",
            desc: "딱딱한 사전식 정의는 잊으세요. AI가 슬랭, 문화적 맥락, 구동사를 개인 원어민 튜터처럼 날카로운 한 문장으로 설명합니다.",
            b1: "AI",
            b2: "한 문장 뉘앙스 설명",
            b3: "문맥 예시",
        },
        f4: {
            badge: "SuperMemo 알고리즘",
            title: "벼락치기 없이 단어를 장기기억으로",
            desc: "Lectoro가 간격 반복으로 어휘 복습 일정을 자동화해, 모든 단어를 똑같이 반복하지 않고 더 연습이 필요한 단어에 집중하게 도와줍니다.",
            l1: "확장 프로그램 팝업에서 하루 5분 복습",
            l2: "브라우저 바에서 실시간 대기 복습 배지 확인",
            l3: "영화 장면 스냅샷과 연결된 시각형 플래시카드",
        },
        f5: {
            title: "ElevenLabs 뉴럴 보이스 TTS",
            desc: "세계적 수준의 ElevenLabs 음성 합성 모델(Roger, Sarah, Charlie)과 초고속 로컬 오디오 캐시로 실제에 가까운 억양과 리듬을 익히세요.",
            b1: "ElevenLabs Flash v2.5",
            b2: "생생한 억양",
            b3: "오디오 캐시",
        },
        f6: {
            title: "AI 퀴즈 & 원클릭 Anki 내보내기",
            desc: "AI가 생성한 6가지 동적 퀴즈로 실력을 점검하세요. 전체 어휘 컬렉션을 Anki(.txt), Excel/CSV, 인쇄용 PDF 학습지로 몇 초 만에 내보낼 수 있습니다.",
            b1: "Anki .txt 내보내기",
            b2: "인터랙티브 퀴즈",
            b3: "PDF 출력물",
        },
    },

    showcase: {
        tag: "비주얼 경험",
        title: "Lectoro AI가 실제로 작동하는 모습을 확인하세요",
        previous: "이전 스크린샷",
        next: "다음 스크린샷",
        slideLabel: "스크린샷",
        s1: {
            alt: "TED 영상에서 클릭 가능한 자막과 번역 패널을 보여주는 Lectoro AI",
            title: "클릭 가능한 영상 자막으로 학습",
        },
        s2: {
            alt: "X에서 선택한 텍스트와 자막을 번역하는 Lectoro AI Chrome 확장",
            title: "어떤 웹페이지에서도 텍스트 번역",
        },
        s3: {
            alt: "YouTube와 Netflix 자막, 키보드 단축키, 플래시카드 복습을 위한 Lectoro AI 설정 가이드",
            title: "영상 학습과 복습 워크플로",
        },
        s4: {
            alt: "YouTube에서 영어-독일어 자막 번역과 문맥형 AI 설명을 보여주는 Lectoro AI",
            title: "AI가 문맥 속 표현을 설명",
        },
        s5: {
            alt: "Netflix 장면 스냅샷이 저장된 Lectoro AI 간격 반복 플래시카드",
            title: "SRS로 영상 플래시카드 복습",
        },
        s6: {
            alt: "X 게시물에서 선택 단어를 번역하고 읽어주는 Lectoro AI 툴바",
            title: "번역하고, 듣고, AI에게 질문",
        },
        s7: {
            alt: "영상 위에서 영어-프랑스어 번역과 관용구 설명을 제공하는 Lectoro AI",
            title: "시청 중 관용구까지 이해",
        },
        s8: {
            alt: "Plex 스트리밍 카탈로그 옆에 열린 Lectoro AI 일일 플래시카드 복습",
            title: "Plex에서 어휘 학습 및 복습",
        },
    },

    comparison: {
        tag: "기능 직접 비교",
        title: "언어 학습 확장 프로그램과 앱 비교",
        titleHighlight: "기능별로",
        subtitle:
            "Lectoro AI를 영상 몰입형 학습과 언어 학습의 다른 인기 방식과 비교해 보세요.",
        disclaimer:
            "공개된 제품 기능 및 요금 정보를 기준으로 작성되었으며, 제공 여부와 가격은 달라질 수 있습니다.",
        winnerBadge: "우수",
        lectoSubtitle: "차세대 AI 미디어 몰입 학습",
        lrSubtitle: "기존 확장 프로그램(구 LLN)",
        lingoSubtitle: "큐레이션 스트리밍 플랫폼",
        featureCol: "기능 및 역량",
        previousAriaLabel: "이전 비교",
        slidesAriaLabel: "비교 슬라이드",
        goToAriaLabel: "비교로 이동",
        nextAriaLabel: "다음 비교",
        verdictTag: "결론",
        verdictTitle: "당신의 학습 방식에 맞는 워크플로를 선택하세요.",
        verdictBody:
            "Lectoro AI는 AI 문맥 인텔리전스, 키보드 내비게이션, 영상 스냅샷을 하나로 결합하며, 무료 플랜으로 바로 시작할 수 있습니다.",
        verdictCta: "Chrome에 무료로 추가 ➔",
        tabs: {
            vsLR: "Language Reactor와 비교",
            vsLRbadge: "주요 경쟁 서비스",
            vsLingopie: "Lingopie와 비교",
            vsLingopieBadge: "스트리밍 플랫폼",
            vsDuolingo: "Duolingo와 비교",
            vsDuolingoBadge: "코스 기반 앱",
        },
        rows: [
            {
                category: "AI 및 지능",
                feature: "문맥형 AI 튜터(슬랭 및 관용구)",
                description:
                    "문화적 맥락, 농담, 구동사의 미묘한 의미를 실시간으로 설명합니다.",
                lectoro: {
                    title: "AI 튜터",
                    detail: "슬랭, 문화적 유머, 문법을 날카로운 한 문장으로 설명합니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "번역 및 단어 조회 도구",
                    detail: "이중 자막, 사전 도구, Pro 플랜의 기계 번역을 제공합니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "대화 맥락 의미",
                    detail: "문맥형 단어 의미, 영상 플래시카드, 문법 설명을 제공합니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "코스 기반 AI 기능",
                    detail: "AI 대화 기능은 코스, 플랫폼, 구독 등급에 따라 달라집니다.",
                    isPositive: false,
                },
            },
            {
                category: "콘텐츠 자유도",
                feature: "지원 플랫폼 및 웹 읽기",
                description:
                    "추가 결제나 앱 전환 없이 실제로 어디서 학습할 수 있는지 보여줍니다.",
                lectoro: {
                    title: "YouTube, Netflix 및 전체 웹",
                    detail: "영상뿐 아니라 뉴스, Reddit, X(Twitter) 등 어떤 웹페이지에서도 작동합니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Netflix, YouTube, 도서 및 웹",
                    detail: "데스크톱에서 영상, 팟캐스트, 가져온 웹페이지, 업로드한 도서를 지원합니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "큐레이션 스트리밍 카탈로그",
                    detail: "수천 개의 쇼, 영화, 팟캐스트 및 기타 학습 콘텐츠를 제공합니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "구조화된 코스 콘텐츠",
                    detail: "임의의 웹페이지 학습보다 안내형 레슨 중심입니다.",
                    isPositive: false,
                },
            },
            {
                category: "사용성 및 UX",
                feature: "마우스 없는 키보드 학습 흐름",
                description:
                    "소파에서도 핸즈프리로 영상 재생과 자막 이동을 제어할 수 있습니다.",
                lectoro: {
                    title: "키보드 내비게이션",
                    detail: "키보드만으로 자막 이동, 재생 제어, 학습 도구 접근이 가능합니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "키보드 및 제스처 제어",
                    detail: "정밀한 영상 탐색과 재생 제어를 위한 단축키와 제스처를 제공합니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "인터랙티브 영상 플레이어",
                    detail: "카탈로그 콘텐츠 시청 중 자막 단어를 직접 선택할 수 있습니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "인터랙티브 연습",
                    detail: "듣기, 말하기, 쓰기, 선택형의 짧은 연습을 제공합니다.",
                    isPositive: false,
                },
            },
            {
                category: "기억 정착",
                feature: "Anki용 장면 스냅샷 자동 캡처",
                description:
                    "단어를 장면과 직접 연결해 기억하도록 시각 프레임을 저장합니다.",
                lectoro: {
                    title: "장면 스냅샷 자동 저장",
                    detail: "저장한 어휘에 현재 장면의 고해상도 프레임을 연결합니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "저장 어휘 도구",
                    detail: "어휘를 저장할 수 있으며, 미디어 포함 내보내기는 워크플로에 따라 달라집니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "영상 플래시카드",
                    detail: "자체 영상 카탈로그에서 만난 어휘로 카드를 구성합니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "코스 시각 자료",
                    detail: "학습자 미디어의 스냅샷 대신 코스 일러스트를 사용합니다.",
                    isPositive: false,
                },
            },
            {
                category: "내보내기 및 소유권",
                feature: "원클릭 Anki 및 Excel 내보내기",
                description:
                    "플랫폼 종속 없이 어휘 데이터베이스를 오래 직접 소유할 수 있습니다.",
                lectoro: {
                    title: "원클릭 Anki .txt / CSV / PDF",
                    detail: "저장 어휘를 사이트에 명시된 형식으로 내보냅니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "어휘 내보내기 지원",
                    detail: "내보내기 형식과 미디어 지원은 선택한 플랜과 워크플로에 따라 달라집니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "앱 내 어휘 복습",
                    detail: "공식 제품 페이지는 앱 내 플래시카드와 반복 도구를 중심으로 안내합니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "앱 내 학습 진행",
                    detail: "공식 플랜은 학습 덱 내보내기보다 코스 진행 동기화에 초점을 둡니다.",
                    isPositive: false,
                },
            },
            {
                category: "학습 시스템",
                feature: "간격 반복 시스템(SRS)",
                description:
                    "과학적으로 검증된 기억 알고리즘이 최적의 복습 간격을 자동으로 배정합니다.",
                lectoro: {
                    title: "내장 간격 반복",
                    detail: "Chrome 팝업에서 하루 5분 마이크로 복습. 설정이 필요 없습니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "저장 항목 및 구문 연습",
                    detail: "저장 어휘 도구를 제공하며, Lectoro와는 다른 복습 흐름을 가집니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "플래시카드 및 반복 도구",
                    detail: "구독 내에서 영상 플래시카드와 반복 기능을 제공합니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "개인화 연습",
                    detail: "코스 기반 학습 경로 안에서 연습 일정을 조정합니다.",
                    isPositive: false,
                },
            },
            {
                category: "디자인 및 성능",
                feature: "현대적인 영상 오버레이 및 속도",
                description:
                    "영상을 가리지 않는 미려한 UI와 가벼운 성능으로 몰입을 유지합니다.",
                lectoro: {
                    title: "세련된 다크 글래스모피즘",
                    detail: "영상을 가리지 않는 초고속 경량 도크를 제공합니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "자막 중심 브라우저 UI",
                    detail: "지원 미디어 주변에 이중 자막과 학습 제어 기능을 추가합니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "전용 스트리밍 플레이어",
                    detail: "카탈로그 재생과 클릭 가능한 자막, 학습 도구를 결합합니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "게임화된 코스 UI",
                    detail: "연속 학습, 하트, 챌린지를 활용하며 유료 플랜은 광고 제거 옵션을 제공합니다.",
                    isPositive: false,
                },
            },
            {
                category: "가격 및 가치",
                feature: "요금 정책과 접근성",
                description:
                    "장기 구독 함정이나 강제 락인 없이 투명한 가격 정책을 제공합니다.",
                lectoro: {
                    title: "무료 플랜 + 합리적 유료 접근",
                    detail: "충분한 무료 몰입 학습. 시작에 신용카드가 필요 없습니다.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "무료 + Pro 기능",
                    detail: "핵심 기능은 무료이며, 기계 번역 같은 기능은 Pro에서 제공됩니다.",
                    isPositive: false,
                },
                lingopie: {
                    title: "연 $83.88 표기",
                    detail: "공식 요금 페이지에는 분기 및 평생 옵션도 안내되어 있습니다.",
                    isPositive: false,
                },
                duolingo: {
                    title: "무료 + 유료 구독",
                    detail: "Super는 광고 제거, 무제한 하트, 추가 연습을 제공하며 가격은 지역별로 다릅니다.",
                    isPositive: false,
                },
            },
        ],
    },

    hiw: {
        tag: "간단한 시작",
        title: "Netflix 또는 YouTube로 언어를 배우는 방법",
        subtitle:
            "Chrome 확장 프로그램을 설치하고, 클릭 가능한 자막으로 학습한 뒤 저장한 어휘를 복습하세요.",
        s1title: "Chrome 확장 프로그램 설치",
        s1desc: "클릭 한 번으로 Chrome에 Lectoro AI를 추가하세요. 복잡한 설정 없이, 신용카드 없이 시작할 수 있습니다.",
        s2title: "이중 자막으로 시청",
        s2desc: "좋아하는 Netflix 시리즈나 YouTube 영상을 재생하세요. 자막에서 모르는 단어를 클릭하면 의미가 즉시 표시됩니다.",
        s3title: "영상 플래시카드 복습",
        s3desc: "아침 커피 시간에 확장 프로그램 팝업을 열어 5분 SRS 세션을 진행하세요. 나머지는 장기기억이 해냅니다!",
    },

    pricing: {
        tag: "투명한 요금",
        title: "목표에 맞는 플랜 선택",
        subtitle:
            "완전히 무료로 시작하세요. 준비되면 AI 튜터와 ElevenLabs 음성의 전체 기능을 열 수 있습니다.",
        mostPopular: "가장 인기",
        free: {
            name: "FREE",
            desc: "가볍게 시청하는 사용자와 초보자를 위한 플랜",
            forever: "/ 평생",
            cta: "무료로 시작",
            f1: "Netflix & YouTube 이중 자막",
            f2: "페이지 내 웹 기사 번역",
            f3: "SRS 플래시카드 최대 50개 저장",
            f4: "월 10회 AI 질의",
            f5: "표준 브라우저 음성 합성",
        },
        basic: {
            name: "BASIC",
            desc: "꾸준히 학습하는 사용자를 위한 플랜",
            mo: "/ 월",
            cta: "3일 무료 체험 시작",
            trial: "3일 무료 체험",
            f1: "FREE 플랜의 모든 기능",
            f2: "클라우드 SRS 플래시카드 최대 3,000개",
            f3: "월 200회 AI 질의",
            f4: "월 20,000자 ElevenLabs 사용",
            f5: "Anki, PDF, CSV 원클릭 내보내기",
            f6: "FREE 플랜 기능 전체 포함",
        },
        pro: {
            name: "PRO",
            desc: "시험 준비 및 다국어 학습자를 위한 플랜",
            mo: "/ 월",
            cta: "Pro 체험 시작",
            trial: "3일 무료 체험",
            f1: "BASIC 플랜의 모든 기능",
            f2: "SRS 플래시카드 최대 10,000개",
            f3: "월 1,200회 AI 질의",
            f4: "월 120,000자 ElevenLabs 사용",
            f5: "AI 퀴즈 우선 생성",
        },
    },

    testimonials: {
        tag: "사용자 후기",
        title: "언어 학습자들이 선택했습니다",
        starsLabel: "별점 5점 만점에 5점",
        previous: "이전 후기",
        next: "다음 후기",
        t1: {
            quote: "Netflix에서 Peaky Blinders를 보다가 영국 슬랭을 드디어 이해하게 됐어요. 단어를 클릭하면 AI가 1초 만에 뉘앙스를 설명하고, 장면 스냅샷이 플래시카드에 바로 저장됩니다. 정말 훌륭합니다.",
            name: "Michael Kowalczyk",
            role: "소프트웨어 엔지니어 & Netflix 애호가",
        },
        t2: {
            quote: "CAE 시험 준비가 이렇게 쉬운 적은 없었습니다. TED 강연과 학술 기사에서 고급 연어를 저장하고 Anki로 원클릭 내보내기를 하니, 타이핑 시간 20시간 이상을 절약했어요.",
            name: "Anna Novak",
            role: "영문학 전공 학생",
        },
        t3: {
            quote: "ElevenLabs 발음이 너무 자연스러워서 제 억양이 크게 좋아졌습니다. 매일 아침 5분 복습은 이제 가장 좋아하는 루틴이 되었어요.",
            name: "Peter Zielinski",
            role: "창업가 & 폴리글롯",
        },
    },

    faq: {
        tag: "자주 묻는 질문",
        title: "궁금한 점이 있나요? 답변해 드립니다.",
        items: [
            {
                question: "Lectoro AI는 Netflix와 YouTube 계정에 안전한가요?",
                answer: "Lectoro AI는 브라우저에서 동작하는 Chrome Manifest V3 확장 프로그램입니다. 스트리밍 계정을 변경하거나 DRM으로 보호된 영상 스트림에 접근하지 않으며, 페이지에서 사용 가능한 자막 콘텐츠와 함께 동작합니다.",
            },
            {
                question: "무료 플랜에 신용카드가 필요한가요?",
                answer: "아니요. 결제 정보를 입력하지 않고 Lectoro AI를 설치해 무료 플랜을 사용할 수 있습니다. 무료 플랜에는 이중 자막, 페이지 내 번역, 최대 50개의 저장 플래시카드가 포함됩니다.",
            },
            {
                question: "Basic과 Pro의 3일 체험은 어떻게 작동하나요?",
                answer: "유료 플랜을 선택하면 3일간 무료로 전체 기능을 이용할 수 있습니다. 첫 구독 결제를 원하지 않으면 체험 기간이 끝나기 전에 계정 대시보드에서 취소하세요.",
            },
            {
                question: "Anki와 CSV 내보내기는 어떻게 하나요?",
                answer: "확장 프로그램 라이브러리에서 Anki 내보내기를 선택하면 단어, 번역, 문맥 문장, 스크린샷 링크 같은 매핑된 필드가 포함된 형식화 텍스트 파일을 다운로드할 수 있습니다. 이 파일을 Anki로 가져오거나 어휘를 CSV로 내보낼 수 있습니다.",
            },
            {
                question: "플래시카드가 여러 컴퓨터에서 동기화되나요?",
                answer: "네. Google 계정으로 로그인하면 저장 어휘, 간격 반복 주기, 설정이 지원되는 컴퓨터 간에 동기화됩니다.",
            },
        ],
    },

    finalCta: {
        title1: "단어 암기를 멈추고",
        title2: "오늘부터 언어를 살아보세요.",
        subtitle:
            "이미 즐겨 보는 Netflix 시리즈, YouTube 영상, 웹 콘텐츠로 영어, 스페인어, 독일어, 프랑스어 등 다양한 언어를 배우세요.",
        cta: "Lectoro AI를 Chrome에 추가",
    },

    footer: {
        tagline:
            "이중 영상 자막, AI 어시스턴트, ElevenLabs 오디오, 간격 반복을 결합한 차세대 몰입형 학습 플랫폼.",
        product: "제품",
        legal: "법률 및 도움말",
        contact: "문의",
        subtitlesLink: "Netflix & YouTube 자막",
        translatorLink: "페이지 내 웹 번역기",
        flashcardsLink: "SRS 플래시카드 라이브러리",
        pricingLink: "요금제 및 체험",
        privacyLink: "개인정보 처리방침",
        termsLink: "이용약관",
        faqLink: "자주 묻는 질문",
        copyright: "© 2026 Lectoro AI (lectoroai.com). All rights reserved.",
        disclaimer:
            "Netflix와 YouTube는 각 소유자의 등록 상표입니다. Lectoro AI는 독립적인 소프트웨어 확장 프로그램이며 Netflix Inc. 또는 Google LLC와 제휴 관계가 없습니다.",
    },

    meta: {
        homeTitle: "Lectoro AI: Netflix & YouTube 이중 자막",
        homeDesc:
            "Netflix, YouTube, Plex, TED를 보며 언어를 배우세요. 이중 자막을 클릭해 AI 설명을 확인하고, 영상 플래시카드를 저장해 SRS로 복습할 수 있습니다.",
        privacyTitle: "개인정보 처리방침",
        privacyDesc:
            "Lectoro AI Chrome 확장 프로그램 및 웹 서비스(lectoroai.com)를 위한 개인정보 처리방침입니다. 데이터 보호 방식, AI 요청 처리 방식, 투명성 원칙을 확인하세요.",
        termsTitle: "이용약관",
        termsDesc:
            "Lectoro AI Chrome 확장 프로그램 및 웹사이트 서비스(lectoroai.com)의 이용약관입니다. 구독 규정, 3일 체험 조건, 이용 가이드를 확인하세요.",
    },

    privacy: {
        breadcrumbHome: "홈",
        breadcrumbCurrent: "개인정보 처리방침",
        badge: "법률 문서",
        title: "개인정보 처리방침",
        updatedAt: "최종 업데이트: 2026년 8월 26일 • 도메인: lectoroai.com",
        googleCallout: {
            title: "🛡️ Chrome 웹 스토어 및 Google Limited Use 고지",
            body: "Lectoro AI는 Limited Use 요건을 포함한 Chrome 웹 스토어 개발자 프로그램 정책을 엄격히 준수합니다. 당사는 개인정보, 브라우징 기록, 시청 로그를 제3자 데이터 브로커에게 판매, 수익화 또는 이전하지 않습니다.",
        },
        s1: {
            heading: "1. 소개 및 적용 범위",
            p1: '본 개인정보 처리방침은 lectoroai.com 및 Lectoro AI Chrome 브라우저 확장 프로그램을 통해 제공되는 Lectoro AI("Lectoro", "당사")가 귀하의 정보를 수집, 사용, 보호하는 방식을 설명합니다.',
            p2: "확장 프로그램을 설치하거나 웹 서비스를 이용함으로써 귀하는 본 방침에 따른 정보 수집 및 이용에 동의하게 됩니다.",
        },
        s2: {
            heading: "2. 수집하는 정보",
            aLabel: "A. 계정 정보:",
            aText: "Google 인증으로 로그인할 때 계정 식별, 라이선스 확인, 기기 간 클라우드 동기화를 위해 이름, 이메일 주소, 프로필 아바타 URL을 수집합니다.",
            bLabel: "B. 학습 데이터 및 플래시카드:",
            bText: "저장된 단어, 사용자 번역, 문맥 문장 조각, 간격 반복(SRS) 점수, 생성된 퀴즈 결과는 개인 맞춤형 어휘 데이터베이스 제공을 위해 저장됩니다.",
            cLabel: "C. 기술 및 진단 로그:",
            cText: "브라우저 유형, 확장 프로그램 버전, 익명화된 오류 추적 정보는 확장 프로그램 안정성과 클라이언트 성능 디버깅을 위해 수집됩니다.",
        },
        s3: {
            heading: "3. 수집하지 않는 정보",
            l1: "당사는 일반적인 브라우징 기록을 추적하거나 활성 번역 요청과 무관한 웹페이지를 모니터링하지 않습니다.",
            l2: "당사는 Netflix, YouTube 또는 기타 계정 자격 증명을 가로채거나 저장하거나 전송하지 않습니다.",
            l3: "당사는 키 입력 또는 민감한 입력 필드(비밀번호, 신용카드)를 기록하지 않습니다.",
            l4: "당사는 귀하의 데이터를 광고주나 상업적 데이터 브로커에게 판매하지 않습니다.",
        },
        s4: {
            heading: "4. 인공지능 및 제3자 처리자",
            intro: "고급 기능 제공을 위해 Lectoro AI는 검증된 AI 인프라 파트너와 통합됩니다:",
            geminiLabel: "Google Gemini 2.5 AI:",
            geminiText:
                "AI 설명 또는 관용구 분석을 요청하면 선택한 단어와 주변 문맥 문장이 Google Cloud Vertex AI / Gemini API로 전송됩니다. Google은 당사 엔터프라이즈 API를 통해 제출된 데이터를 기초 AI 모델 학습에 사용하지 않습니다.",
            elevenlabsLabel: "ElevenLabs AI 음성 합성:",
            elevenlabsText:
                "발음 요청 시 분리된 텍스트 문자열이 오디오 스트림으로 변환됩니다. 오디오 합성 요청에는 개인 식별 정보가 포함되지 않습니다.",
            stripeLabel: "Stripe:",
            stripeText:
                "Basic 및 Pro 구독 결제 처리는 Stripe가 직접 담당합니다. Lectoro는 귀하의 전체 신용카드 번호를 수신하거나 저장하지 않습니다.",
        },
        s5: {
            heading: "5. 데이터 저장, 보안 및 보유",
            p1: "학습 기록과 설정은 브라우저의 chrome.storage.local에 저장되며, 전송 중 TLS 1.3 암호화와 저장 시 AES-256 암호화를 적용해 Google Firebase Firestore로 안전하게 동기화됩니다.",
            p2: "데이터는 계정이 활성 상태인 동안 보유됩니다. 언제든지 계정 및 관련 어휘 데이터베이스의 영구 삭제를 요청할 수 있습니다.",
        },
        s6: {
            heading: "6. 사용자 권리(GDPR 및 CCPA)",
            intro: "일반개인정보보호법(GDPR) 및 캘리포니아 소비자 개인정보 보호법(CCPA)에 따라 귀하는 다음 권리를 가집니다:",
            l1label: "열람권:",
            l1text: "개인 플래시카드 데이터베이스의 전체 내보내기를 요청할 수 있습니다.",
            l2label: "정정권:",
            l2text: "저장된 번역 기록을 수정하거나 정정할 수 있습니다.",
            l3label: "삭제권:",
            l3text: "사용자 계정 및 클라우드 저장 기록의 완전한 삭제를 요청할 수 있습니다.",
            l4label: "데이터 이동권:",
            l4text: "저장된 모든 단어를 언제든지 Anki, CSV 또는 PDF 형식으로 내보낼 수 있습니다.",
        },
        s7: {
            heading: "7. 문의 및 데이터 보호 책임자",
            p1: "본 개인정보 처리방침과 관련된 질문, 우려 사항 또는 데이터 삭제 요청이 있으시면 다음 지원팀으로 문의해 주세요:",
            teamName: "Lectoro AI 개인정보 팀",
            domainLabel: "공식 도메인:",
            domain: "lectoroai.com",
            emailLabel: "이메일:",
            email: "lectoroai@gmail.com",
        },
    },

    terms: {
        breadcrumbHome: "홈",
        breadcrumbCurrent: "이용약관",
        badge: "법적 계약",
        title: "이용약관",
        updatedAt:
            "최종 업데이트: 2026년 8월 26일 • 공식 도메인: lectoroai.com",
        s1: {
            heading: "1. 약관 동의",
            p1: "Lectoro AI Chrome 확장 프로그램을 다운로드, 설치 또는 사용하거나 lectoroai.com 웹사이트에 접속함으로써 귀하는 본 이용약관의 적용에 동의합니다. 본 약관에 동의하지 않는 경우 서비스를 이용하지 마세요.",
        },
        s2: {
            heading: "2. 서비스 설명 및 라이선스",
            p1: "Lectoro AI는 영상 플랫폼(YouTube, Netflix 등)을 위한 이중 자막, 문맥형 텍스트 번역, Gemini AI 설명, ElevenLabs 음성 합성, 간격 반복(SRS) 플래시카드 관리 등 교육용 언어 몰입 도구를 제공합니다.",
            p2: "당사는 본 약관에 따라 개인적이고 비상업적인 교육 목적 범위에서 Lectoro AI를 사용할 수 있는 비독점적, 양도 불가, 철회 가능한 라이선스를 부여합니다.",
        },
        s3: {
            heading: "3. 구독, 3일 무료 체험 및 결제",
            aLabel: "A. 무료 플랜:",
            aText: "시간 제한 없이 $0로 제공되며, 핵심 이중 자막, 페이지 내 번역, 최대 50개의 SRS 플래시카드, 기본 월간 AI 질의를 포함합니다.",
            bLabel: "B. 유료 플랜(Basic 및 Pro):",
            bText: "유료 플랜은 Stripe를 통해 월간 또는 연간 반복 결제로 청구됩니다. 클라우드 플래시카드 한도 확대, Gemini AI 쿼터 상향, ElevenLabs 뉴럴 보이스 문자량, Anki/PDF 내보내기 기능이 포함됩니다.",
            cLabel: "C. 3일 무료 체험:",
            cText: "Basic 또는 Pro 신규 구독자는 3일 무료 체험을 제공합니다. 체험 기간 종료 전에 취소하면 신용카드에 청구되지 않습니다.",
            dLabel: "D. 취소 및 환불:",
            dText: "계정 설정에서 언제든지 구독을 취소할 수 있습니다. 취소 후에도 현재 결제 주기 종료 시점까지 서비스 이용이 가능합니다.",
        },
        s4: {
            heading: "4. 허용되는 사용 및 이용자 행위",
            intro: "귀하는 다음 행위를 하지 않기로 동의합니다:",
            l1: "확장 프로그램의 리버스 엔지니어링, 디컴파일 또는 소스코드 추출 시도",
            l2: "일반적인 학습 상호작용 범위를 넘어 백엔드 AI 엔드포인트(Gemini, ElevenLabs)를 자동화해 남용하는 행위",
            l3: "제3자 영상 플랫폼의 구독 검증 또는 DRM 보호를 우회하는 행위",
            l4: "명시적 서면 동의 없이 Lectoro AI 서비스 또는 생성된 콘텐츠 데이터베이스를 상업적으로 재판매하거나 재배포하는 행위",
        },
        s5: {
            heading: "5. 제3자 상표 및 제휴",
            p1: "Netflix와 YouTube는 각각 Netflix, Inc. 및 Google LLC의 등록 상표입니다. Lectoro AI는 사용자 교육 워크플로 향상을 위해 개발된 독립형 브라우저 확장 프로그램이며, Netflix, Inc., Google LLC 또는 TED Conferences와 공식 제휴, 보증, 후원을 받지 않습니다.",
        },
        s6: {
            heading: "6. 보증의 부인 및 책임의 제한",
            p1: 'Lectoro AI는 "있는 그대로(AS IS)", "제공 가능한 범위에서(AS AVAILABLE)" 제공됩니다. 당사는 높은 가동률과 정확한 AI 번역을 위해 노력하지만, 번역 또는 음성 발음이 항상 100% 무오류이거나 중단 없이 제공된다고 보증하지 않습니다.',
            p2: "관련 법률이 허용하는 최대 범위 내에서 Lectoro AI 및 제작자는 서비스 이용으로 인해 발생하는 간접적, 부수적, 결과적 손해에 대해 책임을 지지 않습니다.",
        },
        s7: {
            heading: "7. 서비스 및 약관의 변경",
            p1: "당사는 기능을 수정 또는 중단하고, 사전 고지 후 요금을 조정하며, 본 이용약관을 업데이트할 권리를 보유합니다. 업데이트 이후에도 Lectoro AI를 계속 사용하면 개정 약관에 동의한 것으로 간주됩니다.",
        },
        s8: {
            heading: "8. 연락처 정보",
            p1: "본 이용약관 또는 결제 관련 문의는 다음으로 연락해 주세요:",
            teamName: "Lectoro AI 법무 및 지원",
            domainLabel: "공식 도메인:",
            domain: "lectoroai.com",
            emailLabel: "이메일:",
            email: "lectoroai@gmail.com",
        },
    },
};
