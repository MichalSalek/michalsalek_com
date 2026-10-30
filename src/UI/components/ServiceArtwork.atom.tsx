import type { VisualAsset } from '@/src/content/visuals.mjs';
import { visualPalette } from '@/src/content/visuals.mjs';

export function ServiceArtworkAtom({asset, variant, priority = false}: {asset: VisualAsset; variant: 'card' | 'hero'; priority?: boolean}) {
    return <figure className={`service-artwork service-artwork-${variant}`} style={{margin: 0, width: '100%', height: variant === 'card' ? 250 : 'calc(20vw + 300px)', background: visualPalette.paper}}>
        <picture>
            {asset.mobile && <source media="(max-width: 599px)" srcSet={asset.mobile.src} width={asset.mobile.width} height={asset.mobile.height}/>}
            {/* DECISION: Build-time SVGs need native picture selection, without a desktop preload on mobile. */}
            <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height}
                loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
                decoding="async" style={{display: 'block', width: '100%', height: '100%', objectFit: variant === 'card' ? 'cover' : 'contain'}}/>
        </picture>
    </figure>;
}
