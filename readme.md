[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/goessner/g2/license.txt)
[![npm](https://img.shields.io/npm/v/morphr.svg)](https://www.npmjs.com/package/morphr)

# Morphr

<code>Morphr</code> is a tiny and lightweight javascript class for morphing numerical values of 
arbitrary, mostly plain javascript objects in a given time interval `dt` along a given range `dval`. 
Most often you will want to use it for animation. So it works excellently in combination with Html canvas.

## Example
![Morphr Example](./morphr.gif)

(animated gif)  
see [example](https://goessner.github.io/morphr/examples/simple.html)

```html
<h1>Morphr Example</h1>
<canvas id="c" width="401" height="301"></canvas>
<script src='./g2.js'></script>
<script src='./morphr.js'></script>
<script>
// object value handlers ...
function value(obj,prop,dval) {
   var val0 = obj[prop];
   return function(q) { obj[prop] = val0 + q*dval; };
}
// render to canvas via g2 ..
function render() {
   g2().clr()
       .rec(rec.x,rec.y,rec.b,rec.h,{ls:"maroon",lw:2,fs:"transparent",ld:[4,4]})
       .exe(document.getElementById("c").getContext("2d"));
}
var rec = {x:100,y:100,b:20,h:100},               // plain javascript rectangle object ... 
    morphr = Morphr.create(4,0,"sinoid")          // create and configure Morphr object ...
                   .register(value(rec,"x",100))  // move along x-axis by 100 in 4 s.
                   .register(value(rec,"y",50))   // move along y-axis by 50 in 4 s.
                   .register(value(rec,"b",100))  // increase width by 100 in 4 s.
                   .register(value(rec,"h",-75))  // decrease height by 75 in 4 s.
                   .register(render)              // render to canvas.
                   .start();
</script>
```
Sequential morphing is easily achieved via multiple <code>Morphr</code> objects. DOM element attributes are morphable as well.

see [sequential](https://goessner.github.io/morphr/examples/sequential.html)

Here is a more complex canvas based [Crank-Rocker animation](https://goessner.github.io/morphr/examples/complex.html) using
a [g2](https://github.com/goessner/g2) command queue for vector graphics.

Maybe you want to learn a bit more about [Crank-Rockers](https://github.com/goessner/crocker).

## GitCDN
Use the link [https://gitcdn.xyz/repo/goessner/g2/master/morphr.min.js](https://gitcdn.xyz/repo/goessner/morphr/master/morphr.min.js)
for getting the latest commit as a raw file.

In HTML use ...
```html
<script src="https://gitcdn.xyz/repo/goessner/morphr/master/morphr.min.js"></script>
```

## API Reference

`Morphr` is a tiny class for simultaneously morphing numerical object values in a given time interval.
Use case is most often parameter animation of plain javascript objects. So it works excellently with
canvas. `Morphr` depends on `requestAnimationFrame`.

Do not use `new Morphr()`, call `Morphr.create()` instead for creating instances.

* [Morphr](#Morphr)
  * _static_
    * [.create([dt], [t0], [fn])](#Morphr.create) ⇒ <code>object</code>
  * _instance_
    * [.register(hdl)](#Morphr+register) ⇒ <code>object</code>
    * [.start()](#Morphr+start) ⇒ <code>object</code>

<a name="Morphr.create"></a>
### Morphr.create([dt], [t0], [fn]) ⇒ <code>object</code>
Create a `Morphr` instance by start time, duration and timing function for morphing. A couple of predefined 
timing functions are available [s. VDI2143]:
  * `linear` 
  * `quadratic`
  * `sinoid`
  * `poly5`

**Kind**: static method of <code>[Morphr](#Morphr)</code>  
**Returns**: <code>object</code> - `Morphr` instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dt] | <code>float</code> | <code>2</code> | Duration in [s]. |
| [t0] | <code>float</code> | <code>0</code> | Start time in [s] relative to first time call of `start` method. |
| [fn] | <code>function</code> &#124; <code>string</code> | <code>&quot;linear&quot;</code> | Timing function as `function` object or name of predefined function. |

<a name="Morphr+register"></a>
### morphr.register(hdl) ⇒ <code>object</code>
Register morphing handler function.

**Kind**: instance method of <code>[Morphr](#Morphr)</code>  
**Returns**: <code>object</code> - this.  

| Param | Type | Description |
| --- | --- | --- |
| hdl | <code>function</code> | Callback function `hdl(q){}`, where `q` is the - via `fn` - normalized time or the boolean value `false` to reset for a new start. |

<a name="Morphr+start"></a>
### morphr.start() ⇒ <code>object</code>
Start morphing process.

**Kind**: instance method of <code>[Morphr](#Morphr)</code>  
**Returns**: <code>object</code> - this.  


#Change Log

All notable changes to this project will be documented here. This project adheres to Semantic Versioning.

## 0.7.0 - 2016-03-27

### First Commit to Github
