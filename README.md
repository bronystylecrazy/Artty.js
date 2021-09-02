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