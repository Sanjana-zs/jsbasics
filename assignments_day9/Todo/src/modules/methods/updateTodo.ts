import { readFile, writeFile } from "../ReadWriteFile";
import { Todo } from "../../params/Todo";
import { getAppropriateStatus } from "../../params/status";

export const updateTodo = async (req: any, res: any) => {
    const reqUrl: string = req.url;
    try {
        const id = reqUrl.split('/')[2];
        let fileData: any = await readFile();
        const todo: Todo | undefined = fileData.filter((e: Todo) => e.id == id)[0];
        if (todo) {
            let { title, status } = req.body;
            todo.title = title ? title : todo.title;
            todo.status = status ? getAppropriateStatus(status) : todo.status;
            todo.updatedAt = new Date();
            // update the json file
            fileData = fileData.map((e: Todo) => {
                if (e.id == todo.id) {
                    e.title = todo.title;
                    e.status = todo.status;
                    e.updatedAt = todo.updatedAt;
                }
                return e;
            });
            await writeFile(fileData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(
                { data: todo }
            ));
        } else throw "ID is not defined";
    } catch (error) {
        res.statusCode = 400; //bad request
        res.end(error);
    }
}