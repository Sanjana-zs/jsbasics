function callback(time) {

    setTimeout(() => {
        console.log("Print 1");

        setTimeout(() => {
            console.log("Print 2");

            setTimeout(() => {
                console.log("Print 3");

                setTimeout(() => {
                    console.log("Print 4");

                    setTimeout(() => {
                        console.log("Print 5");

                        setTimeout(() => {
                            console.log("Print 6");

                            setTimeout(() => {
                                console.log("Print 7");

                                setTimeout(() => {
                                    console.log("Print 8");

                                    setTimeout(() => {
                                        console.log("Print 9");

                                        setTimeout(() => {
                                            console.log("Print 10");
                                        }, time);

                                    }, time);
                                }, time);
                            }, time);
                        }, time);
                    }, time);
                }, time);
            }, time);
        }, time);
    }, time);
}

callback(1000);  // function calls