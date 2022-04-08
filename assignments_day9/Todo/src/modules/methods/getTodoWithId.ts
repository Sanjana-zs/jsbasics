import { readFile } from "../ReadWriteFile";
import { ITodo } from "../../params/Todo";

export const getTodoWithId = async (req: any, res: any) => {
    const reqUrl: string = req.url;

    try {
        const id = reqUrl.split('/')[2];
        const fileData: any = await readFile();
        const todo: ITodo | undefined = fileData.filter((e: ITodo) => e.id == id)[0];

        if (todo) {
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(todo));
        } 
        
        else {
            res.statusCode = 400; // bad request
            throw "ID is not defined";
        }
        
    } catch (error) {
        res.statusCode = res.statusCode ? res.statusCode : 500; // unhandled exception
        res.end(error);
    }
}