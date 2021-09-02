export const parse = ($target, ctx = {}) => {
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
    if(typeof $node === "undefined" || typeof $node === 'null') return `h()`;
    return `h('${$node.tagName}',${parseOptions($node,ctx)},${parse($node,ctx)})`
};

export const parseDirective = ($node, ctx = {}) => {

    if($node.hasAttribute('(for)')){
        var $statement = $node.getAttribute('(for)');
        $node.removeAttribute('(for)');
        $statement = $statement.trim();
        if(!$statement.includes(' in '))
            return `__.l((${parseExpression($statement.trim(),ctx)}), () => ${parseFromElement($node,ctx)})`;
        var [l,r] = $statement.split(' in ');
        l = l.trim();
        return `__.l((${parseExpression(r,ctx)}), function(${l}){return ${parseFromElement($node,ctx)}},'${l}')`;
    }

    if($node.hasAttribute('(if)')){
        var $statement = $node.getAttribute('(if)');
        $node.removeAttribute('(if)')
        var $elseNode = $node.nextElementSibling;
        if((typeof $elseNode !== 'undefined' || typeof $elseNode !== 'null') && $elseNode.hasAttribute('(else)')){
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

export const parseExpression = (e, ctx = {}, wrap = false) => {
    var exp = e || '';
    var regex = /([a-zA-Z_$.][a-zA-Z_$0-9.]*)/igm;
    var $$ = exp.matchAll(regex);
    if($$ === null) return exp;
    for (let $ of $$) {
        var variable = $[0];
        var pos = $.index;
        var vname = variable.split('.')[0];
        var v = vname || $;
        if((typeof window[v] === 'undefined' && typeof ctx[v] === 'undefined')){
            exp = exp.substring(0,pos) + exp.substring(pos).replace(vname,`${vname}`);
        }else 
        if(wrap){
            // let left = pos;
            // let right = pos + vname.length;
            // var lbc = 0, rbc = 0;
            // while(left >= 0 && right < exp.length){
            //     if(['\`','\'','\"'].includes(exp[left])) lbc++;
            //     if(['\`','\'','\"'].includes(exp[right])) right++;
            //     left--;
            //     right++;
            // }
            var isInString = false;
            for(var i = 0; i < pos; i++){
                if(['\`','\'','\"'].includes(exp[i])) isInString = !isInString;
            }
            if(!isInString){
                if((typeof window[v] !== 'undefined')){
                    exp = exp.substring(0,pos) + exp.substring(pos).replace(vname,`${vname}`);
                }else exp = exp.substring(0,pos) + exp.substring(pos).replace(vname,`_.${vname}`);
            }
        }
    }
    return exp;
}

export const parseReactive = (parts, ctx = {}) => {
    return parts.map(e => {
        let exp = "";
        e = e.trim();
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
    var on = [];

    if($node.attributes.length > 0){
        for(var {name,value} of $node.attributes){
            if(['input','select'].includes($node.tagName.toLowerCase()) && name.includes('(model)')){
                var v = $node.getAttribute('type').trim().toLowerCase();
                if(['checkbox'].includes(v))
                    attrs.push(`checked: ${parseExpression(value.trim(),ctx,true)}`)
                else
                    attrs.push(`value: ${parseExpression(value.trim(),ctx,true)}`)
                on.push(`'input': function($event){ ${parseExpression(value.trim(),ctx,true)} = $event.target.${['checkbox'].includes(v) ? 'checked' : 'value'}; }`);
                continue;
            }

            if(name.includes(':'))
                attrs.push(`'${name.slice(1)}': __.a(${parseExpression(value,ctx)})`);
            else if (name.includes('@')){
                on.push(`'${name.slice(1)}': ${parseMethod(value, ctx)}`);
            }else{
                if(value.startsWith('{') && value.endsWith('}')){
                    attrs.push(`'${name}': __.a(${parseExpression(value.slice(1,value.length-1),ctx)})`);
                }else{
                    attrs.push(`'${name}': '${value}'`);
                }
            }
        }
    }

    return `{ attrs: {${attrs.join(',')}}, on: {${on.join(',')}}}`;
}

export const parseMethod = (value, ctx) => {
    return `function($event){ return ${parseExpression(value,ctx,true)}}`;
};

export const parseDOM = ($html, ctx = {}) => {
    try{
        const data = new DOMParser().parseFromString($html,'text/html').body;
        return data;
    }catch(e){
        throw new Error("Parsing DOM error!");
    }
}

export const compile = ($html) => {
    return parse(parseDOM($html));
};