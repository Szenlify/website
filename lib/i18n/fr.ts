import type { Dict } from "./types";
import { en } from "./en";

const lang = {
    ...en.lang,
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
    selectLanguage: "Langue",
};

export const fr: Dict = {
    ...en,
    locale: "fr",

    nav: {
        features: "Fonctionnalites",
        liveDemo: "Demo en direct",
        howItWorks: "Comment ca marche",
        pricing: "Tarifs",
        faq: "FAQ",
        addToChrome: "Ajouter a Chrome",
        addToChromeFree: "Ajouter a Chrome - Gratuit",
        privacyPolicy: "Politique de confidentialite",
        termsOfService: "Conditions d'utilisation",
        signIn: "Se connecter",
        signOut: "Se déconnecter",
        reviews: "Révisions",
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
        reviewsTitle: "Révisions de vocabulaire et cartes mémoire à répétition espacée",
        reviewsDesc:
            "Révisez et mémorisez votre vocabulaire issu de Netflix et YouTube avec des flashcards vidéo et la répétition espacée.",
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

    reviews: {
        badge: "Spaced Repetition",
        title: "Révisions de vocabulaire",
        subtitle: "Révisez les mots enregistrés depuis vos films et séries préférés.",
        breadcrumbHome: "Accueil",
        breadcrumbDashboard: "Tableau de bord",
        breadcrumbReviews: "Révisions",
        loadingTitle: "Chargement des révisions depuis le cloud...",
        loadingSubtitle: "Connexion à Firebase Firestore...",
        dbErrorTitle: "Erreur de base de données",
        retryButton: "Réessayer",
        noWordsTitle: "Aucun mot dans le cloud",
        noWordsSubtitle: "Aucun mot enregistré trouvé dans Firebase pour ce compte.",
        syncHowToTitle: "Comment synchroniser les mots depuis l'extension Lectoro :",
        syncStep1: "Ouvrez l'extension Lectoro dans la barre d'outils Chrome.",
        syncStep2: "Allez dans l'onglet Paramètres / Cloud.",
        syncStep3: "Vérifiez que vous êtes connecté avec le même compte Google",
        syncStep4: "Cliquez sur 'Synchroniser' – vos mots de films seront envoyés sur le cloud.",
        refreshButton: "Actualiser les révisions",
        allCaughtUpTitle: "Aucune carte à réviser !",
        allCaughtUpDesc: "Tout votre vocabulaire est à jour. Les prochaines révisions sont planifiées selon l'algorithme SRS.",
        totalSavedWords: "Mots enregistrés dans la base :",
        practicePromptTitle: "Envie de vous entraîner quand même ?",
        practicePromptDesc: "Vous pouvez réviser tous vos mots dès maintenant sans attendre le minuteur SRS.",
        practiceAllButton: "Pratiquer toutes les cartes",
        checkNewButton: "Vérifier les cartes dues",
        sessionCompleteTitle: "Session terminée !",
        sessionCompleteDesc: "Vous avez terminé toutes les révisions de cette session ! Votre mémoire à long terme est renforcée.",
        exitPracticeButton: "Quitter l'entraînement",
        changeDirection: "Changer le sens d'apprentissage",
        cramBadge: "Entraînement",
        listenAudio: "Écouter la prononciation (W)",
        movieSnapshotAlt: "Capture d'écran du film",
        mobileSwipeHint: "← Glisser : Pas su • Toucher : Retourner • Su : Glisser →",
        flipShowAnswer: "Voir la réponse (Retourner)",
        flipShowQuestion: "Voir la question (Retourner)",
        mobileTapFlip: "Touchez pour retourner",
        rateMemoryPrompt: "Évaluez votre rappel :",
        knowWordPrompt: "Connaissez-vous ce mot ?",
        btnAgain: "Pas su",
        btnGood: "Su",
        badgeAgain: "À REVOIR",
        badgeGood: "CORRECT",
        shortcutPronounce: "prononciation",
        shortcutFlip: "retourner",
        shortcutAgain: "pas su",
        shortcutGood: "su",
        unauthTitle: "Connectez-vous pour accéder à vos révisions",
        unauthDesc: "Révisez et mémorisez le vocabulaire issu de Netflix et YouTube avec la répétition espacée.",
        signInWithGoogle: "Se connecter avec Google",
        signingIn: "Connexion en cours...",
        loggedInAs: "Connecté en tant que :",
        backToHome: "Accueil",
    },
};
