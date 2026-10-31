import {createHash} from 'node:crypto';
import {mkdir,readFile,readdir,unlink,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
import {cardMedia,heroMedia,articleMedia} from '../src/content/media-plan.mjs';
import {site,routes} from '../src/content/site.mjs';

const library=new URL('../assets/library/',import.meta.url);
const output=new URL('../public/service-visuals/',import.meta.url);
const catalog=JSON.parse(await readFile(new URL('catalog.json',library),'utf8'));
await mkdir(output,{recursive:true});
const keep=new Set(['manifest.json']);
const cache=new Map();
async function save(name,data,extension=name.endsWith('-svg')?'svg':'webp'){const hash=createHash('sha256').update(data).digest('hex').slice(0,12);const file=`${name}.${hash}.${extension}`;keep.add(file);await writeFile(new URL(file,output),data);return `/service-visuals/${file}`;}
async function derivative(id,variant){
 const key=`${id}:${variant}`;if(cache.has(key))return cache.get(key);
 const entry=catalog.find(a=>a.id===id);if(!entry)throw Error(`Unknown asset: ${id}`);
 const source=await readFile(new URL(entry.source,library));
 const info=await sharp(source).metadata();const width=info.width,height=info.height;
 if(!width||!height)throw Error(`Missing dimensions: ${id}`);
 if(variant==='share'){
  const data=await sharp(source,{density:144}).resize({width:1200,height:630,fit:entry.kind==='illustration'?'contain':'cover',background:'#fff',position:'centre'}).flatten({background:'#fff'}).jpeg({quality:94,chromaSubsampling:'4:4:4'}).toBuffer();
  const result={id,kind:entry.kind,src:await save(`${id}-share`,data,'jpg'),width:1200,height:630};cache.set(key,result);return result;
 }
 if(entry.source.endsWith('.svg')){const result={id,kind:entry.kind,src:await save(`${id}-svg`,source),width,height,credit:entry.credit};cache.set(key,result);return result;}
 const limits=variant==='card'?[375,750,1125]:[480,800,1200,1600];
 const max=variant==='card'&&entry.kind==='photo'?Math.min(width,Math.floor(height*1.5)):width;
 const widths=[...new Set(limits.map(w=>Math.min(w,max)))].sort((a,b)=>a-b);
 const variants=[];
 for(const w of widths){
  // DECISION: Preserve the complete illustration; only photographs may be cropped.
  const pipeline=sharp(source).resize(variant==='card'?{width:w,height:Math.round(w/1.5),fit:entry.kind==='illustration'?'contain':'cover',background:'#fff',position:'centre',withoutEnlargement:true,kernel:'lanczos3'}:{width:w,withoutEnlargement:true,kernel:'lanczos3'});
  // Lossless card derivatives retain fine interface text after resampling.
  const data=await pipeline.webp(variant==='card'||entry.kind==='illustration'?{lossless:true,effort:6}:{quality:94,smartSubsample:true,effort:6}).toBuffer();
  const src=await save(`${id}-${variant}-${w}`,data);variants.push({src,width:w});
 }
 const fallback=variants.find(v=>v.width>= (variant==='card'?750:1200))??variants.at(-1);
 const result={id,kind:entry.kind,src:fallback.src,srcSet:variants.map(v=>`${v.src} ${v.width}w`).join(', '),width:variant==='card'?375:width,height:variant==='card'?250:height,credit:entry.credit};
 cache.set(key,result);return result;
}
const manifest={};
if(new Set(Object.values(heroMedia)).size!==Object.keys(heroMedia).length)throw Error('Service opening scenes must be distinct.');
for(const page of routes.filter(path=>path.startsWith('/software/')))if(!heroMedia[page])throw Error(`Missing opening scene: ${page}`);
for(const locale of site.locales){manifest[locale]={};const pages=new Set([...Object.keys(cardMedia),...Object.keys(heroMedia),...Object.keys(articleMedia)]);
 const articles=JSON.parse(await readFile(new URL(`../src/content/${locale}-articles.json`,import.meta.url),'utf8'));
 for(const page of pages){const localize=asset=>({...asset,alt:catalog.find(e=>e.id===asset.id).alt[locale]});const card=cardMedia[page]?localize(await derivative(cardMedia[page],'card')):null;const hero=heroMedia[page]?localize(await derivative(heroMedia[page],'wide')):null;const share=heroMedia[page]?localize(await derivative(heroMedia[page],'share')):null;const article=[];
  const seen=new Set(heroMedia[page]?[heroMedia[page]]:[]);
  for(const placement of articleMedia[page]??[]){
   if(seen.has(placement.asset))throw Error(`Repeated article image: ${page} ${placement.asset}`);seen.add(placement.asset);
   const paragraphs=articles[page.slice(1,-1)]?.sections[placement.section]?.paragraphs;
   if(!paragraphs?.[placement.after])throw Error(`Missing media paragraph: ${locale} ${page} ${placement.section}:${placement.after}`);
   article.push({...placement,asset:localize(await derivative(placement.asset,placement.variant))});
  }
  manifest[locale][page]={card,hero,share,article};
 }
}
await writeFile(new URL('manifest.json',output),JSON.stringify(manifest,null,2)+'\n');
for(const file of await readdir(output))if(!keep.has(file))await unlink(new URL(file,output));
console.log(`Generated responsive service media from ${cache.size} selected asset variants.`);
