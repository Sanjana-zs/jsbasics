"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectDataChuncks = void 0;
function collectDataChuncks(req, res, callback) {
    let body = '';
    // collect chunks of data
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', (_any) => {
        if (req.headers['content-type'] == 'application/json') {
            req.body = JSON.parse(body);
        }
        else {
            console.log("Data is not of desired type");
        }
        callback(req, res);
    });
}
exports.collectDataChuncks = collectDataChuncks;
