import { readFile, writeFile } from "../ReadWriteFile";
import url from 'url';
import { Todo } from "../../params/Todo";

export const queryTodo = async (req: any, res: any) => {
    const reqUrl: string = req.url;

    try {
        const { query } = url.parse(reqUrl, true).query;
        const title:string|undefined = Array.isArray(query) ? query[0] : query;
        const fileData: Todo[] | any = await readFile();

        if (title) {
            const todos: Todo[] = fileData.filter((e: Todo) => e.title?.includes(title) );
            if (!todos.length) {
                res.statusCode = 200;
                res.end("No Match found");
            }
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(todos));
        } 
        
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(fileData));
        }

    } catch (error) {
        res.statusCode = 400; //bad request
        res.end(error);
    }
}