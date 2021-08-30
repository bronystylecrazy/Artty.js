import h from './h';
import { diff } from './diff';
import { generate } from './generator';
import {reactive} from './reactive';
import hyperactiv from 'hyperactiv'
const { observe, computed } = hyperactiv;

export const createApp = (state) => {
    return ({
        state: observe(state),
        vnodes: [],
        $el: null,
        updateList: [],
        sync($s){
            this.$el = document.querySelector($s);
            this.state.__handler = () => this.update();
            return this;
        },
        update(){
            for(var v of this.updateList) v(this.state);
        },
        render(cb){
            const _l = (arr, cb) => {
                const buildVNode = [];
                if(Array.isArray(arr)){
                    for(var n of arr) buildVNode.push(cb.apply(state,[n]));
                }else{
                    for(var i = 0; i < arr; i++) buildVNode.push(cb.apply(state,[i]));
                }
                return buildVNode;
            };
            const ctx = {...state,_l};
            let vApp = cb.apply(ctx,[h]);
            let $app = generate(vApp);
            let $rootEl = this.mount($app,this.$el);
            this.nextTick((state) => {
                const newCtx = {...state,_l};
                let vNewApp = cb.apply(newCtx,[h]);
                const patch = diff(vApp,vNewApp);
                $rootEl = patch($rootEl);
                vApp = vNewApp;
            });
            return this;
        },
        nextTick(cb){
            this.updateList.push(cb);
        },
        mount($node,$el){
            $el.replaceWith($node);
            return $node;
        }
    });
};