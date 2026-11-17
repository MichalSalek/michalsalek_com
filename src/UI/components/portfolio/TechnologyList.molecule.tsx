import styles from './technologyList.module.scss';

export function TechnologyList({technologies, label}: {technologies: string[]; label: string}) {
    return <ul className={styles.list} aria-label={label}>
        {technologies.map(technology => <li key={technology}>{technology}</li>)}
    </ul>;
}
