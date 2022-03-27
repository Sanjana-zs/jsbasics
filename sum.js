const sum = {
    add(...args) {
        args.forEach((num) => {
            this.value += num;
        })
        return this.value;
    },
    reset() {
        this.value = 0;
    }
}

const obj = {
    value: 0
};

const sum_func = sum.add;
console.log(sum.add.call(obj));
sum.reset.bind(obj);

console.log(sum.add.apply(obj, [1, 2, 4]));
sum.reset.bind(obj);

console.log(sum.add.call(obj, 1, 4, 5, 7, 8));
sum.reset.bind(obj);