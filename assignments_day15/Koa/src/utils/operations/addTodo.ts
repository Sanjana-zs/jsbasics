import { Context } from "koa";
import { Status } from "../constants/methods";
import { ITodo } from "../constants/Todo";
import { v4 as uuidv4 } from 'uuid';
import checkValidation from "../constants/isValidFormat";
import { todoData } from "../constants/data";

const addTodo = (ctx: Context) => {
    try {
        const { title, status } = ctx.request.body;
        checkValidation(title, status);
        const todo: ITodo = {
            id: uuidv4(),
            title,
            status: status || Status.INCOMPLETE,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        todoData.push(todo);
        ctx.status = 201; // resource created
        ctx.body = { data: { id: todo.id } };
    } catch (error) {
        ctx.status = ctx.status || 500; // unhandled exception
        ctx.body = { error };
    }
}

export default addTodo;