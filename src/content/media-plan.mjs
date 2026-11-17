import {portfolioProjects, portfolioPath} from './portfolio.mjs';

// Asset IDs are shared by cards, article placements and the library catalogue.
export const cardMedia = {
    ...Object.fromEntries(portfolioProjects.map(project => [portfolioPath(project), project.cover])),
    '/software/websites/': 'ac-websites',
    '/software/custom-software/': 'ac-custom',
    '/software/integrations/': 'ac-integrations',
    '/software/automation/': 'ac-automation',
    '/software/ai-automation/': 'ac-ai',
    '/software/reporting/': 'ac-reporting',
    '/software/fullstack/': 'ac-fullstack',
    '/sound/': 'ac-sound',
};

// Each article has a distinct opening scene, shown only once on that page.
export const heroMedia = {
    '/sound/studio/': 'audio-studio',
    '/sound/soundtracks/': 'audio-soundtracks',
    ...Object.fromEntries(portfolioProjects.map(project => [portfolioPath(project), project.cover])),
    '/software/ai-automation/': 'ac-ai',
    '/software/automation/': 'ac-automation',
    '/software/integrations/': 'ac-integrations',
    '/software/websites/': 'ac-websites',
    '/software/custom-software/': 'ac-custom',
    '/software/reporting/': 'ac-reporting',
    '/software/fullstack/': 'ac-fullstack',
    '/software/architecture/': 'ac-architecture',
    '/software/backend/': 'ac-backend',
    '/software/frontend/': 'ac-frontend',
};

export const articleMedia = {
    '/portfolio/b2b-service-platform/': [
        {asset: 'demo-business-account', section: 0, after: 1, variant: 'wide'},
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
