import fs from 'fs';

export const readDataFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data.json', 'utf-8', (err, data) => {
            if (err) reject(err);
            resolve(data.length == 0 ? [] : JSON.parse(data));
        });
    });
}

export const writeDataFile = (data: any) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./data.json', JSON.stringify(data), (err) => {
            if (err) reject(err);
            resolve("Success");
        });
    });
}

export async function deleteTodo(query: { todos: string }, fileData: string[]) {
    const todo = query.todos;
    try {
        if (todo) {
            fileData = fileData.filter((element: string) => element != todo);
            await writeDataFile(fileData);
        } else {
            console.log('Request Body is undefined');
        }
    } catch (error) {
        console.log('Error Occured\n', error);
    }
}

export async function editTodo(reqBody: { todos: string }, query: { edit: string }, fileData: string[]) {
    const editTodo = query.edit;
    const replaceTodo = reqBody.todos;
    try {
        if (editTodo && replaceTodo) {
            const index = fileData.indexOf(editTodo);
            if (index != -1) {
                fileData[index] = replaceTodo;
                await writeDataFile(fileData);
            } else {
                console.log("Todo is undefined");
            }
        }
    } catch (error) {
        console.log('Error\n', error);
    }
}