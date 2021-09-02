import h from './h';
import { diff } from './diff';
import { generate } from './generator';
import * as parser from './parser';
import reactive from './reactive';

const hyperactiv = reactive;

const createApp = (state) => {
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
            this.template = `let v={};return h('div',${parser.parse(this.$el,this.state)})`;
            this.$emit('created',this);
            const [_,__] = [this.state,this.utils];
            let vApp = new Function('h','_','__',...Object.keys(_),this.template)(h,_,__,...Object.values(_));
            let $app = generate(vApp);
            let $rootEl = this.mount($app,this.$el);
            this.$emit('mounted',this);
            reactive.computed(() => {
                let vNewApp = new Function('h','_','__',...Object.keys(_),this.template)(h,_,__,...Object.values(_));
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
            l(time, cb, n){
                var h = [];
                if(typeof time === 'string'){
                    if(+time){
                        Array.from(Array(Math.max(0,+time)).keys()).forEach((a,i) => {
                            return h.push(cb.call({[n]: a},a,a))
                        });
                    }
                }
                if(Array.isArray(time)){
                    time.forEach((a,i) => h.push(cb.call({[n]: a},a, i)));
                }
                return h;
            },
            s(t){
                if(typeof t === 'undefined') return "";
                if(typeof t === 'object') return JSON.stringify(t);
                return String(t);
            },
            a(t){
                if(typeof t === 'object'){
                    var a = [];
                    for(var o in t){
                        if(t[o]) a.push(o);
                    }
                    return a.join(' ');
                }
                return String(t);
            },
        }
    });
};

export {
    createApp,
    hyperactiv,
    parser
}