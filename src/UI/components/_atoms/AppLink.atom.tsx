import { AppRoutes }    from '@/src/core/routes.config'
import Link, {LinkProps}                                     from 'next/link'
import { CSSProperties, HTMLProps, ReactElement, ReactNode } from 'react'



type Props = {
    href: AppRoutes
    children: ReactNode
    style?: CSSProperties
} & LinkProps
export const AppLinkAtom = (props: Props): ReactElement => {
    const {href, children}: Props = props


    return <Link {...props} href={href}>{children}</Link>
}
