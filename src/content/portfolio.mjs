// Public, anonymous project summaries. Full case studies are loaded only at build time.
export const portfolioProjects = [
    {
        id: 'b2b-service-platform', slug: 'b2b-service-platform', cover: 'portfolio-b2b', featured: true,
        publishedAt: '2026-11-06', updatedAt: '2026-11-06',
        services: ['/software/custom-software/', '/software/integrations/'],
        pl: {
            title: 'Platforma SaaS do obsługi usług B2B', category: 'Aplikacja SaaS',
            summary: 'Konta firmowe, dostęp do usługi, subskrypcje i rozliczenia w jednym miejscu. Platforma porządkuje codzienną obsługę klientów oraz procesy, które wymagają współpracy kilku systemów.',
            description: 'Realizacja platformy SaaS B2B: konta i uprawnienia, subskrypcje Stripe, integracje, procesy asynchroniczne oraz diagnostyka i utrzymanie aplikacji.',
        },
        en: {
            title: 'A SaaS platform for B2B service management', category: 'SaaS application',
            summary: 'Business accounts, service access, subscriptions and billing in one place. The platform brings everyday customer administration together with workflows that span several systems.',
            description: 'A B2B SaaS case study covering accounts and permissions, Stripe subscriptions, integrations, asynchronous workflows, diagnostics and application maintenance.',
        },
    },
    {
        id: 'shopify-product-experience', slug: 'shopify-product-experience', cover: 'portfolio-commerce', featured: true,
        publishedAt: '2026-11-06', updatedAt: '2026-11-06',
        services: ['/software/integrations/', '/software/custom-software/'],
        pl: {
            title: 'Aplikacja Shopify do interaktywnej prezentacji produktów', category: 'E-commerce',
            summary: 'Rozszerzenie sklepu o nowy sposób oglądania produktów. Od instalacji i przygotowania katalogu po doświadczenie zakupowe na stronie produktu, kontynuację na telefonie przez kod QR i integrację z koszykiem.',
            description: 'Aplikacja Shopify z panelem sprzedawcy, przygotowaniem produktów w tle, interaktywną prezentacją, integracją z koszykiem oraz kontrolą planów i limitów.',
        },
        en: {
            title: 'A Shopify app for interactive product experiences', category: 'E-commerce',
            summary: 'An extension that adds a new way to explore products in an existing store. It covers installation, catalog preparation, the product-page experience, mobile handoff and cart integration.',
            description: 'A Shopify application with merchant administration, background product preparation, interactive presentation, cart integration and subscription capacity controls.',
        },
    },
    {
        id: 'technology-product-website', slug: 'technology-product-website', cover: 'portfolio-website', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-06',
        services: ['/software/websites/', '/software/integrations/'],
        pl: {
            title: 'Strona produktowa dla rozwiązania technologicznego', category: 'Serwis produktowy',
            summary: 'Przystępna prezentacja złożonego produktu: zastosowania, materiały, oferta i kontakt. Serwis łączy rozbudowaną treść z szybkim działaniem i wygodną publikacją kolejnych podstron.',
            description: 'Projekt i rozwój strony produktowej w Next.js: responsywny interfejs, materiały wideo, oferta, formularze, integracje, wydajność i techniczne SEO.',
        },
        en: {
            title: 'A product website for a technology offering', category: 'Product website',
            summary: 'A clear introduction to a complex product through use cases, resources, an offer and contact options. Rich content is supported by fast delivery and a repeatable way to publish new pages.',
            description: 'Design and development of a Next.js product website with responsive layouts, video, an offer, contact integrations, performance work and technical SEO.',
        },
    },
    {
        id: 'editorial-search-analytics', slug: 'editorial-search-analytics', cover: 'portfolio-editorial', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-06',
        services: ['/software/reporting/', '/software/custom-software/'],
        pl: {
            title: 'Aplikacja do monitorowania widoczności artykułów', category: 'Narzędzie redakcyjne',
            summary: 'Historia pozycji artykułów w wynikach wyszukiwania. Redaktorzy śledzą swoje publikacje, porównują zmiany dla różnych języków i urządzeń oraz sprawdzają, które treści wymagają uwagi.',
            description: 'Wdrożenie narzędzia SEO dla redakcji: migracja frontendu do TypeScript, moduły, kontrakty API oraz historia widoczności artykułów według języka i urządzenia.',
        },
        en: {
            title: 'An application for tracking article search visibility', category: 'Editorial tool',
            summary: 'A history of article positions in search results. Editors follow their own publications, compare language and device contexts and identify content that needs attention.',
            description: 'Delivery of an editorial SEO tool with a TypeScript frontend migration, modular code, agreed API contracts and article visibility history by language and device.',
        },
    },
    {
        id: 'service-business-platform', slug: 'service-business-platform', cover: 'portfolio-services', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-06',
        services: ['/software/custom-software/', '/software/fullstack/'],
        pl: {
            title: 'Platforma portfolio i obsługi klientów dla usługodawców', category: 'Produkt SaaS',
            summary: 'Prezentowanie realizacji i codzienna współpraca z klientami w jednym produkcie. Galerie, inspiracje, rozmowy i historia wizyt tworzą wspólny kontekst przed kolejną usługą.',
            description: 'Platforma SaaS dla usługodawców: portfolio, relacje z klientami, wiadomości, historia wizyt i subskrypcje, ze wspólnymi kontraktami API i własną diagnostyką.',
        },
        en: {
            title: 'A portfolio and client platform for service professionals', category: 'SaaS product',
            summary: 'Published work and everyday client collaboration in one product. Galleries, inspirations, conversations and visit history provide a shared context before the next appointment.',
            description: 'A SaaS platform for service professionals with portfolios, client relationships, messaging, visit history and subscriptions, shared API contracts and custom diagnostics.',
        },
    },
    {
        id: 'remote-ai-assistant', slug: 'remote-ai-assistant', cover: 'portfolio-assistant', featured: true,
        publishedAt: '2026-11-06', updatedAt: '2026-11-06',
        services: ['/software/ai-automation/', '/software/automation/'],
        pl: {
            title: 'Zdalny asystent AI do pracy nad projektami', category: 'AI i automatyzacja',
            summary: 'Zadanie wysłane przez czat lub e-mail trafia do asystenta pracującego na własnym komputerze. System łączy modele lokalne i zewnętrzne z rzeczywistą pracą w repozytoriach oraz historią wykonania.',
            description: 'Zdalna platforma asystenta AI z czatem i e-mailem, modelami lokalnymi i zewnętrznymi, trwałą kolejką zadań, adapterami wykonawców oraz obsługą przerw.',
        },
        en: {
            title: 'A remote AI assistant for project work', category: 'AI and automation',
            summary: 'A task sent through chat or email reaches an assistant working on a private workstation. The system connects local and external models with real repository work and a durable execution history.',
            description: 'A remote AI assistant platform combining chat, email, local and external models, durable jobs, executor adapters, execution history and interruption handling.',
        },
    },
    {
        id: '3d-house-planning', slug: '3d-house-planning', cover: 'portfolio-house', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-06',
        services: ['/software/custom-software/', '/software/ai-automation/'],
        pl: {
            title: 'Pracownia 3D do projektowania domu na rzeczywistym terenie', category: 'Projektowanie przestrzenne',
            summary: 'Dom oglądany w kontekście działki, ukształtowania terenu i światła. Rozwijana pracownia łączy przestrzenną koncepcję z wymiarami, wariantami i materiałem do dalszej pracy architekta.',
            description: 'Pracownia koncepcji domu 3D na rzeczywistym terenie: geometria, pomiary, nasłonecznienie, warianty i eksport, z docelowym projektowaniem przez rozmowę.',
        },
        en: {
            title: 'A 3D house design studio on real terrain', category: 'Spatial design',
            summary: 'A home explored in the context of its plot, terrain and daylight. The evolving studio connects a spatial concept with dimensions, alternatives and material for an architect to develop further.',
            description: 'A 3D house concept studio on real terrain with geometry, measurements, sunlight studies, variants and exports, working towards conversational design.',
        },
    },
];

