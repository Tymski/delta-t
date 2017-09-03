module.exports =
    class Δ {
        constructor(current = null, updateFunction = null, differenceFunction = null) {
            this._changed = false;
            if (typeof updateFunction === "function") {
                this.updateFunction = updateFunction;
            } else if (typeof performance === "object" && typeof performance.now === "function") {
                this.updateFunction = performance.now;
            } else if (typeof performanceNow === "function") {
                this.updateFunction = performanceNow;
            } else {
                this.updateFunction = Date.now;
            }
            if (current == null)this.update();
            if (current == null)this._previous = this._current;
            if(typeof differenceFunction === "function"){
                this.differenceFunction = differenceFunction;
            }
        }
        get current() {
            return this._current;
        }
        get previous(){
            return this._previous;
        }
        set current(x) {
            this._previous = this._current;
            this._current = x;
            this._changed = true;
        }
        get difference() {
            if (this._changed) {
                this._difference = this.differenceFunction(this._current, this._previous);
                this._changed = false;
            }
            return this._difference;
        }
        differenceFunction(x1, x2, ε = Number.EPSILON) {
            if (Math.abs(x1 - x2) < ε) return 0;
            else return x1 - x2;
        }
        update() {
            this.current = this.updateFunction();
            return this.current;
        }
        valueOf() {
            return this.difference;
        }
    };