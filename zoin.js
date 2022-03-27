const makeObj = () => {
    const obj = new Object();
    obj.char = '';
    return obj;
}


const join = {
    zoin(...args) {
        for (index in args) {
            this.char += args[index];
        }
        return this.char;
    },
    reset() {
        this.char = '';
        console.log("jhhe")
    }
};

const zoin = join.zoin;

const result_1 = zoin.apply(makeObj(), ['Z', 'o', 'p', 's', 'm', 'a', 'r', 't']);
console.log(result_1);

const result_2 = zoin.call(makeObj(), 'H', 'e', 'l', 'l', 'o');
console.log(result_2);