export const portfolioIndex = {
    pl: {title: 'Portfolio projektów', description: 'Wybrane realizacje Atomic Concept: aplikacje SaaS, e-commerce, narzędzia dla firm, AI i projektowanie 3D. Problem, zakres odpowiedzialności i decyzje techniczne.'},
    en: {title: 'Project portfolio', description: 'Selected work presented by Atomic Concept: SaaS, e-commerce, business tools, AI and 3D design. Explore each problem, the scope of responsibility and engineering decisions.'},
};

export const portfolioMessages = {
    pl: {
        title: 'Portfolio', introduction: 'Aplikacje, systemy i strony przedstawione przez problem, który rozwiązują, oraz decyzje, które ukształtowały ich działanie.',
        confidentiality: 'Nazwy produktów i organizacji oraz szczegóły identyfikujące projekty zostały zanonimizowane.',
        confidential: 'Projekt poufny', read: 'Zobacz projekt', all: 'Wszystkie projekty', selected: 'Wybrane realizacje',
        selectedIntro: 'Zobacz, jak potrzeby użytkowników przekładają się na działający produkt i jego zaplecze techniczne.',
        audience: 'Dla kogo', role: 'Zakres odpowiedzialności', navigation: 'W opisie projektu', stack: 'Technologie i zastosowanie',
        stackScope: 'Obszar', stackTools: 'Zastosowanie', previous: 'Poprzedni projekt', next: 'Następny projekt',
        contact: 'Porozmawiajmy o podobnym projekcie', related: 'Usługi związane z tym projektem',
    },
    en: {
        title: 'Portfolio', introduction: 'Applications, systems and websites explained through the problems they address and the decisions that shaped how they work.',
        confidentiality: 'Product and organization names, along with identifying project details, have been anonymized.',
        confidential: 'Confidential project', read: 'Explore the project', all: 'All projects', selected: 'Selected work',
        selectedIntro: 'See how user needs translate into a working product and the engineering behind it.',
        audience: 'Who it serves', role: 'Scope of responsibility', navigation: 'In this case study', stack: 'Technologies and their use',
        stackScope: 'Area', stackTools: 'Use', previous: 'Previous project', next: 'Next project',
        contact: 'Discuss a similar project', related: 'Services relevant to this project',
    },
};

export function portfolioPath(project) { return `/portfolio/${project.slug}/`; }
export function findPortfolioProject(path) { return portfolioProjects.find(project => portfolioPath(project) === path); }
export const portfolioRoutes = ['/portfolio/', ...portfolioProjects.map(portfolioPath)];

export function getPageMetadata(locale, path, pages) {
    if (!['pl', 'en'].includes(locale)) throw new Error(`Unknown locale: ${locale}`);
    const value = path === '/portfolio/' ? portfolioIndex[locale] : findPortfolioProject(path)?.[locale] ?? pages[path];
    if (!value) throw new Error(`Missing page metadata: ${locale} ${path}`);
    return {title: value.title, description: value.description, ...(value.intro ? {intro: value.intro} : {})};
}
