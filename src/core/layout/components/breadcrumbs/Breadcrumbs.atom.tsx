import { useRouter } from 'next/router'
import Breadcrumbs   from 'nextjs-breadcrumbs2'
import scss          from './Breadcrumbs.module.scss'




export const BreadcrumbsAtom = (): JSX.Element => {
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
