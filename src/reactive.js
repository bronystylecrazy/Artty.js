export function reactive(data){
    const state = {...data};
    for (let key in state) {
        if (state.hasOwnProperty(key)) {
          observe.bind(this,state, key);
        }
    }
    return state;
};

export function observe (obj, key) {
    let val = obj[key]
    Object.defineProperty(obj, key, {
      get () {
        return val
      },
      set (newVal) {
        if(val !== newVal){
            val = newVal
        }
      }
    })
  }