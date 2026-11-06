// Localized, schematic explanations paired with the existing editorial chapters.
const text = (pl, en) => ({pl, en});
const step = (icon, pl, en, plDetail, enDetail) => ({icon, title: text(pl, en), detail: text(plDetail, enDetail)});
const diagram = (chapter, layout, pl, en, plCaption, enCaption, steps, exception) => ({
    chapter, layout, title: text(pl, en), caption: text(plCaption, enCaption), steps, ...(exception ? {exception} : {}),
});

export const explanationPlans = {
    '/software/ai-automation/': [diagram('failure', 'flow', 'Gdy AI wymaga uwagi', 'When AI needs attention', 'Przykładowa obsługa problemu z usługą AI.', 'Example handling of an AI service problem.', [
        step('document', 'Materiał', 'Material', 'Dokument trafia do odczytu.', 'A document is submitted for reading.'),
        step('code', 'Odpowiedź AI', 'AI response', 'System sprawdza format wyniku.', 'The system checks the response format.'),
        step('person', 'Kontrola', 'Review', 'Pracownik sprawdza wynik i źródło.', 'An employee checks the result and source.'),
    ], step('branch', 'Problem', 'Problem', 'Błąd lub niedostępność kieruje sprawę do ponowienia albo pracownika.', 'An error or outage routes the case for retry or staff attention.'))],
    '/software/integrations/': [diagram('connection', 'flow', 'Formularz i system obsługi', 'Form and customer system', 'Przykładowa wymiana danych między używanymi narzędziami.', 'Example data exchange between existing tools.', [
        step('form', 'Formularz', 'Form', 'Klient wysyła zgłoszenie.', 'A customer submits an enquiry.'),
        step('link', 'Połączenie', 'Connection', 'Integracja przekazuje uzgodnione pola.', 'The integration passes the agreed fields.'),
        step('database', 'Wpis', 'Record', 'Zgłoszenie trafia do systemu obsługi.', 'The enquiry reaches the customer system.'),
    ])],
    '/software/automation/': [diagram('workflow', 'flow', 'Zgłoszenie uruchamia dalszą pracę', 'A request starts the next steps', 'Przykładowa reguła: kompletne zgłoszenie uruchamia zadanie i automatyczne potwierdzenie.', 'Example rule: a complete submission triggers a task and automatic acknowledgement.', [
        step('form', 'Zgłoszenie', 'Submission', 'Wysłanie formularza uruchamia proces.', 'Submitting the form starts the workflow.'),
        step('check', 'Sprawdzenie pól', 'Field validation', 'System sprawdza wymagane informacje.', 'The system checks the required information.'),
        step('task', 'Przydział zadania', 'Assigned task', 'Zadanie trafia do osoby odpowiedzialnej za usługę.', 'A task goes to the person responsible for the service.'),
        step('mail', 'Potwierdzenie', 'Acknowledgement', 'Klient otrzymuje potwierdzenie zgłoszenia.', 'The customer receives an acknowledgement.'),
    ], step('branch', 'Brak danych', 'Missing data', 'Niepełne zgłoszenie wymaga uzupełnienia.', 'An incomplete request needs clarification.'))],
    '/software/reporting/': [diagram('definitions', 'flow', 'Od danych do miary', 'From data to a measure', 'Przykład pokazuje znaczenie definicji i aktualności danych.', 'This example shows why definitions and data freshness matter.', [
        step('database', 'Źródła', 'Sources', 'Dane pochodzą z uzgodnionych narzędzi.', 'Data comes from agreed tools.'),
        step('link', 'Powiązanie', 'Matching', 'Identyfikatory łączą wpisy dotyczące tej samej sprawy.', 'Identifiers link records about the same case.'),
        step('chart', 'Miara', 'Measure', 'Raport stosuje uzgodnioną definicję i okres.', 'The report uses an agreed definition and period.'),
    ], step('clock', 'Brak źródła', 'Missing source', 'Opóźnienie lub brak danych jest oznaczany.', 'A delay or missing data is flagged.'))],
    '/software/architecture/': [diagram('requirements', 'flow', 'Gdzie szukać opóźnienia', 'Where to look for delay', 'Przykładowy przepływ do pomiaru wydajności.', 'Example flow for performance measurement.', [
        step('screen', 'Przeglądarka', 'Browser', 'Użytkownik uruchamia działanie.', 'A user starts an action.'),
        step('server', 'Serwer', 'Server', 'Aplikacja obsługuje żądanie.', 'The application handles the request.'),
        step('database', 'Baza danych', 'Database', 'Zapytanie odczytuje lub zapisuje dane.', 'A query reads or writes data.'),
        step('chart', 'Pomiar', 'Measurement', 'Czasy pomagają wskazać źródło opóźnienia.', 'Timings help locate the delay.'),
    ])],
    '/software/frontend/': [diagram('action', 'flow', 'Zapis widoczny dla użytkownika', 'A save the user can follow', 'Przykładowe stany formularza po wysłaniu.', 'Example form states after submission.', [
        step('form', 'Formularz', 'Form', 'Użytkownik wprowadza dane i zapisuje.', 'The user enters data and saves.'),
        step('clock', 'Oczekiwanie', 'Waiting', 'Widok pokazuje trwającą operację.', 'The view shows the operation is in progress.'),
        step('check', 'Potwierdzenie', 'Confirmation', 'Sukces pojawia się po wiarygodnej odpowiedzi.', 'Success appears after a reliable response.'),
    ], step('branch', 'Błąd', 'Error', 'Komunikat wskazuje problem i kolejny krok.', 'A message identifies the problem and next step.'))],
    '/software/backend/': [diagram('rules', 'flow', 'Co sprawdza serwer', 'What the server checks', 'Przykładowa operacja przesłana przez interfejs.', 'Example operation submitted through an interface.', [
        step('screen', 'Żądanie', 'Request', 'Interfejs przesyła dane operacji.', 'The interface sends operation data.'),
        step('key', 'Uprawnienia', 'Permissions', 'Serwer sprawdza dostęp do działania.', 'The server checks access to the action.'),
        step('check', 'Walidacja', 'Validation', 'Serwer sprawdza wymagane dane.', 'The server validates the required data.'),
        step('database', 'Zmiana', 'Change', 'Dozwolona operacja zapisuje dane.', 'An allowed operation writes the data.'),
    ], step('branch', 'Odmowa', 'Rejection', 'Brak dostępu lub błędne dane zwracają błąd.', 'Missing access or invalid data returns an error.'))],
    '/software/custom-software/': [diagram('fit', 'hub', 'Elementy aplikacji', 'Parts of an application', 'Schemat pokazuje możliwy zakres aplikacji biznesowej.', 'A schematic view of possible business application components.', [
        step('screen', 'Ekrany', 'Screens', 'Użytkownicy wykonują uzgodnione zadania.', 'Users carry out agreed tasks.'),
        step('key', 'Dostęp', 'Access', 'Role określają dostępne działania.', 'Roles determine permitted actions.'),
        step('database', 'Dane', 'Data', 'System przechowuje potrzebne informacje.', 'The system stores the information needed.'),
        step('link', 'Połączenia', 'Connections', 'Aplikacja może korzystać z usług zewnętrznych.', 'The application can use external services.'),
    ])],
    '/software/websites/': [diagram('discovery', 'flow', 'Jak treść trafia do wyszukiwarki', 'How content reaches search', 'Schemat elementów wspierających odczyt strony, bez obietnicy pozycji.', 'Schematic elements that support discovery, without a ranking guarantee.', [
        step('document', 'Treść strony', 'Page content', 'Pełna treść opisuje ofertę.', 'Complete content describes the offer.'),
        step('link', 'Adresy i linki', 'URLs and links', 'Osobne adresy i odnośniki prowadzą do stron.', 'Separate URLs and links lead to pages.'),
        step('globe', 'Mapa i metadane', 'Sitemap and metadata', 'Pomagają systemom interpretować witrynę.', 'They help systems interpret the website.'),
        step('search', 'Odczyt', 'Discovery', 'Wyszukiwarka może odczytać informacje.', 'A search engine can read the information.'),
    ])],
    '/software/fullstack/': [diagram('release', 'flow', 'Kontrola zmiany', 'Checking a change', 'Przykładowe punkty kontroli od kodu do działającej wersji.', 'Example checks from code to the running version.', [
        step('code', 'Zmiana', 'Change', 'Kod przechodzi przegląd i kontrolę typów.', 'Code receives review and type checks.'),
        step('check', 'Testy', 'Tests', 'Scenariusze sprawdzają uzgodnione zachowanie.', 'Scenarios check the agreed behaviour.'),
        step('upload', 'Wdrożenie', 'Deployment', 'Publikacja uwzględnia konfigurację i migracje.', 'Release accounts for configuration and migrations.'),
        step('search', 'Weryfikacja', 'Verification', 'Sprawdzana jest działająca wersja i jej błędy.', 'The running version and its errors are checked.'),
    ])],
    '/sound/studio/': [diagram('listening', 'hub', 'Rozmowa o brzmieniu', 'Discussing the sound', 'Przykład wskazania elementów do porównania z referencją.', 'Example elements to compare with a reference track.', [
        step('music', 'Referencja', 'Reference', 'Utwór pokazuje wybrany kierunek brzmienia.', 'A track illustrates a desired sound.'),
        step('wave', 'Rytm i bas', 'Rhythm and bass', 'Można wskazać relację stopy i basu.', 'The kick and bass relationship can be identified.'),
        step('speaker', 'Wokal i przestrzeń', 'Vocal and space', 'Można omówić czytelność wokalu i ilość przestrzeni.', 'Vocal clarity and the amount of space can be discussed.'),
    ])],
    '/sound/soundtracks/': [diagram('picture', 'flow', 'Muzyka do obrazu', 'Music for picture', 'Przykład dopasowania muzyki do krótkiego filmu z narracją.', 'Example of shaping music for a short narrated film.', [
        step('screen', 'Obraz', 'Picture', 'Długość i montaż wyznaczają ramy utworu.', 'Length and edit set the bounds of the track.'),
        step('speaker', 'Narracja', 'Narration', 'Aranżacja zostawia miejsce na głos.', 'The arrangement leaves room for the voice.'),
        step('wave', 'Akcenty', 'Accents', 'Muzyka podkreśla wybrane momenty.', 'Music emphasizes selected moments.'),
        step('music', 'Zakończenie', 'Ending', 'Utwór kończy się wraz z ostatnim kadrem.', 'The track ends with the closing frame.'),
    ])],
    '/portfolio/b2b-service-platform/': [diagram('delivery-work', 'flow', 'Zadanie poza żądaniem', 'Work outside the request', 'Schemat opisanego podziału obsługi operacji na zasobach.', 'Schematic of the described separation of asset operations.', [
        step('screen', 'Panel', 'Dashboard', 'Użytkownik korzysta z panelu usługi.', 'A user works in the service dashboard.'),
        step('task', 'Operacja', 'Operation', 'Praca nad zasobem jest obsługiwana asynchronicznie.', 'Asset work is handled asynchronously.'),
        step('clock', 'Dalsze wykonanie', 'Continued execution', 'Operacja nie musi zakończyć się w jednym żądaniu.', 'The operation need not finish in one request.'),
    ])],
    '/portfolio/shopify-product-experience/': [diagram('integration', 'flow', 'Przygotowanie produktu w tle', 'Preparing a product in the background', 'Schemat opisanych zasad miejsc w planie i obsługi ponowień.', 'Schematic of the described plan capacity and retry handling.', [
        step('task', 'Przygotowanie', 'Preparation', 'Produkt jest kierowany do przygotowania.', 'A product is sent for preparation.'),
        step('database', 'Miejsce w planie', 'Plan capacity', 'Rezerwacja uwzględnia dostępne miejsce.', 'A reservation accounts for available capacity.'),
        step('key', 'Klucz operacji', 'Operation key', 'Klucz ogranicza skutki ponownych zgłoszeń.', 'A key limits the effect of repeated submissions.'),
        step('clock', 'Synchronizacja', 'Synchronization', 'Zadanie może być ponawiane poza pojedynczym żądaniem.', 'Work can be retried outside a single request.'),
    ])],
    '/portfolio/technology-product-website/': [diagram('site-foundations', 'flow', 'Od treści do strony', 'From content to page', 'Schemat technicznego sposobu publikacji opisanego serwisu.', 'Schematic of the website’s described publishing architecture.', [
        step('document', 'Treść', 'Content', 'Informacje są oddzielone od komponentów.', 'Content is separate from components.'),
        step('layers', 'Komponenty', 'Components', 'Wspólne układy prezentują różne treści.', 'Shared layouts present different content.'),
        step('code', 'Generowanie', 'Generation', 'Statyczny eksport przygotowuje strony.', 'A static export prepares the pages.'),
        step('globe', 'Publikacja', 'Publication', 'Cloudflare Pages udostępnia wygenerowane strony.', 'Cloudflare Pages serves the generated pages.'),
    ])],
    '/portfolio/editorial-search-analytics/': [diagram('editorial-work', 'flow', 'Praca z artykułem', 'Working with an article', 'Schemat opisanej ścieżki w narzędziu redakcyjnym.', 'Schematic of the described editorial workflow.', [
        step('person', 'Redaktor', 'Editor', 'Otwiera listę swoich artykułów.', 'Opens a list of their articles.'),
        step('document', 'Artykuł', 'Article', 'Wybiera publikację do sprawdzenia.', 'Selects a publication to inspect.'),
        step('search', 'Zapytania', 'Queries', 'Przegląda powiązane zapytania.', 'Reviews associated search queries.'),
        step('chart', 'Historia', 'History', 'Porównuje kolejne pomiary pozycji.', 'Compares successive position measurements.'),
    ])],
    '/portfolio/service-business-platform/': [diagram('service-work', 'hub', 'Kontekst obsługi klienta', 'Customer service context', 'Schemat opisanych elementów pracy usługodawcy i klienta.', 'Schematic of the described work of the professional and client.', [
        step('person', 'Relacja', 'Relationship', 'Połączone konta tworzą kontekst współpracy.', 'Connected accounts provide the relationship context.'),
        step('mail', 'Wiadomości', 'Messages', 'Klient i usługodawca mogą rozmawiać.', 'The client and professional can exchange messages.'),
        step('document', 'Inspiracje', 'Inspiration', 'Klient może przekazywać inspiracje.', 'The client can share inspiration.'),
        step('clock', 'Historia wizyt', 'Visit history', 'Zapisy pomagają wrócić do wcześniejszych ustaleń.', 'Records help revisit earlier details.'),
    ])],
    '/portfolio/remote-ai-assistant/': [diagram('recovery', 'flow', 'Wynik i dostarczenie', 'Result and delivery', 'Schemat rozdzielonych stanów opisanego asystenta.', 'Schematic of the assistant’s separate states.', [
        step('task', 'Wykonanie', 'Execution', 'Zadanie ma własny stan wykonania.', 'The job has its own execution state.'),
        step('database', 'Zapis wyniku', 'Stored result', 'Wynik pozostaje zapisany lokalnie.', 'The result remains stored locally.'),
        step('mail', 'Dostarczenie', 'Delivery', 'Wysłanie odpowiedzi ma osobny stan.', 'Sending the response has a separate state.'),
    ], step('branch', 'Błąd wysyłki', 'Delivery failure', 'Nie oznacza potrzeby ponowienia wykonanej pracy.', 'It does not mean completed work must be repeated.'))],
    '/portfolio/3d-house-planning/': [diagram('exploration', 'hub', 'Sprawdzanie koncepcji', 'Examining a concept', 'Schemat dostępnych sposobów oglądania modelu domu.', 'Schematic of available ways to inspect the house model.', [
        step('house', 'Model na terenie', 'Model on site', 'Dom można oglądać z różnych stron.', 'The house can be viewed from different angles.'),
        step('layers', 'Przekrój', 'Section', 'Przekrój lub ukrycie kondygnacji odsłania wnętrze.', 'A section or hidden floor reveals the interior.'),
        step('search', 'Pomiary', 'Measurements', 'Narzędzie pozwala mierzyć odległości.', 'The tool measures distances.'),
        step('clock', 'Światło', 'Light', 'Data i godzina zmieniają warunki oświetlenia.', 'Date and time change the lighting conditions.'),
    ])],
};

