const h = (tag, opts = { attrs: {}, on: {} }, children) => {
    if('undefined' === typeof tag) return null;
    return Array.isArray(opts) ? 
    {tag, opts: { attrs: {}, on: {} }, children: opts.flat().filter(e => !!e)} :
    {tag, opts, children: children.flat().filter(e => !!e)};
};

export default h;