(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[335],{1382:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contact",function(){return r(1449)}])},1221:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{noSSR:function(){return o},default:function(){return u}});let n=r(8754),l=(r(7294),n._(r(177)));function a(e){return{default:(null==e?void 0:e.default)||e}}function o(e,t){return delete t.webpack,delete t.modules,e(t)}function u(e,t){let r=l.default,n={loading:e=>{let{error:t,isLoading:r,pastDelay:n}=e;return null}};e instanceof Promise?n.loader=()=>e:"function"==typeof e?n.loader=e:"object"==typeof e&&(n={...n,...e}),n={...n,...t};let u=n.loader;return(n.loadableGenerated&&(n={...n,...n.loadableGenerated},delete n.loadableGenerated),"boolean"!=typeof n.ssr||n.ssr)?r({...n,loader:()=>null!=u?u().then(a):Promise.resolve(a(()=>null))}):(delete n.webpack,delete n.modules,o(r,n))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7747:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return a}});let n=r(8754),l=n._(r(7294)),a=l.default.createContext(null)},177:function(e,t,r){"use strict";/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return p}});let n=r(8754),l=n._(r(7294)),a=r(7747),o=[],u=[],s=!1;function i(e){let t=e(),r={loading:!0,loaded:null,error:null};return r.promise=t.then(e=>(r.loading=!1,r.loaded=e,e)).catch(e=>{throw r.loading=!1,r.error=e,e}),r}class d{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function c(e){return function(e,t){let r=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),n=null;function o(){if(!n){let t=new d(e,r);n={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return n.promise()}if(!s){let e=r.webpack?r.webpack():r.modules;e&&u.push(t=>{for(let r of e)if(t.includes(r))return o()})}function i(e,t){!function(){o();let e=l.default.useContext(a.LoadableContext);e&&Array.isArray(r.modules)&&r.modules.forEach(t=>{e(t)})}();let u=l.default.useSyncExternalStore(n.subscribe,n.getCurrentValue,n.getCurrentValue);return l.default.useImperativeHandle(t,()=>({retry:n.retry}),[]),l.default.useMemo(()=>{var t;return u.loading||u.error?l.default.createElement(r.loading,{isLoading:u.loading,pastDelay:u.pastDelay,timedOut:u.timedOut,error:u.error,retry:n.retry}):u.loaded?l.default.createElement((t=u.loaded)&&t.default?t.default:t,e):null},[e,u])}return i.preload=()=>o(),i.displayName="LoadableComponent",l.default.forwardRef(i)}(i,e)}function f(e,t){let r=[];for(;e.length;){let n=e.pop();r.push(n(t))}return Promise.all(r).then(()=>{if(e.length)return f(e,t)})}c.preloadAll=()=>new Promise((e,t)=>{f(o).then(e,t)}),c.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let r=()=>(s=!0,t());f(u,e).then(r,r)})),window.__NEXT_PRELOADREADY=c.preloadReady;let p=c},2388:function(e,t,r){"use strict";r.d(t,{Cp:function(){return i},Ir:function(){return u},_p:function(){return a},df:function(){return s},wn:function(){return o}});var n=r(5152),l=r.n(n);let a=l()(()=>r.e(778).then(r.bind(r,4778)),{loadableGenerated:{webpack:()=>[4778]},ssr:!1}),o=l()(()=>Promise.all([r.e(892),r.e(402)]).then(r.bind(r,9402)),{loadableGenerated:{webpack:()=>[9402]},ssr:!0}),u=l()(()=>r.e(816).then(r.bind(r,816)),{loadableGenerated:{webpack:()=>[816]},ssr:!0}),s=l()(()=>r.e(372).then(r.bind(r,9115)),{loadableGenerated:{webpack:()=>[9115]},ssr:!1}),i=l()(()=>Promise.all([r.e(887),r.e(34)]).then(r.bind(r,3034)),{loadableGenerated:{webpack:()=>[3034]},ssr:!1})},1449:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return u},default:function(){return s}});var n=r(5893),l=r(2388),a=r(5582),o=r(5861),u=!0;function s(){return(0,n.jsxs)(a.Z,{children:[(0,n.jsx)(o.Z,{variant:"h1",children:"Contact"}),(0,n.jsx)(l.Ir,{subtitle:(0,n.jsx)(n.Fragment,{children:"How can we help you?"}),body:(0,n.jsxs)(n.Fragment,{children:["Use the contact form below. We always try to make our response time as fast as possible. Usually it is one day.",(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),"Give us your email address to enable us to respond. ",(0,n.jsx)("br",{}),(0,n.jsx)("strong",{children:"We will send you a copy of your message being an acknowledgment of receipt."})]})}),(0,n.jsx)(l.Cp,{})]})}},5152:function(e,t,r){e.exports=r(1221)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=1382)}),_N_E=e.O()}]);