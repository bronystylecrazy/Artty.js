# Artty.js
Simple lightweight Artty Library
- Very fucking simple library
- Very lightweight because it's almost nothing
- Stupid diff algorithm and reactive
## Import CDN here:
```html
<script src="https://raw.githubusercontent.com/bronystylecrazy/Artty.js/main/dist/artty.js.umd.js"></script>
```
## In HTML file:
```html
<div id="app">
    <h1>Hello, { message }</h1> <!-- { expression } uses to empower html-->
    <h2 (if)="show">Show message</h2> <!-- if-else directives-->
    <h4 (else)>Hide message</h4>

    <!-- loop through -->
    <p (for)="person in people">{person.id} {person.name}</p>
</div>
```

## In javascript part:
```js
const App = Artty.createApp({
    /* state goes here */
    count: 1,
    message: 'Sirawit',
    show: true,
    people: [{id: 1, name: 'Sirawit'}, {id: 2, name: 'Rossarin'}]
}).sync("#app"); // mount to #app


App.state.count++; // can change the state!
```
## Fucking simple life-cycle hooks ever
- need to place before **sync** function!
```js
App.<name>(function(vm){
    this.state.message = "Hello World"; // state can be changed through here
    vm.state.message = "Hello World"; // this too when you're using arrow function
});

App.created(); // when app is created
App.mounted(); // when app is mounted
App.updated(); // when app is updated
App.unmouted(); // when app is unmounted
App.destroyed(); // when app is destroyed


/* It can be chained together like this: */
App
.created()
.mounted()
.updated()
.unmounted()
.destroyed()
.sync('#app')
```