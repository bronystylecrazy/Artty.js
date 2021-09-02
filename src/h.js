const h = (tag, opts = { key: null,attrs: {}, on: {} }, children) => {
    if('undefined' === typeof tag) return null;
    return Array.isArray(opts) ? 
    {tag, opts: { key: null, attrs: {}, on: {} }, children: opts.flat().filter(e => !!e)} :
    {tag, opts, children: children.flat().filter(e => !!e)};
};

export default h;