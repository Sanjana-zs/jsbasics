import { getAppropriateStatus } from "../../params/util";
import { Status } from "../../params/util";
import { v4 as uuidv4 } from 'uuid';
import { ITodo } from "../../params/Todo";
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
        const reqBody: ITodo = {
            id: uuidv4(),
            title,
            status: status ? status : Status.INCOMPLETE,
            createdAt: new Date(),
            updatedAt: new Date()
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
        res.statusCode = res.statusCode ? res.statusCode : 500; // unhandled exception
        res.end(error);
    }
}