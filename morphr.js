/**
 * Morphr (c) 2016 Stefan Goessner
 * @license
 * MIT License
 */

"use strict";

/** 
 * `Morphr` is a tiny class for simultaneously morphing numerical object values in a given time interval.
 * Use case is most often parameter animation of plain javascript objects. So it works excellently with
 * canvas. `Morphr` depends on `requestAnimationFrame`.
 * 
 * Do not use `new Morphr()`, call `Morphr.create()` instead for creating instances.
 * @class 
 */
var Morphr = {
/**
 * Create a `Morphr` instance by start time, duration and timing function for morphing. A couple of predefined 
 * timing functions are available [s. VDI2143]:
 *   * `linear` 
 *   * `quadratic`
 *   * `sinoid`
 *   * `poly5`
 * @returns {object} `Morphr` instance.
 * @param {float} [dt=2] Duration in [s].
 * @param {float} [t0=0] Start time in [s] relative to first time call of `start` method.
 * @param {function|string} [fn="linear"] Timing function as `function` object or name of predefined function.
 */
   create: function() { var o = Object.create(this.prototype); o.constructor.apply(o,arguments); return o; },
   prototype: {
      constructor: function(dt,t0,fn) {
         this.dt = (dt || 2)*1000;  // use ms ...
         this.t0 = (t0 || 0)*1000;  // use ms ...
         this.fn = typeof fn === "string" && Morphr[fn] ? Morphr[fn]
                 : typeof fn === "function" ? fn : Morphr.linear;
         this.handlers = [];
         this.animateHdl = Morphr.prototype.animate.bind(this);
      },
      /**
       * Register morphing handler function.
       * @returns {object} this.
       * @param {function} hdl Callback function `hdl(q){}`, where `q` is the - via `fn` - normalized time or the boolean value `false` to reset for a new start.
       */
      register: function(hdl) {
         if (hdl) {
            var idx = this.handlers.indexOf(hdl);
            if (idx === -1)                // not registered, so add ..
               this.handlers.push(hdl);
            else                           // already registered, so remove ..
               this.handlers.splice(idx,1);
         }
         return this;
      },
      /**
       * Start morphing process.
       * @returns {object} this.
       */
      start: function() {
         this.tbeg = false; 
         for (var i=this.handlers.length-1; i>=0; --i)  // reset handlers ...
            this.handlers[i](false);
         this.animate(0);
         return this;
      },
      /**
       * @private
       */
      animate: function animate(time) {
         var t = 0, tbeg = this.tbeg || (this.tbeg = time) || false;
         if (tbeg && (t = time - tbeg - this.t0) >= 0) {
            var q = this.fn(t/this.dt);  // get normalized value by timing function.
            for (var i=this.handlers.length-1; i>=0; --i)  // migrate to for (.. of ..) in near future ..
               this.handlers[i](q);
         }
         if (t <= this.dt)
            requestAnimationFrame(this.animateHdl);
      }
   },
   // some simple motion laws (timing functions) from cam design (VDI 2143) ... all in interval [0,1]
   linear: function(z) { return z; },
   quadratic: function(z) { return z <= 0.5 ? 2*z*z : -2*z*z + 4*z - 1; },
   sinoid: function(z) { return z - Math.sin(2*Math.PI*z)/2/Math.PI; },
   poly5: function(z) { return 10*z*z*z - 15*z*z*z*z +6*z*z*z*z*z; }
}

// export to Node.js
if (typeof(module) !== "undefined" && module.exports)
   module.exports = Morphr;
