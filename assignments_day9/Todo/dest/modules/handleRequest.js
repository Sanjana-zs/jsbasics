"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
const status_1 = require("../params/status");
const ReadWriteFile_1 = require("./ReadWriteFile");
const url_1 = __importDefault(require("url"));
const reqMethod_1 = require("../params/reqMethod");
function handleRequest(req, res, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileData;
        const reqUrl = req.url;
        // display todos w.r.t id
        if (reqUrl.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g) && req.method == reqMethod_1.reqMethod.GET) {
            try {
                const id = reqUrl.split('/')[2];
                fileData = yield (0, ReadWriteFile_1.readFile)();
                const todo = fileData.filter((e) => e.id == id)[0];
                if (todo) {
                    res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
                    res.end(JSON.stringify(todo));
                }
                else {
                    throw "ID is not defined";
                }
            }
            catch (error) {
                res.statusCode = 400; // bad request
                res.end(error);
            }
        }
        // add todos
        else if (reqUrl.match(/\/[todo]+/g) && req.method == reqMethod_1.reqMethod.POST) {
            callback(req, res);
        }
        //update todos
        else if (reqUrl.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g) && req.method == reqMethod_1.reqMethod.PUT) {
            try {
                const id = reqUrl.split('/')[2];
                fileData = yield (0, ReadWriteFile_1.readFile)();
                const todo = fileData.filter((e) => e.id == id)[0];
                if (todo) {
                    let { title, status } = req.body;
                    todo.title = title ? title : todo.title;
                    todo.status = status ? (0, status_1.getAppropriateStatus)(status) : todo.status;
                    todo.updatedAt = new Date();
                    // update the json file
                    fileData = fileData.map((e) => {
                        if (e.id == todo.id) {
                            e.title = todo.title;
                            e.status = todo.status;
                            e.updatedAt = todo.updatedAt;
                        }
                        return e;
                    });
                    yield (0, ReadWriteFile_1.writeFile)(fileData);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ data: todo }));
                }
                else
                    throw "ID is not defined";
            }
            catch (error) {
                res.statusCode = 400; //bad request
                res.end(error);
            }
        }
        // delete todo
        else if (reqUrl.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g) && req.method == reqMethod_1.reqMethod.DELETE) {
            try {
                const id = reqUrl.split('/')[2];
                fileData = yield (0, ReadWriteFile_1.readFile)();
                const todos = fileData.filter((e) => e.id != id);
                if (todos.length == fileData.length) {
                    throw "ID is not present";
                }
                else {
                    yield (0, ReadWriteFile_1.writeFile)(todos);
                    res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
                    res.end(JSON.stringify(todos));
                }
            }
            catch (error) {
                res.statusCode = 400; // bad request
                res.end(error);
            }
        }
        // queries on todos
        else if (reqUrl.match(/\/[todo]+/) && req.method == reqMethod_1.reqMethod.GET) {
            try {
                const { query } = url_1.default.parse(reqUrl, true).query;
                fileData = yield (0, ReadWriteFile_1.readFile)();
                if (query) {
                    const todos = fileData.filter((e) => e.title == query);
                    if (!todos.length) {
                        res.statusCode = 200;
                        res.end("No Match found");
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
                    res.end(JSON.stringify(todos));
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
                    res.end(JSON.stringify(fileData));
                }
            }
            catch (error) {
                res.statusCode = 400; //bad request
                res.end(error);
            }
        }
        else {
            res.statusCode = 404; // not found
            res.end("Page Not Found");
        }
    });
}
exports.handleRequest = handleRequest;
