// Asset IDs are shared by cards, article placements and the library catalogue.
export const cardMedia = {
    '/software/websites/': 'responsive-business-website',
    '/software/custom-software/': 'service-application',
    '/software/integrations/': 'payment-and-fulfilment',
    '/software/automation/': 'case-and-task',
    '/software/ai-automation/': 'ai-document-extraction',
    '/software/reporting/': 'operations-report',
    '/software/fullstack/': 'fullstack-development',
    '/sound/': 'sound-wave',
};

export const articleMedia = {
    '/software/custom-software/': [
        {asset: 'service-application', section: 0, after: 1, variant: 'wide'},
        {asset: 'record-access', section: 1, after: 0, variant: 'inline'},
        {asset: 'application-planning', section: 2, after: 0, variant: 'wide'},
    ],
    '/software/reporting/': [
        {asset: 'operations-report', section: 0, after: 1, variant: 'wide'},
        {asset: 'missing-data', section: 1, after: 1, variant: 'inline'},
        {asset: 'report-source-check', section: 2, after: 1, variant: 'wide'},
    ],
    '/software/fullstack/': [
        {asset: 'fullstack-development', section: 0, after: 0, variant: 'wide'},
        {asset: 'shared-feature-change', section: 1, after: 1, variant: 'wide'},
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
    '/software/architecture/': [
        {asset: 'software-layers', section: 1, after: 0, variant: 'wide'},
    ],
    '/software/backend/': [
        {asset: 'api-and-interface', section: 1, after: 0, variant: 'wide'},
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
    '/software/frontend/': [
        {asset: 'case-views', section: 0, after: 1, variant: 'wide'},
        {asset: 'application-planning', section: 2, after: 0, variant: 'wide'},
    ],
    '/software/ai-automation/': [
        {asset: 'ai-document-extraction', section: 1, after: 0, variant: 'wide'},
    ],
    '/software/automation/': [
        {asset: 'case-and-task', section: 1, after: 0, variant: 'wide'},
    ],
    '/software/integrations/': [
        {asset: 'payment-and-fulfilment', section: 1, after: 0, variant: 'wide'},
    ],
    '/software/websites/': [
        {asset: 'responsive-business-website', section: 0, after: 0, variant: 'wide'},
    ],
};