export const overviewExplanationPlans = {
    '/': [diagram('overview', 'hub', 'Jak usługi łączą się z pracą firmy', 'How services connect to business work', 'Przykładowe obszary współpracy wokół jednego zadania.', 'Example areas of work around a business task.', [
        step('form', 'Zadanie', 'Task', 'Firma opisuje potrzebę lub obecny proces.', 'A business describes a need or existing process.'),
        step('screen', 'Aplikacja', 'Application', 'Ekrany i dane wspierają pracę użytkowników.', 'Screens and data support users’ work.'),
        step('link', 'Integracje', 'Integrations', 'Połączenia wymieniają dane między narzędziami.', 'Connections exchange data between tools.'),
        step('branch', 'Automatyzacja i AI', 'Automation and AI', 'Reguły lub AI mogą wspierać wybrane kroki.', 'Rules or AI can support selected steps.'),
    ])],
    '/sound/': [diagram('overview', 'split', 'Dwie drogi pracy z dźwiękiem', 'Two ways to work with sound', 'Przegląd usług zależnie od materiału i celu.', 'Overview of services by material and purpose.', [
        step('wave', 'Twoje nagrania', 'Your recordings', 'Ślady mogą zostać zmiksowane i poddane masteringowi.', 'Tracks can be mixed and mastered.'),
        step('music', 'Nowa muzyka', 'New music', 'Muzyka może powstać do wokalu lub obrazu.', 'Music can be created for vocals or picture.'),
    ])],
    '/portfolio/': [diagram('overview', 'hub', 'Od potrzeb do działania', 'From needs to working tools', 'Przekrój obszarów przedstawionych w opisach projektów.', 'A cross-section of areas represented in the project descriptions.', [
        step('person', 'Użytkownicy', 'Users', 'Projekty odpowiadają na różne zadania odbiorców.', 'Projects address different users’ tasks.'),
        step('screen', 'Interfejsy', 'Interfaces', 'Panele i strony udostępniają informacje oraz działania.', 'Dashboards and websites provide information and actions.'),
        step('database', 'Dane i reguły', 'Data and rules', 'Systemy przechowują dane i obsługują procesy.', 'Systems store data and handle processes.'),
        step('link', 'Połączenia', 'Connections', 'Wybrane projekty współpracują z innymi usługami.', 'Selected projects work with other services.'),
    ])],
};
