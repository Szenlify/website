import type { Dict } from "./types";
import { en } from "./en";

const lang = {
    ...en.lang,
    en: "English",
    pl: "Polski",
    de: "Deutsch",
    es: "Espanol",
    ja: "日本語",
    ko: "한국어",
    fr: "Français",
    "pt-BR": "Português (Brasil)",
    "es-MX": "Español (México)",
    hi: "हिन्दी",
    selectLanguage: "Langue",
};

export const fr: Dict = {
    ...en,
    locale: "fr",

    nav: {
        features: "Fonctionnalites",
        liveDemo: "Demo en direct",
        howItWorks: "Comment ca marche",
        comparison: "Comparaison",
        pricing: "Tarifs",
        faq: "FAQ",
        addToChrome: "Ajouter a Chrome",
        addToChromeFree: "Ajouter a Chrome - Gratuit",
        privacyPolicy: "Politique de confidentialite",
        termsOfService: "Conditions d'utilisation",
    },

    lang,

    hero: {
        badge: "Extension Chrome pour l'apprentissage des langues",
        title: "Apprenez les langues avec des sous-titres bilingues sur",
        titleHighlight: "Netflix et YouTube",
        subtitle:
            "Cliquez sur n'importe quel mot dans les sous-titres bilingues pour obtenir une traduction, la prononciation et une explication IA contextuelle. Enregistrez le vocabulaire avec des captures de scenes video, puis memorisez-le avec des flashcards a repetition espacee.",
        installCta: "Installer sur Chrome",
        trialBadge: "3 jours gratuits",
        demoCta: "Essayer la demo interactive",
        noCard: "Aucune carte bancaire requise pour le plan gratuit",
        builtFor: "Concu pour Google Chrome",
    },

    platforms: {
        label: "S'integre parfaitement a vos plateformes video et web preferees",
        anyWeb: "Tous les articles web",
    },

    features: {
        tag: "Ecosysteme d'apprentissage complet",
        title: "Une seule extension d'apprentissage des langues, de l'immersion a la revision",
        subtitle:
            "Transformez des videos authentiques et des pages web en lecons avec des sous-titres cliquables, une aide IA contextuelle et des flashcards a repetition espacee.",
        f1: {
            title: "Sous-titres bilingues et captures d'image",
            desc: "Affichez la langue d'origine avec sa traduction dans votre langue maternelle. Cliquez sur un mot inconnu pour mettre automatiquement la video en pause et capturer des images de scene haute resolution pour vos flashcards.",
            b1: "YouTube et Netflix",
            b2: "Cliquer pour mettre en pause",
            b3: "Instantanes",
        },
        f2: {
            title: "Traducteur web integre a la page",
            desc: "Vous lisez de la documentation technique, Reddit ou des actualites de votre secteur ? Selectionnez n'importe quel extrait de texte pour afficher instantanement des definitions contextuelles et une analyse grammaticale dans un panneau flottant.",
            b1: "Barre d'outils flottante",
            b2: "Cache multi-niveaux",
            b3: "Detection d'expressions",
        },
        f3: {
            title: "Tuteur IA",
            desc: "Oubliez les definitions rigides des dictionnaires. L'IA explique l'argot, les references culturelles et les verbes a particule en une phrase ultra-claire, exactement comme un tuteur natif personnel.",
            b1: "IA",
            b2: "Nuance en 1 phrase",
            b3: "Exemples contextuels",
        },
        f4: {
            badge: "Algorithme SuperMemo",
            title: "Ancrez les mots dans la memoire a long terme sans bachotage",
            desc: "Lectoro planifie les revisions de vocabulaire avec la repetition espacee, pour vous aider a vous concentrer sur les mots qui necessitent plus de pratique au lieu de revoir chaque element sauvegarde de la meme facon.",
            l1: "Sessions quotidiennes de 5 minutes dans le popup de l'extension",
            l2: "Badge de revisions en attente en temps reel dans votre barre de navigateur",
            l3: "Flashcards visuelles associees aux captures exactes des scenes du film",
        },
        f5: {
            title: "Synthese vocale neuronale ElevenLabs",
            desc: "Maitrisez les accents authentiques et la prosodie naturelle avec les modeles de synthese vocale ElevenLabs de classe mondiale (Roger, Sarah, Charlie), avec un cache audio local ultra-rapide.",
            b1: "ElevenLabs Flash v2.5",
            b2: "Accents realistes",
            b3: "Cache audio",
        },
        f6: {
            title: "Quiz IA et export Anki en 1 clic",
            desc: "Testez-vous avec 6 types de quiz dynamiques generes par IA. Exportez toute votre collection de vocabulaire vers Anki (.txt), Excel/CSV ou des fiches PDF imprimables en quelques secondes.",
            b1: "Export Anki .txt",
            b2: "Quiz interactifs",
            b3: "Impressions PDF",
        },
    },

    showcase: {
        tag: "Experience visuelle",
        title: "Voyez Lectoro AI en action",
        previous: "Capture precedente",
        next: "Capture suivante",
        slideLabel: "Capture d'ecran",
        s1: {
            alt: "Sous-titres cliquables Lectoro AI et panneau de traduction sur une video TED",
            title: "Apprenez avec des sous-titres video cliquables",
        },
        s2: {
            alt: "Extension Chrome Lectoro AI traduisant du texte selectionne et des sous-titres sur X",
            title: "Traduisez du texte sur n'importe quelle page web",
        },
        s3: {
            alt: "Guide de configuration Lectoro AI pour les sous-titres YouTube et Netflix, raccourcis clavier et revisions de flashcards",
            title: "Flux de travail d'apprentissage video et de revision",
        },
        s4: {
            alt: "Traduction de sous-titres de l'anglais vers l'allemand avec explication IA contextuelle sur YouTube via Lectoro AI",
            title: "L'IA explique les expressions en contexte",
        },
        s5: {
            alt: "Flashcard a repetition espacee Lectoro AI avec capture de scene Netflix enregistree",
            title: "Revisez des flashcards video avec le SRS",
        },
        s6: {
            alt: "Barre d'outils Lectoro AI traduisant et lisant des mots selectionnes sur un post X",
            title: "Traduire, ecouter ou demander a l'IA",
        },
        s7: {
            alt: "Traduction anglais-francais et explication d'idiome par Lectoro AI sur une video",
            title: "Comprenez les idiomes pendant le visionnage",
        },
        s8: {
            alt: "Revision quotidienne de flashcards Lectoro AI ouverte a cote du catalogue de streaming Plex",
            title: "Apprenez et revisez le vocabulaire sur Plex",
        },
    },

    comparison: {
        tag: "Analyse detaillee des fonctionnalites",
        title: "Comparez les extensions et applications d'apprentissage des langues",
        titleHighlight: "fonction par fonction",
        subtitle:
            "Comparez Lectoro AI a d'autres approches populaires d'immersion video et d'apprentissage des langues.",
        disclaimer:
            "Base sur les fonctionnalites et tarifs publies ; la disponibilite et les prix peuvent varier.",
        winnerBadge: "Gagnant",
        lectoSubtitle: "Immersion media IA nouvelle generation",
        lrSubtitle: "Extension historique (ex-LLN)",
        lingoSubtitle: "Plateforme de streaming selectionnee",
        featureCol: "Fonctionnalite et capacite",
        previousAriaLabel: "Comparaison precedente",
        slidesAriaLabel: "Diapositives de comparaison",
        goToAriaLabel: "Aller a la comparaison",
        nextAriaLabel: "Comparaison suivante",
        verdictTag: "Verdict",
        verdictTitle:
            "Choisissez le flux de travail qui correspond a votre facon d'apprendre.",
        verdictBody:
            "Lectoro AI combine l'intelligence contextuelle de l'IA, la navigation clavier et les captures video, avec un niveau gratuit disponible pour demarrer.",
        verdictCta: "Ajouter gratuitement a Chrome ->",
        tabs: {
            vsLR: "vs. Language Reactor",
            vsLRbadge: "Concurrent principal",
            vsLingopie: "vs. Lingopie",
            vsLingopieBadge: "Plateforme de streaming",
            vsDuolingo: "vs. Duolingo",
            vsDuolingoBadge: "Application basee sur des cours",
        },
        rows: [
            {
                category: "IA et intelligence",
                feature: "Tuteur IA contextuel (argot et idiomes)",
                description:
                    "Explique en temps reel les references culturelles nuancees, les blagues et les verbes a particule.",
                lectoro: {
                    title: "Tuteur IA",
                    detail: "Explique l'argot, l'humour culturel et la grammaire en 1 phrase claire.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Outils de traduction et de recherche",
                    detail: "Propose des sous-titres bilingues, des outils de dictionnaire et la traduction automatique en Pro.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Sens conversationnels",
                    detail: "Inclut des sens contextuels, des flashcards video et des explications grammaticales.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Fonctionnalites IA par cours",
                    detail: "Les fonctionnalites de conversation IA varient selon le cours, la plateforme et le niveau d'abonnement.",
                    isPositive: false,
                },
            },
            {
                category: "Liberte du contenu",
                feature: "Plateformes prises en charge et lecture web",
                description:
                    "Ou vous pouvez reellement apprendre sans payer plus ni changer d'application.",
                lectoro: {
                    title: "YouTube, Netflix et web entier",
                    detail: "Fonctionne sur les videos ET sur n'importe quelle page web, actualites, Reddit ou X (Twitter).",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Netflix, YouTube, livres et web",
                    detail: "Prend en charge la video, les podcasts, les pages web importees et les livres televerses sur ordinateur.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Catalogue de streaming selectionne",
                    detail: "Propose des milliers de series, films, podcasts et autres contenus d'apprentissage.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Contenu de cours structure",
                    detail: "Se concentre sur des lecons guidees plutot que sur l'apprentissage a travers des pages web arbitraires.",
                    isPositive: false,
                },
            },
            {
                category: "Ergonomie et UX",
                feature: "Flux clavier sans souris",
                description:
                    "Lecture video mains libres et navigation des sous-titres depuis votre canape.",
                lectoro: {
                    title: "Navigation clavier",
                    detail: "Naviguez dans les sous-titres, controlez la lecture et accedez aux outils d'apprentissage depuis le clavier.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Commandes clavier et gestes",
                    detail: "Fournit des raccourcis et des gestes pour une navigation et une lecture video precises.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Lecteur video interactif",
                    detail: "Les mots peuvent etre selectionnes directement dans les sous-titres pendant le visionnage du catalogue.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Exercices interactifs",
                    detail: "Utilise de courts exercices d'ecoute, d'expression orale, d'ecriture et de selection.",
                    isPositive: false,
                },
            },
            {
                category: "Retention de la memoire",
                feature: "Captures de scene automatisees pour Anki",
                description:
                    "Capture des images visuelles pour que votre memoire relie directement les mots aux scenes.",
                lectoro: {
                    title: "Captures de scene automatiques",
                    detail: "Associe le vocabulaire enregistre a des images haute resolution de la scene en cours.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Outils de vocabulaire enregistre",
                    detail: "Permet d'enregistrer du vocabulaire ; les options d'export riches en medias dependent du flux de travail.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Flashcards video",
                    detail: "Cree des flashcards autour du vocabulaire rencontre dans son catalogue video.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Visuels de cours",
                    detail: "Utilise des illustrations de cours plutot que des captures du media de l'apprenant.",
                    isPositive: false,
                },
            },
            {
                category: "Export et propriete",
                feature: "Export Anki et Excel en 1 clic",
                description:
                    "Conservez votre base de donnees de vocabulaire pour toujours, sans verrouillage de plateforme.",
                lectoro: {
                    title: "Anki .txt / CSV / PDF en 1 clic",
                    detail: "Exporte le vocabulaire enregistre dans les formats listes ailleurs sur ce site.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Export de vocabulaire disponible",
                    detail: "Le format d'export et la prise en charge des medias dependent du plan et du flux de travail selectionnes.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Revision du vocabulaire dans l'application",
                    detail: "Les pages officielles du produit mettent l'accent sur les flashcards et les outils de repetition integres.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Progression dans l'application",
                    detail: "Les offres officielles mettent l'accent sur la synchronisation de la progression des cours, pas sur l'export de decks d'etude.",
                    isPositive: false,
                },
            },
            {
                category: "Systeme d'etude",
                feature: "Systeme de repetition espacee (SRS)",
                description:
                    "Algorithme de memoire scientifiquement prouve qui planifie des intervalles de revision optimaux.",
                lectoro: {
                    title: "Repetition espacee integree",
                    detail: "Micro-revisions quotidiennes de 5 min directement dans le popup Chrome. Configuration zero.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Elements enregistres et pratique des expressions",
                    detail: "Inclut des outils de langue enregistree, avec un flux de revision different de celui de Lectoro.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Flashcards et outils de repetition",
                    detail: "Inclut des flashcards video et des fonctions de repetition dans son abonnement.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Pratique personnalisee",
                    detail: "Planifie la pratique dans son parcours d'apprentissage base sur des cours.",
                    isPositive: false,
                },
            },
            {
                category: "Design et performances",
                feature: "Overlay video moderne et rapide",
                description:
                    "Interface esthetique non intrusive qui garde le film au centre.",
                lectoro: {
                    title: "Glassmorphism sombre elegant",
                    detail: "Panneau ultra-rapide et leger qui ne couvre ni ne bloque jamais la video.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Interface navigateur orientee sous-titres",
                    detail: "Ajoute des sous-titres bilingues et des controles d'apprentissage autour des medias pris en charge.",
                    isPositive: false,
                },
                lingopie: {
                    title: "Lecteur de streaming dedie",
                    detail: "Combine la lecture du catalogue avec des sous-titres cliquables et des outils d'apprentissage.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Interface de cours gamifiee",
                    detail: "Utilise des series, des coeurs et des defis ; les offres payantes incluent une option sans publicite.",
                    isPositive: false,
                },
            },
            {
                category: "Cout et valeur",
                feature: "Tarification et acces equitable",
                description:
                    "Tarifs clairs sans pieges d'abonnement ni verrouillage force a long terme.",
                lectoro: {
                    title: "Niveau gratuit + acces abordable",
                    detail: "Immersion gratuite genereuse. Aucune carte bancaire requise pour commencer.",
                    isPositive: true,
                },
                languageReactor: {
                    title: "Fonctionnalites gratuites + Pro",
                    detail: "L'acces de base est gratuit ; des fonctions comme la traduction automatique sont proposees en Pro.",
                    isPositive: false,
                },
                lingopie: {
                    title: "83,88 $ / an affiche",
                    detail: "La page de tarifs officielle propose aussi des options trimestrielles et a vie.",
                    isPositive: false,
                },
                duolingo: {
                    title: "Gratuit + abonnements payants",
                    detail: "Super ajoute sans pub, coeurs illimites et pratique supplementaire ; les prix varient selon le marche.",
                    isPositive: false,
                },
            },
        ],
    },

    hiw: {
        tag: "Prise en main simple",
        title: "Comment apprendre une langue avec Netflix ou YouTube",
        subtitle:
            "Installez l'extension Chrome, apprenez avec des sous-titres cliquables et revisez le vocabulaire enregistre.",
        s1title: "Installez l'extension Chrome",
        s1desc: "Ajoutez Lectoro AI a Chrome en un clic. Configuration zero complication, aucune carte bancaire requise.",
        s2title: "Regardez avec des sous-titres bilingues",
        s2desc: "Lancez votre serie Netflix preferee ou des videos YouTube. Cliquez sur tout mot inconnu dans les sous-titres pour afficher son sens instantanement.",
        s3title: "Revisez des flashcards video",
        s3desc: "Ouvrez le popup de l'extension pendant votre cafe du matin pour une session SRS de 5 minutes. La memoire a long terme fait le reste !",
    },

    pricing: {
        tag: "Tarification transparente",
        title: "Choisissez le plan adapte a vos objectifs",
        subtitle:
            "Commencez totalement gratuitement. Passez a la version superieure quand vous etes pret a debloquer toute la puissance des tuteurs IA et des voix ElevenLabs.",
        mostPopular: "Le plus populaire",
        free: {
            name: "GRATUIT",
            desc: "Pour les spectateurs occasionnels et les debutants",
            forever: "/ a vie",
            cta: "Commencer gratuitement",
            f1: "Sous-titres bilingues pour Netflix et YouTube",
            f2: "Traduction d'articles web integree a la page",
            f3: "Jusqu'a 50 flashcards SRS enregistrees",
            f4: "10 requetes IA / mois",
            f5: "Synthese vocale standard du navigateur",
        },
        basic: {
            name: "BASIC",
            desc: "Pour les apprenants reguliers",
            mo: "/ mois",
            cta: "Commencer l'essai gratuit de 3 jours",
            trial: "ESSAI GRATUIT DE 3 JOURS",
            f1: "Tout ce qui est inclus dans le plan GRATUIT",
            f2: "Jusqu'a 3 000 flashcards SRS dans le cloud",
            f3: "200 requetes IA / mois",
            f4: "20 000 caracteres ElevenLabs / mois",
            f5: "Export en 1 clic vers Anki, PDF et CSV",
            f6: "Tout ce qui est inclus dans le plan GRATUIT",
        },
        pro: {
            name: "PRO",
            desc: "Pour la preparation aux examens et les polyglottes",
            mo: "/ mois",
            cta: "Commencer l'essai Pro",
            trial: "ESSAI GRATUIT DE 3 JOURS",
            f1: "Tout ce qui est inclus dans le plan BASIC",
            f2: "Jusqu'a 10 000 flashcards SRS",
            f3: "1 200 requetes IA / mois",
            f4: "120 000 caracteres ElevenLabs / mois",
            f5: "Generation prioritaire de quiz IA",
        },
    },

    testimonials: {
        starsLabel: "5 etoiles sur 5",
        previous: "Temoignage precedent",
        next: "Temoignage suivant",
        tag: "Temoignages utilisateurs",
        title: "Adore par les passionnes de langues",
        t1: {
            quote: "Je regardais Peaky Blinders sur Netflix et je comprends enfin l'argot britannique ! Je clique sur un mot, l'IA explique la nuance en 1 seconde, et la capture arrive directement sur ma flashcard. Genial.",
            name: "Michael Kowalczyk",
            role: "Ingenieur logiciel et passionne de Netflix",
        },
        t2: {
            quote: "Preparer mon examen CAE n'a jamais ete aussi simple. J'enregistre des collocations avancees depuis des talks TED et des articles academiques, puis je les exporte en un clic vers Anki. J'ai economise plus de 20 heures de saisie.",
            name: "Anna Novak",
            role: "Etudiante en philologie anglaise",
        },
        t3: {
            quote: "La prononciation ElevenLabs sonne tellement naturelle que mon accent s'est nettement ameliore. Une revision rapide de 5 minutes chaque matin est devenue mon rituel prefere.",
            name: "Peter Zielinski",
            role: "Fondateur et polyglotte",
        },
    },

    faq: {
        tag: "Questions frequentes",
        title: "Des questions ? Nous avons les reponses.",
        items: [
            {
                question:
                    "Lectoro AI est-il sans risque pour mes comptes Netflix et YouTube ?",
                answer: "Lectoro AI est une extension Chrome Manifest V3 qui s'execute dans votre navigateur. Elle ne modifie pas votre compte de streaming et n'accede pas aux flux video proteges par DRM ; elle fonctionne avec le contenu de sous-titres disponible sur la page.",
            },
            {
                question: "Le plan gratuit exige-t-il une carte bancaire ?",
                answer: "Non. Vous pouvez installer Lectoro AI et utiliser le plan gratuit sans saisir de details de paiement. Le plan gratuit inclut les sous-titres bilingues, les traductions dans la page et jusqu'a 50 flashcards enregistrees.",
            },
            {
                question:
                    "Comment fonctionne l'essai de trois jours pour Basic et Pro ?",
                answer: "Lorsque vous choisissez un plan payant, vous obtenez trois jours d'acces sans frais. Annulez depuis le tableau de bord de votre compte avant la fin de l'essai pour eviter le premier paiement d'abonnement.",
            },
            {
                question: "Comment fonctionnent les exports Anki et CSV ?",
                answer: "Choisissez Export vers Anki dans la bibliotheque de l'extension pour telecharger un fichier texte formate avec des champs mappes comme le mot, la traduction, la phrase de contexte et le lien de capture d'ecran. Vous pouvez importer ce fichier dans Anki ou exporter votre vocabulaire en CSV.",
            },
            {
                question:
                    "Mes flashcards se synchronisent-elles entre plusieurs ordinateurs ?",
                answer: "Oui. Lorsque vous vous connectez avec votre compte Google, votre vocabulaire enregistre, vos intervalles de repetition espacee et vos parametres se synchronisent entre les ordinateurs pris en charge.",
            },
        ],
    },

    finalCta: {
        title1: "Arretez de memoriser des mots.",
        title2: "Commencez a vivre la langue des aujourd'hui.",
        subtitle:
            "Apprenez l'anglais, l'espagnol, l'allemand, le francais et bien plus a partir des series Netflix, videos YouTube et contenus web que vous aimez deja.",
        cta: "Ajouter Lectoro AI a Chrome",
    },

    footer: {
        tagline:
            "Plateforme d'immersion nouvelle generation avec sous-titres video bilingues, assistant IA, audio ElevenLabs et repetition espacee.",
        product: "Produit",
        legal: "Juridique et aide",
        contact: "Contact",
        subtitlesLink: "Sous-titres Netflix et YouTube",
        translatorLink: "Traducteur web integre a la page",
        flashcardsLink: "Bibliotheque de flashcards SRS",
        pricingLink: "Tarifs et essais",
        privacyLink: "Politique de confidentialite",
        termsLink: "Conditions d'utilisation",
        faqLink: "FAQ",
        copyright: "© 2026 Lectoro AI (lectoroai.com). Tous droits reserves.",
        disclaimer:
            "Netflix et YouTube sont des marques deposees de leurs proprietaires respectifs. Lectoro AI est une extension logicielle independante et n'est pas affiliee a Netflix Inc. ni a Google LLC.",
    },

    meta: {
        homeTitle: "Lectoro AI : sous-titres bilingues pour Netflix et YouTube",
        homeDesc:
            "Apprenez des langues en regardant Netflix, YouTube, Plex et TED. Cliquez sur des sous-titres bilingues pour des explications IA, enregistrez des flashcards video et revisez-les avec le SRS.",
        privacyTitle: "Politique de confidentialite",
        privacyDesc:
            "Politique de confidentialite de l'extension Chrome Lectoro AI et des services web (lectoroai.com). Decouvrez comment nous protegeons vos donnees, traitons les requetes IA et garantissons une transparence totale.",
        termsTitle: "Conditions d'utilisation",
        termsDesc:
            "Conditions d'utilisation de l'extension Chrome Lectoro AI et des services du site (lectoroai.com). Consultez nos regles d'abonnement, les conditions de l'essai de 3 jours et les directives d'usage.",
    },

    privacy: {
        breadcrumbHome: "Accueil",
        breadcrumbCurrent: "Politique de confidentialite",
        badge: "Documentation legale",
        title: "Politique de confidentialite",
        updatedAt:
            "Derniere mise a jour : 26 aout 2026 • Domaine : lectoroai.com",
        googleCallout: {
            title: "Protection Chrome Web Store et divulgation Google Limited Use",
            body: "Lectoro AI respecte strictement les politiques du programme developpeur du Chrome Web Store, y compris les exigences Limited Use. Nous ne vendons, ne monetisons, ni ne transferons jamais vos donnees personnelles, votre historique de navigation ou vos journaux de visionnage a des courtiers en donnees tiers.",
        },
        s1: {
            heading: "1. Introduction et portee",
            p1: 'La presente Politique de confidentialite decrit la maniere dont Lectoro AI ("Lectoro", "nous", "notre"), accessible via lectoroai.com et via l\'extension de navigateur Chrome Lectoro AI, collecte, utilise et protege vos informations.',
            p2: "En installant l'extension ou en utilisant nos services web, vous acceptez la collecte et l'utilisation des informations conformement a cette politique.",
        },
        s2: {
            heading: "2. Informations que nous collectons",
            aLabel: "A. Informations de compte :",
            aText: "Lorsque vous vous connectez via l'authentification Google, nous collectons votre nom, votre adresse e-mail et l'URL de votre avatar de profil uniquement pour l'identification du compte, la verification de licence et la synchronisation cloud entre appareils.",
            bLabel: "B. Donnees d'apprentissage et flashcards :",
            bText: "Les mots enregistres, traductions utilisateur, extraits de phrases contextuelles, scores d'intervalles de repetition espacee (SRS) et resultats de quiz generes sont stockes pour alimenter votre base de vocabulaire personnalisee.",
            cLabel: "C. Journaux techniques et de diagnostic :",
            cText: "Type de navigateur, version de l'extension et traces d'erreurs anonymisees pour maintenir la stabilite de l'extension et deboguer les performances cote client.",
        },
        s3: {
            heading: "3. Ce que nous ne collectons PAS",
            l1: "Nous ne suivons pas votre historique general de navigation et ne surveillons pas les pages web sans lien avec vos demandes de traduction actives.",
            l2: "Nous n'interceptons, ne stockons, ni ne transmettons vos identifiants de compte Netflix, YouTube ou autres.",
            l3: "Nous n'enregistrons pas les frappes clavier ni les champs de saisie sensibles (mots de passe, cartes bancaires).",
            l4: "Nous ne vendons pas vos donnees a des annonceurs ni a des courtiers en donnees commerciaux.",
        },
        s4: {
            heading: "4. Intelligence artificielle et sous-traitants tiers",
            intro: "Pour fournir des fonctionnalites avancees, Lectoro AI s'integre a des partenaires d'infrastructure IA verifies :",
            geminiLabel: "Google Gemini 2.5 AI :",
            geminiText:
                "Lorsque vous demandez une explication IA ou une analyse d'idiome, le mot selectionne et le contexte de phrase environnant sont envoyes a Google Cloud Vertex AI / Gemini API. Google n'utilise pas les donnees soumises via notre API entreprise pour entrainer des modeles IA fondamentaux.",
            elevenlabsLabel: "Synthese vocale IA ElevenLabs :",
            elevenlabsText:
                "Les demandes de prononciation convertissent des chaines de texte isolees en flux audio. Aucun identifiant personnel utilisateur n'est transmis dans les demandes de synthese audio.",
            stripeLabel: "Stripe :",
            stripeText:
                "Le traitement des paiements des abonnements Basic et Pro est gere directement par Stripe. Lectoro ne recoit ni ne stocke jamais votre numero complet de carte bancaire.",
        },
        s5: {
            heading: "5. Stockage, securite et conservation des donnees",
            p1: "Vos enregistrements d'apprentissage et parametres sont stockes localement dans chrome.storage.local de votre navigateur et synchronises de facon securisee via Google Firebase Firestore avec un chiffrement TLS 1.3 en transit et AES-256 au repos.",
            p2: "Les donnees sont conservees tant que votre compte reste actif. Vous pouvez demander a tout moment la suppression definitive de votre compte et de toutes les bases de vocabulaire associees.",
        },
        s6: {
            heading: "6. Droits des utilisateurs (RGPD et CCPA)",
            intro: "En vertu du Reglement general sur la protection des donnees (RGPD) et du California Consumer Privacy Act (CCPA), vous disposez des droits suivants :",
            l1label: "Droit d'acces :",
            l1text: "Demander un export complet de votre base personnelle de flashcards.",
            l2label: "Droit de rectification :",
            l2text: "Modifier ou corriger tout enregistrement de traduction sauvegarde.",
            l3label: "Droit a l'effacement :",
            l3text: "Demander la suppression totale de votre compte utilisateur et des enregistrements cloud associes.",
            l4label: "Droit a la portabilite des donnees :",
            l4text: "Exporter a tout moment tous les mots enregistres vers les formats Anki, CSV ou PDF.",
        },
        s7: {
            heading: "7. Contact et responsable de la protection des donnees",
            p1: "Si vous avez des questions, preoccupations ou demandes de suppression de donnees concernant cette Politique de confidentialite, veuillez contacter notre equipe d'assistance a :",
            teamName: "Equipe Confidentialite Lectoro AI",
            domainLabel: "Domaine officiel :",
            domain: "lectoroai.com",
            emailLabel: "E-mail :",
            email: "lectoroai@gmail.com",
        },
    },

    terms: {
        breadcrumbHome: "Accueil",
        breadcrumbCurrent: "Conditions d'utilisation",
        badge: "Accord juridique",
        title: "Conditions d'utilisation",
        updatedAt:
            "Derniere mise a jour : 26 aout 2026 • Domaine officiel : lectoroai.com",
        s1: {
            heading: "1. Acceptation des conditions",
            p1: "En telechargeant, installant ou utilisant l'extension Chrome Lectoro AI, ou en accedant a notre site web sur lectoroai.com, vous acceptez d'etre lie par les presentes Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
        },
        s2: {
            heading: "2. Description du service et licence",
            p1: "Lectoro AI fournit des outils educatifs d'immersion linguistique, incluant des sous-titres bilingues doubles pour les plateformes video (comme YouTube et Netflix), la traduction contextuelle de texte, les explications Gemini AI, la synthese vocale ElevenLabs et la gestion de flashcards a repetition espacee (SRS).",
            p2: "Nous vous accordons une licence non exclusive, non transferable et revocable pour utiliser Lectoro AI a des fins educatives personnelles et non commerciales, conformement aux presentes Conditions.",
        },
        s3: {
            heading: "3. Abonnements, essai gratuit de 3 jours et facturation",
            aLabel: "A. Plan gratuit :",
            aText: "Disponible a 0 $, sans limite de temps, et offrant les sous-titres bilingues essentiels, les traductions integrees a la page, jusqu'a 50 flashcards SRS et des requetes IA mensuelles de base.",
            bLabel: "B. Plans payants (Basic et Pro) :",
            bText: "Les plans payants sont factures de maniere recurrente, mensuelle ou annuelle, via Stripe. Les fonctionnalites incluent des limites cloud de flashcards etendues, des quotas Gemini AI plus eleves, des caracteres de voix neuronale ElevenLabs et des exports Anki/PDF.",
            cLabel: "C. Essai gratuit de 3 jours :",
            cText: "Les nouveaux abonnes aux plans Basic ou Pro beneficient d'un essai gratuit de 3 jours. Si vous annulez avant la fin de la periode d'essai, votre carte bancaire ne sera pas debitee.",
            dLabel: "D. Annulation et remboursements :",
            dText: "Vous pouvez annuler votre abonnement a tout moment depuis les parametres de votre compte. En cas d'annulation, vous conserverez l'acces jusqu'a la fin de votre cycle de facturation en cours.",
        },
        s4: {
            heading: "4. Utilisation acceptable et conduite",
            intro: "Vous acceptez de ne pas :",
            l1: "Tenter de retroconcevoir, de decompiler ou d'extraire le code source de l'extension.",
            l2: "Automatiser l'abus de nos points de terminaison IA backend (Gemini, ElevenLabs) au-dela d'interactions d'apprentissage humaines classiques.",
            l3: "Contourner la verification d'abonnement ou les protections DRM sur les plateformes video tierces.",
            l4: "Revendre ou redistribuer commercialement les services Lectoro AI ou les bases de donnees de contenu genere sans consentement ecrit explicite.",
        },
        s5: {
            heading: "5. Marques tierces et affiliations",
            p1: "Netflix et YouTube sont des marques deposees de Netflix, Inc. et Google LLC respectivement. Lectoro AI est une extension de navigateur independante developpee pour ameliorer les flux d'apprentissage educatifs des utilisateurs et n'est pas officiellement affiliee, approuvee ou parrainee par Netflix, Inc., Google LLC ou TED Conferences.",
        },
        s6: {
            heading:
                "6. Exclusion de garanties et limitation de responsabilite",
            p1: 'Lectoro AI est fourni "TEL QUEL" et "SELON DISPONIBILITE". Bien que nous nous efforcions d\'assurer une haute disponibilite et des traductions IA precises, nous ne garantissons pas que les traductions ou prononciations vocales seront toujours exemptes d\'erreurs a 100 % ou ininterrompues.',
            p2: "Dans la mesure maximale permise par la loi, Lectoro AI et ses createurs ne seront pas responsables des dommages indirects, accessoires ou consecutifs resultant de votre utilisation du service.",
        },
        s7: {
            heading: "7. Modifications du service et des conditions",
            p1: "Nous nous reservons le droit de modifier ou d'interrompre des fonctionnalites, d'ajuster les prix avec preavis, ou de mettre a jour ces Conditions d'utilisation. L'utilisation continue de Lectoro AI apres ces mises a jour constitue une acceptation des Conditions revisees.",
        },
        s8: {
            heading: "8. Informations de contact",
            p1: "Pour toute question concernant ces Conditions d'utilisation ou la facturation, veuillez contacter :",
            teamName: "Lectoro AI Juridique et Support",
            domainLabel: "Domaine officiel :",
            domain: "lectoroai.com",
            emailLabel: "E-mail :",
            email: "lectoroai@gmail.com",
        },
    },
};
