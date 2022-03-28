function returnPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Hello');
        }, 1000);
    });
}

async function asyncCall() {
    let result;
    try {
        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);

        result = await returnPromise();
        console.log(result);


    } catch (error) {
        console.log(error);
    }
}

asyncCall();