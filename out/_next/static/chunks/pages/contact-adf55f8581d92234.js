(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[335],{1382:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contact",function(){return a(2330)}])},6296:function(e,t,a){"use strict";a.d(t,{Y:function(){return l}});var n=a(5893),r=a(5861),s=a(6242),i=a(4267);let l=e=>{let{title:t,subtitle:a,body:l}=e;return(0,n.jsx)("article",{children:(0,n.jsx)(s.Z,{elevation:0,sx:{minWidth:"100%"},children:(0,n.jsxs)(i.Z,{sx:{px:0},children:[(0,n.jsx)(r.Z,{variant:"h2",children:t}),(0,n.jsx)(r.Z,{variant:"h3",children:a}),(0,n.jsx)(r.Z,{variant:"body1",sx:{textIndent:"3rem"},children:l})]})})})}},2330:function(e,t,a){"use strict";a.r(t),a.d(t,{__N_SSG:function(){return g},default:function(){return Z}});var n=a(5893),r=a(2798);let s=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"error";if(console[t](e),(0,r.n5)(!0)){var a;(null===(a=window)||void 0===a?void 0:a.Rollbar)[t](e)}};var i=a(6154);let l=async e=>{{let t=(0,r.n5)(!0)?"https://mailer.michalsalek.com/send":"http://172.27.61.32:7000/send";try{await i.Z.post(t,e),await Promise.resolve()}catch(e){s(e),await Promise.reject(e)}}};var o=a(3537),u=a(3453),c=a(7653),d=a(5861),h=a(1233),m=a(7294);let x=e=>{let{isSuccessfully:t}=e;return(0,n.jsx)(h.Z,{sx:{position:"absolute",top:"15%",p:5,backgroundColor:u.e.transparentWhite,minHeight:"unset",maxWidth:"90%"},children:t?(0,n.jsx)(d.Z,{m:0,variant:"body1",color:c.$.palette.success.main,fontWeight:"500",children:"Your message has been sent. Thank you."}):(0,n.jsxs)(d.Z,{m:0,variant:"body1",color:c.$.palette.error.main,fontWeight:"500",children:["Connection problem here. Please send this message manually to: ",(0,n.jsx)("strong",{children:(0,o.G)()}),". Or try again."]})})};var p=a(6296);let v=()=>{let[e,t]=(0,m.useState)(!1),[a,n]=(0,m.useState)(0),r=(0,m.useRef)(0);return(0,m.useEffect)(()=>{var t;return e?(r.current=null===(t=window)||void 0===t?void 0:t.setInterval(()=>{n(e=>e>=100?0:e+9)},120),()=>{clearInterval(r.current)}):(clearInterval(r.current),()=>void 0)},[e]),{loading:e,setLoading:t,loadingProgressValue:a,resetLoadingProgressValue:()=>{n(0)}}};var y=a(8456),w=a(5582),f=a(4054),j=a(6737),b=a(3321),g=!0;function Z(){let[e,t]=(0,m.useState)(""),[a,s]=(0,m.useState)(""),[i,o]=(0,m.useState)(""),[u,c]=(0,m.useState)(""),g=(0,m.useMemo)(()=>!!(i&&u),[i,u]),Z=()=>{o(""),c("")},[S,_]=(0,m.useState)(!1),[C,E]=(0,m.useState)(!1),[W,k]=(0,m.useState)(!0),[I,V]=(0,m.useState)(!1),{loading:N,setLoading:G,loadingProgressValue:P,resetLoadingProgressValue:D}=v(),[O,R]=(0,m.useState)(!1),T=async()=>{V(!1),_(!1),await (0,r.yV)(100),W&&Z(),E(!1),D()},Y=async()=>{E(!0),await (0,r.yV)(100),E(!1),await (0,r.yV)(100),E(!0),await (0,r.yV)(200),E(!1),await (0,r.yV)(100),E(!0),await (0,r.yV)(500),E(!1)},M=async()=>{if(_(!0),!g){_(!1),await Y();return}R(!0),G(!0),await (0,r.yV)(700);try{await l({subject:i,replyTo:e,text:u,signature:a}),k(!0)}catch(e){k(!1),E(!0)}G(!1),V(!0),R(!1)},z=(0,m.useMemo)(()=>I&&W?"success":C?"error":"primary",[I,W,C]);return(0,n.jsxs)(w.Z,{children:[(0,n.jsx)(d.Z,{variant:"h1",children:"Contact with us"}),(0,n.jsx)(p.Y,{subtitle:(0,n.jsx)(n.Fragment,{children:"How can we help you?"}),body:(0,n.jsxs)(n.Fragment,{children:["Use the contact form below. We always try to make our response time as fast as possible. Usually it is one day.",(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),"Give us your email address to enable us to respond."]})}),(0,n.jsx)(f.Z,{component:"form","aria-autocomplete":"both",onSubmit:async e=>{null==e||e.preventDefault(),I?await T():await M()},sx:{width:"100%"},children:(0,n.jsxs)(h.Z,{maxWidth:"1000px",justifyContent:"center",flexWrap:"wrap",alignItems:"baseline",rowGap:0,children:[(0,n.jsx)(h.Z,{flexDirection:"column",rowGap:0,flex:1,alignItems:"stretch",minWidth:"320px",children:(0,n.jsx)(j.Z,{error:C,disabled:S,label:"Email to reply *",placeholder:"Reply to",type:"email",autoComplete:"email",value:e,onChange:e=>t(e.target.value)})}),(0,n.jsxs)(h.Z,{flexDirection:"column",flex:2,rowGap:0,alignItems:"stretch",minWidth:"320px",children:[(0,n.jsx)(j.Z,{error:C,disabled:S,label:"Subject *",placeholder:"Email title",value:i,onChange:e=>o(e.target.value)}),(0,n.jsxs)(h.Z,{sx:{position:"relative"},children:[(0,n.jsx)(j.Z,{error:C,disabled:S,multiline:!0,minRows:12,label:"Message *",placeholder:"Email body",value:u,onChange:e=>c(e.target.value),sx:{width:"100%"}}),I&&(0,n.jsx)(x,{isSuccessfully:W})]}),(0,n.jsx)(j.Z,{disabled:S,label:"Your name",autoComplete:"given-name",value:a,onChange:e=>s(e.target.value)}),(0,n.jsx)(b.Z,{color:z,type:"submit",sx:{my:"2rem",height:"3rem",alignItems:"center",pointerEvents:O?"none":"all"},size:"large",children:N?(0,n.jsx)(y.Z,{thickness:20,size:24,color:"inherit",variant:"determinate",value:P}):I?"OK":"SEND"})]})]})})]})}}},function(e){e.O(0,[586,774,888,179],function(){return e(e.s=1382)}),_N_E=e.O()}]);