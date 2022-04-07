import { readFile, writeFile } from "../ReadWriteFile";
import { ITodo } from "../../params/Todo";

export const deleteTodo = async (req: any, res: any) => {
    const reqUrl: string = req.url;

    try {
        const id = reqUrl.split('/')[2];
        let fileData: any = await readFile();
        const todos: ITodo[] = fileData.filter((e: ITodo) => e.id != id);

        if (todos.length == fileData.length) {
            res.statusCode = 406;
            throw "ID is not present";
        } 
        
        else {
            await writeFile(todos);
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(todos));
        }
        
    } catch (error) {
        res.statusCode = res.statusCode ? res.statusCode : 500;
        res.end(error);
    }
}