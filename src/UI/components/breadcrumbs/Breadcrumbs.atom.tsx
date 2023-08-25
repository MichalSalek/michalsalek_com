import { useRouter }    from 'next/router'
import Breadcrumbs      from 'nextjs-breadcrumbs2'
import { ReactElement } from 'react'
import scss             from './breadcrumbs.module.scss'




export const BreadcrumbsAtom = (): ReactElement => {
    const router = useRouter()

    const isHomeRoute = router.asPath === '/'

    return <section style={{
        height: '20px'
    }}>
        <Breadcrumbs
            labelsToUppercase
            rootLabel="Home"
            listClassName={scss.host}
            listStyle={isHomeRoute ? {visibility: 'hidden'} : undefined}
        />
    </section>
}
