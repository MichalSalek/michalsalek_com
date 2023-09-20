import { AppRoute, appRoutes }          from '@/src/layers/core/routes.config'
import { GeneralPageProps }             from '@/src/pages/_app'
import { AppLinkAtom }                  from '@/src/UI/components/AppLink.atom'
import Container                        from '@mui/material/Container'
import Stack                            from '@mui/material/Stack'
import Typography                       from '@mui/material/Typography'
import React, { ReactElement, useMemo } from 'react'




const PAGE_TITLE = 'Sitemap'


export default function Page() {

    const createMappableAppRoutes: (ReactElement|undefined)[] = useMemo(() => {
        let lastDetectedCategory = ''
        const getFirstCategoryFromRoute = (route: AppRoute) => route.split('/')[1]
        return appRoutes.map((route: AppRoute) => {
                if (route === '/') return undefined
                const shouldBreakLine: boolean = lastDetectedCategory !== getFirstCategoryFromRoute(route)
                lastDetectedCategory = getFirstCategoryFromRoute(route)
                return <React.Fragment key={route}>
                    {shouldBreakLine && <br/>}
                    <AppLinkAtom href={route}>
                        <Typography variant="body2">{route}</Typography>
                    </AppLinkAtom>
                </React.Fragment>
            }
        )
    }, [])




    return <Container>
        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>
        
        <Stack
            flexDirection={'column'}
            alignItems={'flex-start'}
        >
            {createMappableAppRoutes.map((el) => el)}
        </Stack>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
