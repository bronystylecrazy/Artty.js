!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("hyperactiv")):"function"==typeof define&&define.amd?define(["hyperactiv"],e):(t||self).arttyJs=e(t.hyperactiv)}(this,function(t){function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function n(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i=function(t,e,r){return void 0===e&&(e={attrs:{},on:{}}),void 0===t?null:Array.isArray(e)?{tag:t,opts:{attrs:{},on:{}},children:e.flat()}:{tag:t,opts:e,children:r.flat()}},u=function(t){return"string"==typeof t?document.createTextNode(t):o(t)},o=function(t){for(var e=document.createElement(t.tag),r=0,i=Object.entries(null==t||null==(o=t.opts)?void 0:o.attrs);r<i.length;r++){var o,a=i[r];e.setAttribute(a[0],a[1])}for(var l,f=n(t.children);!(l=f()).done;){var s=l.value;if(null!==s){var c=u(s);e.appendChild(c)}}return e},a=function(t,e){for(var r=[],n=0;n<Math.min(t.length,e.length);n++)r.push([t[n],e[n]]);return r},l=function(t,e){if(void 0===e)return function(t){t.remove()};if("string"==typeof t||"string"==typeof e)return t!==e?function(t){var r=u(e);return t.replaceWith(r),r}:function(t){};if(t.tagName!==e.tagName)return function(t){var r=u(e);return t.replaceWith(r),r};var r=function(t,e,r){for(var i=[],u=function(){var t=a[o],e=t[0],r=t[1];i.push(function(t){try{t.setAttribute(e,r)}catch(t){}return t})},o=0,a=Object.entries(r);o<a.length;o++)u();var l=function(t){t in e||i.push(function(e){return e.removeAttribute(t),e})};for(var f in e)l(f);return function(t){for(var e,r=n(i);!(e=r()).done;)(0,e.value)(t)}}(0,t.opts.attrs,e.opts.attrs),i=function(t,e){for(var r,i=[],o=[],f=[],s=n(a(t,e));!(r=s()).done;){var c=r.value;i.push(l(c[0],c[1]))}if(t.length<e.length)for(var h,v=function(){var t=h.value;o.push(function(e){var r=u(t);return e.appendChild(r),e})},d=n(e.slice(t.length));!(h=d()).done;)v();else for(var p=0;p<Math.abs(e.length-t.length);p++)f.push(function(t){return t.removeChild(t.lastChild),t});return function(t){for(var e,r=n(a(i,t.childNodes));!(e=r()).done;){var u=e.value;(0,u[0])(u[1])}for(var l,s=n(o);!(l=s()).done;)(0,l.value)(t);for(var c,h=n(f);!(c=h()).done;)(0,c.value)(t);return t}}(t.children,e.children);return function(t){return r(t),i(t),t}},f=function(t,e){for(var r,i=[],u=n(t.childNodes);!(r=u()).done;){var o=r.value;o.nodeType!==Node.TEXT_NODE&&o.hasAttribute("(else)")||i.push(c(o))}return"["+i.join(",")+"]"},s=function(t,e){return void 0===t||"null"==typeof t?"h()":"h('"+t.tagName+"',"+p(t)+","+f(t)+")"},c=function(t,e){return void 0===t?s():t.nodeType===Node.TEXT_NODE?h(t.textContent):function(t,e){if(t.hasAttribute("(for)")){var r=t.getAttribute("(for)");if(t.removeAttribute("(for)"),!r.includes(" in "))return"__.l(("+v(r.trim())+"), () => "+c(t)+")";var n=r.split(" in "),i=n[0],u=n[1];return i=i.trim(),"__.l(("+v(u)+"), ("+i+") => "+c(t)+")"}if(t.hasAttribute("(if)")){r=t.getAttribute("(if)"),t.removeAttribute("(if)");var o=t.nextElementSibling;return null!==o&&o.hasAttribute("(else)")?(o.setAttribute("data-elsed",!0),"(("+v(r)+") ? "+c(t)+" : "+c(o)+")"):"(("+v(r)+") ? "+c(t)+" : "+c()+")"}return s(t)}(t)},h=function(t,e){for(var r,i=[],u="",o=[],a=n(t.replaceAll("\n","\\n").split(""));!(r=a()).done;){var l=r.value;"{"===l?(o.push("{"),o.length>0&&(i.push(u),u="{")):"}"===l?(o.pop(),o.length<=0&&(i.push(u+l),u="")):u+=l}return i.push(u),d(i.filter(function(t){return""!==t}))},v=function(t,e){var r=t||"",i=r.matchAll(/([a-zA-Z_$.][a-zA-Z_$0-9.]*)/gim);if(null===i)return r;for(var u,o=n(i);!(u=o()).done;){var a=u.value,l=a[0],f=a.index;void 0===window[l.split(".")[0]||a]&&(r=r.substring(0,f)+r.substring(f).replace(l.split(".")[0],"(_."+l.split(".")[0]+" || "+l.split(".")[0]+")"))}return r},d=function(t,e){return t.map(function(t){var e="";return t.startsWith("{")&&t.endsWith("}")?(e=t.slice(1,t.length-1).trim(),"__.s("+v(e)+")"):'"'+t+'"'}).join(",")},p=function(t,e){var r=[];if(t.attributes.length>0)for(var i,u=n(t.attributes);!(i=u()).done;){var o=i.value,a=o.name,l=o.value;a.includes(":")?r.push("'"+a.slice(1)+"': "+v(l)):r.push("'"+a+"': '"+l+"'")}return"{ attrs: {"+r.join(",")+"}}"},m=e(t).default.observe;return Window.Artty={createApp:function(t){return{state:m(t),vnodes:[],template:"",$el:null,updateList:[],sync:function(t){var e=this;this.$el=document.querySelector(t),this.template="return h('div',"+f(this.$el)+")";var r=[this.state,this.utils],n=r[0],o=r[1],a=new Function("h","_","__",this.template)(i,n,o),s=u(a),c=this.mount(s,this.$el);return this.state.__handler=function(t,r,n,u){var o=[e.state,e.utils],f=o[0],s=o[1],h=new Function("h","_","__",e.template)(i,f,s),v=l(a,h);c=v(c),e.vnodes=a=h},this},update:function(){for(var t,e=n(this.updateList);!(t=e()).done;)(0,t.value)(this.state);this.$el.removeAttribute("(cloak)")},render:function(t){},nextTick:function(t){this.updateList.push(t)},mount:function(t,e){return e.replaceWith(t),t},utils:{l:function(t,e){var r=[];return"number"==typeof t&&Array.from(Array(t).keys()).forEach(function(t,n){return r.push(e(n,n))}),Array.isArray(t)&&t.forEach(function(t,n){return r.push(e(t,n))}),r},s:function(t){return void 0===t?"":"object"==typeof t?JSON.stringify(t):String(t)}}}}},Artty});
//# sourceMappingURL=artty.js.umd.js.map
