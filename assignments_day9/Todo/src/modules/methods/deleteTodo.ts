import { readFile, writeFile } from "../ReadWriteFile";
import { Todo } from "../../params/Todo";

export const deleteTodo = async (req: any, res: any) => {
    const reqUrl: string = req.url;
    try {
        const id = reqUrl.split('/')[2];
        let fileData: any = await readFile();
        const todos: Todo[] = fileData.filter((e: Todo) => e.id != id);
        if (todos.length == fileData.length) {
            throw "ID is not present";
        } else {
            await writeFile(todos);
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(todos));
        }
    } catch (error) {
        res.statusCode = 400; // bad request
        res.end(error);
    }
}