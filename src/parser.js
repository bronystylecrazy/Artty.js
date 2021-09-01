export const parse = ($target) => {
    var vnode = [];
    for(var $childNode of $target.childNodes){
        if($childNode.nodeType === Node.TEXT_NODE) {
            vnode.push(parseFromElement($childNode));
            continue;
        }
        if(!$childNode.hasAttribute('(else)'))
            vnode.push(parseFromElement($childNode));
    }
    return `[${vnode.join(',')}]`;
}

export const h = ($node) => {
    if(typeof $node === "undefined" || typeof $node === 'null') return `h()`;
    return `h('${$node.tagName}',${parseOptions($node)},${parse($node)})`
};

export const parseDirective = ($node) => {
    if($node.hasAttribute('(for)')){
        var $statement = $node.getAttribute('(for)');
        var [l,r] = $statement.split(' of ');
        $node.removeAttribute('(for)');
        return `__for((${r}), ${l} => ${parseFromElement($node)})`;
    }

    if($node.hasAttribute('(if)')){
        var $statement = $node.getAttribute('(if)');
        $node.removeAttribute('(if)')
        var $elseNode = $node.nextElementSibling;
        if($elseNode !== null && $elseNode.hasAttribute('(else)')){
            $elseNode.setAttribute('data-elsed', true);
            return `((${$statement}) ? ${parseFromElement($node)} : ${parseFromElement($elseNode,true)})`;
        }
        return `((${$statement}) ? ${parseFromElement($node)} : ${parseFromElement()})`;
    }

    return h($node);
}

export const parseFromElement = ($node) => {
    if(typeof $node === 'undefined') return h();
    if($node.nodeType === Node.TEXT_NODE){
        return parseText($node.textContent);
    }

    return parseDirective($node);
}

export const parseText = ($text) => {
    return `'${$node.textContent.replaceAll("\n","\\n")}'`;
}

export const parseOptions = ($node) => {
    var attrs = [];
    if($node.attributes.length > 0){
        for(var {name,value} of $node.attributes){
            if(name.includes(':'))
                attrs.push(`'${name.slice(1)}': ${value}`);
            else
                attrs.push(`'${name}': '${value}'`);
        }
    }
    return `{ attrs: {${attrs.join(',')}}}`;
}


export const parseDOM = ($html) => {
    try{
        const data = new DOMParser().parseFromString($html,'text/html').body;
        return data;
    }catch(e){
        throw new Error("Parsing DOM error!");
        return null;
    }
}