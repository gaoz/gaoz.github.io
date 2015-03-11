clouda.define("lib/helper",function(module){!function(window){"use strict";if("object"==typeof window){"undefined"==typeof window.clouda&&(window.clouda=window.Blend={}),"function"!=typeof clouda.lightapp&&(clouda.lightapp=function(a,e){clouda.lightapp.ak=a,"function"==typeof e&&e()}),"function"!=typeof clouda.lightInit&&(clouda.lightInit=function(a,e){clouda.lightapp.ak=a.ak,"function"==typeof e&&e()}),clouda.STATUS={SUCCESS:0,SYSTEM_FAILURE:-3,USER_CANCELED:-2},clouda.RUNTIMES={WEB:0,KUANG:1,NUWA:2},clouda.PLATFORMS={ANDROID:1,IOS:2,OTHER:0},function(){if(clouda.RUNTIME="undefined"!=typeof BLightApp?clouda.RUNTIMES.KUANG:navigator.userAgent.match(/BaiduLightAppRuntime/i)?clouda.RUNTIMES.NUWA:clouda.RUNTIMES.WEB,clouda.PLATFORM=navigator.userAgent.match(/android/i)?clouda.PLATFORMS.ANDROID:navigator.userAgent.match(/(iphone)|(ipad)/i)?clouda.PLATFORMS.IOS:clouda.PLATFORMS.OTHER,navigator.userAgent.match(/baiduboxapp\/([\d.-_]*)/i)){var a=navigator.userAgent.match(/baiduboxapp\/([\d.-_]*)/i)[1];a.match(/[0-9]\.[^_]*/)&&(a=a.match(/[0-9]\.[^_]*/)[0]),clouda.PLATFORM===clouda.PLATFORMS.IOS&&(a=a.split(".").reverse().join(".")),clouda.RUNTIME_VERSION=a}else clouda.RUNTIME_VERSION="0";if(navigator.userAgent.match(/BaiduLightAppRuntime\/([\d\.]+)/i)){var a=navigator.userAgent.match(/BaiduLightAppRuntime\/([\d\.]*)/i)[1];clouda.NUWA_VERSION=a}else clouda.NUWA_VERSION="0"}();var ErrCode={UNKNOW_CALLBACK:-10,UNKNOW_INPUT:-99,SYSTEM_FAILURE:-3,USER_CANCELED:-2,AK_UNDEFINED:-4,RT_GETERROR:5,EXEC_ERROR:-5,NOT_FINISH:-98,BROWSER_NOT_SUPPORT:-97,ACC_GET_ERR:6,LOC_GET_ERR:7,CAP_GET_ERR:8,CONTACT_FIND_ERR:9,GLO_ERR:10,REACH_ERR:11,MEDIA_ERR:12,CPS_ERROR:13,BTY_ERROR:14,QR_ERR:15,FS_ERR:16,BTY_ERR:17,CONNECT_ERROR:18,SCREEN_ERROR:19,FR_ERROR:20,PUSH_ERR:21,GYRO_ERR:22,MAP_ERROR:23,LOGIN_ERROR:24,PCS_ERROR:25,DEVICE_ERR:26,PAY_ERROR:27,APP_ERROR:28},errorMessage={0:"成功","-10":"接口返回不符合预期","-2":"用户取消","-3":"接口的运行错误。","-4":"错误，您需要在调用api前设置ak。 clouda.lightapp(your_ak_here);","-5":"执行接口出错。","-98":"接口未提供。","-99":"接口输入不符合预期。",5:"接口的运行环境准备中出错。"},runtimeError=function(a,e,t){if(clouda.RUNTIME===clouda.RUNTIMES.WEB&&clouda.PLATFORM===clouda.PLATFORMS.ANDROID)return void clouda.lib.moplus.openApp();0>a&&(e=a),"object"==typeof t&&"function"==typeof t.onfail&&t.onfail(e);try{throw new Error}catch(n){var o=n.stack.split("\n"),u=errorMessage[a];if(!u)for(var r in ErrCode)if(ErrCode[r]===a){u=a+":"+r;break}console.error(u+"! "+(e?"app错误信息"+JSON.stringify(e):"")+o[2].replace(/\s*/,""))}},kuangstack=[],stackn=0,kuangForReady=function(functionname,argus){1!=clouda.STATUS.SUCCESS&&0===stackn?kuangstack.push({func:functionname,arg:argus}):eval(functionname).apply(null,argus)},BLightClass=function(){return function(a){return function(){a.exec.apply(a,arguments)}}(this)},emptyfunc=function(){};BLightClass.prototype.exec=function(){for(var a,e=arguments,t=Array.prototype.shift.apply(e),n=0,o=e.length;o>n;n++)"function"==typeof e[n]&&("function"==typeof e[n+1]?(a=clouda.lib.utils.regcallback(e[n],e[n+1]),e[n+1]=a.f):a=clouda.lib.utils.regcallback(e[n],emptyfunc),e[n]=a.s);1!=clouda.STATUS.SUCCESS&&0===stackn?kuangstack.push({func:"BLightApp."+t,arg:e}):BLightApp[t].apply(BLightApp,e)};var cloudaBLight=new BLightClass,DelegateClass=function(a,e,t){return this.module=a,this.submodule=e,this.func=t,function(a){return function(){a.exec.apply(a,arguments)}}(this)};DelegateClass.prototype.exec=function(){var a=arguments,e=this;installPlugin(this.module,function(t){try{e.func?t[e.submodule][e.func].apply(e,a):t[e.submodule].apply(e,a)}catch(n){var o;o=t?ErrCode.EXEC_ERROR:clouda.STATUS.SYSTEM_FAILURE,a.length&&"object"==typeof a[a.length-1]&&"function"==typeof a[a.length-1].onfail&&a[a.length-1].onfail(o),console.error(n.stack),e.error(o)}})},clouda.lightapp.error=DelegateClass.prototype.error=runtimeError;var beforeRuntimeReadyStack=[],timeoutid,triggerStack=function(){if(beforeRuntimeReadyStack.length){for(var i=0,len=beforeRuntimeReadyStack.length;len>i;i++)installPlugin.apply(void 0,beforeRuntimeReadyStack[i]);beforeRuntimeReadyStack.length=0}if(kuangstack.length){for(var j=0,jlen=kuangstack.length;jlen>j;j++)"undefined"!=typeof BLightApp?eval(kuangstack[j].func).apply(BLightApp,kuangstack[j].arg):eval(kuangstack[j].func).apply(void 0,kuangstack[j].arg);kuangstack.length=0}};timeoutid=setTimeout(function(){stackn=100,clouda.STATUS.SUCCESS||(clouda.STATUS.SUCCESS=1),triggerStack()},3e3),document.addEventListener("runtimeready",function(){clouda.STATUS.SUCCESS=1,"undefined"!=typeof BLightApp?clouda.RUNTIME=clouda.RUNTIMES.KUANG:clouda.RUNTIME!=clouda.RUNTIMES.KUANG&&(clouda.RUNTIME=clouda.RUNTIMES.NUWA),clearTimeout(timeoutid),triggerStack()});var regPlugins={},regCallbacks={},installPlugin=function(a,e,t){if(!clouda.lightapp.ak)return runtimeError(ErrCode.AK_UNDEFINED),console.error("错误，'"+a+"' clouda.lightapp(your_ak_here);"),!1;if(!clouda.STATUS.SUCCESS&&100>stackn)return void beforeRuntimeReadyStack.push([a,e]);if(!a)return!1;if("undefined"!=typeof regPlugins[a]&&regPlugins[a])return e(regPlugins[a]);if(Array.isArray(regCallbacks[a]))return regCallbacks[a].push(e);try{nuwa.pm.bindAk(clouda.lightapp.ak),regCallbacks[a]=[],regCallbacks[a].push(e),nuwa.pm.absorb(a,function(e){e.on("error",function(){throw new Error("RT_GETERROR")}),e.on("progress",function(e){console.log(a+" percentage = "+e)}),e.on("complete",function(){var e=nuwa.require(a);regPlugins[a]=e;for(var t=0,n=regCallbacks[a].length;n>t;t++)regCallbacks[a][t](e);delete regCallbacks[a]})})}catch(n){try{e(null)}catch(o){runtimeError(clouda.STATUS.SYSTEM_FAILURE,null,t),console.error(o.stack)}}return!1},count=0,uniqid=function(a){return a=a||"BlendUI",a+count++};clouda.device||(clouda.device={}),clouda.mbaas||(clouda.mbaas={}),clouda.lib||(clouda.lib={}),clouda.runtimeError=runtimeError,clouda.DelegateClass=DelegateClass,clouda.installPlugin=installPlugin,clouda.cloudaBLight=cloudaBLight,clouda.kuangForReady=kuangForReady,clouda.ErrCode=ErrCode}}(window)});
;clouda.define("lib/utils",function(t){function r(t){t.debug||(t.debug=t.info),f.log=t}var e,o=console,t=clouda.lib||{},n=(clouda.DelegateClass,clouda.kuangForReady,clouda.runtimeError,clouda.installPlugin,clouda.cloudaBLight),i=function(){};e=t.callbackProxy?t.callbackProxy:{successProxy:{},failProxy:{}};var c=100,a='function (randomId,result) {var sproxy = clouda.lib.callbackProxy.successProxy[randomId];if(typeof result === "string"){try{result = JSON.parse(result);}catch(e){console.error(e);}}if(sproxy){sproxy(result);}else{console.warn(randomId+" lost!");}}',u='function (randomId,result) {var fproxy = clouda.lib.callbackProxy.failProxy[randomId];if(typeof result === "string"){result = JSON.parse(result);}if(fproxy){fproxy(result);}else{console.warn(randomId+" lost!");}}',s={log:i,error:i,warn:i,info:i,debug:i,trace:i};Function.prototype.bind&&["error","warn"].forEach(function(t){s[t]=o[t].bind(o)});var l=!("undefined"==typeof t||!t.exports),d=!("undefined"==typeof document||!document.getElementById),f={slientLogger:s,setLogger:r,setDebugMode:function(t){r(t?o:s)},domReady:function(t){return/complete|loaded|interactive/.test(document.readyState)?void t():void document.addEventListener("DOMContentLoaded",function(){t()},!1)},extend:function(t){return t||(t={}),Array.prototype.slice.call(arguments,1).forEach(function(r){if(r)for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])}),t},isArray:function(t){return Array.isArray?Array.isArray(t):"[object Array]"==Object.prototype.call(t)},isObject:function(t){return"[object Object]"==Object.prototype.toString.call(t)},isFunction:function(t){return"[object Function]"==Object.prototype.toString.call(t)},isNumber:function(t){return"[object Number]"==Object.prototype.toString.call(t)},isString:function(t){return"[object String]"==Object.prototype.toString.call(t)},isDefined:function(t){return"undefined"!=typeof t},isSimpleValue:function(t){return!(this.isObject(t)||this.isArray(t)||this.isFunction(t))},getUniqId:function(){return++c},randomInt:function(t,r){return Math.floor(Math.random()*(r-t+1))+t},inherit:function(t,r){function e(){this.constructor=t}for(var o in r)r.hasOwnProperty(o)&&(t[o]=r[o]);return e.prototype=r.prototype,t.prototype=new e,t.__super__=r.prototype,t},ajaxGet:function(t){var r=new window.XMLHttpRequest;return t.async!==!1&&(t.async=!0),t.async&&(r.onreadystatechange=function(){if(4==r.readyState){var e;r.status>=200&&r.status<300||0===r.status&&"file:"==location.protocol?(e=r.responseText,t.callback(e)):t.callback(r.responseText)}}),r.open("GET",t.url,t.async),r.send(t.query||""),t.async?void 0:200===r.status?r.responseText:!1},trim:function(t){return t?t.trim?t.trim():t.replace(/^\s+|\s+$/gm,""):""},trigger:function(t,r,e){if(!t)return void this.log.error("emply element passed in");e=e||{};var o,n={bubbles:!0,cancelable:!0,detail:e};if("undefined"!=typeof CustomEvent)o=new CustomEvent(r,n),t.dispatchEvent(o);else try{o=document.createEvent("CustomEvent"),o.initCustomEvent(r,!0,!0,e),t.dispatchEvent(o)}catch(i){this.log.error(i)}return!0},copy:function(t){var r;if(this.isArray(t)){r=[];for(var e=0,o=t.length;o>e;e++)r.push(this.copy(t[e],1));return r}if(this.isObject(t)){r={};for(var n in t)t.hasOwnProperty(n)&&!this.isSysOwnedFld(n)&&(r[n]=this.copy(t[n],1));return r}return t},isNodeEnv:function(){return l},isBrowserEnv:function(){return d},isPlainObject:function(t){if(!t||!this.isObject(t)||t.nodeType)return!1;if(t.constructor&&!t.hasOwnProperty("constructor")&&!t.constructor.prototype.hasOwnProperty("isPrototypeOf"))return!1;var r=void 0;for(r in t);return void 0===r||t.hasOwnProperty(r)},removeFromArray:function(t,r){var e=t.indexOf(r);return e>-1&&t.splice(e,1),e},size:function(t){if(null===t)return 0;if(t.length===+t.length)return t.length;var r=0;for(var e in t)t.hasOwnProperty(e)&&r++;return r},regcallback:function(t,r){if(!t||!r||"function"!=typeof t||"function"!=typeof r)return lightapp.error(ErrCode.UNKNOW_INPUT,t,r),!1;var o=this.randomInt(100,200)+Date.now();e.successProxy[o]=t,e.failProxy[o]=r;var n="(function(result){ var randomId = '"+o+"';(",i=")(randomId,result)})";return{s:n+a+i,f:n+u+i}},getWebKitPluginInfo:function(t){return clouda.RUNTIME===clouda.RUNTIMES.KUANG&&clouda.PLATFORM===clouda.PLATFORMS.ANDROID&&clouda.RUNTIME_VERSION>="5.5"?void n("getWebKitPluginInfo",t,t):void("function"==typeof t&&t({result:1}))},setLogStorage:function(t,r){try{var e=localStorage.getItem("cloudaFuncs");if(e)try{e=JSON.parse(e),e[t]||(e[t]={}),e[t][r]||(e[t][r]=0),e[t][r]=e[t][r]+1}catch(o){console.error(o.stack)}else e={},e[t]={},e[t][r]=1;localStorage.setItem("cloudaFuncs",JSON.stringify(e))}catch(o){console.error(o.stack)}},closeWindow:function(){clouda.PLATFORM===clouda.PLATFORMS.IOS?n("closeWindow",function(){},function(){}):n("closeWindow")}};f.setDebugMode(!1),t.utils=f,t.callbackProxy=e,clouda.lib=t});
;clouda.define("lib/moplus",function(o){var i={},t="2264015",o=clouda.lib||{};i.openApp=function(o,i,a){var n,p,e,d=0,r=location.href;if(a&&"object"==typeof a&&(p=a.tip||"",e=a.platform||"",d=a.startDownload),"string"==typeof a&&(p=a),o||confirm(p||"运行错误\n当前浏览器无法正常运行此页面，请使用手机百度\n点击确定立即启用")){if(1==d)return"ios"==e?void(location.href="itms-apps://itunes.apple.com/app/id382201985"):void(location.href="http://dl.ops.baidu.com/baidusearch_AndroidPhone_1006041p.apk");n="http://zhida.baidu.com/s?app_id="+(i||t)+"&target_url="+encodeURIComponent(r)+"&ref_id=invoker",location.href=n}},o.moplus=i,clouda.lib=o});
;void function(e,o,n,t,a,i,d){e.alogObjectName=a,e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},e[a].l=e[a].l||+new Date,i=o.createElement(n),i.async=!0,i.src=t,d=o.getElementsByTagName(n)[0],d.parentNode.insertBefore(i,d)}(window,document,"script","http://img.baidu.com/hunter/alog/alog.mobile.min.js","alog"),void function(e,o){function n(e){return e instanceof Object&&!(e instanceof Array)}function t(){if(!e.performance||!e.performance.timing)return!1;var o=e.performance.timing,n=o.domainLookupStart,t={};t.dns=o.domainLookupEnd,t.ct=o.connectEnd,t.ttfb=o.responseStart,t.it=o.domInteractive,t.dt=o.domComplete,t.lt=o.loadEventEnd;for(var a in t)t[a]=Math.max(t[a]-n,0);t.fr="undefined"!=typeof LegoAppInfo?1:2,t.rt=o.redirectEnd-o.redirectStart,alog("qingspeed.send","speed",t)}function a(){setTimeout(t,100)}"undefined"==typeof window.clouda&&(window.clouda={}),"undefined"==typeof clouda.lego&&(clouda.lego={});var i=e.clouda.lego;i.monitor={create:function(n,t,d,r){var c="http://stat.zhidahao.baidu.com/";alog("qing.create",{postUrl:c+"s.gif",app_id:n,page_id:t||0}),r&&(i.monitor.send("pv",{smb:clouda.lego.smartBar.version||"no"}),(!d||parseFloat(d)>1||parseFloat(d)<0)&&(d=1),Math.random()<parseFloat(d)&&e.performance&&performance.timing&&(alog("qingspeed.create",{postUrl:c+"m.gif",app_id:n,page_id:t}),"complete"==o.readyState?a():e.addEventListener("load",a)))},click:function(e){i.monitor.send("click",e)},error:function(e){i.monitor.send("error",e)},send:function(e,o){n(o)&&alog("qing.send",e||"click",o)},sendSpeed:function(e,o){n(o)&&alog("qingspeed.send",e||"speed",o)}}}(window,document),"function"==typeof clouda.define&&"object"==typeof clouda.define.amd&&clouda.define("lego/monitor",clouda.lego.monitor);