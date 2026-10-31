import type { PagePath } from './site.mjs';
export type VisualAsset = {id?: string; kind?: 'photo' | 'illustration'; src: string; srcSet?: string; alt: string; width: number; height: number; credit?: string | null; mobile?: {src: string; width: number; height: number}};
export type VisualScene = 'ai' | 'automation' | 'integrations' | 'websites' | 'applications' | 'reporting' | 'fullstack' | 'sound';
export const sceneByPath: Partial<Record<PagePath, VisualScene>>;
export const visualPalette: {paper: string; surface: string; navy: string; ink: string; muted: string; line: string; tint: string; sage: string; accent: string};
