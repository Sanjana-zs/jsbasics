let make_promise = true;

const callMe = (time, callback) => {
    return new Promise((resolve, reject) => {
        if (make_promise) {
            setTimeout(() => {
                resolve(callback);
            }, time);
        } else {
            reject("Error Occured"); s
        }
    });
}

callMe(1000, () => console.log('Calls 1st time'))
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 2nd time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 3rd time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 4th time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 5th time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 6th time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 7th time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 8th time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 9th time"))
    })
    .then(success => {
        success();
        return callMe(1000, () => console.log("Calls 10th time"))
    })
    .then(success => {
        success();
    })
    .catch(error => console.log(error))
    .finally(() => console.log("End of promise"));