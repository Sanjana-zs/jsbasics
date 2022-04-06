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
exports.addTodo = void 0;
const status_1 = require("../../params/status");
const status_2 = require("../../params/status");
const uuid_1 = require("uuid");
const ReadWriteFile_1 = require("../ReadWriteFile");
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, status } = req.body; // object destructuring
        // checking for validate title and status
        if (!title)
            throw "Title is not defined";
        if (status) {
            status = (0, status_1.getAppropriateStatus)(status);
            if (status == status_2.Status.WRONG) {
                throw "Status is not valid";
            }
        }
        console.log(status);
        // post the data into server
        const reqBody = {
            id: (0, uuid_1.v4)(),
            title,
            status: status ? status : status_2.Status.INCOMPLETE,
            createdAt: new Date()
        };
        // read and write file
        const fileData = yield (0, ReadWriteFile_1.readFile)();
        fileData.push(reqBody);
        yield (0, ReadWriteFile_1.writeFile)(fileData);
        res.writeHead(201, { 'Content-Type': 'application/json' }); // 201 when a resource was created as result
        res.end(JSON.stringify({ data: reqBody.id }));
    }
    catch (error) {
        res.statusCode = 400; // bad request
        res.end(error);
    }
});
exports.addTodo = addTodo;
