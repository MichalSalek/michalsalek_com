// Public, anonymous project summaries. Full case studies are loaded only at build time.
export const portfolioProjects = [
    {
        id: 'b2b-service-platform', slug: 'b2b-service-platform', cover: 'portfolio-b2b', featured: true,
        publishedAt: '2026-11-06', updatedAt: '2026-11-17',
        services: ['/software/custom-software/', '/software/integrations/', '/software/fullstack/'],
        technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Stripe'],
        pl: {
            title: 'Platforma SaaS dla klientów B2B', category: 'Aplikacja SaaS',
            summary: 'Panel dla firm korzystających z technologii wirtualnej przymierzalni. Łączy dostęp do usługi, subskrypcje, limity i rozliczenia.',
            description: 'Realizacja platformy SaaS B2B: konta i uprawnienia, subskrypcje Stripe, integracje, procesy asynchroniczne oraz diagnostyka i utrzymanie aplikacji.',
        },
        en: {
            title: 'A SaaS platform for B2B customers', category: 'SaaS application',
            summary: 'A portal for businesses using virtual try-on technology, bringing service access, subscriptions, usage limits and billing together.',
            description: 'A B2B SaaS case study covering accounts and permissions, Stripe subscriptions, integrations, asynchronous workflows, diagnostics and application maintenance.',
        },
    },
    {
        id: 'shopify-product-experience', slug: 'shopify-product-experience', cover: 'portfolio-commerce', featured: true,
        publishedAt: '2026-11-06', updatedAt: '2026-11-17',
        services: ['/software/integrations/', '/software/custom-software/'],
        technologies: ['Shopify', 'React', 'TypeScript', 'GraphQL', 'PostgreSQL'],
        pl: {
            title: 'Wirtualna przymierzalnia obuwia dla Shopify', category: 'E-commerce',
            summary: 'Aplikacja łączy przygotowanie katalogu przez sprzedawcę z przymierzaniem obuwia na stronie produktu i zakupem w sklepie.',
            description: 'Aplikacja Shopify z panelem sprzedawcy, przygotowaniem produktów w tle, interaktywną prezentacją, integracją z koszykiem oraz kontrolą planów i limitów.',
        },
        en: {
            title: 'Virtual shoe try-on for Shopify', category: 'E-commerce',
            summary: 'An app connecting merchant catalog preparation with virtual shoe try-on on the product page and checkout in the store.',
            description: 'A Shopify application with merchant administration, background product preparation, interactive presentation, cart integration and subscription capacity controls.',
        },
    },
    {
        id: 'technology-product-website', slug: 'technology-product-website', cover: 'portfolio-website', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-17',
        services: ['/software/websites/', '/software/integrations/'],
        technologies: ['Next.js', 'React', 'TypeScript', 'Cloudflare'],
        pl: {
            title: 'Strona produktu do wirtualnego przymierzania', category: 'Serwis produktowy',
            summary: 'Serwis przedstawia zastosowania technologii 3D i AR w e-commerce, prezentuje ofertę oraz prowadzi do kontaktu.',
            description: 'Projekt i rozwój strony produktowej w Next.js: responsywny interfejs, materiały wideo, oferta, formularze, integracje, wydajność i techniczne SEO.',
        },
        en: {
            title: 'A website for a virtual try-on product', category: 'Product website',
            summary: 'A website explaining applications of 3D and AR technology in e-commerce, presenting the offer and connecting visitors with the team.',
            description: 'Design and development of a Next.js product website with responsive layouts, video, an offer, contact integrations, performance work and technical SEO.',
        },
    },
    {
        id: 'editorial-search-analytics', slug: 'editorial-search-analytics', cover: 'portfolio-editorial', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-17',
        services: ['/software/reporting/', '/software/custom-software/'],
        technologies: ['React', 'TypeScript'],
        pl: {
            title: 'Aplikacja do monitorowania widoczności artykułów', category: 'Narzędzie redakcyjne',
            summary: 'Historia pozycji artykułów w wynikach wyszukiwania. Redaktorzy śledzą swoje publikacje, porównują zmiany dla różnych języków i urządzeń oraz sprawdzają, które treści wymagają uwagi.',
            description: 'Rozwój frontendu narzędzia SEO dla redakcji: migracja do TypeScript, moduły, kontrakty API i historia wyników według języka i urządzenia.',
        },
        en: {
            title: 'An application for tracking article search visibility', category: 'Editorial tool',
            summary: 'A history of article positions in search results. Editors follow their own publications, compare language and device contexts and identify content that needs attention.',
            description: 'Frontend development for an editorial SEO tool: a TypeScript migration, modular code, agreed API contracts and search ranking history by language and device.',
        },
    },
    {
        id: 'service-business-platform', slug: 'service-business-platform', cover: 'portfolio-services', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-17',
        services: ['/software/custom-software/', '/software/fullstack/'],
        technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Stripe'],
        pl: {
            title: 'Portfolio i obsługa klientek dla stylistek paznokci', category: 'Produkt SaaS',
            summary: 'Portfolio, inspiracje, wiadomości i historia wizyt pomagają stylistkom pokazywać prace oraz utrzymywać kontakt z klientkami.',
            description: 'Platforma SaaS dla usługodawców: portfolio, relacje z klientami, wiadomości, historia wizyt i subskrypcje, ze wspólnymi kontraktami API i własną diagnostyką.',
        },
        en: {
            title: 'Portfolio and client management for nail stylists', category: 'SaaS product',
            summary: 'Portfolios, inspiration, messages and appointment history help nail stylists share their work and stay connected with clients.',
            description: 'A SaaS platform for service professionals with portfolios, client relationships, messaging, visit history and subscriptions, shared API contracts and custom diagnostics.',
        },
    },
    {
        id: 'remote-ai-assistant', slug: 'remote-ai-assistant', cover: 'portfolio-assistant', featured: true,
        publishedAt: '2026-11-06', updatedAt: '2026-11-17',
        services: ['/software/ai-automation/', '/software/automation/'],
        technologies: ['Python', 'FastAPI', 'SQLite', 'Ollama'],
        pl: {
            title: 'Zdalny asystent AI do pracy nad projektami', category: 'Wewnętrzny projekt AI',
            summary: 'Zadania wysłane przez czat lub e-mail trafiają do asystenta na komputerze operatora. Asystent może pracować w repozytoriach i zachowuje historię wykonania.',
            description: 'Zdalna platforma asystenta AI z czatem i e-mailem, modelami lokalnymi i zewnętrznymi, trwałą kolejką zadań, adapterami wykonawców oraz obsługą przerw.',
        },
        en: {
            title: 'A remote AI assistant for project work', category: 'Internal AI project',
            summary: 'Tasks sent by chat or email reach an assistant on the operator’s workstation. It can work in repositories and keeps an execution history.',
            description: 'A remote AI assistant platform combining chat, email, local and external models, durable jobs, executor adapters, execution history and interruption handling.',
        },
    },
    {
        id: '3d-house-planning', slug: '3d-house-planning', cover: 'portfolio-house', featured: false,
        publishedAt: '2026-11-06', updatedAt: '2026-11-17',
        services: ['/software/custom-software/', '/software/ai-automation/'],
        technologies: ['TypeScript', 'Three.js', 'WebAssembly', 'Manifold'],
        pl: {
            title: 'Pracownia 3D do projektowania domu na rzeczywistym terenie', category: 'Wewnętrzny projekt 3D',
            summary: 'Dom oglądany w kontekście działki, ukształtowania terenu i światła. Rozwijana pracownia łączy przestrzenną koncepcję z wymiarami, wariantami i materiałem do dalszej pracy architekta.',
            description: 'Pracownia koncepcji domu 3D na rzeczywistym terenie: geometria, pomiary, nasłonecznienie, warianty i eksport, z docelowym projektowaniem przez rozmowę.',
        },
        en: {
            title: 'A 3D house design studio on real terrain', category: 'Internal 3D project',
            summary: 'A home explored in the context of its plot, terrain and daylight. The evolving studio connects a spatial concept with dimensions, alternatives and material for an architect to develop further.',
            description: 'A 3D house concept studio on real terrain with geometry, measurements, sunlight studies, variants and exports, working towards conversational design.',
        },
    },
];

