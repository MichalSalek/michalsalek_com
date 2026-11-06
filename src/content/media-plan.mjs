import {portfolioProjects, portfolioPath} from './portfolio.mjs';

// Asset IDs are shared by cards, article placements and the library catalogue.
export const cardMedia = {
    ...Object.fromEntries(portfolioProjects.map(project => [portfolioPath(project), project.cover])),
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
    '/sound/studio/': 'audio-studio',
    '/sound/soundtracks/': 'audio-soundtracks',
    ...Object.fromEntries(portfolioProjects.map(project => [portfolioPath(project), project.cover])),
    '/software/ai-automation/': 'ai-document-extraction',
    '/software/automation/': 'request-automation-flow',
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
    '/portfolio/b2b-service-platform/': [
        {asset: 'demo-business-account', section: 0, after: 0, variant: 'wide'},
    ],
    '/portfolio/shopify-product-experience/': [
        {asset: 'demo-product-catalog', section: 0, after: 0, variant: 'wide'},
    ],
    '/software/custom-software/': [
        {asset: 'record-access', section: 1, after: 0, variant: 'inline'},
    ],
    '/software/reporting/': [
        {asset: 'missing-data', section: 1, after: 1, variant: 'inline'},
    ],
    '/software/fullstack/': [
        {asset: 'change-verification', section: 2, after: 0, variant: 'inline'},
    ],
};
