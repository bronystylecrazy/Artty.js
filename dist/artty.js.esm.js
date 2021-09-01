import t from"hyperactiv";function r(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function e(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n=function(t,r,e){return void 0===r&&(r={attrs:{},on:{}}),void 0===t?null:Array.isArray(r)?{tag:t,opts:{attrs:{},on:{}},children:r.flat()}:{tag:t,opts:r,children:e.flat()}},i=function(t){return"string"==typeof t?document.createTextNode(t):u(t)},u=function(t){for(var r=document.createElement(t.tag),n=0,u=Object.entries(null==t||null==(o=t.opts)?void 0:o.attrs);n<u.length;n++){var o,a=u[n];r.setAttribute(a[0],a[1])}for(var l,s=e(t.children);!(l=s()).done;){var f=l.value;if(null!==f){var c=i(f);r.appendChild(c)}}return r},o=function(t,r){for(var e=[],n=0;n<Math.min(t.length,r.length);n++)e.push([t[n],r[n]]);return e},a=function(t,r){if(void 0===r)return function(t){t.remove()};if("string"==typeof t||"string"==typeof r)return t!==r?function(t){var e=i(r);return t.replaceWith(e),e}:function(t){};if(t.tagName!==r.tagName)return function(t){var e=i(r);return t.replaceWith(e),e};var n=function(t,r,n){for(var i=[],u=function(){var t=a[o],r=t[0],e=t[1];i.push(function(t){try{t.setAttribute(r,e)}catch(t){}return t})},o=0,a=Object.entries(n);o<a.length;o++)u();var l=function(t){t in r||i.push(function(r){return r.removeAttribute(t),r})};for(var s in r)l(s);return function(t){for(var r,n=e(i);!(r=n()).done;)(0,r.value)(t)}}(0,t.opts.attrs,r.opts.attrs),u=function(t,r){for(var n,u=[],l=[],s=[],f=e(o(t,r));!(n=f()).done;){var c=n.value;u.push(a(c[0],c[1]))}if(t.length<r.length)for(var v,h=function(){var t=v.value;l.push(function(r){var e=i(t);return r.appendChild(e),r})},d=e(r.slice(t.length));!(v=d()).done;)h();else for(var p=0;p<Math.abs(r.length-t.length);p++)s.push(function(t){return t.removeChild(t.lastChild),t});return function(t){for(var r,n=e(o(u,t.childNodes));!(r=n()).done;){var i=r.value;(0,i[0])(i[1])}for(var a,f=e(l);!(a=f()).done;)(0,a.value)(t);for(var c,v=e(s);!(c=v()).done;)(0,c.value)(t);return t}}(t.children,r.children);return function(t){return n(t),u(t),t}},l=function(t,r){for(var n,i=[],u=e(t.childNodes);!(n=u()).done;){var o=n.value;o.nodeType!==Node.TEXT_NODE&&o.hasAttribute("(else)")||i.push(f(o))}return"["+i.join(",")+"]"},s=function(t,r){return void 0===t||"null"==typeof t?"h()":"h('"+t.tagName+"',"+d(t)+","+l(t)+")"},f=function(t,r){return void 0===t?s():t.nodeType===Node.TEXT_NODE?c(t.textContent):function(t,r){if(t.hasAttribute("(for)")){var e=t.getAttribute("(for)");if(t.removeAttribute("(for)"),!e.includes(" in "))return"__.l(("+v(e.trim())+"), () => "+f(t)+")";var n=e.split(" in "),i=n[0],u=n[1];return i=i.trim(),"__.l(("+v(u)+"), ("+i+") => "+f(t)+")"}if(t.hasAttribute("(if)")){e=t.getAttribute("(if)"),t.removeAttribute("(if)");var o=t.nextElementSibling;return null!==o&&o.hasAttribute("(else)")?(o.setAttribute("data-elsed",!0),"(("+v(e)+") ? "+f(t)+" : "+f(o)+")"):"(("+v(e)+") ? "+f(t)+" : "+f()+")"}return s(t)}(t)},c=function(t,r){for(var n,i=[],u="",o=[],a=e(t.replaceAll("\n","\\n").split(""));!(n=a()).done;){var l=n.value;"{"===l?(o.push("{"),o.length>0&&(i.push(u),u="{")):"}"===l?(o.pop(),o.length<=0&&(i.push(u+l),u="")):u+=l}return i.push(u),h(i.filter(function(t){return""!==t}))},v=function(t,r){var n=t||"",i=n.matchAll(/([a-zA-Z_$.][a-zA-Z_$0-9.]*)/gim);if(null===i)return n;for(var u,o=e(i);!(u=o()).done;){var a=u.value,l=a[0],s=a.index;void 0===window[l.split(".")[0]||a]&&(n=n.substring(0,s)+n.substring(s).replace(l.split(".")[0],"(_."+l.split(".")[0]+" || "+l.split(".")[0]+")"))}return n},h=function(t,r){return t.map(function(t){var r="";return t.startsWith("{")&&t.endsWith("}")?(r=t.slice(1,t.length-1).trim(),"__.s("+v(r)+")"):'"'+t+'"'}).join(",")},d=function(t,r){var n=[];if(t.attributes.length>0)for(var i,u=e(t.attributes);!(i=u()).done;){var o=i.value,a=o.name,l=o.value;a.includes(":")?n.push("'"+a.slice(1)+"': "+v(l)):n.push("'"+a+"': '"+l+"'")}return"{ attrs: {"+n.join(",")+"}}"},p=t.observe;window.Artty={createApp:function(t){return{state:p(t),vnodes:[],template:"",$el:null,updateList:[],sync:function(t){var r=this;this.$el=document.querySelector(t),this.template="return h('div',"+l(this.$el)+")";var e=[this.state,this.utils],u=e[0],o=e[1],s=new Function("h","_","__",this.template)(n,u,o),f=i(s),c=this.mount(f,this.$el);return this.state.__handler=function(t,e,i,u){var o=[r.state,r.utils],l=o[0],f=o[1],v=new Function("h","_","__",r.template)(n,l,f),h=a(s,v);c=h(c),r.vnodes=s=v},this},update:function(){for(var t,r=e(this.updateList);!(t=r()).done;)(0,t.value)(this.state);this.$el.removeAttribute("(cloak)")},render:function(t){},nextTick:function(t){this.updateList.push(t)},mount:function(t,r){return r.replaceWith(t),t},utils:{l:function(t,r){var e=[];return"number"==typeof t&&Array.from(Array(t).keys()).forEach(function(t,n){return e.push(r(n,n))}),Array.isArray(t)&&t.forEach(function(t,n){return e.push(r(t,n))}),e},s:function(t){return void 0===t?"":"object"==typeof t?JSON.stringify(t):String(t)}}}}};var m=Artty;export{m as default};
//# sourceMappingURL=artty.js.esm.js.map
