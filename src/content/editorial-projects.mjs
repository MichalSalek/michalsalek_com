const text = (pl, en) => ({pl, en});
const item = (pl, en, detailPl, detailEn) => ({label: text(pl, en), detail: text(detailPl, detailEn)});

/** @type {Record<string, import('./editorial.mjs').EditorialPlan>} */
export const projectEditorialPlans = {
    '/portfolio/b2b-service-platform/': {
        opening: 'essay', cover: 'account', toc: 'inline', reference: 'glossary', roleAt: 'account',
        chapters: [
            {
                id: 'account', title: text('Osoba i konto firmowe', 'Person and business account'), layout: 'aside',
                take: [{section: 0, paragraphs: 'all', items: 'all'}], exhibitPosition: 'aside',
                exhibit: {
                    icons: ['person', 'key', 'database', 'server'], kind: 'permissions', title: text('Do kogo należą zasoby?', 'Who owns the resources?'),
                    caption: text('Schemat pokazuje różnicę między osobą korzystającą z panelu a kontem, którego dotyczą zasoby i rozliczenia.', 'The diagram distinguishes the person using the panel from the account associated with resources and billing.'),
                    items: [
                        item('Osoba', 'Person', 'Loguje się i wykonuje dozwolone operacje.', 'Signs in and performs permitted actions.'),
                        item('Konto firmowe', 'Business account', 'Stanowi kontekst dostępu do zasobów.', 'Provides the context for access to resources.'),
                        item('Zasoby konta', 'Account resources', 'Obejmują plan, limity, klucze i dokumenty rozliczeniowe.', 'Include the plan, capacity, keys and billing documents.'),
                        item('Obsługa usługi', 'Service administration', 'Sprawdza konta i ustawienia planów.', 'Reviews accounts and plan settings.'),
                    ],
                },
            },
            {id: 'delivery-work', title: text('Od ustaleń do codziennej obsługi', 'From decisions to daily operations'), layout: 'prose', take: [{section: 1, paragraphs: 'all'}]},
            {
                id: 'diagnostics', title: text('Audyt i diagnozowanie incydentów', 'Audit and incident diagnosis'), layout: 'decisions', reference: 'notes',
                take: [{section: 2, paragraphs: 'all', items: 'all'}], exhibitPosition: 'after',
                exhibit: {
                    icons: ['document', 'search'], kind: 'records', title: text('Dwa rodzaje zapisu', 'Two kinds of record'),
                    caption: text('Zestawienie wyjaśnia, jaką rolę pełnią zapisy audytowe i informacje o incydentach w obsłudze platformy.', 'This comparison explains the different roles of audit records and incident information in operating the platform.'),
                    items: [
                        item('Zdarzenie audytowe', 'Audit event', 'Pomaga prześledzić wybrane działanie.', 'Helps trace a selected action.'),
                        item('Incydent', 'Incident', 'Zapisuje informacje potrzebne do diagnozy problemu.', 'Records information needed to diagnose a problem.'),
                    ],
                },
            },
        ],
    },
    '/portfolio/shopify-product-experience/': {
        opening: 'compact', cover: 'storefront', toc: 'rail', reference: 'notes', roleAt: 'merchant',
        chapters: [
            {
                id: 'merchant', title: text('Przygotowanie produktów', 'Preparing products'), layout: 'sequence',
                take: [{section: 0, paragraphs: [0], items: [0, 1, 2]}, {section: 1, paragraphs: 'all'}], exhibitPosition: 'before',
                exhibit: {
                    icons: ['task', 'clock', 'search', 'globe'], kind: 'states', title: text('Gotowość produktu', 'Product readiness'),
                    caption: text('Stany ilustrują pracę sprzedawcy od wyboru produktu do jego udostępnienia w sklepie.', 'These states illustrate the merchant’s work from selecting a product to making it available in the store.'),
                    items: [
                        item('Wybrany', 'Selected', 'Produkt został wskazany w katalogu.', 'The product has been selected in the catalog.'),
                        item('Oczekuje na miejsce', 'Waiting for capacity', 'Przygotowanie może ruszyć po zwolnieniu miejsca w planie.', 'Preparation can begin when plan capacity becomes available.'),
                        item('Wymaga uwagi', 'Needs attention', 'Sprzedawca może sprawdzić stan i ponowić zadanie.', 'The merchant can check the state and retry the task.'),
                        item('Widoczny w sklepie', 'Visible in the store', 'Gotowy produkt może zostać udostępniony kupującym.', 'A prepared product can be made available to shoppers.'),
                    ],
                },
            },
            {
                id: 'storefront', title: text('Na stronie produktu i telefonie', 'On the product page and phone'), layout: 'feature',
                take: [{section: 0, paragraphs: [1], items: [3]}],
            },
            {id: 'integration', title: text('Integracja i zadania w tle', 'Integration and background tasks'), layout: 'reference', take: [{section: 2, paragraphs: 'all', items: 'all'}]},
        ],
    },
    '/portfolio/technology-product-website/': {
        opening: 'split', cover: 'media', toc: 'inline', reference: 'inline', roleAt: 'publishing',
        chapters: [
            {
                id: 'paths', title: text('Ścieżki przez serwis', 'Paths through the website'), layout: 'ledger',
                take: [{section: 0, paragraphs: [0], items: [0, 1, 2]}],
            },
            {
                id: 'media', title: text('Treść, obraz i wideo', 'Text, images and video'), layout: 'split',
                take: [{section: 0, paragraphs: [1]}, {section: 2, items: [0, 3]}], exhibitPosition: 'aside',
                exhibit: {
                    icons: ['document', 'screen', 'wave', 'screen'], kind: 'publication', title: text('Materiały na różnych ekranach', 'Content across screen sizes'),
                    caption: text('Ilustracja układu pokazuje, jak tekst i materiały wizualne mogą układać się na wąskim i szerokim ekranie.', 'This layout illustration shows how text and visual material can be arranged on narrow and wide screens.'),
                    items: [
                        item('Tekst', 'Text', 'Opisuje zastosowania i ofertę.', 'Explains the uses and offer.'),
                        item('Obraz', 'Image', 'Uzupełnia informacje wizualne.', 'Adds visual context.'),
                        item('Wideo', 'Video', 'Przedstawia produkt w ruchu.', 'Presents the product in motion.'),
                        item('Szerokość ekranu', 'Screen width', 'Układ dostosowuje rozmieszczenie materiałów.', 'The layout adapts the arrangement of content.'),
                    ],
                },
            },
            {
                id: 'publishing', title: text('Przygotowanie i publikacja stron', 'Preparing and publishing pages'), layout: 'sequence',
                take: [{section: 0, items: [3]}, {section: 1, paragraphs: 'all'}], exhibitPosition: 'after',
                exhibit: {
                    icons: ['screen', 'check', 'globe'], kind: 'records', title: text('Droga zmian do publikacji', 'Changes on the way to publication'),
                    caption: text('Etapy pokazują miejsca, w których można przygotować i sprawdzić zmiany przed udostępnieniem ich odbiorcom.', 'These stages show where changes can be prepared and checked before reaching visitors.'),
                    items: [
                        item('Podgląd', 'Preview', 'Przestrzeń do sprawdzania przygotowanych zmian.', 'A place to review prepared changes.'),
                        item('Staging', 'Staging', 'Środowisko do kontroli przed publikacją.', 'An environment for checks before release.'),
                        item('Produkcja', 'Production', 'Osobna publikacja dla odbiorców serwisu.', 'A separate release for website visitors.'),
                    ],
                },
            },
            {id: 'site-foundations', title: text('Podstawy techniczne serwisu', 'Website foundations'), layout: 'prose', reference: 'glossary', take: [{section: 2, paragraphs: 'all', items: [1, 2]}]},
        ],
    },
    '/portfolio/editorial-search-analytics/': {
        opening: 'feature', cover: 'article-history', toc: 'inline', reference: 'glossary', roleAt: 'opening',
        chapters: [
            {
                id: 'article-history', title: text('Powrót do artykułu', 'Returning to an article'), layout: 'aside',
                take: [{section: 0, paragraphs: 'all', items: 'all'}], exhibitPosition: 'after',
                exhibit: {
                    icons: ['document', 'screen', 'chart'], kind: 'history', title: text('Historia w porównywalnym kontekście', 'History in a comparable context'),
                    caption: text('Schemat przedstawia strukturę porównania kolejnych pomiarów dla tego samego języka i urządzenia.', 'This structural illustration shows how successive measurements can be compared for the same language and device.'),
                    items: [
                        item('Artykuł i zapytanie', 'Article and query', 'Określają obserwowany materiał.', 'Identify the material being observed.'),
                        item('Język i urządzenie', 'Language and device', 'Wyznaczają kontekst porównania.', 'Set the context for comparison.'),
                        item('Kolejne pomiary', 'Successive measurements', 'Pozwalają śledzić zmianę w czasie.', 'Allow changes to be followed over time.'),
                    ],
                },
            },
            {id: 'editorial-work', title: text('Narzędzie w pracy redakcji', 'A tool for editorial work'), layout: 'sequence', take: [{section: 1, paragraphs: 'all', items: 'all'}]},
            {id: 'interface-contracts', title: text('Interfejs i kontrakty danych', 'Interface and data contracts'), layout: 'decisions', reference: 'notes', take: [{section: 2, paragraphs: 'all', items: 'all'}]},
        ],
    },
    '/portfolio/service-business-platform/': {
        opening: 'panorama', cover: 'opening', toc: 'inline', reference: 'notes', roleAt: 'product-care',
        chapters: [
            {
                id: 'relationship', title: text('Od portfolio do relacji', 'From portfolio to relationship'), layout: 'split',
                take: [{section: 0, paragraphs: 'all', items: [0, 1]}],
            },
            {id: 'service-work', title: text('Publiczna prezentacja i codzienna obsługa', 'Public presentation and daily service'), layout: 'ledger', take: [{section: 0, items: [2]}, {section: 1, paragraphs: [0, 1], items: 'all'}]},
            {id: 'product-care', title: text('Rozwój i utrzymanie produktu', 'Developing and maintaining the product'), layout: 'prose', take: [{section: 1, paragraphs: [2]}]},
            {
                id: 'system-integrity', title: text('Spójność danych i diagnostyka', 'Data consistency and diagnostics'), layout: 'reference', reference: 'glossary',
                take: [{section: 2, paragraphs: 'all', items: 'all'}], exhibitPosition: 'after',
                exhibit: {
                    icons: ['document', 'screen', 'server'], kind: 'layers', title: text('Wspólne kontrakty aplikacji i API', 'Shared app and API contracts'),
                    caption: text('Aplikacja i API korzystają ze sprawdzanych kopii tych samych definicji.', 'The app and API use checked copies of the same definitions.'),
                    items: [
                        item('Wspólne definicje', 'Shared definitions', 'Obejmują typy, walidatory i definicje API.', 'They cover types, validators and API definitions.'),
                        item('Aplikacja', 'App', 'Korzysta z definicji przy wymianie danych z API.', 'It uses the definitions when exchanging data with the API.'),
                        item('API', 'API', 'Korzysta z tych samych definicji po stronie serwera.', 'It uses the same definitions on the server.'),
                    ],
                },
            },
        ],
    },
    '/portfolio/remote-ai-assistant/': {
        opening: 'compact', cover: 'processes', toc: 'rail', reference: 'table', roleAt: 'processes',
        chapters: [
            {
                id: 'one-job', title: text('Dwa kanały, jedno zadanie', 'Two channels, one job'), layout: 'feature',
                take: [{section: 0, paragraphs: 'all', items: 'all'}],
            },
            {
                id: 'processes', title: text('Procesy na stanowisku operatora', 'Processes on the operator’s workstation'), layout: 'ledger',
                take: [{section: 1, paragraphs: 'all', items: 'all'}], exhibitPosition: 'aside',
                exhibit: {
                    icons: ['mail', 'screen', 'code', 'database'], kind: 'layers', title: text('Podział obsługi', 'Division of responsibilities'),
                    caption: text('Osobne procesy obsługują kanały kontaktu i wykonanie, korzystając z lokalnego zapisu zadań.', 'Separate processes handle contact channels and execution using locally stored jobs.'),
                    items: [
                        item('Poczta', 'Email', 'Obsługuje korespondencję.', 'Handles correspondence.'),
                        item('HTTP i czat', 'HTTP and chat', 'Obsługują komunikację przeglądarkową.', 'Handle browser communication.'),
                        item('Wykonanie', 'Execution', 'Kieruje pracę do wykonawcy.', 'Routes work to an executor.'),
                        item('Zapis lokalny', 'Local storage', 'Przechowuje zadania i ich stany.', 'Stores jobs and their states.'),
                    ],
                },
            },
            {id: 'recovery', title: text('Stan, odzyskiwanie i wykonawcy', 'State, recovery and executors'), layout: 'decisions', reference: 'inline', take: [{section: 2, paragraphs: 'all', items: 'all'}]},
        ],
    },
    '/portfolio/3d-house-planning/': {
        opening: 'feature', cover: 'site-and-house', toc: 'rail', reference: 'glossary', roleAt: 'opening',
        chapters: [
            {
                id: 'site-and-house', title: text('Dom w kontekście terenu', 'A house in the context of its site'), layout: 'feature',
                take: [{section: 0, paragraphs: 'all', items: 'all'}], exhibitPosition: 'aside',
                exhibit: {
                    icons: ['house', 'layers', 'screen'], kind: 'terrain', title: text('Teren, przekrój i wspólny kadr', 'Terrain, section and a shared view'),
                    caption: text('Ilustracja objaśnia przestrzenny kontekst domu oraz sposoby oglądania i porównywania jego wariantów.', 'This illustration explains the spatial context of the house and ways to inspect and compare its variants.'),
                    items: [
                        item('Teren', 'Terrain', 'Bryła jest oglądana na tle ukształtowania działki.', 'The house is viewed against the shape of the site.'),
                        item('Przekrój', 'Section', 'Odsłania relacje wewnątrz modelu.', 'Reveals relationships within the model.'),
                        item('Ten sam kadr', 'Same view', 'Pozwala porównywać warianty z zachowaniem widoku.', 'Allows variants to be compared while preserving the view.'),
                    ],
                },
            },
            {id: 'exploration', title: text('Oglądanie, pomiary i światło', 'Exploration, measurement and light'), layout: 'aside', take: [{section: 1, paragraphs: [0], items: [0, 1]}]},
            {id: 'architect-material', title: text('Materiały do pracy architekta', 'Material for an architect'), layout: 'prose', take: [{section: 1, paragraphs: [1], items: [2]}, {section: 2, paragraphs: [1]}]},
            {
                id: 'geometry', title: text('Model i obliczenia', 'Model and calculations'), layout: 'split',
                take: [{section: 2, paragraphs: [0], items: 'all'}], exhibitPosition: 'after',
                exhibit: {
                    icons: ['code', 'house', 'chart'], kind: 'layers', title: text('Jeden opis, dwa zastosowania', 'One description, two uses'),
                    caption: text('Schemat przedstawia powiązanie danych wymiarowych z modelem przestrzennym i zestawieniami.', 'The diagram shows how dimensional data relates to the spatial model and reports.'),
                    items: [
                        item('Opis wymiarów', 'Dimensional description', 'Wspólne dane opisują geometrię domu.', 'Shared data describes the geometry of the house.'),
                        item('Scena', 'Scene', 'Dane zasilają model i operacje na bryłach.', 'The data feeds the model and solid geometry operations.'),
                        item('Obliczenia', 'Calculations', 'Te same dane służą do walidacji i zestawień.', 'The same data supports validation and reports.'),
                    ],
                },
            },
        ],
    },
};
