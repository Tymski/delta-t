class Δ {
    constructor(value = 0, updateFunction = null) {
        this.value = value;
        if (updateFunction === null)
        if (typeof performance === "object")
        if (typeof performance.now === "function"){
            this.updateFunction = performance.now;
        }
        else if (typeof performanceNow === "function") {
            this.updateFunction = performanceNow;
        }
        else if (typeof Date.now === "function"){
            this.updateFunction = Date.now;
        }
    }
    get value() {
        return this.value;
    }
    set value(x) {
        this.previousValue = this.value;
        this.value = x;
        this.changed = true;
    }
    get difference() {
        if (this.changed) {
            this.difference = this.differenceFunction(this.value, this.previousValue);
            this.changed = false;
        }
        return this.difference;
    }
    differenceFunction(x1, x2, ε = Number.EPSILON) {
        if (Math.abs(x1 - x2) < ε) return 0;
        else return x1 - x2;
    }
    updateFunction() {

    }
    update() {
        updateFunction();
    }
    valueOf() {
        return this.difference;
    }

}