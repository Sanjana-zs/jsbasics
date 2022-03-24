/*var counter = () => {
    var a = 0;
    function inc() {
        a += 1;console.log(a);

    }
    return inc;
}

var a = counter();
a();
a();
a();*/

function hello() {
    return "hello"
}

function after(n, fn) {
    let counter = 0;

    function inc() {
        if (counter == n) return fn();
        counter += 1;
    }

    return inc;
}

const helloAfter = after(3, hello)

console.log(helloAfter());
console.log(helloAfter());
console.log(helloAfter());
console.log(helloAfter());