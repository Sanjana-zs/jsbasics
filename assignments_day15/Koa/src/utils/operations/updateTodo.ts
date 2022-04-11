import { Context } from "koa";
import { todoData } from "../constants/data";
import checkValidation from "../constants/isValidFormat";
import { Status } from "../constants/methods";
import { ITodo } from "../constants/Todo";

const updateTodo = (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const { title, status } = ctx.request.body;
        checkValidation(title, status);
        // check for id existence
        const todo: ITodo | undefined = todoData.filter((e: ITodo) => e.id === id)[0];
        if (!todo) {
            ctx.status = 406; // not acceptable
            throw "ID is not present";
        }
        // update dataa
        todoData.forEach((e: ITodo) => {
            if (e.id === id) {
                e.title = title;
                e.status = status || e.status,
                    e.updatedAt = new Date()
            }
        });
        ctx.status = 201; // updated
        ctx.body = { data: todo.id };
    } catch (error) {
        ctx.status = ctx.status || 500; // unhandled exception
        ctx.body = { error };
    }
}

export default updateTodo;