(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[999],{1847:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/software/frontend",function(){return i(3454)}])},4635:function(e,t,i){"use strict";i.d(t,{w:function(){return o}});var r=i(5893),n=i(6940);let o=e=>{let{image:t,alt:i,credits:o}=e;return(0,r.jsx)("section",{style:{position:"relative",height:"calc(20vw + 300px)"},children:(0,r.jsx)(n.J,{image:t,alt:i,credits:o,priority:!0,fill:!0,asCover:!0})})}},6940:function(e,t,i){"use strict";i.d(t,{J:function(){return a}});var r=i(5893),n=i(5861),o=i(9748);let a=e=>{let{image:t,alt:i,credits:a,height:s,priority:l=!1,fill:c=!1,asCover:h=!1,style:d}=e;return(0,r.jsxs)("figure",{children:[(0,r.jsx)(o.Z,{src:t,alt:"Picture showing ".concat(i),height:s,priority:l,fill:c,style:{...d,objectFit:h?"cover":"initial"}}),(0,r.jsx)(n.Z,{variant:"caption",style:{position:"absolute",top:5,right:5},children:a})]})}},4223:function(e,t,i){"use strict";i.r(t);var r=i(5893),n=i(5861),o=i(6242),a=i(4267),s=i(1233),l=i(7294);t.default=e=>{let{data:t,largeRowGap:i=!1}=e,c={alignItems:"center",display:"flex",justifyContent:"center"};return(0,r.jsx)(s.Z,{alignItems:"flex-start",rowGap:i?15:void 0,children:t.map((e,t)=>(0,r.jsx)(l.Fragment,{children:(0,r.jsx)(o.Z,{variant:"outlined",sx:{minHeight:"150px",...c},children:(0,r.jsxs)(a.Z,{children:[e.heading&&(0,r.jsx)(n.Z,{variant:"h3",sx:{minHeight:"100px"},children:e.heading}),(0,r.jsx)(n.Z,{variant:"body1",sx:"string"!=typeof e.content?{margin:0,width:"100%"}:void 0,children:e.content})]})})},t))})}},2317:function(e,t,i){"use strict";i.d(t,{j:function(){return a}});var r=i(5893),n=i(7571),o=i(5861);let a=e=>{let{href:t,content:i}=e;return(0,r.jsx)(n.b,{href:t,children:(0,r.jsx)(o.Z,{variant:"button",width:"100%",component:"span",display:"block",textAlign:"center",color:"inherit",children:i})})}},2789:function(e,t,i){"use strict";i.d(t,{Ir:function(){return a},_p:function(){return n},df:function(){return s},wn:function(){return o}});var r=i(7294);let n=(0,r.lazy)(()=>i.e(223).then(i.bind(i,4223))),o=(0,r.lazy)(()=>Promise.all([i.e(353),i.e(846)]).then(i.bind(i,2846))),a=(0,r.lazy)(()=>i.e(296).then(i.bind(i,6296))),s=(0,r.lazy)(()=>i.e(592).then(i.bind(i,7592)))},799:function(e,t,i){"use strict";i.d(t,{F:function(){return k}});var r=i(5893),n=i(2789),o=i(4223),a=i(2317),s=i(5861);let l=e=>{let{objectOfInterest:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.Z,{variant:"h3",children:"Do you want to talk?"}),(0,r.jsx)(s.Z,{variant:"body2",mb:5,children:" Use the link below to ask for a details. We will respond to you as soon as possible."}),(0,r.jsx)(o.default,{data:[{heading:(0,r.jsx)(r.Fragment,{children:"The article interested you?"}),content:(0,r.jsx)(a.j,{content:(0,r.jsxs)(r.Fragment,{children:["Ask about ",(0,r.jsxs)("strong",{children:[" ",t]})]}),href:"/contact?about=".concat(t)})},{heading:(0,r.jsx)(r.Fragment,{children:"I just have a question"}),content:(0,r.jsx)(a.j,{content:"General question",href:"/contact"})}]})]})};var c=i(5582),h=i(3366),d=i(7462),u=i(7294),f=i(512),g=i(4780),A=i(1796),p=i(948),m=i(1657),x=i(1588),v=i(4867);function w(e){return(0,v.Z)("MuiDivider",e)}(0,x.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);let b=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],j=e=>{let{absolute:t,children:i,classes:r,flexItem:n,light:o,orientation:a,textAlign:s,variant:l}=e;return(0,g.Z)({root:["root",t&&"absolute",l,o&&"light","vertical"===a&&"vertical",n&&"flexItem",i&&"withChildren",i&&"vertical"===a&&"withChildrenVertical","right"===s&&"vertical"!==a&&"textAlignRight","left"===s&&"vertical"!==a&&"textAlignLeft"],wrapper:["wrapper","vertical"===a&&"wrapperVertical"]},w,r)},y=(0,p.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.root,i.absolute&&t.absolute,t[i.variant],i.light&&t.light,"vertical"===i.orientation&&t.vertical,i.flexItem&&t.flexItem,i.children&&t.withChildren,i.children&&"vertical"===i.orientation&&t.withChildrenVertical,"right"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignRight,"left"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignLeft]}})(({theme:e,ownerState:t})=>(0,d.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin"},t.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},t.light&&{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:(0,A.Fq)(e.palette.divider,.08)},"inset"===t.variant&&{marginLeft:72},"middle"===t.variant&&"horizontal"===t.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===t.variant&&"vertical"===t.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===t.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},t.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:e})=>(0,d.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:e,ownerState:t})=>(0,d.Z)({},t.children&&"vertical"!==t.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`}}),({theme:e,ownerState:t})=>(0,d.Z)({},t.children&&"vertical"===t.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`}}),({ownerState:e})=>(0,d.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),E=(0,p.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.wrapper,"vertical"===i.orientation&&t.wrapperVertical]}})(({theme:e,ownerState:t})=>(0,d.Z)({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`},"vertical"===t.orientation&&{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`})),Z=u.forwardRef(function(e,t){let i=(0,m.Z)({props:e,name:"MuiDivider"}),{absolute:n=!1,children:o,className:a,component:s=o?"div":"hr",flexItem:l=!1,light:c=!1,orientation:u="horizontal",role:g="hr"!==s?"separator":void 0,textAlign:A="center",variant:p="fullWidth"}=i,x=(0,h.Z)(i,b),v=(0,d.Z)({},i,{absolute:n,component:s,flexItem:l,light:c,orientation:u,role:g,textAlign:A,variant:p}),w=j(v);return(0,r.jsx)(y,(0,d.Z)({as:s,className:(0,f.Z)(w.root,a),role:g,ref:t,ownerState:v},x,{children:o?(0,r.jsx)(E,{className:w.wrapper,ownerState:v,children:o}):null}))});Z.muiSkipListHighlight=!0;let k=e=>{let{children:t,title:i,internalLinksToShow:o}=e;return(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(s.Z,{variant:"h1",children:i}),t,(0,r.jsx)(Z,{}),(0,r.jsx)(n.df,{itemsToShow:o}),(0,r.jsx)(Z,{}),(0,r.jsx)(l,{objectOfInterest:i})]})}},3454:function(e,t,i){"use strict";i.r(t),i.d(t,{__N_SSG:function(){return c},default:function(){return h}});var r=i(5893),n={src:"/_next/static/media/frontend.af142252.jpg",height:3712,width:5568,blurDataURL:"data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAcEAABBQEBAQAAAAAAAAAAAAADAAECBCEFEhT/xAAUAQEAAAAAAAAAAAAAAAAAAAAE/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECQf/aAAwDAQACEQMRAD8Ak9bphNUuVTUBELXJCH0Pkpetd8bEREB4NlH/2Q==",blurWidth:8,blurHeight:5},o=i(2789),a=i(8509),s=i(4635),l=i(799);i(7294);var c=!0;function h(){return(0,r.jsxs)(l.F,{title:"Frontend services",internalLinksToShow:["/software/architecture","/software/backend","/software/frontend"],children:[(0,r.jsx)(s.w,{image:n,alt:"user flow planning methods",credits:"Photo by Kelly Sikkema on Unsplash"}),(0,r.jsx)(o.Ir,{title:(0,r.jsx)(r.Fragment,{children:"Lightning fast User Interface"}),subtitle:(0,r.jsx)(r.Fragment,{children:"to help your client feel the flow."}),body:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("strong",{children:"A good application is one that helps the user."})," Properly written, optimized source code allows today's modern browser technologies to spread their wings.",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),"We don't force the user to wait senselessly where it is not necessary. Sometimes, however, waiting is unavoidable – for example: for database reads/writes, to perform operations on the backend, or when a network traffic is heavy loaded –",(0,r.jsx)("strong",{children:" then the frontend takes responsibility for the whole user experience"}),'. Proper manipulation of loaders, transitions, or micro–animations makes the application seem to have a `"flow`" and anyway – ',(0,r.jsx)("strong",{children:"it runs smoothly"}),"."]})}),(0,r.jsx)(o.Ir,{title:(0,r.jsx)(r.Fragment,{children:"Comfort in any situation"}),subtitle:(0,r.jsx)(r.Fragment,{children:"because real life is not perfect."}),body:(0,r.jsxs)(r.Fragment,{children:["Sometimes there are situations in which the Internet temporarily goes down.",(0,r.jsx)("br",{}),"There are many clever ways to get out of this situation ",(0,r.jsx)("strong",{children:"with class and show professionalism to the customer"}),". A user filled out a form and can't send it? Let's cache it in case he wants to refresh the page. User moves and uses unstable mobile internet? Let's detect it and inform him about it. In addition, let's queue the events he performed – to be executed when the connection returns to normal.",(0,r.jsx)("br",{}),"We are aware of these and many other solutions ",(0,r.jsx)("strong",{children:"to simply help the person who wants to use your services"}),"."]})}),(0,r.jsx)(o.Ir,{title:(0,r.jsx)(r.Fragment,{children:"Good communication is key"}),subtitle:(0,r.jsx)(r.Fragment,{children:"to get full speed."}),body:(0,r.jsxs)(r.Fragment,{children:["To achieve optimal speed in the performance of your app – a good frontend alone is not enough. Planned concepts must be followed at the level of both server architecture and database models. This is not possible when different teams deal with different layers of the application. Moreover - when they do not consistently set requirements. Also, it is very important to set minimalist portions of data so as not to overload network traffic and waste transfer. To address this – at ",(0,r.jsx)(a.I,{fullName:!0})," we model applications using Domain Driven Design and Behavior Driver Design – ",(0,r.jsx)("strong",{children:"business flow over technology"}),".",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)("strong",{children:"Technology should not impose itself, causing significant changes in business thinking"}),"."]})})]})}}},function(e){e.O(0,[353,774,888,179],function(){return e(e.s=1847)}),_N_E=e.O()}]);