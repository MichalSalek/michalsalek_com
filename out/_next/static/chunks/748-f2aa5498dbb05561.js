(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[748],{9748:function(e,t,r){"use strict";var i=r(7294),n=r(5675),o=r.n(n);let l=e=>{var t;let{filePath:r}=e,i=(null===(t=r.split("\\").pop())||void 0===t?void 0:t.split("/").pop())||"",n=r.split(i).shift(),o=r.split(".").pop(),l=i.substring(0,i.lastIndexOf("."))||i;return{path:n,filename:l,extension:o||""}},s=function(e,t,r){var i;let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],{filename:o,path:s,extension:a}=l({filePath:e});if(!["JPG","JPEG","WEBP","PNG","AVIF","GIF"].includes(a.toUpperCase()))return e;let u=a;["JPG","JPEG","PNG","GIF"].includes(a.toUpperCase())&&(u="WEBP");let c=s,d=null===(i=c)||void 0===i?void 0:i.substr(-1);"/"!=d&&(c+="/");let f=e.includes("_next/static/media");r&&(c=r.endsWith("/")&&c&&c.startsWith("/")?r+c.slice(1):r.endsWith("/")||!c||c.startsWith("/")?r+c:r+"/"+c);let p="".concat(f?r?r+"/":"":c).concat("optimized-images","/").concat(o,"-opt-").concat(t,".").concat(u.toUpperCase());return n||"/"===p.charAt(0)||(p="/"+p),p},a=e=>{let t,{src:r,width:i,basePath:n}=e,o=r.replace(/^(https?|ftp):\/\//,"").replace(/[/\\:*?"<>|#%]/g,"_").replace(/[\x00-\x1F\x7F]/g,"").trim();return s(o,i,n,!0)},u=e=>{let{src:t,width:r,basePath:i}=e,n="object"==typeof t,o=n?t.src:t,l=n&&t.width||void 0;if(n&&l&&r>l){let e=[640,750,828,1080,1200,1920,2048,3840,16,32,48,64,96,128,256,384],t=null;for(let r=0;r<e.length;r++)Number(e[r])>=l&&(null===t||Number(e[r])<t)&&(t=Number(e[r]));if(null!==t)return s(o,t,i)}return o.startsWith("http")?a({src:o,width:r,basePath:i}):s(o,r,i)},c=e=>{let{src:t}=e,r="object"==typeof t?t.src:t,i=r.startsWith("http");return i||"/"===r.charAt(0)||(r="/"+r),r},d=(0,i.forwardRef)((e,t)=>{let{src:r,priority:n=!1,loading:l,className:d,width:f,height:p,onLoadingComplete:g,unoptimized:m,placeholder:h="blur",basePath:b="",blurDataURL:v,style:w,onError:y,...E}=e,[x,S]=(0,i.useState)(!1),P=(0,i.useMemo)(()=>{if(v)return v;let e="object"==typeof r,t=e?r.src:r;return!0===m?t:t.startsWith("http")?a({src:t,width:10,basePath:b}):s(t,10,b)},[v,r,m]),_="object"==typeof r?r.src.endsWith(".svg"):r.endsWith(".svg"),[C,j]=(0,i.useState)(!1),z="blur"===h&&!_&&P&&P.startsWith("/")&&!C?{backgroundSize:(null==w?void 0:w.objectFit)||"cover",backgroundPosition:(null==w?void 0:w.objectPosition)||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:"url(".concat(P,")"),filter:"url(#sharpBlur)"}:void 0,I="object"==typeof r,R=I?r.src:r;b&&!I&&R.startsWith("/")&&(R=b+R),!b||I||R.startsWith("/")||(R=b+"/"+R);let W=i.createElement(o(),{ref:t,...E,...f&&{width:f},...p&&{height:p},...l&&{loading:l},className:"".concat(d," next-exported-image-blur-svg"),...g&&{onLoadingComplete:g},...h&&{placeholder:z||C?"empty":h},...m&&{unoptimized:m},...n&&{priority:n},..._&&{unoptimized:!0},style:{...w,...z},loader:x||!0===m?c:e=>u({src:r,width:e.width,basePath:b}),blurDataURL:P,onError:e=>{S(!0),j(!0),y&&y(e)},onLoadingComplete:e=>{0===e.naturalWidth&&S(!0),j(!0),g&&g(e)},src:I?r:R});return z?i.createElement(i.Fragment,null,i.createElement("noscript",null,i.createElement("style",null,"\n    .next-exported-image-blur-svg {\n       filter: none !important;\n    }\n    ")),W,i.createElement("svg",{style:{border:0,clip:"rect(0 0 0 0)",height:0,margin:"-1px",overflow:"hidden",padding:0,position:"absolute",width:"1px"}},i.createElement("filter",{id:"sharpBlur"},i.createElement("feGaussianBlur",{stdDeviation:"20",colorInterpolationFilters:"sRGB"}),i.createElement("feColorMatrix",{type:"matrix",colorInterpolationFilters:"sRGB",values:"1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"}),i.createElement("feComposite",{in2:"SourceGraphic",operator:"in"})))):W});t.Z=d},8872:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return v}});let i=r(8754),n=r(1757),o=n._(r(7294)),l=r(3935),s=i._(r(2636)),a=r(5471),u=r(3735),c=r(3341);r(4210);let d=r(9955),f=i._(r(7746)),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"custom",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,t,r,i,n,o){let l=null==e?void 0:e.src;if(!e||e["data-loaded-src"]===l)return;e["data-loaded-src"]=l;let s="decode"in e?e.decode():Promise.resolve();s.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("blur"===t&&n(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,n=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}(null==i?void 0:i.current)&&i.current(e)}})}function m(e){let[t,r]=o.version.split("."),i=parseInt(t,10),n=parseInt(r,10);return i>18||18===i&&n>=3?{fetchPriority:e}:{fetchpriority:e}}let h=(0,o.forwardRef)((e,t)=>{let{src:r,srcSet:i,sizes:n,height:l,width:s,decoding:a,className:u,style:c,fetchPriority:d,placeholder:f,loading:p,unoptimized:h,fill:b,onLoadRef:v,onLoadingCompleteRef:w,setBlurComplete:y,setShowAltText:E,onLoad:x,onError:S,...P}=e;return o.default.createElement("img",{...P,...m(d),loading:p,width:s,height:l,decoding:a,"data-nimg":b?"fill":"1",className:u,style:c,sizes:n,srcSet:i,src:r,ref:(0,o.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(S&&(e.src=e.src),e.complete&&g(e,f,v,w,y,h))},[r,f,v,w,y,S,h,t]),onLoad:e=>{let t=e.currentTarget;g(t,f,v,w,y,h)},onError:e=>{E(!0),"blur"===f&&y(!0),S&&S(e)}})});function b(e){let{isAppRouter:t,imgAttributes:r}=e,i={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...m(r.fetchPriority)};return t?((0,l.preload)(r.src,i),null):o.default.createElement(s.default,null,o.default.createElement("link",{key:"__nimg-"+r.src+r.srcSet+r.sizes,rel:"preload",href:r.srcSet?void 0:r.src,...i}))}let v=(0,o.forwardRef)((e,t)=>{let r=(0,o.useContext)(d.RouterContext),i=(0,o.useContext)(c.ImageConfigContext),n=(0,o.useMemo)(()=>{let e=p||i||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[i]),{onLoad:l,onLoadingComplete:s}=e,g=(0,o.useRef)(l);(0,o.useEffect)(()=>{g.current=l},[l]);let m=(0,o.useRef)(s);(0,o.useEffect)(()=>{m.current=s},[s]);let[v,w]=(0,o.useState)(!1),[y,E]=(0,o.useState)(!1),{props:x,meta:S}=(0,a.getImgProps)(e,{defaultLoader:f.default,imgConf:n,blurComplete:v,showAltText:y});return o.default.createElement(o.default.Fragment,null,o.default.createElement(h,{...x,unoptimized:S.unoptimized,placeholder:S.placeholder,fill:S.fill,onLoadRef:g,onLoadingCompleteRef:m,setBlurComplete:w,setShowAltText:E,ref:t}),S.priority?o.default.createElement(b,{isAppRouter:!r,imgAttributes:x}):null)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5471:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return s}}),r(4210);let i=r(7757),n=r(3735);function o(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function s(e,t){var r;let s,a,u,{src:c,sizes:d,unoptimized:f=!1,priority:p=!1,loading:g,className:m,quality:h,width:b,height:v,fill:w=!1,style:y,onLoad:E,onLoadingComplete:x,placeholder:S="empty",blurDataURL:P,fetchPriority:_,layout:C,objectFit:j,objectPosition:z,lazyBoundary:I,lazyRoot:R,...W}=e,{imgConf:O,showAltText:k,blurComplete:G,defaultLoader:M}=t,A=O||n.imageConfigDefault;if("allSizes"in A)s=A;else{let e=[...A.deviceSizes,...A.imageSizes].sort((e,t)=>e-t),t=A.deviceSizes.sort((e,t)=>e-t);s={...A,allSizes:e,deviceSizes:t}}let N=W.loader||M;delete W.loader,delete W.srcSet;let F="__next_img_default"in N;if(F){if("custom"===s.loader)throw Error('Image with src "'+c+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=N;N=t=>{let{config:r,...i}=t;return e(i)}}if(C){"fill"===C&&(w=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[C];e&&(y={...y,...e});let t={responsive:"100vw",fill:"100vw"}[C];t&&!d&&(d=t)}let B="",D=l(b),L=l(v);if("object"==typeof(r=c)&&(o(r)||void 0!==r.src)){let e=o(c)?c.default:c;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(a=e.blurWidth,u=e.blurHeight,P=P||e.blurDataURL,B=e.src,!w){if(D||L){if(D&&!L){let t=D/e.width;L=Math.round(e.height*t)}else if(!D&&L){let t=L/e.height;D=Math.round(e.width*t)}}else D=e.width,L=e.height}}let U=!p&&("lazy"===g||void 0===g);(!(c="string"==typeof c?c:B)||c.startsWith("data:")||c.startsWith("blob:"))&&(f=!0,U=!1),s.unoptimized&&(f=!0),F&&c.endsWith(".svg")&&!s.dangerouslyAllowSVG&&(f=!0),p&&(_="high");let J=l(h),T=Object.assign(w?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:j,objectPosition:z}:{},k?{}:{color:"transparent"},y),V="blur"===S&&P&&!G?{backgroundSize:T.objectFit||"cover",backgroundPosition:T.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:'url("data:image/svg+xml;charset=utf-8,'+(0,i.getImageBlurSvg)({widthInt:D,heightInt:L,blurWidth:a,blurHeight:u,blurDataURL:P,objectFit:T.objectFit})+'")'}:{},q=function(e){let{config:t,src:r,unoptimized:i,width:n,quality:o,sizes:l,loader:s}=e;if(i)return{src:r,srcSet:void 0,sizes:void 0};let{widths:a,kind:u}=function(e,t,r){let{deviceSizes:i,allSizes:n}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let i;i=e.exec(r);i)t.push(parseInt(i[2]));if(t.length){let e=.01*Math.min(...t);return{widths:n.filter(t=>t>=i[0]*e),kind:"w"}}return{widths:n,kind:"w"}}if("number"!=typeof t)return{widths:i,kind:"w"};let o=[...new Set([t,2*t].map(e=>n.find(t=>t>=e)||n[n.length-1]))];return{widths:o,kind:"x"}}(t,n,l),c=a.length-1;return{sizes:l||"w"!==u?l:"100vw",srcSet:a.map((e,i)=>s({config:t,src:r,quality:o,width:e})+" "+("w"===u?e:i+1)+u).join(", "),src:s({config:t,src:r,quality:o,width:a[c]})}}({config:s,src:c,unoptimized:f,width:D,quality:J,sizes:d,loader:N}),Y={...W,loading:U?"lazy":g,fetchPriority:_,width:D,height:L,decoding:"async",className:m,style:{...T,...V},sizes:q.sizes,srcSet:q.srcSet,src:q.src},H={unoptimized:f,priority:p,placeholder:S,fill:w};return{props:Y,meta:H}}},7757:function(e,t){"use strict";function r(e){let{widthInt:t,heightInt:r,blurWidth:i,blurHeight:n,blurDataURL:o,objectFit:l}=e,s=i||t,a=n||r,u=o.startsWith("data:image/jpeg")?"%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%":"";return s&&a?"%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 "+s+" "+a+"'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='"+(i&&n?"1":"20")+"'/%3E"+u+"%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='"+o+"'/%3E%3C/svg%3E":"%3Csvg xmlns='http%3A//www.w3.org/2000/svg'%3E%3Cimage style='filter:blur(20px)' preserveAspectRatio='"+("contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none")+"' x='0' y='0' height='100%25' width='100%25' href='"+o+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},2555:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return u},unstable_getImgProps:function(){return a}});let i=r(8754),n=r(5471),o=r(4210),l=r(8872),s=i._(r(7746)),a=e=>{(0,o.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,n.getImgProps)(e,{defaultLoader:s.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image/",loader:"custom",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}},u=l.Image},7746:function(e,t){"use strict";function r(e){let{config:t,src:r,width:i,quality:n}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+i+"&q="+(n||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}}),r.__next_img_default=!0;let i=r},5675:function(e,t,r){e.exports=r(2555)}}]);