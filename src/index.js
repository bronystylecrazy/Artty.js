import { createApp } from './artty';
import { parse, parseDOM } from './parser';

window.Appp = createApp({ 
    id: 1,
    show: true,
    message: 'hello',
    arr: [1,2,3,4,6,7,8,8]
}).sync('#app');

// app.render(function(h){
//     const v = this;
//     return h(`h1`,{
//             attrs: {id: v.id},
//             on: { 
//                 click: ($event) => {

//                 }
//             }
//         },[
//         v.id + 'hello',
//         (v.show) ? h('b',['hello']) : h(),
//         v._l((v.id), n => h('b', [
//             v._l((n), p => String(v.id))
//         ]))
//     ]);
// });

Appp.render(function(h){
    var _ = this.state;
    var __ = this.utils;
    return h('div',["\n        ",h('H1',{ attrs: {}},["HelloWorld ",__.s(_.arr)," "]),"\n        ",__.l((_.arr), (n) => h('P',{ attrs: {}},[__.s(_.id)])),"\n    "])
});

// var html = document.getElementById('html');
// var js = document.getElementById('js');

// html.addEventListener('input', function(e){
//     js.value = parse(parseDOM(e.target.value));
// });

// console.log(parse(document.getElementById('hello')));