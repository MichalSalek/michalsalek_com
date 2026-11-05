import type { PagePath, StandardPagePath } from './site.mjs';
import type { Messages } from '@/src/i18n/context';
import {findPortfolioProject, portfolioMessages} from './portfolio.mjs';

export type BreadcrumbItem = {path: PagePath; label: string};

export function getBreadcrumbs(path: PagePath, messages: Messages, locale: 'pl' | 'en' = 'en'): BreadcrumbItem[] {
    const labels: Record<StandardPagePath, string> = {
        '/': messages.breadcrumbHome,
        '/software/architecture/': messages.breadcrumbArchitecture,
        '/software/backend/': messages.breadcrumbBackend,
        '/software/frontend/': messages.breadcrumbFrontend,
        '/software/ai-automation/': messages.breadcrumbAI,
        '/software/automation/': messages.breadcrumbAutomation,
        '/software/integrations/': messages.breadcrumbIntegrations,
        '/software/websites/': messages.breadcrumbWebsites,
        '/software/custom-software/': messages.breadcrumbApplications,
        '/software/reporting/': messages.breadcrumbReports,
        '/software/fullstack/': messages.breadcrumbFullstack,
        '/sound/': messages.breadcrumbSound,
        '/sound/studio/': messages.breadcrumbStudio,
        '/sound/soundtracks/': messages.breadcrumbSoundtracks,
        '/contact/': messages.contact,
        '/sitemap/': messages.sitemap,
    };
    const items: BreadcrumbItem[] = [{path: '/', label: labels['/']}];
    if (path === '/portfolio/' || findPortfolioProject(path)) {
        items.push({path: '/portfolio/', label: portfolioMessages[locale].title});
        const project = findPortfolioProject(path);
        if (project) items.push({path, label: project[locale].title});
        return items;
    }
    // Keep the original visible software hierarchy; its category now lives at /.
    if (path.startsWith('/software/')) items.push({path: '/', label: messages.breadcrumbSoftware});
    if (path.startsWith('/sound/') && path !== '/sound/') items.push({path: '/sound/', label: labels['/sound/']});
    if (path !== '/') items.push({path, label: labels[path as StandardPagePath]});
    return items;
}
