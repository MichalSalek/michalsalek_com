import type { VisualAsset } from '@/src/content/visuals.mjs';

export function ServiceArtworkAtom({asset, variant, priority = false}: {asset: VisualAsset; variant: 'card' | 'hero' | 'wide' | 'inline'; priority?: boolean}) {
    const sizes = variant === 'card' ? '(max-width: 407px) calc(100vw - 32px), 375px' : variant === 'inline' ? '220px' : `(max-width: 599px) calc(100vw - 64px), (max-width: 899px) calc(100vw - 96px), ${variant === 'hero' ? '960' : asset.kind === 'photo' ? '840' : '640'}px`;
    return <figure className={`service-artwork service-artwork-${variant} service-artwork-${asset.kind ?? 'illustration'}`} data-asset={asset.id}>
        <picture>
            {asset.mobile && <source media="(max-width: 599px)" srcSet={asset.mobile.src} width={asset.mobile.width} height={asset.mobile.height}/>}
            {/* DECISION: Static picture selection serves density-aware images without a desktop preload on mobile. */}
            <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height}
                srcSet={asset.srcSet} sizes={asset.srcSet ? sizes : undefined}
                loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined}
                decoding="async"/>
        </picture>
        {asset.credit && <figcaption>{asset.credit}</figcaption>}
    </figure>;
}
