const text = (pl, en) => ({pl, en});
const item = (pl, en, plDetail, enDetail) => ({label: text(pl, en), detail: text(plDetail, enDetail)});
const figure = (icons, kind, pl, en, plCaption, enCaption, items) => ({icons, kind, title: text(pl, en), caption: text(plCaption, enCaption), items});

export const serviceEditorialPlans = {
    '/software/ai-automation/': {
        opening: 'split', cover: 'scope', toc: 'inline', reference: 'notes', chapters: [
            {id: 'review', title: text('Od wiadomości do zatwierdzonego zapisu', 'From message to approved record'), layout: 'feature', take: [{section: 1, paragraphs: [0, 1]}], exhibitPosition: 'before', exhibit: figure(['mail', 'document', 'person'], 'review', 'Przykład obsługi zapytania', 'Example enquiry review', 'Pracownik sprawdza propozycję na podstawie materiału źródłowego.', 'An employee checks the suggestion against the source material.', [
                item('Źródło', 'Source', 'Wiadomość i załączony dokument.', 'The message and attached document.'),
                item('Propozycja', 'Suggestion', 'Kategoria i odczytane informacje do sprawdzenia.', 'A category and extracted information for review.'),
                item('Decyzja', 'Decision', 'Korekta i zatwierdzenie albo wyjaśnienie braków.', 'Correction and approval, or clarification of missing details.'),
            ])},
            {id: 'scope', title: text('Zadanie, dane i dostęp', 'Task, data and access'), layout: 'split', take: [{section: 0, paragraphs: 'all'}, {section: 1, paragraphs: [2]}]},
            {id: 'failure', title: text('Gdy wynik wymaga uwagi', 'When a result needs attention'), layout: 'aside', take: [{section: 1, paragraphs: [3]}, {section: 2, paragraphs: [0, 1]}]},
            {id: 'handover', title: text('Przekazanie i pierwsza rozmowa', 'Handover and first conversation'), layout: 'prose', take: [{section: 2, paragraphs: [2, 3]}]},
        ],
    },
    '/software/integrations/': {
        opening: 'panorama', cover: 'opening', toc: 'rail', reference: 'inline', chapters: [
            {id: 'connection', title: text('Połączenie używanych narzędzi', 'Connecting the tools in use'), layout: 'prose', take: [{section: 0, paragraphs: 'all'}]},
            {id: 'matching', title: text('Jak powiązać dwa wpisy', 'How two records are matched'), layout: 'ledger', take: [{section: 1, paragraphs: [0, 1]}], exhibitPosition: 'aside', exhibit: figure(['document', 'task', 'link'], 'records', 'Zamówienie i zlecenie realizacji', 'Order and fulfilment job', 'Przykład pokazuje identyfikatory potrzebne do porównania wpisów.', 'The example shows the identifiers needed to compare records.', [
                item('Zamówienie', 'Order', 'Numer zamówienia identyfikuje sprawę w sklepie.', 'The order number identifies the case in the shop.'),
                item('Zlecenie', 'Fulfilment job', 'Zlecenie dotyczy tego samego numeru zamówienia.', 'The job refers to the same order number.'),
                item('Powiązanie', 'Link', 'Zwrócony numer zlecenia zostaje zapisany przy zamówieniu.', 'The returned job number is saved against the order.'),
            ])},
            {id: 'recovery', title: text('Powtórzenia, błędy i uprawnienia', 'Retries, errors and permissions'), layout: 'decisions', take: [{section: 1, paragraphs: [2, 3]}, {section: 2, paragraphs: [0]}]},
            {id: 'operation', title: text('Utrzymanie połączenia', 'Keeping the connection running'), layout: 'aside', take: [{section: 2, paragraphs: [1, 2, 3]}]},
        ],
    },
    '/software/automation/': {
        opening: 'compact', cover: 'opening', toc: 'none', reference: 'notes', chapters: [
            {id: 'pause', title: text('Proces może czekać na decyzję', 'A workflow can wait for a decision'), layout: 'decisions', take: [{section: 1, paragraphs: [0, 1]}], exhibitPosition: 'before', exhibit: figure(['form', 'clock', 'branch'], 'states', 'Zgłoszenie wymagające zgody', 'A request requiring approval', 'Przykładowy proces wznawia pracę po uzgodnionej decyzji.', 'This example workflow continues after the agreed decision.', [
                item('Zgłoszenie', 'Request', 'Formularz uruchamia sprawdzenie danych i utworzenie zadania.', 'The form starts a data check and creates a task.'),
                item('Oczekiwanie', 'Waiting', 'Proces zatrzymuje się do decyzji osoby uprawnionej.', 'The workflow pauses for a decision by an authorised person.'),
                item('Dalszy krok', 'Next step', 'Decyzja uruchamia uzgodnione działanie; brak odpowiedzi może wywołać przypomnienie.', 'The decision starts the agreed action; no response can trigger a reminder.'),
            ])},
            {id: 'workflow', title: text('Od zadania do reguły', 'From task to rule'), layout: 'sequence', take: [{section: 0, paragraphs: 'all'}]},
            {id: 'exceptions', title: text('Zatrzymanie i wznowienie', 'Stopping and resuming'), layout: 'aside', take: [{section: 1, paragraphs: [2, 3]}, {section: 2, paragraphs: [0]}]},
            {id: 'use', title: text('Korzystanie po wdrożeniu', 'Using the workflow after launch'), layout: 'prose', take: [{section: 2, paragraphs: [1, 2, 3]}]},
        ],
    },
    '/software/reporting/': {
        opening: 'essay', cover: 'question', toc: 'inline', reference: 'glossary', chapters: [
            {id: 'question', title: text('Raport odpowiada na pytanie', 'A report answers a question'), layout: 'feature', take: [{section: 0, paragraphs: 'all'}], exhibitPosition: 'after', exhibit: figure(['link', 'clock', 'search'], 'lineage', 'Opłacone zamówienia oczekujące na wysyłkę', 'Paid orders awaiting dispatch', 'Przykładowe zestawienie wymaga uzgodnienia znaczenia danych i ich aktualności.', 'This example report requires agreed definitions and update status.', [
                item('Wspólny numer', 'Shared number', 'Numer zamówienia łączy informacje o płatności i realizacji.', 'The order number connects payment and fulfilment information.'),
                item('Status i czas', 'Status and time', 'Zestawienie pokazuje statusy, czas oczekiwania i ostatnią aktualizację.', 'The report shows statuses, waiting time and the last update.'),
                item('Brak danych', 'Missing data', 'Brak informacji o płatności nie oznacza kwoty zero.', 'Missing payment information does not mean a zero amount.'),
            ])},
            {id: 'definitions', title: text('Źródła i znaczenie danych', 'Sources and data definitions'), layout: 'ledger', take: [{section: 1, paragraphs: [0, 1]}]},
            {id: 'access', title: text('Dostęp i sprawdzenie wyniku', 'Access and validation'), layout: 'split', take: [{section: 1, paragraphs: [2]}, {section: 2, paragraphs: [0, 1]}]},
            {id: 'launch', title: text('Uruchomienie raportu', 'Launching the report'), layout: 'prose', take: [{section: 2, paragraphs: [2]}]},
        ],
    },
    '/software/architecture/': {
        opening: 'feature', cover: 'boundaries', toc: 'rail', reference: 'notes', chapters: [
            {id: 'requirements', title: text('Warunki i decyzje projektowe', 'Conditions and design decisions'), layout: 'aside', take: [{section: 0, paragraphs: 'all'}]},
            {id: 'boundaries', title: text('Granice odpowiedzialności', 'Boundaries of responsibility'), layout: 'split', take: [{section: 1, paragraphs: 'all'}], exhibitPosition: 'aside', exhibit: figure(['check', 'mail', 'search'], 'layers', 'Rezerwacja i powiadomienie', 'Booking and notification', 'Oddzielenie zadań pozwala ponowić wysyłkę bez tworzenia kolejnej rezerwacji.', 'Separating the tasks allows a notification retry without creating another booking.', [
                item('Potwierdzenie terminu', 'Booking confirmation', 'Termin może wymagać natychmiastowego potwierdzenia.', 'The time slot may require immediate confirmation.'),
                item('Powiadomienie', 'Notification', 'Wiadomość można wysłać później i ponowić jej wysyłkę.', 'The message can be sent later and retried.'),
                item('Stan i błędy', 'Status and errors', 'Uzgadniamy obsługę błędów i status widoczny dla użytkownika.', 'We agree error handling and the status shown to the user.'),
            ])},
            {id: 'history', title: text('Decyzje i historia zmian', 'Decisions and change history'), layout: 'reference', take: [{section: 2, paragraphs: 'all'}]},
        ],
    },
    '/software/frontend/': {
        opening: 'split', cover: 'opening', toc: 'none', reference: 'inline', chapters: [
            {id: 'action', title: text('Interfejs wokół zadania', 'An interface built around a task'), layout: 'prose', take: [{section: 0, paragraphs: 'all'}]},
            {id: 'draft', title: text('Niepotwierdzony zapis', 'An unconfirmed save'), layout: 'feature', take: [{section: 1, paragraphs: 'all'}], exhibitPosition: 'before', exhibit: figure(['form', 'clock', 'search'], 'states', 'Formularz po utracie połączenia', 'A form after a connection loss', 'Przykład zachowuje rozróżnienie między wpisanymi danymi a potwierdzonym zapisem.', 'The example distinguishes entered values from a confirmed save.', [
                item('Wpisane dane', 'Entered values', 'Wartości mogą pozostać w formularzu.', 'Values can remain in the form.'),
                item('Brak potwierdzenia', 'Unconfirmed', 'Interfejs pokazuje, że zapis nie został potwierdzony.', 'The interface shows that the save is unconfirmed.'),
                item('Ponowienie', 'Retry', 'Po powrocie połączenia sprawdzamy wcześniejszą próbę przed ponowieniem.', 'After reconnection, the previous attempt is checked before retrying.'),
            ])},
            {id: 'system', title: text('Interfejs jako część systemu', 'The interface as part of the system'), layout: 'split', take: [{section: 2, paragraphs: 'all'}]},
        ],
    },
    '/software/backend/': {
        opening: 'compact', cover: 'rules', toc: 'inline', reference: 'notes', chapters: [
            {id: 'duplicate', title: text('Powtórzona wiadomość o płatności', 'A repeated payment notification'), layout: 'ledger', take: [{section: 1, paragraphs: [0]}], exhibitPosition: 'before', exhibit: figure(['mail', 'key', 'check'], 'history', 'Rozpoznanie powtórzenia', 'Recognising a duplicate', 'Przykład dotyczy ponownie otrzymanego powiadomienia o tej samej płatności.', 'The example concerns a notification received again for the same payment.', [
                item('Powiadomienie', 'Notification', 'System otrzymuje informację o płatności.', 'The system receives payment information.'),
                item('Identyfikator', 'Identifier', 'Identyfikator pozwala rozpoznać znaną operację.', 'An identifier makes the known operation recognisable.'),
                item('Skutek', 'Effect', 'Powtórzenie nie powinno ponownie wywołać tego samego skutku.', 'The duplicate should not apply the same effect again.'),
            ])},
            {id: 'rules', title: text('Kiedy operacja jest zakończona', 'When an operation is complete'), layout: 'aside', take: [{section: 0, paragraphs: 'all'}]},
            {id: 'exceptions', title: text('Transakcje i nieznany wynik', 'Transactions and uncertain outcomes'), layout: 'decisions', take: [{section: 1, paragraphs: [1, 2]}]},
            {id: 'maintenance', title: text('Sprawdzenie i utrzymanie', 'Verification and maintenance'), layout: 'prose', take: [{section: 2, paragraphs: 'all'}]},
        ],
    },
    '/software/custom-software/': {
        opening: 'panorama', cover: 'opening', toc: 'inline', reference: 'inline', chapters: [
            {id: 'roles', title: text('Jedna sprawa, różne uprawnienia', 'One case, different permissions'), layout: 'feature', take: [{section: 0, paragraphs: [0, 1]}], exhibitPosition: 'after', exhibit: figure(['person', 'task', 'search'], 'permissions', 'Przykładowa obsługa zgłoszeń', 'Example request handling', 'Zakres widoczności i zmian ustalamy dla rzeczywistego procesu.', 'We agree visibility and permitted changes for the actual workflow.', [
                item('Klient', 'Customer', 'Widzi własne sprawy.', 'Sees their own cases.'),
                item('Pracownik', 'Employee', 'Otrzymuje przypisane zadania i zmienia ich status.', 'Receives assigned jobs and changes their status.'),
                item('Kierownik', 'Manager', 'Ma przegląd spraw; zakres decyzji wymaga uzgodnienia.', 'Has an overview of cases; decision rights are agreed separately.'),
            ])},
            {id: 'fit', title: text('Zakres aplikacji', 'Application scope'), layout: 'split', take: [{section: 0, paragraphs: [2]}, {section: 1, paragraphs: [0, 1]}]},
            {id: 'ai', title: text('Funkcje AI w procesie', 'AI features in the workflow'), layout: 'aside', take: [{section: 1, paragraphs: [2]}]},
            {id: 'acceptance', title: text('Od ustaleń do przekazania', 'From agreement to handover'), layout: 'sequence', take: [{section: 2, paragraphs: 'all'}]},
        ],
    },
    '/software/websites/': {
        opening: 'essay', cover: 'content', toc: 'none', reference: 'notes', chapters: [
            {id: 'enquiry', title: text('Od oferty do zapytania', 'From service to enquiry'), layout: 'sequence', take: [{section: 0, paragraphs: [0, 1]}], exhibitPosition: 'after', exhibit: figure(['globe', 'document', 'mail'], 'publication', 'Przykładowa droga klienta', 'An example visitor journey', 'Pola formularza i odbiorcę wiadomości ustalamy dla danej firmy.', 'Form fields and the message recipient are agreed for each business.', [
                item('Usługa', 'Service', 'Osoba odwiedzająca wybiera interesującą ją usługę.', 'The visitor selects the service they need.'),
                item('Wymagania', 'Requirements', 'Zapoznaje się z informacjami potrzebnymi do zgłoszenia.', 'They check the information needed for an enquiry.'),
                item('Wiadomość', 'Message', 'Opisuje potrzebę i wysyła zapytanie.', 'They describe their request and send it.'),
            ])},
            {id: 'content', title: text('Treści i działanie strony', 'Content and website behaviour'), layout: 'split', take: [{section: 0, paragraphs: [2]}, {section: 1, paragraphs: [0, 1]}]},
            {id: 'discovery', title: text('Informacje dla wyszukiwarek', 'Information for search engines'), layout: 'aside', take: [{section: 1, paragraphs: [2]}]},
            {id: 'publication', title: text('Sprawdzenie i publikacja', 'Review and publication'), layout: 'prose', take: [{section: 2, paragraphs: 'all'}]},
        ],
    },
    '/software/fullstack/': {
        opening: 'feature', cover: 'contract', toc: 'rail', reference: 'glossary', chapters: [
            {id: 'contract', title: text('Zmiana w całej aplikacji', 'A change across the application'), layout: 'feature', take: [{section: 0, paragraphs: 'all'}, {section: 1, paragraphs: [0, 1, 2]}], exhibitPosition: 'before', exhibit: figure(['screen', 'database', 'mail'], 'layers', 'Od interfejsu do efektu zewnętrznego', 'From interface to external effect', 'Wspólny kontrakt opisuje dane, a przychodzące wartości nadal wymagają walidacji podczas działania.', 'A shared contract describes the data; incoming values still need runtime validation.', [
                item('Interfejs i kontrakt', 'Interface and contract', 'Uzgodnione formaty opisują dane przesyłane do serwera i odpowiedzi.', 'Agreed formats describe data sent to the server and its responses.'),
                item('Reguły i dane', 'Rules and data', 'Serwer sprawdza wejście, a powiązane zmiany zapisuje w transakcji.', 'The server validates input and saves related changes in a transaction.'),
                item('Efekt zewnętrzny', 'External effect', 'Wiadomości i inne efekty zewnętrzne następują po zatwierdzeniu transakcji.', 'Emails and other external effects follow the transaction commit.'),
            ])},
            {id: 'release', title: text('Od zmiany kodu do wdrożenia', 'From code change to deployment'), layout: 'sequence', take: [{section: 2, paragraphs: 'all'}]},
            {id: 'technologies', title: text('Technologie i zakres prac', 'Technologies and scope'), layout: 'reference', reference: 'glossary', take: [{section: 0, facts: 'all'}]},
        ],
    },
    '/sound/studio/': {
        opening: 'compact', cover: 'listening', toc: 'inline', reference: 'notes', chapters: [
            {id: 'mix-master', title: text('Miks i mastering', 'Mixing and mastering'), layout: 'split', take: [{section: 0, paragraphs: [0, 2]}], exhibitPosition: 'after', exhibit: figure(['wave', 'speaker'], 'mix', 'Dwa odrębne zakresy pracy', 'Two separate scopes of work', 'Miks i mastering wyceniamy osobno po zapoznaniu się z materiałem.', 'Mixing and mastering are quoted separately after reviewing the material.', [
                item('Miks', 'Mixing', 'Balans instrumentów i wokalu, czytelność oraz przestrzeń nagrania.', 'The balance of instruments and vocals, clarity and space in the recording.'),
                item('Mastering', 'Mastering', 'Przygotowanie uzgodnionego miksu do planowanego zastosowania.', 'Preparing the agreed mix for its intended use.'),
            ])},
            {id: 'files', title: text('Przygotowanie nagrań', 'Preparing the recordings'), layout: 'prose', take: [{section: 0, paragraphs: [1]}]},
            {id: 'listening', title: text('Kierunek brzmienia', 'Sound direction'), layout: 'aside', take: [{section: 1, paragraphs: 'all'}]},
            {id: 'delivery', title: text('Wersje i przekazanie materiału', 'Versions and delivery'), layout: 'sequence', take: [{section: 2, paragraphs: 'all'}]},
        ],
    },
    '/sound/soundtracks/': {
        opening: 'panorama', cover: 'picture', toc: 'rail', reference: 'inline', chapters: [
            {id: 'picture', title: text('Muzyka do obrazu', 'Music for picture'), layout: 'prose', take: [{section: 0, paragraphs: 'all'}]},
            {id: 'vocal', title: text('Miejsce na wokal', 'Room for a vocal'), layout: 'feature', take: [{section: 1, paragraphs: 'all'}], exhibitPosition: 'aside', exhibit: figure(['music', 'wave', 'document'], 'score', 'Uzgodnienie struktury utworu', 'Agreeing the song structure', 'Strukturę i zakres pracy dopasowujemy do materiału oraz planowanego zastosowania.', 'We agree the structure and scope around the material and its intended use.', [
                item('Punkt wyjścia', 'Starting point', 'Wokal, tekst, tempo, energia i utwory referencyjne pomagają określić kierunek.', 'Vocals, lyrics, tempo, energy and references help establish the direction.'),
                item('Zwrotki i refreny', 'Verses and choruses', 'Struktura uwzględnia miejsce na partie wokalne.', 'The structure leaves room for vocal parts.'),
                item('Wersje i prawa', 'Versions and rights', 'Przed produkcją ustalamy wersje plików, poprawki i warunki wykorzystania.', 'Before production, we agree file versions, revisions and terms of use.'),
            ])},
            {id: 'commission', title: text('Gotowy utwór czy nowe zamówienie', 'An existing track or a new commission'), layout: 'decisions', take: [{section: 2, paragraphs: 'all'}]},
        ],
    },
};
