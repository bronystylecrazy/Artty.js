export const generate = (vNode) => {
    if(typeof vNode === 'string') return document.createTextNode(vNode);
    return generateElement(vNode);
};

export const generateElement = (vNode) => {
    const $el = document.createElement(vNode.tag);
    for(var [k,v] of Object.entries(vNode?.opts?.attrs)) $el.setAttribute(k,v);
    for(var vChild of vNode.children){
        if(vChild !== null){
            const $child = generate(vChild);
            $el.appendChild($child);
        }
    }
    return $el;
}