export const portfolioIndex = {
    pl: {title: 'Portfolio projektów', description: 'Portfolio Michała Sałka, programisty full-stack prowadzącego Atomic Concept: aplikacje SaaS, e-commerce, AI i 3D. Zakres pracy i decyzje techniczne.'},
    en: {title: 'Project portfolio', description: 'The portfolio of Michał Sałek, full-stack developer and lead of Atomic Concept: SaaS, e-commerce, AI and 3D. Explore responsibilities and engineering decisions.'},
};

export const portfolioMessages = {
    pl: {
        title: 'Portfolio', introduction: 'Opisy projektów pokazują, co robi każde rozwiązanie i za którą część odpowiadał Michał Sałek.',
        confidentiality: 'Nazwy klientów i produktów pozostają poufne. Karty wskazują projekty wewnętrzne.',
        confidential: 'NDA', technologies: 'Technologie', read: 'Zobacz projekt', all: 'Wszystkie projekty', selected: 'Wybrane realizacje',
        selectedIntro: 'W opisach znajdziesz wkład Michała, użyte technologie i decyzje związane z działaniem aplikacji.',
        audience: 'Dla kogo', role: 'Zakres odpowiedzialności', navigation: 'W opisie projektu', stack: 'Technologie i zastosowanie',
        stackScope: 'Obszar', stackTools: 'Zastosowanie', previous: 'Poprzedni projekt', next: 'Następny projekt',
        contact: 'Porozmawiajmy o podobnym projekcie', related: 'Usługi związane z tym projektem',
    },
    en: {
        title: 'Portfolio', introduction: 'The case studies show what each solution does and which parts Michał Sałek was responsible for.',
        confidentiality: 'Client and product names remain confidential. Cards identify internal projects.',
        confidential: 'NDA', technologies: 'Technologies', read: 'Explore the project', all: 'All projects', selected: 'Selected work',
        selectedIntro: 'Each case explains Michał’s contribution, the technologies used and decisions that shaped how the application works.',
        audience: 'Who it serves', role: 'Scope of responsibility', navigation: 'In this case study', stack: 'Technologies and their use',
        stackScope: 'Area', stackTools: 'Use', previous: 'Previous project', next: 'Next project',
        contact: 'Discuss a similar project', related: 'Services relevant to this project',
    },
};

export function portfolioPath(project) { return `/portfolio/${project.slug}/`; }
export function findPortfolioProject(path) { return portfolioProjects.find(project => portfolioPath(project) === path); }
export function projectsForService(locale, path) {
    return portfolioProjects.filter(project => project.services.includes(path))
        .sort((first, second) => Number(second.services[0] === path) - Number(first.services[0] === path))
        .slice(0, 2).map(project => ({path: portfolioPath(project), title: project[locale].title}));
}
export const portfolioRoutes = ['/portfolio/', ...portfolioProjects.map(portfolioPath)];

export function getPageMetadata(locale, path, pages) {
    if (!['pl', 'en'].includes(locale)) throw new Error(`Unknown locale: ${locale}`);
    const value = path === '/portfolio/' ? portfolioIndex[locale] : findPortfolioProject(path)?.[locale] ?? pages[path];
    if (!value) throw new Error(`Missing page metadata: ${locale} ${path}`);
    return {title: value.title, description: value.description, ...(value.intro ? {intro: value.intro} : {})};
}
