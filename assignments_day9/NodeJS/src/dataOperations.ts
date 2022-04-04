import fs from 'fs';
import { Todos } from './reqParams';

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

export async function deleteTodo(query: { id: string }, fileData: any) {
    const id = query.id;
    try {
        if (id) {
            fileData = fileData.filter((element: Todos) => element.id != id);
            await writeDataFile(fileData);
        } else {
            console.log('Query is undefined');
        }
    } catch (error) {
        console.log('Error Occured\n', error);
    }
}

export async function editTodo(query: { id: string, todo: string }, fileData: any) {
    const { id, todo } = query;
    try {
        if (id && todo) {
            fileData = fileData.map((e: Todos) => {
                if (e.id == id) {
                    return { ...e, description: todo };
                }
                return e;
            });
            await writeDataFile(fileData);
        }
    } catch (error) {
        console.log('Error\n', error);
    }
}
