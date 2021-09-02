import * as Artty from './artty';

export default Artty;

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