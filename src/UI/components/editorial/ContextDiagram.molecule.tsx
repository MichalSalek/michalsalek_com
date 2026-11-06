import type {DiagramSpec, DiagramIcon} from '@/src/content/explanation-plans.mjs';
import {useLocale} from '@/src/i18n/context';
import {DiagramGlyph} from './DiagramGlyph.atom';
import {RichTextAtom} from '../RichText.atom';
import styles from './contextDiagram.module.scss';

export function DiagramSteps({steps, layout}: {steps: {title: string; detail: string; icon: DiagramIcon}[]; layout: DiagramSpec['layout']}) {
    const sequential = layout === 'flow';
    const List = sequential ? 'ol' : 'ul';
    return <List className={styles.steps} data-step-count={steps.length}>
        {steps.map((step, index) => <li key={`${step.title}-${index}`} className={styles.step}>
            <div className={styles.drawing}>
                <DiagramGlyph name={step.icon} className={styles.glyph}/>
                {sequential && <span className={styles.ordinal} aria-hidden="true">{index + 1}</span>}
            </div>
            <strong><RichTextAtom text={step.title}/></strong>
            <p><RichTextAtom text={step.detail}/></p>
        </li>)}
    </List>;
}

export function ContextDiagram({plan, overview = false}: {plan: DiagramSpec; overview?: boolean}) {
    const {locale} = useLocale();
    const Heading = overview ? 'h2' : 'h3';
    return <figure className={`${styles.diagram} ${styles[plan.layout]} ${overview ? styles.overview : ''}`} data-context-diagram={plan.layout}>
        <figcaption className={styles.caption}>
            <Heading>{plan.title[locale]}</Heading>
            <p>{plan.caption[locale]}</p>
        </figcaption>
        <DiagramSteps steps={plan.steps.map(step => ({title: step.title[locale], detail: step.detail[locale], icon: step.icon}))} layout={plan.layout}/>
        {plan.exception && <div className={styles.exception} data-diagram-exception>
            <DiagramGlyph name={plan.exception.icon} className={styles.exceptionGlyph}/>
            <div><strong>{plan.exception.title[locale]}</strong><p>{plan.exception.detail[locale]}</p></div>
        </div>}
    </figure>;
}
