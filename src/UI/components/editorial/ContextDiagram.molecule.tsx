import type {DiagramSpec} from '@/src/content/explanation-plans.mjs';
import {useLocale} from '@/src/i18n/context';
import {DiagramGlyph} from './DiagramGlyph.atom';
import styles from './contextDiagram.module.scss';

export function ContextDiagram({plan, overview = false}: {plan: DiagramSpec; overview?: boolean}) {
    const {locale} = useLocale();
    const Heading = overview ? 'h2' : 'h3';
    const sequential = plan.layout === 'flow';
    const Steps = sequential ? 'ol' : 'ul';
    return <figure className={`${styles.diagram} ${styles[plan.layout]} ${overview ? styles.overview : ''}`} data-context-diagram={plan.layout}>
        <figcaption className={styles.caption}>
            <Heading>{plan.title[locale]}</Heading>
            <p>{plan.caption[locale]}</p>
        </figcaption>
        <Steps className={styles.steps} data-step-count={plan.steps.length}>
            {plan.steps.map((step, index) => <li key={step.title[locale]} className={styles.step}>
                <div className={styles.drawing}>
                    <DiagramGlyph name={step.icon} className={styles.glyph}/>
                    {sequential && <span className={styles.ordinal} aria-hidden="true">{index + 1}</span>}
                </div>
                <strong>{step.title[locale]}</strong>
                <p>{step.detail[locale]}</p>
            </li>)}
        </Steps>
        {plan.exception && <div className={styles.exception} data-diagram-exception>
            <DiagramGlyph name={plan.exception.icon} className={styles.exceptionGlyph}/>
            <div><strong>{plan.exception.title[locale]}</strong><p>{plan.exception.detail[locale]}</p></div>
        </div>}
    </figure>;
}
