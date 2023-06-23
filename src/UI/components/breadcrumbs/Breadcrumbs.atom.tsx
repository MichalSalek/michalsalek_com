import { useRouter }    from 'next/router'
import Breadcrumbs      from 'nextjs-breadcrumbs2'
import { ReactElement } from 'react'
import scss             from 'src/UI/components/breadcrumbs/breadcrumbs.module.scss'




export const BreadcrumbsAtom = (): ReactElement => {
    const router = useRouter()

    const isHomeRoute = router.asPath === '/'

    return <Breadcrumbs
        labelsToUppercase
        rootLabel="Home"
        listClassName={scss.host}
        activeItemClassName={scss.active}
        listStyle={isHomeRoute ? {visibility: 'hidden'} : undefined}
    />
}
