import { getAppropriateStatus } from "../../params/status";
import { Status } from "../../params/status";
import { v4 as uuidv4 } from 'uuid';
import { Todo } from "../../params/Todo";
import { readFile, writeFile } from "../ReadWriteFile";

export const addTodo = async (req: any, res: any) => {
    try {
        let { title, status } = req.body; // object destructuring
        // checking for validate title and status
        if (!title){
            res.statusCode = 406; // not acceptable
            throw "Title is not defined";
        }
        if (status) {
            status = getAppropriateStatus(status);
            if (status == Status.WRONG) {
                res.statusCode = 406;
                throw "Status is not valid";
            }
        }
        // post the data into server
        const reqBody: Todo = {
            id: uuidv4(),
            title,
            status: status ? status : Status.INCOMPLETE,
            createdAt: new Date()
        };
        // read and write file
        const fileData: any = await readFile();
        fileData.push(reqBody);
        await writeFile(fileData);
        res.writeHead(201, { 'Content-Type': 'application/json' }); // 201 when a resource was created as result
        res.end(JSON.stringify(
            { data:
                { id: reqBody.id }
            }
        ));
    } catch (error) {
        res.end(error);
    }
}