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
exports.deleteTodo = void 0;
const ReadWriteFile_1 = require("../ReadWriteFile");
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUrl = req.url;
    try {
        const id = reqUrl.split('/')[2];
        let fileData = yield (0, ReadWriteFile_1.readFile)();
        const todos = fileData.filter((e) => e.id != id);
        if (todos.length == fileData.length) {
            res.statusCode = 406;
            throw "ID is not present";
        }
        else {
            yield (0, ReadWriteFile_1.writeFile)(todos);
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(todos));
        }
    }
    catch (error) {
        res.statusCode = res.statusCode ? res.statusCode : 500;
        res.end(error);
    }
});
exports.deleteTodo = deleteTodo;
