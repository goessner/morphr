# Morphr

<code>Morphr</code> is a tiny javascript class for morphing numerical values of arbitrary objects 
in a given time interval `dt` along a given range `dval`. Most often you will want to use it for 
animation.

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
                   .register(value(rec,"x",100))
                   .register(value(rec,"y",50))
                   .register(value(rec,"b",100))
                   .register(value(rec,"h",-75))
                   .register(render)
                   .start();
</script>
```

## API Reference

`Morphr` is a tiny class for simultaneously morphing numerical object values in a given time interval.
Use case is most often parameter animation. `Morphr` depends on `requestAnimationFrame`.
Do not use `new Morphr()`. Use `Morphr.create()` for creating instances.

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
| hdl | <code>function</code> | Callback function `hdl(q){}`, where `q` is the - via `fn` - normalized time. |

<a name="Morphr+start"></a>
### morphr.start() ⇒ <code>object</code>
Start morphing process.

**Kind**: instance method of <code>[Morphr](#Morphr)</code>  
**Returns**: <code>object</code> - this.  


#Change Log

All notable changes to this project will be documented here. This project adheres to Semantic Versioning.

## 0.7.0 - 2016-03-27

### First Commit to Github