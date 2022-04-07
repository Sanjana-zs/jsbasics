import { readFile, writeFile } from "../ReadWriteFile";
import url from 'url';
import { ITodo } from "../../params/Todo";

export const queryTodo = async (req: any, res: any) => {
    const reqUrl: string = req.url;

    try {
        const { query='' } = url.parse(reqUrl, true).query;
        const title:string|undefined = Array.isArray(query) ? query[0] : query;
        const fileData: ITodo[] | any = await readFile();

        const todos: ITodo[] = fileData.filter((e: ITodo) => e.title?.includes(title) );
        res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
        res.end(JSON.stringify(todos));

    } catch (error) {
        res.statusCode = res.statusCode ? res.statusCode : 500; // unhandled exception
        res.end(error);
    }
}