import type { EditorialExhibit } from '@/src/content/editorial.mjs';
import { RichTextAtom } from '../RichText.atom';
import {DiagramGlyph} from './DiagramGlyph.atom';
import styles from './editorial.module.scss';

/** The drawing and its selectable explanation stay together in the static HTML. */
export function EditorialExhibitMolecule({exhibit}: {exhibit: EditorialExhibit}) {
    return <figure className={`${styles.exhibit} ${styles[`exhibit_${exhibit.kind}`]}`} data-editorial-exhibit={exhibit.kind}>
        <figcaption>
            <h3>{exhibit.title}</h3>
            <p><RichTextAtom text={exhibit.caption}/></p>
        </figcaption>
        <div className={styles.exhibitBody}>
            <dl className={styles.exhibitItems}>{exhibit.items.map((item, index) => <div key={`${item.label}-${index}`}>
                <div className={styles.exhibitDrawing}><DiagramGlyph name={exhibit.icons?.[index] ?? 'document'} className={styles.exhibitGlyph}/></div>
                <dt><RichTextAtom text={item.label}/></dt>
                <dd><RichTextAtom text={item.detail}/></dd>
            </div>)}</dl>
        </div>
    </figure>;
}
