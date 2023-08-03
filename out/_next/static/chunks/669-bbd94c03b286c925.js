"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[669],{1519:function(e,t,i){i.d(t,{Z:function(){return w}});var r=i(3366),n=i(7462),a=i(7294),l=i(512),o=i(4780),s=i(1796),c=i(948),d=i(1657),h=i(1588),u=i(4867);function g(e){return(0,u.Z)("MuiDivider",e)}(0,h.Z)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);var f=i(5893);let v=["absolute","children","className","component","flexItem","light","orientation","role","textAlign","variant"],x=e=>{let{absolute:t,children:i,classes:r,flexItem:n,light:a,orientation:l,textAlign:s,variant:c}=e;return(0,o.Z)({root:["root",t&&"absolute",c,a&&"light","vertical"===l&&"vertical",n&&"flexItem",i&&"withChildren",i&&"vertical"===l&&"withChildrenVertical","right"===s&&"vertical"!==l&&"textAlignRight","left"===s&&"vertical"!==l&&"textAlignLeft"],wrapper:["wrapper","vertical"===l&&"wrapperVertical"]},g,r)},p=(0,c.ZP)("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.root,i.absolute&&t.absolute,t[i.variant],i.light&&t.light,"vertical"===i.orientation&&t.vertical,i.flexItem&&t.flexItem,i.children&&t.withChildren,i.children&&"vertical"===i.orientation&&t.withChildrenVertical,"right"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignRight,"left"===i.textAlign&&"vertical"!==i.orientation&&t.textAlignLeft]}})(({theme:e,ownerState:t})=>(0,n.Z)({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin"},t.absolute&&{position:"absolute",bottom:0,left:0,width:"100%"},t.light&&{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:(0,s.Fq)(e.palette.divider,.08)},"inset"===t.variant&&{marginLeft:72},"middle"===t.variant&&"horizontal"===t.orientation&&{marginLeft:e.spacing(2),marginRight:e.spacing(2)},"middle"===t.variant&&"vertical"===t.orientation&&{marginTop:e.spacing(1),marginBottom:e.spacing(1)},"vertical"===t.orientation&&{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"},t.flexItem&&{alignSelf:"stretch",height:"auto"}),({ownerState:e})=>(0,n.Z)({},e.children&&{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,"&::before, &::after":{content:'""',alignSelf:"center"}}),({theme:e,ownerState:t})=>(0,n.Z)({},t.children&&"vertical"!==t.orientation&&{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`}}),({theme:e,ownerState:t})=>(0,n.Z)({},t.children&&"vertical"===t.orientation&&{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`}}),({ownerState:e})=>(0,n.Z)({},"right"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"90%"},"&::after":{width:"10%"}},"left"===e.textAlign&&"vertical"!==e.orientation&&{"&::before":{width:"10%"},"&::after":{width:"90%"}})),m=(0,c.ZP)("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,t)=>{let{ownerState:i}=e;return[t.wrapper,"vertical"===i.orientation&&t.wrapperVertical]}})(({theme:e,ownerState:t})=>(0,n.Z)({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`},"vertical"===t.orientation&&{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`})),j=a.forwardRef(function(e,t){let i=(0,d.Z)({props:e,name:"MuiDivider"}),{absolute:a=!1,children:o,className:s,component:c=o?"div":"hr",flexItem:h=!1,light:u=!1,orientation:g="horizontal",role:j="hr"!==c?"separator":void 0,textAlign:w="center",variant:b="fullWidth"}=i,Z=(0,r.Z)(i,v),k=(0,n.Z)({},i,{absolute:a,component:c,flexItem:h,light:u,orientation:g,role:j,textAlign:w,variant:b}),y=x(k);return(0,f.jsx)(p,(0,n.Z)({as:c,className:(0,l.Z)(y.root,s),role:j,ref:t,ownerState:k},Z,{children:o?(0,f.jsx)(m,{className:y.wrapper,ownerState:k,children:o}):null}))});j.muiSkipListHighlight=!0;var w=j},6296:function(e,t,i){i.d(t,{Y:function(){return o}});var r=i(5893),n=i(5861),a=i(6242),l=i(4267);let o=e=>{let{title:t,subtitle:i,body:o}=e;return(0,r.jsx)("article",{children:(0,r.jsx)(a.Z,{elevation:0,sx:{minWidth:"100%"},children:(0,r.jsxs)(l.Z,{sx:{px:0},children:[(0,r.jsx)(n.Z,{variant:"h2",children:t}),(0,r.jsx)(n.Z,{variant:"h3",children:i}),(0,r.jsx)(n.Z,{variant:"body1",sx:{textIndent:"3rem"},children:o})]})})})}},7125:function(e,t,i){i.d(t,{H:function(){return o}});var r=i(5893),n=i(4223),a=i(5861),l=i(3321);let o=e=>{let{objectOfInterest:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.Z,{variant:"h3",children:"Do you want to talk? Use the link below to ask for a details. We will respond to you as soon as possible. "}),(0,r.jsx)(n.H,{data:[{content:(0,r.jsxs)(l.Z,{size:"large",fullWidth:!0,children:["I have question about ",t]})},{content:(0,r.jsx)(l.Z,{size:"large",fullWidth:!0,children:"I want to ask a general question"})}]})]})}},4635:function(e,t,i){i.d(t,{w:function(){return a}});var r=i(5893),n=i(6940);let a=e=>{let{image:t,alt:i,credits:a}=e;return(0,r.jsx)("section",{style:{position:"relative",height:"calc(20vw + 300px)"},children:(0,r.jsx)(n.J,{image:t,alt:i,credits:a,priority:!0,fill:!0,asCover:!0})})}},6940:function(e,t,i){i.d(t,{J:function(){return l}});var r=i(5893),n=i(5861),a=i(9748);let l=e=>{let{image:t,alt:i,credits:l,height:o,priority:s=!1,fill:c=!1,asCover:d=!1,style:h}=e;return(0,r.jsxs)("figure",{children:[(0,r.jsx)(a.Z,{src:t,alt:"Picture showing ".concat(i),height:o,priority:s,fill:c,style:{...h,objectFit:d?"cover":"initial"}}),(0,r.jsx)(n.Z,{variant:"caption",style:{position:"absolute",top:5,right:5},children:l})]})}},4223:function(e,t,i){i.d(t,{H:function(){return c}});var r=i(5893),n=i(5861),a=i(6242),l=i(4267),o=i(1233),s=i(7294);let c=e=>{let{data:t}=e,i={alignItems:"center",display:"flex",justifyContent:"center"};return(0,r.jsx)(o.Z,{alignItems:"flex-start",my:10,children:t.map((e,t)=>(0,r.jsx)(s.Fragment,{children:(0,r.jsx)(a.Z,{variant:"outlined",sx:{minHeight:"150px",...i},children:(0,r.jsxs)(l.Z,{children:[e.heading&&(0,r.jsx)(n.Z,{variant:"h3",sx:{minHeight:"100px"},children:e.heading}),(0,r.jsx)(n.Z,{variant:"body1",sx:"string"!=typeof e.content?{margin:0,width:"100%"}:void 0,children:e.content})]})})},t))})}},7592:function(e,t,i){i.d(t,{U:function(){return d}});var r=i(5893),n=i(6300),a=i(4223),l=i(5861),o=i(3321),s=i(1163);let c=e=>{let{href:t,content:i}=e;return(0,r.jsx)(o.Z,{size:"large",fullWidth:!0,children:(0,r.jsx)(n.b,{href:t,children:i})})},d=e=>{let{itemsToShow:t}=e,i=(0,s.useRouter)(),n=e=>t.filter(e=>e!==i.pathname).includes(e);return(0,r.jsxs)("aside",{children:[(0,r.jsx)(l.Z,{variant:"h3",children:"See how we can help you with other creative areas"}),(0,r.jsx)(a.H,{data:[n("/software/architecture")&&{heading:(0,r.jsxs)(r.Fragment,{children:["Read about ",(0,r.jsx)("strong",{children:"architecture"})," solutions:"]}),content:(0,r.jsx)(c,{href:"/software/architecture",content:"Software architecture"})},n("/software/backend")&&{heading:(0,r.jsxs)(r.Fragment,{children:["Try our ",(0,r.jsx)("strong",{children:"backend"})," services:"]}),content:(0,r.jsx)(c,{href:"/software/backend",content:"Server solutions"})},n("/software/frontend")&&{heading:(0,r.jsxs)(r.Fragment,{children:["Check out ",(0,r.jsx)("strong",{children:"frontend"})," services:"]}),content:(0,r.jsx)(c,{href:"/software/frontend",content:"User Interface solutions"})},n("/sound/soundtracks")&&{heading:(0,r.jsxs)(r.Fragment,{children:["Check out ",(0,r.jsx)("strong",{children:"sound and music making"})," services:"]}),content:(0,r.jsx)(c,{href:"/sound/soundtracks",content:"backtracks and soundtracks"})},n("/sound/studio")&&{heading:(0,r.jsxs)(r.Fragment,{children:["Read about ",(0,r.jsx)("strong",{children:"mix and mastering"})," studio services:"]}),content:(0,r.jsx)(c,{href:"/sound/studio",content:"Music studio serviecs"})}].filter(Boolean)})]})}},210:function(e,t,i){i.d(t,{w:function(){return l}});var r=i(5893),n=i(5582),a=i(5861);let l=e=>{let{children:t,title:i}=e;return(0,r.jsxs)(n.Z,{children:[(0,r.jsx)(a.Z,{variant:"h1",children:i}),t]})}}}]);