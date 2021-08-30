const h = (tag, opts = { attrs: {}, on: {} }, children) => {
    if('undefined' === typeof tag) return null;
    return Array.isArray(opts) ? 
    {tag, opts: { attrs: {}, on: {} }, children: opts.flat()} :
    {tag, opts, children: children.flat()};
};

export default h;