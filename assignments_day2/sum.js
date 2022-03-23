let add = 0;

function sum(n) {
    let sol = 0;

    if (n == undefined) {
        sol = add;
        add = 0;
        return sol;
    }

    add += n;

    return sum;
}

console.log(sum(1)(2)(3)(4)())// consoles 10
console.log(sum(1)(2)()) // consoles 3
console.log(sum())// consoles 0