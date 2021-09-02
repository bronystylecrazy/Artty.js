var _eventHandlers = {}; // somewhere global

const addListener = (node, event, handler, capture = false) => {
    if (!(event in _eventHandlers)) {
        _eventHandlers[event] = []
    }
    // here we track the events and their nodes (note that we cannot
    // use node as Object keys, as they'd get coerced into a string
    _eventHandlers[event].push({
        node: node,
        handler: handler,
        capture: capture
    })
    node.addEventListener(event, handler, capture)
}

const removeAllListeners = (targetNode, event) => {
    // remove listeners from the matching nodes
    _eventHandlers[event]
        .filter(({
            node
        }) => node === targetNode)
        .forEach(({
            node,
            handler,
            capture
        }) => node.removeEventListener(event, handler, capture))

    // update _eventHandlers global
    _eventHandlers[event] = _eventHandlers[event].filter(
        ({
            node
        }) => node !== targetNode,
    )
}


export {
    addListener,
    removeAllListeners
}