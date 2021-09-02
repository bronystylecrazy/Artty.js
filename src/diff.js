import { generate } from "./generator";
export const zip = (xs, ys) => {
    const zipped = [];
    for (var i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
};

export const diffEvent = (vOldOn, vNewOn) => {
    const patches = [];
    // Object.entries(vNewAttr)
    return $node => {
        
    };
};

export const diffAttribute = (vNewNode,vOldAttr, vNewAttr) => {
    const patches = [];
    for (const [k, v] of Object.entries(vNewAttr)) {
       patches.push($node => {
            try{
                if(k.trim().toLowerCase() === 'value')
                    $node.value = v;
                else $node.setAttribute(k, v);
            }catch(e){ 
                // console.error(`invalid directive name ${k}`, e.message);
            }
           return $node;
       });
    }

    for (const k in vOldAttr) {
        if(!(k in vOldAttr)) {
            patches.push($node => {
                $node.removeAttribute(k);
                return $node;
            });
        }
    }

    return $node => {
        for(var patch of patches) {
            patch($node);
        }
    };
};

export const diffChildren = (vOldChildren, vNewChildren) => {

    const patches = [];
    const additionalPatches = [];
    const removalPatches = [];

    for(var [oldVChild, newVChild] of zip(vOldChildren, vNewChildren)) {
        patches.push(diff(oldVChild, newVChild));
    }

    if(vOldChildren.length < vNewChildren.length){
        for (const additionalChild of vNewChildren.slice(vOldChildren.length)) {
            additionalPatches.push($node => {
                const $newChild = generate(additionalChild);
                $node.appendChild($newChild);
                return $node;
            });
        }
    }else{
        for (var i = 0; i < Math.abs(vNewChildren.length - vOldChildren.length); i++) {
            removalPatches.push($node => {
                $node.removeChild($node.lastChild);
                return $node;
            });
        }
    }

    return $parent => {


        for(const [patch, child] of zip(patches, $parent.childNodes)) {
            patch(child);
        }

        for(const patch of additionalPatches){
            patch($parent);
        }

        for(const patch of removalPatches){
            patch($parent);
        }

        return $parent;
    };
};

export const diff = (vOldNode, vNewNode) => {
    if(vNewNode === undefined){
        return $node => {
            $node.remove();
            return undefined;
        };
    }

    if(typeof vOldNode === 'string' || typeof vNewNode === 'string'){
        if(vOldNode !== vNewNode){
            return $node => {
                const $newNode = generate(vNewNode);
                $node.replaceWith($newNode);
                return $newNode;
            };
        }else{
            return $node => undefined;
        }
    }

    if(vOldNode.tagName !== vNewNode.tagName){
        return $node => {
            const $newNode = generate(vNewNode);
            $node.replaceWith($newNode);
            return $newNode;
        };
    }

    const patchAttribute = diffAttribute(vNewNode,vOldNode.opts.attrs, vNewNode.opts.attrs);
    const patchChildren = diffChildren(vOldNode.children, vNewNode.children);
    const patchEvent = diffEvent(vOldNode.opts.on, vNewNode.opts.on);
    return $node => {
        patchAttribute($node);
        patchChildren($node);
        patchEvent($node);
        return $node;
    };
}
