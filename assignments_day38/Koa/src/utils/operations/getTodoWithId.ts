import { Context } from "koa";
import { todoData } from "../constants/data";
import { ITodo } from "../constants/Todo";

const getTodoWithId = (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const todo: ITodo | undefined = todoData.filter((e: ITodo) => e.id === id)[0];
        if (todo) {
            ctx.status = 200; // success in fetching the todo
            ctx.body = { data: todo };
        } else {
            ctx.status = 400; // bad requests
            throw "ID doesn't exist";
        }
    } catch (error) {
        ctx.status = ctx.status || 500; // unhandled exception
        ctx.body = { error };
    }
}

export default getTodoWithId;