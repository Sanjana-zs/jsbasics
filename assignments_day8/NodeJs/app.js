const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT | 3000;
const hostname = '127.0.0.1';

// enum
let reqMethod;
(function (reqMethod) {
    reqMethod["GET"] = "GET";
    reqMethod["POST"] = "POST";
})(reqMethod || (reqMethod = {}));;

const readFile = (path, req, res) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

const handleRequest = async (req, res) => {
    try {

        if (req.url === '/' && req.method === reqMethod.GET) {
            const fileData = await readFile('./static/index.html', req, res);
            res.statusCode = 200;
            res.write(fileData);
        } 
        
        else if (['/index.html', '/index.css', '/index.js'].includes(req.url)) {
            const fileData = await readFile("./static" + req.url, req, res);
            res.statusCode = 200;
            res.write(fileData);
        } 
        
        else if (req.url === '/echo' && req.method === reqMethod.POST) {
            const reqBody = JSON.stringify(req.body);
            res.statusCode = 200;
            res.write(reqBody);
        } 
        
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<h3>Page Not Found</h3>");
        }
        
    } catch (Error) {
        console.log("Error Occured  \n", Error);
        res.statusCode = 403;
    }
    res.end();
}

const makeResponse = (req, res, callback) => {
    let body = '';
    req.on('data', (data) => {
        body += data;
    });

    req.on("end", (_any) => {
        if ((req.headers['content-type'] === 'application/json')) {
            req.body = JSON.parse(body);
        } else {
            console.log("Data is not json");
        }
        callback(req, res);
    })
}

const server = http.createServer((req, res) => {
    if (req.method === reqMethod.GET) {
        handleRequest(req, res);
    } else {
        makeResponse(req, res, handleRequest);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:/${port}/`);
});