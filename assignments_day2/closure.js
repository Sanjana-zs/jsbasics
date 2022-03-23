function operations() {
    let num = 0;

    function print() {
        console.log(num);
    }

    function add(value) {
        num += value;
        print();
    }

    function sub(value) {
        num -= value;
        print();
    }

    function reset() {
        num = 0;
        print();
    }

    function inc() {
        num += 1;
        print();
    }

    function dec() {
        num -= 1;
        print();
    }

    const obj = {
        add,
        sub,
        reset,
        inc,
        dec,
        print
    }

    return obj;
}

const sum = operations();

sum.add(10);
sum.dec();
sum.sub(1);
sum.print();