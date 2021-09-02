export const parse = ($target, d = {}) => {
    const ctx = { };
    var vnode = [];
    for(var $childNode of $target.childNodes){
        if($childNode.nodeType === Node.TEXT_NODE) {
            vnode.push(parseFromElement($childNode, ctx));
            continue;
        }
        if(!$childNode.hasAttribute('(else)'))
            vnode.push(parseFromElement($childNode, ctx));
    }
    return `[${vnode.join(',')}]`;
}

export const h = ($node, ctx = {}) => {
    // console.log('context', ctx);
    if(typeof $node === "undefined" || typeof $node === 'null') return `h()`;
    return `h('${$node.tagName}',${parseOptions($node,ctx)},${parse($node,ctx)})`
};

export const parseDirective = ($node, ctx = {}) => {
    if($node.hasAttribute('(for)')){
        var $statement = $node.getAttribute('(for)');
        $node.removeAttribute('(for)');
        if(!$statement.includes(' in '))
            return `__.l((${parseExpression($statement.trim(),ctx)}), () => ${parseFromElement($node,ctx)})`;
        var [l,r] = $statement.split(' in ');
        l = l.trim();
        return `__.l((${parseExpression(r,ctx)}), (${l}) => ${parseFromElement($node,ctx)})`;
    }

    if($node.hasAttribute('(if)')){
        var $statement = $node.getAttribute('(if)');
        $node.removeAttribute('(if)')
        var $elseNode = $node.nextElementSibling;
        if($elseNode !== null && $elseNode.hasAttribute('(else)')){
            $elseNode.setAttribute('data-elsed', true);
            return `((${parseExpression($statement,ctx)}) ? ${parseFromElement($node,ctx)} : ${parseFromElement($elseNode,ctx)})`;
        }
        return `((${parseExpression($statement,ctx)}) ? ${parseFromElement($node,ctx)} : ${parseFromElement()})`;
    }


    return h($node, ctx);
}

export const parseFromElement = ($node, ctx = {}) => {
    if(typeof $node === 'undefined') return h();
    if($node.nodeType === Node.TEXT_NODE){
        return parseText($node.textContent,ctx);
    }

    return parseDirective($node,ctx);
}

export const parseText = ($text, ctx = {}) => {
    console.log($text)
    var text = $text.replaceAll("\n","\\n");
    var parts = [];
    var t = "";
    var p = [];
    for(var c of text.split('')){
        
        if(c === '{'){
            p.push('{');
            if(p.length > 0){
                parts.push(t);
                t = "{";
            }
        }else if(c === '}'){
            p.pop();
            if(p.length <= 0){
                parts.push(t + c);
                t = "";
            }
        }else 
        t += c;
    }
    parts.push(t);
    return parseReactive(parts.filter(e => e !== ''),ctx);
}

export const parseExpression = (e, ctx = {}) => {
    // console.log('exp ', ctx)
    var exp = e || '';
    var regex = /([a-zA-Z_$.][a-zA-Z_$0-9.]*)/igm;
    var $$ = exp.matchAll(regex);
    if($$ === null) return exp;
    for (let $ of $$) {
        var variable = $[0];
        var pos = $.index;
        if((typeof window[(variable.split('.')[0] || $)] === 'undefined')){
            exp = exp.substring(0,pos) + exp.substring(pos).replace(variable.split('.')[0],`(_.${variable.split('.')[0]} || ${variable.split('.')[0]})`);
        }
    }
    // for(var $ of $$){
    //     if((typeof window[($.split('.')[0] || $)] === 'undefined')){
    //         console.log($$)
    //     }
    // }
    return exp;
}

export const parseReactive = (parts, ctx = {}) => {
    return parts.map(e => {
        let exp = "";
        if(e.startsWith('{') && e.endsWith('}')){
            exp = e.slice(1,e.length-1).trim();
        }else{
            return `"${e}"`;
        }
        return `__.s(${parseExpression(exp,ctx)})`;
    }).join(",");
}

export const parseOptions = ($node, ctx = {}) => {
    var attrs = [];
    if($node.attributes.length > 0){
        for(var {name,value} of $node.attributes){
            if(name.includes(':'))
                attrs.push(`'${name.slice(1)}': ${parseExpression(value,ctx)}`);
            else
                attrs.push(`'${name}': '${value}'`);
        }
    }
    return `{ attrs: {${attrs.join(',')}}}`;
}


export const parseDOM = ($html, ctx = {}) => {
    try{
        const data = new DOMParser().parseFromString($html,'text/html').body;
        return data;
    }catch(e){
        throw new Error("Parsing DOM error!");
    }
}