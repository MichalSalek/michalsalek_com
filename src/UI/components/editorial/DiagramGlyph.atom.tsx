import type {DiagramIcon} from '@/src/content/explanation-plans.mjs';

/** Small editorial drawings share geometry, rather than imitating product UI. */
export function DiagramGlyph({name, className}: {name: DiagramIcon; className?: string}) {
    return <svg viewBox="0 0 128 104" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 94H116" opacity=".18"/>
        {['form', 'document', 'task', 'check', 'upload'].includes(name) && <>
            <path d="M35 15H80L95 30V87H35Z" fill="var(--site-surface)"/>
            <path d="M80 15V30H95M47 43H80M47 54H70M47 65H66" opacity=".55"/>
            {name === 'form' && <><path d="M26 31H32M26 49H32M26 67H32"/><path d="M48 75H78" strokeWidth="5" opacity=".15"/></>}
            {name === 'document' && <><path d="M44 7H89L104 22V77" opacity=".4"/><path d="M47 75H77"/></>}
            {name === 'task' && <><path d="M48 10H78V23H48Z" fill="var(--site-tint)"/><path d="M69 76L77 84L94 65" strokeWidth="3"/></>}
            {name === 'check' && <><path d="M73 59L101 59V82L87 92L73 82Z" fill="var(--site-tint)"/><path d="M80 74L85 79L95 67" strokeWidth="3"/></>}
            {name === 'upload' && <><path d="M84 89V64M75 73L84 64L93 73" strokeWidth="3"/><path d="M73 90H96"/></>}
        </>}
        {name === 'mail' && <><path d="M24 39L64 14L104 39V85H24Z" fill="var(--site-surface)"/><path d="M39 47V25H89V47" fill="var(--site-tint)"/><path d="M24 39L64 65L104 39M24 85L53 59M104 85L75 59M49 36H79M49 46H69"/><path d="M76 14L81 8M88 19L96 16" opacity=".45"/></>}
        {name === 'database' && <><path d="M31 28V77C31 91 97 91 97 77V28" fill="var(--site-surface)"/><ellipse cx="64" cy="28" rx="33" ry="12" fill="var(--site-tint)"/><path d="M31 46C31 60 97 60 97 46M31 64C31 78 97 78 97 64"/><path d="M79 44H84M79 62H84M79 79H84" strokeWidth="3"/></>}
        {name === 'person' && <><circle cx="64" cy="32" r="15" fill="var(--site-surface)"/><path d="M35 88V72C35 46 93 46 93 72V88Z" fill="var(--site-tint)"/><path d="M49 68V88M79 68V88M94 21L100 27L112 13"/><path d="M16 60H27M20 52H27" opacity=".45"/></>}
        {name === 'clock' && <><circle cx="64" cy="53" r="34" fill="var(--site-surface)"/><path d="M64 27V53L83 65M64 13V7M56 7H72M95 23L101 17M29 23L23 17"/><path d="M36 53H40M88 53H92M64 77V81" opacity=".5"/></>}
        {name === 'search' && <><path d="M26 18H77V83H26Z" fill="var(--site-surface)"/><path d="M36 33H64M36 45H58M36 57H50" opacity=".5"/><circle cx="78" cy="59" r="20" fill="var(--site-tint)"/><path d="M92 74L108 91" strokeWidth="5"/><path d="M70 59L76 65L87 52"/></>}
        {name === 'screen' && <><path d="M17 21H111V76H17Z" fill="var(--site-surface)"/><path d="M17 32H111M52 76V88M76 76V88M41 89H87"/><path d="M28 44H54V64H28Z" fill="var(--site-tint)"/><path d="M64 45H98M64 54H91M64 63H81" opacity=".6"/><path d="M25 26H28M33 26H36"/></>}
        {name === 'server' && <><path d="M29 18H99V86H29Z" fill="var(--site-surface)"/><path d="M29 40H99M29 63H99M40 29H72M40 51H72M40 75H72"/><path d="M84 29H88M84 51H88M84 75H88" strokeWidth="4"/></>}
        {name === 'link' && <><path d="M17 24H51V78H17ZM77 24H111V78H77Z" fill="var(--site-surface)"/><path d="M27 37H41M27 47H37M87 37H101M87 47H97" opacity=".5"/><path d="M44 59H84M44 59L52 51M84 59L76 67" strokeWidth="3"/><path d="M47 15H81M55 9L47 15L55 21M73 9L81 15L73 21" opacity=".5"/></>}
        {name === 'chart' && <><path d="M23 15V86H108"/><path d="M36 86V58H50V86M61 86V38H75V86M86 86V22H100V86" fill="var(--site-tint)"/><path d="M36 25L57 16L71 23L100 8" opacity=".5"/></>}
        {name === 'globe' && <><circle cx="64" cy="51" r="36" fill="var(--site-surface)"/><ellipse cx="64" cy="51" rx="17" ry="36"/><path d="M28 51H100M34 32H94M34 70H94M64 15V87" opacity=".65"/></>}
        {name === 'code' && <><path d="M20 20H108V86H20Z" fill="var(--site-surface)"/><path d="M20 34H108M30 27H33M39 27H42M46 48L35 59L46 70M82 48L93 59L82 70M70 44L58 75"/></>}
        {name === 'speaker' && <><path d="M41 18H87V89H41Z" fill="var(--site-surface)"/><circle cx="64" cy="38" r="8"/><circle cx="64" cy="66" r="15" fill="var(--site-tint)"/><circle cx="64" cy="66" r="5"/><path d="M29 36C19 49 19 64 29 76M99 36C109 49 109 64 99 76" opacity=".5"/></>}
        {name === 'wave' && <><path d="M17 52H111" opacity=".3"/><path d="M20 44V60M31 33V71M42 19V85M53 38V66M64 26V78M75 14V90M86 33V71M97 24V80M108 44V60" strokeWidth="5"/></>}
        {name === 'music' && <><path d="M46 73V28L93 17V62M46 40L93 29" strokeWidth="3"/><ellipse cx="34" cy="76" rx="12" ry="8" fill="var(--site-tint)"/><ellipse cx="81" cy="65" rx="12" ry="8" fill="var(--site-tint)"/><path d="M17 18H34M17 27H29M99 83H113" opacity=".4"/></>}
        {name === 'house' && <><path d="M14 91L114 72M28 67V40L63 18L98 40V77L63 90Z" fill="var(--site-surface)"/><path d="M28 40L63 61L98 40M63 61V90M43 74V58L54 64V81M76 61L88 54V65L76 72Z" fill="var(--site-tint)"/><path d="M14 77L28 75M102 61L114 59" opacity=".5"/></>}
        {name === 'layers' && <><path d="M18 37L64 14L110 37L64 60Z" fill="var(--site-surface)"/><path d="M18 53L64 76L110 53M18 69L64 92L110 69"/><path d="M64 30L79 37L64 44L49 37Z" fill="var(--site-tint)"/></>}
        {name === 'key' && <><circle cx="43" cy="42" r="22" fill="var(--site-surface)"/><circle cx="43" cy="42" r="7"/><path d="M60 58L94 90L106 78L99 71L92 78L83 69L90 62L77 49L68 57" fill="var(--site-tint)"/></>}
        {name === 'branch' && <><path d="M64 12V35M64 35L31 58V77M64 35L97 58V77"/><path d="M64 21L78 35L64 49L50 35Z" fill="var(--site-surface)"/><path d="M20 77H42V92H20ZM86 77H108V92H86Z" fill="var(--site-tint)"/></>}
    </svg>;
}
