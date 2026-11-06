import type { EditorialExhibit } from '@/src/content/editorial.mjs';
import { RichTextAtom } from '../RichText.atom';
import styles from './editorial.module.scss';

/** A diagram's labels and explanations remain ordinary, selectable HTML. */
export function EditorialExhibitMolecule({exhibit}: {exhibit: EditorialExhibit}) {
    return <figure className={`${styles.exhibit} ${styles[`exhibit_${exhibit.kind}`]}`} data-editorial-exhibit={exhibit.kind}>
        <figcaption>
            <h3>{exhibit.title}</h3>
            <p><RichTextAtom text={exhibit.caption}/></p>
        </figcaption>
        <div className={styles.exhibitBody}>
            {(exhibit.kind === 'terrain' || exhibit.kind === 'mix' || exhibit.kind === 'score' || exhibit.kind === 'history') &&
                <svg className={styles.exhibitArt} viewBox="0 0 560 160" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                    {exhibit.kind === 'terrain' && <><path d="M0 145 C65 120 90 55 155 80 S245 150 310 100 S400 30 465 65 S520 100 560 65"/><path d="M0 115 C65 90 90 25 155 50 S245 120 310 70 S400 0 465 35 S520 70 560 35"/><path d="M0 160 C65 135 90 70 155 95 S245 165 310 115 S400 45 465 80 S520 115 560 80"/><path d="M248 80 V51 L280 37 L312 51 V80 M270 80 V63 H290 V80"/></>}
                    {exhibit.kind === 'mix' && <><path d="M0 80 H560"/><path d="M0 80 C18 80 18 42 36 42 S54 118 72 118 S90 56 108 56 S126 104 144 104 S162 30 180 30 S198 130 216 130 S234 57 252 57 S270 103 288 103 S306 24 324 24 S342 136 360 136 S378 48 396 48 S414 112 432 112 S450 62 468 62 S486 98 504 98 S530 80 560 80"/></>}
                    {exhibit.kind === 'score' && <><path d="M0 40 H560 M0 60 H560 M0 80 H560 M0 100 H560 M0 120 H560"/><path d="M100 60 V112 M190 40 V92 M300 80 V132 M410 50 V102"/><circle cx="94" cy="112" r="8"/><circle cx="184" cy="92" r="8"/><circle cx="294" cy="132" r="8"/><circle cx="404" cy="102" r="8"/></>}
                    {exhibit.kind === 'history' && <><path d="M24 40 H536 M24 80 H536 M24 120 H536"/><path d="M95 25 V55 M280 65 V95 M465 105 V135"/></>}
                </svg>}
            <dl className={styles.exhibitItems}>{exhibit.items.map((item, index) => <div key={`${item.label}-${index}`}>
                <dt><RichTextAtom text={item.label}/></dt>
                <dd><RichTextAtom text={item.detail}/></dd>
            </div>)}</dl>
        </div>
    </figure>;
}
