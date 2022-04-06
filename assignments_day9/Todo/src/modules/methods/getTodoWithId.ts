import { readFile } from "../ReadWriteFile";
import { Todo } from "../../params/Todo";

export const getTodoWithId = async (req: any, res: any) => {
    const reqUrl: string = req.url;
    try {
        const id = reqUrl.split('/')[2];
        const fileData: any = await readFile();
        const todo: Todo | undefined = fileData.filter((e: Todo) => e.id == id)[0];
        if (todo) {
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(todo));
        } else {
            throw "ID is not defined";
        }
    } catch (error) {
        res.statusCode = 400; // bad request
        res.end(error);
    }
}