export function collectDataChuncks(req:any,res:any,callback:any ){
    let body = '';

    // collect chunks of data
    req.on('data', (data: string) => {
        body += data;
    });

    req.on('end', (_any: any) => {
        if (req.headers['content-type'] == 'application/json') {
            req.body = JSON.parse(body);
        } else {
            console.log("Data is not of desired type");
        }
        callback(req, res);
    });
}