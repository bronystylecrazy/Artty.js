!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const r of t)if("childList"===r.type)for(const t of r.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const t=(t,e={attrs:{},on:{}},r)=>void 0===t?null:Array.isArray(e)?{tag:t,opts:{attrs:{},on:{}},children:e.flat()}:{tag:t,opts:e,children:r.flat()},e=t=>"string"==typeof t?document.createTextNode("dfsdfsd"):r(t),r=t=>{var r;const n=document.createElement(t.tag);for(var[o,s]of Object.entries(null==(r=null==t?void 0:t.opts)?void 0:r.attrs))n.setAttribute(o,s);for(var i of t.children)if(null!==i){const t=e(i);n.appendChild(t)}return n},n=(t,e)=>{const r=[];for(var n=0;n<Math.min(t.length,e.length);n++)r.push([t[n],e[n]]);return r},o=(t,r)=>{if(void 0===r)return t=>{t.remove()};if("string"==typeof t||"string"==typeof r)return t!==r?t=>{const n=e(r);return t.replaceWith(n),n}:t=>{};if(t.tagName!==r.tagName)return t=>{const n=e(r);return t.replaceWith(n),n};const s=((t,e,r)=>{const n=[];for(const[o,s]of Object.entries(r))n.push((t=>{try{t.setAttribute(o,s)}catch(e){}return t}));for(const o in e)o in e||n.push((t=>(t.removeAttribute(o),t)));return t=>{for(var e of n)e(t)}})(0,t.opts.attrs,r.opts.attrs),i=((t,r)=>{const s=[],i=[],l=[];for(var[a,c]of n(t,r))s.push(o(a,c));if(t.length<r.length)for(const n of r.slice(t.length))i.push((t=>{const r=e(n);return t.appendChild(r),t}));else for(var u=0;u<Math.abs(r.length-t.length);u++)l.push((t=>(t.removeChild(t.lastChild),t)));return t=>{for(const[e,r]of n(s,t.childNodes))e(r);for(const e of i)e(t);for(const e of l)e(t);return t}})(t.children,r.children);return t=>(s(t),i(t),t)},s=(t,e={})=>{const r={};var n=[];for(var o of t.childNodes)o.nodeType!==Node.TEXT_NODE&&o.hasAttribute("(else)")||n.push(l(o,r));return`[${n.join(",")}]`},i=(t,e={})=>void 0===t||"null"==typeof t?"h()":`h('${t.tagName}',${f(t,e)},${s(t,e)})`,l=(t,e={})=>void 0===t?i():t.nodeType===Node.TEXT_NODE?a(t.textContent,e):((t,e={})=>{if(t.hasAttribute("(for)")){var r=t.getAttribute("(for)");if(t.removeAttribute("(for)"),!r.includes(" in "))return`__.l((${c(r.trim(),e)}), () => ${l(t,e)})`;var[n,o]=r.split(" in ");return n=n.trim(),`__.l((${c(o,e)}), (${n}) => ${l(t,e)})`}if(t.hasAttribute("(if)")){r=t.getAttribute("(if)"),t.removeAttribute("(if)");var s=t.nextElementSibling;return null!==s&&s.hasAttribute("(else)")?(s.setAttribute("data-elsed",!0),`((${c(r,e)}) ? ${l(t,e)} : ${l(s,e)})`):`((${c(r,e)}) ? ${l(t,e)} : ${l()})`}return i(t,e)})(t,e),a=(t,e={})=>{console.log(t);var r=t.replaceAll("\n","\\n"),n=[],o="",s=[];for(var i of r.split(""))"{"===i?(s.push("{"),s.length>0&&(n.push(o),o="{")):"}"===i?(s.pop(),s.length<=0&&(n.push(o+i),o="")):o+=i;return n.push(o),u(n.filter((t=>""!==t)),e)},c=(t,e={})=>{var r=t||"",n=r.matchAll(/([a-zA-Z_$.][a-zA-Z_$0-9.]*)/gim);if(null===n)return r;for(let i of n){var o=i[0],s=i.index;void 0===window[o.split(".")[0]||i]&&(r=r.substring(0,s)+r.substring(s).replace(o.split(".")[0],`(_.${o.split(".")[0]} || ${o.split(".")[0]})`))}return r},u=(t,e={})=>t.map((t=>{let r="";return t.startsWith("{")&&t.endsWith("}")?(r=t.slice(1,t.length-1).trim(),`__.s(${c(r,e)})`):`"${t}"`})).join(","),f=(t,e={})=>{var r=[];if(t.attributes.length>0)for(var{name:n,value:o}of t.attributes)n.includes(":")?r.push(`'${n.slice(1)}': ${c(o,e)}`):r.push(`'${n}': '${o}'`);return`{ attrs: {${r.join(",")}}}`},d=["String","Number","Object","Array","Boolean","Date"];function p(t){return t&&"object"==typeof t}function h(t,e,r){Object.defineProperty(t,e,{value:r,enumerable:!1,configurable:!0})}function g(t,e,r){h(t,"__key",e),h(t,"__parent",r)}const m={computedStack:[],observersMap:new WeakMap,computedDependenciesTracker:new WeakMap};let b=null;const v=new Set;function y(){for(const t of v)t();v.clear(),b=null}function _(t,e){null===b&&(b=setTimeout(y,!0===e?0:e)),v.add(t)}const{observersMap:$,computedStack:A,computedDependenciesTracker:O}=m;const N={observe:function t(e,r={}){const{props:n,ignore:o,batch:s,deep:i=!0,bubble:l,bind:a}=r;if(e.__observed)return e;const c=(t,e)=>(!n||n instanceof Array&&n.includes(t)||"function"==typeof n&&n(t,e))&&(!o||!(o instanceof Array&&o.includes(t))&&!("function"==typeof o&&o(t,e)));$.set(e,new Map),i&&Object.entries(e).forEach((function([n,o]){p(o)&&c(n,o)&&(e[n]=t(o,r),l&&g(e[n],n,e))}));const u=new Proxy(e,{get(t,r){if("__observed"===r)return!0;if(c(r,e[r])&&A.length){const t=$.get(e);t.has(r)||t.set(r,new Set);const n=O.get(A[0]);n&&(n.has(e)||n.set(e,new Set),n.get(e).add(r)),t.get(r).add(A[0])}return e[r]},set(n,o,a){if("__handler"===o)h(e,"__handler",a);else if(c(o,a)){if(Array.isArray(e)&&"length"===o||e[o]!==a){const n=i&&p(a),c=$.get(e),f=e[o];p(f)&&delete e[o],e[o]=n?t(a,r):a,n&&l&&g(e[o],o,e);const d=[o];let h=e;for(;h&&(!h.__handler||!1!==h.__handler(d,a,f,u));)h.__key&&h.__parent?(d.unshift(h.__key),h=h.__parent):h=null;const m=c.get(o);if(m)for(const t of m){const r=O.get(t);t.__disposed||r&&(!r.has(e)||!r.get(e).has(o))?m.delete(t):t!==A[0]&&(s?_(t,s):t())}}}else e[o]=a;return!0}});var f;return a&&(f=e,Object.getOwnPropertyNames(f).concat(Object.getPrototypeOf(f)&&d.indexOf(Object.getPrototypeOf(f).constructor.name)<0?Object.getOwnPropertyNames(Object.getPrototypeOf(f)):[]).filter((t=>"constructor"!==t&&"function"==typeof f[t]))).forEach((t=>e[t]=e[t].bind(u))),u}};var j=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",reactive:N,createApp:r=>({state:N.observe(r),vnodes:[],template:"",$el:null,updateList:[],sync(r){this.$el=document.getElementById(r),this.template=`return h('div',${s(this.$el)})`,console.log(this.template);const[n,i]=[this.state,this.utils];let l=new Function("h","_","__",this.template)(t,n,i),a=e(l),c=this.mount(a,this.$el);return this.state.__handler=(e,r,n,s)=>{const[i,a]=[this.state,this.utils];let u=new Function("h","_","__",this.template)(t,i,a);const f=o(l,u);c=f(c),l=u,this.vnodes=l},this},update(){for(var t of this.updateList)t(this.state);this.$el.removeAttribute("(cloak)")},render(t){},nextTick(t){this.updateList.push(t)},mount:(t,e)=>(e.replaceWith(t),t),utils:{l(t,e){var r=[];return"number"==typeof t&&Array.from(Array(t).keys()).forEach(((t,n)=>r.push(e(n,n)))),Array.isArray(t)&&t.forEach(((t,n)=>r.push(e(t,n)))),r},s:t=>void 0===t?"":"object"==typeof t?JSON.stringify(t):String(t)}})});window.Artty=j;