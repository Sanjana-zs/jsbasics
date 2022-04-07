"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const util_1 = require("./params/util");
const collectDataChuncks_1 = require("./modules/collectDataChuncks");
const addTodo_1 = require("./modules/methods/addTodo");
const getTodoWithId_1 = require("./modules/methods/getTodoWithId");
const updateTodo_1 = require("./modules/methods/updateTodo");
const deleteTodo_1 = require("./modules/methods/deleteTodo");
const queryTodo_1 = require("./modules/methods/queryTodo");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
http_1.default.createServer((req, res) => {
    const reqUrl = req.url;
    if ((reqUrl === null || reqUrl === void 0 ? void 0 : reqUrl.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g)) && req.method == util_1.reqMethod.GET) {
        // fetching todo w.r.t id
        (0, getTodoWithId_1.getTodoWithId)(req, res);
    }
    else if ((reqUrl === null || reqUrl === void 0 ? void 0 : reqUrl.match(/\/[todo]+/g)) && req.method == util_1.reqMethod.POST) {
        // add todos to file
        (0, collectDataChuncks_1.collectDataChuncks)(req, res, addTodo_1.addTodo);
    }
    else if ((reqUrl === null || reqUrl === void 0 ? void 0 : reqUrl.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g)) && req.method == util_1.reqMethod.PUT) {
        // update Todos
        (0, collectDataChuncks_1.collectDataChuncks)(req, res, updateTodo_1.updateTodo);
    }
    else if ((reqUrl === null || reqUrl === void 0 ? void 0 : reqUrl.match(/\/[todo]+\/([a-z]|[0-9]|[-])+/g)) && req.method == util_1.reqMethod.DELETE) {
        // delete Todo
        (0, deleteTodo_1.deleteTodo)(req, res);
    }
    else if ((reqUrl === null || reqUrl === void 0 ? void 0 : reqUrl.match(/\/[todo]+/)) && req.method == util_1.reqMethod.GET) {
        // queries on Todo
        (0, queryTodo_1.queryTodo)(req, res);
    }
    else {
        // wrong page
        res.statusCode = 404; //not found;
        res.end("Page not found");
    }
}).listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
