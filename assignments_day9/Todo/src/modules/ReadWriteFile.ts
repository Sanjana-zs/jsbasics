import fs from 'fs';
import { Todo } from '../params/Todo';

export function readFile() {
    return new Promise((resolve,reject)=>{
        fs.readFile('././data.json','utf-8',(err,data)=>{
            if(err) reject(err);
            resolve(data.length == 0? []: JSON.parse(data));
        });
    });
}

export function writeFile(reqBody:Todo[]){
    return new Promise((resolve,reject)=>{
        fs.writeFile('././data.json',JSON.stringify(reqBody),(err)=>{
            if(err) reject(err);
            resolve('Success');
        });
    });
}