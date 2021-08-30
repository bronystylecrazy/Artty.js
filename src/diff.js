import { generate } from "./generator";
export const zip = (xs, ys) => {
    const zipped = [];
    for (var i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }
    return zipped;
};

export const diffAttribute = (vOldAttr, vNewAttr) => {
    const patches = [];
    for (const [k, v] of Object.entries(vNewAttr)) {
       patches.push($node => {
           $node.setAttribute(k, v);
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
                $node.removeChild($node.childNodes[$node.children.length]);
                return $node;
            });
        }
    }

    return $parent => {
        for(const [patch, child] of zip(patches, $parent.childNodes)) patch(child);
        for(const patch of additionalPatches) patch($parent);
        for(const patch of removalPatches) patch($parent);
        return $parent;
    };
};

export const diff = (oldVNode, newVNode) => {
    if(newVNode === undefined){
        return $node => {
            $node.remove();
            return undefined;
        };
    }

    if(typeof oldVNode === 'string' || typeof newVNode === 'string'){
        if(oldVNode !== newVNode){
            return $node => {
                const $newNode = generate(newVNode);
                $node.replaceWith($newNode);
                return $newNode;
            };
        }else{
            return $node => undefined;
        }
    }

    if(oldVNode.tag !== newVNode.tag){
        return $node => {
            const $newNode = generate(newVNode);
            $node.replaceWith($newNode);
            return $newNode;
        };
    }

    const patchAttribute = diffAttribute(oldVNode.opts.attrs, newVNode.opts.attrs);
    const patchChildren = diffChildren(oldVNode.children, newVNode.children);

    return $node => {
        patchAttribute($node);
        patchChildren($node);
        // patchKey($node);
        return $node;
    };
};