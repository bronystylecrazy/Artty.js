function r(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}function t(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0;return function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var e=function(r){return"string"==typeof r?document.createTextNode(r):n(r)},n=function(r){for(var n=document.createElement(r.tag),o=0,a=Object.entries(null==r||null==(i=r.opts)?void 0:i.attrs);o<a.length;o++){var i,u=a[o];n.setAttribute(u[0],u[1])}for(var f,l=t(r.children);!(f=l()).done;){var c=f.value;if(null!==c){var v=e(c);n.appendChild(v)}}return n},o=function(r,t){for(var e=[],n=0;n<Math.min(r.length,t.length);n++)e.push([r[n],t[n]]);return e},a=function(r,e,n){for(var o=[],a=function(){var r=u[i],t=r[0],e=r[1];o.push(function(r){try{r.setAttribute(t,e)}catch(r){}return r})},i=0,u=Object.entries(n);i<u.length;i++)a();var f=function(r){r in e||o.push(function(t){return t.removeAttribute(r),t})};for(var l in e)f(l);return function(r){for(var e,n=t(o);!(e=n()).done;)(0,e.value)(r)}},i=function(r,n){for(var a,i=[],f=[],l=[],c=t(o(r,n));!(a=c()).done;){var v=a.value;i.push(u(v[0],v[1]))}if(r.length<n.length)for(var s,d=function(){var r=s.value;f.push(function(t){var n=e(r);return t.appendChild(n),t})},h=t(n.slice(r.length));!(s=h()).done;)d();else for(var p=0;p<Math.abs(n.length-r.length);p++)l.push(function(r){return r.removeChild(r.lastChild),r});return function(r){for(var e,n=t(o(i,r.childNodes));!(e=n()).done;){var a=e.value;(0,a[0])(a[1])}for(var u,c=t(f);!(u=c()).done;)(0,u.value)(r);for(var v,s=t(l);!(v=s()).done;)(0,v.value)(r);return r}},u=function(r,t){if(void 0===t)return function(r){r.remove()};if("string"==typeof r||"string"==typeof t)return r!==t?function(r){var n=e(t);return r.replaceWith(n),n}:function(r){};if(r.tagName!==t.tagName)return function(r){var n=e(t);return r.replaceWith(n),n};var n=a(0,r.opts.attrs,t.opts.attrs),o=i(r.children,t.children);return function(r){return n(r),o(r),r}};exports.diff=u,exports.diffAttribute=a,exports.diffChildren=i,exports.zip=o;
//# sourceMappingURL=diff.cjs.map
