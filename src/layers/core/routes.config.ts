export const appRoutes = [
    '/',
    '/software/',
    '/software/architecture/',
    '/software/frontend/',
    '/software/backend/',
    '/sound/',
    '/sound/studio/',
    '/sound/soundtracks/',
    '/contact/',
    '/sitemap/'
] as const

type RoutesDefinitions = typeof appRoutes[number];

export type AppRoute = `${RoutesDefinitions}${string | ''}`
