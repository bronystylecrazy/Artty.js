# Artty.js
Simple lightweight Artty Library, the purpose is to simulate virtual dom and try to make Vue - React clone for education purposes.
- Very fucking simple library
- Very lightweight because it's almost nothing
- Stupid and too slow diff algorithm
## Import script here:
```html
<script src="./dist/artty.js"></script>
```
or using module import
```js
import Artty from './dist/artty.js'
import { createApp } from './dist/artty.js'
```
## In HTML file:
```html
<div id="app">
    <h1>Hello, { message }</h1> <!-- { expression } uses to empower html-->
    <p>{ MESSAGE }</p>

    <h2 (if)="show">Show message</h2> <!-- if-else directives-->
    <h4 (else)>Hide message</h4>

    <!-- loop through, I suggest that put it in div because of the stupid diff algotithm-->
    <div>
        <p (for)="person in people">{person.id} {person.name}</p>
    </div>

    <!-- method -->
    <button @click="click">
    <button @click="send($state, show)"> <!-- this is fine, but can not use 'this' as state variable--->
    <button @click="send.call($state, $state, show)"> <!-- method with state parameter and bind state to 'this' -->

    <!-- model -->
    <input type="text" (model)="simpleInput"/>
    <input type="checkbox" (model)="simpleCheckbox"/>
    <b>Input value: { simpleInput }</b>
    <b>Checkbox value: { simpleCheckbox }</b>
</div>
```

## In javascript part:
```js
const App = Artty.createApp({
    /* state goes here */
    count: 1,
    message: 'Sirawit',
    show: true,
    people: [{id: 1, name: 'Sirawit'}, {id: 2, name: 'Rossarin'}],
    sampleInput: "hello",
    sampleCheckBox: true,
    click(){
        this.show = !show; // state can be changed here
    },
    send($state, show){
        $state.message = 'fixed message';
        $state.show = !show;
        $state.show = !state.show;
    },
    get MESSAGE(){ // customer property get
        return this.message.toUpperCase();
    }
})

App.sync("#app"); // mount to #app


App.state.count++; // can change the state!
```

## Get compiled virtual DOM
```js
App.template
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


## Hyperactiv Reactivity
- too lazy for me to manage reactivity
- so I decided to use [Hyperactiv](https://github.com/elbywan/hyperactiv) to manage reactivity 
- you can use hyperactiv too!
```js
const { observe, computed } = Artty.hyperactiv;

// This object is observed.
const observed = observe({
    a: 1,
    b: 2,
    c: 0
})

// Calling computed(...) runs the function and memorize its dependencies.
// Here, the function depends on properties 'a' and 'b'.
computed(() => {
    const { a, b } = observed
    console.log(`a + b = ${a + b}`)
})
// Prints: a + b = 3

// Whenever properties 'a' or 'b' are mutated…
observed.a = 2
// The function will automagically be called.
// Prints: a + b = 4

observed.b = 3
// Prints: a + b = 5

observed.c = 1
// Nothing depends on 'c', so nothing will happen.
```