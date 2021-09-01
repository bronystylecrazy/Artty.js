import { createApp } from './artty';
import { parse, parseDOM } from './parser';


export default createApp;
// window.Appp = createApp({ 
//     id: 1,
//     show: true,
//     message: 'hello',
//     arr: [1,2,3,4,6,7,8,8]
// }).sync('#app');

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

// var html = document.getElementById('html');
// var js = document.getElementById('js');

// html.addEventListener('input', function(e){
//     js.value = parse(parseDOM(e.target.value));
// });

// console.log(parse(document.getElementById('hello')));