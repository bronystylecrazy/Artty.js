import t from"hyperactiv";const e=(t,e={attrs:{},on:{}},r)=>void 0===t?null:Array.isArray(e)?{tag:t,opts:{attrs:{},on:{}},children:e.flat()}:{tag:t,opts:e,children:r.flat()},r=t=>"string"==typeof t?document.createTextNode(t):n(t),n=t=>{const e=document.createElement(t.tag);for(var[n,s]of Object.entries(null==t||null==(i=t.opts)?void 0:i.attrs)){var i;e.setAttribute(n,s)}for(var o of t.children)if(null!==o){const t=r(o);e.appendChild(t)}return e},s=(t,e)=>{const r=[];for(var n=0;n<Math.min(t.length,e.length);n++)r.push([t[n],e[n]]);return r},i=(t,e)=>{if(void 0===e)return t=>{t.remove()};if("string"==typeof t||"string"==typeof e)return t!==e?t=>{const n=r(e);return t.replaceWith(n),n}:t=>{};if(t.tagName!==e.tagName)return t=>{const n=r(e);return t.replaceWith(n),n};const n=((t,e,r)=>{const n=[];for(const[t,e]of Object.entries(r))n.push(r=>{try{r.setAttribute(t,e)}catch(t){}return r});for(const t in e)t in e||n.push(e=>(e.removeAttribute(t),e));return t=>{for(var e of n)e(t)}})(0,t.opts.attrs,e.opts.attrs),o=((t,e)=>{const n=[],o=[],a=[];for(var[l,u]of s(t,e))n.push(i(l,u));if(t.length<e.length)for(const n of e.slice(t.length))o.push(t=>{const e=r(n);return t.appendChild(e),t});else for(var h=0;h<Math.abs(e.length-t.length);h++)a.push(t=>(t.removeChild(t.lastChild),t));return t=>{for(const[e,r]of s(n,t.childNodes))e(r);for(const e of o)e(t);for(const e of a)e(t);return t}})(t.children,e.children);return t=>(n(t),o(t),t)},o=(t,e={})=>{const r={};var n=[];for(var s of t.childNodes)s.nodeType!==Node.TEXT_NODE&&s.hasAttribute("(else)")||n.push(l(s,r));return`[${n.join(",")}]`},a=(t,e={})=>void 0===t||"null"==typeof t?"h()":`h('${t.tagName}',${p(t,e)},${o(t,e)})`,l=(t,e={})=>void 0===t?a():t.nodeType===Node.TEXT_NODE?u(t.textContent,e):((t,e={})=>{if(t.hasAttribute("(for)")){var r=t.getAttribute("(for)");if(t.removeAttribute("(for)"),!r.includes(" in "))return`__.l((${h(r.trim(),e)}), () => ${l(t,e)})`;var[n,s]=r.split(" in ");return n=n.trim(),`__.l((${h(s,e)}), (${n}) => ${l(t,e)})`}if(t.hasAttribute("(if)")){r=t.getAttribute("(if)"),t.removeAttribute("(if)");var i=t.nextElementSibling;return null!==i&&i.hasAttribute("(else)")?(i.setAttribute("data-elsed",!0),`((${h(r,e)}) ? ${l(t,e)} : ${l(i,e)})`):`((${h(r,e)}) ? ${l(t,e)} : ${l()})`}return a(t,e)})(t,e),u=(t,e={})=>{var r=t.replaceAll("\n","\\n"),n=[],s="",i=[];for(var o of r.split(""))"{"===o?(i.push("{"),i.length>0&&(n.push(s),s="{")):"}"===o?(i.pop(),i.length<=0&&(n.push(s+o),s="")):s+=o;return n.push(s),f(n.filter(t=>""!==t),e)},h=(t,e={})=>{var r=t||"",n=r.matchAll(/([a-zA-Z_$.][a-zA-Z_$0-9.]*)/gim);if(null===n)return r;for(let t of n){var s=t[0],i=t.index;void 0===window[s.split(".")[0]||t]&&(r=r.substring(0,i)+r.substring(i).replace(s.split(".")[0],`(_.${s.split(".")[0]} || ${s.split(".")[0]})`))}return r},f=(t,e={})=>t.map(t=>{let r="";return t.startsWith("{")&&t.endsWith("}")?(r=t.slice(1,t.length-1).trim(),`__.s(${h(r,e)})`):`"${t}"`}).join(","),p=(t,e={})=>{var r=[];if(t.attributes.length>0)for(var{name:n,value:s}of t.attributes)n.includes(":")?r.push(`'${n.slice(1)}': ${h(s,e)}`):r.push(`'${n}': '${s}'`);return`{ attrs: {${r.join(",")}}}`},{observe:c}=t,d=t=>({state:c(t),vnodes:[],template:"",$el:null,updateList:[],sync(t){this.$el=document.querySelector(t),this.template=`return h('div',${o(this.$el)})`;const[n,s]=[this.state,this.utils];let a=new Function("h","_","__",this.template)(e,n,s),l=r(a),u=this.mount(l,this.$el);return this.state.__handler=(t,r,n,s)=>{const[o,l]=[this.state,this.utils];let h=new Function("h","_","__",this.template)(e,o,l);const f=i(a,h);u=f(u),a=h,this.vnodes=a},this},update(){for(var t of this.updateList)t(this.state);this.$el.removeAttribute("(cloak)")},render(t){},nextTick(t){this.updateList.push(t)},mount:(t,e)=>(e.replaceWith(t),t),utils:{l(t,e){var r=[];return"number"==typeof t&&Array.from(Array(t).keys()).forEach((t,n)=>r.push(e(n,n))),Array.isArray(t)&&t.forEach((t,n)=>r.push(e(t,n))),r},s:t=>void 0===t?"":"object"==typeof t?JSON.stringify(t):String(t)}});Window.Artty={createApp:d},window.Artty={createApp:d};var v=Artty;export{v as default};
//# sourceMappingURL=artty.js.modern.js.map
