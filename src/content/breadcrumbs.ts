import type { PagePath } from './site.mjs';
import type { Messages } from '@/src/i18n/context';

export type BreadcrumbItem = {path: PagePath; label: string};

export function getBreadcrumbs(path: PagePath, messages: Messages): BreadcrumbItem[] {
    const labels: Record<PagePath, string> = {
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
    // Keep the original visible software hierarchy; its category now lives at /.
    if (path.startsWith('/software/')) items.push({path: '/', label: messages.breadcrumbSoftware});
    if (path.startsWith('/sound/') && path !== '/sound/') items.push({path: '/sound/', label: labels['/sound/']});
    if (path !== '/') items.push({path, label: labels[path]});
    return items;
}
