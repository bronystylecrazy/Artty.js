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
            removeAllListeners($node,k);
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

    // console.log(vOldChildren, vNewChildren)

    //     var cached = {};
    //     for(var i = 0; i < vNewChildren.length; i++){
    //         if(typeof vNewChildren[i] === 'string') continue;
    //         cached[vNewChildren[i].opts.key] = false;
    //     }

    //     vOldChildren.reverse().forEach((v,i) => {
    //         if(typeof v === 'string') return;
    //         if(!(v.opts.key in cached)){
    //             removalPatches.push($node => {
    //                 $node.childNodes[i].remove();
    //                 return $node;
    //             });
    //         }
    //     })
        // for (var i = vOldChildren.length-1; i >= 0 ; i--) {
        //     if(typeof vOldChildren[i] === 'string') continue;
        //     if(!(vOldChildren[i].opts.key in cached)){
        //         console.log('remove')
        //         removalPatches.push($node => {
        //             console.log($node.childNodes);
        //             $node.childNodes[0].remove();
        //             return $node;
        //         });
        //     }
        // }
    //     console.log(vOldChildren,vNewChildren)
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


        // var cached_id = {};
        // for(var i = 0; i < vNewChildren.length; i++){
        //     cached_id[vNewChildren[i].key] = true;
        // }
        // for(var i = 0; i < vOldChildren.length; i++){
        //     if(!(vOldChildren.key in cached_id)){
        //         removalPatches.push($node => {
        //             $node.removeChild($node.childNodes[i]);
        //             return $node;
        //         });
        //     }
        // }

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
