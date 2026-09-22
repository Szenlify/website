import type { Dict } from "./types";
import { en } from "./en";

export const pt: Dict = {
    ...en,
    locale: "pt",

    nav: {
        features: "Recursos",
        liveDemo: "Demo ao vivo",
        howItWorks: "Como funciona",
        pricing: "Preços",
        faq: "FAQ",
        addToChrome: "Adicionar ao Chrome",
        addToChromeFree: "Adicionar ao Chrome - Grátis",
        signIn: "Entrar",
        signOut: "Sair",
        reviews: "Revisões",
        privacyPolicy: "Política de Privacidade",
        termsOfService: "Termos de Serviço",
    },

    lang: {
        en: "English",
        ja: "日本語",
        de: "Deutsch",
        ko: "한국어",
        fr: "Français",
        nl: "Nederlands",
        pl: "Polski",
        es: "Español",
        it: "Italiano",
        cs: "Čeština",
        pt: "Português",
        selectLanguage: "Idioma",
    },

    hero: {
        badge: "Extensão de aprendizado de idiomas para Chrome",
        title: "Aprenda idiomas com legendas duplas no",
        titleHighlight: "Netflix e YouTube",
        subtitle:
            "Clique em qualquer palavra nas legendas bilíngues para ver tradução, pronúncia e explicação contextual com IA. Salve vocabulário com capturas de cenas do vídeo e memorize com flashcards de repetição espaçada.",
        installCta: "Instalar no Chrome",
        trialBadge: "3 dias grátis",
        demoCta: "Testar demo interativa",
        noCard: "Sem cartão de crédito no plano gratuito",
        builtFor: "Feito para Google Chrome",
    },

    platforms: {
        label: "Integração perfeita com suas plataformas favoritas de vídeo e web",
        anyWeb: "Qualquer artigo da web",
    },

    features: {
        tag: "Ecossistema completo de aprendizado",
        title: "Uma extensão de idiomas, da imersão à revisão",
        subtitle:
            "Transforme vídeos autênticos e páginas da web em lições com legendas clicáveis, ajuda contextual de IA e flashcards de repetição espaçada.",
        f1: {
            title: "Legendas duplas e capturas de quadro",
            desc: "Exiba o idioma original junto com sua tradução nativa. Clique em qualquer palavra desconhecida para pausar o vídeo automaticamente e capturar cenas em alta resolução para seus flashcards.",
            b1: "YouTube e Netflix",
            b2: "Clique para pausar",
            b3: "Capturas",
        },
        f2: {
            title: "Tradutor na própria página",
            desc: "Lendo documentação técnica, Reddit ou notícias do setor? Destaque qualquer trecho para revelar instantaneamente definições contextuais e análise gramatical em um painel flutuante.",
            b1: "Barra flutuante",
            b2: "Cache em múltiplas camadas",
            b3: "Detecção de frases",
        },
        f3: {
            title: "Tutor de IA",
            desc: "Esqueça definições rígidas de dicionário. A IA explica gírias, referências culturais e phrasal verbs em 1 frase ultra precisa, como um tutor nativo pessoal.",
            b1: "IA",
            b2: "Nuance em 1 frase",
            b3: "Exemplos de contexto",
        },
        f4: {
            badge: "Algoritmo SuperMemo",
            title: "Fixe palavras na memória de longo prazo sem decorar à força",
            desc: "O Lectoro agenda revisões de vocabulário com repetição espaçada, ajudando você a focar nas palavras que precisam de mais prática em vez de revisar tudo igualmente.",
            l1: "Sessões diárias de 5 minutos no popup da extensão",
            l2: "Indicador em tempo real de revisões pendentes na barra do navegador",
            l3: "Flashcards visuais combinados com capturas exatas de quadros do filme",
        },
        f5: {
            title: "TTS de voz neural ElevenLabs",
            desc: "Domine sotaques autênticos e ritmo natural com modelos de síntese de voz ElevenLabs de nível mundial (Roger, Sarah, Charlie), com cache local de áudio ultrarrápido.",
            b1: "ElevenLabs Flash v2.5",
            b2: "Sotaques realistas",
            b3: "Cache de áudio",
        },
        f6: {
            title: "Quizzes com IA e exportação para Anki em 1 clique",
            desc: "Teste-se com 6 tipos dinâmicos de quiz gerados por IA. Exporte toda a sua coleção de vocabulário para Anki (.txt), Excel/CSV ou fichas de estudo em PDF para impressão em segundos.",
            b1: "Exportar Anki .txt",
            b2: "Quizzes interativos",
            b3: "PDF para impressão",
        },
    },

    hiw: {
        tag: "Onboarding simples",
        title: "Como aprender um idioma com Netflix ou YouTube",
        subtitle:
            "Instale a extensão do Chrome, aprenda com legendas clicáveis e revise o vocabulário salvo.",
        s1title: "Instale a extensão do Chrome",
        s1desc: "Adicione o Lectoro AI ao Chrome com um único clique. Sem configuração complicada e sem cartão de crédito.",
        s2title: "Assista com legendas bilíngues",
        s2desc: "Reproduza sua série favorita da Netflix ou vídeos do YouTube. Clique em qualquer palavra desconhecida nas legendas para revelar o significado instantaneamente.",
        s3title: "Revise flashcards de vídeo",
        s3desc: "Abra o popup da extensão durante o café da manhã para uma sessão de SRS de 5 minutos. A memória de longo prazo cuida do resto.",
    },

    pricing: {
        tag: "Preços transparentes",
        title: "Escolha o plano que combina com seus objetivos",
        subtitle:
            "Comece totalmente grátis. Faça upgrade quando quiser para liberar todo o poder dos tutores de IA e das vozes ElevenLabs.",
        mostPopular: "Mais popular",
        free: {
            name: "GRÁTIS",
            desc: "Para usuários casuais e iniciantes",
            forever: "/ para sempre",
            cta: "Começar grátis",
            f1: "Legendas duplas para Netflix e YouTube",
            f2: "Tradução de artigos na própria página",
            f3: "Até 50 flashcards SRS salvos",
            f4: "10 consultas de IA / mês",
            f5: "Síntese de fala padrão do navegador",
        },
        basic: {
            name: "BÁSICO",
            desc: "Para quem estuda idiomas com frequência",
            mo: "/ mês",
            cta: "Iniciar teste grátis de 3 dias",
            trial: "TESTE GRÁTIS DE 3 DIAS",
            f1: "Tudo do plano GRÁTIS",
            f2: "Até 3.000 flashcards SRS na nuvem",
            f3: "200 consultas de IA / mês",
            f4: "20.000 caracteres ElevenLabs / mês",
            f5: "Exportação em 1 clique para Anki, PDF e CSV",
            f6: "Tudo do plano GRÁTIS (incluído)",
        },
        pro: {
            name: "PRO",
            desc: "Para preparação de exames e poliglotas",
            mo: "/ mês",
            cta: "Iniciar teste Pro",
            trial: "TESTE GRÁTIS DE 3 DIAS",
            f1: "Tudo do plano BÁSICO",
            f2: "Até 10.000 flashcards SRS",
            f3: "1.200 consultas de IA / mês",
            f4: "120.000 caracteres ElevenLabs / mês",
            f5: "Geração prioritária de quizzes com IA",
        },
    },

    testimonials: {
        starsLabel: "5 de 5 estrelas",
        previous: "Depoimento anterior",
        next: "Próximo depoimento",
        tag: "Depoimentos de usuários",
        title: "Amado por entusiastas de idiomas",
        t1: {
            quote: "Eu estava assistindo Peaky Blinders na Netflix e finalmente entendi as gírias britânicas! Clico em uma palavra, a IA explica a nuance em 1 segundo, e a captura já vai para meu flashcard. Brilhante.",
            name: "Michael Kowalczyk",
            role: "Engenheiro de software e fã da Netflix",
        },
        t2: {
            quote: "Preparar meu exame CAE nunca foi tão fácil. Salvo colocações avançadas de TED talks e artigos acadêmicos e depois exporto para o Anki com um clique. Economizei mais de 20 horas de digitação.",
            name: "Anna Novak",
            role: "Estudante de Filologia Inglesa",
        },
        t3: {
            quote: "A pronúncia do ElevenLabs soa tão natural que meu sotaque melhorou muito. Uma sessão rápida de revisão de 5 minutos toda manhã virou meu ritual favorito.",
            name: "Peter Zielinski",
            role: "Founder e poliglota",
        },
    },

    faq: {
        tag: "Perguntas frequentes",
        title: "Tem dúvidas? Temos respostas.",
        items: [
            {
                question:
                    "O Lectoro AI é seguro para minhas contas Netflix e YouTube?",
                answer: "O Lectoro AI é uma extensão Chrome Manifest V3 que roda no seu navegador. Ela não altera sua conta de streaming nem acessa fluxos de vídeo protegidos por DRM; funciona com o conteúdo de legendas disponível na página.",
            },
            {
                question: "O plano gratuito exige cartão de crédito?",
                answer: "Não. Você pode instalar o Lectoro AI e usar o plano gratuito sem inserir dados de pagamento. O plano gratuito inclui legendas duplas, traduções na página e até 50 flashcards salvos.",
            },
            {
                question:
                    "Como funciona o teste de três dias para Basic e Pro?",
                answer: "Ao escolher um plano pago, você recebe três dias de acesso sem custo. Cancele no painel da conta antes do fim do teste para evitar a primeira cobrança da assinatura.",
            },
            {
                question: "Como funcionam as exportações para Anki e CSV?",
                answer: "Escolha Exportar para Anki na biblioteca da extensão para baixar um arquivo de texto formatado com campos mapeados, como palavra, tradução, frase de contexto e link da captura. Você pode importar esse arquivo no Anki ou exportar seu vocabulário como CSV.",
            },
            {
                question: "Meus flashcards sincronizam entre computadores?",
                answer: "Sim. Ao entrar com sua conta Google, seu vocabulário salvo, intervalos de repetição espaçada e configurações sincronizam entre computadores compatíveis.",
            },
        ],
    },

    finalCta: {
        title1: "Pare de decorar palavras.",
        title2: "Comece a viver o idioma hoje.",
        subtitle:
            "Aprenda inglês, espanhol, alemão, francês e mais com séries da Netflix, vídeos do YouTube e conteúdo web que você já curte.",
        cta: "Adicionar Lectoro AI ao Chrome",
    },

    footer: {
        tagline:
            "Plataforma de imersão de nova geração com legendas bilíngues em vídeo, assistente de IA, áudio ElevenLabs e Repetição Espaçada.",
        product: "Produto",
        legal: "Legal e ajuda",
        contact: "Contato",
        subtitlesLink: "Legendas para Netflix e YouTube",
        translatorLink: "Tradutor na página",
        flashcardsLink: "Biblioteca de flashcards SRS",
        pricingLink: "Preços e testes",
        privacyLink: "Política de Privacidade",
        termsLink: "Termos de Serviço",
        faqLink: "FAQ",
        copyright:
            "© 2026 Lectoro AI (lectoroai.com). Todos os direitos reservados.",
        disclaimer:
            "Netflix e YouTube são marcas registradas de seus respectivos proprietários. O Lectoro AI é uma extensão de software independente e não é afiliado à Netflix Inc. nem à Google LLC.",
    },

    meta: {
        homeTitle: "Lectoro AI: Legendas duplas para Netflix e YouTube",
        homeDesc:
            "Aprenda idiomas enquanto assiste Netflix, YouTube, Plex e TED. Clique em legendas bilíngues para explicações com IA, salve flashcards de vídeo e revise com SRS.",
        privacyTitle: "Política de Privacidade",
        privacyDesc:
            "Política de Privacidade da extensão Lectoro AI para Chrome e dos serviços web (lectoroai.com). Saiba como protegemos seus dados, tratamos requisições de IA e garantimos total transparência.",
        termsTitle: "Termos de Serviço",
        termsDesc:
            "Termos de Serviço da extensão Lectoro AI para Chrome e dos serviços do site (lectoroai.com). Leia nossas regras de assinatura, termos de teste de 3 dias e diretrizes de uso.",
        reviewsTitle: "Revisões de vocabulário e flashcards de repetição espaçada",
        reviewsDesc:
            "Reveja e reforce o vocabulário guardado da Netflix e YouTube com flashcards de vídeo e repetição espaçada.",
    },

    privacy: {
        breadcrumbHome: "Início",
        breadcrumbCurrent: "Política de Privacidade",
        badge: "Documentação legal",
        title: "Política de Privacidade",
        updatedAt:
            "Última atualização: 26 de agosto de 2026 • Domínio: lectoroai.com",
        googleCallout: {
            title: "🛡️ Divulgação de uso limitado do Chrome Web Store e Google",
            body: "O Lectoro AI segue rigorosamente as Políticas do Programa para Desenvolvedores da Chrome Web Store, incluindo os requisitos de Uso Limitado. Nunca vendemos, monetizamos nem transferimos seus dados pessoais, histórico de navegação ou registros de visualização para corretores de dados de terceiros.",
        },
        s1: {
            heading: "1. Introdução e escopo",
            p1: 'Esta Política de Privacidade descreve como o Lectoro AI ("Lectoro", "nós" ou "nosso"), acessível por lectoroai.com e pela extensão Lectoro AI para navegador Chrome, coleta, usa e protege suas informações.',
            p2: "Ao instalar a extensão ou usar nossos serviços web, você concorda com a coleta e o uso de informações de acordo com esta política.",
        },
        s2: {
            heading: "2. Informações que coletamos",
            aLabel: "A. Informações da conta:",
            aText: "Ao entrar via autenticação do Google, coletamos seu nome, endereço de e-mail e URL do avatar de perfil exclusivamente para identificação da conta, verificação de licença e sincronização em nuvem entre dispositivos.",
            bLabel: "B. Dados de aprendizado e flashcards:",
            bText: "Palavras salvas, traduções do usuário, trechos de frases de contexto, pontuações de intervalo de Repetição Espaçada (SRS) e resultados de quizzes gerados são armazenados para alimentar sua base de vocabulário personalizada.",
            cLabel: "C. Logs técnicos e de diagnóstico:",
            cText: "Tipo de navegador, versão da extensão e rastros de erro anonimizados para manter a estabilidade da extensão e depurar a performance no lado do cliente.",
        },
        s3: {
            heading: "3. O que NÃO coletamos",
            l1: "Não rastreamos seu histórico geral de navegação nem monitoramos páginas web não relacionadas às suas solicitações ativas de tradução.",
            l2: "Não interceptamos, armazenamos nem transmitimos suas credenciais de conta da Netflix, YouTube ou de outros serviços.",
            l3: "Não registramos teclas digitadas nem campos sensíveis (senhas, cartões de crédito).",
            l4: "Não vendemos seus dados para anunciantes nem para corretores comerciais de dados.",
        },
        s4: {
            heading: "4. Inteligência Artificial e processadores terceirizados",
            intro: "Para oferecer recursos avançados, o Lectoro AI integra parceiros de infraestrutura de IA avaliados:",
            geminiLabel: "Google Gemini 2.5 AI:",
            geminiText:
                "Quando você solicita uma explicação por IA ou análise de expressão idiomática, a palavra selecionada e o contexto da frase ao redor são enviados para o Google Cloud Vertex AI / Gemini API. O Google não usa dados enviados pela nossa API corporativa para treinar modelos fundamentais de IA.",
            elevenlabsLabel: "Síntese de voz com IA ElevenLabs:",
            elevenlabsText:
                "Solicitações de pronúncia convertem trechos isolados de texto em fluxos de áudio. Nenhum identificador pessoal do usuário é enviado em solicitações de síntese de áudio.",
            stripeLabel: "Stripe:",
            stripeText:
                "O processamento de pagamentos dos planos Basic e Pro é feito diretamente pela Stripe. O Lectoro nunca recebe nem armazena seu número completo de cartão de crédito.",
        },
        s5: {
            heading: "5. Armazenamento, segurança e retenção de dados",
            p1: "Seus registros de aprendizado e configurações são armazenados localmente em chrome.storage.local do navegador e sincronizados com segurança via Google Firebase Firestore, usando criptografia TLS 1.3 em trânsito e AES-256 em repouso.",
            p2: "Os dados são mantidos enquanto sua conta permanecer ativa. Você pode solicitar a exclusão permanente da sua conta e de todos os bancos de vocabulário associados a qualquer momento.",
        },
        s6: {
            heading: "6. Direitos do usuário (GDPR e CCPA)",
            intro: "Nos termos do General Data Protection Regulation (GDPR) e do California Consumer Privacy Act (CCPA), você possui os seguintes direitos:",
            l1label: "Direito de acesso:",
            l1text: "Solicitar uma exportação completa da sua base pessoal de flashcards.",
            l2label: "Direito de retificação:",
            l2text: "Editar ou corrigir quaisquer registros de tradução salvos.",
            l3label: "Direito de exclusão:",
            l3text: "Solicitar a exclusão total da sua conta de usuário e dos registros de armazenamento em nuvem.",
            l4label: "Direito à portabilidade de dados:",
            l4text: "Exportar todas as palavras salvas para Anki, CSV ou PDF a qualquer momento.",
        },
        s7: {
            heading: "7. Contato e Encarregado de Proteção de Dados",
            p1: "Se você tiver dúvidas, preocupações ou solicitações de exclusão de dados relacionadas a esta Política de Privacidade, entre em contato com nossa equipe de suporte em:",
            teamName: "Equipe de Privacidade Lectoro AI",
            domainLabel: "Domínio oficial:",
            domain: "lectoroai.com",
            emailLabel: "E-mail:",
            email: "lectoroai@gmail.com",
        },
    },

    terms: {
        breadcrumbHome: "Início",
        breadcrumbCurrent: "Termos de Serviço",
        badge: "Acordo legal",
        title: "Termos de Serviço",
        updatedAt:
            "Última atualização: 26 de agosto de 2026 • Domínio oficial: lectoroai.com",
        s1: {
            heading: "1. Aceitação dos termos",
            p1: "Ao baixar, instalar ou usar a extensão Lectoro AI para Chrome, ou ao acessar nosso site em lectoroai.com, você concorda em ficar vinculado a estes Termos de Serviço. Se não concordar com estes termos, não use nossos serviços.",
        },
        s2: {
            heading: "2. Descrição do serviço e licença",
            p1: "O Lectoro AI fornece ferramentas educacionais de imersão em idiomas, incluindo legendas bilíngues duplas para plataformas de vídeo (como YouTube e Netflix), tradução contextual de texto, explicações com Gemini AI, síntese de voz ElevenLabs e gerenciamento de flashcards com Repetição Espaçada (SRS).",
            p2: "Concedemos a você uma licença não exclusiva, intransferível e revogável para usar o Lectoro AI para fins educacionais pessoais e não comerciais, de acordo com estes Termos.",
        },
        s3: {
            heading: "3. Assinaturas, teste grátis de 3 dias e cobrança",
            aLabel: "A. Plano gratuito:",
            aText: "Disponível por US$ 0, sem limite de tempo, oferecendo legendas duplas essenciais, traduções na página, até 50 flashcards SRS e consultas mensais básicas de IA.",
            bLabel: "B. Planos pagos (Basic e Pro):",
            bText: "Planos pagos são cobrados de forma recorrente mensal ou anual via Stripe. Os recursos incluem limites ampliados de flashcards na nuvem, cotas maiores de Gemini AI, caracteres de voz neural ElevenLabs e exportações Anki/PDF.",
            cLabel: "C. Teste grátis de 3 dias:",
            cText: "Novos assinantes dos planos Basic ou Pro recebem um teste grátis de 3 dias. Se você cancelar antes do término do período de teste, seu cartão de crédito não será cobrado.",
            dLabel: "D. Cancelamento e reembolsos:",
            dText: "Você pode cancelar sua assinatura a qualquer momento nas configurações da sua conta. Após o cancelamento, você manterá o acesso até o fim do ciclo de cobrança atual.",
        },
        s4: {
            heading: "4. Uso aceitável e conduta",
            intro: "Você concorda em não:",
            l1: "Tentar fazer engenharia reversa, descompilar ou extrair o código-fonte da extensão.",
            l2: "Automatizar abuso dos nossos endpoints de IA no backend (Gemini, ElevenLabs) além de interações humanas típicas de aprendizado.",
            l3: "Contornar verificação de assinatura ou proteções DRM em plataformas de vídeo de terceiros.",
            l4: "Revender ou redistribuir comercialmente os serviços do Lectoro AI ou bancos de conteúdo gerados sem consentimento explícito por escrito.",
        },
        s5: {
            heading: "5. Marcas de terceiros e afiliações",
            p1: "Netflix e YouTube são marcas registradas de Netflix, Inc. e Google LLC, respectivamente. O Lectoro AI é uma extensão de navegador independente desenvolvida para melhorar fluxos educacionais dos usuários e não é oficialmente afiliada, endossada nem patrocinada por Netflix, Inc., Google LLC ou TED Conferences.",
        },
        s6: {
            heading: "6. Isenção de garantias e limitação de responsabilidade",
            p1: 'O Lectoro AI é fornecido na base "COMO ESTÁ" e "CONFORME DISPONÍVEL". Embora busquemos alta disponibilidade e traduções de IA precisas, não oferecemos garantias de que traduções ou pronúncias de voz serão sempre 100% livres de erros ou ininterruptas.',
            p2: "Na máxima extensão permitida por lei, o Lectoro AI e seus criadores não serão responsáveis por quaisquer danos indiretos, incidentais ou consequenciais resultantes do uso do serviço por você.",
        },
        s7: {
            heading: "7. Modificações no serviço e nos termos",
            p1: "Reservamo-nos o direito de modificar ou descontinuar recursos, ajustar preços mediante aviso prévio ou atualizar estes Termos de Serviço. O uso contínuo do Lectoro AI após atualizações constitui aceitação dos Termos revisados.",
        },
        s8: {
            heading: "8. Informações de contato",
            p1: "Para dúvidas sobre estes Termos de Serviço ou questões de cobrança, entre em contato com:",
            teamName: "Lectoro AI Legal e Suporte",
            domainLabel: "Domínio oficial:",
            domain: "lectoroai.com",
            emailLabel: "E-mail:",
            email: "lectoroai@gmail.com",
        },
    },

    reviews: {
        badge: "Spaced Repetition",
        title: "Revisões de vocabulário",
        subtitle: "Reveja as palavras guardadas dos seus filmes e séries favoritos.",
        breadcrumbHome: "Início",
        breadcrumbDashboard: "Painel",
        breadcrumbReviews: "Revisões",
        loadingTitle: "A carregar revisões da nuvem...",
        loadingSubtitle: "A ligar ao Firebase Firestore...",
        dbErrorTitle: "Erro na base de dados",
        retryButton: "Tentar novamente",
        noWordsTitle: "Sem palavras na nuvem",
        noWordsSubtitle: "Não foram encontradas palavras guardadas no Firebase para esta conta.",
        syncHowToTitle: "Como sincronizar palavras da extensão Lectoro:",
        syncStep1: "Abra a extensão Lectoro na barra do Chrome.",
        syncStep2: "Clique no separador Definições / Nuvem.",
        syncStep3: "Certifique-se de que tem sessão iniciada com a mesma conta Google",
        syncStep4: "Clique em 'Sincronizar' – as suas palavras de filmes serão enviadas para a nuvem.",
        refreshButton: "Atualizar revisões",
        allCaughtUpTitle: "Não há cartões para rever!",
        allCaughtUpDesc: "Todo o seu vocabulário está em dia. As próximas revisões são agendadas de acordo com o algoritmo SRS.",
        totalSavedWords: "Palavras guardadas na base de dados:",
        practicePromptTitle: "Quer praticar mesmo assim?",
        practicePromptDesc: "Pode rever todas as suas palavras guardadas agora mesmo sem esperar pelo temporizador SRS.",
        practiceAllButton: "Praticar todos os cartões",
        checkNewButton: "Procurar novos cartões",
        sessionCompleteTitle: "Sessão concluída!",
        sessionCompleteDesc: "Concluiu todas as revisões desta sessão! A sua memória de longo prazo foi reforçada.",
        exitPracticeButton: "Sair do modo de prática",
        changeDirection: "Mudar direção de estudo",
        cramBadge: "Modo de prática",
        listenAudio: "Ouvir pronúncia (W)",
        movieSnapshotAlt: "Captura de cena do filme",
        mobileSwipeHint: "← Deslizar: Não sei • Tocar: Virar • Sei: Deslizar →",
        flipShowAnswer: "Mostrar resposta (Virar)",
        flipShowQuestion: "Mostrar pergunta (Virar)",
        mobileTapFlip: "Toque para virar o cartão",
        rateMemoryPrompt: "Avalie a sua recordação:",
        knowWordPrompt: "Sabe o que isto significa?",
        btnAgain: "Não sei",
        btnGood: "Sei",
        badgeAgain: "DE NOVO",
        badgeGood: "BOM",
        shortcutPronounce: "pronúncia",
        shortcutFlip: "virar",
        shortcutAgain: "não sei",
        shortcutGood: "sei",
        unauthTitle: "Inicie sessão para aceder às suas revisões",
        unauthDesc: "Reveja e memorize vocabulário guardado da Netflix e YouTube com repetição espaçada.",
        signInWithGoogle: "Iniciar sessão com o Google",
        signingIn: "A iniciar sessão...",
        loggedInAs: "Sessão iniciada como:",
        backToHome: "Início",
    },
};
