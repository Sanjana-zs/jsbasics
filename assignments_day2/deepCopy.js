function makeCopy(obj) {
    const copy = JSON.parse(JSON.stringify(obj));
    return copy;
}

const obj = {
    b: 10,
    c: {
        d: {
            e: 20
        }
    }
}

const objCopy = makeCopy(obj); // write a function to do deep copy
obj.c.d.e = 30;
console.log(obj.c.d.e); // should print 30
console.log(objCopy.c.d.e); // should print 20