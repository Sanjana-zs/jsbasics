import http from 'http';
import dotenv from 'dotenv';
import { reqMethod } from './reqParams';
import { handleGetRequest } from './handleGetRequest';
import { makeResponse } from './makeResponse';
dotenv.config();

const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';

http.createServer((req: any, res: any) => {
    switch (req.method) {
        case reqMethod.GET:
        case reqMethod.DELETE:
        case reqMethod.PATCH:
            handleGetRequest(req, res);
            break;

        case reqMethod.POST:
            makeResponse(req, res, handleGetRequest);
            break;
    }
}).listen(port, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});
