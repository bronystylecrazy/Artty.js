function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var e=function(t){return"string"==typeof t?document.createTextNode(t):r(t)},r=function(r){for(var n=document.createElement(r.tag),o=0,a=Object.entries(null==r||null==(i=r.opts)?void 0:i.attrs);o<a.length;o++){var i,l=a[o];n.setAttribute(l[0],l[1])}for(var u,c=function(e,r){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(e))){n&&(e=n);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(r.children);!(u=c()).done;){var f=u.value;if(null!==f){var d=e(f);n.appendChild(d)}}return n};exports.generate=e,exports.generateElement=r;
//# sourceMappingURL=generator.cjs.map
