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
                this.useStaticDifferenceFunction = false;
            }else{
                this.useStaticDifferenceFunction = true;
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
                if(this.useStaticDifferenceFunction){
                    this._difference = Δ.differenceFunction(this._current, this._previous);
                } else{
                    this._difference = this.differenceFunction(this._current, this._previous);
                }
                this._changed = false;
            }
            return this._difference;
        }
        static differenceFunction(x1, x2, ε = Number.EPSILON) {
            let tmp = x1-x2;
            if (Math.abs(tmp) < ε) return 0;
            else return tmp;
        }
        update() {
            this.current = this.updateFunction();
            return this.current;
        }
        valueOf() {
            return this.difference;
        }
    };