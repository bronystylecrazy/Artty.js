function t(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function r(r,e){var n="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(n)return(n=n.call(r)).next.bind(n);if(Array.isArray(r)||(n=function(r,e){if(r){if("string"==typeof r)return t(r,e);var n=Object.prototype.toString.call(r).slice(8,-1);return"Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(r,e):void 0}}(r))||e&&r&&"number"==typeof r.length){n&&(r=n);var i=0;return function(){return i>=r.length?{done:!0}:{done:!1,value:r[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var e=function(t,e){for(var n,i=[],a=r(t.childNodes);!(n=a()).done;){var u=n.value;u.nodeType!==Node.TEXT_NODE&&u.hasAttribute("(else)")||i.push(o(u))}return"["+i.join(",")+"]"},n=function(t,r){return void 0===t||"null"==typeof t?"h()":"h('"+t.tagName+"',"+l(t)+","+e(t)+")"},i=function(t,r){if(t.hasAttribute("(for)")){var e=t.getAttribute("(for)");if(t.removeAttribute("(for)"),!e.includes(" in "))return"__.l(("+u(e.trim())+"), () => "+o(t)+")";var i=e.split(" in "),a=i[0],s=i[1];return a=a.trim(),"__.l(("+u(s)+"), ("+a+") => "+o(t)+")"}if(t.hasAttribute("(if)")){e=t.getAttribute("(if)"),t.removeAttribute("(if)");var l=t.nextElementSibling;return null!==l&&l.hasAttribute("(else)")?(l.setAttribute("data-elsed",!0),"(("+u(e)+") ? "+o(t)+" : "+o(l)+")"):"(("+u(e)+") ? "+o(t)+" : "+o()+")"}return n(t)},o=function(t,r){return void 0===t?n():t.nodeType===Node.TEXT_NODE?a(t.textContent):i(t)},a=function(t,e){for(var n,i=[],o="",a=[],u=r(t.replaceAll("\n","\\n").split(""));!(n=u()).done;){var l=n.value;"{"===l?(a.push("{"),a.length>0&&(i.push(o),o="{")):"}"===l?(a.pop(),a.length<=0&&(i.push(o+l),o="")):o+=l}return i.push(o),s(i.filter(function(t){return""!==t}))},u=function(t,e){var n=t||"",i=n.matchAll(/([a-zA-Z_$.][a-zA-Z_$0-9.]*)/gim);if(null===i)return n;for(var o,a=r(i);!(o=a()).done;){var u=o.value,s=u[0],l=u.index;void 0===window[s.split(".")[0]||u]&&(n=n.substring(0,l)+n.substring(l).replace(s.split(".")[0],"(_."+s.split(".")[0]+" || "+s.split(".")[0]+")"))}return n},s=function(t,r){return t.map(function(t){var r="";return t.startsWith("{")&&t.endsWith("}")?(r=t.slice(1,t.length-1).trim(),"__.s("+u(r)+")"):'"'+t+'"'}).join(",")},l=function(t,e){var n=[];if(t.attributes.length>0)for(var i,o=r(t.attributes);!(i=o()).done;){var a=i.value,s=a.name,l=a.value;s.includes(":")?n.push("'"+s.slice(1)+"': "+u(l)):n.push("'"+s+"': '"+l+"'")}return"{ attrs: {"+n.join(",")+"}}"};exports.h=n,exports.parse=e,exports.parseDOM=function(t,r){try{return(new DOMParser).parseFromString(t,"text/html").body}catch(t){throw new Error("Parsing DOM error!")}},exports.parseDirective=i,exports.parseExpression=u,exports.parseFromElement=o,exports.parseOptions=l,exports.parseReactive=s,exports.parseText=a;
//# sourceMappingURL=parser.cjs.map