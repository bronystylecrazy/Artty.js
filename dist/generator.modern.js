const t=t=>"string"==typeof t?document.createTextNode(t):e(t),e=e=>{const r=document.createElement(e.tag);for(var[n,o]of Object.entries(null==e||null==(c=e.opts)?void 0:c.attrs)){var c;r.setAttribute(n,o)}for(var l of e.children)if(null!==l){const e=t(l);r.appendChild(e)}return r};export{t as generate,e as generateElement};
//# sourceMappingURL=generator.modern.js.map
