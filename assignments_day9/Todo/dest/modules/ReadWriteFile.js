"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
function readFile() {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile('././data.json', 'utf-8', (err, data) => {
            if (err)
                reject(err);
            resolve(data.length == 0 ? [] : JSON.parse(data));
        });
    });
}
exports.readFile = readFile;
function writeFile(reqBody) {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile('././data.json', JSON.stringify(reqBody), (err) => {
            if (err)
                reject(err);
            resolve('Success');
        });
    });
}
exports.writeFile = writeFile;
