function makeDeepCopy(obj) {
    if (obj === null || typeof (obj) != 'object') return obj;

    const cond = obj.constructor; // points to the Fundamental Object constructor type for that obj

    if (cond === Object) {
        let copy_obj = {};
        Object.keys(obj).forEach((key) => {
            //to check whether the object contains property like itself or not
            if (obj.hasOwnProperty(key)) {
                copy_obj[key] = makeDeepCopy(obj[key]);
            }
        });
        return copy_obj;
    }

    return obj;
}

const obj = {
    b: 10,
    c: {
        d: {
            e: 20
        }
    }
}

const objCopy = makeDeepCopy(obj); // write a function to do deep copy
obj.c.d.e = 30;
console.log(obj.c.d.e); // should print 30
console.log(objCopy.c.d.e); // should print 20
