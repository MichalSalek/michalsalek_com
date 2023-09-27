import { AppRoute, appRoutes }          from '@/src/layers/core/routes.config'
import { GeneralPageProps }             from '@/src/pages/_app'
import { AppLinkAtom }                  from '@/src/UI/components/AppLink.atom'
import { appStyles }                    from '@/src/UI/styles/constants'
import Container                        from '@mui/material/Container'
import Stack                            from '@mui/material/Stack'
import Typography                       from '@mui/material/Typography'
import { ReactElement, useMemo, Fragment } from 'react'




const slashRegex = /\//ig
const getSlicedString = (str: string) => str.slice(1, str.length - 1)

const PAGE_TITLE = 'Sitemap'

export default function Page() {

    const getMappedAppRoutes: (ReactElement | undefined) = useMemo(
        () => {
            let lastDetectedCategory = ''
            const getFirstCategoryFromRoute = (route: AppRoute) => route.split('/')[1]

            return <>
                <ol style={{
                    listStyle: 'decimal-leading-zero',
                    ...appStyles.appFontFamily,
                    marginLeft: '3rem'
                }}>
                    {
                        appRoutes.map((route: AppRoute) => {
                            const isFirstCategoryRoute = getFirstCategoryFromRoute(route) === getSlicedString(route)
                            if (route === '/') return undefined
                            const shouldBreakLine: boolean = lastDetectedCategory !== getFirstCategoryFromRoute(route)
                            lastDetectedCategory = getFirstCategoryFromRoute(route)
                            return <Fragment key={route}>
                                {shouldBreakLine && <br/>}
                                <li style={isFirstCategoryRoute ? {
                                    marginLeft: '-1rem'
                                } : undefined}>
                                    <AppLinkAtom href={route}>
                                        <Typography variant="body2">
                                            {getSlicedString(route).replace(slashRegex, ' ')}
                                        </Typography>
                                    </AppLinkAtom>

                                </li>
                            </Fragment>
                        })
                    }
                </ol>
            </>
        }, [])



    return <Container>
        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>

        <Stack
            flexDirection={'column'}
            alignItems={'flex-start'}
        >
            {getMappedAppRoutes}
        </Stack>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
