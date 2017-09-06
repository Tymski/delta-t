### This is an early draft of Δt

Package delta-t (Δt) provides a class that you can use to create instances of deltas.
Deltas are differences in values, for default it is difference in time (performance.now() with Date.now() fallback)


Example1: keeping track of time passed between frames.
```JavaScript
const Δ = require('delta-t');

Δt = new Δ();

setInterval(function(){
    Δt.update();
    console.log(Number(Δt));
},17);
```

