// Asset IDs are shared by cards, article placements and the library catalogue.
export const cardMedia = {
    '/software/websites/': 'responsive-business-website',
    '/software/custom-software/': 'case-views',
    '/software/integrations/': 'payment-and-fulfilment',
    '/software/automation/': 'application-planning',
    '/software/ai-automation/': 'ai-document-extraction',
    '/software/reporting/': 'operations-report',
    '/software/fullstack/': 'fullstack-development',
    '/sound/': 'sound-wave',
};

// Each article has a distinct opening scene, shown only once on that page.
export const heroMedia = {
    '/software/ai-automation/': 'ai-document-extraction',
    '/software/automation/': 'case-and-task',
    '/software/integrations/': 'payment-and-fulfilment',
    '/software/websites/': 'responsive-business-website',
    '/software/custom-software/': 'service-application',
    '/software/reporting/': 'operations-report',
    '/software/fullstack/': 'fullstack-development',
    '/software/architecture/': 'software-layers',
    '/software/backend/': 'legacy-code',
    '/software/frontend/': 'case-views',
};

export const articleMedia = {
    '/software/custom-software/': [
        {asset: 'record-access', section: 1, after: 0, variant: 'inline'},
        {asset: 'application-planning', section: 2, after: 0, variant: 'wide'},
    ],
    '/software/reporting/': [
        {asset: 'missing-data', section: 1, after: 1, variant: 'inline'},
        {asset: 'report-source-check', section: 2, after: 1, variant: 'wide'},
    ],
    '/software/fullstack/': [
        {asset: 'shared-feature-change', section: 1, after: 1, variant: 'wide'},
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
    '/software/architecture/': [
        {asset: 'shared-feature-change', section: 1, after: 0, variant: 'wide'},
        {asset: 'change-verification', section: 2, after: 2, variant: 'inline'},
    ],
    '/software/backend/': [
        {asset: 'api-and-interface', section: 1, after: 0, variant: 'wide'},
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
    '/software/frontend/': [
        {asset: 'record-access', section: 1, after: 1, variant: 'inline'},
        {asset: 'application-planning', section: 2, after: 0, variant: 'wide'},
    ],
    '/software/ai-automation/': [
        {asset: 'record-access', section: 1, after: 2, variant: 'inline'},
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
    '/software/automation/': [
        {asset: 'application-planning', section: 1, after: 0, variant: 'wide'},
        {asset: 'record-access', section: 1, after: 3, variant: 'inline'},
    ],
    '/software/integrations/': [
        {asset: 'api-and-interface', section: 0, after: 1, variant: 'wide'},
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
    '/software/websites/': [
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
};
