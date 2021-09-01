# Artty.js
Simple lightweight Artty Framework

```html
<script src="https://raw.githubusercontent.com/bronystylecrazy/Artty.js/main/dist/artty.js.umd.js"></script>
```

```html
<div id="app">
    <h1>Hello, { message }</h1> <!-- { expression } uses to empower html-->
    <h2 (if)="show">Show message</h2> <!-- if-else directives-->
    <h4 (else)>Hide message</h4>

    <!-- loop through -->
    <p (for)="person in people">{person.id} {person.name}</p>
</div>
```


```js
const App = createApp({
    /* state goes here */
    count: 1,
    message: 'Sirawit',
    show: true,
    people: [{id: 1, name: 'Sirawit'}, {id: 2, name: 'Rossarin'}]
}).sync("#app"); // mount to div#app

```