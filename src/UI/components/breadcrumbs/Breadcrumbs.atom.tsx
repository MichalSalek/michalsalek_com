import { AppLinkAtom }                          from '@/src/UI/components/AppLink.atom'
import { useRouter }                            from 'next/router'
import Breadcrumbs                              from 'nextjs-breadcrumbs2'
import { CSSProperties, ReactElement, useMemo } from 'react'
import scss                                     from './breadcrumbs.module.scss'




export const BreadcrumbsAtom = (): ReactElement => {
    const router = useRouter()

    const isHomeRoute = router.asPath === '/'

    const isSitemapRoute = router.asPath === '/sitemap/'

    const visibilityStyle: CSSProperties | undefined = useMemo(() =>
        isHomeRoute || isSitemapRoute ? {visibility: 'hidden'} : undefined, [isHomeRoute, isSitemapRoute])

    return <section
        style={{
            height:  '40px',
            display: 'flex', ...visibilityStyle
        }}
        className={scss.fontSize}
    >
        {!isSitemapRoute &&
            <li
                style={{listStyle: 'none'}}
                className={scss.slashAfter}>
                <AppLinkAtom href={'/sitemap/'}>SITEMAP</AppLinkAtom>
            </li>
        }
        <Breadcrumbs
            labelsToUppercase
            rootLabel="Home"
            listClassName={scss.host}
        />

    </section>
}
