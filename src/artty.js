import h from './h';
import { diff } from './diff';
import { generate } from './generator';
import {reactive} from './reactive';
import hyperactiv from 'hyperactiv'
import { parse } from './parser';
const { observe, computed } = hyperactiv;

export const createApp = (state) => {
    return ({
        state: observe(state),
        vnodes: [],
        template: "",
        $el: null,
        updateList: [],
        sync($s){
            this.$el = document.querySelector($s);
            this.template = `return h('div',${parse(this.$el)})`;
            const [_,__] = [this.state,this.utils];
            let vApp = new Function('h','_','__',this.template)(h,_,__);
            let $app = generate(vApp);
            let $rootEl = this.mount($app,this.$el);
            this.state.__handler = (a,b,c,d) => {
                const [_,__] = [this.state,this.utils];
                let vNewApp = new Function('h','_','__',this.template)(h,_,__);
                const patch = diff(vApp,vNewApp);
                $rootEl = patch($rootEl);
                vApp = vNewApp;
                this.vnodes = vApp;
            }
            return this;
        },
        update(){
            for(var v of this.updateList) v(this.state);
            this.$el.removeAttribute('(cloak)');
        },
        render(cb){
            // this.nextTick((state) => {
                
            // });
            // return this;
        },
        nextTick(cb){
            this.updateList.push(cb);
        },
        mount($node,$el){
            $el.replaceWith($node);
            return $node;
        },
        utils: {
            l(time, cb){
                var h = [];
                if(typeof time === 'number'){
                    Array.from(Array(time).keys()).forEach((a,i) => h.push(cb(i,i)));
                }
                if(Array.isArray(time)){
                    time.forEach((a,i) => h.push(cb(a, i)));
                }
                return h;
            },
            s(t){
                if(typeof t === 'undefined') return "";
                if(typeof t === 'object') return JSON.stringify(t);
                return String(t);
            }
        }
    });
};