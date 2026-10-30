import { Fragment } from 'react';
import { AppLinkAtom } from './AppLink.atom';

// A small, explicit vocabulary for authored emphasis and links, without HTML injection.
export const RichTextAtom = ({text}: {text: string}) => <>{text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https:\/\/|\/)[^)]+\))/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(((?:https:\/\/|\/)[^)]+)\)$/);
    if (link) return link[2].startsWith('/')
        ? <AppLinkAtom key={index} href={link[2]}>{link[1]}</AppLinkAtom>
        : <a key={index} href={link[2]}>{link[1]}</a>;
    return <Fragment key={index}>{part}</Fragment>;
})}</>;
