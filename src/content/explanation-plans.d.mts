export type LocalText = {pl: string; en: string};
export type DiagramIcon = 'form' | 'check' | 'task' | 'mail' | 'database' | 'document' | 'person' | 'clock' | 'search' | 'screen' | 'server' | 'link' | 'chart' | 'globe' | 'code' | 'speaker' | 'wave' | 'music' | 'house' | 'layers' | 'key' | 'upload' | 'branch';
export type DiagramStep = {title: LocalText; detail: LocalText; icon: DiagramIcon};
export type DiagramSpec = {
    chapter: string;
    layout: 'flow' | 'split' | 'hub' | 'lanes';
    title: LocalText;
    caption: LocalText;
    steps: DiagramStep[];
    exception?: DiagramStep;
};
export const explanationPlans: Record<string, DiagramSpec[]>;
export const overviewExplanationPlans: Record<string, DiagramSpec[]>;
