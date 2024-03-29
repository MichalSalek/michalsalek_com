import { AppRoute }        from '@/src/layers/core/routes.config'
import Link, { LinkProps }                                        from 'next/link'
import { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react'




type Props = {
    href: AppRoute
    children: ReactNode
} & LinkProps & HTMLAttributes<HTMLAnchorElement>
export const AppLinkAtom = (props: Props): ReactElement => {
    const {href, children}: Props = props


    return <Link {...props} href={href}>{children}</Link>
}
