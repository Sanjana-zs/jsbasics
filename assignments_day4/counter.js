const counter = {
    value: 0,
    increment() {
        this.value += 1;
        return this;
    },
    decrement() {
        this.value -= 1;
        return this;
    }
}

counter.increment() // value is 1
console.log(counter.value);

counter.increment() // value is 2
console.log(counter.value);

counter.decrement() // value is 1
console.log(counter.value);

// now we want to do something like below

counter.increment().increment().decrement();  // figure out how to do this
console.log(counter.value);