import { generate } from "./generator";
import { addListener, removeAllListeners} from './event';

export const zip = (xs, ys) => {
    const zipped = [];
    for (var i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
};

export const diffEvent = (vNode,vOldOn, vNewOn) => {
    const patches = [];
    for (const k in vOldOn) {
        if(!(k.trim() in vNewOn)) {
            patches.push($node => {
                removeAllListeners($node,k.trim());
                return $node;
            });
        }
    }

    for (const [k, v] of Object.entries(vNewOn)) {
        patches.push($node => {
            addListener($node,k,function($event){
                var c = v($event);
                if(typeof c === 'function'){
                    c.call(this,$event);
                }
            }, false);
            return $node;
        });
    }
    
    return $node => {
        for(var patch of patches) {
            patch($node);
        }
    };
};

export const diffAttribute = (vNewNode,vOldAttr, vNewAttr) => {
    const patches = [];
    // console.log(vNewNode, vOldAttr, vNewAttr)
    for (const [k, v] of Object.entries(vNewAttr)) {
       patches.push($node => {
            try{
                if(['value','checked'].includes(k.trim().toLowerCase())){
                    $node[k] = v;
                }else
                    $node.setAttribute(k, v);
            }catch(e){ 
                // console.error(`invalid directive name ${k}`, e.message);
            }
           return $node;
       });
    }

    for (const k in vOldAttr) {
        if(!(k in vNewAttr)) {
            patches.push($node => {
                if(['value','checked'].includes(k.trim().toLowerCase()))
                    $node[k] = "";
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
    // console.log(vOldNode, vNewNode)
    if(vNewNode === undefined || vNewNode === null){
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
    if(vOldNode.tag !== vNewNode.tag){
        return $node => {
            const $newNode = generate(vNewNode);
            $node.replaceWith($newNode);
            return $newNode;
        };
    }
    const patchChildren = diffChildren(vOldNode.children, vNewNode.children);
    const patchAttribute = diffAttribute(vNewNode,vOldNode.opts.attrs, vNewNode.opts.attrs);
    const patchEvent = diffEvent(vNewNode,vOldNode.opts.on, vNewNode.opts.on);
    return $node => {
        patchAttribute($node);
        patchChildren($node);
        patchEvent($node);
        return $node;
    };
}
