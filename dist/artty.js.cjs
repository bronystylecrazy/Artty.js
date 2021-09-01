var t=require("hyperactiv");function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function e(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function n(t,r){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,r){if(t){if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i=function(t,r,e){return void 0===r&&(r={attrs:{},on:{}}),void 0===t?null:Array.isArray(r)?{tag:t,opts:{attrs:{},on:{}},children:r.flat()}:{tag:t,opts:r,children:e.flat()}},u=function(t){return"string"==typeof t?document.createTextNode(t):o(t)},o=function(t){for(var r=document.createElement(t.tag),e=0,i=Object.entries(null==t||null==(o=t.opts)?void 0:o.attrs);e<i.length;e++){var o,a=i[e];r.setAttribute(a[0],a[1])}for(var l,s=n(t.children);!(l=s()).done;){var f=l.value;if(null!==f){var c=u(f);r.appendChild(c)}}return r},a=function(t,r){for(var e=[],n=0;n<Math.min(t.length,r.length);n++)e.push([t[n],r[n]]);return e},l=function(t,r){if(void 0===r)return function(t){t.remove()};if("string"==typeof t||"string"==typeof r)return t!==r?function(t){var e=u(r);return t.replaceWith(e),e}:function(t){};if(t.tagName!==r.tagName)return function(t){var e=u(r);return t.replaceWith(e),e};var e=function(t,r,e){for(var i=[],u=function(){var t=a[o],r=t[0],e=t[1];i.push(function(t){try{t.setAttribute(r,e)}catch(t){}return t})},o=0,a=Object.entries(e);o<a.length;o++)u();var l=function(t){t in r||i.push(function(r){return r.removeAttribute(t),r})};for(var s in r)l(s);return function(t){for(var r,e=n(i);!(r=e()).done;)(0,r.value)(t)}}(0,t.opts.attrs,r.opts.attrs),i=function(t,r){for(var e,i=[],o=[],s=[],f=n(a(t,r));!(e=f()).done;){var c=e.value;i.push(l(c[0],c[1]))}if(t.length<r.length)for(var v,h=function(){var t=v.value;o.push(function(r){var e=u(t);return r.appendChild(e),r})},d=n(r.slice(t.length));!(v=d()).done;)h();else for(var p=0;p<Math.abs(r.length-t.length);p++)s.push(function(t){return t.removeChild(t.lastChild),t});return function(t){for(var r,e=n(a(i,t.childNodes));!(r=e()).done;){var u=r.value;(0,u[0])(u[1])}for(var l,f=n(o);!(l=f()).done;)(0,l.value)(t);for(var c,v=n(s);!(c=v()).done;)(0,c.value)(t);return t}}(t.children,r.children);return function(t){return e(t),i(t),t}},s=function(t,r){for(var e,i=[],u=n(t.childNodes);!(e=u()).done;){var o=e.value;o.nodeType!==Node.TEXT_NODE&&o.hasAttribute("(else)")||i.push(c(o))}return"["+i.join(",")+"]"},f=function(t,r){return void 0===t||"null"==typeof t?"h()":"h('"+t.tagName+"',"+p(t)+","+s(t)+")"},c=function(t,r){return void 0===t?f():t.nodeType===Node.TEXT_NODE?v(t.textContent):function(t,r){if(t.hasAttribute("(for)")){var e=t.getAttribute("(for)");if(t.removeAttribute("(for)"),!e.includes(" in "))return"__.l(("+h(e.trim())+"), () => "+c(t)+")";var n=e.split(" in "),i=n[0],u=n[1];return i=i.trim(),"__.l(("+h(u)+"), ("+i+") => "+c(t)+")"}if(t.hasAttribute("(if)")){e=t.getAttribute("(if)"),t.removeAttribute("(if)");var o=t.nextElementSibling;return null!==o&&o.hasAttribute("(else)")?(o.setAttribute("data-elsed",!0),"(("+h(e)+") ? "+c(t)+" : "+c(o)+")"):"(("+h(e)+") ? "+c(t)+" : "+c()+")"}return f(t)}(t)},v=function(t,r){for(var e,i=[],u="",o=[],a=n(t.replaceAll("\n","\\n").split(""));!(e=a()).done;){var l=e.value;"{"===l?(o.push("{"),o.length>0&&(i.push(u),u="{")):"}"===l?(o.pop(),o.length<=0&&(i.push(u+l),u="")):u+=l}return i.push(u),d(i.filter(function(t){return""!==t}))},h=function(t,r){var e=t||"",i=e.matchAll(/([a-zA-Z_$.][a-zA-Z_$0-9.]*)/gim);if(null===i)return e;for(var u,o=n(i);!(u=o()).done;){var a=u.value,l=a[0],s=a.index;void 0===window[l.split(".")[0]||a]&&(e=e.substring(0,s)+e.substring(s).replace(l.split(".")[0],"(_."+l.split(".")[0]+" || "+l.split(".")[0]+")"))}return e},d=function(t,r){return t.map(function(t){var r="";return t.startsWith("{")&&t.endsWith("}")?(r=t.slice(1,t.length-1).trim(),"__.s("+h(r)+")"):'"'+t+'"'}).join(",")},p=function(t,r){var e=[];if(t.attributes.length>0)for(var i,u=n(t.attributes);!(i=u()).done;){var o=i.value,a=o.name,l=o.value;a.includes(":")?e.push("'"+a.slice(1)+"': "+h(l)):e.push("'"+a+"': '"+l+"'")}return"{ attrs: {"+e.join(",")+"}}"},m=r(t).default.observe;window.Artty={createApp:function(t){return{state:m(t),vnodes:[],template:"",$el:null,updateList:[],sync:function(t){var r=this;this.$el=document.querySelector(t),this.template="return h('div',"+s(this.$el)+")";var e=[this.state,this.utils],n=e[0],o=e[1],a=new Function("h","_","__",this.template)(i,n,o),f=u(a),c=this.mount(f,this.$el);return this.state.__handler=function(t,e,n,u){var o=[r.state,r.utils],s=o[0],f=o[1],v=new Function("h","_","__",r.template)(i,s,f),h=l(a,v);c=h(c),r.vnodes=a=v},this},update:function(){for(var t,r=n(this.updateList);!(t=r()).done;)(0,t.value)(this.state);this.$el.removeAttribute("(cloak)")},render:function(t){},nextTick:function(t){this.updateList.push(t)},mount:function(t,r){return r.replaceWith(t),t},utils:{l:function(t,r){var e=[];return"number"==typeof t&&Array.from(Array(t).keys()).forEach(function(t,n){return e.push(r(n,n))}),Array.isArray(t)&&t.forEach(function(t,n){return e.push(r(t,n))}),e},s:function(t){return void 0===t?"":"object"==typeof t?JSON.stringify(t):String(t)}}}}};var g=Artty;module.exports=g;
//# sourceMappingURL=artty.js.cjs.map
