import { isProductionEnv } from '@msalek/utils'
import { ReactElement }    from 'react'




export const reportIssue = (msg: any, type: 'log' | 'warn' | 'error' = 'error'): void => {
    console[type](msg)

    if (isProductionEnv(true)) {
        // @ts-ignore
        (window?.Rollbar)[type](msg)
    }
}


export const ErrorTracker = (): ReactElement | null =>
    isProductionEnv(true) ?
    <script dangerouslySetInnerHTML={{
        __html: `function _0x5404(){var _0x1d9601=['EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload','handleAnonymousErrors','async','wrap','_rollbarOldAdd','Rollbar','undefined','removeEventListener','readyState','error','exports','reason','defineProperty','args','getElementsByTagName','method','log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad','belongsToShim','625203ORSbaX','517443lcxFlX','263056Kbdegl','7Iumswy','241135vyFHWx','hasOwnProperty','_rollbar_wrapped','handleUncaughtException','messages','split','addEventListener','1.0','541664dBVMDK','rollbar','impl','shift','_rollbarOldRemove','unhandledrejection','1165926KgipVK','prototype','options','function','415150gXHSTn','_rollbarURH','captureLoad','log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad','toString','call','4EcDLFT','https://cdn.rollbar.com/rollbarjs/refs/tags/v2.26.0/rollbar.min.js','rollbarJsUrl','shimId','default','globalAlias','create','enabled','_rollbarShims','captureUncaughtExceptions','slice','_rollbarOldOnError','__esModule'];_0x5404=function(){return _0x1d9601;};return _0x5404();}function _0x2eb2(_0x51182d,_0x13eb81){var _0x5404c9=_0x5404();return _0x2eb2=function(_0x2eb2dc,_0x8688d6){_0x2eb2dc=_0x2eb2dc-0x1e2;var _0x1d94cb=_0x5404c9[_0x2eb2dc];return _0x1d94cb;},_0x2eb2(_0x51182d,_0x13eb81);}var _0x134e23=_0x2eb2;(function(_0x348b53,_0x5dcba8){var _0x46e6f0=_0x2eb2,_0x5135c6=_0x348b53();while(!![]){try{var _0x445d1d=-parseInt(_0x46e6f0(0x1e3))/0x1+parseInt(_0x46e6f0(0x1f7))/0x2+parseInt(_0x46e6f0(0x1e2))/0x3+-parseInt(_0x46e6f0(0x1fd))/0x4*(parseInt(_0x46e6f0(0x1e5))/0x5)+parseInt(_0x46e6f0(0x1f3))/0x6*(parseInt(_0x46e6f0(0x1e4))/0x7)+parseInt(_0x46e6f0(0x1ed))/0x8+-parseInt(_0x46e6f0(0x21c))/0x9;if(_0x445d1d===_0x5dcba8)break;else _0x5135c6['push'](_0x5135c6['shift']());}catch(_0x4f2ab2){_0x5135c6['push'](_0x5135c6['shift']());}}}(_0x5404,0x3fcd7));var _rollbarConfig={'accessToken':'cee1437084a847d7882b5188caec57ac','captureUncaught':!![],'captureUnhandledRejections':!![],'payload':{'environment':'production','client':{'javascript':{'code_version':_0x134e23(0x1ec),'source_map_enabled':!![],'guess_uncaught_frames':!![]}}}};!function(_0x232087){var _0x1e2e0e={};function _0x557f20(_0x48bc1f){var _0x5e842e=_0x2eb2;if(_0x1e2e0e[_0x48bc1f])return _0x1e2e0e[_0x48bc1f]['exports'];var _0x4935bf=_0x1e2e0e[_0x48bc1f]={'i':_0x48bc1f,'l':!0x1,'exports':{}};return _0x232087[_0x48bc1f]['call'](_0x4935bf[_0x5e842e(0x214)],_0x4935bf,_0x4935bf['exports'],_0x557f20),_0x4935bf['l']=!0x0,_0x4935bf[_0x5e842e(0x214)];}_0x557f20['m']=_0x232087,_0x557f20['c']=_0x1e2e0e,_0x557f20['d']=function(_0x447728,_0x433049,_0xc10609){_0x557f20['o'](_0x447728,_0x433049)||Object['defineProperty'](_0x447728,_0x433049,{'enumerable':!0x0,'get':_0xc10609});},_0x557f20['r']=function(_0xbead2d){'undefined'!=typeof Symbol&&Symbol['toStringTag']&&Object['defineProperty'](_0xbead2d,Symbol['toStringTag'],{'value':'Module'}),Object['defineProperty'](_0xbead2d,'__esModule',{'value':!0x0});},_0x557f20['t']=function(_0x584f01,_0x1bc385){var _0xa8d819=_0x2eb2;if(0x1&_0x1bc385&&(_0x584f01=_0x557f20(_0x584f01)),0x8&_0x1bc385)return _0x584f01;if(0x4&_0x1bc385&&'object'==typeof _0x584f01&&_0x584f01&&_0x584f01[_0xa8d819(0x209)])return _0x584f01;var _0x5d7aab=Object[_0xa8d819(0x203)](null);if(_0x557f20['r'](_0x5d7aab),Object[_0xa8d819(0x216)](_0x5d7aab,_0xa8d819(0x201),{'enumerable':!0x0,'value':_0x584f01}),0x2&_0x1bc385&&'string'!=typeof _0x584f01){for(var _0x49c77f in _0x584f01)_0x557f20['d'](_0x5d7aab,_0x49c77f,function(_0x5f122e){return _0x584f01[_0x5f122e];}['bind'](null,_0x49c77f));}return _0x5d7aab;},_0x557f20['n']=function(_0x2847ac){var _0x59cac0=_0x2847ac&&_0x2847ac['__esModule']?function(){var _0x1ede5a=_0x2eb2;return _0x2847ac[_0x1ede5a(0x201)];}:function(){return _0x2847ac;};return _0x557f20['d'](_0x59cac0,'a',_0x59cac0),_0x59cac0;},_0x557f20['o']=function(_0xffd14a,_0x54b279){var _0x1a8183=_0x2eb2;return Object['prototype'][_0x1a8183(0x1e6)][_0x1a8183(0x1fc)](_0xffd14a,_0x54b279);},_0x557f20['p']='',_0x557f20(_0x557f20['s']=0x0);}([function(_0x366566,_0x298494,_0x3c5c6a){'use strict';var _0x5a3c75=_0x134e23;var _0x2e16a5=_0x3c5c6a(0x1),_0x3a5b53=_0x3c5c6a(0x5);_rollbarConfig=_rollbarConfig||{},_rollbarConfig['rollbarJsUrl']=_rollbarConfig[_0x5a3c75(0x1ff)]||_0x5a3c75(0x1fe),_rollbarConfig['async']=void 0x0===_rollbarConfig['async']||_rollbarConfig[_0x5a3c75(0x20c)];var _0x1f9c00=_0x2e16a5['setupShim'](window,_rollbarConfig),_0x2dad49=_0x3a5b53(_rollbarConfig);window[_0x5a3c75(0x1ee)]=_0x2e16a5['Rollbar'],_0x1f9c00['loadFull'](window,document,!_rollbarConfig['async'],_rollbarConfig,_0x2dad49);},function(_0x5cd5d7,_0x5833f7,_0x19f05e){'use strict';var _0xbc4056=_0x134e23;var _0xa4ad41=_0x19f05e(0x2),_0x178db3=_0x19f05e(0x3);function _0x12ca2c(_0xcb0dc){return function(){var _0x624063=_0x2eb2;try{return _0xcb0dc['apply'](this,arguments);}catch(_0x175f85){try{console[_0x624063(0x213)]('[Rollbar]:\x20Internal\x20error',_0x175f85);}catch(_0x2c4896){}}};}var _0xed3b29=0x0;function _0x32c1f7(_0x3972d8,_0x497e90){var _0x384e0e=_0x2eb2;this[_0x384e0e(0x1f5)]=_0x3972d8,this[_0x384e0e(0x208)]=null;var _0x2d53b5=_0xed3b29++;this['shimId']=function(){return _0x2d53b5;},_0x384e0e(0x210)!=typeof window&&window[_0x384e0e(0x205)]&&(window[_0x384e0e(0x205)][_0x2d53b5]={'handler':_0x497e90,'messages':[]});}var _0x264de5=_0x19f05e(0x4),_0x221674=function(_0x31b7e9,_0x314546){return new _0x32c1f7(_0x31b7e9,_0x314546);},_0x3c62a1=function(_0x43e581){return new _0x264de5(_0x221674,_0x43e581);};function _0x42ade6(_0x2255dd){return _0x12ca2c(function(){var _0x217224=_0x2eb2,_0x742e9c=this,_0x563b6f=Array[_0x217224(0x1f4)]['slice'][_0x217224(0x1fc)](arguments,0x0),_0x33e370={'shim':_0x742e9c,'method':_0x2255dd,'args':_0x563b6f,'ts':new Date()};window['_rollbarShims'][this[_0x217224(0x200)]()]['messages']['push'](_0x33e370);});}_0x32c1f7['prototype']['loadFull']=function(_0x5a0e86,_0x42227d,_0x3200ef,_0x240bba,_0x3b7a8a){var _0x3dfb7b=_0x2eb2,_0x106536=!0x1,_0x33ca5b=_0x42227d['createElement']('script'),_0x314170=_0x42227d[_0x3dfb7b(0x218)]('script')[0x0],_0x1f5b70=_0x314170['parentNode'];_0x33ca5b['crossOrigin']='',_0x33ca5b['src']=_0x240bba['rollbarJsUrl'],_0x3200ef||(_0x33ca5b['async']=!0x0),_0x33ca5b['onload']=_0x33ca5b['onreadystatechange']=_0x12ca2c(function(){var _0x55dffc=_0x3dfb7b;if(!(_0x106536||this['readyState']&&'loaded'!==this['readyState']&&'complete'!==this[_0x55dffc(0x212)])){_0x33ca5b['onload']=_0x33ca5b['onreadystatechange']=null;try{_0x1f5b70['removeChild'](_0x33ca5b);}catch(_0x322803){}_0x106536=!0x0,(function(){var _0x5c27bd=_0x55dffc,_0x3e3db7;if(void 0x0===_0x5a0e86['_rollbarDidLoad']){_0x3e3db7=new Error('rollbar.js\x20did\x20not\x20load');for(var _0x227fcc,_0x5592d5,_0x4918e6,_0x6c3824,_0x576aca=0x0;_0x227fcc=_0x5a0e86[_0x5c27bd(0x205)][_0x576aca++];)for(_0x227fcc=_0x227fcc['messages']||[];_0x5592d5=_0x227fcc[_0x5c27bd(0x1f0)]();)for(_0x4918e6=_0x5592d5[_0x5c27bd(0x217)]||[],_0x576aca=0x0;_0x576aca<_0x4918e6['length'];++_0x576aca)if(_0x5c27bd(0x1f6)==typeof(_0x6c3824=_0x4918e6[_0x576aca])){_0x6c3824(_0x3e3db7);break;}}'function'==typeof _0x3b7a8a&&_0x3b7a8a(_0x3e3db7);}());}}),_0x1f5b70['insertBefore'](_0x33ca5b,_0x314170);},_0x32c1f7['prototype'][_0xbc4056(0x20d)]=function(_0x11c412,_0x3fa194,_0x14c3a9){var _0x5edbe7=_0xbc4056;try{var _0x163951;if(_0x163951='function'==typeof _0x3fa194?_0x3fa194:function(){return _0x3fa194||{};},'function'!=typeof _0x11c412)return _0x11c412;if(_0x11c412['_isWrap'])return _0x11c412;if(!_0x11c412[_0x5edbe7(0x1e7)]&&(_0x11c412['_rollbar_wrapped']=function(){var _0x4df5f3=_0x5edbe7;_0x14c3a9&&_0x4df5f3(0x1f6)==typeof _0x14c3a9&&_0x14c3a9['apply'](this,arguments);try{return _0x11c412['apply'](this,arguments);}catch(_0x53117){var _0x2ed53b=_0x53117;throw _0x2ed53b&&('string'==typeof _0x2ed53b&&(_0x2ed53b=new String(_0x2ed53b)),_0x2ed53b['_rollbarContext']=_0x163951()||{},_0x2ed53b['_rollbarContext']['_wrappedSource']=_0x11c412[_0x4df5f3(0x1fb)](),window['_rollbarWrappedError']=_0x2ed53b),_0x2ed53b;}},_0x11c412['_rollbar_wrapped']['_isWrap']=!0x0,_0x11c412['hasOwnProperty'])){for(var _0x57d6a5 in _0x11c412)_0x11c412['hasOwnProperty'](_0x57d6a5)&&(_0x11c412[_0x5edbe7(0x1e7)][_0x57d6a5]=_0x11c412[_0x57d6a5]);}return _0x11c412['_rollbar_wrapped'];}catch(_0x2ae4b6){return _0x11c412;}};for(var _0x12319e=_0xbc4056(0x1fa)[_0xbc4056(0x1ea)](','),_0x421513=0x0;_0x421513<_0x12319e['length'];++_0x421513)_0x32c1f7[_0xbc4056(0x1f4)][_0x12319e[_0x421513]]=_0x42ade6(_0x12319e[_0x421513]);_0x5cd5d7['exports']={'setupShim':function(_0x548b05,_0xc477d8){var _0x1178bd=_0xbc4056;if(_0x548b05){var _0x540889=_0xc477d8[_0x1178bd(0x202)]||'Rollbar';if('object'==typeof _0x548b05[_0x540889])return _0x548b05[_0x540889];_0x548b05[_0x1178bd(0x205)]={},_0x548b05['_rollbarWrappedError']=null;var _0x544e6f=new _0x3c62a1(_0xc477d8);return _0x12ca2c(function(){var _0x81af9a=_0x1178bd;_0xc477d8['captureUncaught']&&(_0x544e6f['_rollbarOldOnError']=_0x548b05['onerror'],_0xa4ad41[_0x81af9a(0x206)](_0x548b05,_0x544e6f,!0x0),_0xc477d8['wrapGlobalEventHandlers']&&_0x178db3(_0x548b05,_0x544e6f,!0x0)),_0xc477d8['captureUnhandledRejections']&&_0xa4ad41['captureUnhandledRejections'](_0x548b05,_0x544e6f,!0x0);var _0x5a0c1a=_0xc477d8['autoInstrument'];return!0x1!==_0xc477d8[_0x81af9a(0x204)]&&(void 0x0===_0x5a0c1a||!0x0===_0x5a0c1a||'object'==typeof _0x5a0c1a&&_0x5a0c1a['network'])&&_0x548b05['addEventListener']&&(_0x548b05['addEventListener']('load',_0x544e6f['captureLoad']['bind'](_0x544e6f)),_0x548b05[_0x81af9a(0x1eb)]('DOMContentLoaded',_0x544e6f['captureDomContentLoaded']['bind'](_0x544e6f))),_0x548b05[_0x540889]=_0x544e6f,_0x544e6f;})();}},'Rollbar':_0x3c62a1};},function(_0x2f6236,_0x4c0eca,_0x399380){'use strict';function _0x294e45(_0x194a94,_0x435b06,_0x378ea5,_0x3188de){var _0x1e987a=_0x2eb2;_0x194a94['_rollbarWrappedError']&&(_0x3188de[0x4]||(_0x3188de[0x4]=_0x194a94['_rollbarWrappedError']),_0x3188de[0x5]||(_0x3188de[0x5]=_0x194a94['_rollbarWrappedError']['_rollbarContext']),_0x194a94['_rollbarWrappedError']=null);var _0x54734d=_0x435b06[_0x1e987a(0x1e8)]['apply'](_0x435b06,_0x3188de);_0x378ea5&&_0x378ea5['apply'](_0x194a94,_0x3188de),'anonymous'===_0x54734d&&(_0x435b06['anonymousErrorsPending']+=0x1);}_0x2f6236['exports']={'captureUncaughtExceptions':function(_0x20f703,_0x5508cb,_0x3815a8){var _0x183ad4=_0x2eb2;if(_0x20f703){var _0x57e8a6;if(_0x183ad4(0x1f6)==typeof _0x5508cb['_rollbarOldOnError'])_0x57e8a6=_0x5508cb['_rollbarOldOnError'];else{if(_0x20f703['onerror']){for(_0x57e8a6=_0x20f703['onerror'];_0x57e8a6['_rollbarOldOnError'];)_0x57e8a6=_0x57e8a6['_rollbarOldOnError'];_0x5508cb['_rollbarOldOnError']=_0x57e8a6;}}_0x5508cb[_0x183ad4(0x20b)]();var _0x1e00ca=function(){var _0x201858=_0x183ad4,_0x4a2588=Array['prototype'][_0x201858(0x207)]['call'](arguments,0x0);_0x294e45(_0x20f703,_0x5508cb,_0x57e8a6,_0x4a2588);};_0x3815a8&&(_0x1e00ca['_rollbarOldOnError']=_0x57e8a6),_0x20f703['onerror']=_0x1e00ca;}},'captureUnhandledRejections':function(_0x45ebdd,_0x3e5221,_0x1e39f3){var _0x30125a=_0x2eb2;if(_0x45ebdd){_0x30125a(0x1f6)==typeof _0x45ebdd['_rollbarURH']&&_0x45ebdd[_0x30125a(0x1f8)]['belongsToShim']&&_0x45ebdd['removeEventListener']('unhandledrejection',_0x45ebdd['_rollbarURH']);var _0x2cfe67=function(_0xd322c9){var _0x1bf79e=_0x30125a,_0x394f27,_0xf86d2,_0x5b7b5c;try{_0x394f27=_0xd322c9['reason'];}catch(_0x4df799){_0x394f27=void 0x0;}try{_0xf86d2=_0xd322c9['promise'];}catch(_0x4b9191){_0xf86d2='[unhandledrejection]\x20error\x20getting\x20\`promise\`\x20from\x20event';}try{_0x5b7b5c=_0xd322c9['detail'],!_0x394f27&&_0x5b7b5c&&(_0x394f27=_0x5b7b5c[_0x1bf79e(0x215)],_0xf86d2=_0x5b7b5c['promise']);}catch(_0x3591a5){}_0x394f27||(_0x394f27='[unhandledrejection]\x20error\x20getting\x20\`reason\`\x20from\x20event'),_0x3e5221&&_0x3e5221['handleUnhandledRejection']&&_0x3e5221['handleUnhandledRejection'](_0x394f27,_0xf86d2);};_0x2cfe67['belongsToShim']=_0x1e39f3,_0x45ebdd[_0x30125a(0x1f8)]=_0x2cfe67,_0x45ebdd[_0x30125a(0x1eb)](_0x30125a(0x1f2),_0x2cfe67);}}};},function(_0x5ea264,_0x1fe04a,_0x130722){'use strict';var _0x13fdd7=_0x134e23;function _0x4606d4(_0x203fe8,_0x49c5aa,_0x4c98b1){var _0x4e7870=_0x2eb2;if(_0x49c5aa['hasOwnProperty']&&_0x49c5aa['hasOwnProperty'](_0x4e7870(0x1eb))){for(var _0x58e054=_0x49c5aa['addEventListener'];_0x58e054['_rollbarOldAdd']&&_0x58e054['belongsToShim'];)_0x58e054=_0x58e054[_0x4e7870(0x20e)];var _0x60a38b=function(_0x400e82,_0x72d92d,_0x41e7aa){_0x58e054['call'](this,_0x400e82,_0x203fe8['wrap'](_0x72d92d),_0x41e7aa);};_0x60a38b['_rollbarOldAdd']=_0x58e054,_0x60a38b[_0x4e7870(0x21b)]=_0x4c98b1,_0x49c5aa[_0x4e7870(0x1eb)]=_0x60a38b;for(var _0x44832e=_0x49c5aa[_0x4e7870(0x211)];_0x44832e['_rollbarOldRemove']&&_0x44832e['belongsToShim'];)_0x44832e=_0x44832e[_0x4e7870(0x1f1)];var _0x4ef4e9=function(_0x3b16fb,_0x2148f7,_0x2d337e){var _0x5a9eb2=_0x4e7870;_0x44832e[_0x5a9eb2(0x1fc)](this,_0x3b16fb,_0x2148f7&&_0x2148f7['_rollbar_wrapped']||_0x2148f7,_0x2d337e);};_0x4ef4e9['_rollbarOldRemove']=_0x44832e,_0x4ef4e9['belongsToShim']=_0x4c98b1,_0x49c5aa['removeEventListener']=_0x4ef4e9;}}_0x5ea264[_0x13fdd7(0x214)]=function(_0xe97e6b,_0x244d46,_0x209b1e){var _0xd1c2d6=_0x13fdd7;if(_0xe97e6b){var _0x12f24b,_0x4b2c63,_0x46f0bc=_0xd1c2d6(0x20a)['split'](',');for(_0x12f24b=0x0;_0x12f24b<_0x46f0bc['length'];++_0x12f24b)_0xe97e6b[_0x4b2c63=_0x46f0bc[_0x12f24b]]&&_0xe97e6b[_0x4b2c63][_0xd1c2d6(0x1f4)]&&_0x4606d4(_0x244d46,_0xe97e6b[_0x4b2c63]['prototype'],_0x209b1e);}};},function(_0x12a30c,_0x3ef1a7,_0x56a979){'use strict';function _0x52ae7f(_0x5201c8,_0x4f7049){var _0x5daa18=_0x2eb2;this['impl']=_0x5201c8(_0x4f7049,this),this[_0x5daa18(0x1f5)]=_0x4f7049,function(_0x583562){var _0x56e69c=_0x5daa18;for(var _0x3fca5b=function(_0x13b86c){return function(){var _0x105f09=_0x2eb2,_0x359a43=Array['prototype']['slice'][_0x105f09(0x1fc)](arguments,0x0);if(this[_0x105f09(0x1ef)][_0x13b86c])return this['impl'][_0x13b86c]['apply'](this['impl'],_0x359a43);};},_0x533726=_0x56e69c(0x21a)[_0x56e69c(0x1ea)](','),_0x1de2f3=0x0;_0x1de2f3<_0x533726['length'];_0x1de2f3++)_0x583562[_0x533726[_0x1de2f3]]=_0x3fca5b(_0x533726[_0x1de2f3]);}(_0x52ae7f['prototype']);}_0x52ae7f['prototype']['_swapAndProcessMessages']=function(_0x3107e0,_0x1e08c3){var _0xa1ce70=_0x2eb2,_0x59bf71,_0x1d53db,_0x169513;for(this[_0xa1ce70(0x1ef)]=_0x3107e0(this['options']);_0x59bf71=_0x1e08c3[_0xa1ce70(0x1f0)]();)_0x1d53db=_0x59bf71[_0xa1ce70(0x219)],_0x169513=_0x59bf71[_0xa1ce70(0x217)],this[_0x1d53db]&&'function'==typeof this[_0x1d53db]&&('captureDomContentLoaded'===_0x1d53db||_0xa1ce70(0x1f9)===_0x1d53db?this[_0x1d53db]['apply'](this,[_0x169513[0x0],_0x59bf71['ts']]):this[_0x1d53db]['apply'](this,_0x169513));return this;},_0x12a30c['exports']=_0x52ae7f;},function(_0x4599c0,_0xd27b6a,_0x106200){'use strict';var _0x1b29cb=_0x134e23;_0x4599c0[_0x1b29cb(0x214)]=function(_0x376571){return function(_0x5a55e1){var _0x5ce52a=_0x2eb2;if(!_0x5a55e1&&!window['_rollbarInitialized']){for(var _0xf9426,_0x1f5268,_0x11f19d=(_0x376571=_0x376571||{})['globalAlias']||_0x5ce52a(0x20f),_0x43270c=window[_0x5ce52a(0x1ee)],_0x3432f6=function(_0x591964){return new _0x43270c(_0x591964);},_0x4cea5d=0x0;_0xf9426=window['_rollbarShims'][_0x4cea5d++];)_0x1f5268||(_0x1f5268=_0xf9426['handler']),_0xf9426['handler']['_swapAndProcessMessages'](_0x3432f6,_0xf9426[_0x5ce52a(0x1e9)]);window[_0x11f19d]=_0x1f5268,window['_rollbarInitialized']=!0x0;}};};}]);`
    }}/> : null

