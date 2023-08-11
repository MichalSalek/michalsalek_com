type RoutesDefinitions = '/'
    | '/software'
    | '/software/architecture'
    | '/software/frontend'
    | '/software/backend'
    | '/sound'
    | '/sound/studio'
    | '/sound/soundtracks'
    | '/contact'


export type AppRoutes = `${RoutesDefinitions}${string | ''}`
