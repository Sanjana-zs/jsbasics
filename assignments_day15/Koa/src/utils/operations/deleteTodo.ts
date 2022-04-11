import { Context } from "koa";
import { todoData } from "../constants/data";
import { ITodo } from "../constants/Todo";

const deleteTodo = (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const index = todoData.findIndex((e: ITodo) => e.id === id);
        if (index === -1) {
            ctx.status = 404; // not found
            throw "ID is not present";
        } else {
            todoData.splice(index, 1);
        }
        ctx.body = 200; // success
        ctx.body = { todoData };
    } catch (error) {
        ctx.status = ctx.status || 500; // unhandled exception
        ctx.body = { error }
    }
};

export default deleteTodo;