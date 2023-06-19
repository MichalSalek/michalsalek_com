import { useRouter }    from 'next/router'
import Breadcrumbs      from 'nextjs-breadcrumbs2'
import { ReactElement } from 'react'
import scss             from 'src/UI/components/breadcrumbs/Breadcrumbs.module.scss'




export const BreadcrumbsAtom = (): ReactElement => {
    const router = useRouter()

    if (router.asPath === '/') {
        return <></>
    }


    return <Breadcrumbs
        labelsToUppercase
        rootLabel="Home"
        listClassName={scss.host}
        activeItemClassName={scss.active}
    />
}