import h from './h';
import { diff } from './diff';
import { generate } from './generator';
import { parse } from './parser';
import Reactive from './reactive';
export const reactive = Reactive;

export const createApp = (state) => {
    return ({
        state: reactive.observe(state),
        vnodes: [],
        template: "",
        $el: null,
        $event: {
            created: [],
            mounted: [],
            updated: [],
            unmounted:[]
        },
        $emit(evtName,ctx){
            if(evtName in this.$event){
                this.$event[evtName].forEach(e => e.call(ctx, ctx));
                return this;
            }
            this.$event[evtName] = [];
            this.$event[evtName].forEach(e => e.call(ctx, ctx));
            return this;
        },
        sync($s){
            this.$el = document.getElementById($s);
            this.template = `return h('div',${parse(this.$el)})`;
            this.$emit('created',this);
            const [_,__] = [this.state,this.utils];
            let vApp = new Function('h','_','__',this.template)(h,_,__);
            let $app = generate(vApp);
            let $rootEl = this.mount($app,this.$el);
            this.$emit('mounted',this);
            reactive.computed(() => {
                const [_,__] = [this.state,this.utils];
                let vNewApp = new Function('h','_','__',this.template)(h,_,__);
                const patch = diff(vApp,vNewApp);
                $rootEl = patch($rootEl);
                vApp = vNewApp;
                this.vnodes = vApp;
                this.$emit('updated',this);
            });
            return this;
        },
        updated(cb){
            this.$event.updated.push(cb);
            return this;
        },
        created(cb){
            this.$event.created.push(cb);
            return this;
        },
        mounted(cb){
            this.$event.mounted.push(cb);
            return this;
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