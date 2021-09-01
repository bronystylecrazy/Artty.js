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
        $el: null,
        updateList: [],
        sync($s){
            this.$el = document.querySelector($s);
            var template = `return h('div',${parse(this.$el)})`;
            this.state.__handler = () => this.update();
            // console.log(new Function('h','_','__',template)(h,this.state,this.utils))
            this.render(function(h){
                var _ = this.state;
                var __ = this.utils;
                // console.log('UPDATE!')
                // console.log(`return h('div',${parse(this.$el)})`);
                console.log(template)
                return new Function('h','_','__',template)(h,_,__);
            });
            return this;
        },
        update(){
            for(var v of this.updateList) v(this.state);
            this.$el.removeAttribute('(cloak)');
        },
        render(cb){
            const vm = {state,utils: this.utils};
            let vApp = cb.apply(vm,[h, vm]);
            let $app = generate(vApp);
            let $rootEl = this.mount($app,this.$el);
            this.nextTick((state) => {
                const vm = {state: this.state,utils: this.utils};
                let vNewApp = cb.apply(vm,[h]);
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
        },
        utils: {
            l(time, cb){
                var h = [];
                if(typeof time === 'number'){
                    Array.from(Array(time).keys()).forEach(() => h.push(cb(i,i)));
                }
                if(Array.isArray(time)){
                    console.log('loop',time)
                    var i = 0;
                    for(var a of time)
                        h.push(cb(a, i++));
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