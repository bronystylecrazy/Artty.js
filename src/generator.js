export const generate = (vNode) => {
    if(typeof vNode === 'string') return document.createTextNode(vNode);
    return generateElement(vNode);
};

export const generateElement = (vNode) => {
    const $el = document.createElement(vNode.tag);
    for(var [k,v] of Object.entries(vNode?.opts?.attrs)) {
        if(['value','checked'].includes(k)){
            $el[k] = v;
        }else $el.setAttribute(k,v);
    }
    for(var [k,v] of Object.entries(vNode?.opts?.on)){
        // $el.removeEventListener(k,v);
        $el.addEventListener(k,function($event){
            var c = v($event);
            if(typeof c === 'function'){
                c.call(this,$event);
            }
        });
    };
    
    for(var vChild of vNode.children){
        if(vChild !== null){
            const $child = generate(vChild);
            $el.appendChild($child);
        }
    }
    return $el;
}