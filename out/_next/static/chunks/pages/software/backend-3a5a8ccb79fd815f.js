(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[797],{7427:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/software/backend",function(){return i(7570)}])},4635:function(e,t,i){"use strict";i.d(t,{w:function(){return a}});var r=i(5893),n=i(6940);let a=e=>{let{image:t,alt:i,credits:a}=e;return(0,r.jsx)("section",{style:{position:"relative",height:"calc(20vw + 300px)"},children:(0,r.jsx)(n.J,{image:t,alt:i,credits:a,priority:!0,fill:!0,asCover:!0})})}},6940:function(e,t,i){"use strict";i.d(t,{J:function(){return o}});var r=i(5893),n=i(5861),a=i(9748);let o=e=>{let{image:t,alt:i,credits:o,height:s,priority:l=!1,fill:c=!1,asCover:d=!1,style:h}=e;return(0,r.jsxs)("figure",{children:[(0,r.jsx)(a.Z,{src:t,alt:"Picture showing ".concat(i),height:s,priority:l,fill:c,style:{...h,objectFit:d?"cover":"initial"}}),(0,r.jsx)(n.Z,{variant:"caption",style:{position:"absolute",top:5,right:5},children:o})]})}},4223:function(e,t,i){"use strict";i.r(t);var r=i(5893),n=i(5861),a=i(6242),o=i(4267),s=i(1233),l=i(7294);t.default=e=>{let{data:t,largeRowGap:i=!1}=e,c={alignItems:"center",display:"flex",justifyContent:"center"};return(0,r.jsx)(s.Z,{alignItems:"flex-start",rowGap:i?15:void 0,children:t.map((e,t)=>(0,r.jsx)(l.Fragment,{children:(0,r.jsx)(a.Z,{variant:"outlined",sx:{minHeight:"150px",...c},children:(0,r.jsxs)(o.Z,{children:[e.heading&&(0,r.jsx)(n.Z,{variant:"h3",sx:{minHeight:"100px"},children:e.heading}),(0,r.jsx)(n.Z,{variant:"body1",sx:"string"!=typeof e.content?{margin:0,width:"100%"}:void 0,children:e.content})]})})},t))})}},2317:function(e,t,i){"use strict";i.d(t,{j:function(){return o}});var r=i(5893),n=i(7571),a=i(5861);let o=e=>{let{href:t,content:i}=e;return(0,r.jsx)(n.b,{href:t,children:(0,r.jsx)(a.Z,{variant:"button",width:"100%",component:"span",display:"block",textAlign:"center",color:"inherit",children:i})})}},2789:function(e,t,i){"use strict";i.d(t,{Ir:function(){return o},_p:function(){return n},df:function(){return s},wn:function(){return a}});var r=i(7294);let n=(0,r.lazy)(()=>i.e(223).then(i.bind(i,4223))),a=(0,r.lazy)(()=>Promise.all([i.e(353),i.e(846)]).then(i.bind(i,2846))),o=(0,r.lazy)(()=>i.e(296).then(i.bind(i,6296))),s=(0,r.lazy)(()=>i.e(592).then(i.bind(i,7592)))},799:function(e,t,i){"use strict";i.d(t,{F:function(){return z}});var r=i(5893),n=i(2789),a=i(4223),o=i(2317),s=i(5861);let l=e=>{let{objectOfInterest:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{variant:"h3",children:"Do you want to talk?"}),(0,r.jsx)(s.Z,{variant:"body2",mb:5,children:" Use the link below to ask for a details. We will respond to you as soon as possible."}),(0,r.jsx)(a.default,{data:[{heading:(0,r.jsx)(r.Fragment,{children:"The article interested you?"}),content:(0,r.jsx)(o.j,{content:(0,r.jsxs)(r.Fragment,{children:["Ask about ",(0,r.jsxs)("strong",{children:[" ",t]})]}),href:"/contact?about=".concat(t)})},{heading:(0,r.jsx)(r.Fragment,{children:"I just have a question"}),content:(0,r.jsx)(o.j,{content:"General question",href:"/contact"})}]})]})};var c=i(5582),d=i(3366),h=i(7462),u=i(7294),A=i(512),g=i(4780),f=i(1796),m=i(948),p=i(1657),x=i(1588),v=i(4867);function b(e){return(0,v.Z)("MuiDivider",e)}(0,x.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);let w=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],j=e=>{let{absolute:t,children:i,classes:r,flexItem:n,light:a,orientation:o,textAlign:s,variant:l}=e;return(0,g.Z)({root:["root",t&&"absolute",l,a&&"light","vertical"===o&&"vertical",n&&"flexItem",i&&"withChildren",i&&"vertical"===o&&"withChildrenVertical","right"===s&&"vertical"!==o&&"textAlignRight","left"===s&&"vertical"!==o&&"textAlignLeft"],wrapper:["wrapper","vertical"===o&&"wrapperVertical"]},b,r)},y=(0,m.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.root,i.absolute&&t.absolute,t[i.variant],i.light&&t.light,"vertical"===i.orientation&&t.vertical,i.flexItem&&t.flexItem,i.children&&t.withChildren,i.children&&"vertical"===i.orientation&&t.withChildrenVertical,"right"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignRight,"left"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignLeft]}})(({theme:e,ownerState:t})=>(0,h.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin"},t.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},t.light&&{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:(0,f.Fq)(e.palette.divider,.08)},"inset"===t.variant&&{marginLeft:72},"middle"===t.variant&&"horizontal"===t.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===t.variant&&"vertical"===t.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===t.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},t.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:e})=>(0,h.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:e,ownerState:t})=>(0,h.Z)({},t.children&&"vertical"!==t.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`}}),({theme:e,ownerState:t})=>(0,h.Z)({},t.children&&"vertical"===t.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`}}),({ownerState:e})=>(0,h.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),k=(0,m.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.wrapper,"vertical"===i.orientation&&t.wrapperVertical]}})(({theme:e,ownerState:t})=>(0,h.Z)({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`},"vertical"===t.orientation&&{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`})),Z=u.forwardRef(function(e,t){let i=(0,p.Z)({props:e,name:"MuiDivider"}),{absolute:n=!1,children:a,className:o,component:s=a?"div":"hr",flexItem:l=!1,light:c=!1,orientation:u="horizontal",role:g="hr"!==s?"separator":void 0,textAlign:f="center",variant:m="fullWidth"}=i,x=(0,d.Z)(i,w),v=(0,h.Z)({},i,{absolute:n,component:s,flexItem:l,light:c,orientation:u,role:g,textAlign:f,variant:m}),b=j(v);return(0,r.jsx)(y,(0,h.Z)({as:s,className:(0,A.Z)(b.root,o),role:g,ref:t,ownerState:v},x,{children:a?(0,r.jsx)(k,{className:b.wrapper,ownerState:v,children:a}):null}))});Z.muiSkipListHighlight=!0;let z=e=>{let{children:t,title:i,internalLinksToShow:a}=e;return(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(s.Z,{variant:"h1",children:i}),t,(0,r.jsx)(Z,{}),(0,r.jsx)(n.df,{itemsToShow:a}),(0,r.jsx)(Z,{}),(0,r.jsx)(l,{objectOfInterest:i})]})}},7570:function(e,t,i){"use strict";i.r(t),i.d(t,{__N_SSG:function(){return l},default:function(){return c}});var r=i(5893),n={src:"/_next/static/media/backend.b0a68d29.jpg",height:3072,width:4608,blurDataURL:"data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAdEAABBAIDAAAAAAAAAAAAAAAAAQIDEQQSEzHR/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8AqMkvJmPh1rRGvu+1W/AAJMHX/9k=",blurWidth:8,blurHeight:5},a=i(2789),o=i(4635),s=i(799);i(7294);var l=!0;function c(){return(0,r.jsxs)(s.F,{title:"Backend services",internalLinksToShow:["/software/architecture","/software/backend","/software/frontend"],children:[(0,r.jsx)(o.w,{image:n,alt:"backend domain driver design",credits:"Photo by NEW DATA SERVICES on Unsplash"}),(0,r.jsx)(a.Ir,{title:(0,r.jsx)(r.Fragment,{children:"Backend perfect fit for a real-time experience"}),subtitle:(0,r.jsx)(r.Fragment,{children:"without unnecessary markup."}),body:(0,r.jsxs)(r.Fragment,{children:["The backend technology must be created to work closely with the user interface. We know how important it is to optimize the services that ",(0,r.jsx)("strong",{children:"fulfill your business needs"}),", so at every stage of server code development we take care of the necessary minimum needed for the application to work.",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"We do not use omni-channel solutions that cause unnecessary overhead – consuming your transfer and the resources of your servers. We always think about ",(0,r.jsx)("strong",{children:"performance and a high scalability factor"})," to maintain the highest efficiency."]})}),(0,r.jsx)(a.Ir,{title:(0,r.jsx)(r.Fragment,{children:"We don't promise miracles at the beginning"}),subtitle:(0,r.jsx)(r.Fragment,{children:"we spend more time analyzing."}),body:(0,r.jsxs)(r.Fragment,{children:["The best job done is the one that ",(0,r.jsx)("strong",{children:"accomplishes your needs without doing overcomplicated solutions"}),".",(0,r.jsx)("br",{}),"The key to success is analysis. We need to understand exactly what you want to achieve – that way we will code a service that accomplishes ",(0,r.jsx)("strong",{children:"exactly what you want to achieve"}),". No acrobatics or over-engineering.",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"Things that are too complicated and hard to understand seem professional at first glance, but over time they become impossible to maintain and incredibly expensive."]})}),(0,r.jsx)(a.Ir,{title:(0,r.jsx)(r.Fragment,{children:"Digital solutions in an analog world"}),subtitle:(0,r.jsx)(r.Fragment,{children:"it's not that difficult."}),body:(0,r.jsxs)(r.Fragment,{children:["Many things that seem abstract – have many analogies in the real world. We can find them and rearrange them for you. This makes the understanding of how a web application works much clearer, and thus ",(0,r.jsx)("strong",{children:"becomes much more digestible"}),"."]})})]})}}},function(e){e.O(0,[353,774,888,179],function(){return e(e.s=7427)}),_N_E=e.O()}]);