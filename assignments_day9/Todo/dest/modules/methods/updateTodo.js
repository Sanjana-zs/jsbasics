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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = void 0;
const ReadWriteFile_1 = require("../ReadWriteFile");
const status_1 = require("../../params/status");
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUrl = req.url;
    try {
        const id = reqUrl.split('/')[2];
        let fileData = yield (0, ReadWriteFile_1.readFile)();
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
});
exports.updateTodo = updateTodo;
