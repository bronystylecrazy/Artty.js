function t(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}var r=function(t){return"string"==typeof t?document.createTextNode(t):e(t)},e=function(e){for(var n=document.createElement(e.tag),o=0,a=Object.entries(null==e||null==(i=e.opts)?void 0:i.attrs);o<a.length;o++){var i,l=a[o];n.setAttribute(l[0],l[1])}for(var u,c=function(r,e){var n="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(n)return(n=n.call(r)).next.bind(n);if(Array.isArray(r)||(n=function(r,e){if(r){if("string"==typeof r)return t(r,e);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(r,e):void 0}}(r))){n&&(r=n);var o=0;return function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(e.children);!(u=c()).done;){var f=u.value;if(null!==f){var d=r(f);n.appendChild(d)}}return n};export{r as generate,e as generateElement};
//# sourceMappingURL=generator.esm.js.map